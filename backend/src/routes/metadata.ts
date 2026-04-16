import { Router, Request, Response } from "express";
import { uploadMetadata, getGatewayURL } from "../services/ipfs.service";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { imageUrl, tokenId, style, palette, mood } = req.body;

    if (!imageUrl || !tokenId) {
      res.status(400).json({ error: "imageUrl and tokenId are required" });
      return;
    }

    const metadata = {
      name: `CryptoPunks #${tokenId}`,
      description: `A unique procedurally-generated pixel punk. Style: ${style || "unknown"}, Palette: ${palette || "unknown"}, Mood: ${mood || "unknown"}.`,
      image: imageUrl,
      attributes: [
        ...(style ? [{ trait_type: "Style", value: style }] : []),
        ...(palette ? [{ trait_type: "Palette", value: palette }] : []),
        ...(mood ? [{ trait_type: "Mood", value: mood }] : []),
        { trait_type: "AI Engine", value: "Stability AI" },
        { trait_type: "Network", value: "Arc Testnet" },
        { trait_type: "Generated At", value: new Date().toISOString() },
      ],
    };

    const cid = await uploadMetadata(metadata);
    const metadataURI = `ipfs://${cid}`;
    const metadataGatewayUrl = getGatewayURL(cid);

    res.json({
      success: true,
      metadataURI,
      metadataGatewayUrl,
      metadata,
    });
  } catch (error) {
    console.error("Metadata error:", error);
    res.status(500).json({
      error: "Failed to create metadata",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
