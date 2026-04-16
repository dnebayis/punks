'use client'

import React from 'react'

interface PixelTextProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  glow?: boolean
  glitch?: boolean
  className?: string
}

export function PixelText({
  children,
  as: Tag = 'span',
  glow = false,
  glitch = false,
  className = '',
}: PixelTextProps) {
  return (
    <Tag
      className={`font-[family-name:var(--font-pixel)] ${glow ? 'glow-text' : ''} ${glitch ? 'animate-glitch-text' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}
