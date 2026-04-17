import { generatePrompt } from "../utils/prompt";
import { generatePunk } from "./punk-generator";

interface ImageResult {
  imageBase64: string;
  prompt: string;
  style: string;
  palette: string;
  mood: string;
  traits?: Record<string, string>;
}

export async function generateImage(
  walletAddress: string,
  tokenId: number,
  timestamp?: number
): Promise<ImageResult> {
  const { prompt, style, palette, mood, traits } = generatePrompt(walletAddress, tokenId);

  try {
    const punk = await generatePunk(walletAddress, tokenId, timestamp);
    return {
      imageBase64: punk.imageBase64,
      prompt,
      style: "CryptoPunk",
      palette: punk.traits.Background || palette,
      mood: `${punk.traits.Skin}, ${punk.traits.Eyes}`,
      traits: punk.traits,
    };
  } catch (punkError) {
    console.error("Punk generator failed:", punkError instanceof Error ? punkError.message : punkError);
  }

  try {
    return await generateWithStabilityAI(prompt, style, palette, mood);
  } catch (error) {
    console.error("Stability AI failed:", error instanceof Error ? error.message : error);
  }

  try {
    const result = await generateWithPollinations(prompt, style, palette, mood);
    return { ...result, traits };
  } catch (error) {
    console.error("Pollinations failed:", error instanceof Error ? error.message : error);
  }

  throw new Error("All image generation methods failed.");
}

async function generateWithStabilityAI(
  prompt: string,
  style: string,
  palette: string,
  mood: string
): Promise<ImageResult> {
  const apiKey = process.env.STABILITY_API_KEY;
  if (!apiKey) throw new Error("No Stability API key");

  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append("output_format", "png");
  formData.append("aspect_ratio", "1:1");

  const response = await fetch(
    "https://api.stability.ai/v2beta/stable-image/generate/sd3",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "image/*",
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Stability API error ${response.status}: ${text}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const imageBase64 = buffer.toString("base64");

  return { imageBase64, prompt, style, palette, mood };
}

async function generateWithPollinations(
  prompt: string,
  style: string,
  palette: string,
  mood: string
): Promise<ImageResult> {
  const encodedPrompt = encodeURIComponent(prompt);
  const seed = Math.floor(Math.random() * 999999);

  const response = await fetch(
    `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true`,
    { method: "GET" }
  );

  if (!response.ok) {
    throw new Error(`Pollinations error ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const imageBase64 = buffer.toString("base64");

  return { imageBase64, prompt, style, palette, mood };
}
