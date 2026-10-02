import { useState } from "react";
import { Flower2, Music2, Camera, Utensils, BedDouble, Sparkles } from "lucide-react";
import PageLayout from "../../components/page-layout.tsx";
import EnquiryModal from "../../components/enquiry-modal.tsx";
import { GoldButton, PageHero, Reveal, SectionHeading } from "../../components/hotel-page.tsx";
import { EVENT_VENUES, HOTEL_IMAGES } from "../../lib/hotel-data.ts";

const SERVICES = [
  { title: "Dining", icon: Utensils, text: "Memorable menus shaped around your tastes and traditions." },
  { title: "D\u00e9cor", icon: Sparkles, text: "A thoughtful setting, styled to reflect your celebration." },
  { title: "Floral", icon: Flower2, text: "Beautiful florals and finishing touches for every occasion." },
  { title: "Music", icon: Music2, text: "A soundtrack that brings each chapter of your day to life." },
  { title: "Photography", icon: Camera, text: "Space and support for the moments you will treasure." },
  { title: "Bridal Services", icon: Sparkles, text: "A calm, considered start to your most special day." },
  { title: "Accommodation", icon: BedDouble, text: "A welcoming stay for you and your guests, close at hand." },
];

export default function WeddingsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const venues = EVENT_VENUES.filter((venue) => venue.name === "Regent Room" || venue.name === "Pool Deck");
  return (
    <PageLayout>
      <PageHero eyebrow="A celebration, beautifully yours" title="Begin your forever here" image={HOTEL_IMAGES.wedding} subtitle="A setting of timeless elegance, made for the moments you will remember always." />
      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Your day, your way" title="A wedding with a sense of place" description="From your first welcome to the final toast, our team brings warm hospitality and thoughtful detail to every celebration." align="center" /></Reveal>
          <div className="mb-20 grid gap-6 md:grid-cols-2">
            {venues.map((venue) => (
              <Reveal key={venue.name}>
                <article className="group overflow-hidden border border-border transition-colors hover:border-[#c9a84c]/40">
                  <div className="h-72 overflow-hidden"><img src={venue.image} alt={venue.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                  <div className="p-6">
                    <h3 className="font-serif text-3xl text-foreground">{venue.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{venue.size} · {venue.capacity}</p>
                    <p className="mt-2 text-xs uppercase tracking-wider text-[#9a7730]">{venue.types}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <SectionHeading eyebrow="Every detail considered" title="A team for every part of the celebration" align="center" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map(({ title, icon: Icon, text }, index) => (
              <Reveal key={title} delay={index * 0.04}>
                <div className="h-full border border-border p-6 transition-colors hover:border-[#c9a84c]/40">
                  <Icon className="mb-5 h-5 w-5 text-[#9a7730]" />
                  <h3 className="font-serif text-xl text-foreground">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 bg-[#1a1510] px-6 py-12 text-center md:px-12">
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#c9a84c]">Your wedding awaits</p>
            <h3 className="mb-6 font-serif text-3xl font-light text-white">Ready to begin planning?</h3>
            <GoldButton onClick={() => setModalOpen(true)}>Request Wedding Proposal</GoldButton>
          </div>
        </div>
      </section>
      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Request a Wedding Proposal" subtitle="Share your vision with us and our team will be in touch to begin planning your celebration." />
    </PageLayout>
  );
}
