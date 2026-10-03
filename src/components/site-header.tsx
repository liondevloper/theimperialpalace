import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CalendarCheck, Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { NAV_LINKS } from '../lib/hotel-data.ts';
import { HEADER_LOGO_URL } from '../lib/logo.ts';
import { BTN } from '../lib/styles.ts';
import BookStayModal from './book-stay-modal.tsx';

const EASE = [0.22, 1, 0.36, 1] as const;

// The source image (1254x1254) has wide white margins. This frame crops to just the
// artwork (1182x799 region at 23,251); multiply hides the white on ivory.
export function Logo({ alt, small = false, className = '' }: { alt: string; small?: boolean; className?: string }) {
  const size = className || (small ? 'h-12 md:h-14' : 'h-14 md:h-[72px]');
  return (
    <span role="img" aria-label={alt} className={`relative block aspect-[1182/799] shrink-0 overflow-hidden transition-all duration-500 ${size}`}>
      <img src={HEADER_LOGO_URL} alt="" className="absolute max-w-none mix-blend-multiply" style={{ width: '106.09%', left: '-1.95%', top: '-31.41%' }} />
    </span>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
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
  // Booking state lives here (not in the mobile menu) so closing the menu keeps the popup open.
  const openBooking = () => {
    setOpen(false);
    setBookingOpen(true);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${scrolled ? 'border-[#e6d9b8] bg-[#fbf8f1]/90 shadow-[0_8px_30px_-18px_rgba(90,70,30,0.35)] backdrop-blur-xl' : 'border-transparent bg-[#fbf8f1]'}`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 transition-all duration-500 lg:px-8 ${scrolled ? 'h-[68px] md:h-[76px]' : 'h-[80px] md:h-[92px]'}`}>
        <Link to="/" className="flex min-w-0 items-center transition-transform duration-500 hover:scale-[1.03]" aria-label="The Imperial Palace Rajkot, home">
          <Logo alt="The Imperial Palace logo" small={scrolled} />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
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

        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={openBooking} className={`${BTN.gold} hidden px-5 sm:inline-flex`}>
            <CalendarCheck className="h-4 w-4" />
            Book stay
          </button>
          <button type="button" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(true)} className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center text-[#3a3024] xl:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
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
            <div className="flex h-[80px] items-center justify-between px-5">
              <Logo alt="The Imperial Palace" />
              <button type="button" aria-label="Close navigation" onClick={close} className="flex h-11 w-11 cursor-pointer items-center justify-center text-[#3a3024]"><X className="h-6 w-6" /></button>
            </div>
            <nav aria-label="Mobile" className="flex flex-col items-center gap-5 px-5 py-8">
              {[{ to: '/', label: 'Home' }, ...NAV_LINKS].map((link, i) => (
                <motion.div key={link.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 + i * 0.05, ease: EASE }}>
                  <Link to={link.to} onClick={close} className="font-serif text-3xl text-[#2a2218] transition-colors hover:text-[#8a6a22]">{link.label}</Link>
                </motion.div>
              ))}
              <button type="button" onClick={openBooking} className={`${BTN.gold} mt-4`}>
                <CalendarCheck className="h-4 w-4" />
                Book stay
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <BookStayModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </motion.header>
  );
}
