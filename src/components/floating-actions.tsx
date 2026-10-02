import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "../lib/site-config.ts";

// Number is configured once in src/lib/site-config.ts.
export default function FloatingActions() {
  return (
    <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" className="fixed bottom-4 right-4 z-40 flex h-14 items-center gap-2 rounded-full bg-[#1f8f4e] px-4 text-sm font-medium text-white transition-colors hover:bg-[#187a41] sm:bottom-6 sm:right-6">
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
