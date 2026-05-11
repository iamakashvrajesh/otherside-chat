'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type SignupStatus = 'idle' | 'email_sent' | 'already_exists' | 'rate_limited' | 'error'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [gender, setGender] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<SignupStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const genders = [
    { value: 'girl',       label: 'Girl',              sub: 'she/her',   bg: 'var(--pkb2)', color: 'var(--pk2)', border: 'var(--pk)' },
    { value: 'guy',        label: 'Guy',               sub: 'he/him',    bg: 'var(--blb2)', color: 'var(--bl2)', border: 'var(--bl)' },
    { value: 'nonbinary',  label: 'Non-binary',        sub: 'they/them', bg: 'var(--vib2)', color: 'var(--vi2)', border: 'var(--vi)' },
    { value: 'prefer_not', label: 'Prefer not to say', sub: 'private',   bg: 'var(--b4)',   color: 'var(--t3)',  border: 'var(--b6)' },
  ]

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!gender) { setErrorMsg('Please select your gender'); return }
    if (!username.trim()) { setErrorMsg('Please choose a username'); return }
    setLoading(true)
    setErrorMsg('')
    setStatus('idle')

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username, gender } }
      })

      if (authError) {
        const msg = authError.message.toLowerCase()
        if (msg.includes('rate') || msg.includes('limit')) {
          setStatus('rate_limited')
        } else if (msg.includes('already registered') || msg.includes('already exists')) {
          setStatus('already_exists')
        } else {
          setStatus('error')
          setErrorMsg(authError.message)
        }
        return
      }

      // Supabase returns identities array — if empty, email already exists
      // If user has no identities it means the email was already registered
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        setStatus('already_exists')
        return
      }

      // Check if session was created immediately (email confirmation off)
      // or if we need to wait for email (email confirmation on)
      if (data.session) {
        // Email confirmation is OFF — user is logged in immediately
        // Try to create profile
        if (data.user) {
          await supabase.from('profiles').insert({
            id: data.user.id,
            username: username.trim(),
            gender,
          })
        }
        window.location.href = '/feed'
        return
      }

      // Email confirmation is ON — email was sent
      if (data.user) {
        // Try profile insert in background
        await supabase.from('profiles').insert({
          id: data.user.id,
          username: username.trim(),
          gender,
        })
        setStatus('email_sent')
      } else {
        setStatus('rate_limited')
      }

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message.toLowerCase() : ''
      if (msg.includes('rate') || msg.includes('limit')) {
        setStatus('rate_limited')
      } else {
        setStatus('error')
        setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
      }
    } finally {
      setLoading(false)
    }
  }

  // ── EMAIL SENT ───────────────────────────────────────────────
  if (status === 'email_sent') {
    return (
      <main style={{ background: 'var(--b0)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <nav style={{ display: 'flex', alignItems: 'center', padding: '0 24px', height: '56px', background: 'var(--b1)', borderBottom: '1px solid var(--b3)' }}>
          <Link href="/" style={{ fontSize: '20px', fontWeight: 500, letterSpacing: '-0.5px', textDecoration: 'none' }}>
            Other<span style={{ color: 'var(--vi)' }}>S</span><span style={{ color: 'var(--pk)' }}>ide</span>
          </Link>
        </nav>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          <div style={{ width: '100%', maxWidth: '420px', textAlign: 'center' }}>
            <div style={{ fontSize: '56px', marginBottom: '20px' }}>📬</div>
            <h1 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--t1)', marginBottom: '12px' }}>
              Confirm your email
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--t3)', lineHeight: 1.7, marginBottom: '24px' }}>
              We sent a confirmation link to{' '}
              <strong style={{ color: 'var(--t2)' }}>{email}</strong>.
              <br />Click that link to activate your account.
            </p>
            <div style={{ background: 'var(--vib)', border: '1px solid var(--b6)', borderRadius: '12px', padding: '14px 18px', marginBottom: '24px', fontSize: '13px', color: 'var(--vi3)', lineHeight: 1.6, textAlign: 'left' }}>
              Once you click the link you will be taken straight into OtherSide — no need to log in again.
            </div>
            <div style={{ fontSize: '12px', color: 'var(--t4)', marginBottom: '20px' }}>
              Did not get the email? Check your spam folder.
            </div>
            <Link href="/login" style={{ display: 'block', padding: '13px', borderRadius: '12px', background: 'var(--vi)', color: '#fff', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>
              Go to login ↗
            </Link>
          </div>
        </div>
      </main>
    )
  }

  // ── RATE LIMITED ─────────────────────────────────────────────
  if (status === 'rate_limited') {
    return (
      <main style={{ background: 'var(--b0)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <nav style={{ display: 'flex', alignItems: 'center', padding: '0 24px', height: '56px', background: 'var(--b1)', borderBottom: '1px solid var(--b3)' }}>
          <Link href="/" style={{ fontSize: '20px', fontWeight: 500, letterSpacing: '-0.5px', textDecoration: 'none' }}>
            Other<span style={{ color: 'var(--vi)' }}>S</span><span style={{ color: 'var(--pk)' }}>ide</span>
          </Link>
        </nav>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          <div style={{ width: '100%', maxWidth: '420px', textAlign: 'center' }}>
            <div style={{ fontSize: '56px', marginBottom: '20px' }}>⏳</div>
            <h1 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--t1)', marginBottom: '12px' }}>
              Too many attempts
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--t3)', lineHeight: 1.7, marginBottom: '24px' }}>
              You have tried to sign up too many times in a short period. Please wait a few minutes and try again.
            </p>
            <div style={{ background: 'var(--gob)', border: '1px solid var(--b6)', borderRadius: '12px', padding: '14px 18px', marginBottom: '24px', fontSize: '13px', color: 'var(--go2)', lineHeight: 1.6, textAlign: 'left' }}>
              <strong>Tip:</strong> Try using a different email address, or wait 10 minutes before trying again.
            </div>
            <button onClick={() => setStatus('idle')} style={{ display: 'block', width: '100%', padding: '13px', borderRadius: '12px', background: 'var(--vi)', color: '#fff', fontSize: '15px', fontWeight: 500, border: 'none', cursor: 'pointer' }}>
              Try again ↗
            </button>
          </div>
        </div>
      </main>
    )
  }

  // ── ALREADY EXISTS ───────────────────────────────────────────
  if (status === 'already_exists') {
    return (
      <main style={{ background: 'var(--b0)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <nav style={{ display: 'flex', alignItems: 'center', padding: '0 24px', height: '56px', background: 'var(--b1)', borderBottom: '1px solid var(--b3)' }}>
          <Link href="/" style={{ fontSize: '20px', fontWeight: 500, letterSpacing: '-0.5px', textDecoration: 'none' }}>
            Other<span style={{ color: 'var(--vi)' }}>S</span><span style={{ color: 'var(--pk)' }}>ide</span>
          </Link>
        </nav>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          <div style={{ width: '100%', maxWidth: '420px', textAlign: 'center' }}>
            <div style={{ fontSize: '56px', marginBottom: '20px' }}>👋</div>
            <h1 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--t1)', marginBottom: '12px' }}>
              You already have an account
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--t3)', lineHeight: 1.7, marginBottom: '28px' }}>
              An account with <strong style={{ color: 'var(--t2)' }}>{email}</strong> already exists.
              Just log in instead.
            </p>
            <Link href="/login" style={{ display: 'block', padding: '13px', borderRadius: '12px', background: 'var(--vi)', color: '#fff', fontSize: '15px', fontWeight: 500, textDecoration: 'none', marginBottom: '12px' }}>
              Log in ↗
            </Link>
            <button onClick={() => setStatus('idle')} style={{ display: 'block', width: '100%', padding: '13px', borderRadius: '12px', background: 'transparent', color: 'var(--t3)', fontSize: '14px', border: '1px solid var(--b5)', cursor: 'pointer' }}>
              Use a different email
            </button>
          </div>
        </div>
      </main>
    )
  }

  // ── SIGNUP FORM ──────────────────────────────────────────────
  return (
    <main style={{ background: 'var(--b0)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: '56px', background: 'var(--b1)', borderBottom: '1px solid var(--b3)' }}>
        <Link href="/" style={{ fontSize: '20px', fontWeight: 500, letterSpacing: '-0.5px', textDecoration: 'none' }}>
          Other<span style={{ color: 'var(--vi)' }}>S</span><span style={{ color: 'var(--pk)' }}>ide</span>
        </Link>
        <div style={{ fontSize: '13px', color: 'var(--t3)' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--vi2)', textDecoration: 'none' }}>Log in</Link>
        </div>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>

          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 500, color: 'var(--t1)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
              Create your account
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--t3)', lineHeight: 1.6 }}>
              Takes 30 seconds. No real name needed.
            </p>
          </div>

          <div style={{ background: 'var(--vib)', border: '1px solid var(--b6)', borderRadius: '12px', padding: '12px 16px', marginBottom: '24px', fontSize: '13px', color: 'var(--vi3)', lineHeight: 1.5 }}>
            Your username is anonymous — others only ever see your gender tag, never your name or email.
          </div>

          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--t3)', marginBottom: '6px' }}>Username (your alias)</label>
              <input type="text" placeholder="e.g. curiouscat42" value={username} onChange={e => setUsername(e.target.value)} required
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid var(--b5)', background: 'var(--b2)', color: 'var(--t1)', fontSize: '14px', outline: 'none' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--t3)', marginBottom: '6px' }}>Email</label>
              <input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} required
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid var(--b5)', background: 'var(--b2)', color: 'var(--t1)', fontSize: '14px', outline: 'none' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--t3)', marginBottom: '6px' }}>Password</label>
              <input type="password" placeholder="At least 8 characters" value={password} onChange={e => setPassword(e.target.value)} required minLength={8}
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1px solid var(--b5)', background: 'var(--b2)', color: 'var(--t1)', fontSize: '14px', outline: 'none' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--t3)', marginBottom: '10px' }}>I identify as</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {genders.map(g => (
                  <div key={g.value} onClick={() => setGender(g.value)} style={{
                    padding: '12px', borderRadius: '12px', cursor: 'pointer', textAlign: 'center',
                    border: `1px solid ${gender === g.value ? g.border : 'var(--b5)'}`,
                    background: gender === g.value ? g.bg : 'var(--b2)', transition: 'all 0.15s',
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: gender === g.value ? g.color : 'var(--t2)' }}>{g.label}</div>
                    <div style={{ fontSize: '11px', color: gender === g.value ? g.color : 'var(--t4)', marginTop: '2px' }}>{g.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {(status === 'error' || errorMsg) && (
              <div style={{ background: 'var(--reb)', border: '1px solid var(--re)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: 'var(--re)' }}>
                {errorMsg || 'Something went wrong. Please try again.'}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '13px', borderRadius: '12px',
              background: loading ? 'var(--b5)' : 'var(--vi)',
              color: '#fff', fontSize: '15px', fontWeight: 500,
              border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '4px'
            }}>
              {loading ? 'Creating account...' : 'Create account ↗'}
            </button>

            <p style={{ fontSize: '11px', color: 'var(--t4)', textAlign: 'center', lineHeight: 1.5 }}>
              By signing up you agree to our Terms of Service and Privacy Policy.
              OtherSide is for users 13 and older. Matching requires 18+.
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}