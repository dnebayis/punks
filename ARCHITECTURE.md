# CryptoPunks NFT - Project Architecture & Overview

## Overview

An AI-powered CryptoPunk-style pixel avatar NFT collection running on Arc Network Testnet. Each mint generates a unique 24x24 pixel avatar with procedurally generated traits (Hair, Eyes, Accessories, Facial Hair, etc.). Every pixel is pseudo-random but deterministic based on wallet address and timestamp, ensuring true uniqueness while maintaining consistency. Max supply: 1,000 NFTs.

---

## Technical Specifications

| Specification | Value |
|---|---|
| **Network** | Arc Testnet (Chain ID: 5042002) |
| **RPC** | `https://rpc.testnet.arc.network` |
| **Native Gas Token** | USDC |
| **Block Explorer** | `https://testnet.arcscan.app` |
| **Faucet** | `https://faucet.circle.com` |
| **Token Standard** | ERC-721 |
| **Max Supply** | 1,000 |
| **Wallet Limit** | 5 NFTs per wallet |
| **Pixel Avatar Resolution** | 24x24 px |

---

## User Flow

```
Homepage → Connect Wallet (RainbowKit)
    → Switch to Arc Testnet
    → Click "Mint" Button
    → Generate Pixel Avatar (Loading)
    → Create Metadata + On-Chain Mint
    → Mint Successful → Display NFT Preview
    → "Copy Preview" → "Share on X (Twitter)"
```

---

## Trait System

Available traits per avatar (1,000,000+ unique combinations):
- **Background**: 10 variations (Blue Gray, Purple Gray, Sage, etc.)
- **Skin Tone**: 8 variations (Light, Medium, Tan, Brown, Dark, Olive, Alien, Zombie)
- **Hair**: 13 variations (Afro, Beanie, Blonde, Mohawk, Top Hat, Wild, etc.)
- **Eyes**: 11 variations (Big Eyes, Sunglasses, VR Headset, Nerd Glasses, 3D Glasses, etc.)
- **Mouth**: 8 variations (Neutral, Smile, Frown, Red Lipstick, Pipe, Cigarette, etc.)
- **Facial Hair**: 7 variations (None, Shadow, Mustache, Beard, Goatee, Chin Strap, etc.)
- **Accessories**: 9 variations (Earrings, Eye Patch, Crown, Chain Necklace, Nose Ring, etc.)
- **Shirt**: 8 variations (Gray Hoodie, Navy, Red, Black Tee, etc.)

---

## Deployment Information

### Contract Addresses (Arc Testnet)

| Contract | Address |
|---|---|
| **CryptoPunks NFT** | `0x86e43c45c715285a5d5ed76a97aba95865e11c00` |
| **Deployment Block** | 38241512 |
| **Transaction Hash** | `0xc20c5007730e01d5f75023e4f4aaa4a58a784d8fcbfbb5f5420a4dd5ff704e2b` |
| **Network** | Arc Testnet (Chain ID: 5042002) |
| **Explorer** | https://testnet.arcscan.app/address/0x86e43c45c715285a5d5ed76a97aba95865e11c00 |

### Environment Variables

**Backend (`.env`)**
```
NFT_CONTRACT_ADDRESS=0x86e43c45c715285a5d5ed76a97aba95865e11c00
ARC_TESTNET_RPC_URL=https://rpc.testnet.arc.network
MINTER_PRIVATE_KEY=...
```

**Frontend (`.env.local`)**
```
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x86e43c45c715285a5d5ed76a97aba95865e11c00
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_ARCSCAN_URL=https://testnet.arcscan.app
```

### How to Run

**Start Backend**
```bash
cd backend
npm install
npm run dev  # Runs on http://localhost:3001
```

**Start Frontend**
```bash
cd frontend
npm run dev  # Runs on http://localhost:3000
```

Then:
1. Visit http://localhost:3000
2. Connect testnet wallet
3. Click "Mint" to generate a CryptoPunk
4. Confirm transaction
5. NFT will be minted on Arc Testnet

### Verify Contract

Visit: https://testnet.arcscan.app/address/0x86e43c45c715285a5d5ed76a97aba95865e11c00

You can view:
- Contract source code
- Transactions
- Token holdings
- Trait metadata

