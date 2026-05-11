import Link from 'next/link';

export default function RoomsPage() {
  return (
    <>
      <div className="grain" aria-hidden />

      {/* TOP BAR */}
      <header className="topbar">
        <div className="logo">
          <span className="o">Other</span>
          <span className="amp">/</span>
          <span className="s">Side</span>
        </div>
        <nav className="nav-tabs">
          <Link href="/feed" className="tab">Feed</Link>
          <Link href="/rooms" className="tab active">Rooms</Link>
          <Link href="/match" className="tab">Match</Link>
        </nav>
        <div className="topbar-right">
          <div className="ticker">
            <span className="live-dot" />
            <span>1,247 online · 6 rooms live</span>
          </div>
          <button className="btn-match">⚭ 1-on-1 match</button>
          <div className="avatar">M</div>
        </div>
      </header>

      <div className="rooms-shell">
        {/* LEFT — ROOM LIST */}
        <aside className="roomlist">
          <div className="roomlist-head">
            <div className="roomlist-overline">Live now</div>
            <h2>
              <em>Six rooms.</em>
              <br />
              Join the noise.
            </h2>
          </div>
          <div className="roomlist-search">
            <span>⌕</span>
            <span>Search rooms</span>
          </div>
          <div className="roomlist-filter">
            <button className="rfilter active">All</button>
            <button className="rfilter">Mixed</button>
            <button className="rfilter">Quiet</button>
            <button className="rfilter">+1</button>
          </div>
          <div className="rooms-list">
            <div className="room-card active">
              <div className="room-top">
                <div className="room-card-pulse" />
                <div className="room-card-name">Why do guys ghost</div>
                <div className="room-count">80</div>
              </div>
              <p className="room-desc">An ongoing investigation. No prosecutions yet.</p>
              <div className="room-stats">
                <span className="pks">42</span>
                <span className="bls">38</span>
                <span style={{ color: 'var(--t4)' }}>· 14 typing</span>
              </div>
              <div className="room-mini-bar">
                <div className="gf" style={{ width: '52%' }} />
                <div className="bf" style={{ width: '48%' }} />
              </div>
            </div>

            <div className="room-card">
              <div className="room-top">
                <div className="room-card-pulse" />
                <div className="room-card-name">Texting rules 2025</div>
                <div className="room-count">60</div>
              </div>
              <p className="room-desc">Double texts? Read receipts? The voice memo discourse?</p>
              <div className="room-stats">
                <span className="pks">31</span>
                <span className="bls">29</span>
              </div>
              <div className="room-mini-bar">
                <div className="gf" style={{ width: '51%' }} />
                <div className="bf" style={{ width: '49%' }} />
              </div>
            </div>

            <div className="room-card">
              <div className="room-top">
                <div className="room-card-pulse" />
                <div className="room-card-name">First moves</div>
                <div className="room-count">52</div>
              </div>
              <p className="room-desc">Who should send the first text. Everyone has a take.</p>
              <div className="room-stats">
                <span className="pks">22</span>
                <span className="bls">30</span>
              </div>
              <div className="room-mini-bar">
                <div className="gf" style={{ width: '42%' }} />
                <div className="bf" style={{ width: '58%' }} />
              </div>
            </div>

            <div className="room-card">
              <div className="room-top">
                <div className="room-card-pulse" />
                <div className="room-card-name">Unpopular opinions</div>
                <div className="room-count">47</div>
              </div>
              <p className="room-desc">Things you can&apos;t say out loud at the dinner table.</p>
              <div className="room-stats">
                <span className="pks">28</span>
                <span className="bls">19</span>
              </div>
              <div className="room-mini-bar">
                <div className="gf" style={{ width: '60%' }} />
                <div className="bf" style={{ width: '40%' }} />
              </div>
            </div>

            <div className="room-card">
              <div className="room-top">
                <div className="room-card-pulse" />
                <div className="room-card-name">Breakup recovery</div>
                <div className="room-count">38</div>
              </div>
              <p className="room-desc">Be gentle in here. Real time, real wounds.</p>
              <div className="room-stats">
                <span className="pks">26</span>
                <span className="bls">12</span>
              </div>
              <div className="room-mini-bar">
                <div className="gf" style={{ width: '68%' }} />
                <div className="bf" style={{ width: '32%' }} />
              </div>
            </div>

            <div className="room-card">
              <div className="room-top">
                <div className="room-card-pulse" />
                <div className="room-card-name">Red flags debate</div>
                <div className="room-count">43</div>
              </div>
              <p className="room-desc">Everyone&apos;s a forensic analyst now.</p>
              <div className="room-stats">
                <span className="pks">24</span>
                <span className="bls">19</span>
              </div>
              <div className="room-mini-bar">
                <div className="gf" style={{ width: '56%' }} />
                <div className="bf" style={{ width: '44%' }} />
              </div>
            </div>
          </div>
        </aside>

        {/* CENTER — CHAT */}
        <main className="chat">
          <div className="chat-head">
            <div className="chat-head-info">
              <div className="chat-head-meta">
                <span className="live-dot" /> Live · 80 in the room · 14 typing
              </div>
              <div className="chat-head-title">
                Why do guys <em>ghost</em>?
              </div>
            </div>
            <div className="chat-head-stack">
              <div className="stack-av" style={{ background: 'linear-gradient(135deg,#d45878,#a83858)' }}>J</div>
              <div className="stack-av" style={{ background: 'linear-gradient(135deg,#4888c8,#2868a8)' }}>N</div>
              <div className="stack-av" style={{ background: 'linear-gradient(135deg,#d45878,#a83858)' }}>A</div>
              <div className="stack-av" style={{ background: 'linear-gradient(135deg,#8870e8,#6850c8)' }}>K</div>
              <div className="stack-more">+76 here</div>
            </div>
            <div className="chat-head-actions">
              <button className="chat-head-icbtn">⌕</button>
              <button className="chat-head-icbtn">⋯</button>
              <button className="btn-match">⚭ Match instead</button>
            </div>
          </div>

          <div className="ratio-strip">
            <div className="ratio-strip-meta">
              <span className="pk">42 GIRLS · 52%</span>
              <span style={{ color: 'var(--t4)' }}>Room balance</span>
              <span className="bl">38 GUYS · 48%</span>
            </div>
            <div className="ratio-strip-bar">
              <div className="gp" style={{ width: '52%' }} />
              <div className="bp" style={{ width: '48%' }} />
            </div>
          </div>

          <div className="messages">
            <div className="day-divider">
              <span className="line" />
              <span>Today</span>
              <span className="line" />
            </div>

            <div className="msg">
              <div className="msg-av girl">J</div>
              <div className="msg-content">
                <div className="msg-head">
                  <span className="msg-name">@junebug</span>
                  <span className="msg-gtag girl">Girl</span>
                  <span className="msg-time">2:14 PM</span>
                </div>
                <div className="msg-bubble girl">
                  Genuine question and I&apos;m not being passive aggressive — when you ghost, do you know in the moment that you&apos;re doing it? Or does it happen kind of by default and you only realize a week later?
                </div>
                <div className="msg-actions">
                  <span className="liked">♥ 24</span>
                  <span className="replied">↩ 8 replies</span>
                  <span>↗ Save</span>
                </div>
              </div>
            </div>

            <div className="msg">
              <div className="msg-av guy">N</div>
              <div className="msg-content">
                <div className="msg-head">
                  <span className="msg-name">@northbound</span>
                  <span className="msg-gtag guy">Guy</span>
                  <span className="msg-time">2:15 PM</span>
                </div>
                <div className="msg-bubble guy">
                  Honest answer: it&apos;s almost always the second one. The first day you&apos;re &ldquo;just busy,&rdquo; day two you &ldquo;feel weird about not replying yesterday,&rdquo; day three you&apos;re embarrassed, day four you&apos;ve talked yourself into believing she didn&apos;t really like you anyway, and by day five you&apos;re just a guy who didn&apos;t text back.
                </div>
                <div className="msg-actions">
                  <span className="liked">♥ 142</span>
                  <span className="replied">↩ 31 replies</span>
                  <span>↗ Save</span>
                </div>
                <div className="replies-pill">
                  <div className="stack">
                    <div style={{ background: 'linear-gradient(135deg,#d45878,#a83858)' }}>A</div>
                    <div style={{ background: 'linear-gradient(135deg,#d45878,#a83858)' }}>M</div>
                    <div style={{ background: 'linear-gradient(135deg,#8870e8,#6850c8)' }}>K</div>
                  </div>
                  <span>31 replies, mostly girls</span>
                  <span className="arrow">›</span>
                </div>
              </div>
            </div>

            <div className="msg">
              <div className="msg-av girl">A</div>
              <div className="msg-content">
                <div className="msg-head">
                  <span className="msg-name">@ashlight</span>
                  <span className="msg-gtag girl">Girl</span>
                  <span className="msg-time">2:17 PM</span>
                </div>
                <div className="msg-bubble girl">
                  @northbound this is the most useful thing I&apos;ve read all year. The &ldquo;embarrassment compounds&rdquo; part — I never thought about it like that. We always think it&apos;s because <em>we</em> did something wrong.
                </div>
                <div className="msg-actions">
                  <span>♡ 67</span>
                  <span>↩ Reply</span>
                </div>
              </div>
            </div>

            <div className="ai-insight">
              <div className="ai-head">
                <div className="ai-icon">A</div>
                <span className="ai-label">OtherSide insight</span>
                <span className="ai-tag">Auto-generated · 2:18 PM</span>
              </div>
              <p className="ai-text">
                A pattern is emerging in this thread. <strong>78% of guys</strong> describe ghosting as a passive avoidance loop — embarrassment compounding over days — while <strong>62% of girls</strong> initially read it as a deliberate rejection. The gap might matter.
              </p>
              <div className="ai-stats">
                <span><b>43</b> messages analyzed</span>
                <span><b>3</b> emerging themes</span>
                <span><b>91%</b> agreement rate</span>
              </div>
            </div>

            <div className="msg">
              <div className="msg-av nb">K</div>
              <div className="msg-content">
                <div className="msg-head">
                  <span className="msg-name">@kestrel</span>
                  <span className="msg-gtag nb">Non-binary</span>
                  <span className="msg-time">2:19 PM</span>
                </div>
                <div className="msg-bubble nb">
                  From the outside looking at both sides — I think the real issue is nobody was taught how to say &ldquo;I&apos;m not feeling this anymore&rdquo; without it feeling cruel. So we just disappear and call it kindness.
                </div>
                <div className="msg-actions">
                  <span className="liked">♥ 89</span>
                  <span className="replied">↩ 12 replies</span>
                </div>
              </div>
            </div>

            <div className="msg">
              <div className="msg-av guy">M</div>
              <div className="msg-content">
                <div className="msg-head">
                  <span className="msg-name">@mariner</span>
                  <span className="msg-gtag guy">Guy</span>
                  <span className="msg-time">2:21 PM</span>
                </div>
                <div className="msg-bubble guy">
                  Counterpoint and I&apos;ll probably get downvoted for this — sometimes ghosting <em>is</em> the kind option. Three weeks in, no commitments made, sending a paragraph about why you&apos;re &ldquo;not feeling it anymore&rdquo; reads like overstepping. A gentle fade is the contract.
                </div>
                <div className="msg-actions">
                  <span>♡ 41</span>
                  <span style={{ color: 'var(--pk)' }}>↻ 18 disagreements</span>
                  <span>↩ Reply</span>
                </div>
              </div>
            </div>

            <div className="typing">
              <div className="typing-av">A</div>
              <div className="typing-name">
                <b>@ashlight</b> and 4 girls are typing
              </div>
              <div className="typing-dots">
                <span /><span /><span />
              </div>
            </div>
          </div>

          <div className="input-wrap">
            <div className="input-box">
              <button className="input-icbtn">＋</button>
              <input className="input-field" placeholder="Speak honestly. You're tagged Girl." />
              <button className="input-icbtn">📎</button>
              <button className="input-icbtn">⊙</button>
              <button className="send-btn">Send →</button>
            </div>
            <div className="input-meta">
              <span>Posting as <b>@meadowlark · Girl</b></span>
              <span>↵ to send · ⇧↵ for newline · /commands</span>
            </div>
          </div>
        </main>

        {/* RIGHT — MEMBERS */}
        <aside className="members">
          <div className="members-section">
            <div className="members-label">In the room <span className="ct">80</span></div>
            <div className="member-row"><div className="mem-av girl">J<div className="od" /></div><span className="mem-name">@junebug</span><span className="mem-tag girl">Girl</span></div>
            <div className="member-row"><div className="mem-av guy">N<div className="od" /></div><span className="mem-name">@northbound</span><span className="mem-tag guy">Guy</span></div>
            <div className="member-row"><div className="mem-av girl">A<div className="od" /></div><span className="mem-name">@ashlight</span><span className="mem-tag girl">Girl</span></div>
            <div className="member-row"><div className="mem-av nb">K<div className="od" /></div><span className="mem-name">@kestrel</span><span className="mem-tag nb">NB</span></div>
            <div className="member-row"><div className="mem-av guy">M<div className="od" /></div><span className="mem-name">@mariner</span><span className="mem-tag guy">Guy</span></div>
            <div className="member-row"><div className="mem-av girl">W<div className="od" /></div><span className="mem-name">@willowhaze</span><span className="mem-tag girl">Girl</span></div>
            <div className="member-row"><div className="mem-av guy">O<div className="od" /></div><span className="mem-name">@oakharbor</span><span className="mem-tag guy">Guy</span></div>
            <div className="member-row"><div className="mem-av girl">F<div className="od" /></div><span className="mem-name">@fernshade</span><span className="mem-tag girl">Girl</span></div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--t4)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 10, textAlign: 'center', cursor: 'pointer' }}>
              Show all 80 →
            </div>
          </div>

          <div className="members-section">
            <div className="members-label">Hot takes here</div>
            <div className="hottake">
              <p className="hottake-q">&ldquo;Ghosting is not the kindness you think it is.&rdquo;</p>
              <p className="hottake-meta"><span className="up">↑ 142</span> · 28 girls agree</p>
            </div>
            <div className="hottake">
              <p className="hottake-q">&ldquo;A gentle fade is the contract.&rdquo;</p>
              <p className="hottake-meta"><span className="up">↑ 41</span> · 18 disagree</p>
            </div>
            <div className="hottake">
              <p className="hottake-q">&ldquo;We just disappear and call it kindness.&rdquo;</p>
              <p className="hottake-meta"><span className="up">↑ 89</span> · everyone agreeing</p>
            </div>
          </div>

          <div className="members-section">
            <div className="members-label">Want a 1-on-1?</div>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13, color: 'var(--t2)', lineHeight: 1.5, marginBottom: 12 }}>
              Pull someone from this room aside. Anonymous, ten-minute window, no profile reveals.
            </p>
            <button className="btn-match" style={{ width: '100%', justifyContent: 'center' }}>
              ⚭ Find a match
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}