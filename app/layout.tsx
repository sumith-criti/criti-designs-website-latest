import type { Metadata } from 'next'
import { Montserrat, Lato } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyCTAs from '@/components/StickyCTAs'
import Providers from './providers'

const montserrat = Montserrat({
  weight: ['700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const lato = Lato({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.critidevelopers.com'),
  title: 'House Construction, Interiors & Architectural Design in Kannur | Criti Developers',
  description: 'House Construction, Interiors & Architectural Design in Kannur. Turnkey solutions with 10+ years of experience. Professional home building and design services.',
  keywords: 'house construction kannur, interior design kannur, architectural design payyannur, home builders kannur, construction company kerala, renovation services kannur, 3d elevation design',
  authors: [{ name: 'Criti Developers LLP' }],
  openGraph: {
    title: 'House Construction, Interiors & Architectural Design in Kannur | Criti Developers',
    description: 'House Construction, Interiors & Architectural Design in Kannur. Turnkey solutions with 10+ years of experience.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className={`${montserrat.variable} ${lato.variable} font-body antialiased bg-background`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <StickyCTAs />
          {process.env.NODE_ENV === 'production' && (
            <GoogleAnalytics gaId="G-V29QZ3Y9ED" />
          )}
        </Providers>
      </body>
    </html>
  )
}



