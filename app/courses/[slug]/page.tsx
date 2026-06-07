'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const COURSES: Record<string, { id: string; title: string; desc: string; price: number; free: boolean; lessons: number; mins: number; cat: string }> = {
  'intro-forex': { id: 'intro-forex', title: 'What is Forex Trading?', desc: 'The complete beginner guide to forex markets, currency pairs, and how trading works.', price: 0, free: true, lessons: 5, mins: 45, cat: 'Beginner' },
  'intro-gold': { id: 'intro-gold', title: 'Introduction to Gold (XAUUSD)', desc: 'Why Ethiopian traders focus on gold, what moves the price, and how to read XAUUSD.', price: 0, free: true, lessons: 4, mins: 35, cat: 'Beginner' },
  'candlesticks': { id: 'candlesticks', title: 'Reading Candlestick Charts', desc: 'Master price action, candlestick patterns, support and resistance from candles.', price: 0, free: true, lessons: 6, mins: 55, cat: 'Beginner' },
  'forex-fundamentals': { id: 'forex-fundamentals', title: 'Forex Fundamentals', desc: 'Deep dive into pips, leverage, margin, and how to place real trades with exercises.', price: 500, free: false, lessons: 12, mins: 180, cat: 'Beginner' },
  'gold-mastery': { id: 'gold-mastery', title: 'Gold Trading Mastery', desc: 'Complete XAUUSD trading system: market structure, order blocks, DXY correlation, sessions.', price: 1500, free: false, lessons: 18, mins: 300, cat: 'Intermediate' },
  'risk-management': { id: 'risk-management', title: 'Risk Management & Psychology', desc: 'Position sizing, drawdown control, emotional discipline, and the trader mindset.', price: 800, free: false, lessons: 10, mins: 150, cat: 'Intermediate' },
  'market-structure': { id: 'market-structure', title: 'Advanced Market Structure', desc: 'HH/HL analysis, break of structure, change of character, supply and demand zones.', price: 2000, free: false, lessons: 15, mins: 240, cat: 'Advanced' },
  'bootcamp': { id: 'bootcamp', title: 'Full Trading Bootcamp', desc: 'All 4 paid courses bundled. Complete trader education — the fastest path to certification.', price: 4500, free: false, lessons: 55, mins: 840, cat: 'Bundle' },
  'certification': { id: 'certification', title: 'Certification Exam', desc: 'Prove your knowledge with our official exam. Pass to earn the FundedBirr Certified Trader certificate.', price: 500, free: false, lessons: 1, mins: 60, cat: 'Exam' },
}

const LESSON_TITLES: Record<string, string[]> = {
  'intro-forex': ['What is Forex?', 'Major Currency Pairs', 'Bid/Ask Spreads Explained', 'Global Trading Sessions', 'Forex Market Participants'],
  'intro-gold': ['Why Gold Matters', 'Factors That Move Gold', 'Reading XAUUSD Charts', 'Gold vs Other Assets'],
  'candlesticks': ['Candle Anatomy', 'Bullish Patterns', 'Bearish Patterns', 'Support & Resistance from Candles', 'Reversal Signals', 'Putting It All Together'],
  'forex-fundamentals': ['What Are Pips?', 'Leverage Explained', 'Margin Requirements', 'Position Sizing', 'Order Types', 'Interest Rates & Forex', 'NFP & Economic Calendar', 'CPI & Inflation Data', 'Central Bank Policy', 'Carry Trade Strategy', 'Fundamental Analysis Framework', 'Practice Exercises'],
  'gold-mastery': ['XAUUSD Overview', 'Market Structure Basics', 'Order Blocks', 'Liquidity Zones', 'DXY Correlation', 'Gold & Commodities', 'Trading Sessions & Gold', 'Asian Range Strategy', 'London Breakout', 'New York Momentum', 'News Trading Gold', 'Gold & Inflation', 'Geopolitical Events', 'Risk Management for Gold', 'Position Sizing for XAUUSD', 'Trade Management', 'Journaling Trades', 'Full System Review'],
  'risk-management': ['Why Risk Management Matters', 'Position Sizing Formula', 'Stop Loss Placement', 'Risk-Reward Ratios', 'Drawdown Control', 'Max Risk Per Trade', 'Emotional Discipline', 'Trading Psychology', 'Building a Routine', 'Review & Improvement'],
  'market-structure': ['Market Structure Overview', 'HH/HL Analysis', 'Break of Structure', 'Change of Character', 'Supply & Demand Basics', 'Supply Zones', 'Demand Zones', 'Order Flow', 'Trend Identification', 'Range-Bound Markets', 'Entry Triggers', 'Stop Placement in Structure', 'Multi-Timeframe Analysis', 'Structure Trading Plan', 'Advanced Review'],
  'bootcamp': ['Welcome & Overview', 'Forex Basics Refresher', 'Gold Fundamentals', 'Technical Analysis Foundations', 'Candlestick Mastery', 'Market Structure Deep Dive', 'Supply & Demand Pro', 'Order Blocks & Liquidity', 'DXY & Correlation', 'Fundamental Analysis', 'News Trading', 'Risk Management System', 'Psychology & Discipline', 'Trade Planning', 'Journaling Framework', 'Live Market Analysis 1', 'Live Market Analysis 2', 'Mock Trading Session 1', 'Mock Trading Session 2', 'Strategy Review', 'Backtesting Methodology', 'Forward Testing', 'Performance Evaluation', 'Common Mistakes', 'Advanced Entries', 'Advanced Exits', 'Scaling Positions', 'Portfolio Management', 'Mentorship Session 1', 'Mentorship Session 2', 'Mentorship Session 3', 'Mentorship Session 4', 'Exam Preparation', 'Final Q&A', 'Bootcamp Review', 'Graduation'],
  'certification': ['Certification Exam'],
}

function generateLessonTitles(courseId: string, count: number): string[] {
  if (LESSON_TITLES[courseId]) return LESSON_TITLES[courseId]
  const titles: string[] = []
  for (let i = 1; i <= count; i++) {
    titles.push(`Lesson ${i}`)
  }
  return titles
}

const TELEBIRR_NUMBER = process.env.NEXT_PUBLIC_TELEBIRR_NUMBER || '251XXXXXXXXX'
const ACCOUNT_NAME = 'FundedBirr Academy'

function formatPrice(price: number): string {
  return price.toLocaleString('en-ET') + ' ETB'
}

export default function CourseDetail() {
  const params = useParams()
  const slug = params.slug as string
  const course = COURSES[slug]

  const [modalOpen, setModalOpen] = useState(false)
  const [txRef, setTxRef] = useState('')
  const [phone, setPhone] = useState('')
  const [fullName, setFullName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  if (!course) {
    return (
      <section className="section" style={{ textAlign: 'center', paddingTop: '6rem' }}>
        <h1 className="section-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
        <p className="section-sub" style={{ margin: '0 auto 2rem' }}>Course not found.</p>
        <Link href="/" className="btn-primary">&larr; Back to Home</Link>
      </section>
    )
  }

  const lessonTitles = generateLessonTitles(course.id, course.lessons)
  const durationHrs = Math.floor(course.mins / 60)
  const durationMins = course.mins % 60
  const durationStr = durationHrs > 0
    ? `${durationHrs}h${durationMins > 0 ? ` ${durationMins}m` : ''}`
    : `${durationMins}m`

  const resetForm = () => {
    setTxRef('')
    setPhone('')
    setFullName('')
    setError('')
    setSuccess(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const txRefRegex = /^[A-Za-z0-9]{10}$/
    if (!txRefRegex.test(txRef)) {
      setError('Transaction Reference must be exactly 10 alphanumeric characters.')
      return
    }

    const phoneClean = phone.replace(/\s+/g, '')
    const phoneRegex = /^(251\d{9}|09\d{8})$/
    if (!phoneRegex.test(phoneClean)) {
      setError('Enter a valid Telebirr phone (251XXXXXXXXX or 09XXXXXXXX).')
      return
    }

    if (!fullName.trim()) {
      setError('Full Name is required.')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('/api/academy/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: fullName.trim(),
          course_id: course.id,
          telebirr_tx_ref: txRef,
          telebirr_phone: phoneClean,
          amount_etb: course.price,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Enrollment failed. Please try again.')
      }

      setSuccess(true)
      resetForm()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSubmitting(false)
    }
  }

  const isFree = course.free

  return (
    <>
      <section className="section" style={{ paddingTop: '6rem' }}>
        {/* Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          marginBottom: '2rem',
        }}>
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <span style={{ opacity: 0.5 }}>/</span>
          <Link href="/#courses" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Courses</Link>
          <span style={{ opacity: 0.5 }}>/</span>
          <span style={{ color: 'var(--text)' }}>{course.title}</span>
        </div>

        {/* Course Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          marginBottom: '3rem',
        }}>
          <div>
            <span className={`tag ${isFree ? 'tag-free' : 'tag-paid'}`}>
              {isFree ? 'Free' : formatPrice(course.price)}
            </span>
            <span className="tag tag-popular" style={{ marginLeft: '0.5rem' }}>{course.cat}</span>

            <h1 className="section-title" style={{ marginTop: '0.75rem' }}>{course.title}</h1>
            <p className="section-sub" style={{ maxWidth: '480px' }}>{course.desc}</p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              marginBottom: '2rem',
              fontSize: '0.88rem',
              color: 'var(--text-muted)',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                {course.lessons} {course.lessons === 1 ? 'lesson' : 'lessons'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {durationStr}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {isFree ? (
                <Link
                  href={`/courses/${slug}/lesson/1`}
                  className="btn-primary"
                  style={{
                    background: 'var(--green)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Start Free
                </Link>
              ) : (
                <button
                  className="btn-gold"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    border: 'none',
                  }}
                  onClick={() => { resetForm(); setModalOpen(true); setSuccess(false) }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                  Enroll Now &mdash; {formatPrice(course.price)}
                </button>
              )}
              <Link
                href="/dashboard"
                className="btn-outline"
                style={{ fontSize: '0.82rem' }}
              >
                Already enrolled? Go to your dashboard
              </Link>
            </div>
          </div>

          {/* Course card visual */}
          <div className="card" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            minHeight: '280px',
            borderColor: isFree ? 'rgba(40,168,106,0.2)' : 'rgba(201,145,42,0.25)',
            background: isFree
              ? 'linear-gradient(135deg, rgba(40,168,106,0.06) 0%, rgba(15,31,61,1) 100%)'
              : 'linear-gradient(135deg, rgba(201,145,42,0.06) 0%, rgba(15,31,61,1) 100%)',
          }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '16px',
              background: isFree ? 'rgba(40,168,106,0.12)' : 'rgba(201,145,42,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={isFree ? 'var(--green)' : 'var(--gold)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '0.25rem',
            }}>
              {course.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              {course.lessons} {course.lessons === 1 ? 'lesson' : 'lessons'} &middot; {durationStr}
            </p>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '1.6rem',
              fontWeight: 800,
              color: isFree ? 'var(--green)' : 'var(--gold)',
            }}>
              {isFree ? 'Free' : formatPrice(course.price)}
            </span>
          </div>
        </div>

        {/* Lessons List */}
        <div>
          <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>
            Course Lessons
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {lessonTitles.map((title, i) => {
              const lessonNum = i + 1
              const unlocked = isFree
              return (
                <div
                  key={i}
                  className="card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem 1.5rem',
                    opacity: unlocked ? 1 : 0.6,
                    cursor: unlocked ? 'pointer' : 'default',
                    borderColor: 'var(--border)',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      background: unlocked ? 'rgba(40,168,106,0.1)' : 'rgba(138,155,192,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      fontFamily: "'Syne', sans-serif",
                      color: unlocked ? 'var(--green)' : 'var(--text-muted)',
                      flexShrink: 0,
                    }}>
                      {lessonNum}
                    </span>
                    <div>
                      <div style={{
                        fontSize: '0.92rem',
                        fontWeight: 500,
                        color: unlocked ? 'var(--text)' : 'var(--text-muted)',
                      }}>
                        {title}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        marginTop: '2px',
                      }}>
                        {Math.ceil(course.mins / course.lessons)} min
                      </div>
                    </div>
                  </div>
                  <div>
                    {unlocked ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                      </svg>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="disclaimer" style={{ marginTop: '2rem' }}>
          <strong style={{ color: 'var(--text)' }}>Disclaimer:</strong> The educational content provided on FundedBirr Academy is for informational and educational purposes only. It does not constitute financial or investment advice. Trading forex and gold carries significant risk. Past performance does not guarantee future results.
        </div>
      </section>

      {/* ─── TELEBIRR MODAL ─── */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false) }}
        >
          {/* backdrop */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(6px)',
          }} />

          {/* modal */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '520px',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'var(--navy-2)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '2rem',
          }}>
            {/* close button */}
            <button
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255,255,255,0.06)',
                border: 'none',
                borderRadius: '8px',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                fontSize: '1.1rem',
                cursor: 'pointer',
              }}
              onClick={() => setModalOpen(false)}
            >
              &times;
            </button>

            {success ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'rgba(40,168,106,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'var(--green)',
                  marginBottom: '0.5rem',
                }}>
                  Enrollment Submitted!
                </h3>
                <p style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)',
                  marginBottom: '1.5rem',
                  lineHeight: 1.6,
                }}>
                  Thank you for enrolling in <strong style={{ color: 'var(--text)' }}>{course.title}</strong>.
                  We will verify your payment within <strong>24 hours</strong> and
                  activate your course access. You will receive a confirmation on
                  your Telebirr phone number.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    className="btn-primary"
                    style={{ background: 'var(--green)', border: 'none' }}
                    onClick={() => setModalOpen(false)}
                  >
                    Done
                  </button>
                  <Link
                    href="/dashboard"
                    className="btn-outline"
                    style={{ textDecoration: 'none' }}
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  marginBottom: '0.3rem',
                }}>
                  Pay via Telebirr
                </h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  marginBottom: '1.5rem',
                }}>
                  Enroll in <strong style={{ color: 'var(--text)' }}>{course.title}</strong>
                </p>

                {/* Amount */}
                <div className="card" style={{
                  textAlign: 'center',
                  marginBottom: '1.25rem',
                  padding: '1.25rem',
                  background: 'rgba(201,145,42,0.06)',
                  borderColor: 'rgba(201,145,42,0.2)',
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Amount to Send
                  </div>
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    color: 'var(--gold)',
                  }}>
                    {formatPrice(course.price)}
                  </div>
                </div>

                {/* Account Details */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem',
                  marginBottom: '1.5rem',
                }}>
                  <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Telebirr Number
                    </div>
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: 'var(--text)',
                      wordBreak: 'break-all',
                    }}>
                      {TELEBIRR_NUMBER}
                    </div>
                  </div>
                  <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      Account Name
                    </div>
                    <div style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      color: 'var(--text)',
                    }}>
                      {ACCOUNT_NAME}
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div style={{
                  background: 'rgba(30,111,217,0.06)',
                  border: '1px solid rgba(30,111,217,0.12)',
                  borderRadius: '10px',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.5rem',
                }}>
                  <p style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'var(--blue-light)',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    How to Pay
                  </p>
                  <ol style={{
                    paddingLeft: '1.25rem',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.8,
                    margin: 0,
                  }}>
                    <li>Open your Telebirr app</li>
                    <li>Select <strong>Send Money</strong> or <strong>Transfer</strong></li>
                    <li>Enter the Telebirr number: <strong>{TELEBIRR_NUMBER}</strong></li>
                    <li>Enter the exact amount: <strong>{formatPrice(course.price)}</strong></li>
                    <li>You will receive a <strong>Transaction Reference</strong> (10 characters)</li>
                    <li>Fill in the form below with the details</li>
                    <li>We will verify and activate your access within 24 hours</li>
                  </ol>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    marginBottom: '1.25rem',
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                        marginBottom: '0.35rem',
                        fontWeight: 500,
                      }}>
                        Transaction Reference <span style={{ color: 'var(--red)' }}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. A1B2C3D4E5"
                        maxLength={10}
                        value={txRef}
                        onChange={(e) => setTxRef(e.target.value.toUpperCase())}
                        style={{
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          fontFamily: "'DM Sans', monospace",
                        }}
                        required
                      />
                      <div style={{
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        marginTop: '0.25rem',
                      }}>
                        Enter the 10-character reference from your Telebirr transaction.
                      </div>
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                        marginBottom: '0.35rem',
                        fontWeight: 500,
                      }}>
                        Telebirr Phone <span style={{ color: 'var(--red)' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="251912345678 or 0912345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                        marginBottom: '0.35rem',
                        fontWeight: 500,
                      }}>
                        Full Name <span style={{ color: 'var(--red)' }}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div style={{
                      background: 'rgba(232,75,75,0.08)',
                      border: '1px solid rgba(232,75,75,0.2)',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      fontSize: '0.85rem',
                      color: 'var(--red)',
                      marginBottom: '1rem',
                    }}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn-gold"
                    style={{
                      width: '100%',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      opacity: submitting ? 0.7 : 1,
                    }}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span style={{
                          width: 16,
                          height: 16,
                          border: '2px solid var(--navy)',
                          borderTopColor: 'transparent',
                          borderRadius: '50%',
                          display: 'inline-block',
                          animation: 'spin 0.6s linear infinite',
                        }} />
                        Processing...
                      </>
                    ) : (
                      `Submit Enrollment`
                    )}
                  </button>
                </form>

                <p style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                  marginTop: '1.25rem',
                  lineHeight: 1.5,
                }}>
                  By submitting, you agree to our{' '}
                  <Link href="/terms" style={{ color: 'var(--blue-light)', textDecoration: 'underline' }}>Terms of Service</Link>.
                  Access will be granted within 24 hours of payment verification.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
