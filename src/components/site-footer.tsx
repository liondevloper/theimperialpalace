import { Link } from 'react-router-dom';
import { FacebookLogo, InstagramLogo, WhatsappLogo, XLogo } from '@phosphor-icons/react';
import { Navigation, Star } from 'lucide-react';
import { CONTACT_INFORMATION, FOOTER_EXTRA_LINKS, NAV_LINKS, RESTAURANTS, contactPhones, footerMaps, mapEmbedUrl } from '../lib/hotel-data.ts';
import { FAX, emailGroups } from '../lib/emails.ts';
import { WHATSAPP, whatsappUrl } from '../lib/site-config.ts';
import { Logo } from './site-header.tsx';
import { Reveal } from './hotel-page.tsx';
import PremiumMap from './premium-map.tsx';
import { instagramOf } from './instagram-icon.tsx';

const linkClass = 'text-sm text-muted-foreground transition-colors hover:text-primary';
// Emails must never wrap onto a second line. On phones they use a smaller size so two columns still fit.
const emailClass = 'block whitespace-nowrap text-[10px] tracking-tight text-muted-foreground transition-colors hover:text-primary sm:text-sm sm:tracking-normal';
const headingClass = 'mb-3 text-[11px] uppercase tracking-[0.35em] text-primary sm:mb-5';
// Round pill button in white with navy text, so it stands out from the gold-edged map above it.
const DIRECTIONS_CLASS = 'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-[#c9a84c] bg-white px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#0b1426] shadow-lg transition-colors hover:bg-[#ecd594]';
// The Google embed draws its own "open in Maps" card in the top-left corner. The iframe is made taller
// and shifted up inside a clipping box so that card is cut off, while the pin stays centred.
const GOOGLE_CROP = 90;

// Registered company address shown under the "The Imperial Palace" heading.
const FOOTER_ADDRESS_LINES = [
  'City Organisers Private Limited',
  'Dr. Yagnik Road, Rajkot 360001 INDIA',
];

// Official social pages of The Imperial Palace.
const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/imperialpalacerajkot',
  facebook: 'https://www.facebook.com/share/1CX45kWQCx/',
  x: 'https://x.com/imperial_rajkot',
} as const;

// Rounded corners; overflow-hidden clips the map to the same shape.
const FRAME_CLASS = 'relative overflow-hidden rounded-3xl border border-[#c9a84c]/40 shadow-[0_30px_60px_-35px_rgba(0,0,0,0.8)]';
const HEIGHT_CLASS = 'h-[220px] md:h-[340px]';

function DirectionsButton() {
  return (
    <a href={CONTACT_INFORMATION.mapsUrl} target="_blank" rel="noopener noreferrer" className={DIRECTIONS_CLASS}>
      <Navigation className="h-4 w-4" />Get directions
    </a>
  );
}

// Each map has its Get directions button underneath it, so the button never covers the map.
function MapWithButton({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <div className="mt-4 flex justify-center"><DirectionsButton /></div>
    </div>
  );
}

// Dark navy and gold map.
function PremiumMapCard() {
  return (
    <MapWithButton>
      <div className={FRAME_CLASS}>
        <PremiumMap className={`${HEIGHT_CLASS} w-full`} />
      </div>
    </MapWithButton>
  );
}

function GoogleMapCard() {
  return (
    <MapWithButton>
      <div className={`${FRAME_CLASS} ${HEIGHT_CLASS}`}>
        <iframe
          title="Google map of The Imperial Palace, Rajkot"
          src={mapEmbedUrl()}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute left-0 w-full border-0"
          style={{ top: -GOOGLE_CROP, height: `calc(100% + ${GOOGLE_CROP * 2}px)` }}
        />
      </div>
    </MapWithButton>
  );
}

// Admin > Contact details has one on/off switch per map. Google is the default; both can be on together.
function FooterMap() {
  const { premium, google } = footerMaps();
  return (
    <div className="relative mx-auto max-w-7xl px-5 pb-8 md:pb-12 lg:px-8">
      <div className={premium && google ? 'grid gap-6 md:grid-cols-2' : ''}>
        {google && <GoogleMapCard />}
        {premium && <PremiumMapCard />}
      </div>
    </div>
  );
}

// Original brand logos in their brand colours. X is black, so it flips to white in dark mode.
const iconBtn = 'flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white transition-transform hover:scale-110';

function InstagramLink({ href, label }: { href: string; label: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={iconBtn}><InstagramLogo weight="fill" className="h-5 w-5 text-[#E4405F]" /></a>;
}

// The Imperial Palace social pages, shown right under the fax number.
function HotelSocials() {
  return (
    <div className="mt-4 flex justify-center gap-2 sm:justify-start">
      <InstagramLink href={SOCIAL_LINKS.instagram} label="The Imperial Palace on Instagram" />
      <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="The Imperial Palace on Facebook" className={iconBtn}><FacebookLogo weight="fill" className="h-5 w-5 text-[#1877F2]" /></a>
      <a href={SOCIAL_LINKS.x} target="_blank" rel="noopener noreferrer" aria-label="The Imperial Palace on X" className={iconBtn}><XLogo weight="fill" className="h-5 w-5 text-black" /></a>
    </div>
  );
}

// Address, phones, fax, social icons and department emails. Each email stays on one line; emails sit in two columns.
function ContactBlock() {
  const groups = emailGroups();
  const phones = contactPhones();
  return (
    <div className="mb-8 border-b border-border pb-8 text-center sm:text-left md:mb-12 md:pb-10">
      <h3 className={headingClass}>The Imperial Palace</h3>
      <address className="grid gap-6 text-sm not-italic leading-6 text-muted-foreground sm:grid-cols-[auto_1fr] sm:gap-12">
        <div>
          <p>{FOOTER_ADDRESS_LINES.map((line) => <span key={line} className="block">{line}</span>)}</p>
          <p className="mt-2">
            {phones.map((p) => <a key={p.href} href={p.href} className={`${linkClass} block`}>{p.label}</a>)}
            <a href={FAX.href} className={`${linkClass} block`}>Fax: {FAX.label}</a>
          </p>
          <HotelSocials />
        </div>
        <div className="grid w-full grid-cols-[auto_auto] justify-between gap-x-3 gap-y-3 text-left sm:flex sm:w-auto sm:flex-wrap sm:justify-start sm:gap-x-10">
          {groups.map((group) => (
            <div key={group.label}>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-primary">{group.label}</span>
              {group.emails.map((email) => (
                <a key={email} href={`mailto:${email}`} className={emailClass}>{email}</a>
              ))}
            </div>
          ))}
        </div>
      </address>
    </div>
  );
}

// Delicacy Bakery: its WhatsApp number (with the WhatsApp logo) and Instagram logo.
function BakeryBlock() {
  const bakery = RESTAURANTS.find((r) => r.slug === 'delicacy');
  const bakeryInstagram = bakery ? instagramOf(bakery) : '';
  const whatsappLabel = `+${WHATSAPP.number.slice(0, 2)} ${WHATSAPP.number.slice(2)}`;
  return (
    <div className="relative mx-auto max-w-7xl border-t border-border px-5 py-8 text-center sm:text-left lg:px-8">
      <h3 className={headingClass}>Delicacy Bakery</h3>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
        <a href={whatsappUrl('Hello, I would like to know more about Delicacy Bakery.')} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
          <span className={iconBtn}><WhatsappLogo weight="fill" className="h-5 w-5 text-[#25D366]" /></span>{whatsappLabel}
        </a>
        {bakeryInstagram && <InstagramLink href={bakeryInstagram} label="Delicacy Bakery on Instagram" />}
      </div>
    </div>
  );
}

export default function SiteFooter() {
  const explore = [{ label: 'Rooms & suites', to: '/stay' }, ...NAV_LINKS.filter((l) => l.to !== '/stay' && l.to !== '/contact'), ...FOOTER_EXTRA_LINKS];
  return (
    <footer className="relative overflow-hidden border-t border-border bg-card">
      {/* White brand band so the logo shows in its true colours. */}
      <div className="theme-ivory relative border-b border-[#ece6d6] bg-white">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#b8933a] to-transparent" />
        <Reveal className="mx-auto flex max-w-7xl flex-col items-center px-5 py-6 text-center md:py-10 lg:px-8">
          <Link to="/" aria-label="The Imperial Palace, home" className="inline-block transition-transform duration-500 hover:scale-[1.03]">
            <Logo alt="The Imperial Palace" tone="light" className="h-16 md:h-28" />
          </Link>
          <div className="mt-3 flex gap-1.5 text-[#f5c518] drop-shadow-[0_1px_1px_rgba(180,130,0,0.35)]" aria-label="Five star hotel">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
          </div>
          <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.4em] text-[#1b2540]">Five Star Hotel</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#3a3f55]">Rajkot&apos;s 5-star landmark of refined hospitality in the heart of Gujarat. 20 years of excellence.</p>
        </Reveal>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-64 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <Reveal className="relative mx-auto max-w-7xl px-5 py-8 md:py-12 lg:px-8">
        {/* Contact details sit first, right under the logo band, above Explore. */}
        <ContactBlock />
        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-10">
          {/* Explore already lives in the menu on mobile, so it only shows on larger screens. */}
          <div className="hidden sm:block">
            <h3 className={headingClass}>Explore</h3>
            <ul className="space-y-3">{explore.map((l) => <li key={l.to}><Link to={l.to} className={linkClass}>{l.label}</Link></li>)}</ul>
          </div>
          <div className="text-center sm:text-left">
            <h3 className={headingClass}>Guest services</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link to="/contact" className={linkClass}>Contact & enquiries</Link></li>
              <li><Link to="/stay#book" className={linkClass}>Check availability</Link></li>
            </ul>
          </div>
        </div>
      </Reveal>
      <FooterMap />
      <BakeryBlock />
      <div className="relative flex flex-col items-center gap-2 border-t border-border px-5 py-4 text-xs text-muted-foreground md:py-6">
        <nav aria-label="Legal" className="flex gap-5">
          <Link to="/privacy-policy" className={linkClass}>Privacy Policy</Link>
          <Link to="/career" className={linkClass}>Career</Link>
        </nav>
        <p className="text-center">&copy; {new Date().getFullYear()} The Imperial Palace, City Organisers Private Limited. All rights reserved.</p>
      </div>
    </footer>
  );
}
