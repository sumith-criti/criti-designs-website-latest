'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { use, useState, useEffect } from 'react'

// This would typically come from a CMS or database
const projectData: Record<string, {
  title: string
  location: string
  year: string
  type: string
  description: string
  highlights: string[]
  heroImage: string
  heroVideo?: string
  gallery: string[]
}> = {
  'munas-residence': {
    title: 'Munas Residence',
    location: 'Trikaripur, Kasargod',
    year: '2025',
    type: 'Residential',
    description: 'A beautiful residential project crafted for Munas in Trikaripur, Kasargod, offering contemporary design and comfortable living spaces.',
    highlights: [
      'Client: Munas',
      'Location: Trikaripur, Kasargod',
      'Residential project',
      'Contemporary design',
    ],
    heroImage: '/images/projects/munas/1.jpg',
    gallery: [
      '/images/projects/munas/1.jpg',
      '/images/projects/munas/2.jpg',
      '/images/projects/munas/3.jpg',
      '/images/projects/munas/4.jpg',
      '/images/projects/munas/5.jpg',
      '/images/projects/munas/6.jpg',
      '/images/projects/munas/7.jpg',
      '/images/projects/munas/8.jpg',
      '/images/projects/munas/9.jpg',
      '/images/projects/munas/10.jpg',
      '/images/projects/munas/11.jpg',
      '/images/projects/munas/12.jpg',
    ],
  },
  'nizar-residence': {
    title: 'Nizar Residence',
    location: 'Payyannur',
    year: '2025',
    type: 'Residential',
    description: 'A modern residential project designed for Mr. Nizar in Payyannur. This home features contemporary aesthetics combined with functional living spaces, optimized for comfort and style.',
    highlights: [
      'Client: Nizar',
      'Location: Payyannur',
      'Year: 2025',
      'Residential project',
      'Modern architectural design',
    ],
    heroImage: '/images/projects/nizar-residence/1.jpg',
    gallery: [
      '/images/projects/nizar-residence/1.jpg',
      '/images/projects/nizar-residence/2.jpg',
      '/images/projects/nizar-residence/3.jpg',
      '/images/projects/nizar-residence/4.jpg',
      '/images/projects/nizar-residence/5.jpg',
      '/images/projects/nizar-residence/6.jpg',
    ],
  },
  'marzook-residence': {
    title: 'Marzook Residence',
    location: 'Kunhimangalam',
    year: '2024',
    type: 'Residential',
    description: 'A contemporary residence crafted for Marzook in Kunhimangalam, featuring warm finishes, abundant daylight, and a seamless connection between indoor living and landscaped outdoor areas.',
    highlights: [
      'Client: Marzook',
      'Location: Kunhimangalam',
      'Year: 2024',
      'Residential project',
      'Indoor-outdoor flow with natural light',
    ],
    heroImage: '/images/projects/marzook/0.png',
    heroVideo: '/videos/projects/marzook/hero.mp4',
    gallery: [
      '/images/projects/marzook/0.png',
      '/images/projects/marzook/1.png',
      '/images/projects/marzook/2.png',
      '/images/projects/marzook/3.png',
    ],
  },
  'edathavalam': {
    title: 'Edathavalam',
    location: 'Trikaripur, Kasargod',
    year: '2024',
    type: 'Residential',
    description: 'Designed for Mr. Nizam, "Edathavalam" represents a harmonious blend of traditional architecture and modern living. Located in Trikaripur, Kasargod, this residence features open courtyards, abundant indoor greenery, and a warm, inviting atmosphere created through thoughtful lighting and material selection.',
    highlights: [
      'Client: Mr. Nizam',
      'Traditional Kerala elements',
      'Central courtyard with greenery',
      'Warm ambient lighting',
      'Indoor-outdoor living connection',
      'Sustainable design approach',
    ],
    heroImage: '/images/projects/edathavalam/1.jpg',
    gallery: [
      '/images/projects/edathavalam/1.jpg',
      '/images/projects/edathavalam/2.jpg',
      '/images/projects/edathavalam/3.jpg',
      '/images/projects/edathavalam/4.jpg',
      '/images/projects/edathavalam/5.jpg',
      '/images/projects/edathavalam/6.jpg',
      '/images/projects/edathavalam/7.jpg',
      '/images/projects/edathavalam/8.jpg',
      '/images/projects/edathavalam/9.jpg',
      '/images/projects/edathavalam/10.jpg',
      '/images/projects/edathavalam/11.jpg',
      '/images/projects/edathavalam/12.jpg',
      '/images/projects/edathavalam/13.jpg',
      '/images/projects/edathavalam/14.jpg',
      '/images/projects/edathavalam/15.jpg',
      '/images/projects/edathavalam/16.jpg',
      '/images/projects/edathavalam/17.jpg',
    ],
  },
  'shafeer-vellur': {
    title: 'Shafeer Residence',
    location: 'Vellur',
    year: '2022',
    type: 'Residential',
    description: 'A warm, wood-detailed family home crafted for Shafeer in Vellur. The interiors balance an airy layout with custom joinery, layered lighting, and a soft neutral palette. Open living, dining, and kitchen zones connect seamlessly, while built-ins and screens in rich timber add both storage and character.',
    highlights: [
      'Client: Shafeer',
      'Completed: 2022',
      'Location: Vellur',
      'Open-plan living, dining, and breakfast counter',
      'Warm timber staircase, screens, and built-ins',
      'Neutral palette with soft layered lighting',
    ],
    heroImage: '/images/projects/shafeer-vellur/4.jpg',
    gallery: [
      // '/images/projects/shafeer-vellur/1.jpg',
      '/images/projects/shafeer-vellur/2.jpg',
      '/images/projects/shafeer-vellur/3.jpg',
      '/images/projects/shafeer-vellur/4.jpg',
      '/images/projects/shafeer-vellur/5.jpg',
      '/images/projects/shafeer-vellur/6.jpg',
      '/images/projects/shafeer-vellur/7.jpg',
      '/images/projects/shafeer-vellur/8.jpg',
      '/images/projects/shafeer-vellur/9.jpg',
      '/images/projects/shafeer-vellur/10.jpg',
      '/images/projects/shafeer-vellur/11.jpg',
      '/images/projects/shafeer-vellur/12.jpg',
      '/images/projects/shafeer-vellur/13.jpg',
      '/images/projects/shafeer-vellur/14.jpg',
      '/images/projects/shafeer-vellur/15.jpg',
      '/images/projects/shafeer-vellur/16.jpg',
      '/images/projects/shafeer-vellur/17.jpg',
      '/images/projects/shafeer-vellur/18.jpg',
      '/images/projects/shafeer-vellur/19.jpg',
      '/images/projects/shafeer-vellur/20.jpg',
      '/images/projects/shafeer-vellur/21.jpg',
      '/images/projects/shafeer-vellur/22.jpg',
      '/images/projects/shafeer-vellur/23.jpg',
      '/images/projects/shafeer-vellur/24.jpg',
      '/images/projects/shafeer-vellur/25.jpg',
    ],
  },
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

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const project = projectData[slug]

  const handleNext = () => {
    if (selectedImageIndex === null || !project) return
    setSelectedImageIndex((prev) =>
      prev === project.gallery.length - 1 ? 0 : (prev ?? 0) + 1
    )
  }

  const handlePrev = () => {
    if (selectedImageIndex === null || !project) return
    setSelectedImageIndex((prev) =>
      prev === 0 ? project.gallery.length - 1 : (prev ?? 0) - 1
    )
  }

  useEffect(() => {
    // Lock scroll when modal is open
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return
      if (e.key === 'Escape') setSelectedImageIndex(null)
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImageIndex])

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
        {project.heroVideo ? (
          <video
            poster={project.heroImage}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={project.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        )}
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
                onClick={() => setSelectedImageIndex(index)}
              >
                <Image
                  src={image}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <p className="text-white opacity-0 group-hover:opacity-100 font-medium tracking-wide transition-opacity">View Image</p>
                </div>
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedImageIndex(null)
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 z-50"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Left Prev Button */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 z-50"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            {/* Right Next Button */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNext() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 z-50"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Image Container */}
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-[90vw] h-[80vh]"
            >
              <Image
                src={project.gallery[selectedImageIndex]}
                alt={`Gallery Image ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-8 left-0 right-0 text-center text-white/70 font-display tracking-widest">
              {selectedImageIndex + 1} / {project.gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

