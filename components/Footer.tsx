'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com', icon: '📷' },
    { name: 'Facebook', href: 'https://facebook.com', icon: '📘' },
    { name: 'WhatsApp', href: 'https://wa.me/917306612105', icon: '💬' },
  ]

  return (
    <footer className="bg-secondary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <h3 className="font-heading text-2xl font-bold mb-4 text-primary">
              Criti Designs
            </h3>
            <p className="text-gray-400 mb-4 font-body">
              We don&apos;t just construct buildings — we design experiences that shape how you live, move, and feel.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-2xl hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Criti Designs</li>
              <li>Kerala, India</li>
              <li className="pt-2">
                <a href="tel:+917306612105" className="hover:text-primary transition-colors">
                  +91 73066 12105
                </a>
              </li>
              <li>
                <a href="mailto:info@critidesigns.com" className="hover:text-primary transition-colors">
                  info@critidesigns.com
                </a>
              </li>
              <li>
                <a href="https://www.critidesigns.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  www.critidesigns.com
                </a>
              </li>
              <li className="text-gray-400">
                Kerala, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Criti Designs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}



