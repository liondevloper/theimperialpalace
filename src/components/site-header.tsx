import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../lib/hotel-data.ts';
import { LOGO_URL } from '../lib/logo.ts';

const logoClass = 'h-14 w-14 shrink-0 rounded-full bg-white object-contain ring-1 ring-[#c9a84c]/60';

// Split nav so the logo sits centered between two balanced link groups on desktop.
const half = Math.ceil(NAV_LINKS.length / 2);
const LEFT_LINKS = NAV_LINKS.slice(0, half);
const RIGHT_LINKS = NAV_LINKS.slice(half);

function DesktopLinks({ links, className }: { links: typeof NAV_LINKS; className: string }) {
  return (
    <nav aria-label="Primary" className={`hidden items-center gap-6 xl:flex ${className}`}>
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} className={({ isActive }) => `text-[11px] uppercase tracking-[0.16em] transition-colors hover:text-[#c9a84c] ${isActive ? 'text-[#c9a84c]' : 'text-white/80'}`}>{link.label}</NavLink>
      ))}
    </nav>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

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
    <header className="sticky top-0 z-50 bg-[#14110c]">
      <div className="mx-auto grid h-[76px] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-5 lg:px-8">
        <DesktopLinks links={LEFT_LINKS} className="justify-end" />
        <div className="xl:hidden" />

        {/* Centered logo */}
        <Link to="/" className="flex items-center justify-center" aria-label="The Imperial Palace Rajkot, home">
          <img src={LOGO_URL} alt="The Imperial Palace logo" className={logoClass} />
        </Link>

        <DesktopLinks links={RIGHT_LINKS} className="justify-start" />
        <div className="flex justify-end xl:hidden">
          <button type="button" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(true)} className="flex h-11 w-11 cursor-pointer items-center justify-center text-white">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Navigation" className="fixed inset-0 z-[100] overflow-y-auto bg-[#0e0c09]">
          <div className="grid h-[76px] grid-cols-[1fr_auto_1fr] items-center px-5">
            <div />
            <img src={LOGO_URL} alt="The Imperial Palace" className={logoClass} />
            <div className="flex justify-end">
              <button type="button" aria-label="Close navigation" onClick={close} className="flex h-11 w-11 cursor-pointer items-center justify-center text-white"><X className="h-6 w-6" /></button>
            </div>
          </div>
          <nav aria-label="Mobile" className="flex flex-col items-center gap-5 px-5 py-8">
            <Link to="/" onClick={close} className="font-serif text-3xl text-white hover:text-[#c9a84c]">Home</Link>
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to} onClick={close} className="font-serif text-3xl text-white hover:text-[#c9a84c]">{link.label}</Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
