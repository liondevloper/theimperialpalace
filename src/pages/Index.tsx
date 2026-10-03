import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import PageLayout from "../components/page-layout.tsx";
import Img from "../components/img.tsx";
import { HeroText, Reveal, SectionHeading } from "../components/hotel-page.tsx";
import { CONTACT_INFORMATION, GALLERY, HOTEL_IMAGES, RESTAURANTS, ROOMS } from "../lib/hotel-data.ts";
import { SITE } from "../lib/site-config.ts";
import { BTN } from "../lib/styles.ts";

const EASE = [0.22, 1, 0.36, 1] as const;

const FACTS = [
  { value: "200+", label: "Rooms & suites" },
  { value: "4", label: "Dining venues" },
  { value: "8,000", label: "Sq.ft. ballroom" },
  { value: "24h", label: "Reception" },
];

const textLink = "group inline-flex min-h-11 items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#7a5c1c] transition-all hover:gap-4";
const imageCard = "overflow-hidden shadow-[0_20px_50px_-25px_rgba(90,70,30,0.45)] ring-1 ring-[#e6d9b8]";
const zoom = "h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110";

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return (
    <section ref={ref} className="relative flex min-h-[600px] items-end overflow-hidden bg-[#2a2218] md:min-h-[92vh]">
      <motion.div style={{ y }} initial={{ scale: 1.18 }} animate={{ scale: 1.04 }} transition={{ duration: 2.8, ease: EASE }} className="absolute inset-0">
        <Img src={HOTEL_IMAGES.lobby} alt="The grand lobby of The Imperial Palace, Rajkot" priority width={1600} height={1000} className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e1810]/90 via-[#1e1810]/35 to-transparent" />
      <motion.div style={{ opacity: fade }} className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-28 lg:px-8 lg:pb-28">
        <HeroText eyebrow="Rajkot, Gujarat" title={<>Where elegance meets <em className="italic text-[#f1e2b8]">Rajkot</em></>} subtitle="An iconic address for refined stays, memorable celebrations and exceptional hospitality.">
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/stay#book" className={BTN.gold}>Book your stay</Link>
            <Link to="/tour" className={BTN.light}>Take the 360° tour</Link>
          </div>
        </HeroText>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <motion.span animate={{ y: [0, 10, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} className="block h-12 w-px bg-gradient-to-b from-[#e8d5a3] to-transparent" />
      </motion.div>
    </section>
  );
}

export default function Index() {
  const featured = ROOMS.filter((r) => r.featured);
  return (
    <PageLayout title="The Imperial Palace Rajkot | 5-Star Luxury Hotel in Gujarat" description={SITE.description}>
      <Hero />

      <section className="px-5 py-20 md:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <Reveal><SectionHeading eyebrow="Welcome" title="A landmark of unhurried luxury" /></Reveal>
          <Reveal delay={0.15}>
            <p className="text-base leading-8 text-muted-foreground">In the heart of Rajkot, The Imperial Palace pairs palatial proportions with quietly attentive service. Rooms are calm, tables are generous, and every celebration is treated as a once-only occasion.</p>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
              {FACTS.map((f, i) => (
                <Reveal key={f.label} delay={0.2 + i * 0.1}>
                  <dd className="bg-gradient-to-br from-[#8a6a22] to-[#c9a84c] bg-clip-text font-serif text-4xl font-light text-transparent">{f.value}</dd>
                  <dt className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{f.label}</dt>
                </Reveal>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#f6efe0] to-background px-5 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Stay" title="Signature suites" description="From refined rooms to the Imperial Suite, each space is designed around comfort and privacy." /></Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {featured.map((room, i) => (
              <Reveal key={room.slug} delay={i * 0.12}>
                <Link to={`/stay/${room.slug}`} className="group block transition-transform duration-700 hover:-translate-y-2">
                  <div className={`aspect-[4/5] ${imageCard}`}><Img src={room.images[0]} alt={`${room.name} at The Imperial Palace`} width={800} height={1000} className={zoom} /></div>
                  <h3 className="mt-5 font-serif text-2xl text-foreground transition-colors group-hover:text-[#8a6a22]">{room.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{room.size}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Link to="/stay" className={`${textLink} mt-10`}>All rooms and suites <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="px-5 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Dining" title="A table for every hour" /></Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {RESTAURANTS.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.1}>
                <Link to="/dining" className="group block transition-transform duration-700 hover:-translate-y-2">
                  <div className={`aspect-[4/3] ${imageCard}`}><Img src={r.image} alt={`${r.name}, ${r.category}`} width={800} height={600} className={zoom} /></div>
                  <h3 className="mt-5 font-serif text-2xl text-foreground transition-colors group-hover:text-[#8a6a22]">{r.name}</h3>
                  <p className="text-sm text-muted-foreground">{r.category}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#2a2218]">
        <Img src={HOTEL_IMAGES.wedding} alt="A wedding celebration at The Imperial Palace" width={1600} height={900} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e1810]/85 via-[#1e1810]/55 to-[#1e1810]/20" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 md:py-32 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Weddings & events" title="Celebrate your most memorable moments" description="Grand ballrooms, an open-air pool deck and a planning team that handles every detail." tone="dark" />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/weddings" className={BTN.gold}>Plan your wedding</Link>
              <Link to="/events" className={BTN.light}>Explore venues</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-20 md:py-28 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Link to="/tour" className={`group relative block aspect-[16/10] ${imageCard}`} aria-label="Open the 360 degree tour demo">
              <Img src={HOTEL_IMAGES.ballroom} alt="Preview of the 360 degree tour of the Regent Room" width={1200} height={750} className={zoom} />
              <span className="absolute left-4 top-4 bg-white/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-[#7a5c1c] backdrop-blur">360° tour demo</span>
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <SectionHeading eyebrow="Virtual experience" title="Walk the palace before you arrive" description="Move between the lobby, suites, ballrooms and pool with an interactive panorama. Professional 360° photography can be integrated into this experience." />
            <Link to="/tour" className={BTN.gold}>Start the tour</Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-gradient-to-b from-background to-[#f6efe0] px-5 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Gallery" title="A glimpse of the palace" /></Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[GALLERY[0], GALLERY[12], GALLERY[8], GALLERY[15]].map((g, i) => (
              <Reveal key={g.title} delay={i * 0.1} className={`group aspect-[4/5] ${imageCard} ${i % 2 ? "md:translate-y-8" : ""}`}>
                <Img src={g.image} alt={g.title} width={600} height={750} className={zoom} />
              </Reveal>
            ))}
          </div>
          <Link to="/gallery" className={`${textLink} mt-14`}>View full gallery <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="bg-[#f6efe0] px-5 py-20 text-center md:py-28">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.35em] text-[#8a6a22]">Visit us</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl font-light text-foreground text-balance sm:text-5xl">{CONTACT_INFORMATION.addressLines.join(", ")}</h2>
          <Link to="/contact" className={`${BTN.outline} mt-10`}>Contact the hotel</Link>
        </Reveal>
      </section>
    </PageLayout>
  );
}
