import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mentorship — FundedBirr Academy',
  description: 'Learn directly from expert Ethiopian traders with group mentorship, 1-on-1 sessions, and intensive bootcamps.',
}

const packages = [
  {
    title: 'Group Mentorship',
    price: '1,200 ETB',
    period: '/month',
    features: [
      'Weekly live sessions',
      'Daily gold analysis',
      'Trade setups',
      'Q&A',
      'Community',
    ],
    link: '#',
    linkText: 'Join Group →',
    featured: false,
  },
  {
    title: '1-on-1 Mentorship',
    price: '3,500 ETB',
    period: '/4 sessions',
    features: [
      'Private Zoom sessions',
      'Personalized plan',
      'Trade review',
      'Direct WhatsApp',
      'Strategy customization',
      'Challenge prep',
    ],
    link: '#',
    linkText: 'Book Sessions →',
    featured: true,
  },
  {
    title: '4-Week Bootcamp',
    price: '6,000 ETB',
    period: ' one-time',
    features: [
      'Daily live sessions',
      'All course content',
      'Group + private',
      'Certification included',
      'Challenge fee discount',
      'Lifetime access',
    ],
    link: '/bootcamp',
    linkText: 'Join Bootcamp →',
    featured: false,
  },
]

export default function MentorshipPage() {
  return (
    <>
      {/* ─── HEADER ─── */}
      <section className="section" style={{ paddingTop: '6rem' }}>
        <p className="section-label">Mentorship</p>
        <h1 className="section-title">Learn directly from expert traders</h1>
        <p className="section-sub">
          Get personalized guidance from seasoned Ethiopian traders who know the markets inside out.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
          marginTop: '1rem',
        }}>
          {packages.map((pkg, i) => (
            <div
              key={i}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderColor: pkg.featured ? 'rgba(30,111,217,0.35)' : undefined,
                position: 'relative',
              }}
            >
              {pkg.featured && (
                <span className="tag tag-popular" style={{ position: 'absolute', top: '-0.6rem', right: '1rem', marginBottom: 0 }}>
                  Most Popular
                </span>
              )}
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1.15rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
                color: 'var(--text)',
              }}>
                {pkg.title}
              </h3>
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--accent)',
                }}>
                  {pkg.price}
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{pkg.period}</span>
              </div>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 1.5rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}>
                {pkg.features.map((f, j) => (
                  <li key={j} style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    <span style={{ color: 'var(--green)', fontSize: '0.9rem' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={pkg.link}
                className={pkg.featured ? 'btn-primary' : 'btn-outline'}
                style={{ textAlign: 'center', width: '100%' }}
              >
                {pkg.linkText}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TELEBIRR PAYMENT ─── */}
      <section className="section" style={{ background: 'var(--navy-2)', borderRadius: '14px', margin: '0 2rem 2rem', padding: '2.5rem 2rem' }}>
        <p className="section-label">Payment</p>
        <h2 className="section-title">Pay via Telebirr</h2>
        <p className="section-sub">
          All mentorship programs are payable via Telebirr. Follow the steps below to enroll.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}>
          {[
            { step: '1', title: 'Send Payment', desc: 'Transfer the program fee to FundedBirr Academy via Telebirr using the official Telebirr account number.' },
            { step: '2', title: 'Send Confirmation', desc: 'Take a screenshot of your payment confirmation and send it to our Telegram or WhatsApp.' },
            { step: '3', title: 'Get Enrolled', desc: 'You will be added to the mentorship group or scheduled for your first session within 24 hours.' },
          ].map((s, i) => (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.75rem',
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(30,111,217,0.12)',
                color: 'var(--blue-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '0.9rem',
              }}>
                {s.step}
              </div>
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--text)',
              }}>
                {s.title}
              </h3>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
              }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '2rem',
          padding: '1.25rem',
          background: 'rgba(201,145,42,0.06)',
          border: '1px solid rgba(201,145,42,0.15)',
          borderRadius: '10px',
        }}>
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--accent)',
            fontWeight: 600,
            marginBottom: '0.5rem',
          }}>
            📱 Telebirr Account Details
          </p>
          <p style={{
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            fontFamily: 'monospace',
          }}>
            Account: FundedBirr Academy
          </p>
          <p style={{
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            fontFamily: 'monospace',
          }}>
            Number: Contact us via Telegram or WhatsApp
          </p>
          <p style={{
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            fontFamily: 'monospace',
          }}>
            Reference: Your Name + Program Name
          </p>
        </div>
      </section>

      {/* ─── DISCLAIMER ─── */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: '4rem' }}>
        <p className="disclaimer">
          Mentorship programs provide educational guidance and market insights only. Past performance of mentors does not guarantee future results. Trading involves risk. Always trade responsibly.
        </p>
      </section>
    </>
  )
}
