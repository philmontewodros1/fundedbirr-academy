'use client'

import { useState, useEffect } from 'react'

type Payment = {
  id: string
  student_name: string
  email: string
  course: string
  amount: number
  tx_ref: string
  phone: string
  date: string
}

const fallbackPayments: Payment[] = [
  { id: '1', student_name: 'Abel Tesfaye', email: 'abel@example.com', course: 'Gold Mastery', amount: 1500, tx_ref: 'TX-20250601-001', phone: '+251911111111', date: '2025-06-01' },
  { id: '2', student_name: 'Meron Kebe', email: 'meron@example.com', course: 'Forex Fundamentals', amount: 500, tx_ref: 'TX-20250602-002', phone: '+251922222222', date: '2025-06-02' },
  { id: '3', student_name: 'Yonas Desta', email: 'yonas@example.com', course: 'Risk Management', amount: 800, tx_ref: 'TX-20250603-003', phone: '+251933333333', date: '2025-06-03' },
]

type Tab = 'payments' | 'students' | 'courses'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('payments')
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    fetch('/api/academy/admin/payments')
      .then((res) => res.json())
      .then((data) => {
        setPayments(Array.isArray(data) ? data : data.payments || [])
      })
      .catch(() => {
        setPayments(fallbackPayments)
        setError('Could not load from API. Showing example data.')
      })
      .finally(() => setLoading(false))
  }, [])

  const handleAction = async (paymentId: string, action: 'approve' | 'reject') => {
    try {
      const res = await fetch('/api/academy/admin/payments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_id: paymentId, action }),
      })
      if (!res.ok) throw new Error('Request failed')
      setPayments((prev) => prev.filter((p) => p.id !== paymentId))
      setSuccessMsg(`Payment ${action === 'approve' ? 'approved' : 'rejected'} successfully.`)
      setErrorMsg('')
    } catch {
      setErrorMsg(`Failed to ${action} payment. Please try again.`)
      setSuccessMsg('')
    }
  }

  return (
    <section style={{ padding: '6rem 2rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <p className="section-label">Admin</p>
      <h1 className="section-title">Admin Dashboard</h1>
      <p className="section-sub">
        Manage payments, students, and courses.
      </p>

      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        borderBottom: '1px solid var(--border)',
        paddingBottom: '0.75rem',
      }}>
        {(['payments', 'students', 'courses'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? 'var(--blue)' : 'transparent',
              color: activeTab === tab ? '#fff' : 'var(--text-muted)',
              border: activeTab === tab ? 'none' : '1px solid transparent',
              padding: '0.5rem 1.25rem',
              borderRadius: '8px',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              fontSize: '0.85rem',
              textTransform: 'capitalize',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {successMsg && (
        <div style={{
          background: 'rgba(40,168,106,0.1)',
          border: '1px solid rgba(40,168,106,0.25)',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
          fontSize: '0.85rem',
          color: 'var(--green)',
          marginBottom: '1rem',
        }}>
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div style={{
          background: 'rgba(232,75,75,0.1)',
          border: '1px solid rgba(232,75,75,0.25)',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
          fontSize: '0.85rem',
          color: 'var(--red)',
          marginBottom: '1rem',
        }}>
          {errorMsg}
        </div>
      )}

      {error && !errorMsg && (
        <div style={{
          background: 'rgba(232,184,75,0.1)',
          border: '1px solid rgba(232,184,75,0.2)',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
          fontSize: '0.85rem',
          color: 'var(--accent)',
          marginBottom: '1rem',
        }}>
          {error}
        </div>
      )}

      {activeTab === 'payments' && (
        <>
          {loading ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading payments...</p>
          ) : payments.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No pending payments.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.82rem',
              }}>
                <thead>
                  <tr style={{
                    borderBottom: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Student</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Email</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Course</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem 0.5rem' }}>Amount (ETB)</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Tx Ref</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Phone</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Date</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem 0.5rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} style={{
                      borderBottom: '1px solid rgba(78,130,220,0.08)',
                    }}>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text)', fontWeight: 500 }}>{p.student_name}</td>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>{p.email}</td>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>{p.course}</td>
                      <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', color: 'var(--accent)', fontWeight: 600 }}>
                        {p.amount.toLocaleString()}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                        {p.tx_ref}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>{p.phone}</td>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>{p.date}</td>
                      <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => handleAction(p.id, 'approve')}
                            style={{
                              background: 'rgba(40,168,106,0.12)',
                              color: 'var(--green)',
                              border: '1px solid rgba(40,168,106,0.25)',
                              borderRadius: '6px',
                              padding: '0.35rem 0.75rem',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(p.id, 'reject')}
                            style={{
                              background: 'rgba(232,75,75,0.1)',
                              color: 'var(--red)',
                              border: '1px solid rgba(232,75,75,0.2)',
                              borderRadius: '6px',
                              padding: '0.35rem 0.75rem',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {activeTab === 'students' && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎓</div>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: '0.5rem',
          }}>
            Student Management
          </h3>
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
          }}>
            Coming soon
          </p>
        </div>
      )}

      {activeTab === 'courses' && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📚</div>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: '0.5rem',
          }}>
            Course Management
          </h3>
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
          }}>
            Coming soon
          </p>
        </div>
      )}
    </section>
  )
}
