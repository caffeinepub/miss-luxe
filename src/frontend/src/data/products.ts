export interface Product {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  badge: string;
  pieces: number;
  price: number;
  image: string;
  description: string;
  story: string;
  flavours: string[];
  ingredients: string;
  ingredientsList: string[];
  netWeight: string;
  shelfLife: string;
  storageInstructions: string;
  includes: string;
  occasions: string;
  shortDescription: string;
}

export const products: Product[] = [
  {
    id: "signature",
    name: "Signature Luxe Box",
    subtitle: "Our Iconic Debut",
    tagline: "The perfect introduction to Miss Luxe",
    badge: "Bestseller",
    pieces: 6,
    price: 399,
    image: "/assets/generated/product-box-signature.dim_800x800.jpg",
    shortDescription:
      "Six handcrafted date chocolates in our signature black lacquer box — the ideal luxury gift.",
    description:
      "Begin your Miss Luxe journey with our Signature Luxe Box — six handpicked premium Medjool dates, each carefully hand-stuffed with our finest fillings and finished with edible gold leaf. Nestled in a bespoke black matte box with gold-foil lining, this is the quintessential expression of artisanal luxury gifting. Every piece is a testament to our unwavering commitment to quality and craftsmanship. Whether you are discovering us for the first time or gifting a loved one, the Signature Luxe Box speaks in the language of elegance.",
    story:
      "Born from a desire to redefine gifting in India, the Signature Luxe Box was our first creation — and it remains our most beloved. Every date is selected for its caramel richness, plumpness, and natural sweetness before being hand-crafted by our artisans. We obsessed over every detail — the weight of the box, the sheen of the foil, the exact moment the chocolate sets to a perfect snap. What emerged was not just a product, but a promise: that Miss Luxe would never compromise on what it means to give beautifully.",
    flavours: ["Royal Pistachio", "Almond Blossom", "Rose Petal Dream"],
    ingredients:
      "Premium Medjool dates, Iranian pistachios, California almonds, organic dried rose petals, edible 24K gold leaf, 72% Belgian dark chocolate, natural flavourings",
    ingredientsList: [
      "Premium Medjool Dates",
      "Iranian Pistachios",
      "California Almonds",
      "Organic Dried Rose Petals",
      "Edible 24K Gold Leaf",
      "72% Belgian Dark Chocolate",
      "Natural Flavourings",
    ],
    netWeight: "180g (6 pieces)",
    shelfLife: "14 days from production date",
    storageInstructions:
      "Store in a cool, dry place below 25°C. Refrigerate after opening.",
    includes:
      "Premium black matte box, gold foil tissue, handwritten note card",
    occasions: "Daily Indulgence · Gifting · Celebrations",
  },
  {
    id: "grand",
    name: "Grand Luxe Box",
    subtitle: "The Art of Gifting",
    tagline: "Crafted for life's most cherished celebrations",
    badge: "Most Gifted",
    pieces: 12,
    price: 699,
    image: "/assets/generated/product-box-grand.dim_800x800.jpg",
    shortDescription:
      "Twelve handcrafted date chocolates in a royal two-tier box — perfect for engagements, Eid, and birthdays.",
    description:
      "Twelve exquisite hand-crafted dates arranged in two elegant rows, each a unique expression of flavour and artistry. The Grand Luxe Box is our most popular gifting choice for engagements, Eid celebrations, birthdays, and corporate gifting. Every piece is a conversation — from the warmth of saffron to the luxury of dark chocolate, from the freshness of pistachio to the delicate perfume of rose. Presented in a royal two-tier presentation box with gold foil stamping and a hand-tied satin ribbon, this box announces its presence the moment it is placed in someone's hands.",
    story:
      "Designed for the moments that deserve more — the Grand Luxe Box doubles the indulgence and triples the impression. When we created this collection, we thought about the woman opening a gift at her engagement. The family gathered for Eid. The colleague celebrating a promotion. Each date in this collection tells a different flavour story, and together they tell one of generosity, sophistication, and care. This is what Miss Luxe was made for.",
    flavours: [
      "Royal Pistachio",
      "Almond Blossom",
      "Rose Petal Dream",
      "Saffron Gold",
      "Dark Chocolate Velvet",
      "Cashew Crown",
    ],
    ingredients:
      "Premium Medjool dates, Iranian pistachios, California almonds, organic rose petals, pure saffron, premium dark chocolate (70% cacao), cashews, edible 24K gold leaf",
    ingredientsList: [
      "Premium Medjool Dates",
      "Iranian Pistachios",
      "California Almonds",
      "Organic Rose Petals",
      "Pure Saffron",
      "Premium Dark Chocolate (70% cacao)",
      "Roasted Cashews",
      "Edible 24K Gold Leaf",
    ],
    netWeight: "360g (12 pieces)",
    shelfLife: "14 days from production date",
    storageInstructions:
      "Store in a cool, dry place below 25°C. Refrigerate after opening.",
    includes:
      "Premium black gift box with gold ribbon, individual gold foil cups, brand certificate of authenticity",
    occasions: "Engagements · Eid · Birthdays · Corporate",
  },
  {
    id: "royal",
    name: "Royal Collector Box",
    subtitle: "The Ultimate Statement",
    tagline: "The pinnacle of luxury gifting",
    badge: "Limited Edition",
    pieces: 18,
    price: 1199,
    image: "/assets/generated/product-box-royal.dim_800x800.jpg",
    shortDescription:
      "Eighteen handcrafted masterpieces in a multi-tier velvet-lined lacquer box — the ultimate expression of luxury.",
    description:
      "For those who accept nothing less than extraordinary. The Royal Collector Box presents eighteen masterfully crafted dates in our most opulent packaging — a black velvet box with gold embossed Miss Luxe crest, satin interior, and individually cupped dates that showcase the full breadth of our artisan collection. This is not simply a gift. It is an event. A declaration of exceptional taste and profound generosity. Reserved for weddings, milestone anniversaries, and the kind of moments that deserve to be remembered forever.",
    story:
      "The Royal Collector Box is our magnum opus — a collector's piece that doubles as a gifting masterpiece. When we set out to create the ultimate Miss Luxe experience, we began with a single question: what would we give to someone we love above all else? The answer was this — eighteen dates, each filled with a different story, each wrapped in chocolate and gold, each placed with the reverence of something irreplaceable. Every batch is handcrafted in limited quantities. Once they are gone, they are gone. This is luxury in its truest sense: rare, deliberate, and never mass-produced.",
    flavours: [
      "Royal Pistachio",
      "Almond Blossom",
      "Rose Petal Dream",
      "Saffron Gold",
      "Dark Chocolate Velvet",
      "Cashew Crown",
      "Walnut Honey",
      "Cranberry Bliss",
      "Orange Zest & Dark Chocolate",
    ],
    ingredients:
      "Premium Medjool dates, Iranian pistachios, California almonds, organic rose petals, pure saffron, premium dark chocolate (70% cacao), cashews, walnuts, raw honey, dried cranberries, organic orange zest, edible 24K gold leaf",
    ingredientsList: [
      "Premium Medjool Dates",
      "Iranian Pistachios",
      "California Almonds",
      "Organic Rose Petals",
      "Pure Saffron",
      "Premium Dark Chocolate (70% cacao)",
      "Roasted Cashews",
      "Walnuts",
      "Raw Honey",
      "Dried Cranberries",
      "Organic Orange Zest",
      "Edible 24K Gold Leaf",
    ],
    netWeight: "540g (18 pieces)",
    shelfLife: "14 days from production date",
    storageInstructions:
      "Store in a cool, dry place below 25°C. Refrigerate after opening.",
    includes:
      "Black velvet collector box with gold embossing, silk ribbon, individual gold foil cups, Miss Luxe certificate of authenticity, complimentary gift message card",
    occasions: "Weddings · Anniversaries · Corporate",
  },
];
