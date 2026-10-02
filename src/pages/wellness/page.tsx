import { useState } from "react";
import { HeartPulse } from "lucide-react";
import PageLayout from "../../components/page-layout.tsx";
import EnquiryModal from "../../components/enquiry-modal.tsx";
import { OutlineButton, PageHero, Reveal, SectionHeading } from "../../components/hotel-page.tsx";
import { HOTEL_IMAGES, WELLNESS_ITEMS } from "../../lib/hotel-data.ts";

export default function WellnessPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sessionName, setSessionName] = useState("a wellness session");
  const bookSession = (name: string) => { setSessionName(name); setModalOpen(true); };
  return (
    <PageLayout>
      <PageHero eyebrow="A moment for yourself" title="Wellness, at your own pace" image={HOTEL_IMAGES.pool} subtitle="A restorative collection of spaces and rituals to help you feel renewed." />
      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Restore and recharge" title="A more balanced kind of stay" description="Find your own rhythm in our wellness spaces, with thoughtful facilities and treatments to match the way you want to unwind." align="center" /></Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {WELLNESS_ITEMS.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.04}>
                <article className="group grid overflow-hidden border border-border transition-colors hover:border-[#c9a84c]/40 sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="h-64 overflow-hidden sm:h-full"><img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                  <div className="flex flex-col items-start justify-center p-6">
                    <HeartPulse className="mb-4 h-5 w-5 text-[#9a7730]" />
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#9a7730]">{item.category}</p>
                    <h2 className="mt-2 font-serif text-2xl text-foreground">{item.name}</h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                    <OutlineButton onClick={() => bookSession(item.name)} className="mt-5">Book a Session</OutlineButton>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={`Book ${sessionName}`} subtitle="Tell us what you have in mind and our team will help arrange your visit." />
    </PageLayout>
  );
}
