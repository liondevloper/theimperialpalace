import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Crown, Menu, X } from "lucide-react";
import { NAV_LINKS } from "../lib/hotel-data.ts";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-[#14110c]">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="The Imperial Palace Rajkot, home">
          <Crown className="h-6 w-6 shrink-0 text-[#c9a84c]" />
          <span className="min-w-0 leading-none">
            <span className="block truncate font-serif text-[15px] font-semibold uppercase tracking-[0.16em] text-white sm:text-base sm:tracking-[0.2em]">The Imperial Palace</span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.35em] text-[#c9a84c]">Rajkot</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `text-[11px] uppercase tracking-[0.16em] transition-colors hover:text-[#c9a84c] ${isActive ? "text-[#c9a84c]" : "text-white/80"}`}>{link.label}</NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(true)} className="flex h-11 w-11 cursor-pointer items-center justify-center text-white xl:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Navigation" className="fixed inset-0 z-[100] overflow-y-auto bg-[#0e0c09]">
          <div className="flex h-[72px] items-center justify-between px-5">
            <span className="font-serif text-sm uppercase tracking-[0.18em] text-white">The Imperial Palace <span className="text-[#c9a84c]">Rajkot</span></span>
            <button type="button" aria-label="Close navigation" onClick={close} className="flex h-11 w-11 cursor-pointer items-center justify-center text-white"><X className="h-6 w-6" /></button>
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
