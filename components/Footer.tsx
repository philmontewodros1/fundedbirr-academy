import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '3rem 2rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div className="disclaimer" style={{ marginBottom: '2rem' }}>
        ⚠️ <strong>Educational Disclaimer:</strong> FundedBirr Academy is a trading education institute. All courses, mentorship, and certification programs are for educational purposes only. The FundedBirr Trading Challenge (fundedbirr.com) is a separate simulated trader evaluation platform. FundedBirr Academy does not provide investment advice, manage client funds, or guarantee trading profits. Trading financial markets involves substantial risk. Past performance does not guarantee future results.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.75rem' }}>
            FundedBirr<span style={{ color: 'var(--gold-light)' }}> Academy</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '260px' }}>
            Ethiopia&apos;s premier forex and gold trading education institute. Learn, get certified, and test your skills.
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.85rem', marginBottom: '1rem' }}>Courses</h4>
          {[['intro-forex','Intro to Forex'],['intro-gold','Intro to Gold'],['gold-mastery','Gold Mastery'],['bootcamp','Full Bootcamp'],['certification','Certification']].map(([slug, label]) => (
            <Link key={slug} href={`/courses/${slug}`} style={{ display: 'block', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', padding: '3px 0' }}>{label}</Link>
          ))}
        </div>
        <div>
          <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.85rem', marginBottom: '1rem' }}>Learn</h4>
          {[['mentorship','Mentorship'],['bootcamp','4-Week Bootcamp'],['blog','Free Articles'],['about','About Us'],['contact','Contact']].map(([href, label]) => (
            <Link key={href} href={`/${href}`} style={{ display: 'block', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', padding: '3px 0' }}>{label}</Link>
          ))}
        </div>
        <div>
          <h4 style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.85rem', marginBottom: '1rem' }}>Connect</h4>
          <a href={process.env.NEXT_PUBLIC_TELEGRAM || 'https://t.me/fundedbirr'} target="_blank" style={{ display: 'block', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', padding: '3px 0' }}>Telegram</a>
          <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '251XXXXXXXXX'}`} target="_blank" style={{ display: 'block', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', padding: '3px 0' }}>WhatsApp</a>
          <Link href="/contact" style={{ display: 'block', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', padding: '3px 0' }}>Contact</Link>
          <a href="https://www.fundedbirr.com" target="_blank" style={{ display: 'block', color: 'var(--green)', textDecoration: 'none', fontSize: '0.85rem', padding: '3px 0' }}>FundedBirr Challenge ↗</a>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        <span>© 2026 FundedBirr Academy. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms</Link>
          <Link href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy</Link>
        </div>
      </div>
    </footer>
  )
}
