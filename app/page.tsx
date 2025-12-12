'use client'

import React from 'react'
import Image from "next/image"
import { DraftingCompass, Building, MessageSquare, Phone, Mail, MapPin, BadgeCheck, FileCheck, Leaf, Ruler } from "lucide-react"
import Testimonials from "@/components/Testimonials"
import TrustBadges from "@/components/TrustBadges"
import ContactForm from "@/components/ContactForm"

import HeroSection from "@/components/HeroSection"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 1️⃣ Hero Section */}
      <HeroSection />

      {/* Trust Badges Section */}
      <section className="py-12 bg-white relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <TrustBadges />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-background relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-16 text-[#333333] font-heading">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <ProjectCard
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
              title="Modern Residential"
              location="Payyanur, Kerala"
            />
            {/* Project 2 */}
            <ProjectCard
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
              title="Sustainable Design"
              location="Green Building Project"
            />
            {/* Project 3 */}
            <ProjectCard
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop"
              title="Luxury Residence"
              location="Contemporary Design"
            />
          </div>

          <div className="flex justify-center mt-16">
            <a
              href="/projects"
              className="px-10 py-5 bg-[#8AA46A] text-white font-medium rounded-full hover:bg-[#7A9C5B] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 transform"
            >
              See More Projects
            </a>
          </div>
        </div>
      </section>

      {/* 2️⃣ About Section */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl lg:text-6xl font-bold text-secondary mb-8">
              About Criti Designs
            </h2>
            <p className="text-xl md:text-2xl text-secondary/70 leading-relaxed max-w-4xl mx-auto font-body">
              We don&apos;t just construct buildings — we design experiences that shape how you live. Our architect-first approach blends creativity with technical precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <IconCard icon={<DraftingCompass className="w-12 h-12" />} title="Architect-first Planning" desc="Every project starts with thoughtful architectural design that puts your lifestyle first." />
            <IconCard icon={<Building className="w-12 h-12" />} title="Design-to-Build" desc="From concept to completion, we handle every aspect of your project seamlessly." />
            <IconCard icon={<MessageSquare className="w-12 h-12" />} title="Personalized Support" desc="Clear communication and dedicated support throughout your journey." />
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 bg-[#FAFAF7] relative z-10">
        <p className="font-serif italic text-4xl md:text-5xl text-center text-[#333333] max-w-5xl mx-auto px-6 leading-tight">
          &ldquo;Beautiful homes aren't expensive — badly planned ones are.&rdquo;
        </p>
      </section>

      {/* 4️⃣ Why Choose Us (Replaces StickyStory) */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-heading text-secondary">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <FeatureCard
              icon={<BadgeCheck className="w-10 h-10 text-[#8AA46A]" />}
              title="Quality & Craftsmanship"
              desc="We deliver thoughtful, high-quality design solutions with precision and attention to detail."
            />
            {/* Feature 2 */}
            <FeatureCard
              icon={<FileCheck className="w-10 h-10 text-[#8AA46A]" />}
              title="Budget Transparency"
              desc="No hidden costs. We plan every project with clarity and predictable outcomes."
            />
            {/* Feature 3 */}
            <FeatureCard
              icon={<Leaf className="w-10 h-10 text-[#8AA46A]" />}
              title="Sustainable Design"
              desc="Eco-friendly materials and energy-efficient concepts integrated into every project."
            />
            {/* Feature 4 */}
            <FeatureCard
              icon={<Ruler className="w-10 h-10 text-[#8AA46A]" />}
              title="Smart Space Planning"
              desc="Compact, functional, and elegant floor plans optimized for modern living."
            />
          </div>
        </div>
      </section>

      {/* 5️⃣ Client Testimonials Section */}
      <section className="bg-white relative z-10">
        <Testimonials />
      </section>

      {/* 6️⃣ Contact / CTA Section */}
      <section id="contact" className="py-24 bg-secondary text-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6">
              Let&apos;s Bring Your Vision to Life
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 font-body max-w-3xl mx-auto">
              Get a free consultation for your construction, interior design, or architectural project in Kannur.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <ContactRow icon={<Phone />} label="Phone" value="+91 73066 12105" href="tel:+917306612105" />
              <ContactRow icon={<MessageSquare />} label="WhatsApp" value="Chat Now" href="https://wa.me/917306612105" />
              <ContactRow icon={<Mail />} label="Email" value="info@critidesigns.com" href="mailto:info@critidesigns.com" />
              <ContactRow icon={<MapPin />} label="Location" value="Payyanur, Kerala" href="https://maps.google.com" />
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
              <ContactForm showTitle={false} />
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}

// --- Simplified Sub-components ---

function ProjectCard({ src, title, location }: { src: string, title: string, location: string }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative h-80 rounded-2xl overflow-hidden mb-6 shadow-md transition-shadow hover:shadow-2xl">
        <Image src={src} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-1 font-heading">{title}</h3>
      <p className="text-gray-500 font-body text-lg">{location}</p>
    </div>
  )
}

function IconCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="text-center flex flex-col items-center p-8 rounded-3xl hover:bg-gray-50 transition-colors duration-300">
      <div className="mb-6 text-[#8AA46A] p-4 bg-[#8AA46A]/10 rounded-2xl">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-secondary mb-4 font-heading">{title}</h3>
      <p className="text-secondary/70 leading-relaxed font-body">{desc}</p>
    </div>
  )
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-6 p-8 rounded-3xl bg-[#FAFAF7] border border-gray-100">
      <div className="shrink-0">{icon}</div>
      <div>
        <h3 className="text-xl font-bold text-secondary mb-2 font-heading">{title}</h3>
        <p className="text-gray-600 font-body leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href: string }) {
  return (
    <a href={href} className="flex items-center gap-6 p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group">
      <div className="text-[#8AA46A] bg-white/10 p-4 rounded-xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <div className="text-sm text-gray-400 mb-1 uppercase tracking-wider">{label}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </a>
  )
}
