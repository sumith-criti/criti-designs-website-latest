'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { CheckCircle, X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Project } from './data'

export default function ProjectClient({ project }: { project: Project }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const handleNext = () => {
    if (selectedImageIndex === null) return
    setSelectedImageIndex((prev) =>
      prev === project.gallery.length - 1 ? 0 : (prev ?? 0) + 1
    )
  }

  const handlePrev = () => {
    if (selectedImageIndex === null) return
    setSelectedImageIndex((prev) =>
      prev === 0 ? project.gallery.length - 1 : (prev ?? 0) - 1
    )
  }

  useEffect(() => {
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
                {project.type !== '3D' && (project.location || project.year) && (
                  <p className="text-xl text-gray-200">
                    {project.location} • {project.year}
                  </p>
                )}
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