'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Tab = 'payments' | 'students' | 'courses'

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('payments')
  const [payments, setPayments] = useState<any[]>([])
  const [paymentsLoading, setPaymentsLoading] = useState(true)
  const [students, setStudents] = useState<any[]>([])
  const [studentsLoading, setStudentsLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!loading && (!user || !user.is_admin)) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (!user?.is_admin) return
    fetch('/api/academy/admin/students')
      .then((res) => res.json())
      .then((data) => setStudents(data.students || []))
      .catch(() => {})
      .finally(() => setStudentsLoading(false))
  }, [user])

  useEffect(() => {
    if (!user?.is_admin) return
    fetch('/api/academy/admin/payments')
      .then((res) => res.json())
      .then((data) => {
        setPayments(data.payments || [])
      })
      .catch(() => {
        setError('Could not load from API.')
      })
      .finally(() => setPaymentsLoading(false))
  }, [user])

  const handleToggleAdmin = async (userId: string, email: string) => {
    try {
      const res = await fetch('/api/academy/admin/students', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, is_admin: true }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStudents((prev) => prev.filter((s) => s.id !== userId))
      setSuccessMsg(`${email} is now an admin.`)
      setErrorMsg('')
    } catch {
      setErrorMsg('Failed to update user.')
      setSuccessMsg('')
    }
  }

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
      setErrorMsg(`Failed to ${action} payment.`)
      setSuccessMsg('')
    }
  }

  if (loading) {
    return (
      <section style={{ padding: '6rem 2rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '4rem 0' }}>Loading...</p>
      </section>
    )
  }

  if (!user || !user.is_admin) {
    return (
      <section style={{ padding: '6rem 2rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.6rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.75rem' }}>
            Access Denied
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            You need admin access to view this page.
          </p>
          <Link href="/auth/login" className="btn-primary">Sign In</Link>
        </div>
      </section>
    )
  }

  return (
    <section style={{ padding: '6rem 2rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <div>
          <p className="section-label">Admin</p>
          <h1 className="section-title">Admin Dashboard</h1>
        </div>
        <div style={{
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          background: 'rgba(40,168,106,0.08)',
          padding: '0.35rem 0.75rem',
          borderRadius: '100px',
          border: '1px solid rgba(40,168,106,0.15)',
        }}>
          {user.email}
        </div>
      </div>
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

      {activeTab === 'payments' && (
        <>
          {paymentsLoading ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading payments...</p>
          ) : payments.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No pending payments.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Student</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Email</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Course</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem 0.5rem' }}>Amount</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Tx Ref</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Phone</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Date</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem 0.5rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p: any) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid rgba(78,130,220,0.08)' }}>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text)', fontWeight: 500 }}>{p.academy_users?.full_name || p.student_name || 'N/A'}</td>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>{p.academy_users?.email || p.email || 'N/A'}</td>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>{p.academy_courses?.title || p.course || 'N/A'}</td>
                      <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right', color: 'var(--accent)', fontWeight: 600 }}>
                        {(p.amount_etb || p.amount || 0).toLocaleString()} ETB
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                        {p.telebirr_tx_ref || p.tx_ref}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>{p.telebirr_phone || p.phone}</td>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>
                        {p.submitted_at ? new Date(p.submitted_at).toLocaleDateString() : p.date}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button onClick={() => handleAction(p.id, 'approve')} style={{
                            background: 'rgba(40,168,106,0.12)', color: 'var(--green)', border: '1px solid rgba(40,168,106,0.25)', borderRadius: '6px', padding: '0.35rem 0.75rem', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                          }}>Approve</button>
                          <button onClick={() => handleAction(p.id, 'reject')} style={{
                            background: 'rgba(232,75,75,0.1)', color: 'var(--red)', border: '1px solid rgba(232,75,75,0.2)', borderRadius: '6px', padding: '0.35rem 0.75rem', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                          }}>Reject</button>
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
        <>
          {studentsLoading ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading students...</p>
          ) : students.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No students found.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Name</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Email</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Phone</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem' }}>Registered</th>
                    <th style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>Courses</th>
                    <th style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>Admin</th>
                    <th style={{ textAlign: 'right', padding: '0.75rem 0.5rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s: any) => (
                    <tr key={s.id} style={{ borderBottom: '1px solid rgba(78,130,220,0.08)' }}>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text)', fontWeight: 500 }}>{s.full_name || 'N/A'}</td>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>{s.email}</td>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.75rem' }}>{s.phone || '-'}</td>
                      <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)' }}>
                        {s.created_at ? new Date(s.created_at).toLocaleDateString() : '-'}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        {s.enrollments?.length || 0}
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          width: '8px', height: '8px',
                          borderRadius: '50%',
                          background: s.is_admin ? 'var(--green)' : 'rgba(154,152,128,0.3)',
                        }} />
                      </td>
                      <td style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>
                        {!s.is_admin && (
                          <button onClick={() => handleToggleAdmin(s.id, s.email)} style={{
                            background: 'rgba(40,168,106,0.12)', color: 'var(--green)',
                            border: '1px solid rgba(40,168,106,0.25)', borderRadius: '6px',
                            padding: '0.35rem 0.75rem', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                          }}>Make Admin</button>
                        )}
                        {s.is_admin && (
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Admin</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {activeTab === 'courses' && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>Course Management</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Coming soon</p>
        </div>
      )}
    </section>
  )
}
