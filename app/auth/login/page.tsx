'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const err = await login(email, password)
    setLoading(false)

    if (err) {
      setError(err)
    } else {
      router.push('/dashboard')
    }
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
        maxWidth: '420px',
        padding: '2.5rem',
      }}>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '1.6rem',
          fontWeight: 800,
          marginBottom: '0.5rem',
          color: 'var(--text)',
        }}>
          Welcome back
        </h1>
        <p style={{
          fontSize: '0.88rem',
          color: 'var(--text-muted)',
          marginBottom: '2rem',
        }}>
          Sign in to continue learning
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
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', textAlign: 'center', opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {error && (
            <p style={{
              fontSize: '0.82rem',
              color: 'var(--red)',
              textAlign: 'center',
              background: 'rgba(232,75,75,0.08)',
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(232,75,75,0.15)',
            }}>
              {error}
            </p>
          )}
        </form>

        <p style={{
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          textAlign: 'center',
          marginTop: '1.5rem',
        }}>
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" style={{ color: 'var(--blue-light)', fontWeight: 500, textDecoration: 'none' }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
