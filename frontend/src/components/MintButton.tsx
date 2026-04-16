'use client'

import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import { arcTestnet } from '@/lib/arc'
import { useWalletMintCount, useTotalSupply } from '@/hooks/useNFTContract'
import { useMint, MintState } from '@/hooks/useMint'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

const STATE_LABELS: Record<MintState, string> = {
  idle: 'MINT NFT',
  generating: 'Generating CryptoPunk...',
  uploading: 'Uploading Metadata...',
  minting: 'Minting...',
  success: 'Minted Successfully!',
  error: 'Error - Try Again',
}

export function MintButton() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  const isCorrectNetwork = chainId === arcTestnet.id

  const { data: totalSupplyData } = useTotalSupply()
  const { address } = useAccount()
  const { data: walletMintCount } = useWalletMintCount(address)

  const { state, startMint, resetMint, errorMessage } = useMint()

  const totalSupply = Number(totalSupplyData ?? 0n)
  const maxSupply = 10000
  const minted = Number(walletMintCount ?? 0n)
  const isSoldOut = totalSupply >= maxSupply
  const isWalletFull = minted >= 5
  const isLoading = state === 'generating' || state === 'uploading' || state === 'minting'

  if (!isConnected) {
    return (
      <div className="text-center">
        <p className="text-pixel-muted mb-4 text-sm">Connect your wallet to mint an NFT</p>
        <div className="h-14 pixel-border bg-pixel-card flex items-center justify-center text-pixel-muted text-lg max-w-md mx-auto">
          Connect Wallet Above
        </div>
      </div>
    )
  }

  if (!isCorrectNetwork) {
    return (
      <div className="text-center">
        <p className="text-warning mb-4 text-sm">
          You are not on the Arc Testnet
        </p>
        <button
          onClick={() => switchChain({ chainId: arcTestnet.id })}
          className="h-14 w-full max-w-md rounded-[4px] bg-warning hover:brightness-110 text-pixel-dark font-bold text-lg transition-all duration-200 cursor-pointer"
        >
          Switch to Arc Testnet
        </button>
      </div>
    )
  }

  return (
    <div className="text-center w-full max-w-md mx-auto">
      <div className="min-h-[180px] flex flex-col items-center justify-center">
        {isLoading ? (
          <LoadingSpinner message={STATE_LABELS[state]} />
        ) : (
          <>
            <button
              onClick={state === 'error' || state === 'success' ? resetMint : startMint}
              disabled={isLoading || isSoldOut || isWalletFull}
              className={`mint-button w-full h-16 text-xl font-bold transition-all duration-300 ${
                isSoldOut || isWalletFull
                  ? 'opacity-40 cursor-not-allowed bg-pixel-dark border border-pixel-border/30'
                  : state === 'success'
                    ? 'animate-success-bounce'
                    : state === 'error'
                      ? 'animate-shake'
                      : 'hover:scale-105 hover:shadow-lg hover:shadow-neon/30'
              }`}
            >
              {isSoldOut ? '◆ SOLD OUT ◆' : isWalletFull ? 'LIMIT REACHED (5/5)' : STATE_LABELS[state]}
            </button>

            {state === 'error' && errorMessage && (
              <p className="text-error mt-4 text-sm px-2 py-2 bg-error/10 border border-error/30 rounded-[2px] w-full">
                ✗ {errorMessage}
              </p>
            )}

            {state === 'success' && (
              <p className="text-neon mt-4 text-sm px-2 py-2 bg-neon/10 border border-neon/30 rounded-[2px] w-full">
                ✓ CryptoPunk minted successfully!
              </p>
            )}

            {isSoldOut && (
              <p className="text-warning mt-4 text-xs px-2 py-2 bg-warning/10 border border-warning/30 rounded-[2px] w-full">
                All 10,000 CryptoPunks have been minted!
              </p>
            )}

            {isWalletFull && !isSoldOut && (
              <p className="text-warning mt-4 text-xs px-2 py-2 bg-warning/10 border border-warning/30 rounded-[2px] w-full">
                You have reached your wallet limit (5 NFTs max)
              </p>
            )}
          </>
        )}
      </div>

      <div className="mt-4 px-3 py-2 bg-pixel-dark/50 border border-pixel-border/30 rounded-[2px]">
        <p className="text-pixel-muted text-xs font-[family-name:var(--font-mono)]">
          Your Collection: <span className="text-neon font-bold">{minted}</span>/5
        </p>
      </div>
    </div>
  )
}
