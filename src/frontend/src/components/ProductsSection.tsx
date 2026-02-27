import { useState, useRef, useEffect } from 'react';
import { Minus, Plus, Star, Check, ShoppingBag } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { useCart } from '../context/CartContext';
import { products, Product } from '../data/products';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateWhatsAppOrderMessage(productName: string, qty: number, price: number): string {
  const total = price * qty;
  const lines = [
    'Hello Miss Luxe! 🌹',
    '',
    '*New Order Request*',
    '',
    '*Products:*',
    `- ${productName} x${qty} — ₹${total.toLocaleString('en-IN')}`,
    '',
    `*Order Total: ₹${total.toLocaleString('en-IN')}*`,
    '*Payment: Prepaid*',
    '',
    'Please confirm availability and payment details. Thank you!',
  ];
  return `https://wa.me/917045899262?text=${encodeURIComponent(lines.join('\n'))}`;
}

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.style.display = 'none';
  const parent = e.currentTarget.parentElement;
  if (parent && !parent.querySelector('.img-fallback')) {
    const fallback = document.createElement('div');
    fallback.className = 'img-fallback w-full h-full';
    fallback.style.cssText = 'position:absolute;inset:0;background:linear-gradient(135deg,#1a1a1a 0%,#0a0a0a 50%,#1a1000 100%)';
    parent.appendChild(fallback);
  }
}

// ─── QuantityControl ─────────────────────────────────────────────────────────

interface QuantityControlProps {
  value: number;
  onChange: (delta: number) => void;
  max?: number;
  size?: 'sm' | 'md';
}

function QuantityControl({ value, onChange, max = 8, size = 'md' }: QuantityControlProps) {
  const btnClass = size === 'sm'
    ? 'w-7 h-7 border border-luxury-gold/30 text-luxury-beige/70 hover:border-luxury-gold hover:text-luxury-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center'
    : 'w-8 h-8 border border-luxury-gold/30 text-luxury-beige/70 hover:border-luxury-gold hover:text-luxury-gold disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center';
  const iconClass = 'w-3 h-3';
  const numClass = size === 'sm'
    ? 'font-sans text-luxury-beige text-sm w-6 text-center font-medium'
    : 'font-sans text-luxury-beige text-sm w-8 text-center font-medium';

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => onChange(-1)} disabled={value <= 1} className={btnClass} aria-label="Decrease quantity">
        <Minus className={iconClass} />
      </button>
      <span className={numClass}>{value}</span>
      <button type="button" onClick={() => onChange(1)} disabled={value >= max} className={btnClass} aria-label="Increase quantity">
        <Plus className={iconClass} />
      </button>
    </div>
  );
}

// ─── FlavourChip ─────────────────────────────────────────────────────────────

function FlavourChip({ label }: { label: string }) {
  return (
    <span className="inline-block font-sans text-[10px] tracking-widest uppercase text-luxury-gold border border-luxury-gold/30 px-2.5 py-1 bg-luxury-gold/5 hover:bg-luxury-gold/10 transition-colors">
      {label}
    </span>
  );
}

// ─── ScrollReveal wrapper ─────────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
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
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── HeroProduct ─────────────────────────────────────────────────────────────

interface HeroProductProps {
  product: Product;
  qty: number;
  onQtyChange: (delta: number) => void;
  onAddToCart: () => void;
  added: boolean;
}

function HeroProduct({ product, qty, onQtyChange, onAddToCart, added }: HeroProductProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const total = product.price * qty;

  return (
    <Reveal className="mb-2">
      <div className="group relative border border-luxury-gold/20 hover:border-luxury-gold/40 transition-all duration-700 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 via-transparent to-transparent pointer-events-none z-[1]" />

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] min-h-[600px]">
          {/* Image column */}
          <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-amber-950/40 min-h-[400px] lg:min-h-[600px]">
            {!imgLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-amber-950/40 animate-pulse" />
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.04] relative z-[1]"
              loading="eager"
              decoding="async"
              onLoad={() => setImgLoaded(true)}
              onError={handleImgError}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-luxury-black/10 z-[2]" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-luxury-black/10 to-transparent z-[2]" />

            {/* Badges */}
            <div className="absolute top-6 left-6 z-[3] flex flex-col gap-2">
              <span className="flex items-center gap-2 bg-luxury-gold text-luxury-black text-[10px] font-sans font-bold uppercase tracking-[0.25em] px-3 py-1.5">
                <Star className="w-3 h-3 fill-luxury-black" />
                {product.badge}
              </span>
            </div>
            <span className="absolute top-6 right-6 z-[3] border border-luxury-gold/70 text-luxury-gold text-[9px] font-sans uppercase tracking-[0.3em] px-2.5 py-1.5 bg-black/70 backdrop-blur-sm">
              Prepaid Only
            </span>

            {/* View details hover */}
            <div className="absolute inset-0 z-[3] flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <a href={`/product/${product.id}`} className="btn-gold px-8 py-3 text-xs tracking-[0.25em]">
                View Full Details
              </a>
            </div>
          </div>

          {/* Content column */}
          <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-center bg-luxury-black">
            <p className="font-sans text-luxury-gold/70 text-[10px] tracking-[0.6em] uppercase mb-5">
              Most Beloved Creation
            </p>

            <h3 className="font-display text-3xl md:text-4xl xl:text-5xl text-luxury-beige mb-2 leading-tight">
              {product.name}
            </h3>

            <p className="font-serif text-luxury-beige/60 text-base italic mb-1">{product.subtitle}</p>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-px bg-luxury-gold/60" />
              <div className="w-1 h-1 bg-luxury-gold/60 rotate-45" />
              <div className="w-10 h-px bg-luxury-gold/60" />
            </div>

            {/* Price */}
            <div className="mb-1">
              <span className="font-display text-5xl text-luxury-gold font-bold">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="font-sans text-luxury-beige/40 text-[11px] tracking-[0.35em] uppercase mb-5">
              {product.pieces} pieces · Incl. premium packaging
            </p>

            {/* Description */}
            <p className="font-sans text-luxury-beige/85 text-sm font-light leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Flavours included */}
            <div className="mb-6">
              <p className="font-sans text-luxury-gold/60 text-[10px] tracking-[0.4em] uppercase mb-3">
                Flavours Included
              </p>
              <div className="flex flex-wrap gap-2">
                {product.flavours.map(f => <FlavourChip key={f} label={f} />)}
              </div>
            </div>

            {/* Qty + Total */}
            <div className="flex flex-wrap items-center gap-4 mb-5">
              <div className="flex items-center gap-3">
                <span className="font-sans text-luxury-beige/40 text-xs uppercase tracking-widest">Qty</span>
                <QuantityControl value={qty} onChange={onQtyChange} />
              </div>
              {qty > 1 && (
                <span className="font-sans text-luxury-gold text-sm font-medium">
                  Total: ₹{total.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onAddToCart}
                className="btn-gold flex items-center justify-center gap-2.5 px-8 py-4 text-xs tracking-[0.25em] flex-1"
              >
                {added ? (
                  <><Check className="w-4 h-4" /> Added to Cart</>
                ) : (
                  <><ShoppingBag className="w-4 h-4" /> Add to Cart</>
                )}
              </button>
              <a
                href={generateWhatsAppOrderMessage(product.name, qty, product.price)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 py-4 px-8 text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-300 flex-1 text-white"
                style={{ backgroundColor: 'oklch(0.52 0.17 145)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'oklch(0.45 0.17 145)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'oklch(0.52 0.17 145)'; }}
              >
                <SiWhatsapp className="w-4 h-4" />
                Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ─── SecondaryProductCard ─────────────────────────────────────────────────────

interface SecondaryProductCardProps {
  product: Product;
  qty: number;
  onQtyChange: (delta: number) => void;
  onAddToCart: () => void;
  added: boolean;
  index: number;
}

function SecondaryProductCard({ product, qty, onQtyChange, onAddToCart, added, index }: SecondaryProductCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const total = product.price * qty;

  return (
    <Reveal delay={index * 0.15} className="group relative bg-luxury-black border border-luxury-gold/10 hover:border-luxury-gold/35 transition-all duration-500 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-zinc-900 via-black to-amber-950/40">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-amber-950/40 animate-pulse" />
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 relative z-[1]"
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={handleImgError}
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 z-[2] flex flex-col gap-1.5">
          {product.badge && (
            <span className="bg-luxury-gold text-luxury-black text-[10px] font-sans font-bold uppercase tracking-[0.25em] px-2.5 py-1">
              {product.badge}
            </span>
          )}
        </div>
        <span className="absolute top-4 right-4 z-[2] border border-luxury-gold/60 text-luxury-gold text-[9px] font-sans uppercase tracking-[0.3em] px-2 py-1 bg-black/70 backdrop-blur-sm">
          Prepaid Only
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 z-[2] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-luxury-black/40">
          <a href={`/product/${product.id}`} className="btn-gold px-6 py-2.5 text-xs tracking-[0.25em]">
            View Details
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col flex-1 space-y-4">
        {/* Occasion */}
        {product.occasions && (
          <p className="font-sans text-luxury-gold/50 text-[10px] tracking-[0.4em] uppercase">
            {product.occasions}
          </p>
        )}

        {/* Name */}
        <div>
          <h3 className="font-display text-2xl text-luxury-beige leading-snug mb-1">{product.name}</h3>
          <p className="font-serif text-luxury-beige/50 text-sm italic">{product.subtitle}</p>
        </div>

        {/* Price */}
        <div>
          <span className="font-display text-4xl text-luxury-gold font-bold">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <p className="font-sans text-luxury-beige/40 text-xs mt-1 tracking-wide">{product.netWeight}</p>
        </div>

        {/* Description */}
        <p className="font-sans text-luxury-beige/80 text-xs leading-relaxed">
          {product.shortDescription}
        </p>

        {/* Flavour chips */}
        <div>
          <p className="font-sans text-luxury-gold/50 text-[9px] tracking-[0.4em] uppercase mb-2">Flavours</p>
          <div className="flex flex-wrap gap-1.5">
            {product.flavours.slice(0, 4).map(f => <FlavourChip key={f} label={f} />)}
            {product.flavours.length > 4 && (
              <span className="font-sans text-[10px] text-luxury-beige/40 px-2 py-1">
                +{product.flavours.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Qty selector */}
        <div className="flex items-center gap-3 pt-1">
          <span className="font-sans text-luxury-beige/40 text-xs uppercase tracking-widest">Qty</span>
          <QuantityControl value={qty} onChange={onQtyChange} size="sm" />
          {qty > 1 && (
            <span className="font-sans text-luxury-gold text-sm font-medium ml-1">
              ₹{total.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* CTAs */}
        <div className="flex gap-2.5 pt-2">
          <button
            type="button"
            onClick={onAddToCart}
            className="btn-gold flex items-center justify-center gap-1.5 px-4 py-3 text-xs tracking-[0.2em] flex-1"
          >
            {added ? (
              <><Check className="w-3.5 h-3.5" /> Added</>
            ) : (
              <><ShoppingBag className="w-3.5 h-3.5" /> Add to Cart</>
            )}
          </button>
          <a
            href={generateWhatsAppOrderMessage(product.name, qty, product.price)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-3 px-4 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 flex-1 text-white"
            style={{ backgroundColor: 'oklch(0.52 0.17 145)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'oklch(0.45 0.17 145)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'oklch(0.52 0.17 145)'; }}
          >
            <SiWhatsapp className="w-3.5 h-3.5" />
            WhatsApp
          </a>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function ProductsSection() {
  const { addItem } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>(() =>
    Object.fromEntries(products.map(p => [p.id, 1]))
  );
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const changeQty = (id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, Math.min(8, (prev[id] ?? 1) + delta)),
    }));
  };

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const qty = quantities[productId] ?? 1;
    addItem(
      { id: product.id, name: product.name, price: product.price, image: product.image },
      qty
    );
    setAddedIds(prev => new Set(prev).add(productId));
    setTimeout(() => {
      setAddedIds(prev => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }, 1800);
  };

  const heroProduct = products[0];
  const secondaryProducts = products.slice(1);

  return (
    <section id="products" className="py-20 md:py-32 bg-luxury-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <Reveal className="text-center mb-16">
          <p className="font-sans text-luxury-gold text-[11px] tracking-[0.6em] uppercase mb-4 opacity-80">
            Our Collection
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-luxury-beige mb-4 italic">
            Signature Creations
          </h2>
          <p className="font-sans text-luxury-beige/40 text-[11px] tracking-[0.35em] uppercase mb-6">
            Prices inclusive of premium packaging · Prepaid Orders Only
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-luxury-gold/60" />
            <div className="w-1.5 h-1.5 bg-luxury-gold/60 rotate-45" />
            <div className="w-12 h-px bg-luxury-gold/60" />
          </div>
        </Reveal>

        {/* HERO PRODUCT */}
        <div className="mb-16">
          <HeroProduct
            product={heroProduct}
            qty={quantities[heroProduct.id] ?? 1}
            onQtyChange={d => changeQty(heroProduct.id, d)}
            onAddToCart={() => handleAddToCart(heroProduct.id)}
            added={addedIds.has(heroProduct.id)}
          />
        </div>

        {/* SECONDARY PRODUCTS HEADER */}
        <Reveal className="text-center mb-10">
          <p className="font-sans text-luxury-gold/60 text-[11px] tracking-[0.6em] uppercase mb-3">
            Elevated Gifting
          </p>
          <h3 className="font-display text-2xl md:text-3xl text-luxury-beige">
            Premium Gift Collections
          </h3>
        </Reveal>

        {/* SECONDARY PRODUCTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {secondaryProducts.map((product, i) => (
            <SecondaryProductCard
              key={product.id}
              product={product}
              qty={quantities[product.id] ?? 1}
              onQtyChange={d => changeQty(product.id, d)}
              onAddToCart={() => handleAddToCart(product.id)}
              added={addedIds.has(product.id)}
              index={i}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <Reveal className="text-center">
          <p className="font-sans text-luxury-beige/40 text-xs tracking-widest uppercase mb-6">
            Looking for something bespoke?
          </p>
          <a
            href="https://wa.me/917045899262"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-block px-12 py-4 text-sm tracking-[0.25em]"
          >
            Order a Custom Box
          </a>
        </Reveal>
      </div>
    </section>
  );
}
