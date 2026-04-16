'use client'

import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit'

export function ConnectWallet() {
  return (
    <RainbowConnectButton
      accountStatus="address"
      chainStatus="icon"
      showBalance={false}
    />
  )
}
