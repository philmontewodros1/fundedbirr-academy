'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

const courses = [
  { id: 'intro-forex', title: 'What is Forex Trading?', desc: 'The complete beginner guide to forex markets, currency pairs, and how trading works.', price: 0, lessons: 5, mins: 45, cat: 'Beginner', free: true },
  { id: 'intro-gold', title: 'Introduction to Gold (XAUUSD)', desc: 'Why Ethiopian traders focus on gold, what moves the price, and how to read XAUUSD.', price: 0, lessons: 4, mins: 35, cat: 'Beginner', free: true },
  { id: 'candlesticks', title: 'Reading Candlestick Charts', desc: 'Master price action, candlestick patterns, support and resistance from candles.', price: 0, lessons: 6, mins: 55, cat: 'Beginner', free: true },
  { id: 'forex-fundamentals', title: 'Forex Fundamentals', desc: 'Deep dive into pips, leverage, margin, and how to place real trades with exercises.', price: 500, lessons: 12, mins: 180, cat: 'Beginner', free: false },
  { id: 'gold-mastery', title: 'Gold Trading Mastery', desc: 'Complete XAUUSD trading system: market structure, order blocks, DXY correlation, sessions.', price: 1500, lessons: 18, mins: 300, cat: 'Intermediate', free: false },
  { id: 'risk-management', title: 'Risk Management & Psychology', desc: 'Position sizing, drawdown control, emotional discipline, and the trader mindset.', price: 800, lessons: 10, mins: 150, cat: 'Intermediate', free: false },
  { id: 'market-structure', title: 'Advanced Market Structure', desc: 'HH/HL analysis, break of structure, change of character, supply and demand zones.', price: 2000, lessons: 15, mins: 240, cat: 'Advanced', free: false },
  { id: 'bootcamp', title: 'Full Trading Bootcamp', desc: 'All 4 paid courses bundled. Complete trader education — the fastest path to certification.', price: 4500, lessons: 55, mins: 840, cat: 'Bundle', free: false },
  { id: 'certification', title: 'Certification Exam', desc: 'Prove your knowledge with our official exam. Pass to earn the FundedBirr Certified Trader certificate.', price: 500, lessons: 1, mins: 60, cat: 'Exam', free: false },
]

const categories = ['All', 'Free', 'Beginner', 'Intermediate', 'Advanced', 'Bundle']

function formatPrice(price: number) {
  return price.toLocaleString('en-ET') + ' ETB'
}

function formatDuration(mins: number) {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h > 0 ? `${h}h${m > 0 ? ` ${m}m` : ''}` : `${m}m`
}

export default function CoursesPage() {
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? courses
    : filter === 'Free' ? courses.filter(c => c.free)
    : courses.filter(c => c.cat === filter)

  return (
    <>
      <section className="section" style={{ paddingTop: '6rem' }}>
        <p className="section-label">Courses</p>
        <h1 className="section-title">All Courses</h1>
        <p className="section-sub">
          Start your trading education journey. All courses are designed for Ethiopian traders.
        </p>
      </section>

      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem 1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{
                padding: '0.4rem 1rem', borderRadius: '100px', border: filter === cat ? '2px solid var(--accent)' : '1px solid var(--border)',
                background: filter === cat ? 'rgba(100,157,255,0.1)' : 'transparent',
                color: filter === cat ? 'var(--accent)' : 'var(--text-muted)',
                fontFamily: "'DM Sans', sans-serif", fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >{cat}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
          {filtered.map(c => (
            <Link key={c.id} href={`/courses/${c.id}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{
                display: 'flex', flexDirection: 'column', height: '100%',
                borderColor: c.free ? 'rgba(40,168,106,0.2)' : c.cat === 'Bundle' ? 'rgba(201,145,42,0.25)' : 'var(--border)',
                background: c.free ? 'linear-gradient(135deg, rgba(40,168,106,0.04) 0%, rgba(15,31,61,1) 100%)'
                  : c.cat === 'Bundle' ? 'linear-gradient(135deg, rgba(201,145,42,0.04) 0%, rgba(15,31,61,1) 100%)'
                  : 'var(--card-bg)',
                transition: 'transform 0.2s, border-color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = c.free ? 'rgba(40,168,106,0.2)' : c.cat === 'Bundle' ? 'rgba(201,145,42,0.25)' : 'var(--border)' }}
              >
                <span className="tag" style={{
                  alignSelf: 'flex-start', fontSize: '0.65rem', fontWeight: 700, padding: '3px 10px',
                  borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem',
                  background: c.free ? 'rgba(40,168,106,0.1)' : c.cat === 'Bundle' ? 'rgba(201,145,42,0.1)' : 'rgba(30,111,217,0.1)',
                  color: c.free ? 'var(--green)' : c.cat === 'Bundle' ? 'var(--gold)' : 'var(--blue-light)',
                  border: c.free ? '1px solid rgba(40,168,106,0.2)' : c.cat === 'Bundle' ? '1px solid rgba(201,145,42,0.2)' : '1px solid rgba(30,111,217,0.2)',
                }}>
                  {c.cat}
                </span>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem', flex: 1 }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem', flex: 2 }}>
                  {c.desc}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <span>{c.lessons} lessons · {formatDuration(c.mins)}</span>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: c.free ? 'var(--green)' : 'var(--gold)' }}>
                    {c.free ? 'Free' : formatPrice(c.price)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 0' }}>No courses in this category.</p>
        )}
      </section>
    </>
  )
}
