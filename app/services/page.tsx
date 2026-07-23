import { Metadata } from 'next'
import ServicesClient from './ServicesClient'

export const metadata: Metadata = {
  title: 'Our Services - Architecture, Interiors & Building Construction | Criti Developers',
  description: 'Discover our comprehensive turnkey solutions including architectural planning, interior styling, custom home construction, and structural renovations in Kannur.',
  keywords: 'architectural planning services payyannur, home building contractor kannur, interior designers kerala, home restoration kannur, renovation contracting payyannur',
  openGraph: {
    title: 'Our Services - Architecture, Interiors & Building Construction | Criti Developers',
    description: 'Discover our comprehensive turnkey solutions including architectural planning, interior styling, custom home construction, and structural renovations in Kannur.',
    type: 'website',
  },
}

export default function ServicesPage() {
  return <ServicesClient />
}
