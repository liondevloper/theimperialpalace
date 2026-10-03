import { Link } from 'react-router-dom';
import { CONTACT_INFORMATION, FOOTER_EXTRA_LINKS, NAV_LINKS } from '../lib/hotel-data.ts';
import { whatsappUrl } from '../lib/site-config.ts';
import { LOGO_URL } from '../lib/logo.ts';
import { Reveal } from './hotel-page.tsx';

const linkClass = 'text-sm text-[#5a4a35] transition-colors hover:text-[#8a6a22]';
const headingClass = 'mb-5 text-[11px] uppercase tracking-[0.35em] text-[#8a6a22]';

export default function SiteFooter() {
  const info = CONTACT_INFORMATION;
  const explore = [{ label: 'Rooms & suites', to: '/stay' }, ...NAV_LINKS.filter((l) => l.to !== '/stay' && l.to !== '/contact'), ...FOOTER_EXTRA_LINKS];
  return (
    <footer className="relative border-t border-[#e6d9b8] bg-gradient-to-b from-[#f6efe0] to-[#efe4cc]">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
      <Reveal className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <span className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_8px_24px_-10px_rgba(138,106,34,0.5)] ring-1 ring-[#c9a84c]/60">
            <img src={LOGO_URL} alt="The Imperial Palace" className="h-full w-full scale-110 object-contain" />
          </span>
          <p className="mt-5 text-sm leading-7 text-[#5a4a35]">A landmark of refined hospitality in the heart of Rajkot, Gujarat. 20 years of excellence.</p>
        </div>
        <div>
          <h3 className={headingClass}>Explore</h3>
          <ul className="space-y-3">{explore.map((l) => <li key={l.to}><Link to={l.to} className={linkClass}>{l.label}</Link></li>)}</ul>
        </div>
        <div>
          <h3 className={headingClass}>Guest services</h3>
          <ul className="space-y-3">
            <li><Link to="/contact" className={linkClass}>Contact & enquiries</Link></li>
            <li><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={linkClass}>Chat on WhatsApp</a></li>
          </ul>
        </div>
        <div>
          <h3 className={headingClass}>Contact</h3>
          <address className="space-y-3 text-sm not-italic leading-6 text-[#5a4a35]">
            <p>{info.addressLines.join(', ')}</p>
            <p><a href={info.phoneHref} className={linkClass}>{info.phone}</a></p>
            <p><a href={`mailto:${info.email}`} className={`${linkClass} break-all`}>{info.email}</a></p>
          </address>
        </div>
      </Reveal>
      <div className="border-t border-[#e0d0a8] px-5 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs text-[#6b5a42] sm:flex-row sm:justify-between lg:px-3">
          <p>&copy; {new Date().getFullYear()} The Imperial Palace, Rajkot. Dr. Yagnik Rd, Jagnath Plot, Rajkot 360001.</p>
          <p>Website by <a href="https://theimperialpalace.biz" className="underline hover:text-[#8a6a22]">theimperialpalace.biz</a></p>
        </div>
      </div>
    </footer>
  );
}
