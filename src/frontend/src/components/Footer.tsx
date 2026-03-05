import { Phone } from "lucide-react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "miss-luxe",
  );

  return (
    <footer className="bg-luxury-black border-t border-luxury-gold/20 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="font-display text-luxury-gold text-2xl tracking-[0.2em] uppercase mb-2">
              Miss Luxe
            </div>
            <div className="font-sans text-luxury-beige/40 text-xs tracking-[0.4em] uppercase mb-4">
              Artisan Chocolates
            </div>
            <p className="font-sans text-luxury-beige/50 text-sm font-light leading-relaxed">
              Handcrafted luxury date chocolates for every celebration. Made
              with love in India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-luxury-gold text-xs tracking-[0.4em] uppercase mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Our Story", href: "/about" },
                { label: "Track Order", href: "/track" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Shipping Policy", href: "/shipping" },
                { label: "Returns & Refunds", href: "/returns" },
                { label: "Terms of Service", href: "/terms" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-luxury-beige/50 text-sm hover:text-luxury-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-luxury-gold text-xs tracking-[0.4em] uppercase mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/917045899262"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-sans text-luxury-beige/50 text-sm hover:text-luxury-gold transition-colors"
                >
                  <SiWhatsapp className="w-4 h-4 shrink-0" />
                  <span>+91 70458 99262</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+917045899262"
                  className="flex items-center gap-3 font-sans text-luxury-beige/50 text-sm hover:text-luxury-gold transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>+91 70458 99262</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/miss.luxeco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-sans text-luxury-beige/50 text-sm hover:text-luxury-gold transition-colors"
                >
                  <SiInstagram className="w-4 h-4 shrink-0" />
                  <span>@miss.luxeco</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-luxury-gold/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-luxury-beige/30 text-xs">
            © {year} Miss Luxe. All rights reserved.
          </p>
          <p className="font-sans text-luxury-beige/30 text-xs">
            Built with <span className="text-luxury-gold/60">♥</span> using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-luxury-gold/60 hover:text-luxury-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
