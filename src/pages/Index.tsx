import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarHeart, Clock, MessageSquareText, Phone, Quote, Sparkles } from "lucide-react";
import { animate, motion, useInView, useMotionValue, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import PageLayout from "../components/page-layout.tsx";
import Img from "../components/img.tsx";
import { HeroText, Reveal, SectionHeading } from "../components/hotel-page.tsx";
import { EnquiryButton } from "../components/enquiry-modal.tsx";
import { BookStayButton } from "../components/book-stay-modal.tsx";
import { CONTACT_INFORMATION, EXPERIENCES, GALLERY, HOME, HOTEL_IMAGES, RESTAURANTS, ROOMS } from "../lib/hotel-data.ts";
import { introDelay } from "../lib/intro.ts";
import { SITE } from "../lib/site-config.ts";
import { BTN } from "../lib/styles.ts";

const EASE = [0.22, 1, 0.36, 1] as const;

// Compact vertical rhythm for every home section.
const SECTION = "px-5 py-14 md:py-20 lg:px-8";
const textLink = "group inline-flex min-h-11 items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-primary transition-all hover:gap-4";
const imageCard = "overflow-hidden bg-card shadow-[0_24px_50px_-28px_rgba(6,12,26,0.9)] ring-1 ring-border";
const zoom = "h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110";

const ENQUIRY_PERKS = [
  { icon: Clock, title: "Reply within hours", text: "Our reservations desk answers every message personally." },
  { icon: CalendarHeart, title: "Weddings & events", text: "Get a tailored proposal for venues, décor and menus." },
  { icon: Sparkles, title: "Best direct rates", text: "Exclusive offers when you enquire with us directly." },
];

// "200+ | Rooms & suites" -> { value, label }
const parseFact = (line: string) => {
  const [value = "", label = ""] = line.split("|").map((s) => s.trim());
  return { value, label };
};

// Counts up the numeric part of a value (e.g. "8,000" or "200+") when scrolled into view.
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const match = value.match(/[\d,]+/);
  const target = match ? Number(match[0].replace(/,/g, "")) : 0;
  const mv = useMotionValue(0);
  useEffect(() => {
    if (!inView || !match || !ref.current) return;
    const el = ref.current;
    const controls = animate(mv, target, {
      duration: 2,
      ease: EASE,
      onUpdate: (v) => { el.textContent = value.replace(match[0], Math.round(v).toLocaleString("en-IN")); },
    });
    return () => controls.stop();
  }, [inView, match, mv, target, value]);
  return <span ref={ref}>{value}</span>;
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const delay = introDelay();
  // Hero photo is optional: it is added from the admin panel (Home > Hero image).
  const heroImage = HOME.heroImage.trim();
  return (
    <section ref={ref} className="relative flex min-h-[600px] items-end overflow-hidden bg-[#0b1426] md:min-h-[92vh]">
      {heroImage ? (
        <>
          <motion.div style={{ y }} initial={{ scale: 1.2 }} animate={{ scale: 1.04 }} transition={{ duration: 3, delay, ease: EASE }} className="absolute inset-0">
            <Img src={heroImage} alt="The Imperial Palace, Rajkot" priority width={1920} height={1080} sizes="100vw" className="h-full w-full object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1426] via-[#0b1426]/45 to-[#0b1426]/20" />
        </>
      ) : (
        // No photo yet: royal navy backdrop with soft gold glow.
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(201,168,76,0.22),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(201,168,76,0.12),transparent_50%),linear-gradient(180deg,#152245_0%,#0b1426_100%)]" />
      )}
      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-28 lg:px-8 lg:pb-24">
        <HeroText delay={delay} eyebrow={HOME.heroEyebrow} title={<>{HOME.heroTitle} <em className="bg-gradient-to-r from-[#f1e2b8] via-[#d9bc6a] to-[#f1e2b8] bg-clip-text italic text-transparent">{HOME.heroHighlight}</em></>} subtitle={HOME.heroSubtitle}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookStayButton className={BTN.gold}>Book your stay</BookStayButton>
            <EnquiryButton className={BTN.light}><MessageSquareText className="h-4 w-4" />Send an enquiry</EnquiryButton>
          </div>
        </HeroText>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 1.6, duration: 1 }} className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#e8d5a3]/80">Scroll</span>
        <motion.span animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} className="block h-12 w-px bg-gradient-to-b from-[#e8d5a3] to-transparent" />
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = [...HOME.marquee, ...HOME.marquee];
  return (
    <div className="overflow-hidden border-y border-border bg-card py-4">
      <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex w-max gap-12">
        {items.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-12 whitespace-nowrap font-serif text-2xl italic text-[#e8d5a3] md:text-3xl">
            {t}<span className="text-sm not-italic text-[#b8933a]">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function ParallaxImage({ src, alt, progress }: { src: string; alt: string; progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], ["-12%", "12%"]);
  return (
    <motion.div style={{ y }} className="absolute inset-[-12%_0]">
      <Img src={src} alt={alt} width={1920} height={1200} sizes="100vw" className="h-full w-full object-cover" />
    </motion.div>
  );
}

function WeddingBand() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0b1426]">
      <ParallaxImage src={HOTEL_IMAGES.wedding} alt="A wedding celebration at The Imperial Palace" progress={scrollYProgress} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1426]/90 via-[#0b1426]/60 to-[#0b1426]/10" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Weddings & events" title="Celebrate your most memorable moments" description="Grand ballrooms, an open-air pool deck and a planning team that handles every detail." tone="dark" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/weddings" className={BTN.gold}>Plan your wedding</Link>
            <Link to="/events" className={BTN.light}>Explore venues</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Visible, premium enquiry block on the home page that opens the enquiry pop-up.
function EnquiryBand() {
  return (
    <section className="relative overflow-hidden bg-card px-5 py-16 md:py-24 lg:px-8">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#b8933a]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#d9bc6a]/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow="Enquire" title="Tell us what you are planning" description="A stay, a wedding, a corporate gala or a family dinner. Send us a note and our team will take care of the rest." />
          <ul className="space-y-4">
            {ENQUIRY_PERKS.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={0.1 + i * 0.1}>
                <li className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/50 text-primary"><Icon className="h-5 w-5" /></span>
                  <div>
                    <p className="font-serif text-xl text-foreground">{title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <EnquiryButton className={BTN.gold}><MessageSquareText className="h-4 w-4" />Send an enquiry</EnquiryButton>
            <a href={CONTACT_INFORMATION.phoneHref} className={BTN.outline}><Phone className="h-4 w-4" />{CONTACT_INFORMATION.phone}</a>
          </div>
        </Reveal>
        <Reveal delay={0.2} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden ring-1 ring-primary/40">
            <Img src={HOTEL_IMAGES.exterior} alt="The Imperial Palace at dusk" width={900} height={1125} sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1426]/70 to-transparent" />
          </div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-6 left-4 right-4 border border-primary/40 bg-background/95 p-5 shadow-[0_30px_60px_-20px_rgba(6,12,26,0.8)] backdrop-blur sm:left-auto sm:right-[-1.5rem] sm:w-72">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Reservations desk</p>
            <p className="mt-2 font-serif text-2xl text-foreground">Open {CONTACT_INFORMATION.reception}</p>
            <p className="mt-1 break-all text-sm text-muted-foreground">{CONTACT_INFORMATION.email}</p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Index() {
  const featured = ROOMS.filter((r) => r.featured);
  const facts = HOME.facts.map(parseFact);
  const galleryPicks = GALLERY.slice(0, 8);
  return (
    <PageLayout title="The Imperial Palace Rajkot | 5-Star Luxury Hotel in Gujarat" description={SITE.description}>
      <Hero />
      <Marquee />

      <section className={`relative overflow-hidden ${SECTION}`}>
        <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal><SectionHeading eyebrow="Welcome" title={HOME.welcomeTitle} /></Reveal>
          <Reveal delay={0.15}>
            <p className="text-base leading-8 text-muted-foreground">{HOME.welcomeText}</p>
            <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6 sm:grid-cols-4">
              {facts.map((f, i) => (
                <Reveal key={f.label} delay={0.2 + i * 0.1}>
                  <dd className="bg-gradient-to-br from-[#c9a84c] to-[#f1e2b8] bg-clip-text font-serif text-4xl font-light text-transparent md:text-5xl"><CountUp value={f.value} /></dd>
                  <dt className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{f.label}</dt>
                </Reveal>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className={`bg-gradient-to-b from-card to-background ${SECTION} md:pb-28`}>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-x-6">
            <Reveal><SectionHeading eyebrow="Stay" title="Signature suites" description="From refined rooms to the Imperial Suite, each space is designed around comfort and privacy." /></Reveal>
            <Link to="/stay" className={`${textLink} mb-8 md:mb-10`}>All rooms and suites <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((room, i) => (
              <Reveal key={room.slug} delay={i * 0.12} className={i === 1 ? "md:translate-y-8" : ""}>
                <Link to={`/stay/${room.slug}`} className="group block">
                  <div className={`relative aspect-[4/5] ${imageCard}`}>
                    <Img src={room.images[0]} alt={`${room.name} at The Imperial Palace`} width={800} height={1000} sizes="(min-width: 768px) 33vw, 100vw" className={zoom} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1426]/70 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    {room.badge && <span className="absolute left-4 top-4 bg-[#0b1426]/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-[#e8d5a3] backdrop-blur">{room.badge}</span>}
                    <span className="absolute bottom-5 left-5 flex translate-y-4 items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">Discover <ArrowRight className="h-4 w-4" /></span>
                  </div>
                  <h3 className="mt-4 font-serif text-2xl text-foreground transition-colors group-hover:text-primary">{room.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{room.size}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={SECTION}>
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Dining" title="A table for every hour" /></Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {RESTAURANTS.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.1}>
                <Link to="/dining" className="group block transition-transform duration-700 hover:-translate-y-2">
                  <div className={`aspect-[4/3] ${imageCard}`}><Img src={r.image} alt={`${r.name}, ${r.category}`} width={800} height={600} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className={zoom} /></div>
                  <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-primary">{r.category}</p>
                  <h3 className="mt-1 font-serif text-2xl text-foreground transition-colors group-hover:text-primary">{r.name}</h3>
                  <p className="text-sm text-muted-foreground">{r.timing}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WeddingBand />

      <section className={SECTION}>
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Experiences" title="Moments worth remembering" align="center" /></Reveal>
          <div className="grid gap-4 md:grid-cols-6">
            {EXPERIENCES.slice(0, 5).map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08} className={i < 2 ? "md:col-span-3" : "md:col-span-2"}>
                <Link to={e.to} className={`group relative block ${i < 2 ? "aspect-[16/10]" : "aspect-[4/5]"} ${imageCard}`}>
                  <Img src={e.image} alt={e.title} width={1000} height={700} sizes={i < 2 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"} className={zoom} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1426]/85 via-[#0b1426]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#e8d5a3]">{e.label}</p>
                    <h3 className="mt-2 font-serif text-2xl text-white md:text-3xl">{e.title}</h3>
                    <p className="mt-2 max-h-0 overflow-hidden text-sm leading-6 text-white/80 transition-all duration-700 group-hover:max-h-24">{e.text}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`bg-card ${SECTION}`}>
        <Reveal className="mx-auto max-w-4xl text-center">
          <Quote className="mx-auto h-10 w-10 text-primary" />
          <p className="mt-6 font-serif text-3xl font-light italic leading-snug text-foreground text-balance md:text-5xl">{HOME.quote}</p>
          <p className="mt-6 text-[11px] uppercase tracking-[0.35em] text-primary">— {HOME.quoteAuthor}</p>
        </Reveal>
      </section>

      <section className={SECTION}>
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <Link to="/tour" className={`group relative block aspect-[16/10] ${imageCard}`} aria-label="Open the 360 degree tour">
              <Img src={HOTEL_IMAGES.lobby} alt="Preview of the 360 degree tour" width={1200} height={750} sizes="(min-width: 1024px) 50vw, 100vw" className={zoom} />
              <span className="absolute inset-0 flex items-center justify-center">
                <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} className="flex h-24 w-24 items-center justify-center rounded-full border border-white/70 bg-white/10 font-serif text-xl text-white backdrop-blur">360°</motion.span>
              </span>
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <SectionHeading eyebrow="Virtual experience" title="Walk the palace before you arrive" description="Move between the lobby, suites, ballrooms and pool with an interactive panorama." />
            <Link to="/tour" className={BTN.gold}>Start the tour</Link>
          </Reveal>
        </div>
      </section>

      <section className={`bg-gradient-to-b from-background to-card ${SECTION}`}>
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Gallery" title="A glimpse of the palace" /></Reveal>
          <div className="columns-2 gap-3 md:columns-4">
            {galleryPicks.map((g, i) => (
              <Reveal key={`${g.title}-${i}`} delay={(i % 4) * 0.08} className={`group mb-3 break-inside-avoid ${imageCard} ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`}>
                <Img src={g.image} alt={g.title} width={600} height={750} sizes="(min-width: 768px) 25vw, 50vw" className={zoom} />
              </Reveal>
            ))}
          </div>
          <Link to="/gallery" className={`${textLink} mt-6`}>View full gallery <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <EnquiryBand />

      <section className="relative overflow-hidden px-5 py-14 text-center md:py-20">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.35em] text-primary">Visit us</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl font-light text-foreground text-balance sm:text-5xl">{CONTACT_INFORMATION.addressLines.join(", ")}</h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <BookStayButton className={BTN.gold}>Reserve now</BookStayButton>
            <EnquiryButton className={BTN.outline}><MessageSquareText className="h-4 w-4" />Send an enquiry</EnquiryButton>
          </div>
        </Reveal>
      </section>
    </PageLayout>
  );
}
