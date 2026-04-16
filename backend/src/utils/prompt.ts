const BACKGROUNDS = [
  "solid light blue",
  "solid pale green",
  "solid warm yellow",
  "solid light purple",
  "solid soft pink",
  "solid mint",
  "solid peach",
  "solid lavender",
  "solid cream",
  "solid sky blue",
] as const;

const SKIN_TONES = [
  "light skin",
  "medium skin",
  "tan skin",
  "brown skin",
  "dark skin",
  "pale skin",
  "olive skin",
] as const;

const HAIR_STYLES = [
  "mohawk",
  "wild hair",
  "messy hair",
  "beanie",
  "top hat",
  "cap forward",
  "bandana",
  "crazy hair",
  "straight hair",
  "peak spike",
  "purple hair",
  "orange side",
  "hoodie",
  "frumpy hair",
  "fedora",
  "police cap",
  "tassle hat",
  "cowboy hat",
  "headband",
  "none",
] as const;

const EYES = [
  "regular eyes",
  "blue eyes",
  "green eyes",
  "red eyes",
  "3d glasses",
  "regular glasses",
  "nerd glasses",
  "round glasses",
  "sun glasses",
  "vr headset",
  "eye patch",
  "eye mask",
  "half shutter glasses",
] as const;

const MOUTH = [
  "neutral mouth",
  "smile",
  "frown",
  "smirk",
  "open mouth",
  "buck teeth",
  "pipe",
  "cigarette",
  "medical mask",
] as const;

const ACCESSORIES = [
  "earring",
  "nose ring",
  "none",
  "none",
  "none",
] as const;

const FACIAL_HAIR = [
  "shadow",
  "goatee",
  "full beard",
  "mustache",
  "muttonchops",
  "none",
  "none",
] as const;

type Background = (typeof BACKGROUNDS)[number];

function seededIndex(seed: number, length: number): number {
  return ((seed % length) + length) % length;
}

function pick<T>(seed: number, arr: readonly T[]): T {
  return arr[seededIndex(seed, arr.length)];
}

export function generatePrompt(
  walletAddress: string,
  tokenId: number
): {
  prompt: string;
  style: string;
  palette: Background;
  mood: string;
  traits: Record<string, string>;
} {
  const seed =
    (tokenId * 31 + walletAddress.charCodeAt(0) * 17 + Date.now() % 10000) |
    0;

  const bg = pick(seed, BACKGROUNDS);
  const skin = pick(seed + 3, SKIN_TONES);
  const hair = pick(seed + 7, HAIR_STYLES);
  const eye = pick(seed + 11, EYES);
  const mouth = pick(seed + 17, MOUTH);
  const accessory = pick(seed + 23, ACCESSORIES);
  const facialHair = pick(seed + 29, FACIAL_HAIR);

  const traits: Record<string, string> = {
    Background: bg.replace("solid ", ""),
    Skin: skin.replace(" skin", ""),
    Hair: hair,
    Eyes: eye,
    Mouth: mouth,
    Accessory: accessory,
    "Facial Hair": facialHair,
  };

  const traitParts: string[] = [bg, skin];
  if (hair !== "none") traitParts.push(hair);
  traitParts.push(eye);
  traitParts.push(mouth);
  if (accessory !== "none") traitParts.push(accessory);
  if (facialHair !== "none") traitParts.push(facialHair);

  const prompt = `CryptoPunks style 24x24 pixel art avatar, front-facing character portrait. ${traitParts.join(", ")}. Retro 8-bit pixel art, chunky visible pixels, flat colors, no shading, no gradients, no anti-aliasing, no text, no background details, simple ${bg} background only. Square 1:1 format.`;

  return {
    prompt,
    style: "CryptoPunk",
    palette: bg,
    mood: `${skin}, ${eye}, ${mouth}`,
    traits,
  };
}
