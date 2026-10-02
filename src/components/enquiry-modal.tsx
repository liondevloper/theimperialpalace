import { useState } from "react";
import { Check, Crown } from "lucide-react";

export type EnquiryModalProps = { isOpen: boolean; onClose: () => void; title: string; subtitle: string };

export default function EnquiryModal({ isOpen, onClose, title, subtitle }: EnquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const close = () => { setSubmitted(false); onClose(); };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto border border-[#c9a84c]/30 bg-[#f7f4ef] p-8">
        {submitted ? (
          <div className="flex flex-col items-center py-8 text-center">
            <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#c9a84c] text-[#1a1510]"><Check className="h-7 w-7" /></span>
            <h2 className="font-serif text-3xl font-light text-[#2a2218]">Thank you for your enquiry</h2>
            <p className="mt-3 max-w-sm text-[#756b5e]">Our team will be delighted to assist you. This is a demo confirmation.</p>
            <button type="button" onClick={close} className="mt-7 bg-[#1a1510] px-6 py-3 text-xs uppercase tracking-[0.2em] text-[#c9a84c]">Close</button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2 text-[#9a7730]"><Crown className="h-4 w-4" /><span className="text-[9px] uppercase tracking-[0.3em]">The Imperial Palace · Rajkot</span></div>
              <h2 className="font-serif text-3xl font-light text-[#2a2218]">{title}</h2>
              <p className="mt-2 text-[#756b5e]">{subtitle}</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-xs text-[#4b4135]">Name<input name="name" required placeholder="John Smith" className="h-9 w-full border border-[#d4c9b8] bg-white px-3 text-sm" /></label>
              <label className="grid gap-1.5 text-xs text-[#4b4135]">Email<input name="email" type="email" required placeholder="example@gmail.com" className="h-9 w-full border border-[#d4c9b8] bg-white px-3 text-sm" /></label>
              <label className="grid gap-1.5 text-xs text-[#4b4135]">Phone<input name="phone" type="tel" required placeholder="+91 98765 43210" className="h-9 w-full border border-[#d4c9b8] bg-white px-3 text-sm" /></label>
              <label className="grid gap-1.5 text-xs text-[#4b4135]">Guests<input name="guests" type="number" min="1" placeholder="2" className="h-9 w-full border border-[#d4c9b8] bg-white px-3 text-sm" /></label>
              <label className="grid gap-1.5 text-xs text-[#4b4135]">Check-in<input name="checkin" type="date" className="h-9 w-full border border-[#d4c9b8] bg-white px-3 text-sm" /></label>
              <label className="grid gap-1.5 text-xs text-[#4b4135]">Check-out<input name="checkout" type="date" className="h-9 w-full border border-[#d4c9b8] bg-white px-3 text-sm" /></label>
              <label className="grid gap-1.5 text-xs text-[#4b4135] sm:col-span-2">Message<textarea name="message" placeholder="Tell us a little about your plans" rows={3} className="w-full border border-[#d4c9b8] bg-white px-3 py-2 text-sm" /></label>
              <button type="submit" className="mt-1 bg-[#c9a84c] px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1a1510] transition-colors hover:bg-[#e1c574] sm:col-span-2">Send Enquiry</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
