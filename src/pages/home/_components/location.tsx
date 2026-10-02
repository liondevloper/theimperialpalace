import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Location() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="contact" className="py-28 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6"><div className="w-12 h-px bg-primary" /><span className="text-[10px] tracking-[0.4em] uppercase text-primary font-sans">Find Us</span><div className="w-12 h-px bg-primary" /></div>
          <h2 className="font-serif font-light text-foreground" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)" }}>Location & <em className="italic font-light">Contact</em></h2>
        </motion.div>
        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }} className="lg:col-span-2 space-y-10">
            {[{ icon: MapPin, label: "Address", content: <p className="font-serif text-lg text-foreground leading-relaxed">The Imperial Palace<br />Dr. Yagnik Road<br />Rajkot 360001<br />Gujarat, India</p> }, { icon: Phone, label: "Telephone", content: <a href="tel:+912812480000" className="font-serif text-lg text-foreground hover:text-primary transition-colors duration-200">+91 281 248 0000</a> }, { icon: Mail, label: "Email", content: <a href="mailto:reservations@imperialpalace.in" className="font-serif text-lg text-foreground hover:text-primary transition-colors duration-200">reservations@imperialpalace.in</a> }, { icon: Clock, label: "Reception", content: <><p className="font-serif text-lg text-foreground">24 Hours, 7 Days</p><p className="text-muted-foreground text-sm font-sans mt-1">Check-in: 2:00 PM · Check-out: 12:00 PM</p></> }].map(({ icon: Icon, label, content }) => (
              <div key={label} className="flex gap-5">
                <div className="p-3 border border-primary/25 text-primary flex-shrink-0 h-fit mt-0.5"><Icon className="w-4 h-4" /></div>
                <div><div className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground font-sans mb-2">{label}</div>{content}</div>
              </div>
            ))}
            <div className="pt-4"><button className="w-full py-4 bg-primary text-primary-foreground text-[11px] tracking-[0.28em] uppercase font-sans hover:bg-primary/90 transition-colors duration-300 cursor-pointer">Send an Enquiry</button></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.25 }} className="lg:col-span-3">
            <div className="relative overflow-hidden border border-border" style={{ height: "480px" }}>
              <div className="w-full h-full bg-accent/30 flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(#c9a84c 1px, transparent 1px), linear-gradient(90deg, #c9a84c 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div className="relative z-10 text-center p-8">
                  <div className="inline-flex flex-col items-center gap-3 mb-6"><div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg"><MapPin className="w-6 h-6 text-primary-foreground" /></div><div className="w-px h-6 bg-primary/40" /></div>
                  <div className="font-serif text-2xl font-medium text-foreground mb-2">The Imperial Palace</div>
                  <div className="text-muted-foreground text-sm font-sans mb-2">Dr. Yagnik Road, Rajkot 360001</div>
                  <div className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/60 font-sans mb-8">Gujarat, India</div>
                  <a href="https://maps.google.com/?q=The+Imperial+Palace+Rajkot" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary text-[10px] tracking-[0.22em] uppercase font-sans hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer"><MapPin className="w-3.5 h-3.5" />Open in Google Maps</a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {[{ label: "Airport", dist: "~8 km", note: "Rajkot Airport" }, { label: "Railway", dist: "~3 km", note: "Rajkot Junction" }, { label: "City Centre", dist: "~1 km", note: "Dr. Yagnik Rd" }].map((item) => (
                <div key={item.label} className="bg-accent/30 border border-border p-4 text-center">
                  <div className="font-serif text-sm font-medium text-foreground mb-1">{item.label}</div>
                  <div className="text-primary text-xs font-sans mb-1">{item.dist}</div>
                  <div className="text-muted-foreground text-[10px] font-sans">{item.note}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
