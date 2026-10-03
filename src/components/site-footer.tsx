import { Link } from 'react-router-dom';
import { MapPin, Navigation, Star } from 'lucide-react';
import { CONTACT_INFORMATION, FOOTER_EXTRA_LINKS, NAV_LINKS, contactPhones, mailEmailList, mapEmbedUrl, reservationEmailList } from '../lib/hotel-data.ts';
import { Logo } from './site-header.tsx';
import { Reveal } from './hotel-page.tsx';

const linkClass = 'text-sm text-muted-foreground transition-colors hover:text-primary';
const headingClass = 'mb-5 text-[11px] uppercase tracking-[0.35em] text-primary';

// Registered company address shown in the footer. The hotel name comes first.
const FOOTER_ADDRESS_LINES = [
  'The Imperial Palace',
  'City Organisers Private Limited',
  'Dr. Yagnik Road, Rajkot 360001 INDIA',
];

// Premium map card: a muted, gold-tinted Google map with a floating "Get directions" pill.
function FooterMap() {
  const info = CONTACT_INFORMATION;
  return (
    <div className="relative mx-auto max-w-7xl px-5 pb-12 lg:px-8">
      <div className="group relative overflow-hidden border border-[#e6d9b8] bg-white shadow-[0_30px_60px_-35px_rgba(90,70,30,0.6)]">
        <iframe
          title="The Imperial Palace on Google Maps"
          src={mapEmbedUrl()}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[260px] w-full border-0 grayscale-[0.85] sepia-[0.25] transition-[filter] duration-700 group-hover:grayscale-0 group-hover:sepia-0 md:h-[320px]"
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#c9a84c]/30" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 border border-[#e6d9b8] bg-white/95 p-4 shadow-lg backdrop-blur sm:right-auto sm:max-w-sm">
          <div className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b1426] text-[#f5c518]"><MapPin className="h-5 w-5" /></span>
            <div className="min-w-0">
              <p className="font-serif text-lg leading-tight text-[#1b2540]">{info.name}</p>
              <p className="mt-0.5 text-xs leading-5 text-[#3a3f55]">{info.addressLines.join(', ')}</p>
            </div>
          </div>
          <a href={info.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 bg-gradient-to-r from-[#b8933a] to-[#d9bc6a] px-5 text-[11px] font-medium uppercase tracking-[0.25em] text-[#0b1426] transition-transform hover:scale-[1.02]">
            <Navigation className="h-4 w-4" />Get directions
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SiteFooter() {
  // Read at render time so edits saved from the admin panel show up.
  const emailGroups = [
    { label: 'Reservations', emails: reservationEmailList() },
    { label: 'Mail', emails: mailEmailList() },
  ].filter((g) => g.emails.length > 0);
  const phones = contactPhones();
  const explore = [{ label: 'Rooms & suites', to: '/stay' }, ...NAV_LINKS.filter((l) => l.to !== '/stay' && l.to !== '/contact'), ...FOOTER_EXTRA_LINKS];
  return (
    <footer className="relative overflow-hidden border-t border-border bg-card">
      {/* White brand band so the logo shows in its true colours. */}
      <div className="theme-ivory relative border-b border-[#ece6d6] bg-white">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#b8933a] to-transparent" />
        <Reveal className="mx-auto flex max-w-7xl flex-col items-center px-5 py-10 text-center lg:px-8">
          <Link to="/" aria-label="The Imperial Palace, home" className="inline-block transition-transform duration-500 hover:scale-[1.03]">
            <Logo alt="The Imperial Palace" tone="light" className="h-24 md:h-28" />
          </Link>
          <div className="mt-4 flex gap-1.5 text-[#f5c518] drop-shadow-[0_1px_1px_rgba(180,130,0,0.35)]" aria-label="Five star hotel">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
          </div>
          <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.4em] text-[#1b2540]">Five Star Hotel</p>
          <span className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#b8933a] to-transparent" />
          <p className="mt-4 max-w-md text-sm leading-7 text-[#3a3f55]">Rajkot&apos;s 5-star landmark of refined hospitality in the heart of Gujarat. 20 years of excellence.</p>
        </Reveal>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-64 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <Reveal className="relative mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-10 text-center sm:grid-cols-3 sm:text-left">
          <div>
            <h3 className={headingClass}>Explore</h3>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-1">{explore.map((l) => <li key={l.to}><Link to={l.to} className={linkClass}>{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h3 className={headingClass}>Guest services</h3>
            <ul className="space-y-3">
              <li><Link to="/contact" className={linkClass}>Contact & enquiries</Link></li>
              <li><Link to="/stay#book" className={linkClass}>Check availability</Link></li>
            </ul>
          </div>
          <div>
            <h3 className={headingClass}>Contact</h3>
            <address className="space-y-3 text-sm not-italic leading-6 text-muted-foreground">
              <p>
                {FOOTER_ADDRESS_LINES.map((line, i) => (
                  <span key={line} className={i === 0 ? 'block font-medium text-foreground' : 'block'}>{line}</span>
                ))}
              </p>
              <p>{phones.map((p) => <a key={p.href} href={p.href} className={`${linkClass} block`}>{p.label}</a>)}</p>
              {emailGroups.map((group) => (
                <div key={group.label}>
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-primary">{group.label}</span>
                  {group.emails.map((email) => (
                    <a key={email} href={`mailto:${email}`} className={`${linkClass} block break-all`}>{email}</a>
                  ))}
                </div>
              ))}
            </address>
          </div>
        </div>
      </Reveal>
      <FooterMap />
      <div className="relative border-t border-border px-5 py-6">
        <p className="mx-auto max-w-7xl text-center text-xs text-muted-foreground">&copy; {new Date().getFullYear()} The Imperial Palace, City Organisers Private Limited. All rights reserved.</p>
      </div>
    </footer>
  );
}
