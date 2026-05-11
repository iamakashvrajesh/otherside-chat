import Link from 'next/link';

export default function MatchPage() {
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
          <Link href="/feed" className="tab">Feed</Link>
          <Link href="/rooms" className="tab">Rooms</Link>
          <Link href="/match" className="tab active">Match</Link>
        </nav>
        <div className="topbar-right">
          <div className="ticker">
            <span className="live-dot" />
            <span>1,247 online · 318 in queue</span>
          </div>
          <div className="avatar">M</div>
        </div>
      </header>

      {/* Stage strip */}
      <div className="stage-strip">
        <div className="stage-pill done"><span className="num">1</span><span>Set up</span></div>
        <div className="stage-pill done"><span className="num">2</span><span>Find someone</span></div>
        <div className="stage-pill active"><span className="num">3</span><span>Talk</span></div>
      </div>

      <div className="match-container">
        {/* ============ STAGE 1 ============ */}
        <section className="stage-section" id="stage-select">
          <div className="stage-overline">
            <span className="step">Step 01</span> Set the scene
          </div>
          <h1 className="stage-h">
            One question.
            <br />
            One <span className="pk">girl</span>, one <span className="bl">guy</span>.
            <br />
            <em>Ten honest minutes.</em>
          </h1>
          <p className="stage-sub">
            No profiles, no photos, no history. We pair you with someone from the other side based on the topic you pick. <em>You stay anonymous unless you both choose otherwise.</em>
          </p>

          <div className="modes">
            <div className="mode selected">
              <div className="mode-check" />
              <div className="mode-num">01</div>
              <h3 className="mode-h">Question <em>match</em></h3>
              <p className="mode-d">Bring a real question you&apos;ve been turning over. We pair you with someone of the opposite gender who&apos;s curious about the same thing.</p>
              <div className="mode-meta">
                <span><b>~12s</b> avg wait</span>
                <span>·</span>
                <span><b>10 min</b> session</span>
              </div>
            </div>
            <div className="mode">
              <div className="mode-check" />
              <div className="mode-num">02</div>
              <h3 className="mode-h">Room <em>pull-aside</em></h3>
              <p className="mode-d">Lift someone out of a live room you&apos;re already in. Continue the conversation privately, away from the noise.</p>
              <div className="mode-meta">
                <span><b>~30s</b> avg wait</span>
                <span>·</span>
                <span><b>15 min</b> session</span>
              </div>
            </div>
          </div>

          <div className="topics-block">
            <div className="topics-row">
              <span className="topics-label">Pick a topic — or two</span>
              <span className="topics-meta"><b>2</b> selected · 3 max</span>
            </div>
            <div className="topic-grid">
              <div className="topic sel">
                <div className="topic-name">Texting</div>
                <div className="topic-stat">
                  <span className="live-dot-mini" />
                  <span className="pks">38</span> · <span className="bls">42</span> waiting
                </div>
              </div>
              <div className="topic sel">
                <div className="topic-name">Ghosting</div>
                <div className="topic-stat">
                  <span className="live-dot-mini" />
                  <span className="pks">24</span> · <span className="bls">18</span> waiting
                </div>
              </div>
              <div className="topic">
                <div className="topic-name">First dates</div>
                <div className="topic-stat"><span className="pks">15</span> · <span className="bls">12</span> waiting</div>
              </div>
              <div className="topic">
                <div className="topic-name">Crushes</div>
                <div className="topic-stat"><span className="pks">22</span> · <span className="bls">9</span> waiting</div>
              </div>
              <div className="topic">
                <div className="topic-name">Long distance</div>
                <div className="topic-stat"><span className="pks">8</span> · <span className="bls">11</span> waiting</div>
              </div>
              <div className="topic">
                <div className="topic-name">Breakups</div>
                <div className="topic-stat"><span className="pks">19</span> · <span className="bls">14</span> waiting</div>
              </div>
              <div className="topic">
                <div className="topic-name">Red flags</div>
                <div className="topic-stat"><span className="pks">17</span> · <span className="bls">10</span> waiting</div>
              </div>
              <div className="topic">
                <div className="topic-name">Marriage</div>
                <div className="topic-stat"><span className="pks">6</span> · <span className="bls">5</span> waiting</div>
              </div>
            </div>
          </div>

          <div className="queue-info">
            <div className="queue-stat">
              <div className="queue-num pk">38</div>
              <div className="queue-lab">Girls in queue</div>
              <div className="queue-foot"><span className="up">↑ 12%</span> last hour</div>
            </div>
            <div className="queue-stat">
              <div className="queue-num bl">42</div>
              <div className="queue-lab">Guys in queue</div>
              <div className="queue-foot"><span className="up">↑ 8%</span> last hour</div>
            </div>
            <div className="queue-stat">
              <div className="queue-num">~12s</div>
              <div className="queue-lab">Avg wait</div>
              <div className="queue-foot">Faster than usual</div>
            </div>
            <div className="queue-stat">
              <div className="queue-num vi">94%</div>
              <div className="queue-lab">Match rate</div>
              <div className="queue-foot">Last 24 hours</div>
            </div>
          </div>

          <div className="privacy">
            <div className="privacy-icon">⌬</div>
            <div className="privacy-text">
              <b>You stay anonymous.</b> No usernames, no photos, no shared history. You can end the chat any time and neither side can find each other again unless you both opt in.
            </div>
          </div>

          <div className="stage-cta-row">
            <button className="start-btn">
              Start matching <span className="arrow">→</span>
            </button>
            <span className="start-meta">
              Tagged as <b>Girl</b> · matching with <b>Guy</b>
            </span>
          </div>
        </section>

        <div className="stage-divider">
          <span className="line" />
          <span className="label"><em>Then</em></span>
          <span className="line" />
        </div>

        {/* ============ STAGE 2 ============ */}
        <section className="stage-section" id="stage-search">
          <div className="stage-overline">
            <span className="step">Step 02</span> The pairing
          </div>
          <h1 className="stage-h">
            Listening for someone
            <br />
            <em>who&apos;s wondering the same thing.</em>
          </h1>

          <div className="searching-card" style={{ marginTop: 40 }}>
            <div className="pulse-stage">
              <div className="ring" />
              <div className="ring" />
              <div className="ring" />
              <div className="ring" />
              <div className="pulse-core">os</div>
            </div>

            <div className="searching-meta">Searching · 12s elapsed</div>
            <h2 className="searching-h">
              Looking for a <em>guy</em> who wants to talk about <em>texting</em>.
            </h2>
            <p className="searching-sub">
              &ldquo;We don&apos;t rush this part. The right pair is worth a few extra seconds.&rdquo;
            </p>

            <div className="live-stats">
              <div className="live-stat"><div className="live-stat-num pk">38</div><div className="live-stat-lab">Girls waiting</div></div>
              <div className="live-stat"><div className="live-stat-num bl">42</div><div className="live-stat-lab">Guys waiting</div></div>
              <div className="live-stat"><div className="live-stat-num">3</div><div className="live-stat-lab">Possible matches</div></div>
              <div className="live-stat"><div className="live-stat-num">~6s</div><div className="live-stat-lab">Est. remaining</div></div>
            </div>

            <div className="during-tip">
              <span className="ico">i</span>
              <div className="during-tip-text">
                <b>While you wait —</b> jot down the actual question that&apos;s been bugging you. The more specific you start, the better the conversation.
              </div>
            </div>

            <button className="cancel-btn">Cancel search</button>
          </div>
        </section>

        <div className="stage-divider">
          <span className="line" />
          <span className="label"><em>And then —</em></span>
          <span className="line" />
        </div>

        {/* ============ STAGE 3 ============ */}
        <section className="stage-section" id="stage-chat">
          <div className="stage-overline">
            <span className="step">Step 03</span> Live conversation
          </div>
          <h1 className="stage-h">
            Matched. <em>Now talk.</em>
          </h1>
          <p className="stage-sub">
            You have ten minutes. Use them well. <em>You can extend if you both agree.</em>
          </p>

          <div className="match-frame" style={{ marginTop: 36 }}>
            {/* Chat */}
            <div className="match-chat">
              <div className="match-chat-head">
                <div className="partner-av">
                  N
                  <div className="od" />
                </div>
                <div className="partner-info">
                  <div className="partner-name">
                    Anonymous match <span className="gtag">Guy</span>
                  </div>
                  <div className="partner-meta">
                    <span className="live-dot" /> Online · matched 3 min ago
                  </div>
                </div>
                <button className="end-btn">End chat</button>
              </div>

              <div className="topic-banner">
                <span className="topic-banner-lab">Topic ◆</span>
                <span className="topic-banner-text">
                  Why &ldquo;I&apos;ll let you know&rdquo; feels like a soft no
                </span>
                <span className="timer">
                  <span className="timer-dot" />
                  Time left <b>06:42</b>
                </span>
              </div>

              <div className="match-msgs">
                <div className="mm in">
                  <div>
                    <div className="mm-bubble">
                      Hey — thanks for matching. Honestly this is the first one of these I&apos;ve ever done. Where do you want to start?
                    </div>
                    <div className="mm-time">2:43 PM</div>
                  </div>
                </div>

                <div className="mm out">
                  <div>
                    <div className="mm-bubble">
                      Same actually. Okay — when a guy says &ldquo;I&apos;ll let you know&rdquo; about plans and then disappears for days, what&apos;s actually happening in your head? <em>I want the unflattering version.</em>
                    </div>
                    <div className="mm-time">2:44 PM</div>
                  </div>
                </div>

                <div className="mm in">
                  <div>
                    <div className="mm-bubble">
                      Ha okay. Unflattering version: 60% of the time I&apos;m not actually committing because I haven&apos;t decided if I want to go yet, and &ldquo;I&apos;ll let you know&rdquo; buys me the right to stall without seeming rude.
                    </div>
                    <div className="mm-time">2:45 PM</div>
                  </div>
                </div>

                <div className="mm in">
                  <div>
                    <div className="mm-bubble">
                      The other 40% I genuinely mean it in the moment but life happens, three days pass, and now answering feels worse than not answering. So I just... don&apos;t.
                    </div>
                    <div className="mm-time">2:45 PM</div>
                  </div>
                </div>

                <div className="mm out">
                  <div>
                    <div className="mm-bubble">
                      Okay this is going to sound dramatic but that genuinely reframes something for me. I always assumed it was a quiet rejection — like the answer was already no and I just hadn&apos;t been told.
                    </div>
                    <div className="mm-time">2:47 PM</div>
                  </div>
                </div>

                <div className="mm in">
                  <div>
                    <div className="mm-bubble">
                      It&apos;s not, usually. It&apos;s almost always indecision dressed up as politeness. <em>If it helps:</em> if you want a real answer out of him, propose a specific time. &ldquo;I&apos;ll let you know&rdquo; can&apos;t survive a Tuesday at 7.
                    </div>
                    <div className="mm-time">2:48 PM</div>
                  </div>
                </div>

                <div className="mm-typing">
                  <span /><span /><span />
                </div>
              </div>

              <div className="match-input-wrap">
                <div className="match-input">
                  <input placeholder="Type honestly. They can't see your name." />
                  <button className="match-send">Send →</button>
                </div>
                <div className="match-input-meta">
                  <span>Anonymous · ↵ to send</span>
                  <span>↑ Reveal name (both must agree)</span>
                </div>
              </div>
            </div>

            {/* Side */}
            <aside className="match-side">
              <div className="match-side-section">
                <div className="match-side-label">Conversation starters</div>
                <div className="starter">What&apos;s the most useful thing someone of the opposite gender ever told you?</div>
                <div className="starter">What&apos;s a habit you have that you suspect reads totally differently than you mean it?</div>
                <div className="starter">What do you wish more people asked you on a first date?</div>
              </div>

              <div className="match-side-section">
                <div className="match-side-label">Vibe so far</div>
                <div className="vibe-row"><span className="vlabel">Energy</span><span className="vval">Honest</span></div>
                <div className="vibe-bar"><div className="fill" style={{ width: '84%' }} /></div>
                <div className="vibe-row" style={{ marginTop: 10 }}>
                  <span className="vlabel">Pace</span><span className="vval">Easy</span>
                </div>
                <div className="vibe-bar"><div className="fill" style={{ width: '68%' }} /></div>
                <div className="vibe-row" style={{ marginTop: 10 }}>
                  <span className="vlabel">Depth</span><span className="vval">Real</span>
                </div>
                <div className="vibe-bar"><div className="fill" style={{ width: '91%' }} /></div>
              </div>

              <div className="match-side-section">
                <div className="match-side-label">House rules</div>
                <ul className="ground-rules">
                  <li>No personal info — phone, socials, last names</li>
                  <li>Disagree without dismissing</li>
                  <li>Either of you can end this any time</li>
                  <li>If it gets weird, hit report. We respond fast.</li>
                </ul>
              </div>

              <div className="match-side-section">
                <div className="match-side-label">Past matches</div>
                <div className="past-match">
                  <div className="past-match-row">
                    <div className="past-match-av" style={{ background: 'linear-gradient(135deg,#4888c8,#2868a8)' }}>G</div>
                    <div className="past-match-name">Guy · Crushes</div>
                    <div className="past-match-time">3d</div>
                  </div>
                  <p className="past-match-snip">&ldquo;Honestly the eye contact thing isn&apos;t a myth...&rdquo;</p>
                </div>
                <div className="past-match">
                  <div className="past-match-row">
                    <div className="past-match-av" style={{ background: 'linear-gradient(135deg,#4888c8,#2868a8)' }}>G</div>
                    <div className="past-match-name">Guy · First dates</div>
                    <div className="past-match-time">1w</div>
                  </div>
                  <p className="past-match-snip">&ldquo;I always assumed coffee was a softer ask...&rdquo;</p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </>
  );
}