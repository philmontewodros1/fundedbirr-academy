import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '4-Week Bootcamp — FundedBirr Academy',
  description: 'Intensive 4-week trading education program covering foundations, gold trading, risk management, and challenge prep.',
}

const weeks = [
  {
    title: 'Week 1: Foundations',
    desc: 'Market structure, candlestick patterns, support and resistance. Build your base from the ground up.',
    topics: ['Market structure', 'Candlestick patterns', 'Support & resistance'],
  },
  {
    title: 'Week 2: Gold Trading',
    desc: 'XAUUSD-specific strategies, session timing, order blocks. Master the most traded commodity.',
    topics: ['XAUUSD strategies', 'Session timing', 'Order blocks'],
  },
  {
    title: 'Week 3: Risk Management',
    desc: 'Position sizing, drawdown control, psychology. Protect your capital and trade with discipline.',
    topics: ['Position sizing', 'Drawdown control', 'Psychology'],
  },
  {
    title: 'Week 4: Challenge Prep',
    desc: 'Mock trading, exam prep, certification. Get ready for the FundedBirr Challenge.',
    topics: ['Mock trading', 'Exam prep', 'Certification'],
  },
]

export default function BootcampPage() {
  return (
    <>
      {/* ─── HEADER ─── */}
      <section className="section" style={{ paddingTop: '6rem' }}>
        <p className="section-label">4-Week Bootcamp</p>
        <h1 className="section-title">Intensive Trading Education Program</h1>
        <p className="section-sub">
          A comprehensive 4-week live program designed to take you from foundation to challenge-ready.
        </p>

        <div style={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '2.5rem',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1.25rem',
            background: 'rgba(40,168,106,0.08)',
            border: '1px solid rgba(40,168,106,0.15)',
            borderRadius: '10px',
          }}>
            <span style={{ color: 'var(--green)', fontSize: '1.1rem' }}>📅</span>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Next Cohort</span>
              <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--green)' }}>July 2026</span>
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1.25rem',
            background: 'rgba(201,145,42,0.08)',
            border: '1px solid rgba(201,145,42,0.15)',
            borderRadius: '10px',
          }}>
            <span style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>💰</span>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Price</span>
              <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent)' }}>6,000 ETB</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT'S INCLUDED ─── */}
      <section className="section" style={{ background: 'var(--navy-2)', borderRadius: '14px', margin: '0 2rem 2rem', padding: '2.5rem 2rem' }}>
        <p className="section-label">Included</p>
        <h2 className="section-title">What&apos;s included</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginTop: '0.5rem',
        }}>
          {[
            'Live daily sessions with expert traders',
            'Comprehensive course materials',
            'Homework assignments with feedback',
            'Final exam & certification',
            'Recorded session replays',
            'Lifetime community access',
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.88rem',
              color: 'var(--text)',
            }}>
              <span style={{ color: 'var(--green)', fontSize: '1rem', flexShrink: 0 }}>✓</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ─── WEEKLY BREAKDOWN ─── */}
      <section className="section">
        <p className="section-label">Curriculum</p>
        <h2 className="section-title">Weekly breakdown</h2>
        <p className="section-sub">
          Four weeks of structured learning from foundations to challenge preparation.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.25rem',
        }}>
          {weeks.map((week, i) => (
            <div key={i} className="card" style={{
              display: 'flex',
              flexDirection: 'column',
              borderTop: `3px solid ${i === 0 ? 'var(--blue)' : i === 1 ? 'var(--gold)' : i === 2 ? 'var(--green)' : 'var(--accent)'}`,
            }}>
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '0.5rem',
              }}>
                {week.title}
              </h3>
              <p style={{
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '1rem',
                flex: 1,
              }}>
                {week.desc}
              </p>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem',
              }}>
                {week.topics.map((t, j) => (
                  <li key={j} style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--blue-light)', flexShrink: 0 }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section" style={{ background: 'var(--navy-2)', borderRadius: '14px', margin: '0 2rem 2rem', padding: '2.5rem 2rem' }}>
        <p className="section-label">Testimonials</p>
        <h2 className="section-title">What past students say</h2>
        <p className="section-sub">
          Hear from graduates of our bootcamp program.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.25rem',
        }}>
          {[
            { name: 'Hanna M.', location: 'Addis Ababa', quote: 'The 4-week bootcamp completely changed my approach to trading. The live sessions were incredibly valuable and the community support kept me motivated.' },
            { name: 'Dawit S.', location: 'Mekelle', quote: 'I went from zero knowledge to passing the FundedBirr challenge in just two months. The bootcamp structure is world-class.' },
          ].map((t, i) => (
            <div key={i} className="card">
              <div style={{ display: 'flex', gap: '2px', marginBottom: '0.75rem' }}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>★</span>
                ))}
              </div>
              <p style={{
                fontSize: '0.88rem',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                fontStyle: 'italic',
                marginBottom: '1rem',
              }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(138,155,192,0.7)' }}>{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section" style={{ paddingBottom: '4rem' }}>
        <div className="card" style={{
          background: 'linear-gradient(135deg, var(--navy-2) 0%, var(--navy-3) 100%)',
          border: '1px solid rgba(201,145,42,0.2)',
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
            Ready to transform your trading?
          </h2>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            maxWidth: '480px',
            margin: '0 auto 1.5rem',
            fontWeight: 300,
          }}>
            Pay 6,000 ETB via Telebirr. Send your payment confirmation to our Telegram or WhatsApp to secure your spot in the July 2026 cohort.
          </p>
          <Link href="/courses/bootcamp" className="btn-gold" style={{ marginBottom: '1rem' }}>
            Join the Bootcamp &rarr;
          </Link>
          <p style={{
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            marginTop: '1rem',
          }}>
            Spaces are limited. First come, first served.
          </p>
        </div>
      </section>
    </>
  )
}
