'use client'

import { motion } from "framer-motion"
import Image from "next/image"
import { useInView } from "react-intersection-observer"

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

      {/* 3️⃣ Why Design Matters Section */}
      <SectionWrapper className="bg-white">
        <AnimatedSection>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-12 text-center">
            Why Design Matters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* House A */}
            <AnimatedCard delay={0.1}>
              <div className="bg-red-50 border-2 border-red-200 p-8 rounded-2xl shadow-md">
                <h3 className="font-heading text-2xl font-bold text-red-700 mb-6">
                  House A: Designed by Room Count
                </h3>
                <ul className="space-y-3 text-secondary/80 font-body">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">×</span>
                    <span>Feels hot and stuffy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">×</span>
                    <span>Wasted space</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">×</span>
                    <span>Lacks family connection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">×</span>
                    <span>Poor natural lighting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">×</span>
                    <span>Inadequate ventilation</span>
                  </li>
                </ul>
              </div>
            </AnimatedCard>

            {/* House B */}
            <AnimatedCard delay={0.2}>
              <div className="bg-green-50 border-2 border-primary p-8 rounded-2xl shadow-md">
                <h3 className="font-heading text-2xl font-bold text-primary mb-6">
                  House B: Designed for Life
                </h3>
                <ul className="space-y-3 text-secondary/80 font-body">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Bright and well-ventilated</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Efficient use of space</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Creates family connection</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Optimized natural lighting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Future-ready design</span>
                  </li>
                </ul>
              </div>
            </AnimatedCard>
          </div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-2xl md:text-3xl font-heading font-bold text-secondary italic max-w-4xl mx-auto">
              &ldquo;Beautiful homes aren&apos;t expensive — badly planned ones are.&rdquo;
            </p>
          </motion.div>
        </AnimatedSection>
      </SectionWrapper>

      {/* 4️⃣ Design Packages Section */}
      <SectionWrapper>
        <AnimatedSection>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-12 text-center">
            Design Packages
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            <PackageCard
              title="Concept Design Package"
              description="Floor plan, furniture layout, and 3D exterior."
              price="₹20–₹25/sqft"
              delay={0.1}
            />
            <PackageCard
              title="Comprehensive Architectural Package"
              description="Permits, interiors, working drawings, 10 guided visits."
              price="₹150/sqft"
              delay={0.2}
            />
            <PackageCard
              title="Full Engineering Package"
              description="Structural, MEP, elevation working drawings."
              price="₹100/sqft"
              delay={0.3}
            />
            <PackageCard
              title="Basic Engineering Package"
              description="Essential working drawings."
              price="₹50/sqft"
              delay={0.4}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-center text-secondary/70 font-body max-w-3xl mx-auto"
          >
            <strong>Note:</strong> All design fees are adjusted if you move to Build or Turnkey packages.
          </motion.p>
        </AnimatedSection>
      </SectionWrapper>

      {/* 5️⃣ Build & Turnkey Section */}
      <SectionWrapper className="bg-white">
        <AnimatedSection>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-12 text-center">
            Build & Turnkey Packages
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            <BuildCard
              title="Construction Package"
              description="Architectural, engineering, and management services"
              price="₹1900–₹3000/sqft"
              image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
              delay={0.1}
            />
            <BuildCard
              title="Turnkey Package"
              description="End-to-end design, interiors, and handover"
              price="₹1900–₹3000/sqft"
              image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
              delay={0.2}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center text-xl md:text-2xl font-heading font-bold text-secondary max-w-4xl mx-auto"
          >
            No surprises. No overruns. Every detail aligned to your lifestyle.
          </motion.p>
        </AnimatedSection>
      </SectionWrapper>

      {/* 6️⃣ Add-ons Section */}
      <SectionWrapper>
        <AnimatedSection>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mb-12 text-center">
            Add-on Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <AddonCard
              title="3D Exterior Elevation"
              price="₹3/sqft"
              delay={0.1}
            />
            <AddonCard
              title="Interior Design"
              price="₹30/sqft"
              delay={0.2}
            />
            <AddonCard
              title="Permit Support"
              price="₹10/sqft"
              delay={0.3}
            />
            <AddonCard
              title="Completion Docs"
              price="₹5/sqft"
              delay={0.4}
            />
            <AddonCard
              title="Site Visits"
              price="₹2,500–₹7,500"
              delay={0.5}
              fullWidth
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-center text-secondary/70 font-body max-w-3xl mx-auto"
          >
            Visits can be pre-scheduled based on project stage.
          </motion.p>
        </AnimatedSection>
      </SectionWrapper>

      {/* 7️⃣ Contact / CTA Section */}
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

function PackageCard({ title, description, price, delay }: { title: string, description: string, price: string, delay: number }) {
  return (
    <AnimatedCard delay={delay}>
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
        <h3 className="font-heading text-xl font-bold text-secondary mb-4">
          {title}
        </h3>
        <p className="text-secondary/70 font-body mb-6 flex-grow">
          {description}
        </p>
        <p className="text-2xl font-heading font-bold text-primary">
          {price}
        </p>
      </div>
    </AnimatedCard>
  )
}

function BuildCard({ title, description, price, image, delay }: { title: string, description: string, price: string, image: string, delay: number }) {
  return (
    <AnimatedCard delay={delay}>
      <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
        <div className="relative h-64 md:h-80">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-2">
              {title}
            </h3>
            <p className="text-gray-200 mb-4 font-body">
              {description}
            </p>
            <p className="text-2xl md:text-3xl font-heading font-bold text-primary">
              {price}
            </p>
          </div>
        </div>
      </div>
    </AnimatedCard>
  )
}

function AddonCard({ title, price, delay, fullWidth = false }: { title: string, price: string, delay: number, fullWidth?: boolean }) {
  return (
    <AnimatedCard delay={delay}>
      <div className={`bg-white p-6 md:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 ${fullWidth ? 'md:col-span-2 lg:col-span-2 lg:col-start-2' : ''}`}>
        <h3 className="font-heading text-xl font-bold text-secondary mb-3">
          {title}
        </h3>
        <p className="text-2xl font-heading font-bold text-primary">
          {price}
        </p>
      </div>
    </AnimatedCard>
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
