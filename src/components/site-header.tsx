import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { NAV_LINKS } from '../lib/hotel-data.ts';
import { LOGO_IMAGE } from '../lib/logo.ts';

const EASE = [0.22, 1, 0.36, 1] as const;

// The source image (1254x1254) has wide empty margins. This frame crops to just the
// artwork (1182x799 region at 23,251). On dark backgrounds the black wordmark is inverted to
// ivory while hue-rotate keeps the flower gold; tone="light" keeps the original colours.
export function Logo({ alt, small = false, className = '', tone = 'dark' }: { alt: string; small?: boolean; className?: string; tone?: 'dark' | 'light' }) {
  const size = className || (small ? 'h-12 md:h-14' : 'h-14 md:h-[72px]');
  const colour = tone === 'dark' ? 'invert hue-rotate-180' : 'mix-blend-multiply';
  return (
    <span role="img" aria-label={alt} className={`relative block aspect-[1182/799] shrink-0 overflow-hidden transition-all duration-500 ${size}`}>
      <img src={LOGO_IMAGE} alt="" width={1254} height={1254} decoding="async" fetchPriority="high" className={`absolute h-auto max-w-none ${colour}`} style={{ width: '106.09%', left: '-1.95%', top: '-31.41%' }} />
    </span>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
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

  // The header uses the light ivory palette so the logo shows in its true colours
  // (black wordmark, gold flower). No backdrop-blur: it would trap the fixed mobile menu.
  // Layout: three-column grid (menu left, logo centre, empty right column) keeps the logo truly centred.
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
      className={`theme-ivory sticky top-0 z-50 border-b border-[#e6d9b8] bg-[#f8f2e4] text-foreground transition-shadow duration-500 ${scrolled ? 'shadow-[0_12px_30px_-18px_rgba(0,0,0,0.6)]' : ''}`}
    >
      <div className={`mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 transition-all duration-500 lg:px-8 ${scrolled ? 'h-[66px] md:h-[72px]' : 'h-[76px] md:h-[88px]'}`}>
        <div className="flex min-w-0 items-center justify-start">
          <button type="button" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(true)} className="-ml-2 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center text-[#2a2218] xl:hidden">
            <Menu className="h-6 w-6" />
          </button>

          <nav aria-label="Primary" className="hidden flex-wrap items-center gap-x-5 gap-y-1 xl:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => `group relative py-1 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors hover:text-[#8a6a22] ${isActive ? 'text-[#8a6a22]' : 'text-[#2a2218]/80'}`}>
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-[#b8933a] transition-transform duration-500 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <Link to="/" className="flex items-center justify-center transition-transform duration-500 hover:scale-[1.03]" aria-label="The Imperial Palace Rajkot, home">
          <Logo alt="The Imperial Palace logo" tone="light" small={scrolled} />
        </Link>

        <div aria-hidden="true" />
      </div>

      {/* Gold reading-progress line */}
      <motion.div style={{ scaleX: scrollYProgress }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-[#b8933a] via-[#d9bc6a] to-[#b8933a]" />

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
            className="fixed inset-0 z-[100] overflow-y-auto bg-[#f8f2e4]"
          >
            <div className="grid h-[76px] grid-cols-[1fr_auto_1fr] items-center border-b border-[#e6d9b8] px-5">
              <button type="button" aria-label="Close navigation" onClick={close} className="-ml-2 flex h-11 w-11 cursor-pointer items-center justify-center text-[#2a2218]"><X className="h-6 w-6" /></button>
              <Logo alt="The Imperial Palace" tone="light" />
              <div aria-hidden="true" />
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
