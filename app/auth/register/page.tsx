'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [message, setMessage] = useState('')

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('Registration coming soon')
  }

  return (
    <div style={{
      minHeight: 'calc(100vh - 160px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '480px',
        padding: '2.5rem',
      }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '1.6rem',
          fontWeight: 800,
          marginBottom: '0.5rem',
          color: 'var(--text)',
        }}>
          Create your account
        </h1>
        <p style={{
          fontSize: '0.88rem',
          color: 'var(--text-muted)',
          marginBottom: '2rem',
        }}>
          Start your trading journey today
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.82rem',
              fontWeight: 500,
              color: 'var(--text)',
              marginBottom: '0.4rem',
            }}>
              Full Name
            </label>
            <input
              type="text"
              placeholder="Abebe Kebede"
              value={form.fullName}
              onChange={handleChange('fullName')}
              required
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.82rem',
              fontWeight: 500,
              color: 'var(--text)',
              marginBottom: '0.4rem',
            }}>
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange('email')}
              required
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.82rem',
              fontWeight: 500,
              color: 'var(--text)',
              marginBottom: '0.4rem',
            }}>
              Phone (optional)
            </label>
            <input
              type="tel"
              placeholder="+251 9XX XXX XXX"
              value={form.phone}
              onChange={handleChange('phone')}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.82rem',
              fontWeight: 500,
              color: 'var(--text)',
              marginBottom: '0.4rem',
            }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange('password')}
              required
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.82rem',
              fontWeight: 500,
              color: 'var(--text)',
              marginBottom: '0.4rem',
            }}>
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange('confirmPassword')}
              required
            />
          </div>

          <button type="submit" className="btn-gold" style={{ width: '100%', textAlign: 'center', color: 'var(--navy)' }}>
            Create Account
          </button>

          {message && (
            <p style={{
              fontSize: '0.82rem',
              color: 'var(--gold)',
              textAlign: 'center',
              background: 'rgba(201,145,42,0.08)',
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(201,145,42,0.15)',
            }}>
              {message}
            </p>
          )}
        </form>

        <p style={{
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          textAlign: 'center',
          marginTop: '1.5rem',
        }}>
          Already have an account?{' '}
          <Link href="/auth/login" style={{ color: 'var(--blue-light)', fontWeight: 500, textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
