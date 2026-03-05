import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Package,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiInstagram } from "react-icons/si";
import { useCart } from "../context/CartContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsCallerAdmin } from "../hooks/useQueries";

interface NavigationProps {
  onCartOpen: () => void;
}

export default function Navigation({ onCartOpen }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { totalItems } = useCart();
  const { identity, login, clear, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const isAuthenticated = !!identity;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: isAdmin } = useIsCallerAdmin();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "About", id: "about" },
    { label: "Collection", id: "products" },
    { label: "Gift Sets", id: "gifts" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-luxury-black/95 backdrop-blur-md border-b border-luxury-gold/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex flex-col leading-none"
            aria-label="Miss Luxe Home"
          >
            <span className="font-display text-luxury-gold text-xl md:text-2xl tracking-[0.2em] uppercase">
              Miss Luxe
            </span>
            <span className="font-sans text-luxury-beige/50 text-[9px] tracking-[0.4em] uppercase mt-0.5">
              Artisan Chocolates
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="nav-link font-sans text-sm tracking-widest uppercase text-luxury-beige/70 hover:text-luxury-gold transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a
              href="/about"
              className="nav-link font-sans text-sm tracking-widest uppercase text-luxury-beige/70 hover:text-luxury-gold transition-colors"
            >
              Our Story
            </a>
            <a
              href="/track"
              className="nav-link font-sans text-sm tracking-widest uppercase text-luxury-beige/70 hover:text-luxury-gold transition-colors"
            >
              Track Order
            </a>
            <a
              href="https://instagram.com/miss.luxeco"
              target="_blank"
              rel="noopener noreferrer"
              className="text-luxury-beige/60 hover:text-luxury-gold transition-colors"
              aria-label="Follow Miss Luxe on Instagram"
            >
              <SiInstagram className="w-4 h-4" />
            </a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Internet Identity auth */}
            {!isAuthenticated ? (
              <button
                type="button"
                onClick={login}
                disabled={isLoggingIn || isInitializing}
                className="hidden md:flex items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-luxury-gold/70 hover:text-luxury-gold transition-colors disabled:opacity-40"
                aria-label="Sign in"
              >
                {isLoggingIn ? (
                  <span className="w-4 h-4 border border-luxury-gold/50 border-t-luxury-gold rounded-full animate-spin inline-block" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                <span className="hidden lg:inline">Sign In</span>
              </button>
            ) : (
              <div ref={dropdownRef} className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => setAccountOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 text-luxury-gold/70 hover:text-luxury-gold transition-colors p-1"
                  aria-label="Account menu"
                  aria-expanded={accountOpen}
                >
                  <User className="w-5 h-5" />
                </button>
                {accountOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-luxury-black border border-luxury-gold/20 shadow-gold-lg z-50">
                    {isAdmin && (
                      <a
                        href="/admin"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 font-sans text-xs uppercase tracking-widest text-luxury-gold/80 hover:text-luxury-gold hover:bg-luxury-gold/5 transition-colors border-b border-luxury-gold/10"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Admin
                      </a>
                    )}
                    <a
                      href="/track"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 font-sans text-xs uppercase tracking-widest text-luxury-beige/70 hover:text-luxury-gold hover:bg-luxury-gold/5 transition-colors border-b border-luxury-gold/10"
                    >
                      <Package className="w-4 h-4" />
                      My Orders
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setAccountOpen(false);
                        clear();
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 font-sans text-xs uppercase tracking-widest text-luxury-beige/70 hover:text-luxury-gold hover:bg-luxury-gold/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Cart */}
            <button
              type="button"
              onClick={onCartOpen}
              className="relative text-luxury-beige/70 hover:text-luxury-gold transition-colors p-1"
              aria-label={`Open cart${totalItems > 0 ? `, ${totalItems} items` : ""}`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-luxury-gold text-luxury-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="md:hidden text-luxury-beige/70 hover:text-luxury-gold transition-colors p-1"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-luxury-black/98 border-t border-luxury-gold/20 px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className="block w-full text-left font-sans text-sm tracking-widest uppercase text-luxury-beige/70 hover:text-luxury-gold transition-colors py-2"
            >
              {link.label}
            </button>
          ))}
          <a
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block font-sans text-sm tracking-widest uppercase text-luxury-beige/70 hover:text-luxury-gold transition-colors py-2"
          >
            Our Story
          </a>
          <a
            href="/track"
            onClick={() => setMobileOpen(false)}
            className="block font-sans text-sm tracking-widest uppercase text-luxury-beige/70 hover:text-luxury-gold transition-colors py-2"
          >
            Track Order
          </a>
          <div className="pt-4 border-t border-luxury-gold/20 space-y-3">
            {!isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  login();
                }}
                disabled={isLoggingIn || isInitializing}
                className="flex items-center gap-2 w-full font-sans text-sm tracking-widest uppercase text-luxury-gold/70 hover:text-luxury-gold py-2 disabled:opacity-40"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            ) : (
              <>
                {isAdmin && (
                  <a
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 font-sans text-sm tracking-widest uppercase text-luxury-gold hover:text-luxury-gold/80 py-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Admin
                  </a>
                )}
                <a
                  href="/track"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 font-sans text-sm tracking-widest uppercase text-luxury-gold/70 hover:text-luxury-gold py-2"
                >
                  <Package className="w-4 h-4" />
                  My Orders
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    clear();
                  }}
                  className="flex items-center gap-2 w-full font-sans text-sm tracking-widest uppercase text-luxury-beige/50 hover:text-luxury-gold py-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            )}
            <a
              href="https://instagram.com/miss.luxeco"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full font-sans text-sm tracking-widest uppercase text-luxury-beige/70 hover:text-luxury-gold transition-colors py-2"
              onClick={() => setMobileOpen(false)}
            >
              <SiInstagram className="w-4 h-4" />
              Instagram
            </a>
            <a
              href="https://wa.me/917045899262"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold block text-center py-3 text-sm"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
