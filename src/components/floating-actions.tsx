import { MessageSquareText } from "lucide-react";
import { whatsappUrl } from "../lib/site-config.ts";
import { BookStayButton } from "./book-stay-modal.tsx";
import { EnquiryButton } from "./enquiry-modal.tsx";
import WhatsappIcon from "./whatsapp-icon.tsx";

const round = "flex h-16 w-16 cursor-pointer items-center justify-center rounded-full transition-transform duration-300 hover:scale-105 active:scale-95";

// Number is configured once in src/lib/site-config.ts.
export default function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-center gap-3 sm:bottom-6 sm:right-6">
      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" title="Chat on WhatsApp" className={`${round} bg-[#25D366] text-white shadow-[0_10px_28px_-8px_rgba(37,211,102,0.75)]`}>
        <WhatsappIcon className="h-9 w-9" />
      </a>
      <EnquiryButton className={`${round} border border-[#c9a84c]/60 bg-[#111c33] text-[#e8d5a3] shadow-[0_10px_30px_-10px_rgba(11,20,38,0.6)]`}>
        <MessageSquareText className="h-6 w-6" aria-hidden="true" />
        <span className="sr-only">Send an enquiry</span>
      </EnquiryButton>
      <BookStayButton className={`${round} flex-col gap-0.5 bg-gradient-to-br from-[#b8933a] via-[#d9bc6a] to-[#b8933a] text-[#0f1a30] shadow-[0_10px_30px_-10px_rgba(184,147,58,0.8)]`}>
        <span className="text-[11px] font-semibold uppercase leading-none tracking-[0.18em]">Book</span>
        <span className="h-px w-7 bg-[#0f1a30]/40" />
        <span className="text-[11px] font-semibold uppercase leading-none tracking-[0.18em]">Stay</span>
      </BookStayButton>
    </div>
  );
}
