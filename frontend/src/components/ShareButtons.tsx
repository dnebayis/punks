'use client'

import { useCallback, useRef } from 'react'
import { ARCSCAN_URL } from '@/lib/contract'
import { useMint } from '@/hooks/useMint'

export function ShareButtons() {
  const { state, result } = useMint()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const copyImageToClipboard = useCallback(async () => {
    if (!result?.imageUrl) return

    try {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = result.imageUrl

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve()
        img.onerror = reject
      })

      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = img.width
      canvas.height = img.height

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.drawImage(img, 0, 0)

      canvas.toBlob(async (blob) => {
        if (!blob) return
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ])
      }, 'image/png')
    } catch {
      try {
        const text = `Check out my unique CryptoPunk NFT on Arc Network! ${ARCSCAN_URL}/tx/${result.txHash}`
        await navigator.clipboard.writeText(text)
      } catch {}
    }
  }, [result])

  const shareOnX = useCallback(() => {
    if (!result) return

    const text = encodeURIComponent(
      `Just minted CryptoPunk #${result.tokenId ?? ''} on @arc Network Testnet\n\nEvery piece is unique. Mint yours here: https://onchain-punks.vercel.app/`
    )

    window.open(
      `https://twitter.com/intent/tweet?text=${text}`,
      '_blank',
      'noopener,noreferrer'
    )
  }, [result])

  const viewOnExplorer = useCallback(() => {
    if (!result?.txHash) return
    window.open(
      `${ARCSCAN_URL}/tx/${result.txHash}`,
      '_blank',
      'noopener,noreferrer'
    )
  }, [result])

  if (state !== 'success' || !result) return null

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-pixel-fade-in">
      <canvas ref={canvasRef} className="hidden" />

      <button
        onClick={copyImageToClipboard}
        className="flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-pixel-card hover:bg-pixel-card-hover border border-pixel-border hover:border-pixel-border-light text-pixel-text text-sm font-medium transition-all duration-200 cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        Copy NFT Preview
      </button>

      <button
        onClick={shareOnX}
        className="flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-pixel-dark hover:bg-pixel-card border border-pixel-border hover:border-pixel-border-light text-pixel-text text-sm font-medium transition-all duration-200 cursor-pointer"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Share on X
      </button>

      <button
        onClick={viewOnExplorer}
        className="flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 text-primary text-sm font-medium transition-all duration-200 cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        View on ArcScan
      </button>
    </div>
  )
}
