'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1.1rem 2rem', borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, background: 'rgba(10,22,40,0.96)',
      backdropFilter: 'blur(12px)', zIndex: 100
    }}>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1 }}>
          FundedBirr<span style={{ color: 'var(--gold-light)' }}> Academy</span>
        </div>
        <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '1px' }}>
          Trading Education Institute
        </div>
      </Link>

      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }}
        className="desktop-nav">
        <li><Link href="/courses" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Courses</Link></li>
        <li><Link href="/mentorship" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Mentorship</Link></li>
        <li><Link href="/bootcamp" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Bootcamp</Link></li>
        <li><Link href="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Blog</Link></li>
        <li>
          <Link href="/challenge" style={{ color: 'var(--green)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
            Take Challenge ↗
          </Link>
        </li>
        <li>
          <Link href="/auth/login" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>Login</Link>
        </li>
        <li>
          <Link href="/courses" style={{
            background: 'var(--blue)', color: '#fff', padding: '0.45rem 1.1rem',
            borderRadius: '6px', fontFamily: 'Syne, sans-serif', fontWeight: 700,
            fontSize: '0.82rem', textDecoration: 'none'
          }}>
            Start Free →
          </Link>
        </li>
      </ul>

      <button onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text)', fontSize: '1.4rem' }} className="mobile-menu-btn">
        {open ? '✕' : '☰'}
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'var(--navy-2)', borderBottom: '1px solid var(--border)',
          padding: '1rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem'
        }}>
          <Link href="/courses" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} onClick={() => setOpen(false)}>Courses</Link>
          <Link href="/mentorship" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} onClick={() => setOpen(false)}>Mentorship</Link>
          <Link href="/bootcamp" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} onClick={() => setOpen(false)}>Bootcamp</Link>
          <Link href="/challenge" style={{ color: 'var(--green)', textDecoration: 'none' }} onClick={() => setOpen(false)}>Take Challenge ↗</Link>
          <Link href="/auth/login" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} onClick={() => setOpen(false)}>Login</Link>
          <Link href="/courses" style={{
            background: 'var(--blue)', color: '#fff', padding: '0.45rem 1.1rem',
            borderRadius: '6px', fontFamily: 'Syne, sans-serif', fontWeight: 700,
            fontSize: '0.82rem', textDecoration: 'none', textAlign: 'center'
          }} onClick={() => setOpen(false)}>Start Free →</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
