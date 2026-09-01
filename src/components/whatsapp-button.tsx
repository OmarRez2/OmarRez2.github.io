import { MessageCircle } from "lucide-react";

const whatsappUrl =
  "https://wa.me/201002127404?text=Hello%20Omar%2C%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect.";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Omar on WhatsApp"
      title="Chat on WhatsApp"
      className="group fixed bottom-4 right-4 z-50 inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/15 bg-[#25D366] px-4 text-sm font-semibold text-white shadow-[0_16px_45px_-16px_rgba(37,211,102,0.85)] transition duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-[0_20px_55px_-14px_rgba(37,211,102,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="size-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
