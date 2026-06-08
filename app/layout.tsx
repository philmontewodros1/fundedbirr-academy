import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import AuthWrapper from '@/components/AuthWrapper'

export const metadata: Metadata = {
  title: 'FundedBirr Academy — Ethiopia\'s Premier Trading Education Institute',
  description: 'Learn forex and gold trading from expert Ethiopian traders. Free and paid courses, mentorship, certification, and practical skill assessment.',
  openGraph: {
    siteName: 'FundedBirr Academy',
    type: 'website',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </AuthWrapper>
      </body>
    </html>
  )
}
