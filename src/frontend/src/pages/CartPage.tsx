import { ArrowLeft, Minus, Plus, ShoppingBag, Truck, X } from "lucide-react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { useCart } from "../context/CartContext";

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.style.display = "none";
  const parent = e.currentTarget.parentElement;
  if (parent && !parent.querySelector(".img-fallback")) {
    const fallback = document.createElement("div");
    fallback.className = "img-fallback";
    fallback.style.cssText =
      "position:absolute;inset:0;background:linear-gradient(135deg,#1a1a1a,#0a0a0a)";
    parent.appendChild(fallback);
  }
}

interface CustomerForm {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const inputClass = (hasError: boolean) =>
  `w-full bg-luxury-black border ${hasError ? "border-red-500/60" : "border-luxury-gold/20"} focus:border-luxury-gold/50 outline-none px-4 py-3 font-sans text-sm text-luxury-beige placeholder:text-luxury-beige/20 transition-colors`;

const labelClass =
  "block font-sans text-xs uppercase tracking-widest text-luxury-beige/60 mb-2";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems,
    clearCart,
  } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const [form, setForm] = useState<CustomerForm>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState<Partial<CustomerForm>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CustomerForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<CustomerForm> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.pincode.trim()) newErrors.pincode = "Pincode is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return;
    if (!validate()) return;

    const itemLines = items
      .map((item) => {
        const greetingExtra = item.customisation?.greetingCard ? 50 : 0;
        const unitPrice = item.price + greetingExtra;
        const subtotal = unitPrice * item.quantity;
        let line = `- ${item.name} x${item.quantity} — ₹${subtotal.toLocaleString("en-IN")}`;
        if (item.customisation) {
          const parts: string[] = [];
          if (item.customisation.ribbonColor)
            parts.push(`Ribbon: ${item.customisation.ribbonColor}`);
          if (item.customisation.packagingStyle)
            parts.push(`Packaging: ${item.customisation.packagingStyle}`);
          if (item.customisation.greetingCard)
            parts.push("Greeting Card (+₹50)");
          if (item.customisation.giftMessage)
            parts.push(`Message: "${item.customisation.giftMessage}"`);
          if (parts.length) line += `\n  ${parts.join(" | ")}`;
        }
        return line;
      })
      .join("\n");

    const fullAddress = [form.address, form.city, form.state, form.pincode]
      .filter(Boolean)
      .join(", ");

    const message = [
      "Hello Miss Luxe! 🌹",
      "",
      "*New Order Request*",
      "",
      "*Products:*",
      itemLines,
      "",
      "*Customer Details:*",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      `Address: ${fullAddress}`,
      "",
      `*Order Total: ₹${totalPrice.toLocaleString("en-IN")}*`,
      "*Payment: Prepaid*",
      "",
      "Please confirm availability and payment details. Thank you!",
    ]
      .filter((l): l is string => l !== null)
      .join("\n");

    window.open(
      `https://wa.me/917045899262?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="min-h-screen bg-luxury-black">
      <Navigation onCartOpen={() => setCartOpen(!cartOpen)} />

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <p className="font-sans text-luxury-gold text-xs tracking-[0.5em] uppercase mb-3">
              Shopping
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-luxury-beige mb-4">
              Your Cart
            </h1>
            <div className="w-16 h-px bg-luxury-gold/40" />
          </div>

          {/* Empty state */}
          {items.length === 0 && (
            <div className="text-center py-24 border border-luxury-gold/10">
              <ShoppingBag className="w-16 h-16 text-luxury-gold/20 mx-auto mb-6" />
              <h2 className="font-serif text-2xl text-luxury-beige mb-4">
                Your cart is empty
              </h2>
              <p className="font-sans font-light text-luxury-beige/50 text-sm mb-10 max-w-xs mx-auto">
                Discover our handcrafted luxury date chocolates and find the
                perfect gift.
              </p>
              <a
                href="/#products"
                className="btn-gold inline-block px-12 py-4 text-sm tracking-widest"
              >
                Explore Collection
              </a>
            </div>
          )}

          {/* Cart content */}
          {items.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10">
              {/* Left: cart items + form */}
              <div>
                <div className="space-y-4 mb-8">
                  {items.map((item) => {
                    const greetingExtra = item.customisation?.greetingCard
                      ? 50
                      : 0;
                    const unitPrice = item.price + greetingExtra;
                    const subtotal = unitPrice * item.quantity;
                    const custParts: string[] = [];
                    if (item.customisation?.ribbonColor)
                      custParts.push(
                        `Ribbon: ${item.customisation.ribbonColor}`,
                      );
                    if (item.customisation?.packagingStyle)
                      custParts.push(item.customisation.packagingStyle);
                    if (item.customisation?.greetingCard)
                      custParts.push("Greeting Card (+₹50)");

                    return (
                      <div
                        key={item.id}
                        className="flex gap-4 p-5 border border-luxury-gold/10 hover:border-luxury-gold/25 transition-all duration-300 bg-[#0d0d0d]"
                      >
                        {/* Image */}
                        <div className="relative w-20 h-20 shrink-0 overflow-hidden bg-gradient-to-br from-zinc-900 via-black to-amber-950/40">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={handleImgError}
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-luxury-beige text-lg mb-0.5">
                            {item.name}
                          </h3>
                          {custParts.length > 0 && (
                            <p className="font-sans text-luxury-gold/70 text-xs italic mb-1">
                              {custParts.join(" • ")}
                            </p>
                          )}
                          {item.customisation?.giftMessage && (
                            <p className="font-sans text-luxury-beige/50 text-xs italic mb-2">
                              "{item.customisation.giftMessage}"
                            </p>
                          )}
                          <div className="flex items-center gap-4 flex-wrap mt-2">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-7 h-7 border border-luxury-gold/30 text-luxury-beige/70 hover:border-luxury-gold hover:text-luxury-gold transition-colors flex items-center justify-center"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="font-sans text-luxury-beige text-sm w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-7 h-7 border border-luxury-gold/30 text-luxury-beige/70 hover:border-luxury-gold hover:text-luxury-gold transition-colors flex items-center justify-center"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="font-sans text-luxury-beige/60 text-sm">
                              ₹{unitPrice.toLocaleString("en-IN")} ×
                              {item.quantity} =
                              <span className="text-luxury-gold font-semibold ml-1">
                                ₹{subtotal.toLocaleString("en-IN")}
                              </span>
                            </span>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-luxury-beige/30 hover:text-luxury-gold transition-colors self-start"
                          aria-label={`Remove ${item.name}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Clear cart */}
                <button
                  type="button"
                  onClick={clearCart}
                  className="font-sans text-xs uppercase tracking-widest text-luxury-beige/30 hover:text-luxury-gold transition-colors"
                >
                  Clear Cart
                </button>

                {/* Customer Form */}
                <div className="mt-10 p-8 border border-luxury-gold/10 bg-[#0d0d0d]">
                  <h2 className="font-serif text-xl text-luxury-beige mb-2">
                    Delivery Details
                  </h2>
                  <div className="w-10 h-px bg-luxury-gold/40 mb-6" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cart-name" className={labelClass}>
                        Full Name *
                      </label>
                      <input
                        id="cart-name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={inputClass(!!errors.name)}
                      />
                      {errors.name && (
                        <p className="mt-1 text-red-400/80 text-xs">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="cart-phone" className={labelClass}>
                        Phone Number *
                      </label>
                      <input
                        id="cart-phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className={inputClass(!!errors.phone)}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-red-400/80 text-xs">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="cart-email" className={labelClass}>
                        Email Address
                      </label>
                      <input
                        id="cart-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={inputClass(false)}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="cart-address" className={labelClass}>
                        Street Address *
                      </label>
                      <input
                        id="cart-address"
                        name="address"
                        type="text"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Flat/House no., Street, Area"
                        className={inputClass(!!errors.address)}
                      />
                      {errors.address && (
                        <p className="mt-1 text-red-400/80 text-xs">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="cart-city" className={labelClass}>
                        City *
                      </label>
                      <input
                        id="cart-city"
                        name="city"
                        type="text"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="City"
                        className={inputClass(!!errors.city)}
                      />
                      {errors.city && (
                        <p className="mt-1 text-red-400/80 text-xs">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="cart-state" className={labelClass}>
                        State
                      </label>
                      <input
                        id="cart-state"
                        name="state"
                        type="text"
                        value={form.state}
                        onChange={handleChange}
                        placeholder="State"
                        className={inputClass(false)}
                      />
                    </div>

                    <div>
                      <label htmlFor="cart-pincode" className={labelClass}>
                        Pincode *
                      </label>
                      <input
                        id="cart-pincode"
                        name="pincode"
                        type="text"
                        value={form.pincode}
                        onChange={handleChange}
                        placeholder="6-digit pincode"
                        className={inputClass(!!errors.pincode)}
                      />
                      {errors.pincode && (
                        <p className="mt-1 text-red-400/80 text-xs">
                          {errors.pincode}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Order Summary */}
              <div>
                <div className="border border-luxury-gold/15 bg-[#0d0d0d] p-8 sticky top-28">
                  <h2 className="font-serif text-xl text-luxury-beige mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6 pb-6 border-b border-luxury-gold/10">
                    {items.map((item) => {
                      const greetingExtra = item.customisation?.greetingCard
                        ? 50
                        : 0;
                      const subtotal =
                        (item.price + greetingExtra) * item.quantity;
                      return (
                        <div
                          key={item.id}
                          className="flex justify-between gap-4"
                        >
                          <span className="font-sans text-sm text-luxury-beige/70 flex-1 truncate">
                            {item.name} ×{item.quantity}
                          </span>
                          <span className="font-sans text-sm text-luxury-beige shrink-0">
                            ₹{subtotal.toLocaleString("en-IN")}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="font-sans text-sm text-luxury-beige/60">
                        Subtotal
                      </span>
                      <span className="font-sans text-sm text-luxury-beige">
                        ₹{totalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-sm text-luxury-beige/60 flex items-center gap-2">
                        <Truck className="w-3.5 h-3.5" /> Shipping
                      </span>
                      <span className="font-sans text-xs text-luxury-gold tracking-widest uppercase">
                        Free
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-luxury-gold/20 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-sm uppercase tracking-widest text-luxury-beige/70">
                        Total
                      </span>
                      <span className="font-serif text-2xl text-luxury-gold">
                        ₹{totalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6 px-4 py-3 border border-luxury-gold/20 bg-luxury-gold/5">
                    <p className="font-sans text-xs text-luxury-gold tracking-wide text-center">
                      💳 Prepaid Orders Only
                    </p>
                    <p className="font-sans text-xs text-luxury-beige/50 text-center mt-1">
                      Prices inclusive of premium packaging
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="w-full flex items-center justify-center gap-3 py-4 font-sans text-sm font-semibold tracking-widest uppercase text-white transition-all duration-300"
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
                    <SiWhatsapp className="w-5 h-5" />
                    Place Order via WhatsApp
                  </button>

                  <p className="font-sans text-luxury-beige/30 text-xs text-center mt-4">
                    You will be redirected to WhatsApp to confirm your prepaid
                    order
                  </p>

                  <div className="mt-6 pt-6 border-t border-luxury-gold/10 text-center">
                    <p className="font-sans text-luxury-beige/40 text-xs tracking-widest uppercase">
                      {totalItems} item{totalItems !== 1 ? "s" : ""} in your
                      cart
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12">
            <a
              href="/#products"
              className="inline-flex items-center gap-2 font-sans text-sm tracking-widest uppercase text-luxury-beige/50 hover:text-luxury-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </a>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}
