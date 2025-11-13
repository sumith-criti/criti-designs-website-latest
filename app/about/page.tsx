'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 })

  const teamMembers = [
    {
      name: 'Lead Architect',
      role: 'Principal Designer',
      description: 'With over 15 years of experience in luxury architecture and sustainable design.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      name: 'Senior Designer',
      role: 'Interior Specialist',
      description: 'Expert in creating compact yet luxurious interior spaces that maximize functionality.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
      name: 'Project Manager',
      role: 'Execution Lead',
      description: 'Ensuring seamless execution and timely delivery of all projects.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&h=800&fit=crop"
            alt="Studio"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-charcoal/70"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8"
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light">
            Crafting excellence in every space
          </p>
        </motion.div>
      </section>

      {/* About Content */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              ref={ref1}
              initial={{ opacity: 0, x: -30 }}
              animate={inView1 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
                  alt="Criti Developers LLP"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              ref={ref1}
              initial={{ opacity: 0, x: 30 }}
              animate={inView1 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
                Criti Developers LLP
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We are a forward-thinking architecture and design studio dedicated to creating 
                spaces that seamlessly blend luxury, sustainability, and modern aesthetics. 
                Our approach is rooted in the belief that exceptional design should be both 
                beautiful and purposeful.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Specializing in compact luxury, we excel at maximizing every square foot 
                to create environments that feel spacious, elegant, and functional. Our 
                commitment to sustainable practices ensures that our designs not only serve 
                today's needs but also contribute positively to tomorrow's world.
              </p>
            </motion.div>
          </div>

          {/* Philosophy Section */}
          <motion.div
            ref={ref2}
            initial={{ opacity: 0, y: 30 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 p-12 rounded-sm mb-20"
          >
            <h2 className="font-display text-4xl font-bold text-charcoal mb-8 text-center">
              Our Philosophy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🏛️</div>
                <h3 className="font-semibold text-xl text-charcoal mb-3">Compact Luxury</h3>
                <p className="text-gray-600">
                  Maximizing space efficiency without compromising on elegance and comfort.
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🌱</div>
                <h3 className="font-semibold text-xl text-charcoal mb-3">Sustainability</h3>
                <p className="text-gray-600">
                  Integrating eco-friendly materials and practices into every project.
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="font-semibold text-xl text-charcoal mb-3">Modern Aesthetics</h3>
                <p className="text-gray-600">
                  Embracing contemporary design while respecting timeless principles.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            ref={ref3}
            initial={{ opacity: 0, y: 30 }}
            animate={inView3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-12 text-center">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group text-center"
                >
                  <div className="relative aspect-square rounded-full overflow-hidden mb-6 mx-auto max-w-[250px]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-semibold text-xl text-charcoal mb-2">{member.name}</h3>
                  <p className="text-muted-gold mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}



