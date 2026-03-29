import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  occasion: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const WA_ICON = (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4 fill-current flex-shrink-0"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const IG_ICON = (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5 fill-current flex-shrink-0 text-luxury-gold/80"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

function buildWhatsAppHref(data: FormData): string {
  const text = [
    "Hello Miss Luxe! 🌹✨",
    "",
    "*New Inquiry from Website*",
    "",
    `◈ Name: ${data.name}`,
    `◈ Email: ${data.email}`,
    data.phone ? `◈ Phone: ${data.phone}` : null,
    data.occasion ? `◈ Occasion: ${data.occasion}` : null,
    "",
    "*Message:*",
    data.message,
    "",
    "Please reply at your earliest convenience. Thank you! 🌸",
  ]
    .filter((l) => l !== null)
    .join("\n");
  return `https://wa.me/917045899262?text=${encodeURIComponent(text)}`;
}

const occasions = [
  "",
  "Eid / Ramadan Gift",
  "Wedding / Engagement",
  "Birthday",
  "Corporate Gifting",
  "Anniversary",
  "Festival (Diwali, Christmas…)",
  "Personal Purchase",
  "Other",
];

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    occasion: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const href = buildWhatsAppHref(formData);
    // Use location.href so it works on ICP (no popup blocking)
    window.location.href = href;
    setSubmitted(true);
  };

  const borderClass = (field?: keyof FormErrors, focusKey?: string) => {
    const hasError = field && !!errors[field];
    const isFocused = focusKey ? focusedField === focusKey : false;
    if (hasError) return "border-red-500/60";
    if (isFocused)
      return "border-luxury-gold/70 shadow-[0_0_0_1px_oklch(0.78_0.12_80_/_0.15)]";
    return "border-luxury-gold/30 hover:border-luxury-gold/55";
  };

  const baseInput =
    "w-full bg-transparent border outline-none px-4 py-3.5 font-sans text-luxury-beige text-sm transition-all duration-200 placeholder:text-luxury-beige/30 rounded-none";

  const WA_DIRECT = `https://wa.me/917045899262?text=${encodeURIComponent("Hello Miss Luxe! 🌹\n\nI'd like to get in touch. Could you please help me?")}`;

  return (
    <section id="contact" className="py-20 md:py-32 bg-luxury-black">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-sans text-luxury-gold text-xs tracking-[0.5em] uppercase mb-4">
            Get in Touch
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-luxury-beige mb-4">
            Send an Inquiry
          </h2>
          <p className="font-sans text-luxury-beige/50 text-sm font-light mb-6">
            Fill in your details and we'll connect with you on WhatsApp
            instantly.
          </p>
          <div className="w-16 h-px bg-luxury-gold mx-auto" />
        </div>

        {/* Form card */}
        <div
          className="border border-luxury-gold/25 p-8 md:p-10"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.10 0.007 60) 0%, oklch(0.07 0.005 60) 100%)",
          }}
          data-ocid="contact.panel"
        >
          {submitted ? (
            <div className="text-center py-8" data-ocid="contact.success_state">
              <div className="w-14 h-14 border-2 border-luxury-gold/60 flex items-center justify-center mx-auto mb-6">
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 fill-current text-luxury-gold"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <p className="font-sans text-luxury-gold text-xs tracking-[0.4em] uppercase mb-2">
                Inquiry Sent
              </p>
              <h3 className="font-serif text-2xl text-luxury-beige mb-3">
                WhatsApp is Opening
              </h3>
              <p className="font-sans text-luxury-beige/60 text-sm font-light mb-8">
                Your inquiry details are pre-filled. Simply send the message to
                connect with our team.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    occasion: "",
                    message: "",
                  });
                }}
                className="font-sans text-luxury-gold/60 hover:text-luxury-gold text-xs tracking-[0.35em] uppercase transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="c-name"
                  className="block font-sans text-luxury-beige/70 text-[11px] tracking-[0.35em] uppercase mb-2"
                >
                  Full Name <span className="text-luxury-gold">*</span>
                </label>
                <input
                  id="c-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className={`${baseInput} ${borderClass("name", "name")}`}
                  placeholder="Your full name"
                  autoComplete="name"
                  data-ocid="contact.input"
                />
                {errors.name && (
                  <p
                    className="mt-1.5 text-red-400/80 text-xs font-sans"
                    data-ocid="contact.error_state"
                  >
                    ◈ {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="c-email"
                  className="block font-sans text-luxury-beige/70 text-[11px] tracking-[0.35em] uppercase mb-2"
                >
                  Email Address <span className="text-luxury-gold">*</span>
                </label>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={`${baseInput} ${borderClass("email", "email")}`}
                  placeholder="your@email.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <p
                    className="mt-1.5 text-red-400/80 text-xs font-sans"
                    data-ocid="contact.error_state"
                  >
                    ◈ {errors.email}
                  </p>
                )}
              </div>

              {/* Phone + Occasion row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="c-phone"
                    className="block font-sans text-luxury-beige/70 text-[11px] tracking-[0.35em] uppercase mb-2"
                  >
                    Phone{" "}
                    <span className="text-luxury-beige/30 text-[10px] normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="c-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    className={`${baseInput} ${borderClass(undefined, "phone")}`}
                    placeholder="+91 XXXXX XXXXX"
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label
                    htmlFor="c-occasion"
                    className="block font-sans text-luxury-beige/70 text-[11px] tracking-[0.35em] uppercase mb-2"
                  >
                    Occasion{" "}
                    <span className="text-luxury-beige/30 text-[10px] normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <select
                    id="c-occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("occasion")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full bg-luxury-black border outline-none px-4 py-3.5 font-sans text-luxury-beige text-sm transition-all duration-200 rounded-none appearance-none cursor-pointer ${borderClass(undefined, "occasion")}`}
                    data-ocid="contact.select"
                  >
                    {occasions.map((o) => (
                      <option key={o} value={o} className="bg-luxury-black">
                        {o || "Select occasion…"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="c-message"
                  className="block font-sans text-luxury-beige/70 text-[11px] tracking-[0.35em] uppercase mb-2"
                >
                  Message <span className="text-luxury-gold">*</span>
                </label>
                <textarea
                  id="c-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className={`${baseInput} ${borderClass("message", "message")} resize-none`}
                  placeholder="Tell us about your requirements, occasion, or any customisation wishes…"
                  data-ocid="contact.textarea"
                />
                {errors.message && (
                  <p
                    className="mt-1.5 text-red-400/80 text-xs font-sans"
                    data-ocid="contact.error_state"
                  >
                    ◈ {errors.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 pt-1">
                <div className="flex-1 h-px bg-luxury-gold/10" />
                <span className="font-sans text-luxury-beige/25 text-[10px] tracking-widest uppercase">
                  Prepaid Orders Only
                </span>
                <div className="flex-1 h-px bg-luxury-gold/10" />
              </div>

              {/* Single-step submit — opens WhatsApp directly via location.href */}
              <button
                type="submit"
                data-ocid="contact.submit_button"
                className="w-full py-4 text-sm font-sans font-semibold tracking-widest uppercase flex items-center justify-center gap-3 text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
                style={{ backgroundColor: "oklch(0.52 0.17 145)" }}
              >
                {WA_ICON}
                Send Inquiry on WhatsApp
              </button>
              <p className="text-center font-sans text-luxury-beige/30 text-[10px] tracking-wide">
                WhatsApp will open with your details pre-filled. Just tap Send.
              </p>
            </form>
          )}
        </div>

        {/* Contact info strip */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* WhatsApp — uses window.location.href for ICP compatibility */}
          <a
            href={WA_DIRECT}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = WA_DIRECT;
            }}
            className="flex items-center gap-3 border border-luxury-gold/15 px-5 py-4 hover:border-luxury-gold/35 transition-colors group cursor-pointer"
            data-ocid="contact.whatsapp_strip.button"
          >
            <span style={{ color: "oklch(0.52 0.17 145)" }}>{WA_ICON}</span>
            <div>
              <p className="font-sans text-luxury-beige/50 text-[10px] tracking-[0.3em] uppercase mb-0.5">
                WhatsApp
              </p>
              <p className="font-sans text-luxury-beige text-sm font-medium group-hover:text-luxury-gold transition-colors">
                +91 70458 99262
              </p>
            </div>
          </a>
          <a
            href="https://www.instagram.com/miss.luxeco"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-luxury-gold/15 px-5 py-4 hover:border-luxury-gold/35 transition-colors group"
          >
            {IG_ICON}
            <div>
              <p className="font-sans text-luxury-beige/50 text-[10px] tracking-[0.3em] uppercase mb-0.5">
                Instagram
              </p>
              <p className="font-sans text-luxury-beige text-sm font-medium group-hover:text-luxury-gold transition-colors">
                @miss.luxeco
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
