export const animationConfig = {
  glowPulse: 'glow-pulse 2s ease-in-out infinite',
  pixelFadeIn: 'pixel-fade-in 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
  scanline: 'scanline 8s linear infinite',
  float: 'float 3s ease-in-out infinite',
  mintProgress: 'mint-progress 3s ease-out forwards',
  shake: 'shake 0.5s ease-in-out',
  successBounce: 'success-bounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
  glitchText: 'glitch-text 3s ease-in-out infinite',
  pixelSpin: 'pixel-spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
  progressStripe: 'progress-stripe 1s linear infinite',
  slideInRight: 'slide-in-right 0.3s ease-out forwards',
  slideOutRight: 'slide-out-right 0.3s ease-in forwards',
} as const

export const animationDurations = {
  fast: 150,
  base: 250,
  slow: 400,
  spring: 500,
} as const
