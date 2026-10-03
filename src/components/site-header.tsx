import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { NAV_LINKS } from '../lib/hotel-data.ts';
import { LOGO_URL } from '../lib/logo.ts';

const EASE = [0.22, 1, 0.36, 1] as const;

// White circle stays the same size; the artwork inside fills it.
function LogoBadge({ alt }: { alt: string }) {
  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_4px_18px_-6px_rgba(138,106,34,0.45)] ring-1 ring-[#c9a84c]/60">
      <img src={LOGO_URL} alt={alt} className="h-full w-full scale-110 object-contain" />
    </span>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${scrolled ? 'border-[#e6d9b8] bg-[#fbf8f1]/85 shadow-[0_8px_30px_-18px_rgba(90,70,30,0.35)] backdrop-blur-xl' : 'border-transparent bg-[#fbf8f1]'}`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-all duration-500 lg:px-8 ${scrolled ? 'h-[66px]' : 'h-[78px]'}`}>
        <Link to="/" className="flex min-w-0 items-center gap-3 transition-transform duration-500 hover:scale-105" aria-label="The Imperial Palace Rajkot, home">
          <LogoBadge alt="The Imperial Palace logo" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 xl:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `group relative py-2 text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-[#8a6a22] ${isActive ? 'text-[#8a6a22]' : 'text-[#3a3024]/80'}`}>
              {({ isActive }) => (
                <>
                  {link.label}
                  <span className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-[#b8933a] transition-transform duration-500 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <button type="button" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(true)} className="flex h-11 w-11 cursor-pointer items-center justify-center text-[#3a3024] xl:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-[#fbf8f1]"
          >
            <div className="flex h-[78px] items-center justify-between px-5">
              <LogoBadge alt="The Imperial Palace" />
              <button type="button" aria-label="Close navigation" onClick={close} className="flex h-11 w-11 cursor-pointer items-center justify-center text-[#3a3024]"><X className="h-6 w-6" /></button>
            </div>
            <nav aria-label="Mobile" className="flex flex-col items-center gap-5 px-5 py-8">
              {[{ to: '/', label: 'Home' }, ...NAV_LINKS].map((link, i) => (
                <motion.div key={link.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 + i * 0.05, ease: EASE }}>
                  <Link to={link.to} onClick={close} className="font-serif text-3xl text-[#2a2218] transition-colors hover:text-[#8a6a22]">{link.label}</Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
