import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Crown, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Stay", to: "/stay" }, { label: "Dining", to: "/dining" },
  { label: "Weddings", to: "/weddings" }, { label: "Events", to: "/events" },
  { label: "Wellness", to: "/wellness" }, { label: "360\u00b0 Tour", to: "/tour" },
  { label: "Gallery", to: "/gallery" }, { label: "Contact", to: "/contact" },
];

export default function PageHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-[#1a1510] shadow-lg shadow-black/10">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" onClick={() => setMobileOpen(false)} className="group flex items-center gap-2.5">
          <Crown className="h-6 w-6 text-[#c9a84c] transition-transform group-hover:scale-110" />
          <span className="leading-none">
            <span className="block font-serif text-base font-semibold uppercase tracking-[0.2em] text-white">The Imperial Palace</span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.35em] text-[#c9a84c]">Rajkot</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-5 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="text-[10px] uppercase tracking-[0.16em] text-white/75 transition-colors hover:text-[#c9a84c]">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link to="/contact" className="hidden border border-[#c9a84c] px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#c9a84c] transition-colors hover:bg-[#c9a84c] hover:text-[#1a1510] md:inline-flex">Book Your Stay</Link>
        <button aria-label="Open navigation" onClick={() => setMobileOpen(true)} className="p-2 text-white xl:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex flex-col bg-[#0e0c09]/98 px-6 py-5">
            <div className="flex items-center justify-between">
              <span className="font-serif text-sm uppercase tracking-[0.18em] text-white">The Imperial Palace <span className="text-[#c9a84c]">Rajkot</span></span>
              <button aria-label="Close navigation" onClick={() => setMobileOpen(false)} className="p-2 text-white"><X className="h-6 w-6" /></button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.to} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link onClick={() => setMobileOpen(false)} to={link.to} className="font-serif text-3xl text-white transition-colors hover:text-[#c9a84c]">{link.label}</Link>
                </motion.div>
              ))}
              <Link onClick={() => setMobileOpen(false)} to="/contact" className="mt-3 bg-[#c9a84c] px-7 py-3 text-xs uppercase tracking-[0.2em] text-[#1a1510]">Book Your Stay</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
