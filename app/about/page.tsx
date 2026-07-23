import { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About Us - Turnkey Home Builders & Architects | Criti Developers',
  description: 'Learn about Criti Developers, the leading turnkey house construction, interior execution, and architectural firm in Kannur and Kerala. Our design-first philosophy drives project excellence.',
  keywords: 'about criti developers, home builders kannur, architects payyannur, construction company kerala, turnkey architecture firm',
  openGraph: {
    title: 'About Us - Turnkey Home Builders & Architects | Criti Developers',
    description: 'Learn about Criti Developers, the leading turnkey house construction, interior execution, and architectural firm in Kannur and Kerala.',
    type: 'website',
  },
}

export default function AboutPage() {
  return <AboutClient />
}
