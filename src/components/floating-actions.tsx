import { MessageSquareText } from "lucide-react";
import { whatsappUrl } from "../lib/site-config.ts";
import { BookStayButton } from "./book-stay-modal.tsx";
import { EnquiryButton } from "./enquiry-modal.tsx";
import WhatsappIcon from "./whatsapp-icon.tsx";

const round = "flex cursor-pointer items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95";
const small = `${round} h-11 w-11`;

// Number is configured once in src/lib/site-config.ts.
// Layout: WhatsApp + Enquiry bottom-left (side by side), Book Stay stays bottom-right.
export default function FloatingActions() {
  return (
    <>
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2.5 sm:bottom-6 sm:left-6">
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" title="Chat on WhatsApp" className={`${small} border border-white/30 bg-[#25D366]/70 text-white shadow-[0_8px_20px_-8px_rgba(37,211,102,0.6)] hover:bg-[#25D366]/90`}>
          <WhatsappIcon className="h-6 w-6" />
        </a>
        <EnquiryButton className={`${small} border border-[var(--brand-gold)]/50 bg-[var(--brand-ink-2)]/55 text-[var(--brand-cream)] shadow-[0_8px_20px_-10px_rgba(11,20,38,0.6)] hover:bg-[var(--brand-ink-2)]/80`}>
          <MessageSquareText className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Send an enquiry</span>
        </EnquiryButton>
      </div>

      <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
        <BookStayButton className={`${round} h-14 w-14 flex-col gap-0.5 border border-white/30 bg-[linear-gradient(to_bottom_right,var(--brand-gold-dark),var(--brand-gold-light),var(--brand-gold-dark))]/75 text-[var(--brand-ink)] shadow-[0_8px_24px_-10px_rgba(184,147,58,0.7)] hover:opacity-95`}>
          <span className="text-[10px] font-semibold uppercase leading-none tracking-[0.16em]">Book</span>
          <span className="h-px w-6 bg-[var(--brand-ink)]/40" />
          <span className="text-[10px] font-semibold uppercase leading-none tracking-[0.16em]">Stay</span>
        </BookStayButton>
      </div>
    </>
  );
}
