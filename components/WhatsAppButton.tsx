'use client'
export default function WhatsAppButton() {
  const num = process.env.NEXT_PUBLIC_WHATSAPP || '251XXXXXXXXX'
  return (
    <a href={`https://wa.me/${num}`} target="_blank" rel="noopener noreferrer"
      style={{
        position: 'fixed', bottom: '1.5rem', right: '1.5rem',
        background: '#25D366', color: '#fff', borderRadius: '50px',
        padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center',
        gap: '8px', textDecoration: 'none', fontFamily: 'Syne, sans-serif',
        fontWeight: 700, fontSize: '0.85rem', zIndex: 999,
        boxShadow: '0 4px 20px rgba(37,211,102,0.3)', transition: 'transform 0.2s'
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.033L.785 23.539l4.64-1.484A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.015-1.376l-.36-.214-3.727 1.193 1.164-3.638-.235-.374A9.818 9.818 0 1112 21.818z"/>
      </svg>
      Support
    </a>
  )
}
