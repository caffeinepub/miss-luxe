import { useState } from 'react';
import {
  LayoutDashboard,
  LogIn,
  Loader2,
  RefreshCw,
  ShieldOff,
  Package,
  CheckCircle2,
  Clock,
  TrendingUp,
  ChevronDown,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin, useGetAllOrders } from '../hooks/useQueries';
import { useActor } from '../hooks/useActor';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderStatus } from '../backend';
import type { Order } from '../backend';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(nanoseconds: bigint): string {
  const ms = Number(nanoseconds) / 1_000_000;
  const date = new Date(ms);
  if (isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent?: boolean;
}

function StatCard({ label, value, icon, accent }: StatCardProps) {
  return (
    <div
      className={`relative border p-6 transition-all duration-300 ${
        accent
          ? 'border-luxury-gold/40 bg-luxury-gold/5'
          : 'border-luxury-gold/15 bg-[oklch(0.10_0.005_60)]'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-luxury-beige/40 mb-2">
            {label}
          </p>
          <p
            className={`font-serif text-4xl ${
              accent ? 'text-luxury-gold' : 'text-luxury-beige'
            }`}
          >
            {value}
          </p>
        </div>
        <div
          className={`mt-1 ${accent ? 'text-luxury-gold/70' : 'text-luxury-beige/20'}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

// ─── Order Row ────────────────────────────────────────────────────────────────

interface OrderRowProps {
  order: Order;
  onToggleStatus: (orderId: bigint, newStatus: OrderStatus) => void;
  isUpdating: boolean;
}

function OrderRow({ order, onToggleStatus, isUpdating }: OrderRowProps) {
  const isDelivered = order.status === OrderStatus.DELIVERED;
  const nextStatus = isDelivered ? OrderStatus.PENDING : OrderStatus.DELIVERED;
  const principalShort = order.principal.toString().slice(0, 12) + '…';

  return (
    <tr className="border-b border-luxury-gold/8 hover:bg-luxury-gold/3 transition-colors group">
      <td className="px-5 py-4">
        <span className="font-serif text-luxury-gold text-sm">
          #{String(order.id)}
        </span>
      </td>
      <td className="px-5 py-4">
        <p className="font-sans text-luxury-beige text-sm">{order.itemName}</p>
      </td>
      <td className="px-5 py-4 text-center">
        <span className="font-sans text-luxury-beige/70 text-sm">
          {String(order.quantity)}
        </span>
      </td>
      <td className="px-5 py-4 hidden md:table-cell">
        <span className="font-sans text-luxury-beige/50 text-xs">
          {formatDate(order.createdAt)}
        </span>
      </td>
      <td className="px-5 py-4 hidden lg:table-cell">
        <span className="font-mono text-luxury-beige/30 text-[10px]">
          {principalShort}
        </span>
      </td>
      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 font-sans text-[10px] uppercase tracking-widest border transition-colors ${
            isDelivered
              ? 'border-luxury-gold/50 bg-luxury-gold/10 text-luxury-gold'
              : 'border-luxury-gold/20 bg-luxury-gold/4 text-luxury-beige/50'
          }`}
        >
          {isDelivered ? (
            <CheckCircle2 className="w-3 h-3" />
          ) : (
            <Clock className="w-3 h-3" />
          )}
          {isDelivered ? 'Delivered' : 'Pending'}
        </span>
      </td>
      <td className="px-5 py-4">
        <button
          type="button"
          disabled={isUpdating}
          onClick={() => onToggleStatus(order.id, nextStatus)}
          className={`flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-widest border px-3 py-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
            isDelivered
              ? 'border-luxury-beige/20 text-luxury-beige/50 hover:border-luxury-gold/40 hover:text-luxury-gold/70'
              : 'border-luxury-gold/30 text-luxury-gold/70 hover:border-luxury-gold hover:text-luxury-gold'
          }`}
        >
          {isUpdating ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
          {isDelivered ? 'Mark Pending' : 'Mark Delivered'}
        </button>
      </td>
    </tr>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [cartOpen, setCartOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState<bigint | null>(null);

  const { identity, login, isLoggingIn, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { actor } = useActor();
  const queryClient = useQueryClient();

  const {
    data: isAdmin,
    isLoading: isAdminLoading,
  } = useIsCallerAdmin();

  const {
    data: orders,
    isLoading: ordersLoading,
    refetch,
    isRefetching,
  } = useGetAllOrders();

  const updateMutation = useMutation({
    mutationFn: async ({
      orderId,
      newStatus,
    }: {
      orderId: bigint;
      newStatus: OrderStatus;
    }) => {
      if (!actor) throw new Error('Actor not ready');
      await actor.updateSingleOrder(orderId, newStatus);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allOrders'] });
    },
  });

  const handleToggleStatus = (orderId: bigint, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    updateMutation.mutate(
      { orderId, newStatus },
      { onSettled: () => setUpdatingId(null) }
    );
  };

  // ─── Stats ──────────────────────────────────────────────────────────────────
  const totalOrders = orders?.length ?? 0;
  const pendingOrders = orders?.filter(o => o.status === OrderStatus.PENDING).length ?? 0;
  const deliveredOrders = orders?.filter(o => o.status === OrderStatus.DELIVERED).length ?? 0;

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-luxury-black">
      <Navigation onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <main className="pt-28 pb-24 px-4">
        <div className="max-w-7xl mx-auto">

          {/* ── Page Header ─────────────────────────────────────────────── */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-2">
              <LayoutDashboard className="w-5 h-5 text-luxury-gold/60" />
              <p className="font-sans text-[10px] text-luxury-gold tracking-[0.5em] uppercase">
                Admin Dashboard
              </p>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-luxury-beige mb-3">
              Order Management
            </h1>
            <div className="w-16 h-px bg-luxury-gold/40" />
          </div>

          {/* ── Not Authenticated ────────────────────────────────────────── */}
          {!isAuthenticated && (
            <div className="text-center py-24 border border-luxury-gold/10 bg-[oklch(0.10_0.005_60)]">
              <div className="w-16 h-16 rounded-full border border-luxury-gold/25 flex items-center justify-center mx-auto mb-8">
                <LogIn className="w-7 h-7 text-luxury-gold/50" />
              </div>
              <h2 className="font-serif text-2xl text-luxury-beige mb-4">
                Administrator Sign In Required
              </h2>
              <p className="font-sans font-light text-luxury-beige/45 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
                This dashboard is restricted to authorised Miss Luxe administrators. Please sign in to continue.
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
                    Signing In…
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>
            </div>
          )}

          {/* ── Loading admin check ──────────────────────────────────────── */}
          {isAuthenticated && isAdminLoading && (
            <div className="text-center py-24">
              <Loader2 className="w-8 h-8 text-luxury-gold/50 animate-spin mx-auto mb-6" />
              <p className="font-sans text-luxury-beige/40 text-sm tracking-widest uppercase">
                Verifying permissions…
              </p>
            </div>
          )}

          {/* ── Access Denied ────────────────────────────────────────────── */}
          {isAuthenticated && !isAdminLoading && isAdmin === false && (
            <div className="text-center py-24 border border-luxury-gold/10 bg-[oklch(0.10_0.005_60)]">
              <div className="w-16 h-16 rounded-full border border-luxury-gold/25 flex items-center justify-center mx-auto mb-8">
                <ShieldOff className="w-7 h-7 text-luxury-beige/25" />
              </div>
              <h2 className="font-serif text-2xl text-luxury-beige mb-4">
                Access Denied
              </h2>
              <p className="font-sans font-light text-luxury-beige/45 text-sm leading-relaxed max-w-sm mx-auto">
                Your account does not have administrator privileges. Please contact Miss Luxe support if you believe this is an error.
              </p>
              <a
                href="/"
                className="btn-gold inline-block mt-10 px-10 py-3 text-xs tracking-widest"
              >
                Return Home
              </a>
            </div>
          )}

          {/* ── Admin Dashboard ──────────────────────────────────────────── */}
          {isAuthenticated && !isAdminLoading && isAdmin === true && (
            <div className="space-y-10">

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                  label="Total Orders"
                  value={totalOrders}
                  icon={<TrendingUp className="w-8 h-8" />}
                  accent
                />
                <StatCard
                  label="Pending"
                  value={pendingOrders}
                  icon={<Clock className="w-8 h-8" />}
                />
                <StatCard
                  label="Delivered"
                  value={deliveredOrders}
                  icon={<CheckCircle2 className="w-8 h-8" />}
                />
              </div>

              {/* Orders Table */}
              <div className="border border-luxury-gold/15">
                {/* Table header bar */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-luxury-gold/15 bg-[oklch(0.10_0.005_60)]">
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-luxury-gold/60" />
                    <h2 className="font-sans text-xs uppercase tracking-widest text-luxury-beige/70">
                      All Orders
                    </h2>
                    {totalOrders > 0 && (
                      <span className="font-sans text-[10px] text-luxury-gold/50 border border-luxury-gold/20 px-2 py-0.5">
                        {totalOrders}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => refetch()}
                    disabled={isRefetching || ordersLoading}
                    className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-luxury-gold/50 hover:text-luxury-gold border border-luxury-gold/15 hover:border-luxury-gold/40 px-3 py-1.5 transition-all disabled:opacity-40"
                  >
                    <RefreshCw
                      className={`w-3 h-3 ${isRefetching ? 'animate-spin' : ''}`}
                    />
                    Refresh
                  </button>
                </div>

                {/* Loading */}
                {ordersLoading && (
                  <div className="py-20 text-center">
                    <Loader2 className="w-7 h-7 text-luxury-gold/40 animate-spin mx-auto mb-5" />
                    <p className="font-sans text-luxury-beige/40 text-xs tracking-widest uppercase">
                      Loading orders…
                    </p>
                  </div>
                )}

                {/* Empty */}
                {!ordersLoading && (!orders || orders.length === 0) && (
                  <div className="py-20 text-center">
                    <Package className="w-12 h-12 text-luxury-gold/15 mx-auto mb-5" />
                    <h3 className="font-serif text-xl text-luxury-beige mb-2">
                      No Orders Yet
                    </h3>
                    <p className="font-sans text-luxury-beige/35 text-xs">
                      Orders placed by customers will appear here.
                    </p>
                  </div>
                )}

                {/* Table */}
                {!ordersLoading && orders && orders.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                      <thead>
                        <tr className="border-b border-luxury-gold/10 bg-[oklch(0.09_0.004_60)]">
                          {['Order ID', 'Item', 'Qty', 'Date', 'Customer', 'Status', 'Action'].map(
                            col => (
                              <th
                                key={col}
                                className="px-5 py-3 text-left font-sans text-[9px] uppercase tracking-[0.3em] text-luxury-beige/30"
                              >
                                {col}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <OrderRow
                            key={String(order.id)}
                            order={order}
                            onToggleStatus={handleToggleStatus}
                            isUpdating={updatingId === order.id}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Footer note */}
              <p className="font-sans text-luxury-beige/20 text-[10px] text-center tracking-widest uppercase">
                Miss Luxe Admin · All data is stored on-chain and tamper-proof
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}
