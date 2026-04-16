'use client'

import { useTotalSupply } from '@/hooks/useNFTContract'
import { ProgressBar } from '@/components/ui/ProgressBar'

export function MintCounter() {
  const { data: totalSupplyData } = useTotalSupply()

  const totalSupply = Number(totalSupplyData ?? 0n)
  const maxSupply = 10000
  const remaining = maxSupply - totalSupply

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="px-4 py-3 bg-pixel-dark border border-pixel-border/50 rounded-[2px] mb-4">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-[10px] text-pixel-muted font-[family-name:var(--font-mono)] uppercase tracking-wider">CryptoPunks Minted</p>
            <p className="text-xl font-bold text-neon font-[family-name:var(--font-heading)]">
              {totalSupply.toLocaleString('en-US')}
              <span className="text-pixel-text text-sm ml-1">/ {maxSupply.toLocaleString('en-US')}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-pixel-muted font-[family-name:var(--font-mono)] uppercase">Remaining</p>
            <p className="text-lg font-bold text-pixel-text">{remaining.toLocaleString('en-US')}</p>
          </div>
        </div>
        <ProgressBar value={totalSupply} max={maxSupply} size="lg" />
        <div className="mt-2 text-xs text-pixel-muted text-center font-[family-name:var(--font-mono)]">
          {maxSupply > 0 ? ((totalSupply / maxSupply) * 100).toFixed(1) : 0}% Complete
        </div>
      </div>
    </div>
  )
}
