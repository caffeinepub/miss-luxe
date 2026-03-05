import { Send, ShoppingBag, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
  cta?: { label: string; href: string };
}

interface KnowledgeEntry {
  keywords: string[];
  answer: string;
  chips: string[];
  cta?: { label: string; href: string };
}

// ─── Knowledge Base ───────────────────────────────────────────────────────────

const FALLBACK_ANSWER =
  "Hmm, I don't have that answer just yet — but our team does! Reach us on WhatsApp at +91 70458 99262 or Instagram @miss.luxeco and we'll get back to you super fast.";

const FALLBACK_CHIPS = [
  "What products do you offer?",
  "What are the prices?",
  "How do I order?",
  "Contact on WhatsApp",
];

const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: [
      "product",
      "products",
      "what do you sell",
      "what is miss luxe",
      "catalogue",
      "collection",
    ],
    answer:
      "Miss Luxe crafts premium handcrafted date chocolates — made in small batches using the finest Medjool dates, Belgian couverture chocolate & luxury ingredients.\n\n◈ Signature Luxe Box — 6 pieces · ₹399\n◈ Grand Luxe Box — 12 pieces · ₹699\n◈ Royal Collector Box — 18 pieces · ₹1,199\n\nAll prices include stunning luxury packaging. Ready to treat yourself?",
    chips: [
      "What flavours are available?",
      "How do I order?",
      "What are the ingredients?",
      "Is it suitable as a gift?",
    ],
    cta: { label: "Shop Now", href: "/#products" },
  },
  {
    keywords: [
      "flavour",
      "flavors",
      "taste",
      "variety",
      "pistachio",
      "almond",
      "saffron",
      "caramel",
      "rose",
    ],
    answer:
      "Four signature flavours, each more divine than the last:\n\n◈ Royal Pistachio — dark chocolate + crushed Persian pistachios\n◈ Almond Rose — milk chocolate + almond nougat + rose water\n◈ Saffron Caramel — white chocolate + saffron-infused caramel\n◈ Assorted — a curated mix of all four\n\nEvery box includes a premium flavour card with tasting notes.",
    chips: [
      "What are the prices?",
      "What are the ingredients?",
      "How do I order?",
      "Is there shelf life info?",
    ],
    cta: { label: "View Products", href: "/#products" },
  },
  {
    keywords: [
      "ingredient",
      "ingredients",
      "made of",
      "contain",
      "allergen",
      "nut",
      "dairy",
      "vegan",
    ],
    answer:
      "Only the finest go into every piece:\n\n◈ Premium Medjool dates (certified farms)\n◈ Belgian couverture dark, milk & white chocolate\n◈ Persian pistachios, California almonds\n◈ Pure saffron, rose water, caramel\n◈ Zero artificial preservatives or flavourings\n\nNote: contains nuts & dairy. Not vegan. For specific allergen info, WhatsApp us!",
    chips: [
      "What flavours do you have?",
      "What is the shelf life?",
      "How to store the product?",
      "Contact on WhatsApp",
    ],
  },
  {
    keywords: [
      "shelf life",
      "expiry",
      "expire",
      "how long",
      "best before",
      "freshness",
    ],
    answer:
      "Our handcrafted date chocolates stay fresh for 30 days from manufacture when stored correctly. Each box is clearly labelled with the best-before date.\n\nFor peak flavour, we recommend enjoying within 2 weeks of delivery.",
    chips: [
      "How to store the product?",
      "What are the ingredients?",
      "How do I order?",
      "Shipping details",
    ],
  },
  {
    keywords: [
      "storage",
      "store",
      "refrigerate",
      "fridge",
      "temperature",
      "keep",
    ],
    answer:
      "Store Miss Luxe in a cool, dry place away from direct sunlight. Ideal temp: 18–22°C.\n\nAvoid refrigeration unless your room exceeds 28°C — condensation can affect the chocolate shell. If refrigerated, let it rest at room temp for 15 mins before serving for the ultimate experience.",
    chips: [
      "What is the shelf life?",
      "What are the ingredients?",
      "How do I order?",
      "What are the prices?",
    ],
  },
  {
    keywords: ["price", "pricing", "cost", "how much", "₹", "rupee", "rate"],
    answer:
      "Luxury doesn't have to be out of reach:\n\n◈ Signature Luxe Box — 6 pieces — ₹399\n◈ Grand Luxe Box — 12 pieces — ₹699\n◈ Royal Collector Box — 18 pieces — ₹1,199\n\nAll prices include premium luxury packaging. Prepaid Only — no COD.",
    chips: [
      "How do I order?",
      "Is COD available?",
      "Customisation options",
      "Shipping details",
    ],
    cta: { label: "Order Now", href: "/#products" },
  },
  {
    keywords: [
      "order",
      "how to order",
      "buy",
      "purchase",
      "place order",
      "booking",
    ],
    answer:
      "Ordering is super easy:\n\n1. Browse products on the website\n2. Add to cart & choose your customisation\n3. Hit 'Order on WhatsApp'\n4. Pay via UPI or bank transfer (prepaid only)\n5. We confirm & dispatch in 1–2 working days\n\nOr just DM us on WhatsApp: +91 70458 99262",
    chips: [
      "What payment methods are accepted?",
      "Is COD available?",
      "Customisation options",
      "Shipping details",
    ],
    cta: { label: "Start Shopping", href: "/#products" },
  },
  {
    keywords: [
      "payment",
      "pay",
      "upi",
      "bank transfer",
      "cod",
      "cash on delivery",
      "prepaid",
    ],
    answer:
      "We accept:\n\n◈ UPI (GPay, PhonePe, Paytm, etc.)\n◈ NEFT / IMPS bank transfer\n◈ Any prepaid digital payment\n\nImportant: Prepaid Only. COD is not available. Orders are processed after payment confirmation.",
    chips: [
      "How do I order?",
      "Shipping details",
      "What are the prices?",
      "Contact on WhatsApp",
    ],
  },
  {
    keywords: [
      "ship",
      "shipping",
      "delivery",
      "deliver",
      "days",
      "how long delivery",
      "dispatch",
      "pan india",
    ],
    answer:
      "We ship Pan India with trusted courier partners:\n\n◈ Standard delivery: 3–5 working days\n◈ May vary during peak & festive seasons\n◈ Shipped in temperature-appropriate luxury packaging\n◈ Tracking number sent via WhatsApp after dispatch\n\nAll orders are Prepaid Only.",
    chips: [
      "How do I track my order?",
      "Is there a refund policy?",
      "How do I order?",
      "Contact on WhatsApp",
    ],
  },
  {
    keywords: [
      "track",
      "tracking",
      "where is my order",
      "order status",
      "check order",
    ],
    answer:
      "Track your order easily:\n\n◈ Use the Order Tracking page (click 'Track Order' in the navigation)\n◈ Log in with Internet Identity to view your order status\n\nAlternatively, tracking details are sent directly to your WhatsApp after dispatch.",
    chips: [
      "Shipping details",
      "How do I order?",
      "Contact on WhatsApp",
      "What is the refund policy?",
    ],
    cta: { label: "Track Order", href: "/track" },
  },
  {
    keywords: [
      "refund",
      "return",
      "exchange",
      "cancel",
      "cancellation",
      "money back",
    ],
    answer:
      "Due to the perishable nature of edible products, we don't accept returns after delivery.\n\nDamaged order? Here's what to do:\n◈ Report within 24 hours of delivery\n◈ Include an unboxing video as proof\n◈ WhatsApp us: +91 70458 99262\n\nApproved cases receive a replacement in 3–5 working days.",
    chips: [
      "Shipping details",
      "How do I order?",
      "Contact on WhatsApp",
      "What are the prices?",
    ],
  },
  {
    keywords: [
      "customise",
      "customization",
      "customisation",
      "personalise",
      "personalisation",
      "gift message",
      "ribbon",
      "packaging",
      "greeting card",
      "personal",
    ],
    answer:
      "Yes! We love making it personal:\n\n◈ Handwritten gift message on premium card\n◈ Ribbon: Gold Classic, Ivory White, Blush Pink, Emerald Green\n◈ Packaging: Standard Luxury Box or Premium Silk Wrap\n◈ Greeting card: +₹50\n\nSelect your preferences when adding to cart.",
    chips: [
      "How do I order?",
      "What are the prices?",
      "Is it suitable as a gift?",
      "Shipping details",
    ],
    cta: { label: "Customise Now", href: "/#products" },
  },
  {
    keywords: [
      "gift",
      "gifting",
      "present",
      "hamper",
      "corporate",
      "wedding",
      "eid",
      "ramadan",
      "birthday",
      "occasion",
    ],
    answer:
      "Miss Luxe is the ultimate luxury gift for every occasion — Eid, Ramadan, weddings, birthdays, corporate gifting & more.\n\nAll boxes arrive gift-ready with stunning luxury packaging. Add personalised messages, custom ribbons & greeting cards.\n\nFor bulk corporate or wedding orders, WhatsApp us for exclusive arrangements.",
    chips: [
      "Customisation options",
      "What are the prices?",
      "How do I order?",
      "Contact on WhatsApp",
    ],
    cta: { label: "Gift Someone", href: "/#products" },
  },
  {
    keywords: [
      "contact",
      "reach",
      "support",
      "help",
      "whatsapp",
      "instagram",
      "social",
      "connect",
      "reach us",
    ],
    answer:
      "We're always here for you:\n\n◈ WhatsApp: +91 70458 99262 (fastest for orders)\n◈ Instagram: @miss.luxeco\n\nWe typically reply within a few hours. WhatsApp is the fastest route for anything order-related.",
    chips: [
      "How do I order?",
      "Shipping details",
      "What are the prices?",
      "Track my order",
    ],
  },
  {
    keywords: [
      "about",
      "brand",
      "story",
      "who are you",
      "miss luxe",
      "founder",
      "handcrafted",
      "artisan",
    ],
    answer:
      "Miss Luxe is a premium handcrafted luxury gifting brand — born from the belief that gifting should feel like an experience, not just a transaction.\n\nEvery piece is crafted in small batches using hand-selected Medjool dates, Belgian couverture chocolate & the world's finest ingredients.\n\nEach Miss Luxe box is a statement of elegance, taste & thoughtfulness.",
    chips: [
      "What products do you offer?",
      "What are the ingredients?",
      "How do I order?",
      "Contact on WhatsApp",
    ],
    cta: { label: "Our Story", href: "/about" },
  },
];

const WELCOME_MESSAGE: Message = {
  id: 0,
  role: "bot",
  text: "Hey! Welcome to Miss Luxe ✦\n\nI'm your personal luxury concierge — here to help with products, orders, gifting & more. What can I do for you today?",
  cta: { label: "Shop the Collection", href: "/#products" },
};

const INITIAL_CHIPS = [
  "What products do you offer?",
  "What are the prices?",
  "How do I order?",
  "Customisation options",
  "Shipping details",
  "Contact us",
];

// ─── Matching Logic ───────────────────────────────────────────────────────────

function findAnswer(input: string): {
  answer: string;
  chips: string[];
  cta?: { label: string; href: string };
} {
  const lower = input.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return { answer: entry.answer, chips: entry.chips, cta: entry.cta };
    }
  }
  return { answer: FALLBACK_ANSWER, chips: FALLBACK_CHIPS };
}

// ─── Sparkle Icon ─────────────────────────────────────────────────────────────

function GoldDiamond() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2L2 9l10 13L22 9z" />
    </svg>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────

function BotMessage({
  text,
  cta,
  isNew,
}: {
  text: string;
  cta?: { label: string; href: string };
  isNew?: boolean;
}) {
  const lines = text.split("\n");
  return (
    <div
      className="flex items-start gap-2 mb-3"
      style={{
        animation: isNew
          ? "mlSlideInLeft 0.22s cubic-bezier(0.34,1.4,0.64,1) both"
          : "none",
      }}
    >
      {/* Avatar */}
      <div
        className="flex-shrink-0 mt-0.5"
        style={{
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #b8960c 0%, #d4af37 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#0d0b08",
          boxShadow: "0 0 10px rgba(212,175,55,0.4)",
          flexShrink: 0,
        }}
      >
        <GoldDiamond />
      </div>

      <div
        style={{
          maxWidth: "85%",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {/* Bubble */}
        <div
          style={{
            background:
              "linear-gradient(145deg, rgba(22,17,10,0.98) 0%, rgba(16,13,8,0.98) 100%)",
            border: "1px solid rgba(212,175,55,0.15)",
            borderRadius: "16px",
            borderTopLeftRadius: "4px",
            padding: "10px 13px",
            boxShadow:
              "0 2px 12px rgba(0,0,0,0.45), inset 0 1px 0 rgba(212,175,55,0.06)",
          }}
        >
          {lines.map((line, i) => (
            <p
              key={`line-${i}-${line.slice(0, 8)}`}
              style={{
                fontSize: "13px",
                lineHeight: "1.6",
                letterSpacing: "0.01em",
                marginTop: line === "" ? "6px" : undefined,
                color: line.startsWith("◈")
                  ? "rgba(212,175,55,0.95)"
                  : line.match(/^\d\./)
                    ? "rgba(235,220,195,0.85)"
                    : "rgba(235,220,195,0.88)",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* CTA Button */}
        {cta && (
          <a
            href={cta.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "6px 14px",
              borderRadius: "100px",
              background: "linear-gradient(135deg, #b8960c 0%, #d4af37 100%)",
              color: "#0d0b08",
              textDecoration: "none",
              alignSelf: "flex-start",
              fontFamily: "'Montserrat', sans-serif",
              boxShadow: "0 2px 10px rgba(212,175,55,0.35)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "scale(1.03)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 4px 16px rgba(212,175,55,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "scale(1)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 2px 10px rgba(212,175,55,0.35)";
            }}
          >
            <ShoppingBag size={10} />
            {cta.label}
          </a>
        )}
      </div>
    </div>
  );
}

function UserMessage({ text, isNew }: { text: string; isNew?: boolean }) {
  return (
    <div
      className="flex justify-end mb-3"
      style={{
        animation: isNew
          ? "mlSlideInRight 0.2s cubic-bezier(0.34,1.4,0.64,1) both"
          : "none",
      }}
    >
      <div
        style={{
          maxWidth: "78%",
          padding: "9px 14px",
          borderRadius: "16px",
          borderTopRightRadius: "4px",
          background:
            "linear-gradient(135deg, #b8960c 0%, #d4af37 60%, #c9a227 100%)",
          boxShadow: "0 2px 12px rgba(212,175,55,0.3)",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            lineHeight: "1.55",
            fontWeight: "600",
            color: "#0d0b08",
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: "0.01em",
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

// ─── Main ChatBot Component ───────────────────────────────────────────────────

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [chips, setChips] = useState<string[]>(INITIAL_CHIPS);
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(false);
  const [newIds, setNewIds] = useState<Set<number>>(new Set());
  const [showBadge, setShowBadge] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  // Hide badge after 5s
  useEffect(() => {
    const t = setTimeout(() => setShowBadge(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // Scroll to bottom on new messages
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Animate open/close
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true));
      setShowBadge(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      setVisible(false);
    }
  }, [open]);

  const handleSend = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const uid = nextId.current++;
    const bid = nextId.current++;
    const { answer, chips: newChips, cta } = findAnswer(trimmed);

    const userMsg: Message = { id: uid, role: "user", text: trimmed };
    const botMsg: Message = { id: bid, role: "bot", text: answer, cta };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setNewIds(new Set([uid, bid]));
    setChips(newChips);
    setInput("");

    setTimeout(() => {
      setNewIds((prev) => {
        const next = new Set(prev);
        next.delete(uid);
        next.delete(bid);
        return next;
      });
    }, 500);
  }, []);

  const handleChip = useCallback(
    (chip: string) => handleSend(chip),
    [handleSend],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") handleSend(input);
    },
    [input, handleSend],
  );

  return (
    <>
      <style>{`
        @keyframes mlSlideInLeft {
          from { opacity: 0; transform: translateX(-10px) scale(0.97); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes mlSlideInRight {
          from { opacity: 0; transform: translateX(10px) scale(0.97); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes mlPulseRing {
          0%   { box-shadow: 0 0 0 0 rgba(212,175,55,0.6), 0 6px 24px rgba(0,0,0,0.6); }
          70%  { box-shadow: 0 0 0 12px rgba(212,175,55,0), 0 6px 24px rgba(0,0,0,0.6); }
          100% { box-shadow: 0 0 0 0 rgba(212,175,55,0), 0 6px 24px rgba(0,0,0,0.6); }
        }
        @keyframes mlBadgePop {
          0%   { opacity: 0; transform: scale(0.6) translateY(4px); }
          60%  { opacity: 1; transform: scale(1.1) translateY(-1px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes mlOnlinePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes mlHeaderShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes mlFabFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-3px); }
        }
        .ml-scroll::-webkit-scrollbar { width: 3px; }
        .ml-scroll::-webkit-scrollbar-track { background: transparent; }
        .ml-scroll::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.2); border-radius: 2px; }
        .ml-chip:hover {
          background: rgba(212,175,55,0.12) !important;
          border-color: rgba(212,175,55,0.55) !important;
          color: rgba(212,175,55,1) !important;
        }
        .ml-input::placeholder { color: rgba(212,175,55,0.25); }
        .ml-input:focus { outline: none; }
      `}</style>

      {/* ── Positioned container — bottom-left ── */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          left: "16px",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* ── Chat window ── */}
        {/* biome-ignore lint/a11y/useSemanticElements: inline widget */}
        <div
          role="dialog"
          aria-label="Miss Luxe Concierge"
          aria-modal="false"
          data-ocid="chatbot.panel"
          style={{
            transformOrigin: "bottom left",
            pointerEvents: open ? "auto" : "none",
            transition:
              "opacity 300ms cubic-bezier(0.4,0,0.2,1), transform 300ms cubic-bezier(0.34,1.15,0.64,1)",
            opacity: open && visible ? 1 : 0,
            transform:
              open && visible
                ? "translateY(0) scale(1)"
                : "translateY(18px) scale(0.95)",
            width: "min(380px, calc(100vw - 32px))",
            marginBottom: "12px",
            borderRadius: "20px",
            overflow: "hidden",
            border: "1px solid rgba(212,175,55,0.22)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.75), 0 0 0 1px rgba(212,175,55,0.06)",
            background: "#0e0c08",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              background:
                "linear-gradient(135deg, #9a7a08 0%, #c9a820 35%, #d4af37 55%, #b8960c 80%, #8a6c04 100%)",
              backgroundSize: "200% 100%",
              animation: "mlHeaderShimmer 5s linear infinite",
              padding: "13px 15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Avatar circle */}
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.22)",
                  border: "1.5px solid rgba(0,0,0,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "#0e0c08",
                    letterSpacing: "0.04em",
                  }}
                >
                  ML
                </span>
              </div>

              <div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "7px" }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "15px",
                      fontWeight: "700",
                      color: "#0e0c08",
                      letterSpacing: "0.03em",
                      lineHeight: 1,
                    }}
                  >
                    Miss Luxe
                  </span>
                  {/* Online dot */}
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "#16a34a",
                      display: "block",
                      flexShrink: 0,
                      animation: "mlOnlinePulse 2s ease-in-out infinite",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "9px",
                    fontWeight: "600",
                    color: "rgba(0,0,0,0.5)",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    display: "block",
                    marginTop: "2px",
                  }}
                >
                  Luxury Concierge · Online
                </span>
              </div>
            </div>

            <button
              type="button"
              data-ocid="chatbot.close_button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(0,0,0,0.18)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "rgba(0,0,0,0.6)",
                flexShrink: 0,
              }}
            >
              <X size={13} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="ml-scroll"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 12px 6px",
              background: "#0e0c08",
              maxHeight: "clamp(220px, 50vh, 360px)",
              minHeight: "180px",
            }}
          >
            {messages.map((msg) =>
              msg.role === "bot" ? (
                <BotMessage
                  key={msg.id}
                  text={msg.text}
                  cta={msg.cta}
                  isNew={newIds.has(msg.id)}
                />
              ) : (
                <UserMessage
                  key={msg.id}
                  text={msg.text}
                  isNew={newIds.has(msg.id)}
                />
              ),
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick reply chips */}
          {chips.length > 0 && (
            <div
              style={{
                background: "#0e0c08",
                padding: "8px 12px 9px",
                borderTop: "1px solid rgba(212,175,55,0.08)",
                display: "flex",
                flexWrap: "wrap",
                gap: "5px",
              }}
            >
              {chips.map((chip) => (
                <button
                  type="button"
                  key={chip}
                  data-ocid="chatbot.secondary_button"
                  onClick={() => handleChip(chip)}
                  className="ml-chip"
                  style={{
                    fontSize: "11px",
                    color: "rgba(212,175,55,0.8)",
                    border: "1px solid rgba(212,175,55,0.25)",
                    borderRadius: "100px",
                    padding: "4px 10px",
                    background: "transparent",
                    cursor: "pointer",
                    letterSpacing: "0.02em",
                    transition: "all 0.15s",
                    lineHeight: 1.5,
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontStyle: "italic",
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Input bar */}
          <div
            style={{
              background: "rgba(8,6,3,0.98)",
              borderTop: "1px solid rgba(212,175,55,0.15)",
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              data-ocid="chatbot.input"
              className="ml-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything…"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "13.5px",
                color: "rgba(235,220,195,0.9)",
                outline: "none",
                letterSpacing: "0.01em",
                minWidth: 0,
              }}
            />
            <button
              type="button"
              data-ocid="chatbot.submit_button"
              onClick={() => handleSend(input)}
              disabled={!input.trim()}
              aria-label="Send message"
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background: input.trim()
                  ? "linear-gradient(135deg, #b8960c 0%, #d4af37 100%)"
                  : "rgba(212,175,55,0.1)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: input.trim() ? "pointer" : "not-allowed",
                color: input.trim() ? "#0e0c08" : "rgba(212,175,55,0.25)",
                transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
                flexShrink: 0,
                boxShadow: input.trim()
                  ? "0 2px 10px rgba(212,175,55,0.4)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (input.trim())
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1)";
              }}
            >
              <Send size={13} />
            </button>
          </div>
        </div>

        {/* ── FAB trigger button ── */}
        <div style={{ position: "relative" }}>
          {/* Notification badge */}
          {showBadge && !open && (
            <div
              style={{
                position: "absolute",
                bottom: "calc(100% + 10px)",
                left: 0,
                background: "linear-gradient(135deg, #b8960c 0%, #d4af37 100%)",
                color: "#0e0c08",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "0.06em",
                padding: "7px 14px",
                borderRadius: "12px",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 20px rgba(212,175,55,0.45)",
                animation:
                  "mlBadgePop 0.35s cubic-bezier(0.34,1.4,0.64,1) both",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Sparkles size={10} />
              Need help? Ask me!
              {/* Arrow */}
              <span
                style={{
                  position: "absolute",
                  bottom: "-5px",
                  left: "20px",
                  width: 0,
                  height: 0,
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "5px solid #c9a820",
                }}
              />
            </div>
          )}

          <button
            type="button"
            data-ocid="chatbot.open_modal_button"
            onClick={() => setOpen(true)}
            aria-label="Open Miss Luxe chat"
            aria-expanded={open}
            style={{
              width: "58px",
              height: "58px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #9a7a08 0%, #d4af37 50%, #c9a227 100%)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#0e0c08",
              animation: open
                ? "none"
                : "mlPulseRing 2.2s ease-in-out infinite",
              transition: "opacity 0.2s, transform 0.2s",
              opacity: open ? 0 : 1,
              transform: open ? "scale(0.75)" : "scale(1)",
              pointerEvents: open ? "none" : "auto",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              if (!open) {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1.1)";
                (e.currentTarget as HTMLButtonElement).style.animation = "none";
              }
            }}
            onMouseLeave={(e) => {
              if (!open) {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1)";
                (e.currentTarget as HTMLButtonElement).style.animation =
                  "mlPulseRing 2.2s ease-in-out infinite";
              }
            }}
          >
            {/* Crown SVG */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M2 19h20v2H2v-2zm2-2l2-9 4 4 2-7 2 7 4-4 2 9H4z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
