import { useState } from "react";
import { motion } from "motion/react";
import { Maximize2 } from "lucide-react";
import PageLayout from "../../components/page-layout.tsx";
import { HOTEL_IMAGES } from "../../lib/hotel-data.ts";

const HOTSPOTS = [
  { label: "Lobby", image: HOTEL_IMAGES.lobby },
  { label: "Guest Rooms", image: HOTEL_IMAGES.executive },
  { label: "Regent Room", image: HOTEL_IMAGES.ballroom },
  { label: "Regal Room", image: HOTEL_IMAGES.eventHall },
  { label: "Pool", image: HOTEL_IMAGES.pool },
  { label: "Dining", image: HOTEL_IMAGES.diningCourtyard },
];

export default function TourPage() {
  const [active, setActive] = useState(HOTSPOTS[0]);
  return (
    <PageLayout>
      <main className="min-h-[calc(100vh-80px)] bg-[#0e0c09] px-5 py-12 text-white md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-[#c9a84c]">Step inside</p>
          <h1 className="max-w-4xl font-serif text-4xl font-light leading-tight text-white text-balance md:text-6xl">Experience The Imperial Palace Before You Arrive</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60">Choose a destination to explore the spaces and atmosphere awaiting you in Rajkot.</p>
          <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_250px]">
            <div className="relative min-h-[360px] overflow-hidden border border-[#c9a84c]/25 md:min-h-[580px]">
              <motion.img key={active.label} initial={{ opacity: 0.45, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55 }} src={active.image} alt={`${active.label} tour preview`} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c09]/75 via-transparent to-black/10" />
              <span className="absolute left-5 top-5 flex items-center gap-2 bg-[#0e0c09]/70 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-[#e4d29b]"><Maximize2 className="h-3.5 w-3.5" />{active.label}</span>
              {[{ x: "25%", y: "54%" }, { x: "60%", y: "39%" }, { x: "79%", y: "67%" }].map((dot) => (
                <span key={dot.x} style={{ left: dot.x, top: dot.y }} className="absolute h-4 w-4 rounded-full bg-[#c9a84c]/90 ring-4 ring-[#c9a84c]/25">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#c9a84c]/60" />
                </span>
              ))}
              <div className="absolute bottom-4 left-4 right-4 border border-[#c9a84c]/25 bg-[#0e0c09]/80 px-4 py-3 text-center text-[9px] uppercase tracking-[0.22em] text-[#c9a84c]">360\u00b0 Photography Integration Point — Demo</div>
            </div>
            <aside className="flex flex-col gap-2">
              {HOTSPOTS.map((spot) => (
                <button key={spot.label} onClick={() => setActive(spot)} className={`flex items-center justify-between border px-4 py-4 text-left text-sm transition-colors ${active.label === spot.label ? "border-[#c9a84c] bg-[#c9a84c]/10 text-[#c9a84c]" : "border-[#c9a84c]/20 text-white/60 hover:border-[#c9a84c]/50 hover:text-white/80"}`}>
                  <span>{spot.label}</span>
                  {active.label === spot.label && <span className="h-1.5 w-1.5 rounded-full bg-[#c9a84c]" />}
                </button>
              ))}
              <p className="mt-4 text-[10px] leading-5 text-white/30">A preview of the spaces that make every stay distinct.</p>
            </aside>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
