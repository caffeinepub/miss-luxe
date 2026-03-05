import { MessageCircle, Send, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
}

interface KnowledgeEntry {
  keywords: string[];
  answer: string;
  chips: string[];
}

// ─── Knowledge Base ───────────────────────────────────────────────────────────

const FALLBACK_ANSWER =
  "I'm not sure I have the answer to that, but our team would love to help! Please reach us on WhatsApp at +91 70458 99262 or Instagram @miss.luxeco and we'll get back to you promptly.";

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
    ],
    answer:
      "Miss Luxe crafts premium handcrafted date chocolates — each piece is made in small batches using the finest Medjool dates, Belgian couverture chocolate, and luxury ingredients. We offer three curated gift boxes:\n\n◈ Signature Luxe Box — 6 pieces, ₹399\n◈ Grand Luxe Box — 12 pieces, ₹699\n◈ Royal Collector Box — 18 pieces, ₹1,199\n\nAll prices include premium luxury packaging.",
    chips: [
      "What flavours are available?",
      "How do I order?",
      "What are the ingredients?",
      "Is it suitable as a gift?",
    ],
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
      "We offer four signature flavours:\n\n◈ Royal Pistachio — Medjool dates enrobed in dark chocolate with crushed Persian pistachios\n◈ Almond Rose — Belgian milk chocolate with almond nougat and rose water\n◈ Saffron Caramel — White chocolate with saffron-infused caramel filling\n◈ Assorted Selection — A curated mix of all four flavours\n\nEach box comes with a flavour card detailing the tasting notes.",
    chips: [
      "What are the prices?",
      "What are the ingredients?",
      "How do I order?",
      "Is there shelf life info?",
    ],
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
      "Our ingredients are of the highest quality:\n\n◈ Premium Medjool dates (sourced from certified farms)\n◈ Belgian couverture dark, milk & white chocolate\n◈ Persian pistachios, California almonds\n◈ Pure saffron, rose water, caramel\n◈ No artificial preservatives or flavourings\n\nPlease note: our products contain nuts and dairy. They are not vegan. For specific allergen queries, please contact us on WhatsApp.",
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
      "Our handcrafted date chocolates have a shelf life of 30 days from the date of manufacture when stored correctly. Each box is labelled with the best-before date.\n\nFor maximum freshness, we recommend consuming within 2 weeks of delivery.",
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
      "Store Miss Luxe products in a cool, dry place away from direct sunlight. Ideal temperature: 18–22°C.\n\nDo not refrigerate unless your room temperature exceeds 28°C — condensation can affect the chocolate coating. If refrigerated, allow to come to room temperature for 15 minutes before serving for the best experience.",
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
      "Our luxury gift boxes are priced as follows:\n\n◈ Signature Luxe Box — 6 pieces — ₹399\n◈ Grand Luxe Box — 12 pieces — ₹699\n◈ Royal Collector Box — 18 pieces — ₹1,199\n\nAll prices are inclusive of premium luxury packaging. We are a Prepaid Only brand — no Cash on Delivery.",
    chips: [
      "How do I order?",
      "What is included in the box?",
      "Is COD available?",
      "Customisation options",
    ],
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
      "Ordering is simple:\n\n1. Browse our products on this website\n2. Select your box and add it to the cart\n3. Choose your customisation options (gift message, packaging, etc.)\n4. Click 'Order on WhatsApp' to send your order directly to us\n5. Complete prepaid payment via UPI or bank transfer\n6. We confirm and dispatch within 1–2 working days\n\nAlternatively, message us directly on WhatsApp: +91 70458 99262",
    chips: [
      "What payment methods are accepted?",
      "Is COD available?",
      "Customisation options",
      "Shipping details",
    ],
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
      "We accept the following payment modes:\n\n◈ UPI (GPay, PhonePe, Paytm, etc.)\n◈ NEFT / IMPS bank transfer\n◈ Any prepaid digital payment\n\nImportant: We are a Prepaid Only brand. Cash on Delivery (COD) is not available. Orders are processed only after payment confirmation.",
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
      "We ship Pan India via trusted courier partners.\n\n◈ Standard delivery: 3–5 working days\n◈ Delivery timelines may vary during peak seasons and festive periods\n◈ All orders are shipped in temperature-appropriate luxury protective packaging\n◈ Once dispatched, you will receive a tracking number via WhatsApp\n\nNote: All orders are Prepaid Only.",
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
      "You can track your order using our Order Tracking page — just click 'Track Order' in the navigation menu and log in with Internet Identity.\n\nAlternatively, once your order is dispatched, you will receive tracking details directly on WhatsApp from us.",
    chips: [
      "Shipping details",
      "How do I order?",
      "Contact on WhatsApp",
      "What is the refund policy?",
    ],
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
      "Due to the perishable nature of our edible products, we do not accept returns or exchanges after delivery.\n\nIf your order arrives damaged:\n◈ Report within 24 hours of delivery\n◈ Include an unboxing video as proof\n◈ Contact us on WhatsApp: +91 70458 99262\n\nApproved cases receive a replacement (not a cash refund) within 3–5 working days.",
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
      "Yes! We offer beautiful personalisation options:\n\n◈ Gift message (handwritten on premium card)\n◈ Ribbon colour: Gold Classic, Ivory White, Blush Pink, or Emerald Green\n◈ Packaging style: Standard Luxury Box or Premium Silk Wrap\n◈ Greeting card: +₹50\n\nSelect your preferences when adding to cart on the product page.",
    chips: [
      "How do I order?",
      "What are the prices?",
      "Is it suitable as a gift?",
      "Shipping details",
    ],
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
      "Miss Luxe is the perfect luxury gift for any occasion — Eid, Ramadan, weddings, birthdays, corporate gifting, and more.\n\nAll our boxes arrive in stunning luxury packaging that is gift-ready on arrival. You can also add personalised gift messages, custom ribbons, and greeting cards.\n\nFor bulk corporate or wedding orders, please contact us directly on WhatsApp for special arrangements.",
    chips: [
      "Customisation options",
      "What are the prices?",
      "How do I order?",
      "Contact on WhatsApp",
    ],
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
      "You can reach Miss Luxe through:\n\n◈ WhatsApp: +91 70458 99262 (preferred for orders)\n◈ Instagram: @miss.luxeco\n\nWe typically respond within a few hours. For order-related queries, WhatsApp is the fastest way to reach us.",
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
      "Miss Luxe is a premium handcrafted luxury gifting brand specialising in exquisite date chocolates. Every piece is crafted in small batches using the finest global ingredients — from hand-selected Medjool dates to Belgian couverture chocolate.\n\nWe believe gifting should be an experience, not just a transaction. Each Miss Luxe box is a statement of elegance, taste, and thoughtfulness.",
    chips: [
      "What products do you offer?",
      "What are the ingredients?",
      "How do I order?",
      "Contact on WhatsApp",
    ],
  },
];

const WELCOME_MESSAGE: Message = {
  id: 0,
  role: "bot",
  text: "Welcome to Miss Luxe Concierge 🌙 I'm here to help you with everything — products, pricing, orders, delivery, and more. What can I help you with today?",
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

function findAnswer(input: string): { answer: string; chips: string[] } {
  const lower = input.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return { answer: entry.answer, chips: entry.chips };
    }
  }
  return { answer: FALLBACK_ANSWER, chips: FALLBACK_CHIPS };
}

// ─── Message Bubble ───────────────────────────────────────────────────────────

function BotMessage({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="flex items-start gap-2 mb-3">
      <div className="w-6 h-6 rounded-full bg-luxury-gold/20 border border-luxury-gold/40 flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-luxury-gold text-[8px] font-serif">ML</span>
      </div>
      <div className="bg-black/60 border border-luxury-gold/20 rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[85%]">
        {lines.map((line, i) => (
          <p
            key={`line-${i}-${line.slice(0, 8)}`}
            className={`font-sans text-[12.5px] leading-relaxed text-luxury-beige/90 ${
              line === "" ? "mt-1.5" : ""
            }`}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end mb-3">
      <div className="bg-luxury-gold rounded-2xl rounded-tr-sm px-3.5 py-2.5 max-w-[80%]">
        <p className="font-sans text-[12.5px] leading-relaxed text-black font-medium">
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
  const [isTyping, setIsTyping] = useState(false);
  const [visible, setVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  // Scroll to bottom whenever messages change
  // biome-ignore lint/correctness/useExhaustiveDependencies: messages and isTyping are intentional triggers
  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, isTyping]);

  // Animate open/close
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true));
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      setVisible(false);
    }
  }, [open]);

  const handleSend = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const userMsg: Message = {
        id: nextId.current++,
        role: "user",
        text: trimmed,
      };
      setMessages((prev) => [...prev, userMsg]);
      setChips([]);
      setInput("");
      setIsTyping(true);

      // Simulate a brief typing delay
      setTimeout(() => {
        const { answer, chips: newChips } = findAnswer(trimmed);
        const botMsg: Message = {
          id: nextId.current++,
          role: "bot",
          text: answer,
        };
        setMessages((prev) => [...prev, botMsg]);
        setChips(newChips);
        setIsTyping(false);
      }, 600);
    },
    [isTyping],
  );

  const handleChip = useCallback(
    (chip: string) => {
      handleSend(chip);
    },
    [handleSend],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSend(input);
      }
    },
    [input, handleSend],
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start">
      {/* Chat Window */}
      {/* biome-ignore lint/a11y/useSemanticElements: non-modal inline widget, not a true dialog */}
      <div
        role="dialog"
        aria-label="Miss Luxe Customer Support"
        aria-modal="false"
        data-ocid="chatbot.panel"
        style={{
          transformOrigin: "bottom left",
          pointerEvents: open ? "auto" : "none",
          transition:
            "opacity 280ms cubic-bezier(0.4,0,0.2,1), transform 280ms cubic-bezier(0.4,0,0.2,1)",
          opacity: open && visible ? 1 : 0,
          transform:
            open && visible
              ? "translateY(0) scale(1)"
              : "translateY(16px) scale(0.97)",
        }}
        className="mb-3 w-[360px] max-w-[calc(100vw-3rem)] flex flex-col rounded-2xl overflow-hidden border border-luxury-gold/30 shadow-2xl"
      >
        {/* Header */}
        <div className="bg-black flex items-center justify-between px-4 py-3 border-b border-luxury-gold/20 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-luxury-gold/10 border border-luxury-gold/40 flex items-center justify-center">
              <span className="text-luxury-gold text-[10px] font-serif tracking-wider">
                ML
              </span>
            </div>
            <div>
              <p className="font-serif text-luxury-gold text-sm leading-tight tracking-wide">
                Miss Luxe
              </p>
              <p className="font-sans text-luxury-beige/50 text-[10px] tracking-widest uppercase">
                Concierge
              </p>
            </div>
          </div>
          <button
            type="button"
            data-ocid="chatbot.close_button"
            onClick={handleClose}
            aria-label="Close chat"
            className="w-7 h-7 rounded-full flex items-center justify-center text-luxury-beige/60 hover:text-luxury-gold hover:bg-luxury-gold/10 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Messages area */}
        <div
          className="flex-1 overflow-y-auto px-3 py-3 space-y-1 bg-[#0a0a0a]"
          style={{ maxHeight: "320px", minHeight: "200px" }}
        >
          {messages.map((msg) =>
            msg.role === "bot" ? (
              <BotMessage key={msg.id} text={msg.text} />
            ) : (
              <UserMessage key={msg.id} text={msg.text} />
            ),
          )}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-luxury-gold/20 border border-luxury-gold/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-luxury-gold text-[8px] font-serif">
                  ML
                </span>
              </div>
              <div
                data-ocid="chatbot.loading_state"
                className="bg-black/60 border border-luxury-gold/20 rounded-2xl rounded-tl-sm px-4 py-3"
              >
                <div className="flex gap-1 items-center">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-luxury-gold/60 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-luxury-gold/60 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-luxury-gold/60 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick reply chips */}
        {chips.length > 0 && !isTyping && (
          <div className="bg-[#0a0a0a] px-3 pb-2 flex flex-wrap gap-1.5 border-t border-luxury-gold/10 pt-2">
            {chips.map((chip) => (
              <button
                type="button"
                key={chip}
                data-ocid="chatbot.secondary_button"
                onClick={() => handleChip(chip)}
                className="font-sans text-[11px] text-luxury-gold border border-luxury-gold/50 rounded-full px-3 py-1 hover:bg-luxury-gold/10 transition-colors leading-tight"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Input bar */}
        <div className="bg-black border-t border-luxury-gold/20 px-3 py-2.5 flex items-center gap-2 flex-shrink-0">
          <input
            ref={inputRef}
            data-ocid="chatbot.input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question…"
            disabled={isTyping}
            className="flex-1 bg-transparent font-sans text-[13px] text-luxury-beige placeholder:text-luxury-beige/30 outline-none disabled:opacity-50"
          />
          <button
            type="button"
            data-ocid="chatbot.submit_button"
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
            className="w-7 h-7 rounded-full bg-luxury-gold/90 flex items-center justify-center text-black hover:bg-luxury-gold transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send size={12} />
          </button>
        </div>
      </div>

      {/* Trigger button */}
      <button
        type="button"
        data-ocid="chatbot.open_modal_button"
        onClick={handleOpen}
        aria-label="Open customer support chat"
        aria-expanded={open}
        style={{
          transition: "opacity 200ms, transform 200ms",
          opacity: open ? 0 : 1,
          transform: open ? "scale(0.8)" : "scale(1)",
          pointerEvents: open ? "none" : "auto",
        }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-luxury-black border border-luxury-gold text-luxury-gold shadow-lg hover:bg-luxury-gold/10 transition-colors"
      >
        <MessageCircle size={16} className="text-luxury-gold" />
        <span className="font-sans text-[13px] font-medium tracking-wide">
          Ask Us
        </span>
      </button>
    </div>
  );
}
