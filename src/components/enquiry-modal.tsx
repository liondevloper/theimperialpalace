import { useState } from "react";
import type { ReactNode } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Modal from "./modal.tsx";
import EnquiryForm from "./enquiry-form.tsx";
import Img from "./img.tsx";
import { FORM_CONFIGS } from "../lib/forms.ts";
import type { EnquiryKind } from "../lib/forms.ts";
import { CONTACT_INFORMATION, HOTEL_IMAGES } from "../lib/hotel-data.ts";

type Props = { kind: EnquiryKind; open: boolean; onClose: () => void; defaults?: Record<string, string> };

// Split layout: hotel photo + contact details on the left, the form on the right.
export default function EnquiryModal({ kind, open, onClose, defaults }: Props) {
  const c = CONTACT_INFORMATION;
  const details = [
    { icon: Phone, text: c.phone, href: c.phoneHref },
    { icon: Mail, text: c.email, href: `mailto:${c.email}` },
    { icon: MapPin, text: c.addressLines.join(", "), href: c.mapsUrl },
    { icon: Clock, text: `Reception ${c.reception}` },
  ];
  return (
    <Modal open={open} onClose={onClose} label={FORM_CONFIGS[kind].title} split>
      <div className="grid md:grid-cols-[2fr_3fr]">
        <aside className="relative hidden overflow-hidden bg-[#111c33] md:block">
          <Img src={HOTEL_IMAGES.exterior} alt="" width={700} height={1000} className="absolute inset-0 h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1426] via-[#0b1426]/60 to-[#0b1426]/20" />
          <div className="relative flex h-full flex-col justify-end p-8">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#e8d5a3]">{c.name} · 5-Star Hotel</p>
            <p className="mt-3 font-serif text-3xl font-light leading-tight text-white">We would be delighted to host you</p>
            <ul className="mt-8 space-y-4">
              {details.map(({ icon: Icon, text, href }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-white/85">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#d9bc6a]" />
                  {href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="break-words hover:text-[#e8d5a3]">{text}</a> : <span>{text}</span>}
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="p-5 pt-14 sm:p-8 sm:pt-12">
          <EnquiryForm kind={kind} defaults={defaults} stickySubmit />
        </div>
      </div>
    </Modal>
  );
}

type ButtonProps = { kind?: EnquiryKind; className?: string; children: ReactNode };

/** Any button that opens the enquiry pop-up. */
export function EnquiryButton({ kind = "contact", className, children }: ButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>{children}</button>
      <EnquiryModal kind={kind} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
