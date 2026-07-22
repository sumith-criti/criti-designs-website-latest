import { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'House Construction, Interiors & Architectural Design in Kannur | Criti Developers',
  description: 'Turnkey house construction, interior design, and architectural planning services in Kannur and Payyannur, Kerala. Over 10+ years of professional home building experience.',
  keywords: 'house construction kannur, interior design kannur, architectural design payyannur, home builders kannur, construction company kerala, turnkey builders kerala, residential designs',
  openGraph: {
    title: 'House Construction, Interiors & Architectural Design in Kannur | Criti Developers',
    description: 'Turnkey design-to-build solutions with 10+ years of experience in Kannur and across Kerala.',
    type: 'website',
  },
}

export default function HomePage() {
  return <HomeClient />
}
