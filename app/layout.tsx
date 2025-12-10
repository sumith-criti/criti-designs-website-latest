import type { Metadata } from 'next'
import { Montserrat, Lato } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StickyCTAs from '@/components/StickyCTAs'

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
  title: 'House Construction, Interiors & Architectural Design in Kannur | Criti Developers',
  description: 'Turnkey home construction, interior design, renovation, and architectural services in Kannur, Payyannur & Taliparamba. 10+ years experience. Get free consultation today.',
  keywords: 'house construction kannur, interior design kannur, architectural design payyannur, home builders kannur, construction company kerala, renovation services kannur, 3d elevation design',
  authors: [{ name: 'Criti Developers LLP' }],
  openGraph: {
    title: 'House Construction, Interiors & Architectural Design in Kannur | Criti Developers',
    description: 'Turnkey home construction, interior design, renovation, and architectural services in Kannur, Payyannur & Taliparamba. Get free consultation.',
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
      <body className={`${montserrat.variable} ${lato.variable} font-body antialiased bg-background`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <StickyCTAs />
      </body>
    </html>
  )
}



