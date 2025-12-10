'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { DraftingCompass, Building, MessageSquare, Phone, Mail, MapPin, CheckCircle, BadgeCheck, FileCheck, Leaf, Ruler } from "lucide-react"
import Testimonials from "@/components/Testimonials"
import TrustBadges from "@/components/TrustBadges"
import ContactForm from "@/components/ContactForm"

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
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            House Construction, Interiors & Architectural Design in Kannur
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-100 mb-8 font-body max-w-3xl mx-auto"
          >
            Complete turnkey construction, interior design, renovation, and architectural services. Serving Kannur, Payyannur, Taliparamba & surrounding areas with 10+ years of experience.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            onClick={scrollToContact}
            className="inline-block px-8 py-4 bg-primary text-white font-heading font-bold rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Free Consultation
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

      {/* Trust Badges Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <TrustBadges />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-12 text-[#333333] font-heading">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 group">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
                  alt="Modern Residential Project"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary mb-2 font-heading">Modern Residential</h3>
                <p className="text-gray-600 font-body">Payyanur, Kerala</p>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 group">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
                  alt="Sustainable Home Design"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary mb-2 font-heading">Sustainable Design</h3>
                <p className="text-gray-600 font-body">Green Building Project</p>
              </div>
            </motion.div>

            {/* Project 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64 group">
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop"
                  alt="Luxury Architecture"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary mb-2 font-heading">Luxury Residence</h3>
                <p className="text-gray-600 font-body">Contemporary Design</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mt-12"
          >
            <a
              href="/projects"
              className="px-8 py-4 bg-[#A4C37D] text-white font-medium rounded-full hover:bg-[#7A9C5B] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              See More
            </a>
          </motion.div>
        </div>
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
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center flex flex-col items-center">
                <div className="mb-4 text-secondary flex items-center justify-center">
                  <DraftingCompass className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl font-bold text-secondary mb-3">
                  Architect-first Planning
                </h3>
                <p className="text-secondary/70 font-body">
                  Every project starts with thoughtful architectural design that puts your lifestyle first.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center flex flex-col items-center">
                <div className="mb-4 text-secondary flex items-center justify-center">
                  <Building className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-xl font-bold text-secondary mb-3">
                  Complete Design-to-Build Solutions
                </h3>
                <p className="text-secondary/70 font-body">
                  From concept to completion, we handle every aspect of your project seamlessly.
                </p>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.3}>
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center flex flex-col items-center">
                <div className="mb-4 text-secondary flex items-center justify-center">
                  <MessageSquare className="w-10 h-10" strokeWidth={1.5} />
                </div>
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
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-body">
              What makes Criti Designs the most trusted architecture & design partner.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <FeatureCard
              icon={<BadgeCheck className="w-8 h-8" strokeWidth={1.5} />}
              title="Quality & Craftsmanship"
              description="We deliver thoughtful, high-quality design solutions with precision and attention to detail."
              delay={0.1}
            />
            <FeatureCard
              icon={<FileCheck className="w-8 h-8" strokeWidth={1.5} />}
              title="Budget Transparency"
              description="No hidden costs. We plan every project with clarity and predictable outcomes."
              delay={0.2}
            />
            <FeatureCard
              icon={<Leaf className="w-8 h-8" strokeWidth={1.5} />}
              title="Sustainable Design"
              description="Eco-friendly materials and energy-efficient concepts integrated into every project."
              delay={0.3}
            />
            <FeatureCard
              icon={<Ruler className="w-8 h-8" strokeWidth={1.5} />}
              title="Smart Space Planning"
              description="Compact, functional, and elegant floor plans optimized for modern living."
              delay={0.4}
            />
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
            Get a free consultation for your construction, interior design, or architectural project in Kannur.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="font-heading text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <ContactInfo
                  icon={<Phone className="w-8 h-8" strokeWidth={1.5} />}
                  label="Phone"
                  value="+91 73066 12105"
                  href="tel:+917306612105"
                  delay={0.1}
                />
                <ContactInfo
                  icon={<MessageSquare className="w-8 h-8" strokeWidth={1.5} />}
                  label="WhatsApp"
                  value="Chat Now"
                  href="https://wa.me/917306612105"
                  delay={0.2}
                />
                <ContactInfo
                  icon={<Mail className="w-8 h-8" strokeWidth={1.5} />}
                  label="Email"
                  value="info@critidesigns.com"
                  href="mailto:info@critidesigns.com"
                  delay={0.3}
                />
                <ContactInfo
                  icon={<MapPin className="w-8 h-8" strokeWidth={1.5} />}
                  label="Location"
                  value="Payyanur, Kerala"
                  href="https://www.google.com/maps/place/CRITI/@12.1192767,75.1994739,16z/data=!3m1!4b1!4m6!3m5!1s0x3ba46d5dbb74b18d:0x2c8a17994fd4748f!8m2!3d12.1192767!4d75.1994739!16s%2Fg%2F11f7qyw08p?entry=ttu"
                  delay={0.4}
                />
              </div>
            </div>
            <div className="bg-white/10 p-8 rounded-xl">
              <ContactForm showTitle={true} />
            </div>
          </div>

          {/* Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="relative h-64 md:h-96 bg-gray-300">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.1234567890123!2d75.1994739!3d12.1192767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba46d5dbb74b18d%3A0x2c8a17994fd4748f!2sCRITI!5e0!3m2!1sen!2sin!4v1733034856000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CRITI - Payyanur Location"
                className="w-full h-full"
              ></iframe>
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

// Feature Card Component
function FeatureCard({ 
  icon, 
  title, 
  description, 
  delay 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}) {
  return (
    <AnimatedCard delay={delay}>
      <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 mb-6">
          <div className="text-primary">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-bold text-secondary mb-4 font-heading">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed font-body flex-grow">
          {description}
        </p>
      </div>
    </AnimatedCard>
  )
}

function ContactInfo({ icon, label, value, href, delay }: { icon: React.ReactNode, label: string, value: string, href?: string, delay: number }) {
  const content = (
    <div className="text-center flex flex-col items-center">
      <div className="mb-3 text-white flex items-center justify-center">
        {icon}
      </div>
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
