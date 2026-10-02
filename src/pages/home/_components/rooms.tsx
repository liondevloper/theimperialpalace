import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";

const ROOMS = [
  { name: "Standard Room", desc: "Thoughtfully appointed with contemporary comforts, ideal for the discerning business or leisure traveller.", size: "~280 sq.ft", img: "https://images.unsplash.com/photo-1758194090785-8e09b7288199?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", badge: null },
  { name: "Superior Room", desc: "Elevated in space and refined in detail, offering a more generous retreat after a day of exploration.", size: "~320 sq.ft", img: "https://images.unsplash.com/photo-1774916698642-258ea43637e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", badge: null },
  { name: "Club Select Room", desc: "Exclusive Club floor access with a curated selection of privileges.", size: "~360 sq.ft", img: "https://images.unsplash.com/photo-1758194190679-198a77cba84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", badge: "Club Floor" },
  { name: "Club Deluxe Room", desc: "A spacious sanctuary with premium furnishings and full Club access.", size: "~400 sq.ft", img: "https://images.unsplash.com/photo-1772537507935-065b8aba4df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", badge: "Club Floor" },
  { name: "Executive Suite", desc: "Dedicated living and dining areas with bespoke furnishings, ideal for extended luxury stays.", size: "~650 sq.ft", img: "https://images.unsplash.com/photo-1782854356665-000b01a48016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", badge: "Suite" },
  { name: "Presidential Suite", desc: "An unparalleled expression of elegance — private terrace, butler service, and city panoramas.", size: "~1,200 sq.ft", img: "https://images.unsplash.com/photo-1758802416783-af30c485fbe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", badge: "Premium" },
  { name: "Imperial Suite", desc: "The pinnacle of palatial living. A private world of bespoke luxury, dedicated staff, and timeless grandeur.", size: "~2,000 sq.ft", img: "https://images.unsplash.com/photo-1767395523614-53f52709c37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", badge: "Signature" },
];

export default function Rooms() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section id="rooms" className="py-28 bg-accent/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6"><div className="w-12 h-px bg-primary" /><span className="text-[10px] tracking-[0.4em] uppercase text-primary font-sans">Accommodations</span><div className="w-12 h-px bg-primary" /></div>
          <h2 className="font-serif font-light text-foreground" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}>Rooms & Suites</h2>
          <p className="text-muted-foreground font-sans mt-6 max-w-lg mx-auto leading-7">Seven categories of accommodation, each a world of its own — from refined comfort to imperial grandeur.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROOMS.map((room, i) => (
            <motion.div key={room.name} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.08 }} className={`group relative overflow-hidden bg-card ${i === 6 ? "md:col-span-2 lg:col-span-1" : ""}`} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              <div className="relative overflow-hidden" style={{ height: "260px" }}>
                <img src={room.img} alt={room.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c09]/60 via-transparent to-transparent" />
                {room.badge && <div className="absolute top-4 right-4 px-3 py-1 bg-[#c9a84c] text-[#1a1510] text-[9px] tracking-[0.25em] uppercase font-sans font-medium">{room.badge}</div>}
              </div>
              <div className="p-7 border border-border border-t-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-serif text-xl font-medium text-foreground">{room.name}</h3>
                  <span className="text-[10px] text-muted-foreground tracking-wide font-sans mt-1">{room.size}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-6 font-sans mb-6">{room.desc}</p>
                <button className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-primary font-sans hover:gap-3 transition-all duration-300 cursor-pointer group/btn">
                  <span>View Room</span><ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
              <motion.div className="absolute inset-0 border-2 border-[#c9a84c] pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: hovered === i ? 1 : 0 }} transition={{ duration: 0.25 }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
