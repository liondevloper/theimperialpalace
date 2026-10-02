import { useState } from "react";
import { BriefcaseBusiness, UsersRound } from "lucide-react";
import PageLayout from "../../components/page-layout.tsx";
import EnquiryModal from "../../components/enquiry-modal.tsx";
import { GoldButton, PageHero, Reveal, SectionHeading } from "../../components/hotel-page.tsx";
import { EVENT_VENUES, HOTEL_IMAGES } from "../../lib/hotel-data.ts";

const PACKAGES = [
  { title: "Day Meeting", detail: "A focused setting with refreshments and attentive support." },
  { title: "Residential Conference", detail: "Meeting spaces and comfortable stays, brought together seamlessly." },
  { title: "Social Celebration", detail: "Thoughtful hospitality for the gatherings worth remembering." },
];

export default function EventsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <PageLayout>
      <PageHero eyebrow="Gather with distinction" title="Events & Banquets" image={HOTEL_IMAGES.ballroom} subtitle="Versatile spaces, polished service, and the details that bring your gathering together." />
      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Spaces to gather" title="Find the right setting" description="An elegant ballroom, an open-air deck, or an intimate meeting suite: each venue has room for your event to feel entirely its own." align="center" /></Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_VENUES.map((venue, index) => (
              <Reveal key={venue.name} delay={index * 0.04}>
                <article className="group h-full overflow-hidden border border-border transition-colors hover:border-[#c9a84c]/40">
                  <div className="h-56 overflow-hidden"><img src={venue.image} alt={venue.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-foreground">{venue.name}</h3>
                    <p className="mt-3 text-xs uppercase tracking-wider text-[#9a7730]">{venue.types}</p>
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><UsersRound className="h-4 w-4 text-[#9a7730]" />{venue.capacity}</span>
                      <span>{venue.size}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-20">
            <Reveal><SectionHeading eyebrow="For business and beyond" title="Considered corporate packages" description="Bring people together with flexible arrangements, gracious service, and spaces prepared around your plans." align="center" /></Reveal>
            <div className="grid gap-5 md:grid-cols-3">
              {PACKAGES.map((item) => (
                <div key={item.title} className="border border-border p-7">
                  <BriefcaseBusiness className="mb-5 h-5 w-5 text-[#9a7730]" />
                  <h3 className="font-serif text-2xl text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-14 text-center"><GoldButton onClick={() => setModalOpen(true)}>Enquire About an Event</GoldButton></div>
        </div>
      </section>
      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Event Enquiry" subtitle="Tell us about your event and we will help bring it together." />
    </PageLayout>
  );
}
