import { Link } from 'react-router-dom';
import { MapPin, Navigation, Star } from 'lucide-react';
import { CONTACT_INFORMATION, FOOTER_EXTRA_LINKS, NAV_LINKS, contactPhones, mailEmailList, mapEmbedUrl, reservationEmailList } from '../lib/hotel-data.ts';
import { Logo } from './site-header.tsx';
import { Reveal } from './hotel-page.tsx';
import PremiumMap from './premium-map.tsx';

const linkClass = 'text-sm text-muted-foreground transition-colors hover:text-primary';
const headingClass = 'mb-5 text-[11px] uppercase tracking-[0.35em] text-primary';
const DIRECTIONS_CLASS = 'inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 bg-gradient-to-r from-[#b8933a] to-[#ecd594] px-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[#0b1426] shadow-lg transition-opacity hover:opacity-90';
// The Google embed draws its own "open in Maps" card in the top-left corner. The iframe is made taller
// and shifted up inside a clipping box so that card is cut off, while the pin stays centred.
const GOOGLE_CROP = 90;

type MapStyle = 'premium' | 'google' | 'both';

// Admin > Contact details > "Map style" decides which map(s) visitors see. Premium is the default.
function mapStyle(): MapStyle {
  const value = Reflect.get(CONTACT_INFORMATION, 'mapStyle');
  if (value === 'Google map') return 'google';
  if (value === 'Both maps') return 'both';
  return 'premium';
}

// Registered company address shown in the footer. The hotel name comes first.
const FOOTER_ADDRESS_LINES = [
  'The Imperial Palace',
  'City Organisers Private Limited',
  'Dr. Yagnik Road, Rajkot 360001 INDIA',
];

const FRAME_CLASS = 'relative overflow-hidden border border-[#c9a84c]/40 shadow-[0_30px_60px_-35px_rgba(0,0,0,0.8)]';
const HEIGHT_CLASS = 'h-[280px] md:h-[340px]';

function DirectionsButton() {
  return (
    <a href={CONTACT_INFORMATION.mapsUrl} target="_blank" rel="noopener noreferrer" className={DIRECTIONS_CLASS}>
      <Navigation className="h-4 w-4" />Get directions
    </a>
  );
}

// Dark navy and gold map with the hotel address and a directions button floating on top.
function PremiumMapCard() {
  const info = CONTACT_INFORMATION;
  return (
    <div className={FRAME_CLASS}>
      <PremiumMap className={`${HEIGHT_CLASS} w-full`}>
        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-3 border border-[#c9a84c]/40 bg-[#0b1426]/90 p-4 shadow-lg backdrop-blur sm:right-auto sm:max-w-sm">
          <div className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#b8933a] to-[#ecd594] text-[#0b1426]"><MapPin className="h-5 w-5" /></span>
            <div className="min-w-0">
              <p className="font-serif text-lg leading-tight text-[#e8d5a3]">{info.name}</p>
              <p className="mt-0.5 text-xs leading-5 text-white/75">{info.addressLines.join(', ')}</p>
            </div>
          </div>
          <DirectionsButton />
        </div>
      </PremiumMap>
    </div>
  );
}

function GoogleMapCard() {
  return (
    <div className={`${FRAME_CLASS} ${HEIGHT_CLASS}`}>
      <iframe
        title="Google map of The Imperial Palace, Rajkot"
        src={mapEmbedUrl()}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute left-0 w-full border-0"
        style={{ top: -GOOGLE_CROP, height: `calc(100% + ${GOOGLE_CROP * 2}px)` }}
      />
      <div className="absolute right-3 top-3"><DirectionsButton /></div>
    </div>
  );
}

function FooterMap() {
  const style = mapStyle();
  return (
    <div className="relative mx-auto max-w-7xl px-5 pb-12 lg:px-8">
      <div className={style === 'both' ? 'grid gap-6 md:grid-cols-2' : ''}>
        {style !== 'google' && <PremiumMapCard />}
        {style !== 'premium' && <GoogleMapCard />}
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
