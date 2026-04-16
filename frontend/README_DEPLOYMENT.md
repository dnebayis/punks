# CryptoPunks NFT - Deployment Guide

## Contract Information

**Contract Address:** `0x8262EDF802DEE831c01B57991882d61EA3a00E50`

**Network:** Arc Testnet (Chain ID: 5042002)

**Contract Details:**
- Name: CryptoPunks
- Symbol: PUNK
- Max Supply: 1,000
- Max Per Wallet: 5

**ArcScan Link:** https://testnet.arcscan.app/address/0x8262EDF802DEE831c01B57991882d61EA3a00E50

---

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```

Server will start on `http://localhost:3001`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

App will start on `http://localhost:3000`

### 3. Environment Variables

Frontend `.env.local`:
```
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=0x8262EDF802DEE831c01B57991882d61EA3a00E50
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_ARCSCAN_URL=https://testnet.arcscan.app
```

Backend `.env`:
```
NFT_CONTRACT_ADDRESS=0x8262EDF802DEE831c01B57991882d61EA3a00E50
ARC_TESTNET_RPC_URL=https://rpc.testnet.arc.network
```

---

## How to Use

1. **Connect Wallet**
   - Open http://localhost:3000
   - Click "Connect Wallet"
   - Select your wallet provider
   - Approve connection

2. **Switch to Arc Testnet**
   - If not on Arc Testnet, click "Switch to Arc Testnet"
   - Confirm network switch in wallet

3. **Get Testnet USDC**
   - Visit https://faucet.circle.com
   - Get testnet USDC tokens

4. **Mint NFT**
   - Click "Mint NFT" button
   - Wait for AI image generation
   - Confirm transaction in wallet
   - NFT will be minted!

5. **View Your NFT**
   - NFT preview will appear on the page
   - Click "Copy Preview" to copy image
   - Click "Share on X" to share on Twitter

---

## Trait Generation

Each CryptoPunk has 8 trait categories:

- **Hair**: 18 variations (Afro, Beanie, Pink Bob, etc.)
- **Eyes**: 11 variations (Sunglasses, VR Headset, etc.)
- **Mouth**: 8 variations (Smile, Pipe, Cigarette, etc.)
- **Facial Hair**: 7 variations (Beard, Mustache, etc.)
- **Accessories**: 9 variations (Earrings, Crown, etc.)
- **Skin**: 8 variations (Light, Dark, Alien, etc.)
- **Shirt**: 8 variations
- **Background**: 10 variations

**Total Combinations:** 1,000,000+

---

## Verification

### On ArcScan
https://testnet.arcscan.app/address/0x8262EDF802DEE831c01B57991882d61EA3a00E50

### View Your NFTs
1. Go to ArcScan link above
2. Click "Tokens" tab
3. View your minted CryptoPunks
4. Click on token ID to see metadata

### Check Metadata
- Click on your NFT on ArcScan
- View all traits in metadata
- See associated IPFS image

---

## Troubleshooting

**"Max supply reached"**
- All 1,000 NFTs have been minted
- Wait for new collection or mainnet launch

**"Wallet limit reached"**
- Maximum 5 NFTs per wallet
- Use different wallet to mint more

**"Network not supported"**
- Make sure you're on Arc Testnet
- Chain ID should be 5042002

**Transaction failed**
- Ensure you have enough USDC for gas
- Check testnet faucet again
- Try again

---

## Support

For issues, check:
- Backend logs (http://localhost:3001)
- Browser console (F12)
- ArcScan for transaction status

---

**Contract Deployed:** 2026-04-16
**Last Updated:** 2026-04-16
