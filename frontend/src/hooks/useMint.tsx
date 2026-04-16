'use client'

import { useState, useCallback, useEffect, createContext, useContext, useRef } from 'react'
import { useAccount } from 'wagmi'
import { usePublicMint, useTotalSupply } from './useNFTContract'

export type MintState = 'idle' | 'generating' | 'uploading' | 'minting' | 'success' | 'error'

interface MintResult {
  imageUrl: string
  metadataURI: string
  txHash: string
  tokenId?: number
  traits?: Record<string, string>
}

interface MintContextValue {
  state: MintState
  result: MintResult | null
  errorMessage: string
  hash: `0x${string}` | undefined
  isPending: boolean
  isConfirming: boolean
  startMint: () => Promise<void>
  resetMint: () => void
}

const MintContext = createContext<MintContextValue | null>(null)

export function useMint() {
  const ctx = useContext(MintContext)
  if (!ctx) throw new Error('useMint must be used within MintProvider')
  return ctx
}

export function MintProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<MintState>('idle')
  const [result, setResult] = useState<MintResult | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const supplyBeforeMint = useRef<number>(0)

  const { address } = useAccount()
  const { data: currentSupply } = useTotalSupply()
  const { mint, hash, isPending, isConfirming, isSuccess, error: mintError, reset } = usePublicMint()

  const startMint = useCallback(async () => {
    if (!address) return

    setState('generating')
    setErrorMessage('')
    setResult(null)
    supplyBeforeMint.current = Number(currentSupply ?? 0n)

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'
      const response = await fetch(`${backendUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: address,
          timestamp: Date.now(),
          seed: Math.random().toString(36).substring(2),
        }),
      })

      if (!response.ok) {
        throw new Error('AI image generation failed')
      }

      setState('uploading')

      const data = await response.json()

      if (!data.metadataURI || !data.imageUrl) {
        throw new Error('Invalid response: missing metadataURI or imageUrl')
      }

      setState('minting')

      mint(data.metadataURI)

      const attrs: Array<{ trait_type: string; value: string }> = data.metadata?.attributes ?? []
      const traits = Object.fromEntries(attrs.map((a) => [a.trait_type, a.value]))
      setResult({
        imageUrl: data.imageUrl,
        metadataURI: data.metadataURI,
        txHash: '',
        traits,
      })
    } catch (err) {
      setState('error')
      setErrorMessage(err instanceof Error ? err.message : 'Unknown error')
    }
  }, [address, mint, currentSupply])

  const resetMint = useCallback(() => {
    setState('idle')
    setResult(null)
    setErrorMessage('')
    reset()
  }, [reset])

  useEffect(() => {
    if (isSuccess && state === 'minting') {
      const nextTokenId = supplyBeforeMint.current + 1
      setState('success')
      setResult((prev) => prev ? { ...prev, txHash: hash || '', tokenId: nextTokenId } : null)
    }
  }, [isSuccess, state, hash])

  useEffect(() => {
    if (mintError && state === 'minting') {
      setState('error')
      setErrorMessage(mintError.message || 'Mint failed')
    }
  }, [mintError, state])

  return (
    <MintContext.Provider
      value={{
        state,
        result,
        errorMessage,
        hash,
        isPending,
        isConfirming,
        startMint,
        resetMint,
      }}
    >
      {children}
    </MintContext.Provider>
  )
}
