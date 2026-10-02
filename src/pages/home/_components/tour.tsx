import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Expand, Navigation } from "lucide-react";

const HOTSPOTS = [
  { label: "Lobby", x: 20, y: 55 }, { label: "Rooms", x: 40, y: 35 },
  { label: "Banquet", x: 60, y: 60 }, { label: "Pool", x: 75, y: 40 }, { label: "Dining", x: 50, y: 70 },
];

export default function Tour() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  return (
    <section id="tour" className="py-28 bg-[#0e0c09]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6"><div className="w-12 h-px bg-[#c9a84c]/60" /><Navigation className="w-3.5 h-3.5 text-[#c9a84c]" /><span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c] font-sans">Virtual Experience</span><div className="w-12 h-px bg-[#c9a84c]/60" /></div>
          <h2 className="font-serif font-light text-white" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}>Explore The Imperial Palace<br /><em className="italic font-light text-[#e8d5a3]">in 360\u00b0</em></h2>
          <p className="text-white/60 font-sans mt-6 max-w-lg mx-auto leading-7">Take an immersive virtual tour through our lobby, suites, banquet halls, pool and dining venues before you arrive.</p>
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 border border-[#c9a84c]/30 text-[#c9a84c] text-[9px] tracking-[0.3em] uppercase font-sans">
            <span className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />360\u00b0 Tour Demo
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1, delay: 0.2 }} className="relative overflow-hidden" style={{ borderRadius: "2px" }}>
          <div className="relative overflow-hidden" style={{ height: "520px" }}>
            <img src="https://images.unsplash.com/photo-1782113268782-202ccef98e50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=90" alt="360\u00b0 panoramic view" loading="lazy" className="w-full h-full object-cover" style={{ filter: "brightness(0.85) saturate(0.9)" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0e0c09]/40 via-transparent to-[#0e0c09]/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0e0c09]/30 via-transparent to-[#0e0c09]/50" />
            <div className="absolute top-6 left-6 flex items-center gap-2 bg-[#0e0c09]/70 backdrop-blur-sm px-4 py-2.5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
              <span className="text-white text-[10px] tracking-[0.25em] uppercase font-sans">360\u00b0 View — Lobby</span>
            </div>
            <div className="absolute top-6 right-6 bg-[#0e0c09]/70 backdrop-blur-sm p-2.5 border border-white/10 cursor-pointer hover:border-[#c9a84c]/50 transition-colors"><Expand className="w-4 h-4 text-white/70" /></div>
            {HOTSPOTS.map((spot) => (
              <button key={spot.label} onClick={() => setActiveHotspot(activeHotspot === spot.label ? null : spot.label)} className="absolute cursor-pointer group" style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: "translate(-50%, -50%)" }}>
                <div className="relative flex items-center justify-center"><div className="absolute w-8 h-8 rounded-full bg-[#c9a84c]/20 animate-ping" /><div className="relative w-6 h-6 rounded-full bg-[#c9a84c] flex items-center justify-center border-2 border-[#c9a84c]/30 hover:scale-125 transition-transform duration-300"><div className="w-1.5 h-1.5 rounded-full bg-[#1a1510]" /></div></div>
                <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 bg-[#0e0c09]/90 text-[9px] tracking-[0.2em] uppercase font-sans transition-all duration-300 border border-[#c9a84c]/30 ${activeHotspot === spot.label ? "text-[#c9a84c] opacity-100" : "text-white/80 opacity-80"}`}>{spot.label}</div>
              </button>
            ))}
            {activeHotspot && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-[#0e0c09]/90 backdrop-blur-md border border-[#c9a84c]/30 px-6 py-4 text-center"><div className="text-[#c9a84c] text-[10px] tracking-[0.3em] uppercase mb-1">{activeHotspot}</div><div className="text-white/70 text-xs font-sans">Click to explore this space in 360\u00b0</div></motion.div>)}
          </div>
          <div className="bg-[#1a1510] border-t border-white/10 p-5 flex flex-wrap gap-3 justify-center">
            {HOTSPOTS.map((spot) => (
              <button key={spot.label} onClick={() => setActiveHotspot(activeHotspot === spot.label ? null : spot.label)} className={`px-5 py-2.5 text-[10px] tracking-[0.22em] uppercase font-sans transition-all duration-300 cursor-pointer border ${activeHotspot === spot.label ? "bg-[#c9a84c] text-[#1a1510] border-[#c9a84c]" : "border-white/15 text-white/60 hover:border-[#c9a84c]/50 hover:text-[#c9a84c]"}`}>{spot.label}</button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
