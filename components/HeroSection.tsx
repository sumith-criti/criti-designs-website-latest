'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

const heroImages = [
    {
        src: '/images/home/1.webp',
        alt: 'Modern Architecture Design by Criti Developers',
        title: 'Architectural Excellence',
    },
    {
        src: '/images/home/2.webp',
        alt: 'Contemporary Interior Execution by Criti Developers',
        title: 'Bespoke Interiors',
    },
    {
        src: '/images/home/3.webp',
        alt: 'Turnkey Luxury Residence Construction',
        title: 'Turnkey Construction',
    },
    {
        src: '/images/home/4.webp',
        alt: 'Architectural Planning & 3D Elevation',
        title: '3D Elevation & Planning',
    },
    {
        src: '/images/home/5.webp',
        alt: 'Sustainable Home Building Projects',
        title: 'Sustainable Living',
    },
]

const SLIDE_DURATION_MS = 6000
const CROSSFADE_DURATION_MS = 1000

export default function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [previousIndex, setPreviousIndex] = useState<number | null>(null)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
    const [secondaryImagesLoaded, setSecondaryImagesLoaded] = useState(false)
    
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const autoPlayResumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const transitionCleanupTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Touch gesture state
    const touchStartX = useRef<number | null>(null)
    const touchEndX = useRef<number | null>(null)

    // Detect prefers-reduced-motion
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)
        const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    // Defer loading of non-LCP hero images until after initial render completes (PageSpeed LCP Optimization)
    useEffect(() => {
        const preloadTimer = setTimeout(() => {
            setSecondaryImagesLoaded(true)
        }, 2500)
        return () => clearTimeout(preloadTimer)
    }, [])

    const changeSlide = useCallback((newIndex: number) => {
        // Ensure secondary images are loaded when slide changes
        setSecondaryImagesLoaded(true)

        setCurrentIndex((prevCurrent) => {
            if (newIndex === prevCurrent) return prevCurrent
            setPreviousIndex(prevCurrent)

            if (transitionCleanupTimeoutRef.current) {
                clearTimeout(transitionCleanupTimeoutRef.current)
            }

            transitionCleanupTimeoutRef.current = setTimeout(() => {
                setPreviousIndex(null)
            }, CROSSFADE_DURATION_MS + 100)

            return newIndex
        })
    }, [])

    const goToNext = useCallback(() => {
        changeSlide((currentIndex + 1) % heroImages.length)
    }, [currentIndex, changeSlide])

    const goToPrevious = useCallback(() => {
        changeSlide((currentIndex - 1 + heroImages.length) % heroImages.length)
    }, [currentIndex, changeSlide])

    const goToSlide = (index: number) => {
        changeSlide(index)
        pauseAutoPlayTemporarily()
    }

    const pauseAutoPlayTemporarily = () => {
        setIsAutoPlaying(false)
        if (autoPlayResumeTimeoutRef.current) clearTimeout(autoPlayResumeTimeoutRef.current)
        autoPlayResumeTimeoutRef.current = setTimeout(() => {
            setIsAutoPlaying(true)
        }, 10000)
    }

    const handlePrevClick = () => {
        goToPrevious()
        pauseAutoPlayTemporarily()
    }

    const handleNextClick = () => {
        goToNext()
        pauseAutoPlayTemporarily()
    }

    // Auto-rotate slideshow
    useEffect(() => {
        if (!isAutoPlaying) {
            if (timerRef.current) clearInterval(timerRef.current)
            return
        }

        timerRef.current = setInterval(() => {
            goToNext()
        }, SLIDE_DURATION_MS)

        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [isAutoPlaying, goToNext])

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
            if (autoPlayResumeTimeoutRef.current) clearTimeout(autoPlayResumeTimeoutRef.current)
            if (transitionCleanupTimeoutRef.current) clearTimeout(transitionCleanupTimeoutRef.current)
        }
    }, [])

    // Touch Swipe Navigation for Mobile Devices
    const handleTouchStart = (e: React.TouchEvent) => {
        touchEndX.current = null
        touchStartX.current = e.targetTouches[0].clientX
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX
    }

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return
        const distance = touchStartX.current - touchEndX.current
        const minSwipeDistance = 40

        if (distance > minSwipeDistance) {
            handleNextClick()
        } else if (distance < -minSwipeDistance) {
            handlePrevClick()
        }

        touchStartX.current = null
        touchEndX.current = null
    }

    return (
        <section
            className="relative min-h-screen bg-[#141414] overflow-hidden select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Slide Progress Bar */}
            <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-white/10">
                {isAutoPlaying && (
                    <motion.div
                        key={currentIndex}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{
                            duration: SLIDE_DURATION_MS / 1000,
                            ease: 'linear',
                        }}
                        className="h-full bg-[#8AA46A]"
                    />
                )}
            </div>

            {/* Solid Layered Slideshow: Layered Underlay Prevents Any Black Bleed-Through During Crossfades */}
            <div className="absolute inset-0 w-full h-full bg-[#141414]">
                {heroImages.map((img, index) => {
                    const isActive = index === currentIndex
                    const isPrevious = index === previousIndex
                    const shouldRender = index === 0 || isActive || isPrevious || secondaryImagesLoaded

                    let opacity = 0
                    let zIndex = 0

                    if (isActive) {
                        opacity = 1
                        zIndex = 20
                    } else if (isPrevious) {
                        opacity = 1
                        zIndex = 10
                    }

                    if (!shouldRender) return null

                    return (
                        <div
                            key={img.src}
                            className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out will-change-[opacity]"
                            style={{
                                opacity,
                                zIndex,
                                pointerEvents: isActive ? 'auto' : 'none',
                            }}
                        >
                            <motion.div
                                className="relative w-full h-full will-change-transform transform-gpu"
                                initial={false}
                                animate={
                                    isActive && !prefersReducedMotion
                                        ? { scale: [1, 1.08] }
                                        : { scale: 1 }
                                }
                                transition={{
                                    duration: SLIDE_DURATION_MS / 1000 + 1,
                                    ease: 'easeOut',
                                }}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover object-center"
                                    priority={index === 0}
                                    fetchPriority={index === 0 ? 'high' : 'low'}
                                    quality={80}
                                    sizes="(max-width: 768px) 100vw, 100vw"
                                    decoding={index === 0 ? 'sync' : 'async'}
                                />
                            </motion.div>
                            {/* Layered Gradient Overlays for Maximum Text Contrast & Aesthetic Depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/40" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20" />
                        </div>
                    )
                })}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={handlePrevClick}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full bg-black/20 hover:bg-black/40 active:scale-95 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-all duration-300 shadow-xl group cursor-pointer"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button
                onClick={handleNextClick}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full bg-black/20 hover:bg-black/40 active:scale-95 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition-all duration-300 shadow-xl group cursor-pointer"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Bottom Slide Indicators */}
            <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 md:gap-3 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                {heroImages.map((img, index) => {
                    const isActive = index === currentIndex
                    return (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`relative h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                                isActive
                                    ? 'w-8 md:w-10 bg-[#8AA46A]'
                                    : 'w-2.5 bg-white/40 hover:bg-white/70'
                            }`}
                            aria-label={`Go to slide ${index + 1}: ${img.title}`}
                            title={img.title}
                        />
                    )
                })}
            </div>

            {/* Hero Text Content */}
            <div className="relative z-25 flex flex-col items-center justify-center min-h-screen px-6 pt-16">
                <div className="text-center w-full max-w-4xl mx-auto space-y-6">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="inline-block"
                    >
                        <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs md:text-sm font-medium text-white/90 uppercase tracking-widest">
                            {heroImages[currentIndex].title}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] drop-shadow-2xl tracking-tight"
                    >
                        Design That Feels Like Home
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-lg sm:text-xl lg:text-2xl text-gray-200 font-body leading-relaxed drop-shadow-md max-w-2xl mx-auto font-light"
                    >
                        Thoughtful architecture, functional interiors and quality construction under one roof
                    </motion.p>
                </div>
            </div>
        </section>
    )
}
