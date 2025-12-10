'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { DraftingCompass, Sparkles, Building2 } from 'lucide-react'
import Link from 'next/link'

export default function Services() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 })

  const services = [
    {
      icon: <DraftingCompass className="w-12 h-12" strokeWidth={1.5} />,
      title: 'Architecture & Design',
      description: 'From initial concept to detailed architectural drawings, we create spaces that blend form and function. Our design process emphasizes sustainable practices, optimal space utilization, and aesthetic excellence.',
      features: [
        'Conceptual Design & Planning',
        'Architectural Drawings & Documentation',
        '3D Visualization & Renderings',
        'Sustainable Design Solutions',
        'Space Optimization',
      ],
    },
    {
      icon: <Sparkles className="w-12 h-12" strokeWidth={1.5} />,
      title: 'Interior Execution',
      description: 'Transforming architectural visions into lived-in spaces. We handle every aspect of interior execution, from material selection to final installation, ensuring impeccable quality and attention to detail.',
      features: [
        'Interior Design & Styling',
        'Material Selection & Sourcing',
        'Custom Furniture Design',
        'Lighting & Fixture Installation',
        'Quality Control & Supervision',
      ],
    },
    {
      icon: <Building2 className="w-12 h-12" strokeWidth={1.5} />,
      title: 'Facade & Contracting',
      description: 'Comprehensive contracting services that bring designs to life. Our expertise spans facade design, construction management, and project execution, ensuring timely delivery and exceptional craftsmanship.',
      features: [
        'Facade Design & Engineering',
        'Construction Management',
        'Project Coordination',
        'Quality Assurance',
        'Timeline & Budget Management',
      ],
    },
  ]

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
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Comprehensive architecture and design solutions from concept to completion
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                ref={index === 0 ? ref1 : undefined}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  (index === 0 && inView1) || index > 0
                    ? { opacity: 1, y: 0 }
                    : {}
                }
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-8 rounded-sm shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-6 text-charcoal flex items-center justify-center">
                  {service.icon}
                </div>
                <h2 className="font-display text-3xl font-bold text-charcoal mb-4">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-muted-gold mr-2">•</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            ref={ref2}
            initial={{ opacity: 0, y: 30 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-6">
              Our Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A structured approach ensuring excellence at every stage
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your vision and requirements' },
              { step: '02', title: 'Design', description: 'Creating detailed plans and visualizations' },
              { step: '03', title: 'Execution', description: 'Bringing designs to life with precision' },
              { step: '04', title: 'Delivery', description: 'Final touches and project handover' },
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl font-display font-bold text-muted-gold/20 mb-4">
                  {phase.step}
                </div>
                <h3 className="font-semibold text-xl text-charcoal mb-2">{phase.title}</h3>
                <p className="text-gray-600">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Let's discuss how we can bring your vision to life
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-muted-gold text-charcoal font-semibold rounded-sm hover:bg-gold-accent transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}



