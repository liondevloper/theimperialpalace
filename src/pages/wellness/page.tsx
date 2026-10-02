import { useState } from "react";
import PageLayout from "../../components/page-layout.tsx";
import EnquiryModal from "../../components/enquiry-modal.tsx";
import Img from "../../components/img.tsx";
import { PageHero, Reveal, SectionHeading } from "../../components/hotel-page.tsx";
import { AMENITIES, HOTEL_IMAGES } from "../../lib/hotel-data.ts";
import { BTN } from "../../lib/styles.ts";

export default function WellnessPage() {
  const [service, setService] = useState<string | null>(null);
  return (
    <PageLayout title="Wellness | The Imperial Palace Rajkot" description="Swimming pool, fitness studio, steam bath, jacuzzi and massage treatments at The Imperial Palace, Rajkot.">
      <PageHero eyebrow="A moment for yourself" title="Wellness, at your own pace" image={HOTEL_IMAGES.pool} subtitle="A restorative collection of spaces and rituals to help you feel renewed." />
      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Restore and recharge" title="A more balanced kind of stay" align="center" /></Reveal>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {AMENITIES.map((a, i) => (
              <Reveal key={a.name} delay={(i % 3) * 0.05}>
                <article>
                  <Img src={a.image} alt={a.name} width={800} height={600} className="aspect-[4/3] w-full object-cover" />
                  <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-[#6f5318]">{a.category}</p>
                  <h2 className="mt-1 font-serif text-2xl text-foreground">{a.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{a.description}</p>
                  <button type="button" onClick={() => setService(a.name)} className={`${BTN.outline} mt-5`}>Book a session</button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <EnquiryModal kind="wellness" open={service !== null} onClose={() => setService(null)} defaults={service ? { service } : {}} />
    </PageLayout>
  );
}
