import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const text = `New inquiry from ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || "Not provided"}\n\nMessage: ${formData.message}`;
    window.open(
      `https://wa.me/917045899262?text=${encodeURIComponent(text)}`,
      "_blank",
    );
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="py-20 md:py-32 bg-luxury-black">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-16 h-16 border border-luxury-gold/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-luxury-gold text-2xl">✓</span>
          </div>
          <h2 className="font-serif text-3xl text-luxury-beige mb-4">
            Thank You
          </h2>
          <p className="font-sans text-luxury-beige/60 font-light">
            Your inquiry has been sent. We'll get back to you shortly via
            WhatsApp.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-8 border border-luxury-gold/40 text-luxury-gold hover:bg-luxury-gold/10 transition-colors px-8 py-3 font-sans text-sm tracking-widest uppercase"
          >
            Send Another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-luxury-black">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="font-sans text-luxury-gold text-xs tracking-[0.5em] uppercase mb-4">
            Get in Touch
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-luxury-beige mb-6">
            Send an Inquiry
          </h2>
          <div className="w-16 h-px bg-luxury-gold mx-auto" />
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block font-sans text-luxury-beige/70 text-xs tracking-widest uppercase mb-2"
            >
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-transparent border ${
                errors.name ? "border-red-500/60" : "border-luxury-gold/20"
              } focus:border-luxury-gold/60 outline-none px-4 py-3 font-sans text-luxury-beige placeholder:text-luxury-beige/20 text-sm transition-colors`}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="mt-1 text-red-400/80 text-xs font-sans">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block font-sans text-luxury-beige/70 text-xs tracking-widest uppercase mb-2"
            >
              Email Address *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-transparent border ${
                errors.email ? "border-red-500/60" : "border-luxury-gold/20"
              } focus:border-luxury-gold/60 outline-none px-4 py-3 font-sans text-luxury-beige placeholder:text-luxury-beige/20 text-sm transition-colors`}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-red-400/80 text-xs font-sans">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block font-sans text-luxury-beige/70 text-xs tracking-widest uppercase mb-2"
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-transparent border border-luxury-gold/20 focus:border-luxury-gold/60 outline-none px-4 py-3 font-sans text-luxury-beige placeholder:text-luxury-beige/20 text-sm transition-colors"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block font-sans text-luxury-beige/70 text-xs tracking-widest uppercase mb-2"
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={`w-full bg-transparent border ${
                errors.message ? "border-red-500/60" : "border-luxury-gold/20"
              } focus:border-luxury-gold/60 outline-none px-4 py-3 font-sans text-luxury-beige placeholder:text-luxury-beige/20 text-sm transition-colors resize-none`}
              placeholder="Tell us about your requirements..."
            />
            {errors.message && (
              <p className="mt-1 text-red-400/80 text-xs font-sans">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn-gold w-full py-4 text-sm tracking-widest"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </section>
  );
}
