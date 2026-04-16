'use client'

import React, { useState } from 'react'
import { NeonFrame } from './ui/NeonFrame'
import { PixelText } from './ui/PixelText'

interface NFTPreviewCardProps {
  tokenId?: number
  imageUrl?: string
  style?: string
  palette?: string
  mood?: string
  txHash?: string
  className?: string
}

export function NFTPreviewCard({
  tokenId = 0,
  imageUrl,
  style = 'Pixel Art',
  palette = 'Neon Sunset',
  mood,
  txHash,
  className = '',
}: NFTPreviewCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyPreview = async () => {
    if (!imageUrl) return
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      await navigator.clipboard.writeText(imageUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleShareX = () => {
    const text = encodeURIComponent(
      `Just minted CryptoPunk #${tokenId} on @arc Network Testnet\n\nEvery piece is unique.`
    )
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  const shortHash = txHash
    ? `${txHash.slice(0, 6)}...${txHash.slice(-4)}`
    : 'pending...'

  return (
    <NeonFrame color="neon" intensity="medium" className={`overflow-hidden ${className}`}>
      <div className="animate-pixel-fade-in">
        <div className="relative aspect-square bg-pixel-dark border-b border-pixel-border/30">
          {imageUrl ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 bg-pixel-border animate-pixel-spin"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <img
                src={imageUrl}
                alt={`CryptoPunk #${tokenId}`}
                className="w-full h-full object-cover"
                style={{ imageRendering: 'auto' }}
                onLoad={() => setImageLoaded(true)}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="grid grid-cols-4 gap-1 mx-auto mb-3 w-fit">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-[1px]"
                      style={{
                        backgroundColor: i % 3 === 0 ? '#1a1a2e' : i % 3 === 1 ? '#111118' : '#0a0a0f',
                      }}
                    />
                  ))}
                </div>
                <p className="text-[8px] text-pixel-muted font-[family-name:var(--font-pixel)] tracking-wider">NO PREVIEW</p>
              </div>
            </div>
          )}

          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 bg-pixel-dark/80 border border-pixel-border/50 rounded-[2px] text-[10px] text-neon font-[family-name:var(--font-mono)]">
              #{tokenId || '?'}
            </span>
          </div>
        </div>

        <div className="p-4">
          <PixelText as="h3" glow className="text-[10px] text-neon mb-3 tracking-wider">
            CryptoPunk #{tokenId || '?'}
          </PixelText>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="px-2 py-1.5 bg-pixel-dark rounded-[2px] border border-pixel-border/30">
              <p className="text-[8px] text-pixel-muted font-[family-name:var(--font-mono)]">Style</p>
              <p className="text-xs text-pixel-text">{style}</p>
            </div>
            <div className="px-2 py-1.5 bg-pixel-dark rounded-[2px] border border-pixel-border/30">
              <p className="text-[8px] text-pixel-muted font-[family-name:var(--font-mono)]">Palette</p>
              <p className="text-xs text-pixel-text">{palette}</p>
            </div>
            {mood && (
              <div className="col-span-2 px-2 py-1.5 bg-pixel-dark rounded-[2px] border border-pixel-border/30">
                <p className="text-[8px] text-pixel-muted font-[family-name:var(--font-mono)]">Mood</p>
                <p className="text-xs text-pixel-text">{mood}</p>
              </div>
            )}
          </div>

          <div className="flex gap-2 mb-3">
            <button
              onClick={handleCopyPreview}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-pixel-dark border border-pixel-border/40 rounded-[4px] text-xs text-pixel-text hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-pointer"
            >
              {copied ? (
                <>
                  <span className="text-neon">[v]</span>
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <span>[C]</span>
                  <span>Copy Preview</span>
                </>
              )}
            </button>
            <button
              onClick={handleShareX}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-pixel-dark border border-pixel-border/40 rounded-[4px] text-xs text-pixel-text hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-pointer"
            >
              <span>[X]</span>
                  <span>Share on X</span>
            </button>
          </div>

          {txHash && (
            <a
              href={`https://testnet.arcscan.app/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-[10px] text-pixel-muted hover:text-primary transition-colors font-[family-name:var(--font-mono)]"
            >
              ArcScan: {shortHash}
            </a>
          )}
        </div>
      </div>
    </NeonFrame>
  )
}
