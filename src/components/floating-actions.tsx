import { CalendarCheck, MessageCircle } from "lucide-react";
import { whatsappUrl } from "../lib/site-config.ts";
import { BookStayButton } from "./book-stay-modal.tsx";

// Number is configured once in src/lib/site-config.ts.
export default function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <BookStayButton className="flex h-14 cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#b8933a] via-[#d9bc6a] to-[#b8933a] px-5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1e1810] shadow-[0_10px_30px_-10px_rgba(184,147,58,0.8)] transition-transform hover:-translate-y-0.5">
        <CalendarCheck className="h-5 w-5" />
        Book stay
      </BookStayButton>
      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" className="flex h-14 items-center gap-2 rounded-full bg-[#1f8f4e] px-4 text-sm font-medium text-white transition-colors hover:bg-[#187a41]">
        <MessageCircle className="h-6 w-6" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
