interface Pixel {
  x: number;
  y: number;
  color: string;
}

interface Layer {
  name: string;
  pixels: Pixel[];
}

const BG = [
  "#638596", "#6B5B8A", "#A8C8A0", "#C8B898", "#88A0C0",
  "#B89070", "#98B0A8", "#A89888", "#7890A0", "#B8A0B8",
];
const BG_NAMES = [
  "Blue Gray", "Purple Gray", "Sage", "Warm Tan", "Steel Blue",
  "Desert", "Teal Gray", "Taupe", "Slate", "Mauve",
];

const SKIN: Record<number, { light: string; dark: string; nose: string; n: string }> = {
  0: { light: "#dbb180", dark: "#a66e2c", nose: "#d29d60", n: "Light" },
  1: { light: "#a66e2c", dark: "#85561e", nose: "#8b532c", n: "Medium" },
  2: { light: "#8b532c", dark: "#713f1d", nose: "#723709", n: "Tan" },
  3: { light: "#713f1d", dark: "#562600", nose: "#5a2000", n: "Brown" },
  4: { light: "#562600", dark: "#3d1a00", nose: "#4a1c00", n: "Dark" },
  5: { light: "#ae8b61", dark: "#8b7355", nose: "#c4a47a", n: "Olive" },
  6: { light: "#b8d8b8", dark: "#6b9a6b", nose: "#90c090", n: "Alien" },
  7: { light: "#a0b8d0", dark: "#5a7a90", nose: "#7898b0", n: "Zombie" },
};

const SHIRT: Record<number, { c: string; c2: string; n: string }> = {
  0: { c: "#c9c9c9", c2: "#b1b1b1", n: "Gray Hoodie" },
  1: { c: "#2c3e50", c2: "#1a252f", n: "Navy Hoodie" },
  2: { c: "#1a1a2e", c2: "#0d0d1a", n: "Black Tee" },
  3: { c: "#7f0000", c2: "#5a0000", n: "Red Hoodie" },
  4: { c: "#1b5e20", c2: "#0d3311", n: "Green Tee" },
  5: { c: "#4a148c", c2: "#310d5e", n: "Purple Hoodie" },
  6: { c: "#e65100", c2: "#a13800", n: "Orange Tee" },
  7: { c: "#263238", c2: "#1a2227", n: "Dark Hoodie" },
};

const O = "#000000";

function p(x: number, y: number, c: string): Pixel {
  return { x, y, color: c };
}

function f(x: number, y: number, w: number, h: number, c: string): Pixel[] {
  const px: Pixel[] = [];
  for (let dy = 0; dy < h; dy++)
    for (let dx = 0; dx < w; dx++)
      px.push({ x: x + dx, y: y + dy, color: c });
  return px;
}

function makeBaseHead(s: { light: string; dark: string; nose: string }, shirtColor: string): Pixel[] {
  const L = s.light;
  const D = s.dark;
  const N = s.nose;
  const SC = shirtColor;

  return [
    p(9,7,O), p(10,7,O), p(11,7,O), p(12,7,O), p(13,7,O), p(14,7,O),

    p(8,8,O), p(9,8,L), p(10,8,L), p(11,8,L), p(12,8,L), p(13,8,L), p(14,8,L), p(15,8,O),
    p(7,9,O), p(8,9,L), p(9,9,L), p(10,9,L), p(11,9,L), p(12,9,L), p(13,9,L), p(14,9,L), p(15,9,L), p(16,9,O),
    p(7,10,O), p(8,10,L), p(9,10,L), p(10,10,L), p(11,10,L), p(12,10,L), p(13,10,L), p(14,10,L), p(15,10,L), p(16,10,O),
    p(7,11,O), p(8,11,L), p(9,11,L), p(10,11,L), p(11,11,L), p(12,11,L), p(13,11,L), p(14,11,L), p(15,11,L), p(16,11,O),
    p(6,12,O), p(7,12,L), p(8,12,L), p(9,12,D), p(10,12,D), p(11,12,L), p(12,12,L), p(13,12,D), p(14,12,D), p(15,12,L), p(16,12,O),
    p(6,13,O), p(7,13,L), p(8,13,L), p(9,13,O), p(10,13,N), p(11,13,L), p(12,13,L), p(13,13,N), p(14,13,O), p(15,13,L), p(16,13,O),
    p(6,14,O), p(7,14,O), p(8,14,L), p(9,14,L), p(10,14,L), p(11,14,L), p(12,14,L), p(13,14,L), p(14,14,L), p(15,14,L), p(16,14,O),
    p(7,15,O), p(8,15,L), p(9,15,L), p(10,15,L), p(11,15,L), p(12,15,L), p(13,15,L), p(14,15,L), p(15,15,L), p(16,15,O),
    p(7,16,O), p(8,16,L), p(9,16,L), p(10,16,L), p(11,16,L), p(12,16,L), p(13,16,L), p(14,16,L), p(15,16,L), p(16,16,O),
    p(7,17,O), p(8,17,L), p(9,17,L), p(10,17,L), p(11,17,L), p(12,17,L), p(13,17,L), p(14,17,L), p(15,17,L), p(16,17,O),
    p(7,18,O), p(8,18,L), p(9,18,L), p(10,18,L), p(11,18,L), p(12,18,L), p(13,18,L), p(14,18,L), p(15,18,L), p(16,18,O),
    p(8,19,O), p(9,19,L), p(10,19,L), p(11,19,L), p(12,19,L), p(13,19,L), p(14,19,L), p(15,19,O),
    p(8,20,O), p(9,20,L), p(10,20,O), p(11,20,L), p(12,20,L), p(13,20,L), p(14,20,O),
    p(8,21,O), p(9,21,L), p(10,21,L), p(11,21,O), p(12,21,O), p(13,21,O),
    p(8,22,O), p(9,22,SC), p(10,22,SC), p(11,22,SC), p(12,22,O),
    p(8,23,O), p(9,23,SC), p(10,23,SC), p(11,23,SC), p(12,23,O),
  ];
}

function makeEyes(i: number): { px: Pixel[]; n: string } {
  const W = "#ffffff";
  const e: Record<number, { px: Pixel[]; n: string }> = {
    0: {
      px: [
        p(9,8,O), p(10,8,O), p(13,8,O), p(14,8,O),
        p(8,9,O), p(9,9,W), p(10,9,W), p(11,9,O), p(12,9,O), p(13,9,W), p(14,9,W), p(15,9,O),
        p(8,10,O), p(9,10,W), p(10,10,W), p(11,10,O), p(12,10,O), p(13,10,W), p(14,10,W), p(15,10,O),
        p(9,11,O), p(10,11,O), p(13,11,O), p(14,11,O),
      ],
      n: "Big Eyes",
    },
    1: {
      px: [
        p(9,8,O), p(10,8,O), p(13,8,O), p(14,8,O),
        p(8,9,O), p(9,9,W), p(10,9,W), p(11,9,O), p(12,9,O), p(13,9,W), p(14,9,W), p(15,9,O),
        p(8,10,O), p(9,10,O), p(10,10,O), p(11,10,O), p(12,10,O), p(13,10,O), p(14,10,O), p(15,10,O),
        p(9,11,O), p(10,11,O), p(13,11,O), p(14,11,O),
      ],
      n: "Dot Eyes",
    },
    2: {
      px: [
        ...f(8,8,4,3,O), ...f(12,8,4,3,O),
        p(9,9,W), p(10,9,W),
        p(13,9,W), p(14,9,W),
        p(11,9,O),
      ],
      n: "Regular Glasses",
    },
    3: {
      px: [
        p(9,8,O), p(10,8,O), p(13,8,O), p(14,8,O),
        p(8,9,O), p(9,9,"#27ae60"), p(10,9,"#27ae60"), p(11,9,O), p(12,9,O), p(13,9,"#27ae60"), p(14,9,"#27ae60"), p(15,9,O),
        p(8,10,O), p(9,10,"#27ae60"), p(10,10,"#27ae60"), p(11,10,O), p(12,10,O), p(13,10,"#27ae60"), p(14,10,"#27ae60"), p(15,10,O),
        p(9,11,O), p(10,11,O), p(13,11,O), p(14,11,O),
      ],
      n: "Green Eyes",
    },
    4: {
      px: [
        p(9,8,O), p(10,8,O), p(13,8,O), p(14,8,O),
        p(8,9,O), p(9,9,"#e74c3c"), p(10,9,"#e74c3c"), p(11,9,O), p(12,9,O), p(13,9,"#e74c3c"), p(14,9,"#e74c3c"), p(15,9,O),
        p(8,10,O), p(9,10,"#e74c3c"), p(10,10,"#e74c3c"), p(11,10,O), p(12,10,O), p(13,10,"#e74c3c"), p(14,10,"#e74c3c"), p(15,10,O),
        p(9,11,O), p(10,11,O), p(13,11,O), p(14,11,O),
      ],
      n: "Red Eyes",
    },
    5: {
      px: [
        ...f(8,8,4,3,O), ...f(12,8,4,3,O),
        p(11,8,O), p(11,9,O), p(11,10,O),
        p(9,9,"#e74c3c"), p(10,9,"#e74c3c"),
        p(13,9,"#1a6ed5"), p(14,9,"#1a6ed5"),
      ],
      n: "3D Glasses",
    },
    6: {
      px: [
        ...f(8,7,4,4,O), ...f(12,7,4,4,O),
        p(11,7,O), p(11,8,O), p(11,9,O), p(11,10,O),
        p(9,8,"#ffffff"), p(10,8,"#ffffff"),
        p(9,9,"#1a6ed5"), p(10,9,"#1a6ed5"),
        p(13,8,"#ffffff"), p(14,8,"#ffffff"),
        p(13,9,"#1a6ed5"), p(14,9,"#1a6ed5"),
      ],
      n: "VR Headset",
    },
    7: {
      px: [
        ...f(8,8,4,3,"#1a1a2e"), ...f(12,8,4,3,"#1a1a2e"),
        p(11,8,O), p(11,9,O), p(11,10,O),
      ],
      n: "Sunglasses",
    },
    8: {
      px: [
        ...f(8,8,4,3,O), ...f(12,8,4,3,O),
        p(11,8,O), p(11,9,O), p(11,10,O),
        p(9,9,"#2c3e50"), p(10,9,"#2c3e50"),
        p(13,9,"#2c3e50"), p(14,9,"#2c3e50"),
      ],
      n: "Nerd Glasses",
    },
    9: {
      px: [
        p(9,8,O), p(10,8,O), p(13,8,O), p(14,8,O),
        p(8,9,O), p(9,9,W), p(10,9,O), p(11,9,O), p(12,9,O), p(13,9,W), p(14,9,O), p(15,9,O),
        p(8,10,O), p(9,10,O), p(10,10,W), p(11,10,O), p(12,10,O), p(13,10,O), p(14,10,W), p(15,10,O),
        p(9,11,O), p(10,11,O), p(13,11,O), p(14,11,O),
      ],
      n: "Crazy Eyes",
    },
    10: {
      px: [
        p(9,8,O), p(10,8,O), p(13,8,O), p(14,8,O),
        p(8,9,O), p(11,9,O), p(12,9,O), p(15,9,O),
        p(8,10,O), p(9,10,O), p(10,10,O), p(11,10,O), p(12,10,O), p(13,10,O), p(14,10,O), p(15,10,O),
        p(9,11,O), p(10,11,O), p(13,11,O), p(14,11,O),
      ],
      n: "Sleepy Eyes",
    },
  };
  return e[i % Object.keys(e).length] || e[0];
}

function makeHair(i: number): { px: Pixel[]; n: string } {
  const h: Record<number, { px: Pixel[]; n: string }> = {
    0: { px: [], n: "None" },
    1: {
      px: [
        ...f(8,5,8,2,"#1a1a2e"),
        ...f(7,6,1,4,"#1a1a2e"),
        ...f(16,6,1,4,"#1a1a2e"),
        ...f(6,7,1,3,"#1a1a2e"),
        ...f(17,7,1,3,"#1a1a2e"),
      ],
      n: "Wild Hair",
    },
    2: {
      px: [
        ...f(10,3,4,1,"#e8d44d"),
        ...f(9,4,6,1,"#e8d44d"),
        ...f(9,5,6,2,"#e8d44d"),
      ],
      n: "Mohawk",
    },
    3: {
      px: [
        ...f(9,4,6,1,"#5c3317"),
        ...f(8,5,8,2,"#5c3317"),
        ...f(7,5,1,3,"#5c3317"),
        ...f(16,5,1,3,"#5c3317"),
        ...f(7,7,1,1,"#5c3317"),
        ...f(16,7,1,1,"#5c3317"),
      ],
      n: "Cap Forward",
    },
    4: {
      px: [
        ...f(7,4,10,2,"#8b0000"),
        ...f(8,6,8,1,"#8b0000"),
        ...f(6,5,2,5,"#8b0000"),
        ...f(16,5,2,5,"#8b0000"),
        ...f(5,6,1,4,"#8b0000"),
        ...f(18,6,1,4,"#8b0000"),
      ],
      n: "Red Hair",
    },
    5: {
      px: [
        ...f(8,5,8,2,"#8e44ad"),
        ...f(16,6,2,5,"#8e44ad"),
        ...f(7,6,1,3,"#8e44ad"),
      ],
      n: "Crazy Hair",
    },
    6: {
      px: [
        ...f(9,4,6,1,"#2c3e50"),
        ...f(8,5,8,2,"#2c3e50"),
        ...f(7,6,1,3,"#2c3e50"),
        ...f(16,6,1,3,"#2c3e50"),
        ...f(8,7,8,1,"#2c3e50"),
      ],
      n: "Beanie",
    },
    7: {
      px: [
        ...f(7,5,10,2,"#1a1a2e"),
        ...f(6,6,1,5,"#1a1a2e"),
        ...f(17,6,1,5,"#1a1a2e"),
      ],
      n: "Frumpy Hair",
    },
    8: {
      px: [
        ...f(8,5,8,2,"#e67e22"),
        ...f(6,6,2,5,"#e67e22"),
        ...f(16,6,2,5,"#e67e22"),
        ...f(7,5,1,4,"#e67e22"),
        ...f(16,5,1,4,"#e67e22"),
        ...f(5,7,1,3,"#e67e22"),
        ...f(18,7,1,3,"#e67e22"),
      ],
      n: "Afro",
    },
    9: {
      px: [
        ...f(9,1,6,1,"#1a1a2e"),
        ...f(8,2,8,4,"#1a1a2e"),
        ...f(6,6,2,1,"#1a1a2e"),
        ...f(8,6,8,1,"#1a1a2e"),
        ...f(16,6,2,1,"#1a1a2e"),
      ],
      n: "Top Hat",
    },
    10: {
      px: [
        ...f(8,5,8,2,"#27ae60"),
        ...f(7,6,1,2,"#27ae60"),
        ...f(16,6,1,2,"#27ae60"),
      ],
      n: "Bandana",
    },
    11: {
      px: [
        ...f(7,4,10,3,"#fff68e"),
        ...f(6,5,1,5,"#fff68e"),
        ...f(17,5,1,5,"#fff68e"),
        ...f(5,6,1,4,"#fff68e"),
        ...f(18,6,1,4,"#fff68e"),
      ],
      n: "Blonde Hair",
    },
    12: {
      px: [
        ...f(8,5,8,2,"#c0c0c0"),
        ...f(7,6,1,3,"#c0c0c0"),
        ...f(16,6,1,3,"#c0c0c0"),
      ],
      n: "Silver Hair",
    },
    13: {
      px: [
        ...f(8,3,8,3,"#27ae60"),
        ...f(7,6,1,2,"#27ae60"),
        ...f(8,6,8,1,"#27ae60"),
        ...f(16,6,1,2,"#27ae60"),
      ],
      n: "Green Afro",
    },
    14: {
      px: [
        ...f(9,2,6,2,"#e74c3c"),
        ...f(8,4,8,3,"#e74c3c"),
        ...f(7,5,1,2,"#e74c3c"),
        ...f(16,5,1,2,"#e74c3c"),
      ],
      n: "Red Mohawk",
    },
    15: {
      px: [
        ...f(6,5,12,1,"#795548"),
        ...f(7,6,10,1,"#795548"),
        ...f(5,6,1,4,"#795548"),
        ...f(18,6,1,4,"#795548"),
      ],
      n: "Cowboy Hat",
    },
    16: {
      px: [
        ...f(10,1,4,1,"#f1c40f"),
        ...f(8,2,8,4,"#f1c40f"),
        ...f(7,6,10,1,"#f1c40f"),
      ],
      n: "Gold Crown",
    },
    17: {
      px: [
        ...f(9,3,6,1,"#e91e8c"),
        ...f(8,4,8,3,"#e91e8c"),
        ...f(7,7,10,1,"#e91e8c"),
      ],
      n: "Pink Bob",
    },
  };
  return h[i % Object.keys(h).length] || h[0];
}

function makeMouth(i: number): { px: Pixel[]; n: string } {
  const m: Record<number, { px: Pixel[]; n: string }> = {
    0: {
      px: [
        p(11,16,O), p(12,16,O), p(13,16,O),
      ],
      n: "Neutral",
    },
    1: {
      px: [
        p(10,16,O), p(11,16,O), p(12,16,O), p(13,16,O),
        p(10,17,O), p(13,17,O),
      ],
      n: "Smile",
    },
    2: {
      px: [
        p(10,17,O), p(11,17,O), p(12,17,O), p(13,17,O),
        p(10,16,O), p(13,16,O),
      ],
      n: "Frown",
    },
    3: {
      px: [
        p(10,16,"#c0392b"), p(11,16,"#c0392b"),
        p(12,16,"#c0392b"), p(13,16,"#c0392b"),
      ],
      n: "Red Lipstick",
    },
    4: {
      px: [
        p(10,16,"#cd00cb"), p(11,16,"#cd00cb"),
        p(12,16,"#cd00cb"), p(13,16,"#cd00cb"),
      ],
      n: "Purple Lipstick",
    },
    5: {
      px: [
        p(10,16,O), p(11,16,O),
        p(12,16,O), p(13,16,O),
      ],
      n: "Black Lipstick",
    },
    6: {
      px: [
        p(11,16,O), p(12,16,O), p(13,16,O),
        p(14,15,"#795548"),
        p(15,14,"#795548"),
      ],
      n: "Pipe",
    },
    7: {
      px: [
        p(11,16,O), p(12,16,O), p(13,16,O),
        p(14,16,"#e8d6c4"), p(15,16,"#e8d6c4"),
        p(15,15,"#e74c3c"),
      ],
      n: "Cigarette",
    },
  };
  return m[i % Object.keys(m).length] || m[0];
}

function makeFacialHair(i: number): { px: Pixel[]; n: string } {
  const b: Record<number, { px: Pixel[]; n: string }> = {
    0: { px: [], n: "None" },
    1: {
      px: [
        p(8,14,"#5c3317"), p(9,14,"#5c3317"),
        p(14,14,"#5c3317"), p(15,14,"#5c3317"),
        p(8,15,"#5c3317"), p(15,15,"#5c3317"),
      ],
      n: "Shadow",
    },
    2: {
      px: [
        p(10,17,"#1a1a2e"), p(11,17,"#1a1a2e"), p(12,17,"#1a1a2e"), p(13,17,"#1a1a2e"),
        p(11,18,"#1a1a2e"), p(12,18,"#1a1a2e"),
      ],
      n: "Goatee",
    },
    3: {
      px: [
        p(7,13,"#5c3317"), p(16,13,"#5c3317"),
        p(7,14,"#5c3317"), p(16,14,"#5c3317"),
        p(7,15,"#5c3317"), p(16,15,"#5c3317"),
        p(7,16,"#5c3317"), p(16,16,"#5c3317"),
        p(7,17,"#5c3317"), p(16,17,"#5c3317"),
        p(8,18,"#5c3317"), p(15,18,"#5c3317"),
        p(9,19,"#5c3317"), p(10,19,"#5c3317"), p(11,19,"#5c3317"), p(12,19,"#5c3317"), p(13,19,"#5c3317"), p(14,19,"#5c3317"),
      ],
      n: "Big Beard",
    },
    4: {
      px: [
        p(9,14,"#1a1a2e"), p(10,14,"#1a1a2e"),
        p(13,14,"#1a1a2e"), p(14,14,"#1a1a2e"),
        p(10,15,"#1a1a2e"), p(13,15,"#1a1a2e"),
      ],
      n: "Mustache",
    },
    5: {
      px: [
        p(9,14,"#c4a035"), p(10,14,"#c4a035"),
        p(13,14,"#c4a035"), p(14,14,"#c4a035"),
        p(10,15,"#c4a035"), p(13,15,"#c4a035"),
      ],
      n: "Handlebars",
    },
    6: {
      px: [
        p(10,17,"#5c3317"), p(11,17,"#5c3317"), p(12,17,"#5c3317"), p(13,17,"#5c3317"),
        p(10,18,"#5c3317"), p(11,18,"#5c3317"), p(12,18,"#5c3317"), p(13,18,"#5c3317"),
        p(10,19,"#5c3317"), p(11,19,"#5c3317"), p(12,19,"#5c3317"), p(13,19,"#5c3317"),
      ],
      n: "Chin Strap",
    },
  };
  return b[i % Object.keys(b).length] || b[0];
}

function makeAccessory(i: number): { px: Pixel[]; n: string } {
  const a: Record<number, { px: Pixel[]; n: string }> = {
    0: { px: [], n: "None" },
    1: {
      px: [
        p(5,12,"#f1c40f"), p(5,13,"#f1c40f"), p(5,14,"#f1c40f"),
        p(6,13,"#f1c40f"),
      ],
      n: "Gold Earring",
    },
    2: {
      px: [
        p(5,12,"#bdc3c7"), p(5,13,"#bdc3c7"), p(5,14,"#bdc3c7"),
        p(6,13,"#bdc3c7"),
      ],
      n: "Silver Earring",
    },
    3: {
      px: [
        p(7,8,O), p(8,8,O), p(9,8,O), p(10,8,O),
        p(7,9,O), p(8,9,O), p(9,9,O), p(10,9,O),
        p(7,10,O), p(8,10,O), p(9,10,O), p(10,10,O),
        p(8,11,O), p(9,11,O),
      ],
      n: "Eye Patch",
    },
    4: {
      px: [
        p(7,6,"#e74c3c"), p(8,6,"#e74c3c"), p(9,6,"#e74c3c"),
        p(10,6,"#e74c3c"), p(11,6,"#e74c3c"), p(12,6,"#e74c3c"),
        p(13,6,"#e74c3c"), p(14,6,"#e74c3c"), p(15,6,"#e74c3c"),
        p(16,6,"#e74c3c"),
        p(7,7,"#e74c3c"), p(16,7,"#e74c3c"),
      ],
      n: "Red Headband",
    },
    5: {
      px: [
        p(5,12,"#cd00cb"), p(5,13,"#cd00cb"), p(5,14,"#cd00cb"),
        p(6,13,"#cd00cb"), p(6,14,"#cd00cb"),
      ],
      n: "Purple Earring",
    },
    6: {
      px: [
        p(12,12,"#e8e8e8"), p(12,13,"#c0c0c0"),
      ],
      n: "Nose Ring",
    },
    7: {
      px: [
        p(9,19,"#c9c9c9"), p(10,19,"#c9c9c9"), p(11,19,"#c9c9c9"),
        p(12,19,"#c9c9c9"), p(13,19,"#c9c9c9"), p(14,19,"#c9c9c9"),
        p(10,20,"#c9c9c9"), p(11,20,"#f0d060"), p(12,20,"#c9c9c9"),
      ],
      n: "Chain Necklace",
    },
    8: {
      px: [
        p(9,6,"#f1c40f"), p(10,6,"#f1c40f"), p(11,6,"#f1c40f"),
        p(12,6,"#f1c40f"), p(13,6,"#f1c40f"), p(14,6,"#f1c40f"),
        p(10,5,"#f1c40f"), p(11,5,"#f1c40f"), p(12,5,"#f1c40f"), p(13,5,"#f1c40f"),
      ],
      n: "Crown",
    },
  };
  return a[i % Object.keys(a).length] || a[0];
}

function si(seed: number, len: number): number {
  return ((seed % len) + len) % len;
}

export function generateTraits(
  walletAddress: string,
  tokenId: number,
  timestamp?: number
): {
  traits: Record<string, string>;
  layers: Layer[];
} {
  const ts = timestamp ?? Date.now();
  const seed =
    (tokenId * 31 + walletAddress.charCodeAt(0) * 17 + (ts % 10000)) | 0;

  const bgIdx = si(seed, BG.length);
  const skinIdx = si(seed + 3, Object.keys(SKIN).length);
  const hairIdx = si(seed + 7, 18);
  const eyeIdx = si(seed + 11, 11);
  const mouthIdx = si(seed + 17, 8);
  const beardIdx = si(seed + 23, 7);
  const accIdx = si(seed + 29, 9);
  const shirtIdx = si(seed + 37, Object.keys(SHIRT).length);

  const skin = SKIN[skinIdx];
  const hair = makeHair(hairIdx);
  const eyes = makeEyes(eyeIdx);
  const mouth = makeMouth(mouthIdx);
  const facialHair = makeFacialHair(beardIdx);
  const accessory = makeAccessory(accIdx);
  const shirt = SHIRT[shirtIdx];

  const traits: Record<string, string> = {
    Background: BG_NAMES[bgIdx],
    Skin: skin.n,
    Hair: hair.n,
    Eyes: eyes.n,
    Mouth: mouth.n,
    "Facial Hair": facialHair.n,
    Accessory: accessory.n,
    Shirt: shirt.n,
  };

  return {
    traits,
    layers: [
      { name: "bg", pixels: f(0, 0, 24, 24, BG[bgIdx]) },
      { name: "base", pixels: makeBaseHead(skin, shirt.c) },
      { name: "hair", pixels: hair.px },
      { name: "eyes", pixels: eyes.px },
      { name: "mouth", pixels: mouth.px },
      { name: "beard", pixels: facialHair.px },
      { name: "accessory", pixels: accessory.px },
    ],
  };
}
