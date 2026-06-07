import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Free Trading Articles — FundedBirr Academy',
  description: 'Learn forex and gold trading with free articles. Guides on candlestick patterns, risk management, trading strategies, and more for Ethiopian traders.',
}

const articles = [
  {
    title: 'How to Trade Gold (XAUUSD) in Ethiopia',
    desc: 'A complete guide for Ethiopian traders looking to trade gold. Learn about XAU/USD, key drivers, and practical strategies.',
    category: 'Gold Trading',
    readTime: '8 min read',
  },
  {
    title: 'What is Forex Trading? Beginner\'s Guide',
    desc: 'Everything you need to know to start trading forex. From currency pairs to spreads, we break it down in simple terms.',
    category: 'Forex Basics',
    readTime: '6 min read',
  },
  {
    title: 'Understanding Candlestick Patterns',
    desc: 'Master price action with this guide to candlestick patterns. Learn dojis, engulfing, hammers, and shooting stars.',
    category: 'Technical Analysis',
    readTime: '10 min read',
  },
  {
    title: 'Risk Management: The Most Important Skill',
    desc: 'Why protecting your capital matters more than finding the perfect entry. Position sizing, stop-losses, and risk-reward ratios.',
    category: 'Risk Management',
    readTime: '7 min read',
  },
  {
    title: 'How to Choose a Trading Strategy',
    desc: 'Find what works for you. A practical guide to matching your personality with the right trading approach.',
    category: 'Trading Psychology',
    readTime: '9 min read',
  },
  {
    title: 'Gold Trading Sessions: Best Times for Ethiopians',
    desc: 'When to trade gold from Ethiopia. Learn about the London, New York, and Asian sessions and their overlap hours.',
    category: 'Gold Trading',
    readTime: '6 min read',
  },
]

export default function BlogPage() {
  return (
    <>
      <section className="section" style={{ paddingTop: '6rem' }}>
        <p className="section-label">Blog</p>
        <h1 className="section-title">Free Trading Articles</h1>
        <p className="section-sub">
          Educational content to help Ethiopian traders build their knowledge. 
          No fluff, just practical insights.
        </p>
      </section>

      <section style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 2rem 5rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.25rem',
      }}>
        {articles.map((a, i) => (
          <div key={i} className="card" style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <span className="tag" style={{
              display: 'inline-block',
              fontSize: '0.65rem',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: '100px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.75rem',
              background: 'rgba(30,111,217,0.1)',
              color: 'var(--blue-light)',
              border: '1px solid rgba(30,111,217,0.2)',
              alignSelf: 'flex-start',
            }}>
              {a.category}
            </span>
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '0.5rem',
            }}>
              {a.title}
            </h3>
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              flex: 1,
              marginBottom: '1rem',
            }}>
              {a.desc}
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--border)',
              paddingTop: '0.75rem',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
            }}>
              <span>{a.readTime}</span>
              <Link href="/blog" style={{
                color: 'var(--accent)',
                fontWeight: 600,
                textDecoration: 'none',
              }}>
                Read More &rarr;
              </Link>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
