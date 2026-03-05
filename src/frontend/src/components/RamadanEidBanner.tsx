import { X } from "lucide-react";
import { useEffect, useState } from "react";

// Versioned key — changing this resets dismissal for a new season
const DISMISSED_KEY = "miss-luxe-ramadan-2026-dismissed";

const WA_HREF =
  "https://wa.me/917045899262?text=Ramadan%202026%20%26%20Eid%20Special%20Gifting%20-%20I%27d%20like%20to%20order%20from%20Miss%20Luxe";

type SvgProps = { className?: string; style?: React.CSSProperties };

// Crescent Moon SVG
function CrescentMoon({ className, style }: SvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

// Eight-pointed star / sparkle SVG
function StarOrnament({ className, style }: SvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l2.09 6.26L20 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l5.91-1.01L12 2z" />
    </svg>
  );
}

// Small diamond sparkle
function DiamondSparkle({ className, style }: SvgProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      style={style}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0l1.5 6.5L16 8l-6.5 1.5L8 16l-1.5-6.5L0 8l6.5-1.5z" />
    </svg>
  );
}

export default function RamadanEidBanner() {
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem(DISMISSED_KEY) === "true";
    setDismissed(isDismissed);
    setMounted(true);
  }, []);

  function handleDismiss() {
    localStorage.setItem(DISMISSED_KEY, "true");
    setDismissed(true);
  }

  if (!mounted || dismissed) return null;

  return (
    <div
      data-ocid="banner.section"
      className="relative overflow-hidden w-full"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.08 0.005 60) 0%, oklch(0.12 0.015 60) 40%, oklch(0.1 0.01 60) 100%)",
        borderBottom: "1px solid oklch(0.78 0.12 80 / 0.35)",
      }}
      role="banner"
      aria-label="Ramadan & Eid Special Offer"
    >
      {/* Shimmer sweep animation */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, transparent 35%, oklch(0.78 0.12 80 / 0.07) 50%, transparent 65%)",
          backgroundSize: "200% 100%",
          animation: "banner-shimmer 3.5s ease-in-out infinite",
        }}
      />

      {/* Decorative lantern-glow blobs */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-32 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at left center, oklch(0.78 0.12 80 / 0.4), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-32 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at right center, oklch(0.78 0.12 80 / 0.4), transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 py-3 pr-14">
        <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:justify-center sm:gap-4 sm:py-1">
          {/* Left ornaments */}
          <div
            className="hidden items-center gap-1.5 sm:flex"
            aria-hidden="true"
          >
            <CrescentMoon
              className="h-4 w-4"
              style={{
                color: "oklch(0.78 0.12 80)",
                filter: "drop-shadow(0 0 4px oklch(0.78 0.12 80 / 0.6))",
              }}
            />
            <DiamondSparkle
              className="h-2.5 w-2.5"
              style={{
                color: "oklch(0.78 0.12 80 / 0.7)",
                animation: "sparkle-pulse 2s ease-in-out infinite",
              }}
            />
            <StarOrnament
              className="h-3.5 w-3.5"
              style={{
                color: "oklch(0.78 0.12 80)",
                animation: "star-rotate 8s linear infinite",
                filter: "drop-shadow(0 0 3px oklch(0.78 0.12 80 / 0.5))",
              }}
            />
          </div>

          {/* Text content */}
          <div className="flex flex-col items-center gap-0.5 text-center sm:flex-row sm:gap-3">
            {/* Mobile: crescent + star inline */}
            <div
              className="flex items-center gap-2 sm:hidden"
              aria-hidden="true"
            >
              <CrescentMoon
                className="h-3.5 w-3.5"
                style={{ color: "oklch(0.78 0.12 80)" }}
              />
              <StarOrnament
                className="h-3 w-3"
                style={{ color: "oklch(0.78 0.12 80)" }}
              />
            </div>

            <p
              className="font-serif text-sm font-semibold tracking-wide sm:text-base"
              style={{
                color: "oklch(0.78 0.12 80)",
                textShadow: "0 0 12px oklch(0.78 0.12 80 / 0.4)",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Ramadan 2026 Mubarak &amp; Eid Mubarak
              <span
                className="mx-1.5 hidden sm:inline"
                style={{ color: "oklch(0.78 0.12 80 / 0.5)" }}
              >
                —
              </span>
              <span
                className="block sm:inline"
                style={{ color: "oklch(0.92 0.02 80)" }}
              >
                Gift the Luxury of Miss Luxe
              </span>
            </p>

            <span
              className="hidden font-sans text-xs sm:inline"
              style={{ color: "oklch(0.78 0.12 80 / 0.5)" }}
            >
              ·
            </span>

            <p
              className="font-sans text-xs tracking-wide"
              style={{ color: "oklch(0.92 0.02 80 / 0.65)" }}
            >
              Celebrate with our handcrafted date chocolates — perfect for
              Ramadan &amp; Eid gifting
            </p>
          </div>

          {/* Right ornaments */}
          <div
            className="hidden items-center gap-1.5 sm:flex"
            aria-hidden="true"
          >
            <StarOrnament
              className="h-3.5 w-3.5"
              style={{
                color: "oklch(0.78 0.12 80)",
                animation: "star-rotate 8s linear infinite reverse",
                filter: "drop-shadow(0 0 3px oklch(0.78 0.12 80 / 0.5))",
              }}
            />
            <DiamondSparkle
              className="h-2.5 w-2.5"
              style={{
                color: "oklch(0.78 0.12 80 / 0.7)",
                animation: "sparkle-pulse 2s ease-in-out 1s infinite",
              }}
            />
            <CrescentMoon
              className="h-4 w-4"
              style={{
                color: "oklch(0.78 0.12 80)",
                filter: "drop-shadow(0 0 4px oklch(0.78 0.12 80 / 0.6))",
                transform: "scaleX(-1)",
              }}
            />
          </div>

          {/* CTA button */}
          <a
            data-ocid="banner.primary_button"
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 shrink-0 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-300 sm:mt-0"
            style={{
              background: "oklch(0.78 0.12 80)",
              color: "oklch(0.08 0.005 60)",
              borderRadius: "1px",
              letterSpacing: "0.12em",
            }}
            onClick={(e) => {
              e.preventDefault();
              window.open(WA_HREF, "_blank", "noopener,noreferrer");
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "oklch(0.92 0.02 80)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "oklch(0.78 0.12 80)";
            }}
          >
            Order on WhatsApp
          </a>
        </div>
      </div>

      {/* Close button */}
      <button
        type="button"
        data-ocid="banner.close_button"
        onClick={handleDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm p-1 transition-colors duration-200"
        style={{
          color: "oklch(0.78 0.12 80 / 0.6)",
        }}
        aria-label="Dismiss Ramadan Eid banner"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color =
            "oklch(0.78 0.12 80)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color =
            "oklch(0.78 0.12 80 / 0.6)";
        }}
      >
        <X size={14} strokeWidth={2} />
      </button>

      {/* Keyframe styles */}
      <style>{`
        @keyframes banner-shimmer {
          0% { background-position: -100% 0; }
          60% { background-position: 200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes sparkle-pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes star-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
