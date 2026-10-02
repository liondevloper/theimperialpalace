import { useRef } from "react";
import { motion, useInView } from "motion/react";

const STATS = [
  { value: "200+", label: "Luxurious Rooms" }, { value: "5", label: "Dining Venues" },
  { value: "10,000", label: "Sq.Ft. Banquet" }, { value: "25+", label: "Years of Legacy" },
];

export default function Intro() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="intro" className="py-28 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const }}>
            <div className="flex items-center gap-4 mb-8"><div className="w-10 h-px bg-primary" /><span className="text-[10px] tracking-[0.4em] uppercase text-primary font-sans">Welcome</span></div>
            <h2 className="font-serif font-light text-foreground leading-[1.05]" style={{ fontSize: "clamp(2.8rem, 5vw, 4.2rem)" }}>A Landmark of <em className="italic font-light">Unrivalled</em> Luxury</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] as const }} className="pt-4 lg:pt-14">
            <p className="text-muted-foreground font-sans leading-8 text-[1.0625rem] mb-6">Nestled in the heart of Rajkot, The Imperial Palace stands as an enduring symbol of grandeur and refined taste. With over two decades of unparalleled hospitality, we have become the preferred destination for discerning travellers, celebrated weddings, and distinguished corporate gatherings.</p>
            <p className="text-muted-foreground font-sans leading-8 text-[1.0625rem]">From our opulent suites and world-class cuisine to bespoke event experiences and a tranquil wellness sanctuary — every detail at The Imperial Palace is curated to exceed expectation.</p>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-border py-10 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-4xl font-light text-primary mb-2">{stat.value}</div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-sans">{stat.label}</div>
            </div>
          ))}
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border mt-16">
          {[{ title: "Luxurious Accommodation", desc: "Meticulously designed rooms and suites where indulgence meets comfort, from Standard elegance to Presidential grandeur." }, { title: "Exquisite Dining", desc: "From The Courtyard's open-air splendour to Senso Delicacy's refined flavours, every meal is an occasion." }, { title: "Grand Weddings", desc: "Create the wedding of your dreams across our magnificent banquet halls and open-air spaces." }, { title: "Corporate Events", desc: "State-of-the-art meeting and event facilities with impeccable service for every professional occasion." }, { title: "Wellness & Leisure", desc: "Rejuvenate your senses at our spa, pool, gymnasium and wellness centre — your sanctuary awaits." }, { title: "Warm Hospitality", desc: "Generations of dedicated staff delivering service that anticipates your every need, naturally and sincerely." }].map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }} className="bg-background p-8 group hover:bg-accent transition-colors duration-300">
              <div className="text-primary text-lg mb-4">◈</div>
              <h3 className="font-serif text-xl font-medium text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-7 font-sans">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
