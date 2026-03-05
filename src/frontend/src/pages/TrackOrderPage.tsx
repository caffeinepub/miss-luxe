import {
  CheckCircle,
  Loader2,
  LogIn,
  MapPin,
  Package,
  RefreshCw,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { OrderStatus } from "../backend";
import CartDrawer from "../components/CartDrawer";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetMyOrders } from "../hooks/useQueries";

// Maps backend status to display steps
// Backend: PENDING | DELIVERED
// Display: Confirmed → Packed → Dispatched → Delivered
const STEPS = [
  { key: "confirmed", label: "Confirmed", icon: CheckCircle },
  { key: "packed", label: "Packed", icon: Package },
  { key: "dispatched", label: "Dispatched", icon: Truck },
  { key: "delivered", label: "Delivered", icon: MapPin },
] as const;

function getActiveStepIndex(status: OrderStatus): number {
  if (status === OrderStatus.DELIVERED) return 3;
  // PENDING = Confirmed only
  return 0;
}

function formatDate(nanoseconds: bigint): string {
  const ms = Number(nanoseconds) / 1_000_000;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function StatusTracker({ status }: { status: OrderStatus }) {
  const activeIdx = getActiveStepIndex(status);

  return (
    <div className="flex items-center gap-0 w-full overflow-x-auto">
      {STEPS.map((step, idx) => {
        const Icon = step.icon;
        const isActive = idx <= activeIdx;
        const isCurrent = idx === activeIdx;
        const isLast = idx === STEPS.length - 1;

        return (
          <div key={step.key} className="flex items-center flex-1 min-w-0">
            {/* Step */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 shrink-0 ${
                  isActive
                    ? isCurrent
                      ? "bg-luxury-gold border-luxury-gold text-luxury-black shadow-gold"
                      : "bg-luxury-gold/20 border-luxury-gold text-luxury-gold"
                    : "bg-luxury-black border-luxury-gold/20 text-luxury-beige/20"
                }`}
              >
                <Icon size={16} />
              </div>
              <span
                className={`font-sans text-[10px] uppercase tracking-widest whitespace-nowrap ${
                  isActive ? "text-luxury-gold" : "text-luxury-beige/25"
                }`}
              >
                {step.label}
              </span>
            </div>
            {/* Connector */}
            {!isLast && (
              <div
                className={`flex-1 h-px mx-2 transition-all duration-300 ${
                  idx < activeIdx ? "bg-luxury-gold" : "bg-luxury-gold/15"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function TrackOrderPage() {
  const [cartOpen, setCartOpen] = useState(false);
  const { identity, login, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: orders, isLoading, refetch, isRefetching } = useGetMyOrders();

  return (
    <div className="min-h-screen bg-luxury-black">
      <Navigation onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <main className="pt-28 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="font-sans text-luxury-gold text-xs tracking-[0.5em] uppercase mb-4">
              Order Status
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-luxury-beige mb-6">
              Track Your Order
            </h1>
            <div className="w-16 h-px bg-luxury-gold/50 mx-auto" />
          </div>

          {/* Unauthenticated state */}
          {!isAuthenticated && (
            <div className="text-center py-20 border border-luxury-gold/10 bg-[oklch(0.10_0_0)]">
              <div className="w-16 h-16 rounded-full border border-luxury-gold/30 flex items-center justify-center mx-auto mb-8">
                <LogIn className="w-7 h-7 text-luxury-gold/60" />
              </div>
              <h2 className="font-serif text-2xl text-luxury-beige mb-4">
                Sign In to Track Your Orders
              </h2>
              <p className="font-sans font-light text-luxury-beige/50 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
                Please sign in with your Internet Identity to view the status of
                your prepaid orders.
              </p>
              <button
                type="button"
                onClick={login}
                disabled={isLoggingIn || isInitializing}
                className="btn-gold inline-flex items-center gap-3 px-10 py-4 text-xs tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>
              <p className="font-sans text-luxury-beige/25 text-xs mt-6 max-w-xs mx-auto">
                Secure authentication via Internet Identity — your data stays
                private.
              </p>
            </div>
          )}

          {/* Authenticated state */}
          {isAuthenticated && (
            <div>
              {/* Refresh button */}
              <div className="flex justify-end mb-8">
                <button
                  type="button"
                  onClick={() => refetch()}
                  disabled={isRefetching}
                  className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-luxury-gold/60 hover:text-luxury-gold border border-luxury-gold/20 hover:border-luxury-gold/50 px-4 py-2 transition-all disabled:opacity-40"
                >
                  <RefreshCw
                    className={`w-3 h-3 ${isRefetching ? "animate-spin" : ""}`}
                  />
                  Refresh
                </button>
              </div>

              {/* Loading state */}
              {isLoading && (
                <div className="text-center py-20">
                  <Loader2 className="w-8 h-8 text-luxury-gold/50 animate-spin mx-auto mb-6" />
                  <p className="font-sans text-luxury-beige/50 text-sm">
                    Fetching your orders...
                  </p>
                </div>
              )}

              {/* No orders */}
              {!isLoading && (!orders || orders.length === 0) && (
                <div className="text-center py-20 border border-luxury-gold/10 bg-[oklch(0.10_0_0)]">
                  <Package className="w-14 h-14 text-luxury-gold/20 mx-auto mb-6" />
                  <h3 className="font-serif text-xl text-luxury-beige mb-3">
                    No Orders Found
                  </h3>
                  <p className="font-sans font-light text-luxury-beige/45 text-sm leading-relaxed max-w-sm mx-auto mb-8">
                    You have no orders yet. Place your first order to experience
                    the Miss Luxe difference.
                  </p>
                  <a
                    href="/#products"
                    className="btn-gold inline-block px-10 py-3 text-xs tracking-widest"
                  >
                    Shop Now
                  </a>
                </div>
              )}

              {/* Orders list */}
              {!isLoading && orders && orders.length > 0 && (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div
                      key={String(order.id)}
                      className="border border-luxury-gold/10 hover:border-luxury-gold/25 transition-all duration-300 bg-[oklch(0.10_0_0)]"
                    >
                      {/* Order header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-luxury-gold/10">
                        <div>
                          <p className="font-sans text-luxury-gold text-xs tracking-[0.3em] uppercase mb-1">
                            Order #{String(order.id)}
                          </p>
                          <h3 className="font-serif text-luxury-beige text-xl">
                            {order.itemName}
                          </h3>
                          <p className="font-sans text-luxury-beige/40 text-xs mt-1">
                            Placed on {formatDate(order.createdAt)} · Qty:{" "}
                            {String(order.quantity)}
                          </p>
                        </div>
                        <span
                          className={`self-start sm:self-auto px-3 py-1 font-sans text-xs uppercase tracking-widest border ${
                            order.status === OrderStatus.DELIVERED
                              ? "border-luxury-gold bg-luxury-gold/10 text-luxury-gold"
                              : "border-luxury-gold/30 bg-luxury-gold/5 text-luxury-gold/70"
                          }`}
                        >
                          {order.status === OrderStatus.DELIVERED
                            ? "Delivered"
                            : "In Progress"}
                        </span>
                      </div>

                      {/* Step tracker */}
                      <div className="p-6 pt-8">
                        <StatusTracker status={order.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Help note */}
          <div className="mt-16 text-center">
            <p className="font-sans text-luxury-beige/30 text-xs leading-relaxed">
              For order queries, reach us on{" "}
              <a
                href="https://wa.me/917045899262"
                target="_blank"
                rel="noopener noreferrer"
                className="text-luxury-gold/60 hover:text-luxury-gold transition-colors"
              >
                WhatsApp
              </a>{" "}
              or call{" "}
              <a
                href="tel:+917045899262"
                className="text-luxury-gold/60 hover:text-luxury-gold transition-colors"
              >
                +91 70458 99262
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}
