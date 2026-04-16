'use client'

import React from 'react'
import { PixelText } from '../ui/PixelText'

export function HeroSection() {
  return (
    <section className="relative w-full py-6 sm:py-8 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <rect width="48" height="48" fill="none" stroke="rgba(77,142,233,0.12)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="absolute top-8 left-8 opacity-20 hidden lg:block">
        <div className="grid grid-cols-4 gap-1">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-[1px] animate-float"
              style={{
                backgroundColor: i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#4d8ee9' : '#ff6b35',
                animationDelay: `${i * 0.2}s`,
                opacity: 0.4 + (i % 4) * 0.15,
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 right-8 opacity-20 hidden lg:block">
        <div className="grid grid-cols-4 gap-1">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-[1px] animate-float"
              style={{
                backgroundColor: i % 3 === 0 ? '#4d8ee9' : i % 3 === 1 ? '#00ff88' : '#ff6b35',
                animationDelay: `${i * 0.15 + 0.5}s`,
                opacity: 0.4 + (i % 4) * 0.15,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <PixelText
          as="h1"
          glitch
          className="text-lg sm:text-xl md:text-2xl text-neon mb-6 tracking-widest text-center"
        >
          AI-GENERATED ART
        </PixelText>

        <p className="font-[family-name:var(--font-heading)] text-lg sm:text-xl text-pixel-text/80 mb-3 tracking-tight text-center">
          Every pixel carries a soul. Every mint births a dream.
        </p>

        <p className="text-sm sm:text-base text-pixel-muted max-w-xl mb-6 leading-relaxed text-center">
          Born from silence and code, each piece is a fleeting thought crystallized into pixels.
          No two are alike. No two will ever exist again.
        </p>

        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
      </div>
    </section>
  )
}
