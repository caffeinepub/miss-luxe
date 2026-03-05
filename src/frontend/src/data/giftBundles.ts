export interface GiftBundle {
  id: string;
  name: string;
  price: number;
  pieces: number;
  description: string;
  highlights: string[];
  image: string;
  tier: "signature" | "grand" | "royal";
  occasion?: string;
}

export const giftBundles: GiftBundle[] = [
  {
    id: "signature-luxe-box",
    name: "Signature Luxe Box",
    price: 399,
    pieces: 6,
    description:
      "Six hand-crafted Medjool date chocolates, each filled with a signature Miss Luxe flavour and finished with 24K edible gold leaf. Presented in our iconic black lacquer box — elegant enough to give, indulgent enough to keep.",
    highlights: [
      "6 handcrafted stuffed Medjool dates",
      "Signature black lacquer gift box",
      "24K edible gold leaf finish",
      "Hand-tied satin ribbon",
      "Personalised calligraphy note card",
    ],
    image: "/assets/generated/product-box-signature.dim_800x800.jpg",
    tier: "signature",
    occasion: "Everyday Gifting",
  },
  {
    id: "grand-luxe-box",
    name: "Grand Luxe Box",
    price: 699,
    pieces: 12,
    description:
      "Twelve exquisite date chocolates, each a distinct flavour story — pistachio, rose, saffron, dark chocolate velvet, and more. Arranged in a royal two-tier presentation box with gold foil stamping, satin ribbon, and embossed wax seal. Our most beloved gifting choice for engagements, Eid, and birthdays.",
    highlights: [
      "12 handcrafted stuffed dates across 6 flavours",
      "Royal two-tier black presentation box",
      "Gold foil stamping & embossed wax seal",
      "Hand-tied gold satin ribbon",
      "Luxury tissue wrapping",
      "Personalised message card",
    ],
    image: "/assets/generated/product-box-grand.dim_800x800.jpg",
    tier: "grand",
    occasion: "Engagements, Eid, Birthdays",
  },
  {
    id: "royal-collector-box",
    name: "Royal Collector Box",
    price: 1199,
    pieces: 18,
    description:
      "The pinnacle of the Miss Luxe collection. Eighteen hand-crafted masterpieces representing our complete flavour repertoire, encased in a hand-lacquered black velvet box with gold embossed crest, silk lining, and brass clasps. Produced in limited batches. For weddings, landmark anniversaries, and gestures that leave no room for doubt.",
    highlights: [
      "18 handcrafted dates — full flavour collection",
      "Hand-lacquered black velvet collector box",
      "Gold embossed Miss Luxe crest",
      "Silk-lined interior with individual gold cups",
      "Brass magnetic clasp closure",
      "Handwritten calligraphy gift card",
      "Priority dispatch",
    ],
    image: "/assets/generated/product-box-royal.dim_800x800.jpg",
    tier: "royal",
    occasion: "Weddings, Anniversaries, Corporate",
  },
];
