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
      "An elegant introduction to the world of Miss Luxe — six handcrafted stuffed dates in our signature black lacquer box. The perfect luxury gift for any occasion.",
    highlights: [
      "6 handcrafted stuffed dates",
      "Signature black lacquer box",
      "Gold foil stamping",
      "Hand-tied satin ribbon",
      "Personalised gift card",
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
      "Crafted for life's most cherished celebrations — engagements, Eid, birthdays. Twelve exquisite date chocolates in a royal two-tier presentation box with royal packaging.",
    highlights: [
      "12 handcrafted stuffed dates",
      "Royal two-tier presentation box",
      "Assorted signature flavours",
      "Gold ribbon and wax seal",
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
      "The pinnacle of luxury gifting — eighteen magnificent handcrafted masterpieces in a multi-tier lacquer box with velvet lining, gold embossing, and brass clasps.",
    highlights: [
      "18 handcrafted stuffed dates",
      "Multi-tier lacquer box with velvet lining",
      "Gold embossing and brass clasps",
      "Full assortment of all signature flavours",
      "Complimentary gift wrapping",
      "Handwritten calligraphy card",
      "Priority dispatch",
    ],
    image: "/assets/generated/product-box-royal.dim_800x800.jpg",
    tier: "royal",
    occasion: "Weddings, Anniversaries, Corporate",
  },
];
