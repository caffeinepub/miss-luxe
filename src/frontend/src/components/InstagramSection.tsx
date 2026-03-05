import { SiInstagram } from "react-icons/si";

const instagramPreviews = [
  {
    id: 1,
    image: "/assets/generated/product-box-signature.dim_800x800.jpg",
    alt: "Signature Luxe Box",
  },
  {
    id: 2,
    image: "/assets/generated/flavour-pistachio.dim_600x600.jpg",
    alt: "Royal Pistachio Cream",
  },
  {
    id: 3,
    image: "/assets/generated/product-box-grand.dim_800x800.jpg",
    alt: "Grand Luxe Box",
  },
  {
    id: 4,
    image: "/assets/generated/flavour-saffron-caramel.dim_600x600.jpg",
    alt: "Saffron Caramel",
  },
  {
    id: 5,
    image: "/assets/generated/product-box-royal.dim_800x800.jpg",
    alt: "Royal Collector Box",
  },
  {
    id: 6,
    image: "/assets/generated/flavour-assorted.dim_600x600.jpg",
    alt: "Assorted Collection",
  },
];

export default function InstagramSection() {
  return (
    <section className="py-20 md:py-28 bg-luxury-black border-t border-luxury-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-sans text-luxury-gold text-xs tracking-[0.5em] uppercase mb-4">
            Follow Our Journey
          </p>
          <a
            href="https://instagram.com/miss.luxeco"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 group"
            aria-label="Follow Miss Luxe on Instagram"
          >
            <span className="w-7 h-7 flex items-center justify-center text-luxury-gold/70 group-hover:text-luxury-gold transition-colors">
              <SiInstagram size={28} />
            </span>
            <span className="font-serif text-3xl md:text-4xl lg:text-5xl text-luxury-beige group-hover:text-luxury-gold transition-colors">
              @miss.luxeco
            </span>
          </a>
          <div className="w-16 h-px bg-luxury-gold mx-auto mt-6 mb-4" />
          <p className="font-sans text-luxury-beige/80 text-sm font-light">
            Discover our artisan creations, behind-the-scenes moments &amp;
            gifting inspiration
          </p>
        </div>

        {/* Grid Preview */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-1 mb-10">
          {instagramPreviews.map((item) => (
            <a
              key={item.id}
              href="https://instagram.com/miss.luxeco"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden aspect-square block"
              aria-label={`View ${item.alt} on Instagram`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-amber-950/30" />
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-[1]"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.style.display = "none";
                }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-luxury-black/0 group-hover:bg-luxury-black/50 transition-all duration-300 flex items-center justify-center">
                <span className="w-6 h-6 flex items-center justify-center text-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <SiInstagram size={24} />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://instagram.com/miss.luxeco"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-luxury-gold/50 text-luxury-gold hover:bg-luxury-gold/10 transition-colors px-10 py-4 font-sans text-sm tracking-widest uppercase"
          >
            <span className="w-4 h-4 flex items-center justify-center">
              <SiInstagram size={16} />
            </span>
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
