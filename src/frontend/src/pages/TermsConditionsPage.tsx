import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';

interface PolicyPageProps {
  onCartOpen: () => void;
}

export default function TermsConditionsPage({ onCartOpen }: PolicyPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-luxury-black font-sans">
      <Navigation onCartOpen={onCartOpen} />

      <main className="pt-20">
        <PolicyHero title="Terms & Conditions" subtitle="Governing Your Experience with Miss Luxe" />

        <section className="py-16 lg:py-24" style={{ backgroundColor: 'oklch(0.09 0 0)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <PolicySection title="1. Acceptance of Terms">
              <p>By accessing or using the Miss Luxe website and placing an order, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please refrain from using our services.</p>
              <p>Miss Luxe reserves the right to modify these terms at any time. Continued use of our services following any changes constitutes your acceptance of the revised terms.</p>
            </PolicySection>

            <PolicySection title="2. Use of Website">
              <p>This website is intended for personal, non-commercial use. You may not reproduce, distribute, or exploit any content from this website without prior written consent from Miss Luxe.</p>
              <p>You agree not to use this website for any unlawful purpose or in any manner that could damage, disable, or impair the website's functionality.</p>
            </PolicySection>

            <PolicySection title="3. Product Information">
              <p>We endeavour to ensure that all product descriptions, images, and pricing on this website are accurate. However, Miss Luxe reserves the right to correct any errors or inaccuracies and to change or update information at any time without prior notice.</p>
              <p>Product images are for illustrative purposes only. Actual products may vary slightly in appearance due to the handcrafted nature of our creations.</p>
            </PolicySection>

            <PolicySection title="4. Order Acceptance">
              <p>The placement of an order does not constitute a binding contract until payment has been confirmed and an order confirmation has been issued by Miss Luxe. We reserve the right to refuse or cancel any order at our discretion.</p>
              <p>In the event of a pricing error, we will notify you and offer the option to proceed at the correct price or cancel the order with a full refund.</p>
            </PolicySection>

            <PolicySection title="5. Payment Terms">
              <p>All orders are processed on a <strong>prepaid basis only</strong>. Payment must be completed in full before an order is dispatched. We accept payments via the methods communicated through our WhatsApp ordering process.</p>
              <p>All prices are listed in Indian Rupees (₹) and are inclusive of premium packaging. Applicable taxes are included in the displayed price.</p>
            </PolicySection>

            <PolicySection title="6. Intellectual Property">
              <p>All content on this website, including but not limited to text, images, logos, and design elements, is the exclusive intellectual property of Miss Luxe and is protected by applicable copyright and trademark laws.</p>
              <p>Unauthorised use, reproduction, or distribution of any content from this website is strictly prohibited.</p>
            </PolicySection>

            <PolicySection title="7. Limitation of Liability">
              <p>Miss Luxe shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our liability is limited to the value of the order placed.</p>
              <p>We are not responsible for delays or failures in delivery caused by circumstances beyond our reasonable control, including but not limited to natural disasters, strikes, or courier disruptions.</p>
            </PolicySection>

            <PolicySection title="8. Governing Law">
              <p>These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.</p>
            </PolicySection>

            <PolicySection title="9. Contact">
              <p>For any queries regarding these Terms and Conditions, please contact us via WhatsApp at <strong>+91 70458 99262</strong> or email us at hello@missluxe.com.</p>
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
