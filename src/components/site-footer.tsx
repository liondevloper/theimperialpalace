import { Link } from "react-router-dom";
import { Crown } from "lucide-react";
import { CONTACT_INFORMATION, FOOTER_EXTRA_LINKS, NAV_LINKS } from "../lib/hotel-data.ts";
import { whatsappUrl } from "../lib/site-config.ts";
import { BTN } from "../lib/styles.ts";

const linkClass = "text-sm text-white/70 transition-colors hover:text-[#c9a84c]";

export default function SiteFooter() {
  const info = CONTACT_INFORMATION;
  const explore = [{ label: "Rooms & suites", to: "/stay" }, ...NAV_LINKS.filter((l) => l.to !== "/stay" && l.to !== "/contact"), ...FOOTER_EXTRA_LINKS];
  return (
    <footer className="bg-[#0e0c09]">
      <div className="border-b border-white/10 px-5 py-14 text-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#c9a84c]">Reserve your stay</p>
        <h2 className="mt-4 font-serif text-3xl font-light text-white text-balance sm:text-4xl">Begin your Imperial experience</h2>
        <Link to="/stay#book" className={`${BTN.gold} mt-7`}>Book your stay</Link>
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <Crown className="h-5 w-5 text-[#c9a84c]" />
            <span className="font-serif text-sm uppercase tracking-[0.18em] text-white">The Imperial Palace</span>
          </div>
          <p className="mt-5 text-sm leading-7 text-white/70">A landmark of refined hospitality in the heart of Rajkot, Gujarat.</p>
        </div>
        <div>
          <h3 className="mb-5 text-[11px] uppercase tracking-[0.35em] text-[#c9a84c]">Explore</h3>
          <ul className="space-y-3">{explore.map((l) => <li key={l.to}><Link to={l.to} className={linkClass}>{l.label}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className="mb-5 text-[11px] uppercase tracking-[0.35em] text-[#c9a84c]">Guest services</h3>
          <ul className="space-y-3">
            <li><Link to="/stay#book" className={linkClass}>Check availability</Link></li>
            <li><Link to="/contact" className={linkClass}>Contact &amp; enquiries</Link></li>
            <li><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={linkClass}>Chat on WhatsApp</a></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-5 text-[11px] uppercase tracking-[0.35em] text-[#c9a84c]">Contact</h3>
          <address className="space-y-3 text-sm not-italic leading-6 text-white/70">
            <p>{info.addressLines.join(", ")}</p>
            <p><a href={info.phoneHref} className={linkClass}>{info.phone}</a></p>
            <p><a href={`mailto:${info.email}`} className={`${linkClass} break-all`}>{info.email}</a></p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs text-white/60 sm:flex-row sm:justify-between lg:px-3">
          <p>&copy; {new Date().getFullYear()} The Imperial Palace, Rajkot.</p>
          <p>Design proposal demonstration. Content and imagery are placeholders.</p>
        </div>
      </div>
    </footer>
  );
}
