import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono, Press_Start_2P } from 'next/font/google'
import { Providers } from '@/providers/WagmiProvider'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
})

const pressStart2P = Press_Start_2P({
  variable: '--font-pixel',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CryptoPunks - Pixel Avatar NFTs on Arc Network',
  description: 'Mint unique procedurally-generated 24x24 pixel avatar NFTs on Arc Network Testnet. 1,000 limited edition CryptoPunks with distinct traits. Every avatar is unique.',
  openGraph: {
    title: 'CryptoPunks - Pixel Avatar NFTs',
    description: 'Unique pixel art avatars on Arc Network. Limited to 1,000 NFTs.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${pressStart2P.variable} dark`}
    >
      <body className="min-h-screen bg-pixel-dark text-pixel-text antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
