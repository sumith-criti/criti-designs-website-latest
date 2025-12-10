import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'Interior Design Services in Kannur | Criti Developers',
  description: 'Professional interior design services in Kannur & Payyannur. Transform your home or office with modern, functional, and beautiful interiors. Free consultation available.',
  keywords: 'interior design kannur, home interior design payyannur, interior designers kerala, modern interior design, residential interior design',
}

const interiorDesignData = {
  title: 'Interior Design in Kannur',
  subtitle: 'Transform Your Space with Expert Design',
  description: 'Create beautiful, functional interiors that reflect your style. Our interior design team in Kannur specializes in residential and commercial spaces, combining aesthetics with practicality for spaces you\'ll love living in.',
  heroImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop',
  serviceFeatures: [
    'Complete interior design and execution',
    'Space planning and optimization',
    'Modern and traditional design styles',
    'Quality materials and furniture sourcing',
    'Lighting and color consultation',
    'Project management and timely delivery',
  ],
  processSteps: [
    {
      title: 'Consultation',
      description: 'Understand your needs, style, and budget',
    },
    {
      title: 'Design',
      description: 'Create 3D visualizations and detailed plans',
    },
    {
      title: 'Approval',
      description: 'Review and finalize design with your approval',
    },
    {
      title: 'Execution',
      description: 'Professional installation and finishing',
    },
  ],
  projectImages: [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop',
  ],
  metaTitle: 'Interior Design Services in Kannur | Criti Developers',
  metaDescription: 'Professional interior design services in Kannur & Payyannur. Transform your space with modern, functional designs. Free consultation available.',
}

export default function InteriorDesignKannurPage() {
  return <ServicePageTemplate {...interiorDesignData} />
}

