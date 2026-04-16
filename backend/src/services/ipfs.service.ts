const PINATA_GATEWAY = process.env.PINATA_GATEWAY || "gateway.pinata.cloud";

function getJWT(): string {
  return process.env.PINATA_API_SECRET || "";
}

export async function uploadImage(
  imageBuffer: Buffer,
  filename: string
): Promise<string> {
  const blob = new Blob([imageBuffer], { type: "image/png" });
  const formData = new FormData();
  formData.append("file", blob, filename);
  formData.append("pinataMetadata", JSON.stringify({ name: filename }));
  formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

  const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getJWT()}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Pinata upload failed ${response.status}: ${text}`);
  }

  const result = await response.json() as { IpfsHash: string };
  return result.IpfsHash;
}

export async function uploadMetadata(metadata: object): Promise<string> {
  const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getJWT()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pinataContent: metadata,
      pinataMetadata: { name: `metadata-${Date.now()}.json` },
      pinataOptions: { cidVersion: 1 },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Pinata metadata failed ${response.status}: ${text}`);
  }

  const result = await response.json() as { IpfsHash: string };
  return result.IpfsHash;
}

export function getGatewayURL(cid: string): string {
  return `https://${PINATA_GATEWAY}/ipfs/${cid}`;
}
