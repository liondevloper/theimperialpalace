import { useState } from "react";
import { Clock3 } from "lucide-react";
import PageLayout from "../../components/page-layout.tsx";
import EnquiryModal from "../../components/enquiry-modal.tsx";
import Img from "../../components/img.tsx";
import { PageHero, Reveal, SectionHeading } from "../../components/hotel-page.tsx";
import { RESTAURANTS } from "../../lib/hotel-data.ts";
import { BTN } from "../../lib/styles.ts";

export default function DiningPage() {
  const [venue, setVenue] = useState<string | null>(null);
  return (
    <PageLayout title="Dining | The Imperial Palace Rajkot" description="The Courtyard, Senso, Delicacy and in-room dining at The Imperial Palace, Rajkot.">
      <PageHero eyebrow="A table for every occasion" title="The pleasures of the table" image={RESTAURANTS[0].image} subtitle="Four distinctive ways to savour the moment, from leisurely meals to something sweet after supper." />
      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Culinary experiences" title="A taste of the palace" align="center" /></Reveal>
          <div className="space-y-14 md:space-y-20">
            {RESTAURANTS.map((r, index) => (
              <Reveal key={r.slug}>
                <article id={r.slug} className="grid scroll-mt-24 items-center gap-8 md:grid-cols-2 md:gap-14">
                  <Img src={r.image} alt={`${r.name}, ${r.category}`} width={1000} height={750} className={`aspect-[4/3] w-full object-cover ${index % 2 ? "md:order-2" : ""}`} />
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-[#6f5318]">{r.category}</p>
                    <h2 className="mt-3 font-serif text-3xl font-light text-foreground md:text-4xl">{r.name}</h2>
                    <p className="mt-5 text-sm leading-7 text-muted-foreground">{r.description}</p>
                    <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><Clock3 className="h-4 w-4 text-[#6f5318]" />{r.timing}</p>
                    <button type="button" onClick={() => setVenue(r.name)} className={`${BTN.outline} mt-7`}>Make a reservation</button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <EnquiryModal kind="dining" open={venue !== null} onClose={() => setVenue(null)} defaults={venue ? { restaurant: venue } : {}} />
    </PageLayout>
  );
}
