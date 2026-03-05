import { SiWhatsapp } from "react-icons/si";

export default function FloatingWhatsAppButton() {
  return (
    <a
      href="https://wa.me/917045899262"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Miss Luxe on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      style={{
        backgroundColor: "oklch(0.52 0.17 145)",
        boxShadow: "0 4px 20px oklch(0.52 0.17 145 / 0.5)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 6px 28px oklch(0.52 0.17 145 / 0.7)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow =
          "0 4px 20px oklch(0.52 0.17 145 / 0.5)";
      }}
    >
      <SiWhatsapp size={26} color="white" />
    </a>
  );
}
