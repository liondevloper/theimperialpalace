import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "../../components/page-layout.tsx";
import { PageHero, Reveal, SectionHeading } from "../../components/hotel-page.tsx";
import { HOTEL_IMAGES } from "../../lib/hotel-data.ts";

const EXPERIENCES = [
  { title: "Mayfair", label: "A place to celebrate", image: HOTEL_IMAGES.wedding, text: "A gracious setting for celebrations, evenings together, and moments worth gathering for.", link: "/weddings" },
  { title: "Outlook", label: "A change of perspective", image: HOTEL_IMAGES.pool, text: "Pause by the water and settle into the easy pace of an afternoon well spent.", link: "/wellness" },
  { title: "Invogue", label: "The art of occasion", image: HOTEL_IMAGES.lobby, text: "Discover the small details and polished touches that make a palace stay distinctive.", link: "/gallery" },
  { title: "Fitness Studio", label: "Keep your rhythm", image: HOTEL_IMAGES.gym, text: "Make time for your routine in a welcoming, well-equipped fitness space.", link: "/wellness" },
  { title: "Swimming Pool", label: "A refreshing escape", image: HOTEL_IMAGES.pool, text: "Take a dip, bask in the sun, and enjoy a quieter side of the city.", link: "/wellness" },
];

export default function ExperiencesPage() {
  return (
    <PageLayout>
      <PageHero eyebrow="Beyond the expected" title="Experiences to remember" image={HOTEL_IMAGES.lobby} subtitle="A stay at The Imperial Palace is shaped by the places, people, and thoughtful moments you discover along the way." />
      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="The Imperial experience" title="A little something for every mood" description="Explore the many ways to make your time with us your own." align="center" /></Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {EXPERIENCES.map((experience, index) => (
              <Reveal key={experience.title} delay={index * 0.05}>
                <Link to={experience.link} className={`group relative block h-[390px] overflow-hidden border border-border transition-colors hover:border-[#c9a84c]/40 ${index === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}>
                  <img src={experience.image} alt={experience.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c09]/90 via-[#0e0c09]/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#d6bb73]">{experience.label}</p>
                    <div className="mt-2 flex items-end justify-between gap-4">
                      <div>
                        <h2 className="font-serif text-3xl text-white">{experience.title}</h2>
                        <p className="mt-2 max-w-md text-sm leading-6 text-white/70">{experience.text}</p>
                      </div>
                      <ArrowUpRight className="mb-1 h-5 w-5 shrink-0 text-[#c9a84c] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
