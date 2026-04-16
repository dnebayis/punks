import { Router, Request, Response } from "express";
import { generateImage } from "../services/ai.service";
import { uploadImage, getGatewayURL } from "../services/ipfs.service";
import { createMetadata } from "../services/metadata.service";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { walletAddress, tokenId } = req.body;

    if (!walletAddress) {
      res.status(400).json({ error: "walletAddress is required" });
      return;
    }

    const id = tokenId || Date.now();

    const result = await generateImage(walletAddress, id);

    const imageBuffer = Buffer.from(result.imageBase64, "base64");
    const imageCID = await uploadImage(imageBuffer, `arc-ai-art-${id}.png`);
    const imageUrl = getGatewayURL(imageCID);

    const { metadata, metadataURI } = await createMetadata({
      tokenId: id,
      imageUrl,
      style: result.style,
      palette: result.palette,
      mood: result.mood,
      traits: result.traits,
    });

    res.json({
      success: true,
      imageUrl,
      imageCID,
      metadataURI,
      metadata,
    });
  } catch (error) {
    console.error("Generate error:", error);
    res.status(500).json({
      error: "Failed to generate NFT art",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
