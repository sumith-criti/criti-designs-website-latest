import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'Home Renovation Services in Kannur | Criti Developers',
  description: 'Expert home renovation and remodeling services in Kannur & Payyannur. Transform your existing home with quality renovation work. Get free consultation.',
  keywords: 'home renovation kannur, house renovation payyannur, home remodeling kerala, renovation contractors kannur, home makeover services',
}

const renovationData = {
  title: 'Home Renovation in Kannur',
  subtitle: 'Transform Your Existing Home',
  description: 'Give your home a fresh new look with our expert renovation services. From kitchen and bathroom remodels to complete home makeovers, we handle all aspects of renovation with minimal disruption to your daily life.',
  heroImage: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&h=1080&fit=crop',
  serviceFeatures: [
    'Complete home renovation and remodeling',
    'Kitchen and bathroom renovations',
    'Structural modifications and extensions',
    'Modernization of existing spaces',
    'Minimal disruption during work',
    'Quality materials and workmanship',
  ],
  processSteps: [
    {
      title: 'Assessment',
      description: 'Site visit and detailed assessment of renovation needs',
    },
    {
      title: 'Planning',
      description: 'Design and planning for renovation work',
    },
    {
      title: 'Execution',
      description: 'Professional renovation with quality materials',
    },
    {
      title: 'Completion',
      description: 'Final touches and handover of renovated space',
    },
  ],
  projectImages: [
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
  ],
  metaTitle: 'Home Renovation Services in Kannur | Criti Developers',
  metaDescription: 'Expert home renovation and remodeling services in Kannur & Payyannur. Transform your existing home with quality work. Free consultation.',
}

export default function RenovationKannurPage() {
  return <ServicePageTemplate {...renovationData} />
}

