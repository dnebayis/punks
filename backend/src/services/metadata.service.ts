import { uploadMetadata } from "./ipfs.service";

interface MetadataInput {
  tokenId: number;
  imageUrl: string;
  style: string;
  palette: string;
  mood: string;
  traits?: Record<string, string>;
}

export async function createMetadata(
  input: MetadataInput
): Promise<{ metadata: object; metadataURI: string }> {
  const attributes: { trait_type: string; value: string }[] = [];

  // Add main traits from input
  if (input.style) {
    attributes.push({ trait_type: "Style", value: input.style });
  }
  if (input.palette) {
    attributes.push({ trait_type: "Palette", value: input.palette });
  }
  if (input.mood) {
    attributes.push({ trait_type: "Mood", value: input.mood });
  }

  // Add additional traits from traits object (like punk generator traits)
  if (input.traits) {
    for (const [key, value] of Object.entries(input.traits)) {
      if (value && value !== "none") {
        attributes.push({ trait_type: key, value });
      }
    }
  }

  // Add metadata traits
  attributes.push({ trait_type: "Network", value: "Arc Testnet" });
  attributes.push({ trait_type: "Generated At", value: new Date().toISOString() });

  const metadata = {
    name: `BitSoul #${input.tokenId}`,
    description: `BitSoul #${input.tokenId}. A unique CryptoPunk-style pixel avatar on Arc Network. Style: ${input.style}, Palette: ${input.palette}, Mood: ${input.mood}.`,
    image: input.imageUrl,
    attributes,
  };

  const cid = await uploadMetadata(metadata);
  const metadataURI = `ipfs://${cid}`;

  return { metadata, metadataURI };
}
