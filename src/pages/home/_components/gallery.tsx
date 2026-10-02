import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

type Category = "All" | "Hotel" | "Rooms" | "Dining" | "Weddings" | "Events" | "Wellness";

const GALLERY_ITEMS = [
  { category: "Hotel", img: "https://images.unsplash.com/photo-1782113268782-202ccef98e50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", alt: "Grand lobby", span: "col-span-2 row-span-2" },
  { category: "Rooms", img: "https://images.unsplash.com/photo-1774916698642-258ea43637e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80", alt: "Luxury suite", span: "col-span-1 row-span-1" },
  { category: "Dining", img: "https://images.unsplash.com/photo-1741852197045-cc35920a3aa0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80", alt: "The Courtyard dining", span: "col-span-1 row-span-1" },
  { category: "Weddings", img: "https://images.unsplash.com/photo-1779308936221-89739e035a53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80", alt: "Wedding reception", span: "col-span-2 row-span-1" },
  { category: "Wellness", img: "https://images.unsplash.com/photo-1769149255670-aa0ad6428dd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80", alt: "Swimming pool", span: "col-span-1 row-span-1" },
  { category: "Events", img: "https://images.unsplash.com/photo-1780593116478-c46838f86523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80", alt: "Ballroom event", span: "col-span-1 row-span-1" },
  { category: "Rooms", img: "https://images.unsplash.com/photo-1772537507935-065b8aba4df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80", alt: "Room detail", span: "col-span-1 row-span-1" },
  { category: "Dining", img: "https://images.unsplash.com/photo-1785845506893-70768a28ba44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80", alt: "Fine dining Senso", span: "col-span-1 row-span-1" },
  { category: "Wellness", img: "https://images.unsplash.com/photo-1745327883290-1e9c6447b938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80", alt: "Spa massage", span: "col-span-1 row-span-1" },
];

const CATEGORIES: Category[] = ["All", "Hotel", "Rooms", "Dining", "Weddings", "Events", "Wellness"];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const filtered = active === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.category === active);
  return (
    <section id="gallery" className="py-28 bg-accent/20" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-14">
          <div className="flex items-center justify-center gap-4 mb-6"><div className="w-12 h-px bg-primary" /><span className="text-[10px] tracking-[0.4em] uppercase text-primary font-sans">Gallery</span><div className="w-12 h-px bg-primary" /></div>
          <h2 className="font-serif font-light text-foreground" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}>Through the Lens of<br /><em className="italic font-light">The Imperial Palace</em></h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (<button key={cat} onClick={() => setActive(cat)} className={`px-5 py-2.5 text-[10px] tracking-[0.22em] uppercase font-sans transition-all duration-300 cursor-pointer border ${active === cat ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"}`}>{cat}</button>))}
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px]">
          {filtered.map((item, i) => (
            <motion.div key={`${item.alt}-${i}`} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: i * 0.04 }} className={`group relative overflow-hidden cursor-pointer ${item.span}`} onClick={() => setLightbox(item.img)}>
              <img src={item.img} alt={item.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-[#0e0c09]/0 group-hover:bg-[#0e0c09]/40 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"><div className="text-white text-[9px] tracking-[0.3em] uppercase border border-white/40 px-4 py-2">View</div></div>
            </motion.div>
          ))}
        </div>
      </div>
      {lightbox && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-[#0e0c09]/95 flex items-center justify-center p-6 cursor-pointer" onClick={() => setLightbox(null)}><motion.img initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} src={lightbox} alt="Gallery image" className="max-w-full max-h-full object-contain" style={{ maxHeight: "88vh", maxWidth: "90vw" }} /><button className="absolute top-6 right-8 text-white/60 text-2xl hover:text-white transition-colors cursor-pointer">&times;</button></motion.div>)}
    </section>
  );
}
