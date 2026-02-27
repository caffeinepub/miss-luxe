import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';

interface PolicyPageProps {
  onCartOpen: () => void;
}

export default function PrivacyPolicyPage({ onCartOpen }: PolicyPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-luxury-black font-sans">
      <Navigation onCartOpen={onCartOpen} />

      <main className="pt-20">
        <PolicyHero title="Privacy Policy" subtitle="Your Trust is Our Highest Commitment" />

        <section className="py-16 lg:py-24" style={{ backgroundColor: 'oklch(0.09 0 0)' }}>
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <PolicySection title="Information We Collect">
              <p>When you place an order or make an enquiry with Miss Luxe, we collect certain personal information necessary to fulfil your order. This may include your name, delivery address, phone number, and email address.</p>
              <p>We collect only the information that is strictly necessary for the purpose of processing your order and providing you with the highest standard of service.</p>
            </PolicySection>

            <PolicySection title="How We Use Your Information">
              <p>The personal information you provide is used exclusively for the following purposes:</p>
              <ul className="list-none space-y-3 mt-4">
                {[
                  'Processing and fulfilling your orders.',
                  'Communicating order confirmations, dispatch notifications, and delivery updates.',
                  'Responding to your enquiries and providing customer support.',
                  'Sending information about new collections or exclusive offers, only with your consent.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span style={{ color: 'oklch(0.72 0.12 85)', marginTop: '2px' }}>◈</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </PolicySection>

            <PolicySection title="Data Protection & Security">
              <p>Miss Luxe is committed to protecting your personal information. We implement appropriate technical and organisational measures to safeguard your data against unauthorised access, disclosure, alteration, or destruction.</p>
              <p>Your information is stored securely and is accessible only to authorised personnel who require it to fulfil your order or provide customer support.</p>
            </PolicySection>

            <PolicySection title="Third-Party Disclosure">
              <p>Miss Luxe does not sell, trade, or otherwise transfer your personal information to third parties, except as necessary to fulfil your order. This includes sharing your delivery address with our courier partners solely for the purpose of delivering your order.</p>
              <p>We do not share your information with marketing companies, data brokers, or any other third parties for commercial purposes.</p>
            </PolicySection>

            <PolicySection title="WhatsApp Communication">
              <p>When you contact us via WhatsApp, your messages and contact information are processed through WhatsApp's platform, which is subject to WhatsApp's own privacy policy. We use WhatsApp solely for order communication and customer support purposes.</p>
              <p>We will not add you to any broadcast lists or marketing groups without your explicit consent.</p>
            </PolicySection>

            <PolicySection title="Your Rights">
              <p>You have the right to access, correct, or request the deletion of your personal information held by Miss Luxe. To exercise any of these rights, please contact us via WhatsApp at <strong>+91 70458 99262</strong> or email us at hello@missluxe.com.</p>
              <p>We will respond to all data-related requests within 7 business days.</p>
            </PolicySection>

            <PolicySection title="Cookies">
              <p>Our website may use cookies to enhance your browsing experience. These are small text files stored on your device that help us understand how you interact with our website. You may disable cookies through your browser settings, though this may affect certain website functionality.</p>
            </PolicySection>

            <PolicySection title="Updates to This Policy">
              <p>Miss Luxe reserves the right to update this Privacy Policy at any time. Any changes will be reflected on this page with an updated effective date. We encourage you to review this policy periodically.</p>
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
