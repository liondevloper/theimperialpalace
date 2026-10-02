import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import PageLayout from "../../components/page-layout.tsx";
import EnquiryForm from "../../components/enquiry-form.tsx";
import { PageHero, Reveal, SectionHeading } from "../../components/hotel-page.tsx";
import { CONTACT_INFORMATION as C, HOTEL_IMAGES } from "../../lib/hotel-data.ts";
import { whatsappUrl } from "../../lib/site-config.ts";
import { BTN } from "../../lib/styles.ts";

export default function ContactPage() {
  return (
    <PageLayout title="Contact | The Imperial Palace Rajkot" description="Contact The Imperial Palace, Dr. Yagnik Road, Rajkot. Reservations, weddings, events and general enquiries.">
      <PageHero eyebrow="We are here to help" title="A warm welcome begins here" image={HOTEL_IMAGES.lobby} />
      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Get in touch" title="We would love to hear from you" /></Reveal>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <aside>
              <h2 className="font-serif text-2xl text-foreground">{C.name}</h2>
              <address className="mt-4 flex gap-3 text-sm not-italic leading-6 text-muted-foreground"><MapPin className="mt-1 h-4 w-4 shrink-0 text-[#6f5318]" /><span>{C.addressLines.join(", ")}</span></address>
              <div className="mt-5 space-y-3">
                <a href={C.phoneHref} className="flex min-h-11 items-center gap-3 text-sm text-muted-foreground hover:text-foreground"><Phone className="h-4 w-4 text-[#6f5318]" />{C.phone}</a>
                <a href={`mailto:${C.email}`} className="flex min-h-11 items-center gap-3 break-all text-sm text-muted-foreground hover:text-foreground"><Mail className="h-4 w-4 shrink-0 text-[#6f5318]" />{C.email}</a>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Reception {C.reception}. Check-in {C.checkIn}, check-out {C.checkOut}.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={BTN.outline}><MessageCircle className="h-4 w-4" />WhatsApp</a>
                <a href={C.mapsUrl} target="_blank" rel="noopener noreferrer" className={BTN.outline}><MapPin className="h-4 w-4" />Open in Maps</a>
              </div>
              <dl className="mt-10 divide-y divide-border border-y border-border">
                {C.distances.map((d) => (<div key={d.label} className="flex justify-between py-3 text-sm"><dt className="text-foreground">{d.label} <span className="text-muted-foreground">({d.note})</span></dt><dd className="text-muted-foreground">{d.distance}</dd></div>))}
              </dl>
            </aside>
            <div className="border border-border p-5 md:p-8"><EnquiryForm kind="contact" /></div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
