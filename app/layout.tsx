import type { Metadata } from 'next'
import { Montserrat, Lato } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
  title: 'Criti Designs | Architectural + Engineering Design & Build Packages',
  description: 'Your Dream Home Begins Here. We design experiences that shape how you live, move, and feel. Architect-first approach with complete design-to-build solutions in Kerala, India.',
  keywords: 'architecture, engineering, design and build, construction, turnkey projects, Kerala, India, architectural design, building construction',
  authors: [{ name: 'Criti Designs' }],
  openGraph: {
    title: 'Criti Designs | Architectural + Engineering Design & Build Packages',
    description: 'Your Dream Home Begins Here. Architect-first approach with complete design-to-build solutions.',
    type: 'website',
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
      </body>
    </html>
  )
}



