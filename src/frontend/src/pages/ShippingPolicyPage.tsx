import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';

interface PolicyPageProps {
  onCartOpen: () => void;
}

export default function ShippingPolicyPage({ onCartOpen }: PolicyPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-luxury-black font-sans">
      <Navigation onCartOpen={onCartOpen} />

      <main className="pt-20">
        <PolicyHero title="Shipping Policy" subtitle="Delivering Luxury to Your Doorstep" />

        <section className="py-16 lg:py-24" style={{ backgroundColor: 'oklch(0.09 0 0)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <PolicySection title="Delivery Timeline">
              <p>All Miss Luxe orders are dispatched within 1–2 business days of payment confirmation. Delivery is completed within <strong>3–5 working days</strong> from the date of dispatch, subject to the delivery location and courier partner availability.</p>
              <p>Orders placed on weekends or public holidays will be processed on the next available business day.</p>
            </PolicySection>

            <PolicySection title="Shipping Coverage">
              <p>Miss Luxe ships across <strong>all of India</strong>. We partner with premium courier services to ensure your order arrives in pristine condition, maintaining the integrity of our handcrafted products throughout transit.</p>
              <p>For remote or difficult-to-access locations, delivery timelines may extend by an additional 1–2 working days. Our team will notify you in such cases.</p>
            </PolicySection>

            <PolicySection title="Prepaid Orders Only">
              <p>Miss Luxe operates on a <strong>prepaid-only basis</strong>. All orders must be paid in full prior to dispatch. We do not accept Cash on Delivery (COD) to ensure the integrity of our premium packaging and the quality of our handcrafted products during transit.</p>
              <p>Payment confirmation will be sent via WhatsApp or email upon receipt of your order.</p>
            </PolicySection>

            <PolicySection title="Packaging Standards">
              <p>Every Miss Luxe order is packaged with the utmost care. Our signature black lacquer boxes are designed to protect the product during transit while delivering an unboxing experience befitting a luxury gift.</p>
              <p>Temperature-sensitive products are packed with appropriate insulation to maintain freshness throughout the delivery journey.</p>
            </PolicySection>

            <PolicySection title="Order Tracking">
              <p>Once your order is dispatched, you will receive a tracking number via WhatsApp. You may use this to monitor your delivery in real time through our courier partner's platform.</p>
              <p>For any shipping-related queries, please contact us on WhatsApp at +91 70458 99262.</p>
            </PolicySection>

            <div className="mt-12">
              <button
                onClick={() => navigate({ to: '/' })}
                className="flex items-center gap-2 font-sans text-sm tracking-widest uppercase transition-colors duration-200"
                style={{ color: 'oklch(0.65 0.04 80)', letterSpacing: '0.1em' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'oklch(0.72 0.12 85)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'oklch(0.65 0.04 80)')}
              >
                <ArrowLeft size={16} />
                Return to Home
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}

function PolicyHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      className="py-20 text-center"
      style={{ backgroundColor: 'oklch(0.08 0 0)', borderBottom: '1px solid oklch(0.72 0.12 85 / 0.15)' }}
    >
      <p className="section-label mb-4">Miss Luxe</p>
      <h1
        className="font-serif text-4xl lg:text-5xl font-bold mb-4"
        style={{ color: 'oklch(0.93 0.04 85)' }}
      >
        {title}
      </h1>
      <div className="gold-divider w-20 mx-auto mb-4" />
      <p
        className="font-sans font-light text-base"
        style={{ color: 'oklch(0.65 0.04 80)' }}
      >
        {subtitle}
      </p>
    </div>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2
        className="font-serif text-2xl font-bold mb-3"
        style={{ color: 'oklch(0.93 0.04 85)' }}
      >
        {title}
      </h2>
      <div className="gold-divider w-10 mb-5" />
      <div
        className="font-sans font-light text-base leading-8 space-y-4"
        style={{ color: 'oklch(0.75 0.04 80)' }}
      >
        {children}
      </div>
    </div>
  );
}
