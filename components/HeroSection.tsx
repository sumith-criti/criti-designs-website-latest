'use client'

import React from 'react'
import Image from 'next/image'

export default function HeroSection() {
    return (
        <section className="relative min-h-screen bg-[#1a1a1a] overflow-hidden">

            {/* Container (Wrapper) */}
            <div className="flex flex-col items-center pt-8 pb-12 gap-8 lg:pt-12 lg:gap-8 w-full h-full justify-center">

                {/* Hero Image */}
                <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] lg:max-w-none z-0">
                    <Image
                        src="/images/logo.png"
                        alt="Criti Developers"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Hero Text */}
                <div className="text-center w-[90%] mx-auto flex flex-col gap-4 lg:max-w-[800px] z-10">
                    <h1 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
                        Design That Feels Like Home
                    </h1>
                    <p className="text-sm md:text-lg text-gray-300 font-body leading-relaxed drop-shadow-md max-w-2xl mx-auto">
                        Thoughtful architecture, functional interiors and quality construction under one roof
                    </p>
                </div>

            </div>
        </section>
    )
}
