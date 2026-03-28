export interface Product {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  badge: string;
  pieces: number;
  price: number;
  originalPrice: number;
  offerLabel: string;
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
    originalPrice: 799,
    offerLabel: "Founder's Price",
    image: "/assets/generated/product-box-signature.dim_800x800.jpg",
    shortDescription:
      "Six masterfully hand-stuffed Medjool dates, draped in Belgian chocolate and finished with edible 24K gold leaf — presented in our signature black lacquer box. The quintessential Miss Luxe experience.",
    description:
      "Welcome to Miss Luxe. The Signature Luxe Box is where every great love affair with luxury begins. Six of our finest Medjool dates — plump, naturally sweet, and sourced from the most pristine groves — are hand-stuffed by our artisans with a rotating selection of our signature fillings: silken pistachio cream, delicate almond blossom, and fragrant rose petal. Each date is then enrobed in 72% Belgian dark chocolate and crowned with a whisper of edible 24K gold leaf. Nestled in our iconic black matte lacquer box, lined with shimmering gold tissue, the Signature Luxe Box is not merely a purchase. It is a declaration — that you have chosen beauty, craftsmanship, and the finest ingredients the world has to offer. Prices are inclusive of premium packaging. Prepaid only.",
    story:
      "The Signature Luxe Box was the first creation to carry the Miss Luxe name — and it remains the truest expression of who we are. Before we chose our dates, we tasted more than forty varieties. Before we selected our chocolate, we sourced from five Belgian suppliers. Before we designed our box, we sketched over a hundred iterations. We obsessed over every dimension — the weight of the lid, the softness of the tissue, the exact silence of the magnetic clasp closing. What emerged was not just a product, but a promise: that Miss Luxe would never compromise. That every single box, regardless of size or price, would be held to the same unrelenting standard of excellence. The Signature Luxe Box is the beginning of that promise.",
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
      "Signature black matte lacquer box · 24K gold foil tissue lining · Handwritten calligraphy note card · Miss Luxe brand ribbon seal",
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
    originalPrice: 1299,
    offerLabel: "Launch Offer",
    image: "/assets/generated/product-box-grand.dim_800x800.jpg",
    shortDescription:
      "Twelve individually hand-crafted date chocolates, each a unique expression of flavour and artistry, presented in a two-tier royal presentation box with gold ribbon and wax seal — the most gifted box in our collection.",
    description:
      "There are gifts, and then there are gestures. The Grand Luxe Box is unmistakably the latter. Twelve of our finest Medjool dates, each hand-stuffed with a distinct filling and individually dressed in premium Belgian chocolate, are arranged in two elegant rows across a royal two-tier presentation box with gold foil stamping and a hand-tied satin ribbon. From the warmth of pure saffron to the opulence of 70% dark chocolate velvet, from the freshness of roasted pistachio to the delicacy of almond blossom — every piece in this collection tells a different story. Together, they tell one of extraordinary taste, rare generosity, and a gifting sensibility that knows no compromise. The Grand Luxe Box is the collection of choice for engagements, Eid celebrations, milestone birthdays, and corporate gifting that leaves a lasting impression. Prices are inclusive of premium packaging. Prepaid only.",
    story:
      "We designed the Grand Luxe Box for the moments that deserve more than a gift — they deserve an experience. When we imagined who would open this box, we thought of the bride receiving it on her engagement morning. The family gathering around it on the first evening of Eid. The colleague who has earned something truly memorable. We wanted the act of unboxing to feel as significant as what was inside — the quiet resistance of the ribbon, the slow lift of the lid revealing two perfect rows of gold-cupped dates, the scent of chocolate and saffron rising to meet you. Every decision — the weight of the paper, the shimmer of the foil, the precise height of each tier — was made with that moment in mind. The Grand Luxe Box is Miss Luxe at its most generous.",
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
      "Royal two-tier black gift box · Hand-tied gold satin ribbon · Individual 24K gold foil cups · Embossed wax seal · Miss Luxe certificate of authenticity · Personalised gift message card",
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
    originalPrice: 1999,
    offerLabel: "Exclusive Offer",
    image: "/assets/generated/product-box-royal.dim_800x800.jpg",
    shortDescription:
      "Eighteen hand-crafted masterpieces presenting the full breadth of the Miss Luxe artisan collection — encased in a black velvet collector box with gold embossed crest, silk ribbon, and brass clasps. For the moments that must be remembered forever.",
    description:
      "Some things in life are not gifts — they are events. The Royal Collector Box is one of them. Eighteen masterfully crafted Medjool dates, each representing a different flavour story from our full artisan collection, are presented in our most extraordinary packaging: a hand-lacquered black velvet collector box bearing the gold-embossed Miss Luxe crest, a silk-lined interior, individually recessed gold foil cups, and brass magnetic clasps that close with the quiet authority of something truly precious. Every flavour in the Miss Luxe repertoire is represented here — from the iconic Royal Pistachio and fragrant Rose Petal Dream to the exotic Walnut Honey, the jewel-toned Cranberry Bliss, and the sophisticated Orange Zest & Dark Chocolate. This is not a box that is opened casually. It is opened with intention, with ceremony, with someone beside you who matters. The Royal Collector Box is our magnum opus — produced in limited batches, available only while stock lasts. Prices are inclusive of premium packaging. Prepaid only.",
    story:
      "The Royal Collector Box began as an answer to a single question: what would we create if we were making something for someone we love above all else — and cost was never a consideration? We started from scratch. We sourced a velvet that had the exact depth of black we imagined. We commissioned a custom embossing die for the Miss Luxe crest. We agonised over the interior — the spacing between each cup, the way the silk lining would catch the light, the positioning of the brass clasps so that the lid opened at precisely the right speed. We tasted every combination of eighteen flavours until we found the arrangement that told the most complete story of who Miss Luxe is. The result is a collector's object that also happens to be the most beautiful gift imaginable. Every batch is handcrafted in limited quantities. Once they are gone, they do not return. This is luxury in its truest sense: rare, deliberate, and made for the irreplaceable.",
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
      "Hand-lacquered black velvet collector box · Gold embossed Miss Luxe crest · Silk-lined interior with individual 24K gold foil cups · Brass magnetic clasp closure · Woven silk ribbon · Miss Luxe certificate of authenticity · Handwritten calligraphy gift card · Priority dispatch",
    occasions: "Weddings · Anniversaries · Corporate · Collector's Edition",
  },
];
