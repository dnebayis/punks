'use client'

import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import { arcTestnet } from '@/lib/arc'
import { NeonFrame } from '@/components/ui/NeonFrame'

export function NetworkGuard({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  if (!isConnected) return <>{children}</>

  if (chainId !== arcTestnet.id) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-pixel-dark">
          <NeonFrame color="primary" intensity="high" className="max-w-sm mx-4 p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-[4px] bg-warning/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-pixel-text text-xl font-bold">Wrong Network</h3>
            <p className="text-pixel-muted text-sm">
              This app runs on Arc Testnet. Please switch network.
            </p>
            <button
              onClick={() => switchChain({ chainId: arcTestnet.id })}
              className="w-full py-3 rounded-[4px] bg-warning hover:brightness-110 text-pixel-dark font-semibold transition-all duration-200 cursor-pointer"
            >
              Switch to Arc Testnet
            </button>
          </NeonFrame>
        </div>
      </>
    )
  }

  return <>{children}</>
}
