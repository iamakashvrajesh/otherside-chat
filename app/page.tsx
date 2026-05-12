'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [onlineCount, setOnlineCount] = useState(1247);
  const [tickerIndex, setTickerIndex] = useState(0);

  const tickerQuestions = [
    { gender: 'girl', text: 'Why does he reply fast at 11am and ghost by 11pm?' },
    { gender: 'guy', text: 'Is suggesting coffee instead of dinner a red flag?' },
    { gender: 'girl', text: 'When you say "I\'ll let you know" — is that a soft no?' },
    { gender: 'guy', text: 'Do you actually want flowers, or is that a trap?' },
    { gender: 'girl', text: 'Does eye contact across the room mean anything?' },
    { gender: 'guy', text: 'How long should I wait before texting back?' },
  ];

  useEffect(() => {
    // Soft fluctuation of online count for liveness
    const onlineTimer = setInterval(() => {
      setOnlineCount((c) => c + Math.floor(Math.random() * 7) - 3);
    }, 3500);
    // Rotate ticker
    const tickerTimer = setInterval(() => {
      setTickerIndex((i) => (i + 1) % tickerQuestions.length);
    }, 3200);
    return () => {
      clearInterval(onlineTimer);
      clearInterval(tickerTimer);
    };
  }, [tickerQuestions.length]);

  return (
    <>
      <div className="landing-atmosphere" aria-hidden />
      <div className="grain" aria-hidden />

      {/* TOP BAR */}
      <header className="landing-topbar">
        <div className="logo">
          <span className="o">Other</span>
          <span className="amp">/</span>
          <span className="s">Side</span>
        </div>
        <div className="landing-top-right">
          <div className="landing-online">
            <span className="landing-online-dot" />
            <span><b>{onlineCount.toLocaleString()}</b> online</span>
          </div>
          <Link href="/login" className="landing-login">Log in</Link>
          <Link href="/signup" className="landing-join">
            Join <span className="landing-join-arrow">→</span>
          </Link>
        </div>
      </header>

      {/* ============ HERO — SPLIT SCREEN ============ */}
      <section className="hero">
        {/* Pink half — her side */}
        <div className="hero-half hero-pink">
          <div className="hero-half-content">
            <div className="hero-half-eyebrow">
              <span className="hero-half-line" />
              <span>From <em>her</em>.</span>
            </div>
            <p className="hero-half-quote">
              &ldquo;Why does he go cold the second things start to feel real? Genuine question, no judgment, I just need to understand.&rdquo;
            </p>
            <div className="hero-half-byline">
              <span className="hero-half-gtag girl">Girl · 24</span>
              <span className="hero-half-bymeta">asked yesterday · 38 answers</span>
            </div>
          </div>
        </div>

        {/* Blue half — his side */}
        <div className="hero-half hero-blue">
          <div className="hero-half-content">
            <div className="hero-half-eyebrow right">
              <span>From <em>him</em>.</span>
              <span className="hero-half-line" />
            </div>
            <p className="hero-half-quote">
              &ldquo;Because the moment something feels real I realise I have no idea what I&apos;m doing, and panicking quietly looks the same as not caring.&rdquo;
            </p>
            <div className="hero-half-byline right">
              <span className="hero-half-bymeta">answered 14h later · top reply</span>
              <span className="hero-half-gtag guy">Guy · 26</span>
            </div>
          </div>
        </div>

        {/* Center seam */}
        <div className="hero-seam">
          <div className="hero-seam-card">
            <div className="hero-seam-eyebrow">— OtherSide —</div>
            <h1 className="hero-seam-title">
              Both sides<br />
              <em>of every question.</em>
            </h1>
            <p className="hero-seam-sub">
              Anonymous Q&amp;A between the genders. Ask honestly. Get answered honestly. No profiles to perform for.
            </p>
            <div className="hero-seam-cta">
              <Link href="/signup" className="hero-seam-primary">
                Start asking<span className="hero-seam-primary-arrow">→</span>
              </Link>
              <Link href="/feed" className="hero-seam-secondary">
                Or browse →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LIVE TICKER ============ */}
      <section className="ticker-section">
        <div className="ticker-container">
          <div className="ticker-label">
            <span className="ticker-dot" />
            <span>Asked in the last hour</span>
          </div>
          <div className="ticker-rotating">
            {tickerQuestions.map((q, i) => (
              <div
                key={i}
                className={`ticker-q ${i === tickerIndex ? 'active' : ''} ${q.gender}`}
              >
                <span className={`ticker-gtag ${q.gender}`}>{q.gender === 'girl' ? 'Girl' : 'Guy'}</span>
                <span className="ticker-text">{q.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LIVE NUMBERS ============ */}
      <section className="numbers-section">
        <div className="numbers-grid">
          {[
            { num: onlineCount.toLocaleString(), label: 'people online', color: 'gr' },
            { num: '12,4k', label: 'questions asked', color: 'vi' },
            { num: '48,2k', label: 'honest answers', color: 'pk' },
            { num: '94%', label: 'get a real reply', color: 'bl' },
          ].map((stat) => (
            <div key={stat.label} className="numbers-cell">
              <div className={`numbers-num c-${stat.color}`}>{stat.num}</div>
              <div className="numbers-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ THE PROBLEM SECTION ============ */}
      <section className="problem-section">
        <div className="problem-eyebrow">
          <span className="problem-eyebrow-line" />
          <span>Why this exists</span>
        </div>
        <h2 className="problem-headline">
          You&apos;re asking your group chat about<br />
          someone who isn&apos;t there to <em>explain themselves.</em>
        </h2>
        <p className="problem-body">
          Your friends mean well. They also share your worldview, your habits, and probably your gender. Which means when something feels confusing, you get back a louder version of what you already think. <em>That&apos;s not insight, that&apos;s an echo.</em>
        </p>
        <div className="problem-divider">
          <span />
          <span className="problem-divider-text">OtherSide</span>
          <span />
        </div>
        <p className="problem-body">
          Here, your question lands in front of the gender you&apos;re actually trying to understand. Not a panel of friends, not a relationship expert. Real people, anonymous, willing to tell you the unflattering version.
        </p>
      </section>

      {/* ============ REAL THREADS ============ */}
      <section className="threads-section">
        <div className="threads-header">
          <div className="threads-eyebrow">
            <span className="threads-eyebrow-line" />
            <span>Real threads, today</span>
          </div>
          <h2 className="threads-title">
            What the <em>other side</em> is actually saying.
          </h2>
        </div>

        <div className="threads-list">
          {[
            {
              gender: 'girl',
              time: '2h ago',
              topic: 'Texting',
              q: 'When a guy says "I\'ll let you know" about plans — be honest, is that just a polite no?',
              answers: 47,
              splitGirls: 30, splitGuys: 64, splitNb: 6,
              reply: {
                gender: 'guy',
                handle: '@northbound',
                text: 'Honestly? 80% of the time it\'s a soft no. The other 20% he genuinely forgot. If you want a real answer, propose a specific time. "I\'ll let you know" dies the second it meets a Tuesday at 7.',
              },
            },
            {
              gender: 'guy',
              time: '5h ago',
              topic: 'Crushes',
              q: 'Girls — when you call a guy "sweet", is that ever code for "no chemistry"? I need to know.',
              answers: 93,
              splitGirls: 73, splitGuys: 22, splitNb: 5,
              reply: {
                gender: 'girl',
                handle: '@junebug',
                text: 'Sweet alone? Mixed signal. Sweet + something specific (sweet AND funny, sweet AND attentive)? You\'re winning. Sweet by itself, said softly, with a small smile she doesn\'t quite commit to? Brace yourself.',
              },
            },
            {
              gender: 'girl',
              time: '11h ago',
              topic: 'Ghosting',
              q: 'Do guys actually know they\'re ghosting in the moment, or does it happen by default?',
              answers: 142,
              splitGirls: 38, splitGuys: 55, splitNb: 7,
              reply: {
                gender: 'guy',
                handle: '@mariner',
                text: 'Almost always the second one. Day 1 you\'re "just busy." Day 3 you\'re embarrassed. Day 5 you\'ve talked yourself into believing she didn\'t really like you anyway. By day 7 you\'re just a guy who didn\'t text back.',
              },
            },
          ].map((p, i) => (
            <article key={i} className="thread-card">
              <div className="thread-rail-wrap">
                <div className={`thread-rail ${p.gender}`} />
              </div>

              <div className="thread-content">
                <div className="thread-head">
                  <span className={`thread-gtag ${p.gender}`}>
                    <span className="thread-gtag-dot" />
                    {p.gender === 'girl' ? 'Girl' : 'Guy'}
                  </span>
                  <span className="thread-dot">·</span>
                  <span className="thread-time">{p.time}</span>
                  <span className="thread-dot">·</span>
                  <span className="thread-topic">{p.topic}</span>
                </div>

                <h3 className="thread-q">{p.q}</h3>

                <div className={`thread-reply ${p.reply.gender}`}>
                  <div className="thread-reply-head">
                    <span className={`thread-reply-gtag ${p.reply.gender}`}>
                      {p.reply.gender === 'girl' ? 'Girl' : 'Guy'}
                    </span>
                    <span className="thread-reply-handle">{p.reply.handle}</span>
                    <span className="thread-reply-meta">· top reply</span>
                  </div>
                  <p className="thread-reply-text">&ldquo;{p.reply.text}&rdquo;</p>
                </div>

                <div className="thread-foot">
                  <div className="thread-foot-stat">
                    <span className="thread-foot-num">{p.answers}</span>
                    <span className="thread-foot-lab">answers</span>
                  </div>
                  <div className="thread-foot-bar">
                    <div className="thread-foot-bar-g" style={{ width: `${p.splitGirls}%` }} />
                    <div className="thread-foot-bar-b" style={{ width: `${p.splitGuys}%` }} />
                    <div className="thread-foot-bar-v" style={{ width: `${p.splitNb}%` }} />
                  </div>
                  <div className="thread-foot-split">
                    <span className="thread-foot-pk">{p.splitGirls}%</span>
                    <span style={{ color: 'var(--t5)' }}>·</span>
                    <span className="thread-foot-bl">{p.splitGuys}%</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="threads-see-all">
          <Link href="/feed" className="threads-see-all-btn">
            See every question →
          </Link>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="how-section">
        <div className="how-eyebrow">
          <span className="how-eyebrow-line" />
          <span>The flow</span>
        </div>

        <div className="how-grid">
          {[
            {
              step: '01',
              color: 'pk',
              title: 'Ask',
              desc: 'Post anonymously. Pick a topic. Your gender shows, your identity never does.',
            },
            {
              step: '02',
              color: 'vi',
              title: 'Get answered',
              desc: 'The other side replies. See the gender split, read perspectives you couldn\'t get from your friends.',
            },
            {
              step: '03',
              color: 'bl',
              title: 'Go deeper',
              desc: 'Join a live room. Pull someone aside for a 1-on-1. Or just read until something clicks.',
            },
          ].map((step) => (
            <div key={step.step} className="how-card">
              <div className={`how-num c-${step.color}`}>{step.step}</div>
              <h3 className="how-title">{step.title}</h3>
              <p className="how-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="features-section">
        <div className="features-grid">
          {[
            { glyph: '◐', color: 'pk', title: 'Always gender-tagged', desc: 'Every post and reply shows Girl, Guy, or Non-binary. Never a real name.' },
            { glyph: '⚭', color: 'vi', title: '1-on-1 matching', desc: 'Get paired anonymously with someone from the other side for 10 honest minutes.' },
            { glyph: '●', color: 'gr', title: 'Six rooms always live', desc: 'Drop into a live room, watch the gender split shift as the conversation moves.' },
            { glyph: '◇', color: 'bl', title: 'Hot takes & polls', desc: 'See exactly how the two sides split on the same question.' },
          ].map((f) => (
            <div key={f.title} className="feature-card">
              <div className={`feature-glyph c-${f.color}`}>{f.glyph}</div>
              <div className="feature-text">
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="cta-section">
        <div className="cta-card">
          <div className="cta-eyebrow">Free · always anonymous · 1,247 here right now</div>
          <h2 className="cta-headline">
            Ask the thing<br />
            you&apos;ve been <em>too afraid to Google.</em>
          </h2>
          <p className="cta-sub">
            The other side already has an answer. They just need someone to ask.
          </p>
          <div className="cta-buttons">
            <Link href="/signup" className="cta-primary">
              Join free<span className="cta-primary-arrow">→</span>
            </Link>
            <Link href="/feed" className="cta-secondary">
              Read first
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-foot">
        <div className="landing-foot-inner">
          <div className="logo" style={{ fontSize: 17 }}>
            <span className="o">Other</span>
            <span className="amp">/</span>
            <span className="s">Side</span>
          </div>
          <div className="landing-foot-links">
            <a>Privacy</a>
            <a>Terms</a>
            <a>Guidelines</a>
            <a>@othersidechat</a>
          </div>
          <div className="landing-foot-copy">© OtherSide 2026 · Made for the curious.</div>
        </div>
      </footer>
    </>
  );
}