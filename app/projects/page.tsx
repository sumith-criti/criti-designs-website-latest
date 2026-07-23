import { Metadata } from 'next'
import ProjectsClient from './ProjectsClient'

export const metadata: Metadata = {
  title: 'Our Architecture & Construction Portfolio | Criti Developers',
  description: 'Explore our portfolio of architectural design, premium interior execution, and turnkey house construction projects delivered across Kannur, Kasargod, and Kerala.',
  keywords: 'criti developers projects, construction portfolio kannur, house architecture examples kerala, luxury interiors payyannur, modern elevations kasargod',
  openGraph: {
    title: 'Our Architecture & Construction Portfolio | Criti Developers',
    description: 'Explore our portfolio of architectural design, premium interior execution, and turnkey house construction projects delivered across Kannur, Kasargod, and Kerala.',
    type: 'website',
  },
}

export default function ProjectsPage() {
  return <ProjectsClient />
}
