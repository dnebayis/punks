'use client'

import React, { useEffect, useState } from 'react'

interface ProgressBarProps {
  value: number
  max?: number
  animated?: boolean
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeStyles = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

export function ProgressBar({
  value,
  max = 100,
  animated = true,
  showLabel = false,
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  useEffect(() => {
    const timer = setTimeout(() => setDisplayValue(percentage), 50)
    return () => clearTimeout(timer)
  }, [percentage])

  const colorClass =
    percentage < 30
      ? 'from-primary to-primary-light'
      : percentage < 70
        ? 'from-primary to-neon'
        : 'from-neon to-neon-dark'

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-1.5">
          <span className="text-pixel-muted text-xs font-[family-name:var(--font-mono)]">{Math.round(displayValue)}%</span>
          <span className="text-pixel-muted text-xs font-[family-name:var(--font-mono)]">{value}/{max}</span>
        </div>
      )}
      <div
        className={`w-full bg-pixel-border rounded-[2px] overflow-hidden ${sizeStyles[size]}`}
      >
        <div
          className={`h-full bg-gradient-to-r ${colorClass} rounded-[2px]`}
          style={{ width: `${displayValue}%`, transition: animated ? 'width 300ms ease-out' : 'none' }}
        />
      </div>
    </div>
  )
}
