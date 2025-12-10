import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ServicePageTemplate'

export const metadata: Metadata = {
  title: '3D Elevation Design Services in Kannur | Criti Developers',
  description: 'Professional 3D elevation and facade design services in Kannur & Payyannur. Get stunning 3D visualizations of your home exterior. Free consultation.',
  keywords: '3d elevation design kannur, facade design payyannur, 3d house elevation, building elevation design, exterior design kerala',
}

const elevation3DData = {
  title: '3D Elevation Design in Kannur',
  subtitle: 'Stunning Exterior Designs & Visualizations',
  description: 'Create impressive facades for your home with our 3D elevation design services. We provide detailed 3D visualizations, material selection, and execution guidance for beautiful exterior designs in Kannur, Payyannur, and surrounding areas.',
  heroImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=1080&fit=crop',
  serviceFeatures: [
    '3D elevation design and visualization',
    'Multiple design options to choose from',
    'Material selection and specifications',
    'Modern and traditional elevation styles',
    'Detailed working drawings',
    'Execution support and guidance',
  ],
  processSteps: [
    {
      title: 'Design Brief',
      description: 'Understand your style preferences and requirements',
    },
    {
      title: '3D Design',
      description: 'Create multiple 3D elevation options',
    },
    {
      title: 'Selection',
      description: 'Review and select your preferred design',
    },
    {
      title: 'Final Design',
      description: 'Finalize detailed elevation drawings and specifications',
    },
  ],
  projectImages: [
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
  ],
  metaTitle: '3D Elevation Design Services in Kannur | Criti Developers',
  metaDescription: 'Professional 3D elevation and facade design services in Kannur & Payyannur. Get stunning 3D visualizations of your home exterior. Free consultation.',
}

export default function Elevation3DKannurPage() {
  return <ServicePageTemplate {...elevation3DData} />
}

