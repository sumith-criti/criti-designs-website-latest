'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const projects_list = [
  {
    id: 14,
    title: 'Munas Residence',
    location: 'Trikaripur, Kasargod',
    year: '2025',
    type: 'Residential',
    image: '/images/projects/munas/1.jpg',
    slug: 'munas-residence',
  },
  {
    id: 13,
    title: 'Nizar Residence',
    location: 'Payyannur',
    year: '2025',
    type: 'Residential',
    image: '/images/projects/nizar-residence/1.jpg',
    slug: 'nizar-residence',
  },
  {
    id: 12,
    title: 'Marzook Residence',
    location: 'Kunhimangalam',
    year: '2024',
    type: 'Residential',
    image: '/images/projects/marzook/0.png',
    slug: 'marzook-residence',
  },
  {
    id: 10,
    title: 'Edathavalam',
    location: 'Trikaripur, Kasargod',
    year: '2024',
    type: 'Residential',
    image: '/images/projects/edathavalam/1.jpg',
    slug: 'edathavalam',
  },
  {
    id: 11,
    title: 'Shafeer Residence',
    location: 'Vellur',
    year: '2022',
    type: 'Residential',
    image: '/images/projects/shafeer-vellur/4.jpg',
    slug: 'shafeer-vellur',
  },
  // {
  //   id: 1,
  //   title: 'Luxury Residential Complex',
  //   location: 'Mumbai, India',
  //   year: '2024',
  //   type: 'Residential',
  //   image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
  //   slug: 'luxury-residential-complex',
  // },
  {
    id: 2,
    title: 'Modern Office Space',
    location: 'Delhi, India',
    year: '2023',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    slug: 'modern-office-space',
  },
  {
    id: 3,
    title: 'Sustainable Living Hub',
    location: 'Bangalore, India',
    year: '2024',
    type: 'Mixed Use',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    slug: 'sustainable-living-hub',
  },
  {
    id: 4,
    title: 'Boutique Hotel Design',
    location: 'Goa, India',
    year: '2023',
    type: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    slug: 'boutique-hotel-design',
  },
  // {
  //   id: 5,
  //   title: 'Contemporary Villa',
  //   location: 'Pune, India',
  //   year: '2024',
  //   type: 'Residential',
  //   image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
  //   slug: 'contemporary-villa',
  // },
  // {
  //   id: 6,
  //   title: 'Urban Loft Renovation',
  //   location: 'Hyderabad, India',
  //   year: '2023',
  //   type: 'Residential',
  //   image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
  //   slug: 'urban-loft-renovation',
  // },
  {
    id: 7,
    title: 'Corporate Headquarters',
    location: 'Chennai, India',
    year: '2024',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    slug: 'corporate-headquarters',
  },
  {
    id: 8,
    title: 'Eco-Friendly Resort',
    location: 'Kerala, India',
    year: '2023',
    type: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    slug: 'eco-friendly-resort',
  },
  // {
  //   id: 9,
  //   title: 'Minimalist Apartment',
  //   location: 'Mumbai, India',
  //   year: '2024',
  //   type: 'Residential',
  //   image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
  //   slug: 'minimalist-apartment',
  // },
  {
    id: 101,
    title: '3D Exterior Designs',
    location: '',
    year: '',
    type: '3D',
    image: '/images/3d/1.png',
    slug: '3d-elevation-designs',
  },
]

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const [filter, setFilter] = useState<string>('All')

  const categories = ['All', 'Residential', 'Commercial', '3D']
  const projects = projects_list.filter(project => categories.includes(project.type))

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.type === filter)

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-7xl font-bold text-charcoal mb-6"
          >
            Our Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            A curated collection of our architectural and design work
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-sm font-medium transition-all duration-300 ${filter === category
                  ? 'bg-charcoal text-white'
                  : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group cursor-pointer"
              >
                <Link href={`/projects/${project.slug}`}>
                  <div className="relative overflow-hidden bg-charcoal rounded-sm aspect-[4/3] mb-4">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredProject === project.id ? 1 : 0,
                      }}
                      className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent"
                    >
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="text-sm text-muted-gold mb-2 block">{project.type}</span>
                        <h3 className="font-semibold text-xl mb-1">{project.title}</h3>
                        {project.type !== '3D' && (project.location || project.year) && (
                          <p className="text-sm text-gray-300">{project.location} • {project.year}</p>
                        )}
                      </div>
                    </motion.div>
                  </div>
                  <div className="md:hidden">
                    <span className="text-sm text-muted-gold mb-1 block">{project.type}</span>
                    <h3 className="font-semibold text-lg text-charcoal mb-1">{project.title}</h3>
                    {project.type !== '3D' && (project.location || project.year) && (
                      <p className="text-sm text-gray-600">{project.location} • {project.year}</p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}



