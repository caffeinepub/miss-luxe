# Miss Luxe

## Current State
Full luxury date chocolate e-commerce website with:
- Home page with Hero, About, Products, Flavours, Gift, Instagram, Contact sections
- Product detail pages with cart, customisation options
- Cart drawer and cart page
- Order tracking page
- Admin dashboard
- Policy pages (Shipping, Refund, Privacy, Terms)
- FloatingWhatsAppButton component (bottom-right floating button)
- CartProvider context wrapping the app via CartProvider in main.tsx or App.tsx
- Internet Identity authentication

## Requested Changes (Diff)

### Add
- `ChatBot` component: a floating chat widget positioned bottom-left (so it doesn't overlap the existing WhatsApp button on bottom-right)
- Rule-based Q&A engine covering all common Miss Luxe customer questions:
  - Products: what products are available, ingredients, flavours, net weight, shelf life, storage
  - Pricing: Signature Luxe Box (₹399, 6pc), Grand Luxe Box (₹699, 12pc), Royal Collector Box (₹1,199, 18pc)
  - Ordering: how to order, WhatsApp ordering, cart instructions, prepaid only policy
  - Shipping: delivery time (3-5 working days), Pan India, no COD
  - Refunds: no returns on edibles, 24hr damage report with unboxing video
  - Customisation: gift message, ribbon colour, packaging style, greeting card (+₹50)
  - Contact: WhatsApp +91 70458 99262, Instagram @miss.luxeco
  - Order tracking: how to track orders
  - Gift sets / bundle pricing
  - General brand info
- Quick-reply suggestion chips for the most common questions
- Branded Miss Luxe styling: black background, gold accents, beige text — matching the site theme exactly
- Smooth open/close animation
- Chat widget trigger button (bottom-left) with a chat icon and "Ask Us" label

### Modify
- `App.tsx`: import and render `<ChatBot />` inside the root route component (`Outlet` wrapper) so it appears on every page without touching any existing components

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/components/ChatBot.tsx` — self-contained floating chatbot component
2. Define a typed Q&A knowledge base (array of {keywords, answer} objects) covering all Miss Luxe topics
3. Implement message matching: user input is checked against keywords, returns best matching answer or a fallback directing to WhatsApp
4. Quick-reply chips: show 5-6 suggested questions on open and after each bot reply
5. Animate open/close with CSS transitions (translate + opacity)
6. Position: fixed bottom-6 left-6, z-index above all content but below modals
7. Import `<ChatBot />` in `App.tsx` root route component alongside `<Toaster />`
8. No backend changes required — fully frontend/client-side
