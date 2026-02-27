import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';

const pillars = [
  {
    icon: '✦',
    title: 'Pure Ingredients',
    body: 'We source only the finest Medjool dates, Belgian couverture chocolate, and handpicked nuts. No artificial flavours. No shortcuts. Every element earns its place in our recipe.',
  },
  {
    icon: '◈',
    title: 'Handcrafted with Precision',
    body: 'Every date is individually inspected, filled, and sealed by trained artisans. Each box leaves our kitchen as a work of art — never rushed, never compromised.',
  },
  {
    icon: '⟡',
    title: 'Hygiene & Safety',
    body: 'Our kitchen follows strict food-grade standards. Every batch is prepared in a clean, temperature-controlled environment. What goes into your gift meets the highest standards of care.',
  },
  {
    icon: '◇',
    title: 'Gifting Excellence',
    body: 'We believe the best gifts are ones that say something. Our packaging is designed to communicate elegance before the first bite. An experience from the moment it is held.',
  },
];

const timeline = [
  {
    year: '2022',
    event: 'The First Batch',
    detail:
      'What started as a gift for a loved one became something others could not stop talking about. A small act of care sparked something greater.',
  },
  {
    year: '2023',
    event: 'A Brand is Born',
    detail:
      'Miss Luxe officially launched with a curated collection of six signature flavours. Each one a chapter in a story about love and precision.',
  },
  {
    year: '2024',
    event: 'Going National',
    detail:
      'Orders began pouring in from across India. Limited batches. Premium standards. Always. Every box still made by hand.',
  },
  {
    year: 'Today',
    event: 'Your Turn',
    detail:
      'Every box is still made with the same care as that very first gift. We hope it means as much to you.',
  },
];

export default function AboutPage() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-luxury-black">
      <Navigation onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <main>
        {/* ── Hero ── */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Background texture */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.78 0.12 80 / 0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 100%, oklch(0.78 0.12 80 / 0.05) 0%, transparent 60%)',
              backgroundColor: 'oklch(0.08 0.005 60)',
            }}
          />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, oklch(0.78 0.12 80) 0px, oklch(0.78 0.12 80) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(-45deg, oklch(0.78 0.12 80) 0px, oklch(0.78 0.12 80) 1px, transparent 1px, transparent 60px)',
            }}
          />

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-32 pb-24">
            <p className="font-sans text-luxury-gold text-xs tracking-[0.6em] uppercase mb-8 animate-fade-up">
              Our Story
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-luxury-beige leading-tight mb-8 animate-fade-up">
              Born from{' '}
              <span
                className="italic"
                style={{
                  color: 'oklch(0.78 0.12 80)',
                  textShadow: '0 0 40px oklch(0.78 0.12 80 / 0.3)',
                }}
              >
                Conviction
              </span>
            </h1>
            <div className="w-20 h-px bg-luxury-gold/40 mx-auto mb-8" />
            <p className="font-sans font-light text-luxury-beige/60 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              India's most deliberate luxury date chocolate house.
            </p>
          </div>
        </section>

        {/* ── Founder's Note ── */}
        <section className="py-20 md:py-28 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-px h-16 bg-luxury-gold/30 mx-auto mb-12" />
            <blockquote
              className="font-serif text-xl md:text-2xl lg:text-3xl text-luxury-beige leading-relaxed mb-10"
              style={{ fontStyle: 'italic' }}
            >
              "Miss Luxe was born not from commerce, but from conviction — a belief that luxury is
              not merely about price, but about the love, discipline, and artistry woven into every
              creation."
            </blockquote>
            <div className="w-12 h-px bg-luxury-gold/50 mx-auto mb-6" />
            <p className="font-sans text-luxury-gold text-xs tracking-[0.4em] uppercase">
              The Founder, Miss Luxe
            </p>
          </div>
        </section>

        {/* ── Brand Pillars ── */}
        <section className="py-20 md:py-28 px-4 border-t border-luxury-gold/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="font-sans text-luxury-gold text-xs tracking-[0.5em] uppercase mb-4">
                What We Stand For
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-luxury-beige">
                Our Four Pillars
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pillars.map((pillar, i) => (
                <div
                  key={pillar.title}
                  className="group relative p-8 md:p-10 border border-luxury-gold/10 hover:border-luxury-gold/35 transition-all duration-500 bg-luxury-black"
                  style={{
                    background: `linear-gradient(135deg, oklch(0.10 0.003 60) 0%, oklch(0.08 0.005 60) 100%)`,
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  {/* Corner accent */}
                  <div className="absolute top-0 left-0 w-8 h-px bg-luxury-gold/50 transition-all duration-500 group-hover:w-16" />
                  <div className="absolute top-0 left-0 w-px h-8 bg-luxury-gold/50 transition-all duration-500 group-hover:h-16" />

                  <span className="text-luxury-gold text-2xl mb-6 block">{pillar.icon}</span>
                  <h3 className="font-serif text-xl md:text-2xl text-luxury-beige mb-4">
                    {pillar.title}
                  </h3>
                  <p className="font-sans font-light text-luxury-beige/60 text-sm leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="py-20 md:py-28 px-4 border-t border-luxury-gold/10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="font-sans text-luxury-gold text-xs tracking-[0.5em] uppercase mb-4">
                The Journey
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-luxury-beige">
                How Miss Luxe Came to Be
              </h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-luxury-gold/20 md:-translate-x-1/2" />

              <div className="space-y-12">
                {timeline.map((item, i) => {
                  const isEven = i % 2 === 0;
                  return (
                    <div
                      key={item.year}
                      className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                      {/* Content */}
                      <div
                        className={`md:w-1/2 pl-8 md:pl-0 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}
                      >
                        <div
                          className={`p-6 border border-luxury-gold/10 bg-luxury-black ${isEven ? 'md:text-right' : ''}`}
                        >
                          <p className="font-sans text-luxury-gold text-xs tracking-[0.4em] uppercase mb-2">
                            {item.year}
                          </p>
                          <h3 className="font-serif text-xl text-luxury-beige mb-3">
                            {item.event}
                          </h3>
                          <p className="font-sans font-light text-luxury-beige/55 text-sm leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </div>

                      {/* Timeline dot */}
                      <div className="absolute left-0 md:left-1/2 top-6 md:-translate-x-1/2 w-3 h-3 border-2 border-luxury-gold bg-luxury-black rounded-full" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Values Statement ── */}
        <section className="py-24 md:py-36 px-4 border-t border-luxury-gold/10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="w-px h-12 bg-luxury-gold/30 mx-auto mb-12" />
            <p className="font-sans text-luxury-gold text-xs tracking-[0.5em] uppercase mb-8">
              Our Promise
            </p>
            <blockquote
              className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-luxury-beige leading-tight"
              style={{ textShadow: '0 0 60px oklch(0.78 0.12 80 / 0.1)' }}
            >
              "We do not make chocolates.
              <br />
              <span className="text-luxury-gold italic">We make moments.</span>"
            </blockquote>
            <div className="w-20 h-px bg-luxury-gold/40 mx-auto mt-12" />
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 px-4 border-t border-luxury-gold/10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl text-luxury-beige mb-6">
              Experience Miss Luxe
            </h2>
            <p className="font-sans font-light text-luxury-beige/55 text-sm leading-relaxed mb-10">
              Each box, a labour of devotion. Each bite, a memory in the making.
            </p>
            <a
              href="/#products"
              className="btn-gold inline-block px-12 py-4 text-sm tracking-widest"
            >
              Explore the Collection
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}
