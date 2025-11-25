'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import Testimonials from "@/components/Testimonials"

export default function Home() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    contactSection?.scrollIntoView({ behavior: 'smooth' })
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen">
      {/* 1️⃣ Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&h=1080&fit=crop"
            alt="Modern Architecture"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-secondary/70"></div>
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
          >
            Your Dream Home Begins Here
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-100 mb-8 font-body"
          >
            Architectural + Engineering Design & Build Packages
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            onClick={scrollToContact}
            className="inline-block px-8 py-4 bg-primary text-white font-heading font-bold rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Book Consultation
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, repeat: Infinity, repeatType: 'reverse', duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* 2️⃣ About Section */}
      <SectionWrapper>
        <AnimatedSection>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-8 text-center">
            About Criti Designs
          </h2>
          <p className="text-lg md:text-xl text-secondary/80 leading-relaxed max-w-4xl mx-auto text-center mb-12 font-body">
            We don&apos;t just construct buildings — we design experiences that shape how you live, move, and feel. Our architect-first approach blends creativity with technical precision to make every space feel alive, functional, and emotionally right.
          </p>

          {/* Icon Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
            <AnimatedCard delay={0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                <div className="text-5xl mb-4">🧠</div>
                <h3 className="font-heading text-xl font-bold text-secondary mb-3">
                  Architect-first Planning
                </h3>
                <p className="text-secondary/70 font-body">
                  Every project starts with thoughtful architectural design that puts your lifestyle first.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                <div className="text-5xl mb-4">🏗️</div>
                <h3 className="font-heading text-xl font-bold text-secondary mb-3">
                  Complete Design-to-Build Solutions
                </h3>
                <p className="text-secondary/70 font-body">
                  From concept to completion, we handle every aspect of your project seamlessly.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="font-heading text-xl font-bold text-secondary mb-3">
                  Transparent & Personalized Support
                </h3>
                <p className="text-secondary/70 font-body">
                  Clear communication and dedicated support throughout your journey.
                </p>
              </div>
            </AnimatedCard>
          </div>
        </AnimatedSection>
      </SectionWrapper>

      {/* Quote Section */}
      <section className="py-24 bg-[#FAFAF7]">
        <p className="font-semibold italic text-3xl md:text-4xl text-center text-[#333333] max-w-4xl mx-auto px-4 leading-snug">
          &ldquo;Beautiful homes aren't expensive — badly planned ones are.&rdquo;
        </p>
      </section>

      {/* 4️⃣ Why Choose Us Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-[#333333] mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
              Why Choose Us
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              What makes Criti Designs the most trusted architecture & design partner.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {/* Quality & Craftsmanship */}
            <AnimatedCard delay={0.1}>
              <div className="bg-white rounded-xl shadow-md p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full">
                <div className="mb-6">
                  <svg
                    className="w-12 h-12 text-[#A4C37D]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#333333] mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  Quality & Craftsmanship
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  We deliver thoughtful, high-quality design solutions with precision and attention to detail.
                </p>
              </div>
            </AnimatedCard>

            {/* Budget Transparency */}
            <AnimatedCard delay={0.2}>
              <div className="bg-white rounded-xl shadow-md p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full">
                <div className="mb-6">
                  <svg
                    className="w-12 h-12 text-[#A4C37D]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#333333] mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  Budget Transparency
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  No hidden costs. We plan every project with clarity and predictable outcomes.
                </p>
              </div>
            </AnimatedCard>

            {/* Sustainable Design */}
            <AnimatedCard delay={0.3}>
              <div className="bg-white rounded-xl shadow-md p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full">
                <div className="mb-6">
                  <svg
                    className="w-12 h-12 text-[#A4C37D]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#333333] mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  Sustainable Design
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  Eco-friendly materials and energy-efficient concepts integrated into every project.
                </p>
              </div>
            </AnimatedCard>

            {/* Smart Space Planning */}
            <AnimatedCard delay={0.4}>
              <div className="bg-white rounded-xl shadow-md p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 h-full">
                <div className="mb-6">
                  <svg
                    className="w-12 h-12 text-[#A4C37D]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#333333] mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  Smart Space Planning
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  Compact, functional, and elegant floor plans optimized for modern living.
                </p>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* 5️⃣ Client Testimonials Section */}
      <Testimonials />

      {/* 6️⃣ Contact / CTA Section */}
      <SectionWrapper id="contact" className="bg-secondary text-white">
        <AnimatedSection>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">
            Let&apos;s Bring Your Vision to Life
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 text-center font-body max-w-3xl mx-auto">
            Book a design consultation — online, at our office, or directly at your site.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto mb-12">
            <ContactInfo
              icon="📞"
              label="Phone"
              value="+91 73066 12105"
              href="tel:+917306612105"
              delay={0.1}
            />
            <ContactInfo
              icon="📧"
              label="Email"
              value="info@critidesigns.com"
              href="mailto:info@critidesigns.com"
              delay={0.2}
            />
            <ContactInfo
              icon="🌐"
              label="Website"
              value="www.critidesigns.com"
              href="https://www.critidesigns.com"
              delay={0.3}
            />
            <ContactInfo
              icon="📍"
              label="Location"
              value="Kerala, India"
              delay={0.4}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <a
              href="https://wa.me/917306612105"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-primary text-white font-heading font-bold rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Book Consultation
            </a>
          </motion.div>

          {/* Optional: Map placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="relative h-64 md:h-96 bg-gray-300">
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&h=600&fit=crop"
                alt="Kerala, India"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </AnimatedSection>
      </SectionWrapper>

      {/* 7️⃣ Final CTA Section */}
      <section className="bg-[#A4C37D] py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
              Ready to Build Your Dream Space?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              Let&apos;s design something beautiful, functional, and sustainable—together.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a
                href="#contact"
                className="inline-block bg-white text-[#333333] font-semibold px-8 py-4 rounded-full shadow-md hover:bg-[#FAFAF7] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                Get a Free Consultation
              </a>
            </motion.div>

            <p className="mt-6 text-white/80 text-sm md:text-base" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
              Or contact us directly at{' '}
              <a
                href="mailto:info@critidesigns.com"
                className="text-white underline hover:text-white/90 transition-colors"
              >
                info@critidesigns.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// Reusable Components
function SectionWrapper({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) {
  return (
    <section className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${className}`} id={id}>
      {children}
    </section>
  )
}

function AnimatedSection({ children }: { children: React.ReactNode }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className="max-w-7xl mx-auto"
    >
      {children}
    </motion.div>
  )
}

function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

function ContactInfo({ icon, label, value, href, delay }: { icon: string, label: string, value: string, href?: string, delay: number }) {
  const content = (
    <div className="text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-sm text-gray-300 mb-1 font-body">{label}</div>
      <div className="text-lg font-heading font-bold">{value}</div>
    </div>
  )

  if (href) {
    return (
      <AnimatedCard delay={delay}>
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : '_self'}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="block bg-white/10 p-6 rounded-2xl hover:bg-white/20 transition-all duration-300"
        >
          {content}
        </a>
      </AnimatedCard>
    )
  }

  return (
    <AnimatedCard delay={delay}>
      <div className="bg-white/10 p-6 rounded-2xl">
        {content}
      </div>
    </AnimatedCard>
  )
}
