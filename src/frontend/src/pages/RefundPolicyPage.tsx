import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

interface PolicyPageProps {
  onCartOpen: () => void;
}

export default function RefundPolicyPage({ onCartOpen }: PolicyPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-luxury-black font-sans">
      <Navigation onCartOpen={onCartOpen} />

      <main className="pt-20">
        <PolicyHero
          title="Refund Policy"
          subtitle="Our Commitment to Quality Assurance"
        />

        <section
          className="py-16 lg:py-24"
          style={{ backgroundColor: "oklch(0.09 0 0)" }}
        >
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <PolicySection title="No Returns on Edible Products">
              <p>
                In adherence to the highest standards of food safety and
                hygiene,{" "}
                <strong>
                  Miss Luxe does not accept returns on any edible products
                </strong>
                . Once an order has been dispatched, it cannot be returned or
                exchanged under any circumstances.
              </p>
              <p>
                This policy exists to protect the integrity of our products and
                the health and safety of all our customers. We appreciate your
                understanding of this essential measure.
              </p>
            </PolicySection>

            <PolicySection title="Damaged or Defective Items">
              <p>
                We take extraordinary care in packaging every order. However, in
                the rare event that your product arrives damaged or defective,
                we are committed to making it right.
              </p>
              <p>
                To be eligible for a replacement, the following conditions must
                be met:
              </p>
              <ul className="list-none space-y-3 mt-4">
                {[
                  "The damage must be reported within 24 hours of delivery.",
                  "An unboxing video clearly showing the damaged product and packaging must be provided.",
                  "The original packaging must be retained for inspection.",
                  "The claim must be submitted via WhatsApp at +91 70458 99262.",
                ].map((item) => (
                  <li
                    key={item.slice(0, 20)}
                    className="flex items-start gap-3"
                  >
                    <span
                      style={{ color: "oklch(0.72 0.12 85)", marginTop: "2px" }}
                    >
                      ◈
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </PolicySection>

            <PolicySection title="Replacement Process">
              <p>
                Upon receipt and verification of your damage claim, our team
                will review the unboxing video and assess the extent of the
                damage. If the claim is approved, a replacement order will be
                dispatched within 2–3 business days at no additional cost.
              </p>
              <p>
                Please note that replacements are subject to product
                availability. In cases where the specific product is
                unavailable, we will offer an equivalent product of equal or
                greater value.
              </p>
            </PolicySection>

            <PolicySection title="Order Cancellations">
              <p>
                Orders may be cancelled within{" "}
                <strong>2 hours of placement</strong>, provided they have not
                yet been dispatched. To request a cancellation, please contact
                us immediately via WhatsApp at +91 70458 99262.
              </p>
              <p>
                Once an order has been dispatched, cancellations are no longer
                possible. Refunds for cancelled orders will be processed within
                5–7 business days to the original payment method.
              </p>
            </PolicySection>

            <PolicySection title="Contact for Claims">
              <p>
                For all damage claims, replacement requests, or policy-related
                queries, please reach out to our customer care team via WhatsApp
                at <strong>+91 70458 99262</strong> or email us at
                hello@missluxe.com.
              </p>
              <p>
                Our team is available Monday through Saturday, 10:00 AM to 7:00
                PM IST.
              </p>
            </PolicySection>

            <div className="mt-12">
              <button
                type="button"
                onClick={() => navigate({ to: "/" })}
                className="flex items-center gap-2 font-sans text-sm tracking-widest uppercase transition-colors duration-200"
                style={{ color: "oklch(0.65 0.04 80)", letterSpacing: "0.1em" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "oklch(0.72 0.12 85)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "oklch(0.65 0.04 80)";
                }}
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
      style={{
        backgroundColor: "oklch(0.08 0 0)",
        borderBottom: "1px solid oklch(0.72 0.12 85 / 0.15)",
      }}
    >
      <p className="section-label mb-4">Miss Luxe</p>
      <h1
        className="font-serif text-4xl lg:text-5xl font-bold mb-4"
        style={{ color: "oklch(0.93 0.04 85)" }}
      >
        {title}
      </h1>
      <div className="gold-divider w-20 mx-auto mb-4" />
      <p
        className="font-sans font-light text-base"
        style={{ color: "oklch(0.65 0.04 80)" }}
      >
        {subtitle}
      </p>
    </div>
  );
}

function PolicySection({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2
        className="font-serif text-2xl font-bold mb-3"
        style={{ color: "oklch(0.93 0.04 85)" }}
      >
        {title}
      </h2>
      <div className="gold-divider w-10 mb-5" />
      <div
        className="font-sans font-light text-base leading-8 space-y-4"
        style={{ color: "oklch(0.75 0.04 80)" }}
      >
        {children}
      </div>
    </div>
  );
}
