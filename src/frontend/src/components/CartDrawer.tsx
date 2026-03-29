import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "../context/CartContext";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

function buildCustomisationSummary(customisation: {
  giftMessage?: string;
  ribbonColor?: string;
  packagingStyle?: string;
  greetingCard?: boolean;
}): string {
  const parts: string[] = [];
  if (customisation.ribbonColor)
    parts.push(`${customisation.ribbonColor} ribbon`);
  if (customisation.packagingStyle) parts.push(customisation.packagingStyle);
  if (customisation.giftMessage) parts.push("Gift message included");
  if (customisation.greetingCard) parts.push("Greeting card (+₹50)");
  return parts.join(" • ");
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } =
    useCart();

  const buildWhatsAppHref = () => {
    if (items.length === 0) return "#";
    const orderText = items
      .map((item) => {
        const greetingExtra = item.customisation?.greetingCard ? 50 : 0;
        const unitPrice = item.price + greetingExtra;
        const subtotal = unitPrice * item.quantity;
        let line = `• ${item.name} x${item.quantity} — ₹${subtotal.toLocaleString()}`;
        if (item.customisation) {
          const summary = buildCustomisationSummary(item.customisation);
          if (summary) line += `\n  (${summary})`;
          if (item.customisation.giftMessage) {
            line += `\n  Message: "${item.customisation.giftMessage}"`;
          }
        }
        return line;
      })
      .join("\n");
    const message = `Hello Miss Luxe! 🌹✨\n\nI'd like to place an order:\n\n${orderText}\n\n*Total: ₹${totalPrice.toLocaleString()}*\n\n*Payment Mode: Prepaid*\nKindly share your UPI details to confirm. Thank you! 🌸`;
    return `https://wa.me/917045899262?text=${encodeURIComponent(message)}`;
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-40 transition-opacity"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onClose();
          }}
          tabIndex={0}
          role="button"
          aria-label="Close cart"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-luxury-black border-l border-luxury-gold/20 z-50 transition-transform duration-300 ease-in-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-luxury-gold/20 bg-luxury-black">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-luxury-gold" />
            <div>
              <h2 className="font-serif text-luxury-beige text-lg leading-none">
                Your Cart
              </h2>
              <p className="font-sans text-luxury-gold/40 text-[9px] tracking-[0.4em] uppercase mt-0.5">
                Miss Luxe
              </p>
            </div>
            {totalItems > 0 && (
              <span className="bg-luxury-gold text-luxury-black text-xs font-sans font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-luxury-beige/60 hover:text-luxury-gold transition-colors p-1"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-12 h-12 text-luxury-gold/30 mx-auto mb-4" />
              <p className="text-luxury-beige/50 font-sans font-light">
                Your cart is empty
              </p>
              <p className="text-luxury-beige/30 font-sans text-sm mt-1">
                Add some luxury to your life
              </p>
            </div>
          ) : (
            items.map((item) => {
              const greetingExtra = item.customisation?.greetingCard ? 50 : 0;
              const unitPrice = item.price + greetingExtra;
              const subtotal = unitPrice * item.quantity;
              const customSummary = item.customisation
                ? buildCustomisationSummary(item.customisation)
                : "";

              return (
                <div
                  key={item.id}
                  className="flex gap-4 py-4 border-b border-luxury-gold/10"
                >
                  <div className="relative w-16 h-16 shrink-0 bg-gradient-to-br from-zinc-900 via-black to-amber-950/40 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
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
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-luxury-beige text-sm leading-tight mb-0.5 truncate">
                      {item.name}
                    </h3>
                    {customSummary && (
                      <p className="text-luxury-gold/70 font-sans text-[11px] italic mb-1 leading-tight">
                        {customSummary}
                      </p>
                    )}
                    <p className="text-luxury-beige/50 font-sans text-xs mb-2">
                      ₹{unitPrice.toLocaleString()} × {item.quantity} ={" "}
                      <span className="text-luxury-gold font-medium">
                        ₹{subtotal.toLocaleString()}
                      </span>
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-6 h-6 border border-luxury-gold/30 text-luxury-beige/70 hover:border-luxury-gold hover:text-luxury-gold transition-colors flex items-center justify-center"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-luxury-beige font-sans text-sm w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-6 h-6 border border-luxury-gold/30 text-luxury-beige/70 hover:border-luxury-gold hover:text-luxury-gold transition-colors flex items-center justify-center"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-luxury-beige/30 hover:text-luxury-gold transition-colors self-start mt-1"
                    aria-label={`Remove ${item.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-luxury-gold/20 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-sans text-luxury-beige/70 text-sm uppercase tracking-widest">
                Total
              </span>
              <span className="font-serif text-luxury-gold text-xl">
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>
            <a
              href={buildWhatsAppHref()}
              data-ocid="cart.whatsapp_checkout.button"
              className="btn-gold w-full py-4 text-center relative overflow-hidden group/btn tracking-[0.25em] text-sm no-underline block transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)] active:scale-95 active:translate-y-0"
            >
              <span className="relative z-[1] flex items-center justify-center gap-2">
                Order via WhatsApp
              </span>
              <span
                className="absolute inset-0 z-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, oklch(0.92 0.02 80 / 0.2) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s linear infinite",
                }}
              />
            </a>
            <p className="text-luxury-beige/30 font-sans text-xs text-center tracking-wide">
              Prepaid orders only · Opens WhatsApp
            </p>
          </div>
        )}
      </div>
    </>
  );
}
