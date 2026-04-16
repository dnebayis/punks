'use client'

import React from 'react'

interface LoadingSpinnerProps {
  message?: string
  className?: string
}

export function LoadingSpinner({
  message = 'AI Creating Your NFT...',
  className = '',
}: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-6 ${className}`}>
      <div className="relative w-16 h-16">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute w-5 h-5 bg-neon"
            style={{
              top: i < 2 ? 0 : 'auto',
              bottom: i >= 2 ? 0 : 'auto',
              left: i % 2 === 0 ? 0 : 'auto',
              right: i % 2 === 1 ? 0 : 'auto',
              animation: `pixel-spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
              animationDelay: `${i * 0.15}s`,
              opacity: 1 - i * 0.15,
              boxShadow: '0 0 6px rgba(0, 255, 136, 0.4)',
            }}
          />
        ))}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 136, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="text-center">
        <p className="font-[family-name:var(--font-pixel)] text-[8px] text-neon mb-2 tracking-wider">
          {message}
        </p>
        <div className="w-48 h-1 bg-pixel-border rounded-[2px] overflow-hidden mx-auto">
          <div
            className="h-full bg-gradient-to-r from-primary to-neon rounded-[2px]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.08) 10px, rgba(255,255,255,0.08) 20px)',
              backgroundSize: '28.28px 100%',
              animation: 'progress-stripe 1s linear infinite, mint-progress 3s ease-out forwards',
            }}
          />
        </div>
      </div>
    </div>
  )
}
