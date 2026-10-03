import { Link } from 'react-router-dom';
import { CONTACT_INFORMATION, FOOTER_EXTRA_LINKS, NAV_LINKS } from '../lib/hotel-data.ts';
import { Logo } from './site-header.tsx';
import { Reveal } from './hotel-page.tsx';

const linkClass = 'text-sm text-[#5a4a35] transition-colors hover:text-[#8a6a22]';
const headingClass = 'mb-5 text-[11px] uppercase tracking-[0.35em] text-[#8a6a22]';

// Registered company address shown in the footer.
const FOOTER_ADDRESS_LINES = [
  'City Organisers Private Limited',
  'Unit: The Imperial Palace',
  'Dr. Yagnik Road, Rajkot 360001 INDIA',
];

// Labelled email groups shown in the footer contact column.
const FOOTER_EMAILS = [
  { label: 'Reservations', emails: [CONTACT_INFORMATION.email, 'crs@imperialpalace.in'] },
  { label: 'Mail', emails: ['mail@imperialpalace.in'] },
];

export default function SiteFooter() {
  const info = CONTACT_INFORMATION;
  const explore = [{ label: 'Rooms & suites', to: '/stay' }, ...NAV_LINKS.filter((l) => l.to !== '/stay' && l.to !== '/contact'), ...FOOTER_EXTRA_LINKS];
  return (
    <footer className="relative border-t border-[#e6d9b8] bg-gradient-to-b from-[#f6efe0] to-[#efe4cc]">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
      <Reveal className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" aria-label="The Imperial Palace, home" className="inline-block">
            <Logo alt="The Imperial Palace" className="h-24 md:h-28" />
          </Link>
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
          </ul>
        </div>
        <div>
          <h3 className={headingClass}>Contact</h3>
          <address className="space-y-3 text-sm not-italic leading-6 text-[#5a4a35]">
            <p>
              {FOOTER_ADDRESS_LINES.map((line, i) => (
                <span key={line} className={i === 0 ? 'block font-medium text-[#3a3024]' : 'block'}>{line}</span>
              ))}
            </p>
            <p><a href={info.phoneHref} className={linkClass}>{info.phone}</a></p>
            {FOOTER_EMAILS.map((group) => (
              <div key={group.label}>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-[#8a6a22]">{group.label}</span>
                {group.emails.map((email) => (
                  <a key={email} href={`mailto:${email}`} className={`${linkClass} block break-all`}>{email}</a>
                ))}
              </div>
            ))}
          </address>
        </div>
      </Reveal>
      <div className="border-t border-[#e0d0a8] px-5 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs text-[#6b5a42] sm:flex-row sm:justify-between lg:px-3">
          <p>&copy; {new Date().getFullYear()} City Organisers Private Limited. All rights reserved.</p>
          <p>Website by <a href="https://theimperialpalace.biz" className="underline hover:text-[#8a6a22]">theimperialpalace.biz</a></p>
        </div>
      </div>
    </footer>
  );
}
