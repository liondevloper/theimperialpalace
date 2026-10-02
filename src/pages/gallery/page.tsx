import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import PageLayout from "../../components/page-layout.tsx";
import { PageHero, Reveal, SectionHeading } from "../../components/hotel-page.tsx";
import { HOTEL_IMAGES } from "../../lib/hotel-data.ts";

const GALLERY = [
  { category: "Hotel", image: HOTEL_IMAGES.lobby, title: "The welcome" },
  { category: "Rooms", image: HOTEL_IMAGES.standard, title: "Standard Room" },
  { category: "Rooms", image: HOTEL_IMAGES.superior, title: "Superior Room" },
  { category: "Rooms", image: HOTEL_IMAGES.clubSelect, title: "Club Select" },
  { category: "Rooms", image: HOTEL_IMAGES.clubDeluxe, title: "Club Deluxe" },
  { category: "Rooms", image: HOTEL_IMAGES.executive, title: "Executive Suite" },
  { category: "Rooms", image: HOTEL_IMAGES.presidential, title: "Presidential Suite" },
  { category: "Rooms", image: HOTEL_IMAGES.imperial, title: "Imperial Suite" },
  { category: "Dining", image: HOTEL_IMAGES.diningCourtyard, title: "The Courtyard" },
  { category: "Dining", image: HOTEL_IMAGES.diningSenso, title: "Senso" },
  { category: "Dining", image: HOTEL_IMAGES.diningInRoom, title: "In-Room Dining" },
  { category: "Dining", image: HOTEL_IMAGES.delicacy, title: "Delicacy" },
  { category: "Weddings", image: HOTEL_IMAGES.wedding, title: "A day to remember" },
  { category: "Events", image: HOTEL_IMAGES.ballroom, title: "Regent Room" },
  { category: "Events", image: HOTEL_IMAGES.eventHall, title: "Regal Room" },
  { category: "Wellness", image: HOTEL_IMAGES.pool, title: "Poolside pause" },
  { category: "Wellness", image: HOTEL_IMAGES.spa, title: "Rest and restore" },
  { category: "Wellness", image: HOTEL_IMAGES.gym, title: "Fitness" },
  { category: "Wellness", image: HOTEL_IMAGES.massage, title: "Therapeutic care" },
];

const CATEGORIES = ["All", "Hotel", "Rooms", "Dining", "Weddings", "Events", "Wellness"] as const;
type Category = typeof CATEGORIES[number];

export default function GalleryPage() {
  const [category, setCategory] = useState<Category>("All");
  const [active, setActive] = useState<number | null>(null);
  const filtered = useMemo(() => GALLERY.filter((item) => category === "All" || item.category === category), [category]);
  const step = (direction: number) => { if (active !== null) setActive((active + direction + filtered.length) % filtered.length); };
  return (
    <PageLayout>
      <PageHero eyebrow="A visual impression" title="A glimpse of the palace" image={HOTEL_IMAGES.lobby} subtitle="Explore the rooms, flavours, celebrations, and quiet moments that make The Imperial Palace feel like your own." />
      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="The gallery" title="A collection of moments" description="Explore the palace through a selection of spaces and experiences." align="center" /></Reveal>
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((item) => (
              <button key={item} onClick={() => { setCategory(item); setActive(null); }} className={`border px-4 py-2 text-[10px] uppercase tracking-[0.16em] transition-colors ${category === item ? "border-[#c9a84c] bg-[#c9a84c] text-[#1a1510]" : "border-border text-muted-foreground hover:border-[#c9a84c]/50 hover:text-foreground"}`}>{item}</button>
            ))}
          </div>
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-4">
            {filtered.map((item, index) => (
              <Reveal key={`${item.category}-${item.title}`} delay={(index % 8) * 0.03} className="mb-4 break-inside-avoid">
                <button onClick={() => setActive(index)} className="group relative block w-full overflow-hidden border border-border text-left transition-colors hover:border-[#c9a84c]/50">
                  <img src={item.image} alt={item.title} loading="lazy" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0e0c09]/85 to-transparent px-4 pb-4 pt-12 text-white">
                    <span className="block text-[9px] uppercase tracking-[0.2em] text-[#d6bb73]">{item.category}</span>
                    <span className="mt-1 block font-serif text-xl">{item.title}</span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <AnimatePresence>
        {active !== null && filtered[active] && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center bg-[#0e0c09]/95 p-4">
            <button onClick={() => setActive(null)} className="absolute right-5 top-5 p-2 text-white/60 hover:text-white"><X className="h-6 w-6" /></button>
            <button onClick={() => step(-1)} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white"><ChevronLeft className="h-7 w-7" /></button>
            <motion.img key={active} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} src={filtered[active].image} alt={filtered[active].title} className="max-h-[85vh] max-w-[90vw] object-contain" />
            <button onClick={() => step(1)} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white"><ChevronRight className="h-7 w-7" /></button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#d6bb73]">{filtered[active].category}</p>
              <p className="mt-1 font-serif text-xl text-white">{filtered[active].title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
