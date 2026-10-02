import { useState } from "react";
import { Check, MapPin, Phone, Mail, MessageCircle, Plane, Train, Building2 } from "lucide-react";
import PageLayout from "../../components/page-layout.tsx";
import { PageHero, Reveal, SectionHeading } from "../../components/hotel-page.tsx";
import { HOTEL_IMAGES } from "../../lib/hotel-data.ts";

const SUBJECTS = ["Room reservation", "Dining reservation", "Wedding or event", "Wellness appointment", "General enquiry"];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <PageLayout>
      <PageHero eyebrow="We are here to help" title="A warm welcome begins here" image={HOTEL_IMAGES.lobby} subtitle="Whether you are planning a stay or simply have a question, our team would be pleased to hear from you." />
      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Get in touch" title="We would love to hear from you" /></Reveal>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <aside>
              <h2 className="font-serif text-2xl text-foreground">The Imperial Palace</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Dr. Yagnik Road<br />Rajkot 360001, Gujarat, India</p>
              <div className="mt-7 space-y-4">
                <a href="tel:+912812480000" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-[#9a7730]"><Phone className="h-4 w-4 text-[#9a7730]" />+91 281 248 0000</a>
                <a href="mailto:reservations@imperialpalace.in" className="flex items-center gap-3 break-all text-sm text-muted-foreground hover:text-[#9a7730]"><Mail className="h-4 w-4 text-[#9a7730]" />reservations@imperialpalace.in</a>
              </div>
              <a href="https://wa.me/912812480000" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 border border-[#c9a84c] px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-[#9a7730] transition-colors hover:bg-[#c9a84c] hover:text-[#1a1510]"><MessageCircle className="h-4 w-4" />Connect on WhatsApp</a>
              <div className="mt-10 grid grid-cols-3 gap-3">
                {[{ icon: Plane, title: "Airport", distance: "~8 km" }, { icon: Train, title: "Railway", distance: "~3 km" }, { icon: Building2, title: "City Centre", distance: "~1 km" }].map(({ icon: Icon, title, distance }) => (
                  <div key={title} className="border border-border p-3"><Icon className="h-4 w-4 text-[#9a7730]" /><p className="mt-3 text-xs text-foreground">{title}</p><p className="mt-1 text-xs text-muted-foreground">{distance}</p></div>
                ))}
              </div>
            </aside>
            <div className="border border-border p-6 md:p-8">
              {sent ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#c9a84c] text-[#1a1510]"><Check className="h-7 w-7" /></span>
                  <h3 className="font-serif text-3xl font-light text-foreground">Message received</h3>
                  <p className="mt-3 max-w-sm text-muted-foreground">Thank you for reaching out. Our team will be in touch shortly. This is a demo confirmation.</p>
                  <button onClick={() => setSent(false)} className="mt-7 border border-[#c9a84c] px-6 py-3 text-xs uppercase tracking-[0.2em] text-[#9a7730]">Send another message</button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-4 sm:grid-cols-2">
                  <h2 className="font-serif text-2xl text-foreground sm:col-span-2">Send an enquiry</h2>
                  <label className="grid gap-1.5 text-xs text-muted-foreground">Name<input required placeholder="John Smith" className="h-9 border border-input bg-transparent px-3 text-sm" /></label>
                  <label className="grid gap-1.5 text-xs text-muted-foreground">Email<input type="email" required placeholder="example@gmail.com" className="h-9 border border-input bg-transparent px-3 text-sm" /></label>
                  <label className="grid gap-1.5 text-xs text-muted-foreground">Phone<input type="tel" placeholder="+91 98765 43210" className="h-9 border border-input bg-transparent px-3 text-sm" /></label>
                  <label className="grid gap-1.5 text-xs text-muted-foreground">Subject<select className="h-9 border border-input bg-transparent px-3 text-sm">{SUBJECTS.map((s) => <option key={s}>{s}</option>)}</select></label>
                  <label className="grid gap-1.5 text-xs text-muted-foreground sm:col-span-2">Message<textarea rows={4} placeholder="How can we help you?" className="border border-input bg-transparent px-3 py-2 text-sm" /></label>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground sm:col-span-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-[#9a7730]" />
                    <span>Dr. Yagnik Road, Rajkot 360001, Gujarat, India</span>
                  </div>
                  <button type="submit" className="bg-[#c9a84c] px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1a1510] hover:bg-[#e1c574] sm:col-span-2">Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
