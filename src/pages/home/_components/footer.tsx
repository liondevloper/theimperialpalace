import { Crown } from "lucide-react";

const NAV = {
  Explore: [
    { label: "Rooms & Suites", href: "#rooms" }, { label: "Dining", href: "#dining" },
    { label: "Weddings", href: "#weddings" }, { label: "Events & Banquets", href: "#events" },
    { label: "Wellness", href: "#wellness" }, { label: "360\u00b0 Tour", href: "#tour" },
    { label: "Gallery", href: "#gallery" },
  ],
  Services: [
    { label: "Concierge", href: "#contact" }, { label: "Airport Transfer", href: "#contact" },
    { label: "In-Room Dining", href: "#dining" }, { label: "Business Centre", href: "#events" },
    { label: "Wedding Planning", href: "#weddings" }, { label: "Spa Appointments", href: "#wellness" },
  ],
};

export default function Footer() {
  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0e0c09] border-t border-white/5">
      <div className="border-b border-white/5 py-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="font-serif text-white/50 text-sm tracking-[0.2em] uppercase mb-4">Reserve Your Stay</div>
          <h3 className="font-serif font-light text-white text-4xl mb-6">Begin Your Imperial Experience</h3>
          <button onClick={() => handleNav("#rooms")} className="px-12 py-4 bg-[#c9a84c] text-[#1a1510] text-[11px] tracking-[0.28em] uppercase font-sans font-medium hover:bg-[#e8d5a3] transition-all duration-300 cursor-pointer">
            Book Your Stay
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-6">
              <Crown className="w-5 h-5 text-[#c9a84c]" />
              <div>
                <div className="font-serif text-sm font-semibold tracking-[0.18em] text-white uppercase">The Imperial Palace</div>
                <div className="text-[9px] tracking-[0.35em] text-[#c9a84c] uppercase mt-0.5">Rajkot</div>
              </div>
            </div>
            <p className="text-white/40 text-sm font-sans leading-7 mb-8">An icon of luxury and refinement in the heart of Rajkot, Gujarat. Delivering world-class hospitality since our founding.</p>
            <div className="flex gap-3">
              {[{ label: "Facebook", symbol: "f" }, { label: "Instagram", symbol: "in" }, { label: "X", symbol: "x" }, { label: "YouTube", symbol: "yt" }].map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-all duration-300 text-xs font-sans font-medium cursor-pointer">{s.symbol}</a>
              ))}
            </div>
          </div>
          {Object.entries(NAV).map(([title, items]) => (
            <div key={title}>
              <div className="text-[9px] tracking-[0.4em] uppercase text-[#c9a84c] font-sans mb-6">{title}</div>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}><button onClick={() => handleNav(item.href)} className="text-white/40 text-sm font-sans hover:text-white/80 transition-colors duration-200 cursor-pointer text-left">{item.label}</button></li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <div className="text-[9px] tracking-[0.4em] uppercase text-[#c9a84c] font-sans mb-6">Contact</div>
            <div className="space-y-4 text-white/40 text-sm font-sans leading-6">
              <div>Dr. Yagnik Road<br />Rajkot 360001<br />Gujarat, India</div>
              <div><a href="tel:+912812480000" className="hover:text-white/70 transition-colors">+91 281 248 0000</a></div>
              <div><a href="mailto:reservations@imperialpalace.in" className="hover:text-white/70 transition-colors">reservations@imperialpalace.in</a></div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white/25 text-[10px] font-sans tracking-wide">&copy; {new Date().getFullYear()} The Imperial Palace, Rajkot. All rights reserved.</div>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map((link) => (
              <button key={link} className="text-white/25 text-[10px] font-sans hover:text-white/50 transition-colors cursor-pointer">{link}</button>
            ))}
          </div>
          <div className="text-white/15 text-[9px] font-sans tracking-wide">Demo Presentation</div>
        </div>
      </div>
    </footer>
  );
}
