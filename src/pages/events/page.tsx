import { useState } from "react";
import { Briefcase, Users } from "lucide-react";
import PageLayout from "../../components/page-layout.tsx";
import EnquiryModal from "../../components/enquiry-modal.tsx";
import Img from "../../components/img.tsx";
import { PageHero, Reveal, SectionHeading } from "../../components/hotel-page.tsx";
import { HOTEL_IMAGES, VENUES } from "../../lib/hotel-data.ts";
import { BTN } from "../../lib/styles.ts";

const PACKAGES = [
  { title: "Day meeting", detail: "A focused setting with refreshments and attentive support.", type: "Board meeting" },
  { title: "Residential conference", detail: "Meeting spaces and comfortable stays, brought together seamlessly.", type: "Conference" },
  { title: "Social celebration", detail: "Thoughtful hospitality for the gatherings worth remembering.", type: "Social celebration" },
];

export default function EventsPage() {
  // null = closed; otherwise the values to prefill in the form
  const [prefill, setPrefill] = useState<Record<string, string> | null>(null);
  return (
    <PageLayout title="Events & Banquets | The Imperial Palace Rajkot" description="Ballrooms, meeting suites and open-air venues for corporate events and celebrations at The Imperial Palace, Rajkot.">
      <PageHero eyebrow="Gather with distinction" title="Events & Banquets" image={HOTEL_IMAGES.ballroom} subtitle="Versatile spaces, polished service and the details that bring your gathering together." />
      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Spaces to gather" title="Find the right setting" align="center" /></Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {VENUES.map((v, i) => (
              <Reveal key={v.name} delay={(i % 3) * 0.05}>
                <article className="group">
                  <div className="aspect-[4/3] overflow-hidden"><Img src={v.image} alt={v.name} width={800} height={600} className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" /></div>
                  <h3 className="mt-4 font-serif text-2xl text-foreground">{v.name}</h3>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[#6f5318]">{v.types}</p>
                  <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground"><span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-[#6f5318]" />{v.capacity}</span><span>{v.size}</span></p>
                  <button type="button" onClick={() => setPrefill({ venue: v.name })} className={`${BTN.outline} mt-5`}>Book this venue</button>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-20">
            <SectionHeading eyebrow="For business and beyond" title="Considered packages" align="center" />
            <div className="grid gap-x-8 gap-y-8 md:grid-cols-3">
              {PACKAGES.map((p) => (
                <div key={p.title} className="border-t border-border pt-6">
                  <Briefcase className="mb-4 h-5 w-5 text-[#6f5318]" />
                  <h3 className="font-serif text-2xl text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{p.detail}</p>
                  <button type="button" onClick={() => setPrefill({ eventType: p.type })} className="mt-4 min-h-11 cursor-pointer text-[11px] uppercase tracking-[0.2em] text-[#7a5c1c] underline-offset-4 hover:underline">Enquire about this package</button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-14 text-center"><button type="button" onClick={() => setPrefill({})} className={BTN.gold}>Enquire about an event</button></div>
        </div>
      </section>
      <EnquiryModal kind="event" open={prefill !== null} onClose={() => setPrefill(null)} defaults={prefill ?? {}} />
    </PageLayout>
  );
}
