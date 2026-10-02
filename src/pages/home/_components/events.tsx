import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Users } from "lucide-react";

const VENUES = [
  { name: "The Regent Room", desc: "Our premier grand ballroom, adorned with crystal chandeliers and elegant drapery, for the most lavish of gatherings.", capacity: "Up to 1,200 guests", sqft: "~8,000 sq.ft", img: "https://images.unsplash.com/photo-1780593116478-c46838f86523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80" },
  { name: "The Regal Room", desc: "An intimate yet striking venue perfect for corporate meetings, product launches, and private banquets.", capacity: "Up to 400 guests", sqft: "~2,400 sq.ft", img: "https://images.unsplash.com/photo-1775918427144-51f0bf53f8c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80" },
  { name: "Ambience", desc: "A versatile mid-scale hall with state-of-the-art AV and lighting facilities, ideal for conferences.", capacity: "Up to 250 guests", sqft: "~1,500 sq.ft", img: "https://images.unsplash.com/photo-1784217066863-9713160569f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80" },
  { name: "Elegance", desc: "An intimate boardroom-style venue for executive meetings, private dinners, and small celebrations.", capacity: "Up to 80 guests", sqft: "~600 sq.ft", img: "https://images.unsplash.com/photo-1775492783108-5714035b298b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80" },
  { name: "Pool Deck", desc: "The open-air pool deck transforms into a spectacular evening venue beneath the stars.", capacity: "Up to 300 guests", sqft: "Alfresco", img: "https://images.unsplash.com/photo-1769149255670-aa0ad6428dd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80" },
];

export default function Events() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="events" className="py-28 bg-accent/20" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6"><div className="w-12 h-px bg-primary" /><span className="text-[10px] tracking-[0.4em] uppercase text-primary font-sans">Events & Banquets</span><div className="w-12 h-px bg-primary" /></div>
          <h2 className="font-serif font-light text-foreground" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}>Exceptional Spaces for<br /><em className="italic font-light">Every Occasion</em></h2>
          <p className="text-muted-foreground font-sans mt-6 max-w-xl mx-auto leading-7">From intimate boardrooms to grand ballrooms — our event spaces are designed to make every gathering extraordinary.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VENUES.map((venue, i) => (
            <motion.div key={venue.name} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.1 }} className={`group overflow-hidden bg-card border border-border hover:border-[#c9a84c]/40 transition-all duration-300 ${i === 0 ? "md:col-span-2 lg:col-span-1" : ""}`}>
              <div className="overflow-hidden h-[200px]"><img src={venue.img} alt={venue.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-medium text-foreground mb-2">{venue.name}</h3>
                <p className="text-muted-foreground text-sm leading-6 font-sans mb-5">{venue.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-sans"><Users className="w-3.5 h-3.5 text-primary" /><span>{venue.capacity}</span></div>
                  <span className="text-[10px] text-muted-foreground font-sans tracking-wide">{venue.sqft}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.6 }} className="text-center mt-16">
          <button onClick={() => { const el = document.querySelector("#contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); }} className="inline-flex items-center px-10 py-4 border border-primary text-primary text-[11px] tracking-[0.28em] uppercase font-sans hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer">Plan an Event</button>
        </motion.div>
      </div>
    </section>
  );
}
