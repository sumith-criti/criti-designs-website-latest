'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

interface ContactFormProps {
  className?: string
  showTitle?: boolean
  compact?: boolean
}

export default function ContactForm({ className = '', showTitle = true, compact = false }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    requirement: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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

    // Track form submission
    trackEvent('contact_form_submitted', {
      form_location: 'contact_form',
      requirement: formData.requirement,
    })

    // Simulate form submission
    // In production, replace this with actual API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', phone: '', requirement: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    }, 1500)
  }

  return (
    <div className={className}>
      {showTitle && (
        <h3 className="text-2xl font-semibold text-secondary mb-6 font-heading">
          Get Free Consultation
        </h3>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-secondary mb-2">
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="+91 98765 43210"
          />
        </div>
        <div>
          <label htmlFor="requirement" className="block text-sm font-medium text-secondary mb-2">
            Requirement *
          </label>
          <textarea
            id="requirement"
            name="requirement"
            value={formData.requirement}
            onChange={handleChange}
            required
            rows={compact ? 3 : 4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
            placeholder="Tell us about your project..."
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-primary text-white font-heading font-bold rounded-lg hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 text-green-600 text-sm font-medium"
          >
            <CheckCircle className="w-5 h-5" strokeWidth={2} />
            <span>Thank you! We'll contact you shortly.</span>
          </motion.div>
        )}
        {submitStatus === 'error' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-600 text-sm text-center font-medium"
          >
            Something went wrong. Please try again.
          </motion.p>
        )}
      </form>
    </div>
  )
}

