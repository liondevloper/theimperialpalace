import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Heart } from "lucide-react";

export default function Weddings() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const handlePlan = () => { const el = document.querySelector("#contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); };
  return (
    <section id="weddings" className="relative min-h-[90vh] flex items-center overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1779308936221-89739e035a53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=90" alt="Grand wedding" loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e0c09]/90 via-[#0e0c09]/65 to-[#0e0c09]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c09]/50 via-transparent to-transparent" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="flex items-center gap-4 mb-8">
            <div className="w-10 h-px bg-[#c9a84c]" /><Heart className="w-3.5 h-3.5 text-[#c9a84c]" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#c9a84c] font-sans">Weddings & Celebrations</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.1 }} className="font-serif font-light text-white leading-[1.05] mb-8" style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)" }}>
            Celebrate Your<br /><em className="italic font-light text-[#e8d5a3]">Most Memorable</em><br />Moments
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.25 }} className="text-white/70 font-sans leading-8 text-base mb-10 max-w-xl">
            From intimate betrothals to grand celebrations with thousands of guests, The Imperial Palace transforms every wedding into a timeless story.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4">
            <button onClick={handlePlan} className="px-10 py-4 bg-[#c9a84c] text-[#1a1510] text-[11px] tracking-[0.28em] uppercase font-sans font-medium hover:bg-[#e8d5a3] transition-all duration-300 cursor-pointer">Plan Your Wedding</button>
            <button onClick={() => { const el = document.querySelector("#events"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="px-10 py-4 border border-white/40 text-white text-[11px] tracking-[0.28em] uppercase font-sans hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300 cursor-pointer">View Venues</button>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.55 }} className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-white/15">
            {[{ val: "10,000+", label: "Sq.Ft. Space" }, { val: "2,000+", label: "Guest Capacity" }, { val: "500+", label: "Weddings Hosted" }].map((item) => (
              <div key={item.label}><div className="font-serif text-2xl font-light text-[#c9a84c] mb-1">{item.val}</div><div className="text-[9px] tracking-[0.3em] uppercase text-white/50 font-sans">{item.label}</div></div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
