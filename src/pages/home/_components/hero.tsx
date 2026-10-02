import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const handleExplore = () => {
    const el = document.querySelector("#intro");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  const handleBook = () => {
    const el = document.querySelector("#rooms");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1782113268782-202ccef98e50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=90" alt="The Imperial Palace Grand Lobby" loading="eager" className="w-full h-full object-cover object-center scale-105" style={{ animation: "heroZoom 12s ease-out forwards" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0c09]/70 via-[#0e0c09]/40 to-[#0e0c09]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0c09]/30 via-transparent to-transparent" />
      </div>
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#c9a84c]/40 to-transparent" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex items-center gap-4 mb-8">
          <div className="w-12 h-px bg-[#c9a84c]/60" />
          <span className="text-[#c9a84c] text-[10px] tracking-[0.45em] uppercase font-sans">Est. Rajkot, Gujarat</span>
          <div className="w-12 h-px bg-[#c9a84c]/60" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }} className="font-serif font-light text-white text-balance leading-[0.95]" style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}>
          Where Elegance<br /><em className="font-light italic text-[#e8d5a3]">Meets Rajkot</em>
        </motion.h1>
        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.8, delay: 0.9 }} className="flex items-center gap-3 my-8">
          <div className="w-16 h-px bg-[#c9a84c]/50" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#c9a84c]/70" />
          <div className="w-16 h-px bg-[#c9a84c]/50" />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8 }} className="text-white/70 font-sans font-light text-lg max-w-xl leading-relaxed mb-12 tracking-wide">
          An iconic destination for refined stays, memorable celebrations and exceptional hospitality.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }} className="flex flex-col sm:flex-row gap-4 items-center">
          <button onClick={handleExplore} className="px-10 py-4 border border-white/40 text-white text-[11px] tracking-[0.28em] uppercase font-sans hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300 cursor-pointer min-w-[220px]">
            Explore the Hotel
          </button>
          <button onClick={handleBook} className="px-10 py-4 bg-[#c9a84c] text-[#1a1510] text-[11px] tracking-[0.28em] uppercase font-sans font-medium hover:bg-[#e8d5a3] transition-all duration-300 cursor-pointer min-w-[220px]">
            Book Your Stay
          </button>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer" onClick={handleExplore}>
        <span className="text-white/40 text-[9px] tracking-[0.4em] uppercase font-sans">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5 text-[#c9a84c]/60" />
        </motion.div>
      </motion.div>
      <style>{`@keyframes heroZoom { from { transform: scale(1.05); } to { transform: scale(1); } }`}</style>
    </section>
  );
}
