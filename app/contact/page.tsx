'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simulate form submission
    // In production, replace this with actual email.js or API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    }, 1500)

    // Example EmailJS integration (uncomment and configure):
    /*
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'YOUR_PUBLIC_KEY'
      )
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
    */
  }

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
              className="bg-white p-8 rounded-sm shadow-sm"
            >
              <h2 className="font-display text-3xl font-bold text-charcoal mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-muted-gold focus:border-transparent transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-muted-gold focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-muted-gold focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-charcoal text-white font-semibold rounded-sm hover:bg-charcoal/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-600 text-sm text-center"
                  >
                    Thank you! Your message has been sent successfully.
                  </motion.p>
                )}
                {submitStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-600 text-sm text-center"
                  >
                    Something went wrong. Please try again.
                  </motion.p>
                )}
              </form>
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
                      Studio Address<br />
                      City, State - ZIP Code<br />
                      India
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-charcoal mb-2">Phone</h3>
                    <a
                      href="tel:+1234567890"
                      className="text-gray-600 hover:text-muted-gold transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
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
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl hover:text-muted-gold transition-colors"
                        aria-label="Instagram"
                      >
                        📷
                      </a>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl hover:text-muted-gold transition-colors"
                        aria-label="Facebook"
                      >
                        📘
                      </a>
                      <a
                        href="https://wa.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl hover:text-muted-gold transition-colors"
                        aria-label="WhatsApp"
                      >
                        💬
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-gray-200 rounded-sm overflow-hidden" style={{ height: '400px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.1234567890123!2d72.8776559!3d19.0759837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjUiTiA3MsKwNTInMzkuNiJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Studio Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}



