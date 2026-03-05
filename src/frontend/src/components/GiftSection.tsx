import { giftBundles } from "../data/giftBundles";

export default function GiftSection() {
  return (
    <section id="gifts" className="py-20 md:py-32 bg-luxury-black">
      {/* Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden mb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-amber-950/40" />
        <img
          src="/assets/generated/gift-banner.dim_1920x600.jpg"
          alt="Miss Luxe gift collections"
          className="w-full h-full object-cover absolute inset-0 z-[1]"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const img = e.currentTarget;
            img.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/60 via-luxury-black/30 to-luxury-black/60 z-[2]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-[3]">
          <p className="font-sans text-luxury-gold text-xs tracking-[0.5em] uppercase mb-4">
            For Every Occasion
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-luxury-beige mb-6">
            Luxury Gift Collections
          </h2>
          <div className="w-16 h-px bg-luxury-gold mx-auto mb-6" />
          <a
            href="https://wa.me/917045899262?text=I'm%20interested%20in%20your%20gift%20collections"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-10 py-3 text-sm tracking-widest"
          >
            Shop Gift Sets
          </a>
        </div>
      </div>

      {/* Gift Bundles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {giftBundles.map((bundle) => (
            <div
              key={bundle.id}
              className="group border border-luxury-gold/10 hover:border-luxury-gold/40 transition-all duration-500"
            >
              <div className="relative overflow-hidden aspect-square bg-gradient-to-br from-zinc-900 via-black to-amber-950/40">
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 relative z-[1]"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.style.display = "none";
                    const parent = img.parentElement;
                    if (parent && !parent.querySelector(".img-fallback")) {
                      const fallback = document.createElement("div");
                      fallback.className =
                        "img-fallback w-full h-full bg-gradient-to-br from-zinc-900 via-black to-amber-950/40";
                      fallback.style.position = "absolute";
                      fallback.style.inset = "0";
                      parent.appendChild(fallback);
                    }
                  }}
                />
                {/* Tier badge */}
                <div className="absolute top-3 left-3">
                  {bundle.tier === "signature" && (
                    <span className="bg-luxury-gold text-luxury-black text-[10px] font-sans font-bold uppercase tracking-widest px-2.5 py-1">
                      Bestseller
                    </span>
                  )}
                  {bundle.tier === "grand" && (
                    <span className="bg-luxury-gold text-luxury-black text-[10px] font-sans font-bold uppercase tracking-widest px-2.5 py-1">
                      Gift Favourite
                    </span>
                  )}
                  {bundle.tier === "royal" && (
                    <span className="bg-luxury-gold text-luxury-black text-[10px] font-sans font-bold uppercase tracking-widest px-2.5 py-1">
                      Limited Edition
                    </span>
                  )}
                </div>
              </div>
              <div className="p-6">
                {/* Occasion */}
                {bundle.occasion && (
                  <p className="font-sans text-luxury-gold/60 text-[9px] tracking-[0.4em] uppercase mb-2">
                    {bundle.occasion}
                  </p>
                )}
                <h3 className="font-display text-xl text-luxury-beige mb-2">
                  {bundle.name}
                </h3>
                <p className="font-sans text-luxury-beige/80 text-xs font-light mb-4 leading-relaxed">
                  {bundle.description}
                </p>
                {/* Highlights */}
                <ul className="mb-5 space-y-1">
                  {bundle.highlights.slice(0, 3).map((h, i) => (
                    <li
                      key={`${bundle.id}-h-${i}`}
                      className="flex items-center gap-2 font-sans text-luxury-beige/75 text-xs"
                    >
                      <span className="text-luxury-gold text-[10px]">◈</span>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-display text-2xl text-luxury-gold font-bold">
                      ₹{bundle.price.toLocaleString("en-IN")}
                    </span>
                    <span className="font-sans text-luxury-beige/40 text-xs ml-2">
                      {bundle.pieces} pieces
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/917045899262?text=${encodeURIComponent(`🌟 I'd like to order the ${bundle.name} (₹${bundle.price}) — ${bundle.pieces} pieces.\n\nPlease share payment and delivery details.\n\nThank you!`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold px-4 py-2 text-xs tracking-widest"
                  >
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-luxury-gold/20 pt-16">
          {[
            {
              title: "Bespoke Packaging",
              desc: "Custom-designed boxes with your personal message and branding.",
            },
            {
              title: "Seasonal Collections",
              desc: "Special editions for Eid, Diwali, Christmas, and all major celebrations.",
            },
            {
              title: "Corporate Gifting",
              desc: "Bulk orders with branded packaging for your business needs.",
            },
          ].map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="w-8 h-px bg-luxury-gold mx-auto mb-4" />
              <h4 className="font-serif text-luxury-beige text-lg mb-2">
                {feature.title}
              </h4>
              <p className="font-sans text-luxury-beige/75 text-sm font-light leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
