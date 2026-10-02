import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageLayout from "../components/page-layout.tsx";
import BookingWidget from "../components/booking-widget.tsx";
import Img from "../components/img.tsx";
import { Reveal, SectionHeading } from "../components/hotel-page.tsx";
import { CONTACT_INFORMATION, GALLERY, HOTEL_IMAGES, RESTAURANTS, ROOMS } from "../lib/hotel-data.ts";
import { SITE } from "../lib/site-config.ts";
import { BTN } from "../lib/styles.ts";

const FACTS = [
  { value: "200+", label: "Rooms & suites" },
  { value: "4", label: "Dining venues" },
  { value: "8,000", label: "Sq.ft. ballroom" },
  { value: "24h", label: "Reception" },
];

const textLink = "inline-flex min-h-11 items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#6f5318] hover:gap-3 transition-all";

export default function Index() {
  const featured = ROOMS.filter((r) => r.featured);
  return (
    <PageLayout title="The Imperial Palace Rajkot | 5-Star Luxury Hotel in Gujarat" description={SITE.description}>
      <section className="relative flex min-h-[560px] items-end overflow-hidden bg-[#14110c] md:min-h-[88vh]">
        <Img src={HOTEL_IMAGES.lobby} alt="The grand lobby of The Imperial Palace, Rajkot" priority width={1600} height={1000} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#14110c]/55" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-28 lg:px-8 lg:pb-24">
          <p className="mb-5 text-[11px] uppercase tracking-[0.4em] text-[#c9a84c]">Rajkot, Gujarat</p>
          <h1 className="max-w-3xl font-serif text-5xl font-light leading-[1.02] text-white text-balance sm:text-6xl md:text-7xl">Where elegance meets <em className="italic text-[#e8d5a3]">Rajkot</em></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/85">An iconic address for refined stays, memorable celebrations and exceptional hospitality.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/stay#book" className={BTN.gold}>Book your stay</Link>
            <Link to="/tour" className={BTN.light}>Take the 360° tour</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-px max-w-7xl px-5 py-10 lg:px-8" aria-label="Check availability">
        <BookingWidget />
      </section>

      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <Reveal><SectionHeading eyebrow="Welcome" title="A landmark of unhurried luxury" /></Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-8 text-muted-foreground">In the heart of Rajkot, The Imperial Palace pairs palatial proportions with quietly attentive service. Rooms are calm, tables are generous, and every celebration is treated as a once-only occasion.</p>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
              {FACTS.map((f) => (<div key={f.label}><dd className="font-serif text-4xl font-light text-[#6f5318]">{f.value}</dd><dt className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{f.label}</dt></div>))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="bg-accent/40 px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Stay" title="Signature suites" description="From refined rooms to the Imperial Suite, each space is designed around comfort and privacy." /></Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((room, i) => (
              <Reveal key={room.slug} delay={i * 0.06}>
                <Link to={`/stay/${room.slug}`} className="group block">
                  <div className="aspect-[4/5] overflow-hidden"><Img src={room.images[0]} alt={`${room.name} at The Imperial Palace`} width={800} height={1000} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                  <h3 className="mt-4 font-serif text-2xl text-foreground">{room.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{room.size}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Link to="/stay" className={`${textLink} mt-8`}>All rooms and suites <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Dining" title="A table for every hour" /></Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {RESTAURANTS.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.05}>
                <Link to="/dining" className="group block">
                  <div className="aspect-[4/3] overflow-hidden"><Img src={r.image} alt={`${r.name}, ${r.category}`} width={800} height={600} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                  <h3 className="mt-4 font-serif text-2xl text-foreground">{r.name}</h3>
                  <p className="text-sm text-muted-foreground">{r.category}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#14110c]">
        <Img src={HOTEL_IMAGES.wedding} alt="A wedding celebration at The Imperial Palace" width={1600} height={900} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#14110c]/70" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28 lg:px-8">
          <SectionHeading eyebrow="Weddings & events" title="Celebrate your most memorable moments" description="Grand ballrooms, an open-air pool deck and a planning team that handles every detail." tone="dark" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/weddings" className={BTN.gold}>Plan your wedding</Link>
            <Link to="/events" className={BTN.light}>Explore venues</Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <Link to="/tour" className="group relative block aspect-[16/10] overflow-hidden" aria-label="Open the 360 degree tour demo">
            <Img src={HOTEL_IMAGES.ballroom} alt="Preview of the 360 degree tour of the Regent Room" width={1200} height={750} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute left-4 top-4 bg-[#14110c] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-[#c9a84c]">360° tour demo</span>
          </Link>
          <Reveal>
            <SectionHeading eyebrow="Virtual experience" title="Walk the palace before you arrive" description="Move between the lobby, suites, ballrooms and pool with an interactive panorama. Professional 360° photography can be integrated into this experience." />
            <Link to="/tour" className={BTN.gold}>Start the tour</Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-accent/40 px-5 py-16 md:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Gallery" title="A glimpse of the palace" /></Reveal>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[GALLERY[0], GALLERY[12], GALLERY[8], GALLERY[15]].map((g) => (
              <Img key={g.title} src={g.image} alt={g.title} width={600} height={750} className="aspect-[4/5] w-full object-cover" />
            ))}
          </div>
          <Link to="/gallery" className={`${textLink} mt-8`}>View full gallery <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="px-5 py-16 text-center md:py-24">
        <p className="text-[11px] uppercase tracking-[0.35em] text-[#6f5318]">Visit us</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl font-light text-foreground text-balance sm:text-5xl">{CONTACT_INFORMATION.addressLines.join(", ")}</h2>
        <Link to="/contact" className={`${BTN.outline} mt-8`}>Contact the hotel</Link>
      </section>
    </PageLayout>
  );
}
