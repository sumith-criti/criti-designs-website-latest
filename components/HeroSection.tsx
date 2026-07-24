'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const heroImages = [
    {
        src: '/images/home/1.webp',
        alt: 'Modern Architecture Design by Criti Developers',
    },
    {
        src: '/images/home/2.webp',
        alt: 'Contemporary Interior Execution by Criti Developers',
    },
    {
        src: '/images/home/3.webp',
        alt: 'Turnkey Luxury Residence Construction',
    },
    {
        src: '/images/home/4.webp',
        alt: 'Architectural Planning & 3D Elevation',
    },
    {
        src: '/images/home/5.webp',
        alt: 'Sustainable Home Building Projects',
    },
]

export default function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    // Auto-rotate slideshow
    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroImages.length)
        }, 5000) // Change slide every 5 seconds

        return () => clearInterval(interval)
    }, [isAutoPlaying])

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
        setIsAutoPlaying(false)
        // Resume auto-play after 10 seconds of inactivity
        setTimeout(() => setIsAutoPlaying(true), 10000)
    }

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 10000)
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % heroImages.length)
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 10000)
    }

    return (
        <section className="relative min-h-screen bg-[#1a1a1a] overflow-hidden">
            {/* Slideshow Container */}
            <div className="absolute inset-0 w-full h-full">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 1.5,
                            ease: 'easeInOut'
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={heroImages[currentIndex].src}
                            alt={heroImages[currentIndex].alt}
                            fill
                            className="object-cover"
                            priority={currentIndex === 0}
                            quality={90}
                            sizes="100vw"
                        />
                        {/* Dark overlay for better text readability */}
                        <div className="absolute inset-0 bg-black/40" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 text-white group-hover:text-white/90" />
            </button>
            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 text-white group-hover:text-white/90" />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {heroImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                ? 'w-8 bg-white'
                                : 'w-2 bg-white/50 hover:bg-white/75'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
                <div className="text-center w-full max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl mb-6"
                    >
                        Design That Feels Like Home
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base md:text-xl lg:text-2xl text-gray-100 font-body leading-relaxed drop-shadow-lg max-w-2xl mx-auto"
                    >
                        Thoughtful architecture, functional interiors and quality construction under one roof
                    </motion.p>
                </div>
            </div>
        </section>
    )
}
