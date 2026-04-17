import { createCanvas } from "canvas";
import { generateTraits } from "./punk-traits";

export async function generatePunk(
  walletAddress: string,
  tokenId: number,
  timestamp?: number
): Promise<{
  imageBase64: string;
  traits: Record<string, string>;
}> {
  const { traits, layers } = generateTraits(walletAddress, tokenId, timestamp);

  const size = 24;
  const scale = 40;
  const outSize = size * scale;

  const small = createCanvas(size, size);
  const sCtx = small.getContext("2d");

  for (const layer of layers) {
    for (const pixel of layer.pixels) {
      sCtx.fillStyle = pixel.color;
      sCtx.fillRect(pixel.x, pixel.y, 1, 1);
    }
  }

  const out = createCanvas(outSize, outSize);
  const oCtx = out.getContext("2d");
  oCtx.imageSmoothingEnabled = false;

  const imgData = sCtx.getImageData(0, 0, size, size);
  const data = imgData.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2], a = data[idx + 3];
      if (a === 0) continue;
      oCtx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
      oCtx.fillRect(x * scale, y * scale, scale, scale);
    }
  }

  const buf = out.toBuffer("image/png");
  const imageBase64 = buf.toString("base64");

  return { imageBase64, traits };
}
