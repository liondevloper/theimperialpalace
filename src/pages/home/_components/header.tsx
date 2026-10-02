import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Crown } from "lucide-react";

const NAV_LINKS = [
  { label: "Stay", href: "#rooms" },
  { label: "Dining", href: "#dining" },
  { label: "Weddings", href: "#weddings" },
  { label: "Events", href: "#events" },
  { label: "Wellness", href: "#wellness" },
  { label: "360\u00b0 Tour", href: "#tour" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#1a1510]/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5 group cursor-pointer">
              <Crown className="w-6 h-6 text-[#c9a84c] group-hover:scale-110 transition-transform duration-300" />
              <div className="leading-none">
                <div className="font-serif text-base font-semibold tracking-[0.2em] text-white uppercase">The Imperial Palace</div>
                <div className="text-[10px] font-sans tracking-[0.35em] text-[#c9a84c] uppercase mt-0.5">Rajkot</div>
              </div>
            </button>
            <nav className="hidden lg:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <button key={link.label} onClick={() => handleNav(link.href)} className="text-[11px] font-sans tracking-[0.18em] text-white/80 hover:text-[#c9a84c] transition-colors duration-300 uppercase cursor-pointer">
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <button onClick={() => handleNav("#rooms")} className="hidden md:inline-flex items-center px-5 py-2.5 border border-[#c9a84c] text-[#c9a84c] text-[10px] tracking-[0.22em] uppercase font-sans font-medium hover:bg-[#c9a84c] hover:text-[#1a1510] transition-all duration-300 cursor-pointer">
                Book Your Stay
              </button>
              <button onClick={() => setMobileOpen(true)} className="lg:hidden text-white p-2 cursor-pointer" aria-label="Open menu">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#0e0c09]/98 backdrop-blur-sm flex flex-col">
            <div className="flex items-center justify-between px-6 h-20">
              <div className="flex items-center gap-2.5">
                <Crown className="w-5 h-5 text-[#c9a84c]" />
                <div>
                  <div className="font-serif text-sm font-semibold tracking-[0.18em] text-white uppercase">The Imperial Palace</div>
                  <div className="text-[9px] tracking-[0.35em] text-[#c9a84c] uppercase">Rajkot</div>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="text-white cursor-pointer"><X className="w-6 h-6" /></button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.4 }} onClick={() => handleNav(link.href)} className="font-serif text-3xl font-light text-white hover:text-[#c9a84c] transition-colors duration-300 cursor-pointer">
                  {link.label}
                </motion.button>
              ))}
              <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: NAV_LINKS.length * 0.06 + 0.1 }} onClick={() => handleNav("#rooms")} className="mt-4 px-8 py-3 border border-[#c9a84c] text-[#c9a84c] text-xs tracking-[0.22em] uppercase hover:bg-[#c9a84c] hover:text-[#1a1510] transition-all duration-300 cursor-pointer">
                Book Your Stay
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
