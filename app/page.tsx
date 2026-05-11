import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ background: 'var(--b0)', minHeight: '100vh' }}>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', height: '56px', background: 'var(--b1)',
        borderBottom: '1px solid var(--b3)'
      }}>
        <div style={{ fontSize: '20px', fontWeight: 500, letterSpacing: '-0.5px' }}>
          Other<span style={{ color: 'var(--vi)' }}>S</span><span style={{ color: 'var(--pk)' }}>ide</span>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Link href="/login" style={{
            padding: '7px 16px', borderRadius: '10px', border: '1px solid var(--b5)',
            color: 'var(--t2)', fontSize: '13px', textDecoration: 'none'
          }}>Log in</Link>
          <Link href="/signup" style={{
            padding: '7px 16px', borderRadius: '10px', background: 'var(--vi)',
            color: '#fff', fontSize: '13px', fontWeight: 500, textDecoration: 'none'
          }}>Join free</Link>
        </div>
      </nav>

      <div style={{ textAlign: 'center', padding: '72px 24px 48px' }}>
        <div style={{
          display: 'inline-block', background: 'var(--vib2)', color: 'var(--vi2)',
          fontSize: '12px', padding: '4px 14px', borderRadius: '20px',
          marginBottom: '20px', border: '1px solid var(--b6)'
        }}>Ask. Answer. Understand.</div>

        <h1 style={{
          fontSize: '48px', fontWeight: 500, lineHeight: 1.15,
          letterSpacing: '-1px', marginBottom: '16px', color: 'var(--t1)'
        }}>
          Understand the<br />
          <span style={{ color: 'var(--vi)' }}>other</span>{' '}
          <span style={{ color: 'var(--pk)' }}>side</span> of love
        </h1>

        <p style={{
          fontSize: '16px', color: 'var(--t3)', maxWidth: '440px',
          margin: '0 auto 32px', lineHeight: 1.65
        }}>
          A focused community for real relationship questions — answered by real people with different perspectives. Gender-tagged. Anonymous. Honest.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link href="/signup" style={{
            padding: '12px 28px', borderRadius: '12px', background: 'var(--vi)',
            color: '#fff', fontSize: '15px', fontWeight: 500, textDecoration: 'none'
          }}>Ask a question ↗</Link>
          <Link href="/feed" style={{
            padding: '12px 28px', borderRadius: '12px', background: 'var(--b2)',
            color: 'var(--t2)', fontSize: '15px', textDecoration: 'none',
            border: '1px solid var(--b5)'
          }}>Browse the feed</Link>
        </div>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'center', gap: '48px',
        padding: '28px', borderTop: '1px solid var(--b3)',
        borderBottom: '1px solid var(--b3)', margin: '0 32px'
      }}>
        {[
          { num: '12.4k', label: 'Questions asked' },
          { num: '48.2k', label: 'Answers given' },
          { num: '9.1k', label: 'Members' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '26px', fontWeight: 500, color: 'var(--t1)' }}>{s.num}</div>
            <div style={{ fontSize: '12px', color: 'var(--t3)', marginTop: '3px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '48px 32px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 500, textAlign: 'center', marginBottom: '24px', color: 'var(--t1)' }}>
          Why OtherSide works
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {[
            { icon: '?', bg: 'var(--vib2)', color: 'var(--vi2)', title: 'Ask anything', desc: 'Post questions anonymously. No judgment, no real name needed.' },
            { icon: '♡', bg: 'var(--pkb2)', color: 'var(--pk2)', title: 'Real perspectives', desc: 'Every answer is gender-tagged so you know exactly whose view you are getting.' },
            { icon: 'AI', bg: 'var(--blb2)', color: 'var(--bl2)', title: 'AI-powered', desc: 'AI summarises answers and steps in when no one has replied yet.' },
            { icon: '⚡', bg: 'var(--gob)', color: 'var(--go2)', title: 'Live rooms', desc: 'Jump into live themed rooms and talk to the other side in real time.' },
            { icon: '→', bg: 'var(--grb)', color: 'var(--gr)', title: '1-on-1 matching', desc: 'Get matched privately with someone from the other side for a real conversation.' },
            { icon: '🎬', bg: 'var(--b3)', color: 'var(--t2)', title: 'Videos and polls', desc: 'Share takes as short videos or polls. Earn video access by contributing first.' },
          ].map(f => (
            <div key={f.title} style={{
              background: 'var(--b1)', border: '1px solid var(--b3)',
              borderRadius: '14px', padding: '18px'
            }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px',
                background: f.bg, color: f.color, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', fontWeight: 500, marginBottom: '12px'
              }}>{f.icon}</div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--t1)', marginBottom: '5px' }}>{f.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--t3)', lineHeight: 1.55 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '48px 24px 64px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--t1)', marginBottom: '10px' }}>
          Ready to understand each other better?
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--t3)', marginBottom: '24px' }}>
          Join thousands already asking and answering on OtherSide.
        </p>
        <Link href="/signup" style={{
          padding: '14px 36px', borderRadius: '12px', background: 'var(--vi)',
          color: '#fff', fontSize: '16px', fontWeight: 500, textDecoration: 'none'
        }}>Get started — it is free ↗</Link>
      </div>
    </main>
  )
}