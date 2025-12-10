'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle } from 'lucide-react'

// This would typically come from a CMS or database
const projectData: Record<string, {
  title: string
  location: string
  year: string
  type: string
  description: string
  highlights: string[]
  heroImage: string
  gallery: string[]
}> = {
  'luxury-residential-complex': {
    title: 'Luxury Residential Complex',
    location: 'Mumbai, India',
    year: '2024',
    type: 'Residential',
    description: 'A premium residential complex featuring compact yet luxurious apartments designed for modern urban living. The project emphasizes sustainable materials and energy-efficient design while maximizing space efficiency.',
    highlights: [
      'Sustainable building materials',
      'Energy-efficient design',
      'Compact luxury living',
      'Modern architectural aesthetics',
      'Green spaces integration',
    ],
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=1080&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    ],
  },
  'modern-office-space': {
    title: 'Modern Office Space',
    location: 'Delhi, India',
    year: '2023',
    type: 'Commercial',
    description: 'A contemporary office space designed to foster collaboration and productivity. The design features flexible workspaces, natural lighting, and sustainable interior solutions.',
    highlights: [
      'Flexible workspace design',
      'Natural lighting optimization',
      'Sustainable materials',
      'Collaborative zones',
      'Modern aesthetics',
    ],
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=800&h=600&fit=crop',
    ],
  },
  'sustainable-living-hub': {
    title: 'Sustainable Living Hub',
    location: 'Bangalore, India',
    year: '2024',
    type: 'Mixed Use',
    description: 'An innovative mixed-use development combining residential, commercial, and community spaces with a strong focus on sustainability and environmental responsibility.',
    highlights: [
      'Mixed-use development',
      'Solar energy integration',
      'Water conservation systems',
      'Community spaces',
      'Eco-friendly materials',
    ],
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
    ],
  },
  'boutique-hotel-design': {
    title: 'Boutique Hotel Design',
    location: 'Goa, India',
    year: '2023',
    type: 'Hospitality',
    description: 'A luxury boutique hotel featuring unique design elements that reflect local culture while maintaining modern comfort and elegance.',
    highlights: [
      'Cultural design integration',
      'Luxury interiors',
      'Sustainable hospitality design',
      'Unique architectural elements',
      'Premium guest experience',
    ],
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566073771219-8e0a3a4a3e3e?w=800&h=600&fit=crop',
    ],
  },
  'contemporary-villa': {
    title: 'Contemporary Villa',
    location: 'Pune, India',
    year: '2024',
    type: 'Residential',
    description: 'A stunning contemporary villa that seamlessly blends indoor and outdoor living spaces, featuring minimalist design and premium finishes.',
    highlights: [
      'Indoor-outdoor integration',
      'Minimalist design',
      'Premium finishes',
      'Modern architecture',
      'Landscape integration',
    ],
    heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=1080&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
    ],
  },
  // Add more projects as needed
  'urban-loft-renovation': {
    title: 'Urban Loft Renovation',
    location: 'Hyderabad, India',
    year: '2023',
    type: 'Residential',
    description: 'A complete renovation of an urban loft, transforming it into a modern, functional living space with industrial elements.',
    highlights: [
      'Industrial design elements',
      'Space maximization',
      'Modern renovation',
      'Functional layout',
      'Urban aesthetic',
    ],
    heroImage: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1920&h=1080&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
    ],
  },
  'corporate-headquarters': {
    title: 'Corporate Headquarters',
    location: 'Chennai, India',
    year: '2024',
    type: 'Commercial',
    description: 'A state-of-the-art corporate headquarters designed to reflect the company\'s values and provide an inspiring work environment.',
    highlights: [
      'Corporate identity design',
      'Modern workspace',
      'Premium finishes',
      'Technology integration',
      'Employee wellness focus',
    ],
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    ],
  },
  'eco-friendly-resort': {
    title: 'Eco-Friendly Resort',
    location: 'Kerala, India',
    year: '2023',
    type: 'Hospitality',
    description: 'An eco-friendly resort that harmonizes with its natural surroundings while providing luxury accommodations and sustainable amenities.',
    highlights: [
      'Eco-friendly design',
      'Natural integration',
      'Sustainable amenities',
      'Luxury accommodations',
      'Environmental consciousness',
    ],
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    ],
  },
  'minimalist-apartment': {
    title: 'Minimalist Apartment',
    location: 'Mumbai, India',
    year: '2024',
    type: 'Residential',
    description: 'A compact apartment redesigned with minimalist principles, maximizing space and functionality while maintaining elegance.',
    highlights: [
      'Minimalist design',
      'Space optimization',
      'Clean aesthetics',
      'Functional layout',
      'Premium materials',
    ],
    heroImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=1080&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
    ],
  },
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const project = projectData[slug]

  if (!project) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-charcoal mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-muted-gold hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Image */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-muted-gold mb-2 block">{project.type}</span>
                <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-200">
                  {project.location} • {project.year}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-display text-3xl font-bold text-charcoal mb-6">
                  Project Overview
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {project.description}
                </p>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gray-50 p-8 rounded-sm"
              >
                <h3 className="font-semibold text-xl text-charcoal mb-6">Project Highlights</h3>
                <ul className="space-y-4">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl font-bold text-charcoal mb-12 text-center"
          >
            Project Gallery
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative aspect-[4/3] overflow-hidden rounded-sm group cursor-pointer"
              >
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <Link
            href="/projects"
            className="inline-flex items-center text-charcoal hover:text-muted-gold transition-colors group"
          >
            <svg
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
        </div>
      </section>
    </div>
  )
}

