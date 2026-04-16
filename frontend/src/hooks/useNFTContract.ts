'use client'

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { NFT_CONTRACT_ADDRESS, NFT_ABI } from '@/lib/contract'

export function useTotalSupply() {
  return useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_ABI,
    functionName: 'totalSupply',
    query: {
      refetchInterval: 3000, // Sync with blockchain every 3 seconds
    }
  })
}


export function useWalletMintCount(address: `0x${string}` | undefined) {
  return useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_ABI,
    functionName: 'walletMintCount',
    args: address ? [address] : undefined,
    query: { 
      enabled: !!address,
      refetchInterval: 3000,
     },
  })
}

export function usePublicMint() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const mint = (metadataURI: string) => {
    writeContract({
      address: NFT_CONTRACT_ADDRESS,
      abi: NFT_ABI,
      functionName: 'publicMint',
      args: [metadataURI],
    })
  }

  return { mint, hash, isPending, isConfirming, isSuccess, error, reset }
}
