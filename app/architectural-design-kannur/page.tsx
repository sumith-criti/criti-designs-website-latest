import type { Metadata } from 'next'
import ServicePageTemplate from '@/components/ServicePageTemplate'

export const metadata: Metadata = {
  title: 'Architectural Design Services in Kannur | Criti Developers',
  description: 'Professional architectural design services in Kannur & Payyannur. Expert architects for residential and commercial projects. Get custom designs and plans.',
  keywords: 'architectural design kannur, architects payyannur, building design kerala, house plan design, architectural plans',
}

const architecturalDesignData = {
  title: 'Architectural Design in Kannur',
  subtitle: 'Expert Architectural Planning & Design',
  description: 'Work with our experienced architects to create custom designs for your home or commercial project. We provide complete architectural services including plans, 3D visualizations, and building approvals in Kannur, Payyannur, and Taliparamba.',
  heroImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=1080&fit=crop',
  serviceFeatures: [
    'Custom architectural design and planning',
    '3D visualizations and renderings',
    'Structural engineering and calculations',
    'Building plan approval assistance',
    'Residential and commercial designs',
    'Sustainable and eco-friendly designs',
  ],
  processSteps: [
    {
      title: 'Consultation',
      description: 'Discuss requirements, site analysis, and budget',
    },
    {
      title: 'Design',
      description: 'Create architectural plans and 3D visualizations',
    },
    {
      title: 'Review',
      description: 'Present designs and incorporate your feedback',
    },
    {
      title: 'Final Plans',
      description: 'Finalize approved plans and assist with approvals',
    },
  ],
  projectImages: [
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
  ],
  metaTitle: 'Architectural Design Services in Kannur | Criti Developers',
  metaDescription: 'Professional architectural design services in Kannur & Payyannur. Expert architects for residential and commercial projects. Free consultation.',
}

export default function ArchitecturalDesignKannurPage() {
  return <ServicePageTemplate {...architecturalDesignData} />
}

