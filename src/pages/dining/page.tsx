import { useState } from "react";
import { Clock3, Utensils } from "lucide-react";
import PageLayout from "../../components/page-layout.tsx";
import EnquiryModal from "../../components/enquiry-modal.tsx";
import { OutlineButton, PageHero, Reveal, SectionHeading } from "../../components/hotel-page.tsx";
import { DINING_VENUES } from "../../lib/hotel-data.ts";

export default function DiningPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [venueName, setVenueName] = useState("our dining venues");
  const openEnquiry = (name: string) => { setVenueName(name); setModalOpen(true); };
  return (
    <PageLayout>
      <PageHero eyebrow="A table for every occasion" title="The pleasures of the table" image={DINING_VENUES[0].image} subtitle="Four distinctive ways to savour the moment, from leisurely meals to something sweet after supper." />
      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Culinary experiences" title="A taste of the palace" description="Gather, linger, and discover a menu of memorable moments across our dining venues." align="center" /></Reveal>
          <div className="space-y-16 md:space-y-24">
            {DINING_VENUES.map((venue, index) => (
              <Reveal key={venue.name}>
                <article className={`grid overflow-hidden border border-border md:grid-cols-2 ${index % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
                  <div className="group min-h-[300px] overflow-hidden">
                    <img src={venue.image} alt={venue.name} className="h-full min-h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col justify-center p-7 md:p-12">
                    <p className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#9a7730]"><Utensils className="h-3.5 w-3.5" />{venue.category}</p>
                    <h2 className="font-serif text-3xl font-light text-foreground md:text-4xl">{venue.name}</h2>
                    <p className="mt-5 text-sm leading-7 text-muted-foreground">{venue.description}</p>
                    <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground"><Clock3 className="h-4 w-4 text-[#9a7730]" />{venue.timing}</p>
                    <OutlineButton onClick={() => openEnquiry(venue.name)} className="mt-7 w-fit">Make a Reservation</OutlineButton>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={`Reserve ${venueName}`} subtitle="Let us know when you would like to visit." />
    </PageLayout>
  );
}
