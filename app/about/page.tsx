import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — FundedBirr Academy',
  description: 'Ethiopia\'s premier forex and gold trading education institute. Founded 2025 in Addis Ababa. Learn from expert Ethiopian traders.',
}

const values = [
  { icon: '🎯', title: 'Real Skills', desc: 'We focus on practical, actionable trading knowledge — not theory that you will never use in live markets.' },
  { icon: '🇪🇹', title: 'Ethiopia First', desc: 'Built specifically for Ethiopian traders. Our examples, sessions, and support are tailored to our time zone and market access.' },
  { icon: '🤝', title: 'Community', desc: 'Trading is better together. Our Telegram groups and mentorship programs create a supportive learning environment.' },
  { icon: '📈', title: 'Continuous Growth', desc: 'We update our curriculum regularly to reflect changing market conditions and new trading methodologies.' },
]

const mentors = [
  { role: 'Head of Curriculum', bio: '8+ years trading gold and forex. Specializes in price action and market structure.' },
  { role: 'Senior Mentor — Gold Specialist', bio: 'Deep expertise in XAU/USD trading. Focuses on supply and demand strategies.' },
  { role: 'Mentor — Risk Management', bio: 'Helps students develop disciplined risk management habits and trading psychology.' },
]

export default function AboutPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: '6rem' }}>
        <p className="section-label">About</p>
        <h1 className="section-title">About FundedBirr Academy</h1>
        <p className="section-sub">
          Ethiopia&apos;s first dedicated forex and gold trading education institute.
        </p>
      </section>

      <section style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 2rem 3rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem',
      }}>
        <div className="card">
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: '0.75rem',
          }}>
            Our Mission
          </h3>
          <p style={{
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
          }}>
            FundedBirr Academy exists to close the knowledge gap in Ethiopian financial markets. 
            We provide structured, practical trading education that empowers Ethiopians to 
            participate in global forex and gold markets with confidence.
          </p>
        </div>

        <div className="card" style={{ border: '1px solid rgba(201,145,42,0.2)' }}>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: '0.75rem',
          }}>
            Quick Facts
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}>
            <li style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Founded:</span> 2025
            </li>
            <li style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Location:</span> Addis Ababa, Ethiopia
            </li>
            <li style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Format:</span> Online — Amharic &amp; English
            </li>
            <li style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Focus:</span> Forex &amp; Gold Trading
            </li>
          </ul>
        </div>
      </section>

      <section style={{
        background: 'var(--navy-2)',
        padding: '4rem 2rem',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p className="section-label">What Makes Us Different</p>
          <h2 className="section-title">Built for Ethiopian traders,<br />by Ethiopian traders.</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.25rem',
            marginTop: '0.5rem',
          }}>
            <div className="card" style={{ borderLeft: '3px solid var(--accent)' }}>
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '0.4rem',
              }}>
                Ethiopian-Built
              </h3>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}>
                Every course is designed by Ethiopian traders who understand the specific challenges 
                and opportunities of trading from Ethiopia.
              </p>
            </div>

            <div className="card" style={{ borderLeft: '3px solid var(--blue)' }}>
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '0.4rem',
              }}>
                Amharic Support
              </h3>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}>
                All courses include Amharic language support and explanations. Our mentors 
                communicate in both English and Amharic.
              </p>
            </div>

            <div className="card" style={{ borderLeft: '3px solid var(--green)' }}>
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '0.4rem',
              }}>
                Practical Focus
              </h3>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}>
                We teach real strategies that work in live markets. No outdated indicators. 
                No academic fluff. Just practical, battle-tested approaches.
              </p>
            </div>

            <div className="card" style={{ borderLeft: '3px solid var(--gold-light)' }}>
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1.05rem',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '0.4rem',
              }}>
                Challenge Bridge
              </h3>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}>
                Our curriculum is designed to prepare you for the FundedBirr Challenge. 
                We bridge the gap between learning and getting funded.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <p className="section-label">Our Team</p>
        <h2 className="section-title">Meet our mentors</h2>
        <p className="section-sub">
          Experienced traders dedicated to helping you succeed.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }}>
          {mentors.map((m, i) => (
            <div key={i} className="card" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--blue) 0%, var(--navy-3) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: '1.5rem',
                color: 'var(--gold-light)',
                marginBottom: '1rem',
              }}>
                {String.fromCharCode(65 + i)}
              </div>
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '0.25rem',
              }}>
                {m.role}
              </h3>
              <p style={{
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}>
                {m.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingBottom: '4rem' }}>
        <p className="section-label">Values</p>
        <h2 className="section-title">What we stand for</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.25rem',
          marginTop: '0.5rem',
        }}>
          {values.map((v, i) => (
            <div key={i} className="card" style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
            }}>
              <div style={{
                fontSize: '1.5rem',
                flexShrink: 0,
                marginTop: '0.15rem',
              }}>
                {v.icon}
              </div>
              <div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  marginBottom: '0.3rem',
                }}>
                  {v.title}
                </h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                }}>
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, paddingBottom: '4rem' }}>
        <div className="card" style={{
          background: 'linear-gradient(135deg, var(--navy-2) 0%, var(--navy-3) 100%)',
          border: '1px solid rgba(30,111,217,0.2)',
          textAlign: 'center',
          padding: '3rem 2rem',
        }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
            fontWeight: 800,
            marginBottom: '0.75rem',
            color: 'var(--text)',
          }}>
            Ready to start your trading journey?
          </h2>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            maxWidth: '480px',
            margin: '0 auto 1.5rem',
            fontWeight: 300,
          }}>
            Join hundreds of Ethiopian traders learning from a curriculum built for you.
          </p>
          <Link href="/" className="btn-gold">
            Start Learning &rarr;
          </Link>
        </div>
      </section>
    </>
  )
}
