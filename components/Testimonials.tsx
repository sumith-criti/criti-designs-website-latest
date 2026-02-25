'use client'

import { useState, useEffect } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Testimonial {
  name: string
  location: string
  type: string
  text: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Abdul Azeez',
    location: 'Pallikkara',
    type: 'Residential Client',
    text: 'Thank you for building our beautiful home. We look forward to creating many wonderful memories here. Truly grateful once again.'
  },
  {
    name: 'Shamz KV',
    location: 'Pilathara',
    type: 'Residential Client',
    text: 'I’m extremely impressed with the quality of work and service. I will gladly recommend your team to anyone looking for reliable professionals.'
  },
  {
    name: 'Professor',
    location: 'Cherthala',
    type: 'Residential Client',
    text: 'Everyone who visited loved the house and said it feels like a resort. They appreciated the unique design and thoughtful planning. Many guests who came for the pooja even recorded videos of the home. Thank you so much.'
  },
  {
    name: 'Sameer',
    location: 'Trikaripur',
    type: 'Residential Client',
    text: 'Despite the limited space, all our requirements were incorporated beautifully through smart planning. We loved the design from the very first look'
  },
  {
    name: 'Abdul Wajid',
    location: 'Kavvayi',
    type: 'Residential Client',
    text: 'We are very satisfied with the structural planning and execution. The design was explained clearly, and our requirements were carefully considered. The structure feels safe, practical, and well engineered.'
  },
  {
    name: 'Nizam',
    location: 'Trikaripur',
    type: 'Residential Client',
    text: 'We wanted an eco-friendly, sustainable home, and our vision was fully supported by the team. Their young and dedicated architects and engineers guided us throughout the process, and the house was completed within 7 months. We especially valued the open discussions at every stage and the fact that the project stayed within our planned budget. Thank you for the excellent support.'
  },
  {
    name: 'Niyaz',
    location: 'Trikaripur',
    type: 'Residential Client',
    text: 'Before building our home, we explored many design options. With limited space, our goal was maximum utilization, which initially seemed challenging. The final design perfectly matched our needs and truly brought our dream home to life. The look and feel are unique, and every corner has its own character. Thank you for everything.'
  }
]

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [paused, setPaused] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    loop: true,
    mode: 'free-snap',
    slides: {
      perView: 1,
      spacing: 16
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: {
          perView: 2,
          spacing: 24
        }
      },
      '(min-width: 1024px)': {
        slides: {
          perView: 3,
          spacing: 24
        }
      }
    }
  })

  // Autoplay functionality
  useEffect(() => {
    if (!instanceRef.current || paused) return

    const interval = setInterval(() => {
      instanceRef.current?.next()
    }, 5000)

    return () => clearInterval(interval)
  }, [instanceRef, paused])

  const StarRating = () => (
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-[#A4C37D]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )

  return (
    <section className="bg-[#FAFAF7] py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#333333] mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              Hear from homeowners and businesses who trusted Criti Designs with their dream spaces.
            </p>
          </div>

          {/* Carousel Container */}
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Slider */}
            <div ref={sliderRef} className="keen-slider">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="keen-slider__slide">
                  <div className="rounded-xl bg-white shadow-lg p-8 h-full flex flex-col hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                    {/* Avatar and Name */}
                    <div className="flex items-center mb-6">
                      <div className="h-12 w-12 rounded-full bg-[#E3F0D3] flex items-center justify-center flex-shrink-0 mr-4">
                        <span className="text-lg font-semibold text-[#7A9C5B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#333333] mb-1" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                          {testimonial.location} – {testimonial.type}
                        </p>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <StarRating />

                    {/* Testimonial Text */}
                    <p className="text-[#333333] leading-relaxed flex-grow" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {loaded && instanceRef.current && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    instanceRef.current?.prev()
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-[#A4C37D] hover:text-white transition-colors duration-300 group"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6 text-[#A4C37D] group-hover:text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    instanceRef.current?.next()
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-[#A4C37D] hover:text-white transition-colors duration-300 group"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6 text-[#A4C37D] group-hover:text-white" />
                </button>
              </>
            )}
          </div>

          {/* Dot Indicators */}
          {loaded && instanceRef.current && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {testimonials.map((_, idx) => {
                const isActive = currentSlide === idx
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(idx)
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-[#A4C37D] w-8'
                        : 'bg-gray-300 hover:bg-gray-400 w-2'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                )
              })}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

