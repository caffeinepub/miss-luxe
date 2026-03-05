import { useEffect, useRef } from "react";

const IMG_FALLBACK_HANDLER = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  img.style.display = "none";
  const parent = img.parentElement;
  if (parent && !parent.querySelector(".img-fallback")) {
    const fallback = document.createElement("div");
    fallback.className =
      "img-fallback w-full h-full bg-gradient-to-br from-zinc-900 via-black to-amber-950";
    fallback.style.position = "absolute";
    fallback.style.inset = "0";
    parent.appendChild(fallback);
  }
};

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProducts = () => {
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const _scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen min-h-[640px] overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax */}
      <div ref={heroRef} className="absolute inset-0 will-change-transform">
        {/* Fallback gradient always present behind image */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-amber-950" />
        <img
          src="/assets/generated/hero-banner.dim_1600x900.jpg"
          alt="Miss Luxe luxury chocolate dates"
          className="w-full h-full object-cover relative z-[1]"
          loading="eager"
          decoding="async"
          onError={IMG_FALLBACK_HANDLER}
        />
      </div>

      {/* Overlays - lighter so image is clearly visible */}
      <div className="absolute inset-0 bg-luxury-black/35 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/10 via-transparent to-luxury-black/80 z-[2]" />

      {/* Decorative corner ornaments */}
      <div className="absolute top-24 left-8 w-20 h-20 border-t-2 border-l-2 border-luxury-gold/50 z-[3] hidden md:block" />
      <div className="absolute top-24 right-8 w-20 h-20 border-t-2 border-r-2 border-luxury-gold/50 z-[3] hidden md:block" />
      <div className="absolute bottom-20 left-8 w-20 h-20 border-b-2 border-l-2 border-luxury-gold/50 z-[3] hidden md:block" />
      <div className="absolute bottom-20 right-8 w-20 h-20 border-b-2 border-r-2 border-luxury-gold/50 z-[3] hidden md:block" />

      {/* Content */}
      <div className="relative z-[3] text-center px-4 max-w-5xl mx-auto">
        {/* Top ornament */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-8 h-px bg-luxury-gold/60" />
          <p className="font-sans text-luxury-gold text-[11px] tracking-[0.6em] uppercase opacity-90">
            Artisan Luxury Chocolates
          </p>
          <div className="w-8 h-px bg-luxury-gold/60" />
        </div>

        {/* Brand name */}
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-luxury-beige tracking-[0.2em] uppercase mb-4 leading-none">
          Miss Luxe
        </h1>

        {/* Decorative rule */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-16 h-px bg-luxury-gold/80" />
          <div className="w-1.5 h-1.5 bg-luxury-gold/80 rotate-45" />
          <div className="w-16 h-px bg-luxury-gold/80" />
        </div>

        {/* Tagline */}
        <p className="font-serif text-luxury-beige/85 text-xl md:text-2xl lg:text-3xl italic font-light mb-3 max-w-2xl mx-auto leading-relaxed">
          Handcrafted Luxury Date Chocolates
        </p>
        <p className="font-sans text-luxury-gold text-sm font-light mb-10 tracking-widest uppercase">
          From ₹399 · Prepaid Only · All India Shipping
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            type="button"
            onClick={scrollToProducts}
            className="btn-gold px-12 py-4 text-sm tracking-[0.25em]"
          >
            Explore Collection
          </button>
          <a
            href={`https://wa.me/917045899262?text=${encodeURIComponent("Hello Miss Luxe! 🌹✨\n\nI'd like to enquire about your luxury date chocolate collection.\n\nCould you please help me place an order?\n\nThank you!")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-luxury-gold/60 text-luxury-gold hover:bg-luxury-gold/10 transition-all duration-300 px-12 py-4 text-sm tracking-[0.25em] font-sans uppercase text-center"
          >
            Order on WhatsApp
          </a>
        </div>

        {/* Product tier strip */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          {[
            { label: "6 Pieces", price: "₹399" },
            { label: "12 Pieces", price: "₹699" },
            { label: "18 Pieces", price: "₹1,199" },
          ].map((tier, i) => (
            <div key={tier.label} className="flex items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full" />
                <span className="font-sans text-luxury-gold/80 text-xs tracking-[0.3em] uppercase">
                  {tier.label} — {tier.price}
                </span>
              </div>
              {i < 2 && (
                <div className="hidden sm:block w-px h-4 bg-luxury-gold/30" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Gold shimmer strip at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 z-[3]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.78 0.12 80 / 0.6) 30%, oklch(0.78 0.12 80 / 0.9) 50%, oklch(0.78 0.12 80 / 0.6) 70%, transparent 100%)",
        }}
      />

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-luxury-gold/50 z-[3]">
        <span className="font-sans text-[10px] tracking-[0.5em] uppercase">
          Scroll
        </span>
        <div className="w-px h-8 bg-luxury-gold/40 animate-pulse" />
      </div>
    </section>
  );
}
