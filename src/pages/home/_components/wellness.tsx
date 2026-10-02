import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Waves, Dumbbell, Flame, Droplets, Sparkles, Wind } from "lucide-react";

const AMENITIES = [
  { icon: Waves, name: "Swimming Pool", desc: "A serene temperature-controlled outdoor pool with sun loungers and poolside service.", img: "https://images.unsplash.com/photo-1769149255670-aa0ad6428dd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700&q=80" },
  { icon: Dumbbell, name: "Gymnasium", desc: "A fully-equipped fitness centre with modern cardio and strength training equipment.", img: "https://images.unsplash.com/photo-1693578538512-fc66f318c833?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700&q=80" },
  { icon: Flame, name: "Steam Bath", desc: "Therapeutic steam rooms that cleanse and rejuvenate, preparing body and mind.", img: "https://images.unsplash.com/photo-1737352777897-e22953991a32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700&q=80" },
  { icon: Droplets, name: "Jacuzzi", desc: "Relax in our private Jacuzzi pools, the perfect antidote to a long journey or day.", img: "https://images.unsplash.com/photo-1745327883290-1e9c6447b938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700&q=80" },
  { icon: Sparkles, name: "Massage Therapy", desc: "Skilled therapists offer a menu of traditional and contemporary massage treatments.", img: "https://images.unsplash.com/photo-1787651343620-8d5303006ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700&q=80" },
  { icon: Wind, name: "Aroma Therapy", desc: "Immersive aroma therapy sessions using premium essential oils for deep relaxation.", img: "https://images.unsplash.com/photo-1630595271375-5073a6c0638b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=700&q=80" },
];

export default function Wellness() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="wellness" className="py-28 bg-background overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6"><div className="w-12 h-px bg-primary" /><span className="text-[10px] tracking-[0.4em] uppercase text-primary font-sans">Wellness & Leisure</span><div className="w-12 h-px bg-primary" /></div>
          <h2 className="font-serif font-light text-foreground" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}>A Sanctuary for the<br /><em className="italic font-light">Body & Mind</em></h2>
          <p className="text-muted-foreground font-sans mt-6 max-w-lg mx-auto leading-7">Step into a world of pure indulgence. Our wellness centre offers a curated collection of experiences designed to restore your energy and elevate your spirit.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.9, delay: 0.2 }} className="relative overflow-hidden mb-16" style={{ height: "380px" }}>
          <img src="https://images.unsplash.com/photo-1700219447843-d9fafce8143f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=90" alt="Wellness & pool" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c09]/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8"><div className="text-white/50 text-[9px] tracking-[0.4em] uppercase font-sans">Pool & Wellness Complex</div></div>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AMENITIES.map((item, i) => { const Icon = item.icon; return (
            <motion.div key={item.name} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }} className="group overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300">
              <div className="overflow-hidden h-[180px]"><img src={item.img} alt={item.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
              <div className="p-6 flex items-start gap-4">
                <div className="mt-0.5 p-2.5 border border-primary/20 text-primary flex-shrink-0"><Icon className="w-4 h-4" /></div>
                <div><h3 className="font-serif text-lg font-medium text-foreground mb-1.5">{item.name}</h3><p className="text-muted-foreground text-sm leading-6 font-sans">{item.desc}</p></div>
              </div>
            </motion.div>
          ); })}
        </div>
      </div>
    </section>
  );
}
