import { Link } from 'react-router-dom';
import { CONTACT_INFORMATION, FOOTER_EXTRA_LINKS, NAV_LINKS } from '../lib/hotel-data.ts';
import { Logo } from './site-header.tsx';
import { Reveal } from './hotel-page.tsx';

const linkClass = 'text-sm text-muted-foreground transition-colors hover:text-primary';
const headingClass = 'mb-5 text-[11px] uppercase tracking-[0.35em] text-primary';

// Registered company address shown in the footer.
const FOOTER_ADDRESS_LINES = [
  'City Organisers Private Limited',
  'Unit: The Imperial Palace',
  'Dr. Yagnik Road, Rajkot 360001 INDIA',
];

export default function SiteFooter() {
  const info = CONTACT_INFORMATION;
  // Read at render time so edits saved from the admin panel show up.
  const emailGroups = [
    { label: 'Reservations', emails: info.reservationEmails },
    { label: 'Mail', emails: info.mailEmails },
  ].filter((g) => g.emails.length > 0);
  const explore = [{ label: 'Rooms & suites', to: '/stay' }, ...NAV_LINKS.filter((l) => l.to !== '/stay' && l.to !== '/contact'), ...FOOTER_EXTRA_LINKS];
  return (
    <footer className="relative overflow-hidden border-t border-border bg-card">
      {/* Centred brand block on light ivory so the logo shows in its true colours */}
      <div className="theme-ivory border-b-2 border-[#d4b46a] bg-[#f8f2e4] px-5 py-12 text-foreground">
        <Reveal className="mx-auto flex max-w-7xl flex-col items-center text-center">
          <Link to="/" aria-label="The Imperial Palace, home" className="inline-block transition-transform duration-500 hover:scale-[1.03]">
            <Logo alt="The Imperial Palace" tone="light" className="h-24 md:h-28" />
          </Link>
          <span className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#b8933a] to-transparent" />
          <p className="mt-5 max-w-md text-sm leading-7 text-[#5a4a32]">A landmark of refined hospitality in the heart of Rajkot, Gujarat. 20 years of excellence.</p>
        </Reveal>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-[40%] h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
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
              <p><a href={info.phoneHref} className={linkClass}>{info.phone}</a></p>
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
      <div className="relative border-t border-border px-5 py-6">
        <p className="mx-auto max-w-7xl text-center text-xs text-muted-foreground">&copy; {new Date().getFullYear()} City Organisers Private Limited. All rights reserved.</p>
      </div>
    </footer>
  );
}
