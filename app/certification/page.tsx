import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Certification — FundedBirr Academy',
  description: 'Become a FundedBirr Certified Trader. Complete courses, pass the exam, and earn your certificate.',
}

export default function CertificationPage() {
  return (
    <>
      {/* ─── HEADER ─── */}
      <section className="section" style={{ paddingTop: '6rem' }}>
        <p className="section-label">Certification</p>
        <h1 className="section-title">Become a FundedBirr Certified Trader</h1>
        <p className="section-sub">
          Prove your trading knowledge with an industry-recognized certification from Ethiopia&apos;s premier trading education institute.
        </p>
      </section>

      {/* ─── WHAT & REQUIREMENTS ─── */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 2rem 3rem',
      }}>
        <div className="card">
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: '0.75rem',
          }}>
            What is the certification?
          </h3>
          <p style={{
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
          }}>
            The FundedBirr Academy Certification validates your understanding of forex and gold trading. It demonstrates that you have completed rigorous coursework and passed a comprehensive exam that tests both theoretical knowledge and practical application.
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
            Requirements
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
          }}>
            {[
              'Complete all paid courses',
              'Pass the 60-minute certification exam',
              'Pay the 500 ETB exam fee',
            ].map((req, i) => (
              <li key={i} style={{
                fontSize: '0.88rem',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{
                  color: 'var(--accent)',
                  fontSize: '0.9rem',
                }}>✦</span>
                {req}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── WHAT YOU GET ─── */}
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 2rem 3rem',
      }}>
        <p className="section-label">Benefits</p>
        <h2 className="section-title">What you get</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
          marginTop: '0.5rem',
        }}>
          {[
            { icon: '📄', title: 'Digital Certificate', desc: 'A verifiable digital certificate showcasing your achievement.' },
            { icon: '🏅', title: 'LinkedIn Badge', desc: 'Share your certification badge on LinkedIn and stand out.' },
            { icon: '🚀', title: 'Priority Challenge Access', desc: 'Get priority access to the FundedBirr Challenge evaluation.' },
          ].map((item, i) => (
            <div key={i} className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--text)',
                marginBottom: '0.4rem',
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SAMPLE CERTIFICATE ─── */}
      <section style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 2rem 3rem',
      }}>
        <p className="section-label">Preview</p>
        <h2 className="section-title">Sample certificate</h2>

        <div style={{
          background: 'linear-gradient(135deg, var(--navy-2) 0%, var(--navy-3) 100%)',
          border: '2px solid var(--gold)',
          borderRadius: '16px',
          padding: '3rem',
          textAlign: 'center',
          marginTop: '0.5rem',
        }}>
          <div style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'var(--gold)',
            margin: '0 auto 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '0.7rem',
            color: 'var(--navy)',
            letterSpacing: '0.05em',
          }}>
            FBA
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '1.6rem',
            fontWeight: 800,
            color: 'var(--text)',
            marginBottom: '0.3rem',
          }}>
            Certificate of Completion
          </h2>
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginBottom: '1.5rem',
          }}>
            This certifies that
          </p>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '1.4rem',
            fontWeight: 700,
            color: 'var(--accent)',
            marginBottom: '1.5rem',
            padding: '0.5rem 2rem',
            borderBottom: '1px solid rgba(201,145,42,0.3)',
            display: 'inline-block',
          }}>
            [Student Name]
          </div>
          <p style={{
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            maxWidth: '400px',
            margin: '0 auto',
          }}>
            has successfully completed all coursework and passed the certification exam administered by FundedBirr Academy.
          </p>
          <div style={{
            marginTop: '2rem',
            fontSize: '0.72rem',
            color: 'rgba(138,155,192,0.6)',
          }}>
            Issued by FundedBirr Academy · Certificate ID: FBA-XXXX-XXXX
          </div>
        </div>
      </section>

      {/* ─── STEPS ─── */}
      <section style={{
        background: 'var(--navy-2)',
        padding: '4rem 2rem',
        marginBottom: '2rem',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p className="section-label">Process</p>
          <h2 className="section-title">Steps to get certified</h2>
          <p className="section-sub">
            Follow these four steps to earn your FundedBirr Academy certification.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            position: 'relative',
          }}>
            {/* connecting line */}
            <div style={{
              position: 'absolute',
              top: '2rem',
              left: 'calc(12.5% + 1.5rem)',
              width: 'calc(75% - 3rem)',
              height: 2,
              background: 'linear-gradient(to right, var(--blue), var(--blue) 33%, var(--gold) 66%, var(--green))',
              zIndex: 0,
            }} />

            {[
              { step: '01', title: 'Complete courses', desc: 'Finish all paid courses in the curriculum.', color: 'var(--blue)' },
              { step: '02', title: 'Register for exam', desc: 'Pay 500 ETB and schedule your 60-minute exam.', color: 'var(--blue)' },
              { step: '03', title: 'Pass exam', desc: 'Score 70%+ to earn your certification.', color: 'var(--gold)' },
              { step: '04', title: 'Get certificate', desc: 'Receive your digital certificate and badge.', color: 'var(--green)' },
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

      {/* ─── CTA ─── */}
      <section className="section" style={{ paddingBottom: '4rem' }}>
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
            Ready to get certified?
          </h2>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            maxWidth: '480px',
            margin: '0 auto 1.5rem',
            fontWeight: 300,
          }}>
            Complete your paid courses first, then register for the exam.
          </p>
          <Link href="/courses/certification" className="btn-gold">
            Take the Exam &rarr;
          </Link>
        </div>
      </section>

      {/* ─── DISCLAIMER ─── */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: '4rem' }}>
        <p className="disclaimer">
          This certification is awarded by FundedBirr Academy for educational achievement. It is not a licensed financial advisor qualification.
        </p>
      </section>
    </>
  )
}
