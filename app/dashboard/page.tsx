'use client'
import Link from 'next/link'

const enrolledCourses = [
  {
    title: 'Gold Trading Mastery',
    progress: 60,
    slug: 'gold-mastery',
    lessons: 18,
    completed: 10,
  },
  {
    title: 'Forex Fundamentals',
    progress: 25,
    slug: 'forex-fundamentals',
    lessons: 12,
    completed: 3,
  },
]

const completedCourses = [
  'Introduction to Forex',
  'Introduction to Gold Trading',
  'Candlestick Patterns',
]

export default function DashboardPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Welcome */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
          fontWeight: 800,
          color: 'var(--text)',
          marginBottom: '0.3rem',
        }}>
          My Learning
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Pick up where you left off
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1rem',
        marginBottom: '2.5rem',
      }}>
        {[
          { label: 'Enrolled Courses', value: '3', color: 'var(--blue-light)' },
          { label: 'Completed', value: '3', color: 'var(--green)' },
          { label: 'Certification Status', value: 'Not Started', color: 'var(--gold)', small: true },
        ].map((stat, i) => (
          <div key={i} className="card" style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: stat.small ? '0.95rem' : '1.6rem',
              fontWeight: 800,
              color: stat.color,
              marginBottom: '0.3rem',
            }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Your Courses */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '1.15rem',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: '1rem',
        }}>
          Your Courses
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {enrolledCourses.map((course, i) => (
            <div key={i} className="card" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: 'var(--text)',
                  marginBottom: '0.75rem',
                }}>
                  {course.title}
                </h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.4rem',
                }}>
                  <div style={{
                    flex: 1,
                    height: 6,
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: 100,
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${course.progress}%`,
                      height: '100%',
                      background: course.progress >= 60 ? 'var(--green)' : 'var(--blue)',
                      borderRadius: 100,
                      transition: 'width 0.4s ease',
                    }} />
                  </div>
                  <span style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    minWidth: '2.5rem',
                    textAlign: 'right',
                  }}>
                    {course.progress}%
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {course.completed} of {course.lessons} lessons complete
                </div>
              </div>
              <Link
                href={`/courses/${course.slug}`}
                className="btn-primary"
                style={{ whiteSpace: 'nowrap' }}
              >
                Continue
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Completed Courses */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '1.15rem',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: '1rem',
        }}>
          Completed Courses
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {completedCourses.map((title, i) => (
            <div key={i} className="card" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 1.25rem',
            }}>
              <span style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'rgba(40,168,106,0.12)',
                color: 'var(--green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                flexShrink: 0,
              }}>
                ✓
              </span>
              <span style={{
                flex: 1,
                fontSize: '0.88rem',
                color: 'var(--text)',
                fontWeight: 500,
              }}>
                {title}
              </span>
              <span style={{
                fontSize: '0.65rem',
                color: 'var(--green)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                background: 'rgba(40,168,106,0.08)',
                padding: '2px 10px',
                borderRadius: '100px',
                border: '1px solid rgba(40,168,106,0.15)',
              }}>
                Certificate
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '1.15rem',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: '1rem',
        }}>
          Next Steps
        </h2>
        <div className="card" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}>
          <div>
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '0.3rem',
            }}>
              Take the Trading Challenge
            </h3>
            <p style={{
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              maxWidth: '400px',
            }}>
              Put your skills to the test. Pass the evaluation and qualify for a funded account.
            </p>
          </div>
          <Link href="/challenge" className="btn-gold" style={{ whiteSpace: 'nowrap', color: 'var(--navy)' }}>
            View Challenge
          </Link>
        </div>
      </section>
    </div>
  )
}
