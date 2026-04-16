# CryptoPunks — Frontend

Next.js 15 frontend for the CryptoPunks NFT minting app on Arc Network Testnet.

## Stack

- **Next.js 15** (App Router)
- **wagmi v2** + **RainbowKit** — wallet connection
- **Tailwind CSS** — styling
- **TypeScript**

## Setup

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:
```
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0xf55BE17C98890C4FF4f4904F35D577bB38530b13
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_ARCSCAN_URL=https://testnet.arcscan.app
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=<your_project_id>
```

```bash
npm install
npm run dev   # http://localhost:3000
```

## Key Components

| Component | Purpose |
|---|---|
| `MintButton` | Orchestrates the full mint flow |
| `NFTPreviewCard` | Displays generated punk with trait breakdown |
| `MintCounter` | Shows total minted / 10,000 with progress bar |
| `NetworkGuard` | Blocks UI if wallet is on wrong network |
| `hooks/useMint` | State machine for generate → upload → mint |
| `hooks/useNFTContract` | Read contract state (supply, wallet count) |
