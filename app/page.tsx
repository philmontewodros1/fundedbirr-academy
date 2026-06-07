'use client'

import Link from 'next/link'

const challengeUrl = process.env.NEXT_PUBLIC_CHALLENGE_URL || 'https://www.fundedbirr.com'
const telegramUrl = process.env.NEXT_PUBLIC_TELEGRAM || 'https://t.me/fundedbirr'

const courses = [
  { slug: 'intro-forex', title: 'Introduction to Forex', desc: 'Understand the forex market, currency pairs, bid/ask spreads, and how global sessions work.', lessons: 5, duration: '45min', price: 'Free', tag: 'free' as const, featured: false, badge: '' },
  { slug: 'intro-gold', title: 'Introduction to Gold Trading', desc: 'Learn what drives gold prices, how to read XAU/USD charts, and key economic factors.', lessons: 4, duration: '35min', price: 'Free', tag: 'free' as const, featured: false, badge: '' },
  { slug: 'candlesticks', title: 'Candlestick Patterns', desc: 'Master bullish and bearish candlestick patterns — dojis, engulfing, hammers, and more.', lessons: 6, duration: '55min', price: 'Free', tag: 'free' as const, featured: false, badge: '' },
  { slug: 'forex-fundamentals', title: 'Forex Fundamentals', desc: 'Deep dive into interest rates, NFP, CPI, and how central bank policy moves the market.', lessons: 12, duration: '3hrs', price: '500 ETB', tag: 'paid' as const, featured: false, badge: '' },
  { slug: 'gold-mastery', title: 'Gold Mastery', desc: 'Advanced gold trading strategies: correlating with USD, commodities, and geopolitical events.', lessons: 18, duration: '5hrs', price: '1,500 ETB', tag: 'paid' as const, featured: true, badge: 'Most Popular' },
  { slug: 'risk-management', title: 'Risk Management', desc: 'Position sizing, stop-loss placement, risk-reward ratios, and psychological discipline.', lessons: 10, duration: '2.5hrs', price: '800 ETB', tag: 'paid' as const, featured: false, badge: '' },
  { slug: 'market-structure', title: 'Market Structure', desc: 'Understand supply & demand, support & resistance, order blocks, and market phases.', lessons: 15, duration: '4hrs', price: '2,000 ETB', tag: 'paid' as const, featured: false, badge: '' },
  { slug: 'bootcamp', title: 'Bootcamp', desc: 'Complete trading system covering analysis, execution, journaling, and live mentorship replays.', lessons: 55, duration: '14hrs', price: '4,500 ETB', tag: 'paid' as const, featured: true, badge: 'Best Value' },
  { slug: 'certification', title: 'Certification Exam', desc: 'Test your knowledge with a 60-minute exam. Earn your FundedBirr Academy certificate.', lessons: 0, duration: '60min', price: '500 ETB', tag: 'paid' as const, featured: false, badge: '' },
]

const tagColors: Record<string, { bg: string; color: string; border: string }> = {
  free: { bg: 'rgba(40,168,106,0.12)', color: '#28A86A', border: 'rgba(40,168,106,0.25)' },
  paid: { bg: 'rgba(201,145,42,0.1)', color: '#E8B84B', border: 'rgba(201,145,42,0.2)' },
  popular: { bg: 'rgba(30,111,217,0.1)', color: '#4B9EFF', border: 'rgba(30,111,217,0.2)' },
  bundle: { bg: 'rgba(232,184,75,0.1)', color: '#E8B84B', border: 'rgba(232,184,75,0.25)' },
}

const testimonials = [
  { name: 'Abel T.', location: 'Addis Ababa', quote: 'The Amharic support made everything click. I finally understand support and resistance after years of confusion. The mentorship program is worth every birr.' },
  { name: 'Meron K.', location: 'Bahir Dar', quote: 'I started with the free courses and within a month I was ready for the certification exam. The practical approach is unmatched.' },
  { name: 'Yonas D.', location: 'Dire Dawa', quote: 'The Gold Mastery course transformed my trading completely. I am now consistently profitable trading XAU/USD.' },
]

export default function Home() {
  const scrollToCourses = () => {
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ─── HERO ─── */}
      <section style={{
        padding: '6rem 2rem 4rem',
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(30,111,217,0.08)',
          border: '1px solid rgba(30,111,217,0.15)',
          borderRadius: '100px',
          padding: '0.4rem 1.2rem',
          fontSize: '0.78rem',
          color: '#4B9EFF',
          fontWeight: 500,
          marginBottom: '2rem',
        }}>
          <span style={{
            width: 8, height: 8,
            borderRadius: '50%',
            background: '#28A86A',
            display: 'inline-block',
          }} />
          Ethiopia&apos;s First Forex Trading Institute
        </div>

        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
          fontWeight: 800,
          lineHeight: 1.08,
          marginBottom: '1.2rem',
          maxWidth: '750px',
          whiteSpace: 'pre-line',
        }}>
          Learn to Trade{' '}
          <span style={{ color: '#F0C060' }}>Gold &amp; Forex</span>.<br />
          Get{' '}
          <span style={{ color: '#4B9EFF' }}>Certified</span>.
        </h1>

        <p style={{
          color: '#8A9BC0',
          fontSize: '1.05rem',
          maxWidth: '540px',
          lineHeight: 1.7,
          fontWeight: 300,
          marginBottom: '2.2rem',
        }}>
          Ethiopian-built courses in Amharic and English. Free lessons to get you started,
          paid programs to make you a professional.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '4rem' }}>
          <Link href="#courses" className="btn-primary" onClick={scrollToCourses}>
            Start Free Course &rarr;
          </Link>
          <Link href="#how-it-works" className="btn-outline">
            See How It Works
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.5rem',
          width: '100%',
          maxWidth: '700px',
          borderTop: '1px solid rgba(78,130,220,0.12)',
          paddingTop: '2.5rem',
        }}>
          {[
            { num: '12+', label: 'Free lessons' },
            { num: '5', label: 'Expert courses' },
            { num: 'አማ', label: 'Amharic support' },
            { num: '🇪🇹', label: 'Ethiopia-first' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1.6rem',
                fontWeight: 800,
                color: '#F0C060',
              }}>{s.num}</div>
              <div style={{ fontSize: '0.78rem', color: '#8A9BC0', marginTop: '0.25rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── COURSES ─── */}
      <section id="courses" className="section">
        <p className="section-label">Curriculum</p>
        <h2 className="section-title">Start with free. Grow with paid.</h2>
        <p className="section-sub">
          Three free courses to build your foundation, then six advanced paid programs
          to master the markets.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }}>
          {courses.map((c) => {
            const tColor = c.tag === 'free'
              ? tagColors.free
              : c.tag === 'paid'
                ? tagColors.paid
                : tagColors.popular
            return (
              <Link
                key={c.slug}
                href={`/courses/${c.slug}`}
                className="card"
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  borderColor: c.featured ? 'rgba(201,145,42,0.4)' : undefined,
                  borderWidth: c.featured ? '1.5px' : '1px',
                }}
              >
                {c.badge && (
                  <span style={{
                    position: 'absolute',
                    top: '-0.6rem',
                    right: '1rem',
                    backgroundColor: c.badge === 'Most Popular' ? '#1E6FD9' : '#C9912A',
                    color: '#fff',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    padding: '3px 12px',
                    borderRadius: '100px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    {c.badge}
                  </span>
                )}
                <span className={`tag tag-${c.tag}`}>{c.tag === 'free' ? 'Free' : c.price}</span>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 700,
                  marginBottom: '0.4rem',
                  color: '#F0F4FF',
                }}>{c.title}</h3>
                <p style={{
                  fontSize: '0.82rem',
                  color: '#8A9BC0',
                  lineHeight: 1.55,
                  flex: 1,
                  marginBottom: '1rem',
                }}>{c.desc}</p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem',
                  color: '#8A9BC0',
                  borderTop: '1px solid rgba(78,130,220,0.1)',
                  paddingTop: '0.75rem',
                }}>
                  <span>{c.lessons > 0 ? `${c.lessons} lessons\u00B7${c.duration}` : c.duration}</span>
                  <span style={{
                    color: c.tag === 'free' ? '#28A86A' : '#F0C060',
                    fontWeight: 600,
                    fontFamily: "'Syne', sans-serif",
                  }}>
                    {c.tag === 'free' ? 'Free' : c.price}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ─── LEARNING PATH ─── */}
      <section id="path" style={{
        padding: '5rem 2rem',
        background: '#0F1F3D',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p className="section-label">Learning Path</p>
          <h2 className="section-title">Your journey to becoming a funded trader.</h2>
          <p className="section-sub">
            Four stages from beginner to challenge-ready trader.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
            position: 'relative',
          }}>
            {/* gradient connecting line */}
            <div style={{
              position: 'absolute',
              top: '2rem',
              left: 'calc(12.5% + 1.5rem)',
              width: 'calc(75% - 3rem)',
              height: 2,
              background: 'linear-gradient(to right, #1E6FD9, #1E6FD9 33%, #C9912A 66%, #28A86A)',
              zIndex: 0,
            }} />

            {[
              { step: '01', title: 'Learn the Basics', desc: 'Start with 3 free courses build your foundation in forex and gold trading.', color: '#1E6FD9' },
              { step: '02', title: 'Master Your Strategy', desc: 'Enroll in paid courses develop your edge with advanced strategies.', color: '#1E6FD9' },
              { step: '03', title: 'Get Certified', desc: 'Pass the certification exam validate your skills with a formal credential.', color: '#C9912A', link: '/certification' },
              { step: '04', title: 'Take the Challenge', desc: 'Apply your skills in the FundedBirr trading challenge and get funded.', color: '#28A86A', link: challengeUrl },
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
                  color: '#0A1628',
                  marginBottom: '1.25rem',
                  boxShadow: `0 0 0 4px rgba(255,255,255,0.06)`,
                }}>
                  {s.step}
                </div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  color: '#F0F4FF',
                }}>{s.title}</h3>
                <p style={{
                  fontSize: '0.82rem',
                  color: '#8A9BC0',
                  lineHeight: 1.6,
                  maxWidth: '240px',
                }}>
                  {s.desc}
                  {s.link && (
                    <>
                      {' '}
                      <Link
                        href={s.link}
                        style={{
                          color: s.color,
                          textDecoration: 'underline',
                          fontWeight: 500,
                        }}
                        target={s.step === '04' ? '_blank' : undefined}
                        rel={s.step === '04' ? 'noopener noreferrer' : undefined}
                      >
                        {s.step === '03' ? 'View details →' : 'Learn more →'}
                      </Link>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MENTORSHIP ─── */}
      <section id="mentorship" className="section">
        <p className="section-label">Mentorship</p>
        <h2 className="section-title">Learn directly from experts.</h2>
        <p className="section-sub">
          Structured mentorship programs with live sessions, personal feedback,
          and a community of like-minded traders.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }}>
          {[
            {
              title: 'Group Mentorship',
              price: '1,200 ETB',
              period: '/month',
              tag: 'Telegram Group',
              features: [
                'Daily market analysis',
                'Weekly live sessions',
                'Q&A in group chat',
                'Trade ideas & reviews',
                'Community support',
              ],
              link: telegramUrl,
              linkText: 'Join Group →',
              featured: false,
            },
            {
              title: '1-on-1 Mentorship',
              price: '3,500 ETB',
              period: '/4 sessions',
              tag: 'Private Sessions',
              features: [
                'Personalized curriculum',
                'One-on-one video calls',
                'Recorded session review',
                'Trade journal feedback',
                'Direct mentor chat',
                'Flexible scheduling',
              ],
              link: '#',
              linkText: 'Book Sessions →',
              featured: true,
            },
            {
              title: '4-Week Bootcamp',
              price: '6,000 ETB',
              period: ' one-time',
              tag: 'Next cohort July 2026',
              features: [
                'Intensive 4-week program',
                'Live daily sessions',
                'Homework & quizzes',
                'Final exam & certificate',
                'Post-bootcamp support',
                'Lifetime community access',
              ],
              link: '/bootcamp',
              linkText: 'Join Bootcamp →',
              featured: false,
            },
          ].map((m, i) => (
            <div
              key={i}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderColor: m.featured ? 'rgba(30,111,217,0.35)' : undefined,
                position: 'relative',
              }}
            >
              {m.featured && (
                <span className="tag tag-popular" style={{ position: 'absolute', top: '-0.6rem', right: '1rem', marginBottom: 0 }}>
                  Recommended
                </span>
              )}
              <span style={{
                fontSize: '0.7rem',
                color: '#8A9BC0',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.3rem',
              }}>
                {m.tag}
              </span>
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1.15rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
                color: '#F0F4FF',
              }}>
                {m.title}
              </h3>
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#F0C060',
                }}>
                  {m.price}
                </span>
                <span style={{ fontSize: '0.82rem', color: '#8A9BC0' }}>{m.period}</span>
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
                {m.features.map((f, j) => (
                  <li key={j} style={{
                    fontSize: '0.85rem',
                    color: '#8A9BC0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    <span style={{ color: '#28A86A', fontSize: '0.9rem' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={m.link}
                className={m.featured ? 'btn-primary' : 'btn-outline'}
                style={{ textAlign: 'center', width: '100%' }}
                target={m.link === telegramUrl ? '_blank' : undefined}
                rel={m.link === telegramUrl ? 'noopener noreferrer' : undefined}
              >
                {m.linkText}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BRIDGE / CHALLENGE ─── */}
      <section id="challenge" style={{
        padding: '5rem 2rem',
        background: 'rgba(40,168,106,0.04)',
        borderTop: '1px solid rgba(40,168,106,0.08)',
        borderBottom: '1px solid rgba(40,168,106,0.08)',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center',
        }}>
          <div>
            <p className="section-label">Practical Assessment</p>
            <h2 className="section-title">
              Test your skills in a<br />realistic trading environment.
            </h2>
            <p className="section-sub" style={{ maxWidth: '440px' }}>
              The FundedBirr Challenge simulates live market conditions. Pass the
              evaluation and qualify for a funded account. No risk to your own capital.
            </p>
            <Link
              href={challengeUrl}
              className="btn-gold"
              target="_blank"
              rel="noopener noreferrer"
            >
              Take the Challenge &rarr;
            </Link>
          </div>

          <div className="card" style={{
            background: '#0F1F3D',
            border: '1px solid rgba(40,168,106,0.15)',
          }}>
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#F0F4FF',
              marginBottom: '0.25rem',
            }}>
              FundedBirr Trading Challenge
            </h3>
            <p style={{
              fontSize: '0.85rem',
              color: '#8A9BC0',
              marginBottom: '1.5rem',
            }}>
              Simulated trader skill assessment
            </p>
            <ol style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              {[
                'Register for the challenge',
                'Receive simulated capital',
                'Trade under set rules',
                'Meet profit & risk targets',
                'Pass verification',
                'Get funded with real capital',
              ].map((step, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '0.85rem',
                  color: '#8A9BC0',
                }}>
                  <span style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'rgba(40,168,106,0.12)',
                    color: '#28A86A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section">
        <p className="section-label">Testimonials</p>
        <h2 className="section-title">What our students say.</h2>
        <p className="section-sub">
          Real feedback from real Ethiopian traders who transformed their skills.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }}>
          {testimonials.map((t, i) => (
            <div key={i} className="card" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} style={{ color: '#F0C060', fontSize: '0.9rem' }}>★</span>
                ))}
              </div>
              <p style={{
                fontSize: '0.88rem',
                color: '#8A9BC0',
                lineHeight: 1.65,
                flex: 1,
                fontStyle: 'italic',
              }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div style={{
                  fontSize: '0.85rem',
                  color: '#F0F4FF',
                  fontWeight: 600,
                }}>{t.name}</div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'rgba(138,155,192,0.7)',
                }}>{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{
        padding: '0 2rem 5rem',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <div className="card" style={{
          background: 'linear-gradient(135deg, #0F1F3D 0%, #162B52 100%)',
          border: '1px solid rgba(78,130,220,0.2)',
          textAlign: 'center',
          padding: '4rem 2rem',
        }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 800,
            marginBottom: '0.75rem',
            color: '#F0F4FF',
          }}>
            Start learning for free today.
          </h2>
          <p style={{
            color: '#8A9BC0',
            fontSize: '0.95rem',
            maxWidth: '480px',
            margin: '0 auto 2rem',
            fontWeight: 300,
          }}>
            Join hundreds of Ethiopian traders building real skills. No credit card
            required for free courses.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="#courses" className="btn-primary" onClick={scrollToCourses}>
              Start Free Course &rarr;
            </Link>
            <Link href="/mentorship" className="btn-outline">
              Explore Mentorship
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
