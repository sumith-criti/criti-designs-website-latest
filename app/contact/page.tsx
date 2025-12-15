'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Instagram, Facebook, MessageSquare, Youtube } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

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
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Let's discuss your next project and bring your vision to life
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <ContactForm />
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-display text-3xl font-bold text-charcoal mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg text-charcoal mb-2">Studio Address</h3>
                    <p className="text-gray-600">
                      Criti Developers LLP<br />
                      AHAMMED COMPLEX<br />
                      Thayineri Road, Payyanur<br />
                      Kerala 670307, India
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-charcoal mb-2">Phone</h3>
                    <a
                      href="tel:+917306612105"
                      className="text-gray-600 hover:text-muted-gold transition-colors"
                    >
                      +91 73066 12105
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-charcoal mb-2">Business Hours</h3>
                    <p className="text-gray-600">
                      Open · Closes 5 PM
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-charcoal mb-2">Email</h3>
                    <a
                      href="mailto:info@critidesigns.com"
                      className="text-gray-600 hover:text-muted-gold transition-colors"
                    >
                      info@critidesigns.com
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-charcoal mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a
                        href="https://www.instagram.com/critidevelopers/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-gold hover:text-primary transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-6 h-6" strokeWidth={1.5} />
                      </a>
                      <a
                        href="https://www.facebook.com/critidesign"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-gold hover:text-primary transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-6 h-6" strokeWidth={1.5} />
                      </a>
                      <a
                        href="https://wa.me/917306612105"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-gold hover:text-primary transition-colors"
                        aria-label="WhatsApp"
                      >
                        <MessageSquare className="w-6 h-6" strokeWidth={1.5} />
                      </a>
                      <a
                        href="https://www.youtube.com/channel/UCFSPUEHSdpMsEgA7HUaEfaw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-gold hover:text-primary transition-colors"
                        aria-label="YouTube"
                      >
                        <Youtube className="w-6 h-6" strokeWidth={1.5} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-gray-200 rounded-sm overflow-hidden" style={{ height: '400px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.1234567890123!2d75.1994739!3d12.1192767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba46d5dbb74b18d%3A0x2c8a17994fd4748f!2sCRITI!5e0!3m2!1sen!2sin!4v1733034856000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="CRITI - Payyanur Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}



