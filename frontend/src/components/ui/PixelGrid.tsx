'use client'

import React from 'react'

interface PixelGridProps {
  size?: 8 | 16
  animated?: boolean
  className?: string
}

export function PixelGrid({ size = 8, animated = false, className = '' }: PixelGridProps) {
  const cellSize = size === 8 ? 32 : 16
  const gridSize = size === 8 ? 8 : 16

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className={animated ? 'animate-pulse opacity-30' : 'opacity-20'}
        style={{ animationDuration: animated ? '4s' : undefined }}
      >
        <defs>
          <pattern
            id={`pixel-grid-${gridSize}`}
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            <rect
              width={cellSize}
              height={cellSize}
              fill="none"
              stroke="rgba(77, 142, 233, 0.08)"
              strokeWidth="0.5"
            />
          </pattern>
          {animated && (
            <pattern
              id={`pixel-dots-${gridSize}`}
              width={cellSize * 2}
              height={cellSize * 2}
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx={cellSize}
                cy={cellSize}
                r="1"
                fill="rgba(0, 255, 136, 0.15)"
              />
            </pattern>
          )}
        </defs>
        <rect width="100%" height="100%" fill={`url(#pixel-grid-${gridSize})`} />
        {animated && <rect width="100%" height="100%" fill={`url(#pixel-dots-${gridSize})`} />}
      </svg>
    </div>
  )
}
