import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import AboutSection from "./components/AboutSection";
import CartDrawer from "./components/CartDrawer";
import ChatBot from "./components/ChatBot";
import ContactSection from "./components/ContactSection";
import FlavourSection from "./components/FlavourSection";
import FloatingWhatsAppButton from "./components/FloatingWhatsAppButton";
import Footer from "./components/Footer";
import GiftSection from "./components/GiftSection";
import HeroSection from "./components/HeroSection";
import InstagramSection from "./components/InstagramSection";
import Navigation from "./components/Navigation";
import ProductsSection from "./components/ProductsSection";
import RamadanEidBanner from "./components/RamadanEidBanner";
import { CartProvider } from "./context/CartContext";

// ─── Lazy loaded pages ────────────────────────────────────────────────────────
import AboutPage from "./pages/AboutPage";
import AdminDashboard from "./pages/AdminDashboard";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import TrackOrderPage from "./pages/TrackOrderPage";

// ─── Page Components ─────────────────────────────────────────────────────────

function HomePage() {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div className="min-h-screen bg-luxury-black">
      <Navigation onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <main>
        <RamadanEidBanner />
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <FlavourSection />
        <GiftSection />
        <InstagramSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}

function ProductDetailPageWrapper() {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <>
      <ProductDetailPage onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

function PolicyPageWrapper({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <div className="min-h-screen bg-luxury-black">
      <Navigation onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <main className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-sans text-luxury-gold text-xs tracking-[0.5em] uppercase mb-4">
            Miss Luxe
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-luxury-gold mb-4">
            {title}
          </h1>
          <div className="w-16 h-px bg-luxury-gold/40 mx-auto" />
        </div>
        <div className="font-sans font-light text-luxury-beige/80 leading-relaxed space-y-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function PrivacyPage() {
  return (
    <PolicyPageWrapper title="Privacy Policy">
      <p className="text-luxury-beige/60 text-sm">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <h2 className="font-serif text-xl text-luxury-gold mt-8 mb-4">
        Information We Collect
      </h2>
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        We collect information you provide directly to us, such as when you
        place an order, contact us, or enquire via WhatsApp. This may include
        your name, email address, phone number, and delivery address.
      </p>
      <h2 className="font-serif text-xl text-luxury-gold mt-8 mb-4">
        How We Use Your Information
      </h2>
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        We use the information we collect to process your orders, communicate
        with you about your purchases, and improve our services. We do not send
        unsolicited marketing communications without your consent.
      </p>
      <h2 className="font-serif text-xl text-luxury-gold mt-8 mb-4">
        Information Sharing
      </h2>
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        We do not sell, trade, or otherwise transfer your personal information
        to third parties without your consent, except as necessary to fulfil
        your orders or as required by law.
      </p>
      <h2 className="font-serif text-xl text-luxury-gold mt-8 mb-4">
        Data Security
      </h2>
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        We implement appropriate security measures to protect your personal
        information. However, no method of transmission over the internet is
        100% secure.
      </p>
      <h2 className="font-serif text-xl text-luxury-gold mt-8 mb-4">
        Contact Us
      </h2>
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        If you have questions about this Privacy Policy, please contact us via
        WhatsApp at +91 70458 99262 or on Instagram @miss.luxeco.
      </p>
    </PolicyPageWrapper>
  );
}

function ShippingPage() {
  return (
    <PolicyPageWrapper title="Shipping Policy">
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        We deliver our luxury date chocolates across India with the utmost care
        to preserve their quality and presentation.
      </p>
      <h2 className="font-serif text-xl text-luxury-gold mt-8 mb-4">
        Delivery Timeframes
      </h2>
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        Standard delivery: 3–5 working days across India. Delivery timelines may
        vary during peak seasons and festive periods.
      </p>
      <h2 className="font-serif text-xl text-luxury-gold mt-8 mb-4">
        Shipping Coverage
      </h2>
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        We ship Pan India. All orders are shipped via reputable courier partners
        to ensure safe and timely delivery.
      </p>
      <h2 className="font-serif text-xl text-luxury-gold mt-8 mb-4">
        Payment & Order Confirmation
      </h2>
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        All orders are{" "}
        <strong className="text-luxury-gold">Prepaid Only</strong>. No Cash on
        Delivery (COD). Orders are processed only after payment confirmation.
      </p>
      <h2 className="font-serif text-xl text-luxury-gold mt-8 mb-4">
        Packaging
      </h2>
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        All products are shipped in temperature-appropriate, luxury protective
        packaging to ensure they arrive in perfect condition. The packaging is
        designed to be gift-ready on arrival.
      </p>
      <h2 className="font-serif text-xl text-luxury-gold mt-8 mb-4">
        Order Tracking
      </h2>
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        Once your order is dispatched, you will receive tracking information via
        WhatsApp. You can also use our Order Tracking page to monitor your order
        status.
      </p>
    </PolicyPageWrapper>
  );
}

function RefundPage() {
  return (
    <PolicyPageWrapper title="Refund Policy">
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        Your satisfaction is our priority. We stand behind the quality of every
        product we create. Please read our policy carefully before placing your
        order.
      </p>
      <h2 className="font-serif text-xl text-luxury-gold mt-8 mb-4">
        No Returns on Edible Products
      </h2>
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        Due to the perishable and edible nature of our products, we do not
        accept returns or exchanges once an order has been delivered.
      </p>
      <h2 className="font-serif text-xl text-luxury-gold mt-8 mb-4">
        Damaged or Defective Items
      </h2>
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        If your order arrives damaged or defective, please report it within{" "}
        <strong className="text-luxury-gold">
          24 hours of receiving the package
        </strong>
        , along with an unboxing video as proof. Reports submitted after 24
        hours will not be eligible for replacements.
      </p>
      <h2 className="font-serif text-xl text-luxury-gold mt-8 mb-4">
        How to Report
      </h2>
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        Contact us via WhatsApp at +91 70458 99262 within 24 hours of delivery
        with:
      </p>
      <ul className="list-none space-y-2 mt-3 text-sm text-luxury-beige/70">
        <li className="flex items-start gap-2">
          <span className="text-luxury-gold mt-1">◈</span>Your order details
        </li>
        <li className="flex items-start gap-2">
          <span className="text-luxury-gold mt-1">◈</span>Clear photos of the
          damaged product
        </li>
        <li className="flex items-start gap-2">
          <span className="text-luxury-gold mt-1">◈</span>An unboxing video
          showing the damage
        </li>
      </ul>
      <h2 className="font-serif text-xl text-luxury-gold mt-8 mb-4">
        Resolution
      </h2>
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        Replacements are offered at our discretion after review of the submitted
        evidence. We do not offer cash refunds; replacements will be dispatched
        within 3–5 working days.
      </p>
    </PolicyPageWrapper>
  );
}

function TermsPage() {
  return (
    <PolicyPageWrapper title="Terms & Conditions">
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        By using our website and placing orders, you agree to these terms and
        conditions. Please read them carefully.
      </p>
      <h2 className="font-serif text-xl text-luxury-gold mt-8 mb-4">
        Orders & Payment
      </h2>
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        All orders are processed via WhatsApp. All prices are in Indian Rupees
        (INR) and are inclusive of premium packaging. We accept UPI, NEFT/IMPS
        bank transfers, and other prepaid modes. Cash on Delivery is not
        available.
      </p>
      <h2 className="font-serif text-xl text-luxury-gold mt-8 mb-4">
        Product Availability
      </h2>
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        All products are subject to availability. Miss Luxe products are
        produced in limited batches to maintain quality. We reserve the right to
        limit quantities or discontinue products without notice. Seasonal and
        limited edition items may sell out quickly.
      </p>
      <h2 className="font-serif text-xl text-luxury-gold mt-8 mb-4">
        Order Cancellation
      </h2>
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        Orders may be cancelled before dispatch by contacting us on WhatsApp.
        Once dispatched, orders cannot be cancelled. Cancellation of prepaid
        orders will be handled on a case-by-case basis.
      </p>
      <h2 className="font-serif text-xl text-luxury-gold mt-8 mb-4">
        Intellectual Property
      </h2>
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        All content on this website, including images, text, branding, and
        product photography, is the intellectual property of Miss Luxe and may
        not be reproduced without prior written permission.
      </p>
      <h2 className="font-serif text-xl text-luxury-gold mt-8 mb-4">
        Governing Law
      </h2>
      <p className="text-sm leading-relaxed text-luxury-beige/70">
        These terms are governed by the laws of India. Any disputes shall be
        subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra.
      </p>
    </PolicyPageWrapper>
  );
}

// ─── Route Tree ──────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
      <ChatBot />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$productId",
  component: ProductDetailPageWrapper,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const trackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/track",
  component: TrackOrderPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminDashboard,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: PrivacyPage,
});

const shippingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shipping",
  component: ShippingPage,
});

const refundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/refund",
  component: RefundPage,
});

const returnsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/returns",
  component: RefundPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: TermsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  productDetailRoute,
  cartRoute,
  aboutRoute,
  trackRoute,
  adminRoute,
  privacyRoute,
  shippingRoute,
  refundRoute,
  returnsRoute,
  termsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}
