import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, CalendarCheck } from "lucide-react";

export default function FloatingElements() {
  const [showBooking, setShowBooking] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBookScroll = () => {
    const el = document.querySelector("#rooms");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setShowBooking(false);
  };

  return (
    <>
      <AnimatePresence>
        {scrolled && (
          <motion.div initial={{ opacity: 0, scale: 0.5, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.5, x: 40 }} className="fixed bottom-24 right-6 z-40">
            <button onClick={() => setShowWhatsApp(!showWhatsApp)} className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 cursor-pointer" aria-label="Chat on WhatsApp">
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
            <AnimatePresence>
              {showWhatsApp && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute bottom-16 right-0 bg-white border border-gray-200 shadow-2xl p-5 w-[240px]" style={{ borderRadius: "2px" }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-serif text-sm font-medium text-gray-800">The Imperial Palace</div>
                    <button onClick={() => setShowWhatsApp(false)} className="cursor-pointer text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
                  </div>
                  <p className="text-gray-500 text-xs font-sans leading-5 mb-4">Chat with our concierge for reservations, events or any queries.</p>
                  <a href="https://wa.me/912812480000" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-[#25D366] text-white text-[10px] tracking-[0.2em] uppercase font-sans flex items-center justify-center gap-2 hover:bg-[#20b558] transition-colors cursor-pointer">
                    <MessageCircle className="w-3.5 h-3.5" />Chat on WhatsApp
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {scrolled && (
          <motion.div initial={{ opacity: 0, scale: 0.5, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.5, x: 40 }} transition={{ delay: 0.1 }} className="fixed bottom-6 right-6 z-40">
            <button onClick={() => setShowBooking(!showBooking)} className="flex items-center gap-2 px-5 py-3.5 bg-[#c9a84c] text-[#1a1510] text-[10px] tracking-[0.22em] uppercase font-sans font-medium shadow-2xl hover:bg-[#e8d5a3] transition-all duration-300 cursor-pointer">
              <CalendarCheck className="w-4 h-4" />Book Stay
            </button>
            <AnimatePresence>
              {showBooking && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute bottom-14 right-0 bg-[#0e0c09] border border-white/10 shadow-2xl p-5 w-[260px]" style={{ borderRadius: "2px" }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-serif text-sm font-medium text-white">Quick Booking</div>
                    <button onClick={() => setShowBooking(false)} className="cursor-pointer text-white/40 hover:text-white/70"><X className="w-4 h-4" /></button>
                  </div>
                  <p className="text-white/50 text-xs font-sans leading-5 mb-5">Ready to experience The Imperial Palace? Browse our rooms and make a reservation.</p>
                  <button onClick={handleBookScroll} className="w-full py-3 bg-[#c9a84c] text-[#1a1510] text-[10px] tracking-[0.22em] uppercase font-sans font-medium hover:bg-[#e8d5a3] transition-colors cursor-pointer">View Rooms & Suites</button>
                  <button onClick={() => { const el = document.querySelector("#contact"); if (el) el.scrollIntoView({ behavior: "smooth" }); setShowBooking(false); }} className="w-full py-3 border border-white/10 text-white/60 text-[10px] tracking-[0.22em] uppercase font-sans hover:text-white/80 transition-colors cursor-pointer mt-2">Contact Concierge</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
