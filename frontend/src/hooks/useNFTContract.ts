'use client'

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { NFT_CONTRACT_ADDRESS, NFT_ABI } from '@/lib/contract'

export function useTotalSupply() {
  return useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_ABI,
    functionName: 'totalSupply',
  })
}

export function useMaxSupply() {
  return useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_ABI,
    functionName: 'MAX_SUPPLY',
  })
}

export function useMaxPerWallet() {
  return useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_ABI,
    functionName: 'MAX_PER_WALLET',
  })
}

export function useWalletMintCount(address: `0x${string}` | undefined) {
  return useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_ABI,
    functionName: 'walletMintCount',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
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
