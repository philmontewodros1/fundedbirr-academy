'use client'

import { useState } from 'react'
import Link from 'next/link'

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ? `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}` : 'https://wa.me/251909121835'
const telegram = process.env.NEXT_PUBLIC_TELEGRAM || 'https://t.me/fundedbirr'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <>
      <section className="section" style={{ paddingTop: '6rem' }}>
        <p className="section-label">Contact</p>
        <h1 className="section-title">Get in touch</h1>
        <p className="section-sub">
          Have a question? Reach out to us via WhatsApp, Telegram, or the contact form below.
        </p>
      </section>

      <section style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 2rem 3rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1.5rem',
      }}>
        <div>
          <div className="card" style={{ marginBottom: '1.25rem' }}>
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--text)',
              marginBottom: '1rem',
            }}>
              Contact Info
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <div style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  marginBottom: '0.3rem',
                }}>
                  WhatsApp
                </div>
                <Link
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--green)',
                    fontWeight: 500,
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                  }}
                >
                  {whatsapp}
                </Link>
              </div>

              <div>
                <div style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  marginBottom: '0.3rem',
                }}>
                  Telegram
                </div>
                <Link
                  href={telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--blue-light)',
                    fontWeight: 500,
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                  }}
                >
                  {telegram}
                </Link>
              </div>

              <div>
                <div style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  marginBottom: '0.3rem',
                }}>
                  Email
                </div>
                <span style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.95rem',
                }}>
                  hello@fundedbirracademy.com
                </span>
              </div>
            </div>
          </div>

          <div className="card" style={{
            border: '1px solid rgba(40,168,106,0.15)',
            background: 'rgba(40,168,106,0.03)',
          }}>
            <p style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
            }}>
              <span style={{ color: 'var(--green)', fontWeight: 600 }}>Quick response:</span>{' '}
              We typically respond within a few hours on WhatsApp and Telegram. 
              For detailed inquiries, please use the contact form.
            </p>
          </div>
        </div>

        <div className="card">
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: '1.25rem',
          }}>
            Send us a message
          </h3>

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            <div>
              <label style={{
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '0.35rem',
                fontWeight: 500,
              }}>
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label style={{
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '0.35rem',
                fontWeight: 500,
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label style={{
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '0.35rem',
                fontWeight: 500,
              }}>
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What is this about?"
                required
              />
            </div>

            <div>
              <label style={{
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '0.35rem',
                fontWeight: 500,
              }}>
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                required
                rows={5}
                style={{ resize: 'vertical', minHeight: '120px' }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ alignSelf: 'flex-start' }}
            >
              Send Message
            </button>

            {submitted && (
              <div style={{
                background: 'rgba(40,168,106,0.1)',
                border: '1px solid rgba(40,168,106,0.25)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                fontSize: '0.85rem',
                color: 'var(--green)',
              }}>
                Coming soon — we are building the backend. Reach out via WhatsApp or Telegram in the meantime!
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  )
}
