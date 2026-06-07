import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Challenge — FundedBirr Academy',
  description: 'Test your trading skills with the FundedBirr Challenge. A practical skill assessment for Ethiopian traders.',
}

const challengeUrl = process.env.NEXT_PUBLIC_CHALLENGE_URL || 'https://www.fundedbirr.com'

const plans = [
  { name: 'BF 10K', price: '3,000 ETB', minProfit: '10%', maxLoss: '8%', minDays: 5, maxDays: 60 },
  { name: 'BF 25K', price: '7,000 ETB', minProfit: '10%', maxLoss: '8%', minDays: 5, maxDays: 60 },
  { name: 'BF 50K', price: '12,000 ETB', minProfit: '8%', maxLoss: '6%', minDays: 5, maxDays: 60 },
  { name: 'BF 100K', price: '20,000 ETB', minProfit: '8%', maxLoss: '6%', minDays: 5, maxDays: 60 },
]

export default function ChallengePage() {
  return (
    <>
      {/* ─── HEADER ─── */}
      <section className="section" style={{ paddingTop: '6rem', textAlign: 'center' }}>
        <span className="tag tag-popular" style={{ fontSize: '0.7rem' }}>
          Practical Skill Assessment
        </span>
        <h1 className="section-title" style={{ maxWidth: '700px', margin: '0 auto', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
          Ready to test your<br />trading skills?
        </h1>
        <p className="section-sub" style={{ maxWidth: '500px', margin: '0 auto 2rem', textAlign: 'center' }}>
          Apply everything you&apos;ve learned in the FundedBirr Challenge — a simulated trading assessment that rewards skill, not luck.
        </p>
        <Link
          href={`${challengeUrl}/pricing`}
          className="btn-gold"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '1rem', padding: '0.9rem 2.5rem' }}
        >
          Go to FundedBirr Challenge &rarr;
        </Link>
      </section>

      {/* ─── IMPORTANT DISCLAIMER ─── */}
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 2rem 3rem',
      }}>
        <div style={{
          background: 'rgba(40,168,106,0.04)',
          border: '1px solid var(--green)',
          borderRadius: '14px',
          padding: '2rem',
        }}>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--green)',
            marginBottom: '1rem',
          }}>
            Important: What the FundedBirr Challenge is
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
          }}>
            <div>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--green)',
                fontWeight: 600,
                marginBottom: '0.75rem',
              }}>
                ✓ What it IS
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
              }}>
                {[
                  'The FundedBirr Challenge is a simulated trading skill assessment for educational purposes.',
                  'All trading is performed on demo accounts with virtual capital.',
                  'ETB performance rewards recognize your skill achievement — not investment returns.',
                ].map((item, i) => (
                  <li key={i} style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    lineHeight: 1.55,
                  }}>
                    <span style={{ color: 'var(--green)', flexShrink: 0, marginTop: '0.1rem' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--red)',
                fontWeight: 600,
                marginBottom: '0.75rem',
              }}>
                ✗ What it IS NOT
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
              }}>
                {[
                  'This is NOT an investment product.',
                  'FundedBirr does NOT manage your money or guarantee profits.',
                ].map((item, i) => (
                  <li key={i} style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    lineHeight: 1.55,
                  }}>
                    <span style={{ color: 'var(--red)', flexShrink: 0, marginTop: '0.1rem' }}>✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section style={{
        background: 'var(--navy-2)',
        padding: '4rem 2rem',
        marginBottom: '2rem',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p className="section-label">How it works</p>
          <h2 className="section-title">Your path to the challenge</h2>
          <p className="section-sub">
            Four steps from learner to funded trader.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '2rem',
              left: 'calc(12.5% + 1.5rem)',
              width: 'calc(75% - 3rem)',
              height: 2,
              background: 'linear-gradient(to right, var(--blue), var(--gold), var(--green), var(--green))',
              zIndex: 0,
            }} />

            {[
              { step: '01', title: 'Complete courses', desc: 'Learn the fundamentals through our free and paid courses.', color: 'var(--blue)' },
              { step: '02', title: 'Get Certified', desc: 'Pass the certification exam to validate your knowledge.', color: 'var(--blue)' },
              { step: '03', title: 'Register on FundedBirr', desc: 'Create your account and choose your challenge plan.', color: 'var(--gold)' },
              { step: '04', title: 'Trade & Earn Rewards', desc: 'Apply your skills in a simulated environment and earn ETB rewards.', color: 'var(--green)' },
            ].map((s, i) => (
              <div key={i} style={{
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: s.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: 'var(--navy)',
                  marginBottom: '1.25rem',
                }}>
                  {s.step}
                </div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  color: 'var(--text)',
                }}>{s.title}</h3>
                <p style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  maxWidth: '220px',
                }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CHALLENGE PLANS TABLE ─── */}
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 2rem 3rem',
      }}>
        <p className="section-label">Plans</p>
        <h2 className="section-title">Challenge plans</h2>
        <p className="section-sub">
          Choose the plan that matches your trading style and goals.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.25rem',
        }}>
          {plans.map((plan, i) => (
            <div key={i} className="card" style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              borderColor: i === 2 ? 'rgba(201,145,42,0.35)' : undefined,
            }}>
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '0.25rem',
              }}>
                {plan.name}
              </h3>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--accent)',
                marginBottom: '1.25rem',
              }}>
                {plan.price}
              </div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 1.5rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
              }}>
                <li style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Min profit: <span style={{ color: 'var(--text)', fontWeight: 600 }}>{plan.minProfit}</span>
                </li>
                <li style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Max loss: <span style={{ color: 'var(--text)', fontWeight: 600 }}>{plan.maxLoss}</span>
                </li>
                <li style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Min days: <span style={{ color: 'var(--text)', fontWeight: 600 }}>{plan.minDays}</span>
                </li>
                <li style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Max days: <span style={{ color: 'var(--text)', fontWeight: 600 }}>{plan.maxDays}</span>
                </li>
              </ul>
              <Link
                href={challengeUrl}
                className="btn-outline"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textAlign: 'center', width: '100%', fontSize: '0.82rem' }}
              >
                Buy on FundedBirr ↗
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section" style={{ paddingBottom: '4rem' }}>
        <div className="card" style={{
          background: 'linear-gradient(135deg, var(--navy-2) 0%, var(--navy-3) 100%)',
          border: '1px solid rgba(40,168,106,0.2)',
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
            Not ready yet?
          </h2>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            maxWidth: '480px',
            margin: '0 auto 1.5rem',
            fontWeight: 300,
          }}>
            Start with our free courses and build your foundation before taking the challenge.
          </p>
          <Link href="/#courses" className="btn-primary">
            Learn first.
          </Link>
        </div>
      </section>
    </>
  )
}
