import { useEffect, useRef, useState } from "react";

const flavours = [
  {
    id: "pistachio",
    name: "Royal Pistachio Cream",
    description:
      "Roasted pistachios blended into velvety cream, draped in 72% dark Belgian chocolate",
    image: "/assets/generated/flavour-pistachio.dim_600x600.jpg",
    accent: "Bestseller",
  },
  {
    id: "almond-rose",
    name: "Almond Rose",
    description:
      "Delicate almond paste infused with rose water, enrobed in white Belgian chocolate",
    image: "/assets/generated/flavour-almond-rose.dim_600x600.jpg",
    accent: "Romantic",
  },
  {
    id: "saffron-caramel",
    name: "Saffron Caramel",
    description:
      "Golden saffron woven through silken caramel, finished with fleur de sel and milk chocolate",
    image: "/assets/generated/flavour-saffron-caramel.dim_600x600.jpg",
    accent: "Signature",
  },
  {
    id: "assorted",
    name: "Assorted Collection",
    description:
      "The full Miss Luxe experience — all signature flavours in one magnificent arrangement",
    image: "/assets/generated/flavour-assorted.dim_600x600.jpg",
    accent: "All Flavours",
  },
];

function FlavourCard({
  flavour,
  index,
}: { flavour: (typeof flavours)[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    img.style.display = "none";
    const parent = img.parentElement;
    if (parent && !parent.querySelector(".img-fallback")) {
      const fallback = document.createElement("div");
      fallback.className =
        "img-fallback w-full h-full bg-gradient-to-br from-zinc-900 via-amber-950/40 to-black";
      fallback.style.position = "absolute";
      fallback.style.inset = "0";
      parent.appendChild(fallback);
    }
  };

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-zinc-900 via-amber-950/30 to-black">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-amber-950/30 to-black animate-pulse" />
        )}
        <img
          src={flavour.image}
          alt={flavour.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={handleImgError}
        />
        {/* Gradient overlay — lighter so image shows */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Accent badge */}
        <div className="absolute top-4 left-4">
          <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-luxury-gold border border-luxury-gold/50 px-2 py-1 bg-black/60 backdrop-blur-sm">
            {flavour.accent}
          </span>
        </div>

        {/* Hover shimmer */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, transparent 30%, oklch(0.78 0.12 80 / 0.08) 50%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6 bg-luxury-black border border-luxury-gold/10 group-hover:border-luxury-gold/30 transition-colors duration-300">
        <h3 className="font-display text-xl text-luxury-beige mb-2 leading-tight">
          {flavour.name}
        </h3>
        <div className="w-8 h-px bg-luxury-gold/50 mb-3 group-hover:w-16 transition-all duration-500" />
        <p className="font-sans text-luxury-beige/80 text-xs leading-relaxed">
          {flavour.description}
        </p>
      </div>
    </div>
  );
}

export default function FlavourSection() {
  return (
    <section className="py-20 md:py-32 bg-luxury-black relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 50%, oklch(0.78 0.12 80) 0%, transparent 50%), radial-gradient(circle at 75% 50%, oklch(0.78 0.12 80) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-luxury-gold text-[11px] tracking-[0.6em] uppercase mb-4 opacity-80">
            The Art of Flavour
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-luxury-beige mb-4 italic">
            Signature Flavours
          </h2>
          <p className="font-sans text-luxury-beige/50 text-sm font-light mb-6 max-w-xl mx-auto">
            Each flavour is a carefully composed experience — premium
            ingredients, hand-finished with precision and artistry
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-luxury-gold/50" />
            <div className="w-1.5 h-1.5 bg-luxury-gold/50 rotate-45" />
            <div className="w-8 h-px bg-luxury-gold/50" />
          </div>
        </div>

        {/* 4-column flavour grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flavours.map((flavour, index) => (
            <FlavourCard key={flavour.id} flavour={flavour} index={index} />
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <p className="font-sans text-luxury-beige/30 text-xs tracking-widest uppercase">
            All flavours are available across our product range
          </p>
        </div>
      </div>
    </section>
  );
}
