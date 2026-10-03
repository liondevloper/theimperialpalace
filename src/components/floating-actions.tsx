import { CalendarCheck, MessageSquareText } from "lucide-react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { whatsappUrl } from "../lib/site-config.ts";
import { BookStayButton } from "./book-stay-modal.tsx";
import { EnquiryButton } from "./enquiry-modal.tsx";

const pill = "flex h-14 cursor-pointer items-center gap-2 rounded-full px-5 text-[11px] font-medium uppercase tracking-[0.18em] transition-transform hover:-translate-y-0.5";

// Number is configured once in src/lib/site-config.ts.
export default function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" className="flex h-14 min-w-14 items-center justify-center gap-2 rounded-full bg-[#25D366] px-3.5 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.8)] transition-transform hover:-translate-y-0.5 sm:px-5">
        <WhatsappLogo weight="fill" className="h-7 w-7 shrink-0" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
      <EnquiryButton className={`${pill} border border-[#c9a84c]/60 bg-[#1a140c] text-[#e8d5a3] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]`}>
        <MessageSquareText className="h-5 w-5" />
        <span className="hidden sm:inline">Send an enquiry</span>
      </EnquiryButton>
      <BookStayButton className={`${pill} bg-gradient-to-r from-[#b8933a] via-[#d9bc6a] to-[#b8933a] text-[#1e1810] shadow-[0_10px_30px_-10px_rgba(184,147,58,0.8)]`}>
        <CalendarCheck className="h-5 w-5" />
        Book stay
      </BookStayButton>
    </div>
  );
}
