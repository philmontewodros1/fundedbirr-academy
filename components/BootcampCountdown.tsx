'use client'

import { useState, useEffect } from 'react'

function calcTimeLeft(target: Date) {
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function BootcampCountdown() {
  const target = new Date('2026-07-01T00:00:00')
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [])

  const total = timeLeft.days * 86400 + timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds
  if (total <= 0) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1.25rem',
        background: 'rgba(40,168,106,0.08)',
        border: '1px solid rgba(40,168,106,0.15)',
        borderRadius: '10px',
      }}>
        <span style={{ color: 'var(--green)', fontSize: '1.1rem' }}>🔥</span>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Status</span>
          <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--green)' }}>Cohort in Progress</span>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1.25rem',
      background: 'rgba(40,168,106,0.08)',
      border: '1px solid rgba(40,168,106,0.15)',
      borderRadius: '10px',
    }}>
      <span style={{ color: 'var(--green)', fontSize: '1.1rem' }}>📅</span>
      <div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Next Cohort</span>
        <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--green)' }}>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </span>
      </div>
    </div>
  )
}
