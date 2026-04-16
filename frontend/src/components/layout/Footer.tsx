'use client'

import React from 'react'

export function Footer() {
  return (
    <footer className="w-full border-t border-pixel-border/50 bg-pixel-darker mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-neon rounded-[1px]" style={{ boxShadow: '0 0 8px rgba(0, 255, 136, 0.5)' }} />
              <span className="font-[family-name:var(--font-pixel)] text-xs text-neon font-bold tracking-widest">CRYPTOPUNKS</span>
            </div>
            <p className="text-xs text-pixel-muted/70 font-[family-name:var(--font-mono)]">Pixel Art NFTs on Arc</p>
            <p className="text-[10px] text-pixel-subtle font-[family-name:var(--font-mono)]">10,000 Limited Edition</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://testnet.arcscan.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-pixel-muted hover:text-neon transition-colors font-[family-name:var(--font-mono)]"
            >
              [ArcScan]
            </a>
            <a
              href="https://faucet.circle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-pixel-muted hover:text-neon transition-colors font-[family-name:var(--font-mono)]"
            >
              [Faucet]
            </a>
            <a
              href="https://arc.network"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-pixel-muted hover:text-neon transition-colors font-[family-name:var(--font-mono)]"
            >
              [Arc Network]
            </a>
          </div>

          {/* Network Info */}
          <div className="text-xs text-pixel-muted/60 font-[family-name:var(--font-mono)]">
            <p>Chain: Arc Testnet</p>
            <p>ID: 5042002</p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 h-[1px] bg-gradient-to-r from-transparent via-pixel-border/30 to-transparent" />

        {/* Bottom */}
        <div className="text-center text-[10px] text-pixel-subtle/50 font-[family-name:var(--font-mono)]">
          © 2026 CryptoPunks NFT Collection | Each avatar is unique and one-of-a-kind
        </div>
      </div>
    </footer>
  )
}
