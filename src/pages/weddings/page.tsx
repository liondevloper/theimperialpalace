import { useState } from "react";
import { Camera, BedDouble, Flower2, Music2, Sparkles, Utensils } from "lucide-react";
import PageLayout from "../../components/page-layout.tsx";
import EnquiryModal from "../../components/enquiry-modal.tsx";
import Img from "../../components/img.tsx";
import { PageHero, Reveal, SectionHeading } from "../../components/hotel-page.tsx";
import { HOTEL_IMAGES, VENUES } from "../../lib/hotel-data.ts";
import { BTN } from "../../lib/styles.ts";

const SERVICES = [
  { title: "Dining", icon: Utensils, text: "Memorable menus shaped around your tastes and traditions." },
  { title: "Décor", icon: Sparkles, text: "A thoughtful setting, styled to reflect your celebration." },
  { title: "Floral", icon: Flower2, text: "Beautiful florals and finishing touches for every occasion." },
  { title: "Music", icon: Music2, text: "A soundtrack that brings each chapter of your day to life." },
  { title: "Photography", icon: Camera, text: "Space and support for the moments you will treasure." },
  { title: "Accommodation", icon: BedDouble, text: "A welcoming stay for you and your guests, close at hand." },
];

export default function WeddingsPage() {
  const [open, setOpen] = useState(false);
  const venues = VENUES.filter((v) => v.forWeddings);
  return (
    <PageLayout title="Weddings | The Imperial Palace Rajkot" description="Plan your wedding at The Imperial Palace, Rajkot, with grand ballrooms, an open-air pool deck and a dedicated planning team.">
      <PageHero eyebrow="A celebration, beautifully yours" title="Begin your forever here" image={HOTEL_IMAGES.wedding} subtitle="A setting of timeless elegance, made for the moments you will remember always." />
      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Wedding venues" title="A wedding with a sense of place" align="center" /></Reveal>
          <div className="mb-20 grid gap-6 md:grid-cols-3">
            {venues.map((v) => (
              <Reveal key={v.name}>
                <article>
                  <Img src={v.image} alt={v.name} width={800} height={600} className="aspect-[4/3] w-full object-cover" />
                  <h3 className="mt-4 font-serif text-2xl text-foreground">{v.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.size} · {v.capacity}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <SectionHeading eyebrow="Every detail considered" title="A team for every part of the day" align="center" />
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ title, icon: Icon, text }) => (
              <div key={title} className="border-t border-border pt-6">
                <Icon className="mb-4 h-5 w-5 text-[#6f5318]" />
                <h3 className="font-serif text-xl text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 bg-[#14110c] px-6 py-12 text-center">
            <h2 className="font-serif text-3xl font-light text-white">Ready to begin planning?</h2>
            <button type="button" onClick={() => setOpen(true)} className={`${BTN.gold} mt-6`}>Request wedding proposal</button>
          </div>
        </div>
      </section>
      <EnquiryModal kind="wedding" open={open} onClose={() => setOpen(false)} />
    </PageLayout>
  );
}
