import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import PageLayout from "../../components/page-layout.tsx";
import Modal from "../../components/modal.tsx";
import Img from "../../components/img.tsx";
import { PageHero, Reveal, SectionHeading } from "../../components/hotel-page.tsx";
import { GALLERY, GALLERY_CATEGORIES, HOTEL_IMAGES } from "../../lib/hotel-data.ts";
import type { GalleryCategory } from "../../lib/hotel-data.ts";

export default function GalleryPage() {
  const [category, setCategory] = useState<GalleryCategory>("All");
  const [active, setActive] = useState<number | null>(null);
  const filtered = useMemo(() => GALLERY.filter((g) => category === "All" || g.category === category), [category]);
  const current = active !== null ? filtered[active] : undefined;
  const step = (dir: number) => setActive((i) => (i === null ? i : (i + dir + filtered.length) % filtered.length));

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, filtered.length]);

  return (
    <PageLayout title="Gallery | The Imperial Palace Rajkot" description="Photographs of the rooms, dining, celebrations and wellness spaces at The Imperial Palace, Rajkot.">
      <PageHero eyebrow="A visual impression" title="A glimpse of the palace" image={HOTEL_IMAGES.lobby} />
      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="The gallery" title="A collection of moments" align="center" /></Reveal>
          <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter gallery">
            {GALLERY_CATEGORIES.map((c) => (
              <button key={c} type="button" aria-pressed={category === c} onClick={() => { setCategory(c); setActive(null); }} className={`min-h-11 cursor-pointer border px-4 text-[11px] uppercase tracking-[0.16em] transition-colors ${category === c ? "border-[#c9a84c] bg-[#c9a84c] text-[#14110c]" : "border-border text-muted-foreground hover:border-[#8a6a22] hover:text-foreground"}`}>{c}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((g, i) => (
              <button key={`${g.category}-${g.title}`} type="button" onClick={() => setActive(i)} aria-label={`Open ${g.title}`} className="group relative block cursor-pointer overflow-hidden text-left">
                <Img src={g.image} alt={g.title} width={600} height={600} className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 bg-[#14110c]/80 px-3 py-2 text-sm text-white">{g.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <Modal open={current !== undefined} onClose={() => setActive(null)} label="Image viewer" wide>
        {current && (
          <div>
            <Img src={current.image} alt={current.title} priority width={1200} height={800} className="max-h-[70dvh] w-full object-contain" />
            <div className="mt-4 flex items-center justify-between gap-3">
              <button type="button" onClick={() => step(-1)} aria-label="Previous image" className="flex h-11 w-11 cursor-pointer items-center justify-center border border-border"><ChevronLeft className="h-5 w-5" /></button>
              <div className="text-center"><p className="text-[11px] uppercase tracking-[0.2em] text-[#6f5318]">{current.category}</p><p className="font-serif text-xl text-foreground">{current.title}</p></div>
              <button type="button" onClick={() => step(1)} aria-label="Next image" className="flex h-11 w-11 cursor-pointer items-center justify-center border border-border"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>
        )}
      </Modal>
      <span className="hidden"><X /></span>
    </PageLayout>
  );
}
