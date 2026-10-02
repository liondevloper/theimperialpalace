import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";

const VENUES = [
  { name: "The Courtyard", desc: "An alfresco dining experience under the open sky — where fresh air, warm ambience, and carefully crafted flavours meet.", tag: "Alfresco", img: "https://images.unsplash.com/photo-1741852197045-cc35920a3aa0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80" },
  { name: "Senso Delicacy", desc: "An intimate fine-dining haven celebrating the finest Indian and Continental cuisine with theatrical presentation.", tag: "Fine Dining", img: "https://images.unsplash.com/photo-1785845506893-70768a28ba44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80" },
  { name: "In-Room Dining", desc: "The full splendour of our kitchen delivered to your suite. Curated menus, 24-hour service, flawless presentation.", tag: "24/7 Service", img: "https://images.unsplash.com/photo-1768397003905-a202ea6325f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80" },
];

export default function Dining() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="dining" className="py-28 bg-background overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-4 mb-6"><div className="w-10 h-px bg-primary" /><span className="text-[10px] tracking-[0.4em] uppercase text-primary font-sans">Culinary Arts</span></div>
            <h2 className="font-serif font-light text-foreground" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}>An Ode to<br /><em className="italic font-light">Fine Cuisine</em></h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="text-muted-foreground font-sans leading-7 text-base pb-2">Every dining experience at The Imperial Palace is a journey through flavour, crafted with exceptional ingredients and delivered with impeccable grace.</motion.p>
        </div>
        <div className="grid lg:grid-cols-5 gap-6">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} className="lg:col-span-3 group relative overflow-hidden">
            <div className="relative overflow-hidden" style={{ height: "480px" }}>
              <img src={VENUES[0].img} alt={VENUES[0].name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c09]/80 via-[#0e0c09]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-block px-3 py-1 border border-[#c9a84c]/50 text-[#c9a84c] text-[9px] tracking-[0.3em] uppercase mb-4">{VENUES[0].tag}</div>
                <h3 className="font-serif text-3xl font-light text-white mb-2">{VENUES[0].name}</h3>
                <p className="text-white/70 text-sm font-sans leading-6 mb-5 max-w-sm">{VENUES[0].desc}</p>
                <button className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-[#c9a84c] hover:gap-3 transition-all duration-300 cursor-pointer group/btn"><span>Reserve a Table</span><ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" /></button>
              </div>
            </div>
          </motion.div>
          <div className="lg:col-span-2 flex flex-col gap-6">
            {VENUES.slice(1).map((venue, i) => (
              <motion.div key={venue.name} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }} className="group relative overflow-hidden flex-1">
                <div className="relative overflow-hidden h-[224px]">
                  <img src={venue.img} alt={venue.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c09]/75 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="inline-block px-2.5 py-1 border border-[#c9a84c]/50 text-[#c9a84c] text-[9px] tracking-[0.3em] uppercase mb-3">{venue.tag}</div>
                    <h3 className="font-serif text-xl font-light text-white mb-2">{venue.name}</h3>
                    <button className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#c9a84c] hover:gap-3 transition-all duration-300 cursor-pointer group/btn"><span>Explore</span><ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
