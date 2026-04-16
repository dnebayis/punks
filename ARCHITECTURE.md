# CryptoPunks — Architecture

## Overview

On-chain pixel art NFT collection on Arc Network Testnet. Each mint procedurally generates a unique 24×24 pixel avatar. Traits are determined by a seed derived from wallet address, token ID, and timestamp.

---

## Network

| Property | Value |
|---|---|
| Network | Arc Testnet |
| Chain ID | 5042002 |
| RPC | `https://rpc.testnet.arc.network` |
| Native Gas Token | USDC |
| Explorer | `https://testnet.arcscan.app` |
| Faucet | `https://faucet.circle.com` |

---

## Contract

| Property | Value |
|---|---|
| Address | `0xf55BE17C98890C4FF4f4904F35D577bB38530b13` |
| Standard | ERC-721 (OpenZeppelin) |
| Max Supply | 10,000 |
| Wallet Limit | 5 |
| Symbol | PUNK |
| Explorer | https://testnet.arcscan.app/address/0xf55BE17C98890C4FF4f4904F35D577bB38530b13 |

---

## Mint Flow

```
User → Connect Wallet
     → Click Mint
     → POST /api/generate { walletAddress, timestamp }
          → generateTraits(walletAddress, tokenId)  ← seeded selection
          → generatePunk()                           ← 24×24 canvas render → PNG
          → uploadImage() → Pinata IPFS
          → createMetadata() → Pinata IPFS
     → publicMint(metadataURI) on-chain
     → NFT minted, traits displayed
```

---

## Pixel Generation

**Canvas:** 24×24 rendered at 40× scale → 960×960 PNG

**Layer order (bottom to top):**
1. Background (solid fill)
2. Base Head (skin, nose, chin, shirt)
3. Hair
4. Eyes
5. Mouth
6. Facial Hair
7. Accessory

**Seed formula:**
```
seed = (tokenId × 31 + walletAddress.charCodeAt(0) × 17 + timestamp % 10000) | 0
```

---

## Trait Categories

| Category | Count | Examples |
|---|---|---|
| Background | 10 | Blue Gray, Sage, Warm Tan |
| Skin | 8 | Light, Olive, Alien, Zombie |
| Hair | 18 | Wild Hair, Mohawk, Top Hat, Pink Bob |
| Eyes | 11 | Big Eyes, Sunglasses, VR Headset, Crazy Eyes |
| Mouth | 8 | Smile, Cigarette, Pipe, Purple Lipstick |
| Facial Hair | 7 | Mustache, Handlebars, Big Beard, Goatee |
| Accessory | 9 | Gold Earring, Eye Patch, Crown, Nose Ring |
| Shirt | 8 | Gray Hoodie, Navy Hoodie, Black Tee |

---

## Environment Variables

**Backend (`backend/.env`)**
```
NFT_CONTRACT_ADDRESS=
PINATA_API_KEY=
PINATA_API_SECRET=
PINATA_GATEWAY=
ARC_TESTNET_RPC_URL=https://rpc.testnet.arc.network
PORT=3001
```

**Frontend (`frontend/.env.local`)**
```
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_ARCSCAN_URL=https://testnet.arcscan.app
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=
```

**Contracts (`contracts/.env`)**
```
PRIVATE_KEY=
```
