'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle, Phone, MessageSquare } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import TrustBadges from '@/components/TrustBadges'
import { trackPageView } from '@/lib/analytics'
import { useEffect } from 'react'

interface ServicePageProps {
  title: string
  subtitle: string
  description: string
  heroImage: string
  serviceFeatures: string[]
  processSteps: Array<{ title: string; description: string }>
  projectImages: string[]
  metaTitle: string
  metaDescription: string
}

export default function ServicePageTemplate({
  title,
  subtitle,
  description,
  heroImage,
  serviceFeatures,
  processSteps,
  projectImages,
  metaTitle,
  metaDescription,
}: ServicePageProps) {
  useEffect(() => {
    trackPageView(title, {
      service_type: title.toLowerCase().replace(/\s+/g, '_'),
    })
  }, [title])

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/917306612105', '_blank')
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-secondary/75"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-white"
        >
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 font-body">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleWhatsAppClick}
              className="px-8 py-4 bg-primary text-white font-heading font-bold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg"
            >
              Chat on WhatsApp
            </button>
            <a
              href="#contact-form"
              className="px-8 py-4 bg-white text-secondary font-heading font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              Get Free Consultation
            </a>
          </div>
        </motion.div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <TrustBadges />
        </div>
      </section>

      {/* Service Description */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-6">
              {title} in Kannur
            </h2>
            <p className="text-lg text-secondary/80 leading-relaxed font-body">
              {description}
            </p>
            <p className="text-lg text-secondary/80 leading-relaxed font-body mt-4">
              <strong>Serving:</strong> Kannur, Payyannur, Taliparamba & surrounding areas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-start gap-3"
              >
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-secondary font-body">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  {index + 1}
                </div>
                <h3 className="font-heading text-xl font-bold text-secondary mb-3">
                  {step.title}
                </h3>
                <p className="text-secondary/70 font-body text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      {projectImages.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">
              Our Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative h-64 rounded-xl overflow-hidden shadow-lg group"
                >
                  <Image
                    src={image}
                    alt={`${title} Project ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section with Form */}
      <section id="contact-form" className="py-16 md:py-24 bg-secondary text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-gray-200 mb-8 font-body">
                Get a free consultation and quote for your {title.toLowerCase()} project in Kannur.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="mr-4 text-white">
                    <Phone className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300">Phone</div>
                    <a href="tel:+917306612105" className="text-lg font-bold hover:text-primary transition-colors">
                      +91 73066 12105
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 text-white">
                    <MessageSquare className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-300">WhatsApp</div>
                    <a
                      href="https://wa.me/917306612105"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold hover:text-primary transition-colors"
                    >
                      Chat Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 p-8 rounded-xl">
              <ContactForm showTitle={false} compact />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

