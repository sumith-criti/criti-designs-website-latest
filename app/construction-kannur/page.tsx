import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'House Construction Company in Kannur | Criti Developers',
  description: 'Turnkey home construction services in Kannur & Payyannur. Expert builders with 10+ years experience. Get free consultation and transparent pricing for your dream home.',
  keywords: 'house construction kannur, home builders kannur, construction company payyannur, turnkey construction kannur, residential construction kerala',
}

const constructionData = {
  title: 'House Construction in Kannur',
  subtitle: 'Turnkey Home Construction Services',
  description: 'Build your dream home with Criti Developers. We offer complete turnkey construction services in Kannur, Payyannur, and Taliparamba. From foundation to handover, we handle everything with transparency, quality materials, and expert craftsmanship.',
  heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop',
  serviceFeatures: [
    'Complete turnkey construction from design to handover',
    'Transparent pricing with no hidden costs',
    'Quality materials and expert craftsmanship',
    'Timely project completion with regular updates',
    'In-house architects and engineers',
    'Post-construction support and warranty',
  ],
  processSteps: [
    {
      title: 'Design & Planning',
      description: 'Architectural design, structural planning, and approvals',
    },
    {
      title: 'Approval & Permits',
      description: 'Handle all legal approvals and building permits',
    },
    {
      title: 'Construction',
      description: 'Quality construction with regular site visits and updates',
    },
    {
      title: 'Handover',
      description: 'Final inspection, documentation, and smooth handover',
    },
  ],
  projectImages: [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
  ],
  metaTitle: 'House Construction Company in Kannur | Criti Developers',
  metaDescription: 'Turnkey home construction services in Kannur & Payyannur. Expert builders with 10+ years experience. Get free consultation today.',
}

export default function ConstructionKannurPage() {
  return <ServicePageTemplate {...constructionData} />
}

