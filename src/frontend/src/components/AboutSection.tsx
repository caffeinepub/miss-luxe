import { useEffect, useRef, useState } from "react";

function Reveal({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {children}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 md:py-32 bg-luxury-black border-t border-luxury-gold/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <Reveal className="relative order-2 md:order-1">
            <div className="absolute -top-4 -left-4 w-full h-full border border-luxury-gold/20 pointer-events-none" />
            <div className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-zinc-900 via-black to-amber-950/40">
              <img
                src="/assets/generated/lifestyle-gifting.dim_1200x800.jpg"
                alt="Miss Luxe brand story — handcrafted luxury date chocolates"
                className="relative z-[1] w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.style.display = "none";
                  const parent = img.parentElement;
                  if (parent && !parent.querySelector(".img-fallback")) {
                    const fallback = document.createElement("div");
                    fallback.className = "img-fallback absolute inset-0";
                    fallback.style.cssText =
                      "background:linear-gradient(135deg,#1a1000 0%,#0a0a0a 50%,#1a1a00 100%)";
                    parent.appendChild(fallback);
                  }
                }}
              />
              {/* Decorative overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-[2] pointer-events-none" />
            </div>
          </Reveal>

          {/* Text */}
          <Reveal className="order-1 md:order-2 space-y-6">
            <div>
              <p className="font-sans text-luxury-gold text-xs tracking-[0.5em] uppercase mb-4">
                A Story of Craft & Devotion
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-luxury-beige leading-tight mb-6">
                Born from a Belief
                <br />
                <em className="text-luxury-gold">in Beautiful Things</em>
              </h2>
            </div>
            <div className="w-12 h-px bg-luxury-gold/50" />
            <p className="font-sans font-light text-luxury-beige/90 leading-relaxed">
              Miss Luxe was born from a simple belief — that the finest gifts
              are made with the finest hands. We source only the plumpest
              Medjool dates, pair them with globally sourced fillings, and wrap
              them in packaging that speaks before words can.
            </p>
            <p className="font-sans font-light text-luxury-beige/90 leading-relaxed">
              Every box is a labour of love, produced in limited batches to
              ensure every piece meets our uncompromising standard of
              excellence. We do not compromise. We do not rush. We make what we
              would be proud to give to someone we love.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-luxury-gold/10">
              {[
                { value: "100%", label: "Natural" },
                { value: "Limited", label: "Batches" },
                { value: "5★", label: "Quality" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl text-luxury-gold tracking-wider">
                    {stat.value}
                  </div>
                  <div className="font-sans text-luxury-beige/50 text-xs tracking-widest uppercase mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="/about"
                className="inline-block border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all duration-300 px-8 py-3 font-sans text-sm tracking-widest uppercase text-center"
              >
                Our Story
              </a>
              <a
                href="https://wa.me/917045899262?text=Hello%20Miss%20Luxe!%20I%27d%20like%20to%20enquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-luxury-gold/30 text-luxury-beige/70 hover:border-luxury-gold hover:text-luxury-gold transition-all duration-300 px-8 py-3 font-sans text-sm tracking-widest uppercase text-center"
              >
                Enquire Now
              </a>
            </div>
          </Reveal>
        </div>

        {/* Brand Promise strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-0 border border-luxury-gold/10">
          {[
            {
              icon: "✦",
              label: "Handcrafted with Love",
              desc: "Every date filled and finished by hand",
            },
            {
              icon: "◈",
              label: "Premium Medjool Dates",
              desc: "Sourced for richness and plumpness",
            },
            {
              icon: "⟡",
              label: "Ships Pan India",
              desc: "Delivered in 3–5 working days",
            },
            {
              icon: "◇",
              label: "Prepaid Orders Only",
              desc: "No COD — quality assured production",
            },
          ].map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col items-center text-center p-8 border-luxury-gold/10 ${i < 3 ? "border-r" : ""}`}
            >
              <span className="text-luxury-gold text-xl mb-3">{item.icon}</span>
              <p className="font-sans text-luxury-beige text-xs tracking-widest uppercase mb-1 font-medium">
                {item.label}
              </p>
              <p className="font-sans text-luxury-beige/45 text-xs">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
