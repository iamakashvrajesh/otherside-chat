'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) throw authError
      router.push('/feed')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : ''
      if (msg.includes('Email not confirmed')) {
        setError('Please check your email and click the confirmation link first. Check your spam folder if you cannot find it.')
      } else if (msg.includes('Invalid login credentials')) {
        setError('Wrong email or password. Please try again.')
      } else {
        setError(msg || 'Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ background: 'var(--b0)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: '56px', background: 'var(--b1)',
        borderBottom: '1px solid var(--b3)'
      }}>
        <Link href="/" style={{ fontSize: '20px', fontWeight: 500, letterSpacing: '-0.5px', textDecoration: 'none' }}>
          Other<span style={{ color: 'var(--vi)' }}>S</span><span style={{ color: 'var(--pk)' }}>ide</span>
        </Link>
        <div style={{ fontSize: '13px', color: 'var(--t3)' }}>
          No account?{' '}
          <Link href="/signup" style={{ color: 'var(--vi2)', textDecoration: 'none' }}>Join free</Link>
        </div>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>

          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px', fontWeight: 500, letterSpacing: '-0.5px' }}>
              Other<span style={{ color: 'var(--vi)' }}>S</span><span style={{ color: 'var(--pk)' }}>ide</span>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--t1)', marginBottom: '8px' }}>
              Welcome back
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--t3)' }}>
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--t3)', marginBottom: '6px' }}>
                Email
              </label>
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  width: '100%', padding: '11px 14px', borderRadius: '10px',
                  border: '1px solid var(--b5)', background: 'var(--b2)',
                  color: 'var(--t1)', fontSize: '14px', outline: 'none',
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', color: 'var(--t3)' }}>Password</label>
                <span style={{ fontSize: '12px', color: 'var(--vi2)', cursor: 'pointer' }}>Forgot password?</span>
              </div>
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  width: '100%', padding: '11px 14px', borderRadius: '10px',
                  border: '1px solid var(--b5)', background: 'var(--b2)',
                  color: 'var(--t1)', fontSize: '14px', outline: 'none',
                }}
              />
            </div>

            {error && (
              <div style={{
                background: 'var(--reb)', border: '1px solid var(--re)',
                borderRadius: '10px', padding: '12px 14px',
                fontSize: '13px', color: 'var(--re)', lineHeight: 1.5
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '13px', borderRadius: '12px',
                background: loading ? 'var(--b5)' : 'var(--vi)',
                color: '#fff', fontSize: '15px', fontWeight: 500,
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '4px'
              }}
            >
              {loading ? 'Signing in...' : 'Sign in ↗'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '4px 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--b4)' }} />
              <span style={{ fontSize: '12px', color: 'var(--t4)' }}>or</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--b4)' }} />
            </div>

            <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--t3)' }}>
              Do not have an account?{' '}
              <Link href="/signup" style={{ color: 'var(--vi2)', textDecoration: 'none', fontWeight: 500 }}>
                Create one free
              </Link>
            </div>

          </form>

          <div style={{
            marginTop: '24px', padding: '12px 16px', background: 'var(--b2)',
            borderRadius: '10px', border: '1px solid var(--b4)',
            fontSize: '12px', color: 'var(--t4)', textAlign: 'center', lineHeight: 1.5
          }}>
            We never sell your data. Your identity stays anonymous to other users always.
          </div>

        </div>
      </div>
    </main>
  )
}