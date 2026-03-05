import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  MessageSquare,
  Minus,
  Package,
  Plus,
  ShoppingBag,
  Thermometer,
} from "lucide-react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { type CartItemCustomisation, useCart } from "../context/CartContext";
import { products } from "../data/products";

interface ProductDetailPageProps {
  onCartOpen?: () => void;
}

const RIBBON_COLORS = ["Gold", "Ivory", "Black", "Blush"] as const;
const PACKAGING_STYLES = [
  "Standard",
  "Premium Velvet",
  "Seasonal Edition",
] as const;

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.style.display = "none";
  const parent = e.currentTarget.parentElement;
  if (parent && !parent.querySelector(".img-fallback")) {
    const fallback = document.createElement("div");
    fallback.className = "img-fallback w-full h-full";
    fallback.style.cssText =
      "position:absolute;inset:0;background:linear-gradient(135deg,#1a1a1a 0%,#0a0a0a 50%,#1a1000 100%)";
    parent.appendChild(fallback);
  }
}

export default function ProductDetailPage({
  onCartOpen,
}: ProductDetailPageProps) {
  const { productId } = useParams({ from: "/product/$productId" });
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "story">(
    "description",
  );

  // Customisation state
  const [giftMessage, setGiftMessage] = useState("");
  const [ribbonColor, setRibbonColor] = useState<string>("Gold");
  const [packagingStyle, setPackagingStyle] = useState<string>("Standard");
  const [greetingCard, setGreetingCard] = useState(false);
  const [_cartOpen, setCartOpen] = useState(false);

  const product = products.find((p) => p.id === productId);

  const handleCartOpen = () => {
    if (onCartOpen) onCartOpen();
    else setCartOpen(true);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center">
        <Navigation onCartOpen={handleCartOpen} />
        <div className="text-center">
          <p className="font-serif text-2xl mb-4 text-luxury-beige">
            Product not found
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="btn-gold text-xs py-3 px-8"
          >
            Return to Collection
          </button>
        </div>
      </div>
    );
  }

  const greetingCardExtra = greetingCard ? 50 : 0;
  const unitPrice = product.price + greetingCardExtra;
  const totalCost = unitPrice * qty;

  const customisation: CartItemCustomisation = {
    giftMessage: giftMessage.trim() || undefined,
    ribbonColor,
    packagingStyle,
    greetingCard: greetingCard || undefined,
  };

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        price: unitPrice,
        image: product.image,
      },
      qty,
      customisation,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const buildWhatsAppHref = () => {
    const lines: string[] = [];
    lines.push("Hello Miss Luxe! 🌹✨");
    lines.push("");
    lines.push("I would like to place an order for your exquisite creation.");
    lines.push("");
    lines.push("*Order Details:*");
    lines.push(`◈ Product: ${product.name}`);
    lines.push(`◈ Quantity: ${qty} box${qty > 1 ? "es" : ""}`);
    if (
      giftMessage.trim() ||
      ribbonColor !== "Gold" ||
      packagingStyle !== "Standard" ||
      greetingCard
    ) {
      lines.push("");
      lines.push("*Personalisation:*");
      if (ribbonColor && ribbonColor !== "Gold")
        lines.push(`◈ Ribbon: ${ribbonColor}`);
      if (packagingStyle && packagingStyle !== "Standard")
        lines.push(`◈ Packaging: ${packagingStyle}`);
      if (greetingCard) lines.push("◈ Greeting Card: Yes (+₹50)");
      if (giftMessage.trim())
        lines.push(`◈ Gift Message: "${giftMessage.trim()}"`);
    }
    lines.push("");
    lines.push(`*Total: ₹${totalCost.toLocaleString("en-IN")}*`);
    lines.push("*Payment Mode: Prepaid*");
    lines.push("");
    lines.push("Kindly share your UPI details and confirm availability.");
    lines.push("");
    lines.push("Thank you! 🌸");
    return `https://wa.me/917045899262?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <div className="min-h-screen bg-luxury-black font-sans">
      <Navigation onCartOpen={handleCartOpen} />

      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="py-4 px-6 lg:px-12 border-b border-luxury-gold/10 bg-[#080808]">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs tracking-widest uppercase">
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="text-luxury-beige/50 hover:text-luxury-gold transition-colors duration-200"
            >
              Home
            </button>
            <ChevronRight size={12} className="text-luxury-beige/30" />
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="text-luxury-beige/50 hover:text-luxury-gold transition-colors duration-200"
            >
              Collection
            </button>
            <ChevronRight size={12} className="text-luxury-beige/30" />
            <span className="text-luxury-gold">{product.name}</span>
          </div>
        </div>

        {/* Product Detail */}
        <section className="py-16 lg:py-24 bg-luxury-black">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Product image */}
              <div className="relative group">
                <div className="absolute -top-4 -left-4 w-full h-full border border-luxury-gold/20 transition-all duration-500 group-hover:-top-6 group-hover:-left-6 pointer-events-none" />
                <div
                  className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-amber-950/40"
                  style={{ aspectRatio: "1/1" }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 relative z-[1]"
                    decoding="async"
                    onError={handleImgError}
                  />
                  <div className="absolute top-6 left-6 z-[2] bg-luxury-gold text-luxury-black px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
                    {product.badge}
                  </div>
                  <div className="absolute top-6 right-6 z-[2] border border-luxury-gold/60 text-luxury-gold text-[9px] font-sans uppercase tracking-widest px-2.5 py-1.5 bg-black/70 backdrop-blur-sm">
                    Prepaid Only
                  </div>
                </div>
              </div>

              {/* Product info */}
              <div className="flex flex-col justify-center">
                <p className="font-sans text-xs tracking-[0.35em] uppercase text-luxury-gold mb-2">
                  Miss Luxe · {product.subtitle}
                </p>

                <h1 className="font-serif text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-luxury-beige mb-4">
                  {product.name}
                </h1>

                <p className="font-serif text-luxury-beige/80 text-lg italic mb-5">
                  {product.tagline}
                </p>

                <div className="w-16 h-px bg-luxury-gold/50 mb-6" />

                {/* Price */}
                <div className="flex items-center gap-4 mb-1">
                  <span className="font-serif text-4xl font-bold text-luxury-gold">
                    ₹{unitPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium tracking-[0.12em] uppercase border border-luxury-gold/40 text-luxury-gold bg-luxury-gold/10">
                    Prepaid Only
                  </span>
                </div>
                <p className="font-sans text-xs text-luxury-beige/40 mb-5">
                  {product.pieces} pieces · Prices inclusive of premium
                  packaging
                </p>

                {/* Flavours */}
                {product.flavours.length > 0 && (
                  <div className="mb-6">
                    <p className="font-sans text-luxury-gold/60 text-[10px] tracking-[0.4em] uppercase mb-3">
                      Flavours Included
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.flavours.map((f) => (
                        <span
                          key={f}
                          className="font-sans text-[10px] tracking-widest uppercase text-luxury-gold border border-luxury-gold/30 px-3 py-1 bg-luxury-gold/5"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tabs: Description / Story */}
                <div className="mb-6">
                  <div className="flex border-b border-luxury-gold/15 mb-4">
                    <button
                      type="button"
                      onClick={() => setActiveTab("description")}
                      className={`font-sans text-xs tracking-widest uppercase py-2 px-4 transition-all duration-200 ${
                        activeTab === "description"
                          ? "text-luxury-gold border-b-2 border-luxury-gold"
                          : "text-luxury-beige/50 hover:text-luxury-beige"
                      }`}
                    >
                      Description
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("story")}
                      className={`font-sans text-xs tracking-widest uppercase py-2 px-4 transition-all duration-200 ${
                        activeTab === "story"
                          ? "text-luxury-gold border-b-2 border-luxury-gold"
                          : "text-luxury-beige/50 hover:text-luxury-beige"
                      }`}
                    >
                      Our Story
                    </button>
                  </div>
                  <p className="font-sans font-light text-sm leading-8 text-luxury-beige/90">
                    {activeTab === "description"
                      ? product.description
                      : product.story}
                  </p>
                </div>

                {/* Quantity + Total */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-xs uppercase tracking-widest text-luxury-beige/50">
                      Qty
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        disabled={qty <= 1}
                        className="w-8 h-8 border border-luxury-gold/30 text-luxury-beige/70 hover:border-luxury-gold hover:text-luxury-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-sans text-luxury-beige text-base font-medium w-8 text-center">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty((q) => Math.min(8, q + 1))}
                        disabled={qty >= 8}
                        className="w-8 h-8 border border-luxury-gold/30 text-luxury-beige/70 hover:border-luxury-gold hover:text-luxury-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  {qty > 1 && (
                    <p className="font-sans text-luxury-beige/60 text-sm">
                      Total:{" "}
                      <span className="text-luxury-gold font-semibold text-base">
                        ₹{totalCost.toLocaleString("en-IN")}
                      </span>
                    </p>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-10">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="btn-gold flex items-center justify-center gap-2 text-xs py-4 px-8 flex-1"
                  >
                    <ShoppingBag size={16} />
                    {added ? "Added to Cart ✓" : "Add to Cart"}
                  </button>
                  <a
                    href={buildWhatsAppHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-4 px-8 text-xs font-medium tracking-widest uppercase transition-all duration-300 flex-1 text-white"
                    style={{ backgroundColor: "oklch(0.52 0.17 145)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "oklch(0.45 0.17 145)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "oklch(0.52 0.17 145)";
                    }}
                  >
                    <SiWhatsapp size={16} />
                    Order on WhatsApp
                  </a>
                </div>

                {/* Product specs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 mb-4 bg-luxury-black border border-luxury-gold/10">
                  <div className="flex flex-col items-center text-center gap-2">
                    <Package size={18} className="text-luxury-gold" />
                    <span className="text-xs tracking-[0.1em] uppercase font-medium text-luxury-beige/50">
                      Net Weight
                    </span>
                    <span className="font-sans text-sm font-medium text-luxury-beige">
                      {product.netWeight}
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <Clock size={18} className="text-luxury-gold" />
                    <span className="text-xs tracking-[0.1em] uppercase font-medium text-luxury-beige/50">
                      Shelf Life
                    </span>
                    <span className="font-sans text-sm font-medium text-luxury-beige text-center">
                      {product.shelfLife}
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <Thermometer size={18} className="text-luxury-gold" />
                    <span className="text-xs tracking-[0.1em] uppercase font-medium text-luxury-beige/50">
                      Storage
                    </span>
                    <span className="font-sans text-xs text-center text-luxury-beige/70">
                      {product.storageInstructions}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Personalise Your Box */}
            <div className="mt-16 p-8 lg:p-12 border border-luxury-gold/15 bg-[#0d0d0d]">
              <div className="flex items-center gap-4 mb-2">
                <MessageSquare size={20} className="text-luxury-gold" />
                <h2 className="font-serif text-2xl font-bold text-luxury-beige">
                  Personalise Your Box
                </h2>
              </div>
              <div className="w-12 h-px bg-luxury-gold/50 mb-8" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Gift Message */}
                <div>
                  <label
                    htmlFor="gift-message"
                    className="block font-sans text-xs uppercase tracking-[0.15em] text-luxury-gold mb-3"
                  >
                    Gift Message
                  </label>
                  <textarea
                    id="gift-message"
                    value={giftMessage}
                    onChange={(e) =>
                      setGiftMessage(e.target.value.slice(0, 120))
                    }
                    placeholder="Write a personal message for the recipient..."
                    maxLength={120}
                    rows={3}
                    className="w-full bg-luxury-black border border-luxury-gold/20 focus:border-luxury-gold/60 outline-none text-luxury-beige/80 font-sans text-sm font-light placeholder:text-luxury-beige/25 px-4 py-3 resize-none transition-colors"
                  />
                  <p className="font-sans text-luxury-beige/30 text-xs mt-1 text-right">
                    {giftMessage.length}/120
                  </p>
                </div>

                <div>
                  {/* Ribbon Color */}
                  <p className="font-sans text-xs uppercase tracking-[0.15em] text-luxury-gold mb-3">
                    Ribbon Colour
                  </p>
                  <div className="flex gap-2 flex-wrap mb-6">
                    {RIBBON_COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setRibbonColor(color)}
                        className={`px-4 py-2 font-sans text-xs uppercase tracking-widest transition-all duration-200 border ${
                          ribbonColor === color
                            ? "border-luxury-gold bg-luxury-gold text-luxury-black"
                            : "border-luxury-gold/30 text-luxury-beige/60 hover:border-luxury-gold/70 hover:text-luxury-beige"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>

                  {/* Packaging Style */}
                  <p className="font-sans text-xs uppercase tracking-[0.15em] text-luxury-gold mb-3">
                    Packaging Style
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {PACKAGING_STYLES.map((style) => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setPackagingStyle(style)}
                        className={`px-4 py-2 font-sans text-xs uppercase tracking-widest transition-all duration-200 border ${
                          packagingStyle === style
                            ? "border-luxury-gold bg-luxury-gold text-luxury-black"
                            : "border-luxury-gold/30 text-luxury-beige/60 hover:border-luxury-gold/70 hover:text-luxury-beige"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Greeting Card toggle */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setGreetingCard((prev) => !prev)}
                  className={`flex items-center gap-3 px-5 py-3 font-sans text-xs uppercase tracking-widest transition-all duration-200 border ${
                    greetingCard
                      ? "border-luxury-gold bg-luxury-gold text-luxury-black"
                      : "border-luxury-gold/30 text-luxury-beige/60 hover:border-luxury-gold/70 hover:text-luxury-beige"
                  }`}
                >
                  <span
                    className={`w-4 h-4 border-2 flex items-center justify-center transition-colors ${
                      greetingCard
                        ? "border-luxury-black bg-luxury-black"
                        : "border-luxury-gold/50"
                    }`}
                  >
                    {greetingCard && (
                      <span className="text-luxury-gold text-[10px] font-bold leading-none">
                        ✓
                      </span>
                    )}
                  </span>
                  Add Greeting Card (+₹50)
                </button>
              </div>
            </div>

            {/* Ingredients section */}
            <div className="mt-8 p-8 lg:p-12 bg-[#0e0e0e] border border-luxury-gold/10">
              <h2 className="font-serif text-2xl font-bold text-luxury-beige mb-2">
                Ingredients
              </h2>
              <div className="w-12 h-px bg-luxury-gold/50 mb-6" />
              <p className="font-sans font-light text-sm text-luxury-beige/80 mb-6">
                Every ingredient is carefully sourced to meet our exacting
                standards of quality and purity.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {product.ingredientsList.map((ingredient) => (
                  <li
                    key={ingredient}
                    className="flex items-center gap-3 font-sans text-sm font-light text-luxury-beige/75"
                  >
                    <span className="text-luxury-gold">◈</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* What's Included */}
            <div className="mt-8 p-8 border border-luxury-gold/10 bg-luxury-black">
              <h2 className="font-serif text-xl font-bold text-luxury-beige mb-4">
                What's Included
              </h2>
              <p className="font-sans font-light text-sm text-luxury-beige/70 leading-relaxed">
                {product.includes}
              </p>
            </div>

            {/* Back button */}
            <div className="mt-12">
              <button
                type="button"
                onClick={() => navigate({ to: "/" })}
                className="flex items-center gap-2 font-sans text-sm tracking-widest uppercase text-luxury-beige/50 hover:text-luxury-gold transition-colors duration-200"
              >
                <ArrowLeft size={16} />
                Back to Collection
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}
