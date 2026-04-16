'use client'

import { MintButton } from '@/components/MintButton'
import { ShareButtons } from '@/components/ShareButtons'
import { MintCounter } from '@/components/MintCounter'
import { NetworkGuard } from '@/components/NetworkGuard'
import { NFTPreviewCard } from '@/components/NFTPreviewCard'
import { MintProvider, useMint } from '@/hooks/useMint'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PixelText } from '@/components/ui/PixelText'

function AppContent() {
  const { state, result } = useMint()
  const showPreview = state === 'success' && result

  return (
    <NetworkGuard>
      <div className="min-h-screen flex flex-col bg-pixel-dark relative overflow-hidden">
        {/* Background Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="main-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <rect width="48" height="48" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#main-grid)" />
          </svg>
        </div>

        <Header />

        <main className="flex-1 flex items-center justify-center px-4 sm:px-8 lg:px-12 py-12 z-10">
          <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column: Hero Text + Mint Controls */}
            <div className="flex flex-col gap-8 text-center lg:text-left items-center lg:items-start order-2 lg:order-1">
              <div className="space-y-4">
                <PixelText
                  as="h1"
                  glitch
                  className="text-2xl sm:text-3xl lg:text-4xl text-neon tracking-widest"
                >
                  CRYPTOPUNKS ONCHAIN
                </PixelText>

                <p className="font-[family-name:var(--font-heading)] text-xl sm:text-2xl text-pixel-text/90 tracking-tight">
                  24x24 Pixel Art Avatars <br className="hidden sm:block lg:hidden" />
                  on Arc Network
                </p>

                <p className="text-base sm:text-lg text-pixel-muted max-w-lg lg:max-w-none leading-relaxed">
                  10,000 unique CryptoPunks. Procedurally-generated pixel avatars with distinct traits—hair, eyes, accessories, skin tone. Own a piece of pixel art history.
                </p>
              </div>

              <div className="w-full max-w-md space-y-6 pt-4 lg:pt-8">
                <MintCounter />
                <MintButton />
                <div className="min-h-[44px]">
                  <ShareButtons />
                </div>
              </div>
            </div>

            {/* Right Column: NFT Preview */}
            <div className="flex items-center justify-center order-1 lg:order-2">
              <div className="w-full max-w-md lg:max-w-lg aspect-square lg:aspect-[4/5] relative">
                {showPreview ? (
                  <div className="animate-pixel-fade-in h-full">
                    <NFTPreviewCard
                      tokenId={result.tokenId}
                      imageUrl={result.imageUrl}
                      traits={result.traits}
                      txHash={result.txHash}
                      className="h-full shadow-2xl shadow-neon/10"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-[4px] border-2 border-dashed border-neon/20 bg-pixel-card/30 flex flex-col items-center justify-center gap-4 text-pixel-muted/40 group hover:border-neon/40 transition-colors duration-500">
                    <div className="w-16 h-16 border border-dashed border-neon/20 rounded-full flex items-center justify-center animate-spin-slow">
                      <div className="w-8 h-8 bg-neon/5 rounded-sm" />
                    </div>
                    <p className="font-[family-name:var(--font-pixel)] text-[10px] tracking-[0.2em]">WAITING FOR MINT</p>
                  </div>
                )}
                
                {/* Decorative Elements around Preview */}
                <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-neon/20 pointer-events-none" />
                <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-neon/20 pointer-events-none" />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </NetworkGuard>
  )
}

export default function Home() {
  return (
    <MintProvider>
      <AppContent />
    </MintProvider>
  )
}
