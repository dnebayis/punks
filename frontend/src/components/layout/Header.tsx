'use client'

import React from 'react'
import { ConnectWallet } from '@/components/ConnectWallet'

export function Header() {
  return (
    <header className="w-full border-b border-pixel-border/50 bg-pixel-darker/90 backdrop-blur-md sticky top-0 z-40">
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 border border-neon/50 rounded-[2px] bg-neon/5">
              <div className="w-4 h-4 bg-neon rounded-[1px]" style={{ boxShadow: '0 0 12px rgba(0, 255, 136, 0.6)' }} />
              <div className="w-4 h-4 bg-primary rounded-[1px]" />
              <div className="w-4 h-4 bg-accent rounded-[1px]" />
            </div>
            <div>
              <span className="font-[family-name:var(--font-pixel)] text-xs text-neon font-bold tracking-widest hidden xs:inline">
                CRYPTOPUNKS
              </span>
              <span className="font-[family-name:var(--font-pixel)] text-xs text-neon font-bold tracking-widest xs:hidden">
                PUNK
              </span>
              <p className="text-[8px] text-pixel-muted font-[family-name:var(--font-mono)]">Arc Network</p>
            </div>
          </div>

          {/* Wallet Button */}
          <ConnectWallet />
        </div>
      </div>

      <div className="h-[2px] bg-gradient-to-r from-transparent via-neon/50 to-transparent" />
    </header>
  )
}
