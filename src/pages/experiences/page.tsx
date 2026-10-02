import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageLayout from "../../components/page-layout.tsx";
import Img from "../../components/img.tsx";
import { PageHero, Reveal, SectionHeading } from "../../components/hotel-page.tsx";
import { EXPERIENCES, HOTEL_IMAGES } from "../../lib/hotel-data.ts";

export default function ExperiencesPage() {
  return (
    <PageLayout title="Experiences | The Imperial Palace Rajkot" description="Celebrations, poolside afternoons and signature experiences at The Imperial Palace, Rajkot.">
      <PageHero eyebrow="Beyond the expected" title="Experiences to remember" image={HOTEL_IMAGES.lobby} subtitle="A stay at The Imperial Palace is shaped by the places, people and thoughtful moments you discover along the way." />
      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="The Imperial experience" title="A little something for every mood" align="center" /></Reveal>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERIENCES.map((e, i) => (
              <Reveal key={e.title} delay={(i % 3) * 0.05}>
                <Link to={e.to} className="group block">
                  <Img src={e.image} alt={e.title} width={800} height={600} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                  <p className="mt-4 text-[11px] uppercase tracking-[0.25em] text-[#6f5318]">{e.label}</p>
                  <h2 className="mt-1 flex items-center justify-between font-serif text-2xl text-foreground">{e.title}<ArrowUpRight className="h-5 w-5 text-[#6f5318]" /></h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{e.text}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
