'use client'

import React from 'react'

interface NeonFrameProps {
  children: React.ReactNode
  color?: 'neon' | 'primary' | 'accent'
  intensity?: 'low' | 'medium' | 'high'
  className?: string
}

const glowStyles = {
  neon: {
    low: 'border-neon/20 shadow-[0_0_8px_rgba(0,255,136,0.1)]',
    medium: 'border-neon/30 shadow-[0_0_15px_rgba(0,255,136,0.2),0_0_30px_rgba(0,255,136,0.1)]',
    high: 'border-neon/50 shadow-[0_0_20px_rgba(0,255,136,0.4),0_0_40px_rgba(0,255,136,0.2),0_0_60px_rgba(0,255,136,0.1)]',
  },
  primary: {
    low: 'border-primary/20 shadow-[0_0_8px_rgba(77,142,233,0.1)]',
    medium: 'border-primary/30 shadow-[0_0_15px_rgba(77,142,233,0.2),0_0_30px_rgba(77,142,233,0.1)]',
    high: 'border-primary/50 shadow-[0_0_20px_rgba(77,142,233,0.4),0_0_40px_rgba(77,142,233,0.2),0_0_60px_rgba(77,142,233,0.1)]',
  },
  accent: {
    low: 'border-accent/20 shadow-[0_0_8px_rgba(255,107,53,0.1)]',
    medium: 'border-accent/30 shadow-[0_0_15px_rgba(255,107,53,0.2),0_0_30px_rgba(255,107,53,0.1)]',
    high: 'border-accent/50 shadow-[0_0_20px_rgba(255,107,53,0.4),0_0_40px_rgba(255,107,53,0.2),0_0_60px_rgba(255,107,53,0.1)]',
  },
}

export function NeonFrame({
  children,
  color = 'neon',
  intensity = 'medium',
  className = '',
}: NeonFrameProps) {
  return (
    <div
      className={`border rounded-[4px] bg-pixel-card transition-all duration-300 ${glowStyles[color][intensity]} ${className}`}
    >
      {children}
    </div>
  )
}
