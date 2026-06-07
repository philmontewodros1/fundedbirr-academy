'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface CourseData {
  id: string
  title: string
  enrolled: boolean
  completed: boolean
  lessons_count: number
}

interface ProgressData {
  total: number
  completed_count: number
  percentage: number
}

export default function DashboardPage() {
  const [courses, setCourses] = useState<CourseData[]>([])
  const [progressMap, setProgressMap] = useState<Record<string, ProgressData>>({})
  const [loading, setLoading] = useState(true)
  const userId = 'demo-user'

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/academy/courses?user_id=${userId}`)
      const data = await res.json()
      const enrolled = (data.courses || []).filter((c: CourseData) => c.enrolled)
      setCourses(data.courses || [])

      const prog: Record<string, ProgressData> = {}
      await Promise.all(enrolled.map(async (c: CourseData) => {
        const pRes = await fetch(`/api/academy/progress?user_id=${userId}&course_id=${c.id}`)
        if (pRes.ok) {
          const pData = await pRes.json()
          prog[c.id] = pData
        }
      }))
      setProgressMap(prog)
      setLoading(false)
    }
    load()
  }, [])

  const enrolled = courses.filter(c => c.enrolled)
  const completed = courses.filter(c => c.completed)
  const freeCompleted = courses.filter(c => !c.paid && c.enrolled)

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto' }}>
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
          { label: 'Enrolled Courses', value: String(enrolled.length), color: 'var(--blue-light)' },
          { label: 'Completed', value: String(completed.length), color: 'var(--green)' },
          { label: 'Certification Status', value: completed.some(c => c.id === 'certification') ? 'Passed' : 'Not Started', color: 'var(--gold)', small: true },
        ].map((stat, i) => (
          <div key={i} className="card" style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: stat.small ? '0.95rem' : '1.6rem',
              fontWeight: 800,
              color: stat.color,
              marginBottom: '0.3rem',
            }}>
              {loading ? '...' : stat.value}
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
        {loading ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Loading your courses...</p>
        ) : enrolled.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
              You are not enrolled in any courses yet.
            </p>
            <Link href="/courses" className="btn-primary">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {enrolled.map((course) => {
              const prog = progressMap[course.id] || { total: course.lessons_count, completed_count: 0, percentage: 0 }
              return (
                <div key={course.id} className="card" style={{
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
                          width: `${prog.percentage}%`,
                          height: '100%',
                          background: prog.percentage >= 60 ? 'var(--green)' : 'var(--blue)',
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
                        {prog.percentage}%
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {prog.completed_count} of {prog.total} lessons complete
                    </div>
                  </div>
                  <Link
                    href={`/courses/${course.id}`}
                    className="btn-primary"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    Continue
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Completed Courses */}
      {completed.length > 0 && (
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
            {completed.map((course) => (
              <div key={course.id} className="card" style={{
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
                  {course.title}
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
      )}

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
