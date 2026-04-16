# CryptoPunks — On-Chain Pixel Art NFTs

24×24 pixel avatar NFTs on Arc Network Testnet. 10,000 unique CryptoPunks, procedurally generated from on-chain traits.

**Contract:** `0xf55BE17C98890C4FF4f4904F35D577bB38530b13` · Arc Testnet (Chain ID: 5042002)

---

## Stack

| Layer | Tech |
|---|---|
| Smart Contract | Solidity 0.8.30, Foundry, OpenZeppelin ERC-721 |
| Backend | Node.js, TypeScript, Express, Canvas, Pinata IPFS |
| Frontend | Next.js 15, TypeScript, Tailwind CSS, wagmi, RainbowKit |

---

## How It Works

1. User connects wallet and clicks **Mint**
2. Backend generates a unique 24×24 pixel punk from seeded traits (hair, eyes, mouth, accessories, skin tone, shirt)
3. Image is uploaded to IPFS via Pinata; metadata JSON is pinned
4. `publicMint(metadataURI)` is called on-chain — the NFT is minted to the user's wallet
5. Trait card is displayed with all attributes

Trait generation is seeded from `tokenId × walletAddress × timestamp`, making each punk unique.

---

## Traits

Each punk has 8 trait categories:

| Category | Variants |
|---|---|
| Background | 10 |
| Skin | 8 (including Alien, Zombie) |
| Hair | 18 |
| Eyes | 11 |
| Mouth | 8 |
| Facial Hair | 7 |
| Accessory | 9 |
| Shirt | 8 |

---

## Setup

### Prerequisites
- Node.js 18+
- Foundry (`curl -L https://foundry.paradigm.xyz | bash`)
- Arc Testnet wallet with USDC for gas ([faucet](https://faucet.circle.com))

### Backend

```bash
cd backend
cp .env.example .env   # fill in PINATA_API_KEY, PINATA_API_SECRET, NFT_CONTRACT_ADDRESS
npm install
npm run dev            # http://localhost:3001
```

### Frontend

```bash
cd frontend
cp .env.local.example .env.local   # fill in contract address and backend URL
npm install
npm run dev                         # http://localhost:3000
```

### Contracts

```bash
cd contracts
cp .env.example .env   # fill in PRIVATE_KEY
forge build
forge script script/Deploy.s.sol:DeployCryptoPunks --rpc-url arc_testnet --broadcast
```

---

## Contract

```
Max Supply:    10,000
Per Wallet:    5
Token Symbol:  PUNK
Network:       Arc Testnet
Explorer:      https://testnet.arcscan.app/address/0xf55BE17C98890C4FF4f4904F35D577bB38530b13
```
