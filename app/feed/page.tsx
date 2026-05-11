'use client';

import Link from 'next/link';
import { useComposer } from '@/components/composer/ComposerContext';

export default function FeedPage() {
  const { open } = useComposer();

  return (
    <>
      <div className="atmosphere" aria-hidden />
      <div className="grain" aria-hidden />

      {/* TOP BAR */}
      <header className="topbar">
        <div className="logo">
          <span className="o">Other</span>
          <span className="amp">/</span>
          <span className="s">Side</span>
        </div>
        <nav className="nav-tabs">
          <Link href="/feed" className="tab active">Feed</Link>
          <Link href="/rooms" className="tab">Rooms</Link>
          <Link href="/match" className="tab">Match</Link>
        </nav>
        <div className="topbar-right">
          <div className="ticker">
            <span className="live-dot" />
            <span>1,247 online · 6 rooms live</span>
          </div>
          <button className="btn-post" onClick={() => open('question')}>＋ New post</button>
          <div className="avatar">M</div>
        </div>
      </header>

      <div className="feed-shell">
        {/* LEFT RAIL */}
        <aside className="rail">
          <div className="rail-section">
            <div className="rail-label">Navigate</div>
            <a className="rail-link active"><span className="ic">●</span> Home<span className="count">42</span></a>
            <a className="rail-link"><span className="ic">◐</span> Following</a>
            <a className="rail-link"><span className="ic">◇</span> Hot takes<span className="count">12</span></a>
            <a className="rail-link"><span className="ic">▢</span> Polls</a>
            <a className="rail-link"><span className="ic">⌘</span> Saved</a>
          </div>

          <div className="rail-section">
            <div className="rail-label">Topics</div>
            <span className="topic-pill hot"><span className="dot" />Dating</span>
            <span className="topic-pill hot"><span className="dot" />Texting</span>
            <span className="topic-pill"><span className="dot" />First dates</span>
            <span className="topic-pill"><span className="dot" />Breakups</span>
            <span className="topic-pill"><span className="dot" />Long distance</span>
            <span className="topic-pill"><span className="dot" />Red flags</span>
            <span className="topic-pill"><span className="dot" />Crushes</span>
            <span className="topic-pill"><span className="dot" />Marriage</span>
          </div>

          <div className="rail-section">
            <div className="rail-label">Your week</div>
            <div style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span style={{ color: 'var(--t3)' }}>Posts</span>
                <span style={{ fontFamily: 'var(--mono)', fontWeight: 500 }}>3</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span style={{ color: 'var(--t3)' }}>Answers</span>
                <span style={{ fontFamily: 'var(--mono)', fontWeight: 500 }}>11</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span style={{ color: 'var(--t3)' }}>Upvotes</span>
                <span style={{ fontFamily: 'var(--mono)', color: 'var(--gr)', fontWeight: 500 }}>+128</span>
              </div>
            </div>
          </div>

          <div className="me-card">
            <div className="av">M</div>
            <div>
              <div className="name">@meadowlark</div>
              <div className="meta">Girl · L4</div>
            </div>
            <div className="gear">⚙</div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="main">
          {/* Editorial header */}
          <div className="editorial fade-in">
            <div className="editorial-overline">Sunday · May 10 · Issue №217</div>
            <h1>
              Honest answers <em>from her.</em>
              <br />
              Honest answers <strong>from him.</strong>
            </h1>
            <p className="editorial-sub">Anonymous questions, two perspectives, no profiles to perform for.</p>
            <div className="editorial-meta">
              <span><strong>1,247</strong> people online</span>
              <span><strong>42</strong> new questions today</span>
              <span><strong>6</strong> rooms live</span>
            </div>
          </div>

          {/* Compose — clickable, opens the modal */}
          <div
            className="compose fade-in d1"
            onClick={() => open('question')}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open('question');
              }
            }}
          >
            <div className="compose-row">
              <div className="compose-av">M</div>
              <div className="compose-input">Ask the other side something honest</div>
            </div>
            <div className="compose-actions">
              <button
                className="compose-chip act"
                onClick={(e) => { e.stopPropagation(); open('question'); }}
                type="button"
              >
                ◇ Question
              </button>
              <button
                className="compose-chip"
                onClick={(e) => { e.stopPropagation(); open('hot_take'); }}
                type="button"
              >
                ⚡ Hot take
              </button>
              <button
                className="compose-chip"
                onClick={(e) => { e.stopPropagation(); open('poll'); }}
                type="button"
              >
                ▢ Poll
              </button>
              <button className="compose-submit" onClick={(e) => e.stopPropagation()}>Post</button>
            </div>
          </div>

          {/* Today's debate */}
          <div className="debate fade-in d2">
            <button className="debate-cta">Cast your vote →</button>
            <div className="debate-tag">Today&apos;s debate · closes in 4h 12m</div>
            <h2>Is texting &ldquo;good morning&rdquo; every day a green flag, or does it lose meaning by week three?</h2>
            <div className="debate-byline">
              Posed by <em>@willowhaze</em> · 2,418 votes so far · split by gender below
            </div>
            <div className="ratio">
              <div className="ratio-bar">
                <div className="ratio-girls">58% girls — green flag</div>
                <div className="ratio-guys">42% guys — overrated</div>
              </div>
              <div className="ratio-meta">
                <span><b>1,402</b> Girls voted</span>
                <span><b>1,016</b> Guys voted</span>
              </div>
            </div>
          </div>

          {/* Filter bar */}
          <div className="filter-bar">
            <a className="filter-tab active">For you<span className="count">42</span></a>
            <a className="filter-tab">Following</a>
            <a className="filter-tab">Hot takes<span className="count">12</span></a>
            <div className="filter-spacer" />
            <span className="filter-sort">Sort · most loved ▾</span>
          </div>

          {/* POST 1 */}
          <article className="post fade-in d3">
            <div className="post-rail girl" />
            <div className="post-head">
              <span className="gtag girl">Girl</span>
              <span className="post-dot">·</span>
              <span className="post-time">2h ago</span>
              <span className="post-dot">·</span>
              <span className="post-topic">Texting</span>
            </div>
            <h3 className="post-q">
              When a guy says <em>&ldquo;I&apos;ll let you know&rdquo;</em> about plans — be honest, is that just a polite no?
            </h3>
            <p className="post-context">
              I keep doing this dance where I suggest something casual, he says he&apos;ll let me know, and then crickets for 4 days. I&apos;m not 22 anymore, I just want to know how to read it.
            </p>

            <div className="answer-preview guy">
              <div className="answer-preview-head">
                <span className="gtag guy">Guy</span>
                <span className="name">@northbound</span>
                <span style={{ color: 'var(--t4)' }}>· top reply</span>
              </div>
              <p className="answer-preview-text">
                Honestly? 80% of the time it&apos;s a soft no, and the other 20% he genuinely forgot because life. If you want a real answer, propose a specific time. &ldquo;I&apos;ll let you know&rdquo; dies the second it meets a Tuesday at 7.
              </p>
            </div>

            <div className="breakdown">
              <div className="breakdown-stat"><span className="breakdown-num all">47</span><span className="breakdown-lab">Total</span></div>
              <div className="breakdown-stat"><span className="breakdown-num girl">14</span><span className="breakdown-lab">Girls</span></div>
              <div className="breakdown-bar">
                <div className="gp" style={{ width: '30%' }} />
                <div className="bp" style={{ width: '64%' }} />
                <div className="vp" style={{ width: '6%' }} />
              </div>
              <div className="breakdown-stat"><span className="breakdown-num guy">30</span><span className="breakdown-lab">Guys</span></div>
              <div className="breakdown-stat"><span className="breakdown-num nb">3</span><span className="breakdown-lab">Other</span></div>
              <span className="breakdown-cta">See all</span>
            </div>

            <div className="post-actions">
              <span className="post-action liked">♥ 284</span>
              <span className="post-action">⌘ Save</span>
              <span className="post-action">↗ Share</span>
              <span className="post-action" style={{ marginLeft: 'auto' }}>⌐ Report</span>
            </div>
          </article>

          {/* POST 2 — Hot take */}
          <article className="post">
            <div className="post-rail guy" />
            <div className="post-head">
              <span className="gtag guy">Guy</span>
              <span className="post-dot">·</span>
              <span className="post-time">5h ago</span>
              <span className="post-dot">·</span>
              <span className="post-topic">Dating</span>
            </div>
            <div className="post-takelabel">Hot take</div>
            <h3 className="post-q">
              Splitting the bill on a first date isn&apos;t progressive. It&apos;s a slow exit ramp out of attraction. Fight me.
            </h3>
            <p className="post-context">
              <em>Receiving downvotes gracefully in advance.</em> But hear me out — I think generosity is a love language we&apos;ve talked ourselves out of, and the &ldquo;Venmo me half&rdquo; energy at the end of dinner kills more chemistry than any awkward silence ever could.
            </p>

            <div className="breakdown">
              <div className="breakdown-stat"><span className="breakdown-num all">119</span><span className="breakdown-lab">Total</span></div>
              <div className="breakdown-stat"><span className="breakdown-num girl">71</span><span className="breakdown-lab">Girls</span></div>
              <div className="breakdown-bar">
                <div className="gp" style={{ width: '60%' }} />
                <div className="bp" style={{ width: '33%' }} />
                <div className="vp" style={{ width: '7%' }} />
              </div>
              <div className="breakdown-stat"><span className="breakdown-num guy">39</span><span className="breakdown-lab">Guys</span></div>
              <div className="breakdown-stat"><span className="breakdown-num nb">9</span><span className="breakdown-lab">Other</span></div>
              <span className="breakdown-cta">See all</span>
            </div>

            <div className="post-actions">
              <span className="post-action">♡ 512</span>
              <span className="post-action">⌘ Save</span>
              <span className="post-action">↗ Share</span>
              <span className="post-action" style={{ marginLeft: 'auto' }}>⌐ Report</span>
            </div>
          </article>

          <div className="section-break">
            <span className="line" />
            <span className="label">— Live polls —</span>
            <span className="line" />
          </div>

          {/* POST 3 — Poll */}
          <article className="post">
            <div className="post-rail nb" />
            <div className="post-head">
              <span className="gtag nb">Non-binary</span>
              <span className="post-dot">·</span>
              <span className="post-time">7h ago</span>
              <span className="post-dot">·</span>
              <span className="post-topic">Red flags</span>
            </div>
            <h3 className="post-q">Which of these would actually end the relationship for you — be honest with yourself.</h3>

            <div className="poll">
              <div className="poll-opt">
                <div className="poll-fill" style={{ width: '34%' }} />
                <div className="poll-content"><span>They&apos;re rude to waitstaff</span><span className="poll-pct">34%</span></div>
              </div>
              <div className="poll-opt">
                <div className="poll-fill" style={{ width: '41%' }} />
                <div className="poll-content"><span>They badmouth their ex constantly</span><span className="poll-pct">41%</span></div>
              </div>
              <div className="poll-opt">
                <div className="poll-fill" style={{ width: '18%' }} />
                <div className="poll-content"><span>They never apologize first, ever</span><span className="poll-pct">18%</span></div>
              </div>
              <div className="poll-opt">
                <div className="poll-fill" style={{ width: '7%' }} />
                <div className="poll-content"><span>They hate your friends</span><span className="poll-pct">7%</span></div>
              </div>
            </div>
            <div className="poll-meta">874 votes · 3h remaining · split: 52% girls / 41% guys / 7% nb</div>

            <div className="post-actions" style={{ marginTop: 18 }}>
              <span className="post-action">♡ 198</span>
              <span className="post-action">💬 64 replies</span>
              <span className="post-action">⌘ Save</span>
              <span className="post-action" style={{ marginLeft: 'auto' }}>↗ Share</span>
            </div>
          </article>

          {/* POST 4 */}
          <article className="post">
            <div className="post-rail guy" />
            <div className="post-head">
              <span className="gtag guy">Guy</span>
              <span className="post-dot">·</span>
              <span className="post-time">11h ago</span>
              <span className="post-dot">·</span>
              <span className="post-topic">Crushes</span>
            </div>
            <h3 className="post-q">
              Girls — when you say a guy is <em>&ldquo;sweet&rdquo;</em>, is that ever code for &ldquo;no chemistry&rdquo;? I need to know.
            </h3>
            <p className="post-context">
              Asking for me. There&apos;s this person I&apos;ve been seeing for three weeks and she keeps using that word and I can&apos;t tell if I&apos;m winning or losing.
            </p>

            <div className="answer-preview girl">
              <div className="answer-preview-head">
                <span className="gtag girl">Girl</span>
                <span className="name">@junebug</span>
                <span style={{ color: 'var(--t4)' }}>· top reply</span>
              </div>
              <p className="answer-preview-text">
                Sweet alone? Mixed signal. Sweet + something specific (sweet AND funny, sweet AND attentive)? You&apos;re winning. Sweet by itself, said softly, with a small smile she doesn&apos;t quite commit to? Brace yourself, friend.
              </p>
            </div>

            <div className="breakdown">
              <div className="breakdown-stat"><span className="breakdown-num all">93</span><span className="breakdown-lab">Total</span></div>
              <div className="breakdown-stat"><span className="breakdown-num girl">68</span><span className="breakdown-lab">Girls</span></div>
              <div className="breakdown-bar">
                <div className="gp" style={{ width: '73%' }} />
                <div className="bp" style={{ width: '22%' }} />
                <div className="vp" style={{ width: '5%' }} />
              </div>
              <div className="breakdown-stat"><span className="breakdown-num guy">20</span><span className="breakdown-lab">Guys</span></div>
              <div className="breakdown-stat"><span className="breakdown-num nb">5</span><span className="breakdown-lab">Other</span></div>
              <span className="breakdown-cta">See all</span>
            </div>

            <div className="post-actions">
              <span className="post-action">♡ 367</span>
              <span className="post-action">⌘ Save</span>
              <span className="post-action">↗ Share</span>
            </div>
          </article>
        </main>

        {/* RIGHT ASIDE */}
        <aside className="aside">
          <div className="aside-search">
            <span>⌕</span>
            <span>Search questions, topics, people</span>
            <span className="kbd">⌘K</span>
          </div>

          <div className="pro">
            <div className="pro-tag">OtherSide Pro</div>
            <h3>
              Skip the queue.
              <br />
              Get answered first.
            </h3>
            <p>Your questions surface to the top of the other side&apos;s feed — and you&apos;ll get a written reply, not just a vote.</p>
            <div className="pro-features">
              <span className="pro-feature">Priority placement on the opposite gender&apos;s feed</span>
              <span className="pro-feature">Private mode — DM the best answer</span>
              <span className="pro-feature">No ads, ever</span>
            </div>
            <button className="pro-cta">Try Pro free for 7 days</button>
            <div className="pro-price">$4.99/month after · cancel anytime</div>
          </div>

          <div className="aside-section">
            <div className="aside-label">Trending now <span className="arrow">›</span></div>

            <div className="trend-item">
              <div className="trend-rank"><span className="trend-rank-num">01</span><span>Texting</span><span className="up">↑ 18%</span></div>
              <div className="trend-q">Why does he reply fast at 11am and ghost by 11pm?</div>
              <div className="trend-meta">312 answers · 88% girls asking</div>
            </div>
            <div className="trend-item">
              <div className="trend-rank"><span className="trend-rank-num">02</span><span>First dates</span><span className="up">↑ 9%</span></div>
              <div className="trend-q">Is suggesting coffee instead of dinner a red flag?</div>
              <div className="trend-meta">241 answers · split evenly</div>
            </div>
            <div className="trend-item">
              <div className="trend-rank"><span className="trend-rank-num">03</span><span>Breakups</span><span className="up">↑ 12%</span></div>
              <div className="trend-q">How long until you stop checking their Spotify?</div>
              <div className="trend-meta">189 answers · 71% girls asking</div>
            </div>
            <div className="trend-item">
              <div className="trend-rank"><span className="trend-rank-num">04</span><span>Crushes</span><span className="up">↑ 6%</span></div>
              <div className="trend-q">Does eye contact across the room actually mean anything?</div>
              <div className="trend-meta">156 answers</div>
            </div>
          </div>

          <div className="aside-section">
            <div className="aside-label">Live rooms <span className="arrow">›</span></div>

            <div className="room-item">
              <div className="room-pulse" />
              <div style={{ flex: 1 }}>
                <div className="room-name">Why do guys ghost</div>
                <div className="room-meta"><span className="pkdot">42</span> · <span className="bldot">38</span> · 80 here now</div>
              </div>
            </div>
            <div className="room-item">
              <div className="room-pulse" />
              <div style={{ flex: 1 }}>
                <div className="room-name">Texting rules 2025</div>
                <div className="room-meta"><span className="pkdot">31</span> · <span className="bldot">29</span> · 60 here now</div>
              </div>
            </div>
            <div className="room-item">
              <div className="room-pulse" />
              <div style={{ flex: 1 }}>
                <div className="room-name">Red flags debate</div>
                <div className="room-meta"><span className="pkdot">24</span> · <span className="bldot">19</span> · 43 here now</div>
              </div>
            </div>
          </div>

          <div className="aside-foot">
            <a>About</a> · <a>Pro</a> · <a>Privacy</a>
            <br />
            <a>Terms</a> · <a>Guidelines</a> · <a>Press</a>
            <br />
            <span style={{ color: 'var(--t5)' }}>© OtherSide 2026</span>
          </div>
        </aside>
      </div>
    </>
  );
}