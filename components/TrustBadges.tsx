'use client'

import { motion } from 'framer-motion'
import { Award, Building2, Users, CheckCircle } from 'lucide-react'

interface Badge {
  icon: React.ReactNode
  label: string
  value: string
}

const badges: Badge[] = [
  {
    icon: <Award className="w-10 h-10" strokeWidth={1.5} />,
    label: 'Years of Experience',
    value: '10+',
  },
  {
    icon: <Building2 className="w-10 h-10" strokeWidth={1.5} />,
    label: 'Projects Completed',
    value: '50+',
  },
  {
    icon: <Users className="w-10 h-10" strokeWidth={1.5} />,
    label: 'In-house Architects',
    value: 'Expert Team',
  },
  {
    icon: <CheckCircle className="w-10 h-10" strokeWidth={1.5} />,
    label: 'Turnkey Execution',
    value: 'End-to-End',
  },
]

export default function TrustBadges({ className = '' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 ${className}`}>
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center"
        >
          <div className="mb-4 text-secondary flex items-center justify-center">
            {badge.icon}
          </div>
          <div className="text-2xl md:text-3xl font-bold text-secondary mb-2 font-heading">
            {badge.value}
          </div>
          <div className="text-sm text-gray-600 font-body leading-relaxed">
            {badge.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

