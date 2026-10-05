import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarHeart, Clock, MessageSquareText, Phone, Quote, Sparkles } from "lucide-react";
import { animate, motion, useInView, useMotionValue, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import PageLayout from "../components/page-layout.tsx";
import Img from "../components/img.tsx";
import InstagramIcon, { instagramOf } from "../components/instagram-icon.tsx";
import { Reveal, SectionHeading } from "../components/hotel-page.tsx";
import { EnquiryButton } from "../components/enquiry-modal.tsx";
import { BookStayButton } from "../components/book-stay-modal.tsx";
import { CONTACT_INFORMATION, EXPERIENCES, GALLERY, HOME, HOTEL_IMAGES, RESTAURANTS, ROOMS, contactPhones } from "../lib/hotel-data.ts";
import { introDelay } from "../lib/intro.ts";
import { SITE } from "../lib/site-config.ts";
import { BTN } from "../lib/styles.ts";

const EASE = [0.22, 1, 0.36, 1] as const;

// Compact vertical rhythm for every home section.
const SECTION = "px-5 py-14 md:py-20 lg:px-8";
const textLink = "group inline-flex min-h-11 items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-primary transition-all hover:gap-4";
const imageCard = "overflow-hidden bg-card shadow-[0_24px_50px_-28px_rgba(6,12,26,0.9)] ring-1 ring-border";
const zoom = "h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110";

const PERK_ICONS = [Clock, CalendarHeart, Sparkles];

// "Title | text" or "200+ | Rooms & suites" -> [left, right]
const splitPipe = (line: string): [string, string] => {
  const [a = "", b = ""] = line.split("|").map((s) => s.trim());
  return [a, b];
};

const str = (value: unknown, fallback = "") => (typeof value === "string" && value.trim() ? value.trim() : fallback);
const lines = (value: unknown) => (Array.isArray(value) ? value.filter((v): v is string => typeof v === "string" && v.trim() !== "") : []);

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

// Visitors with "data saver" turned on get the photo only, so the page stays fast for them.
const prefersSaveData = () => {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return connection?.saveData === true;
};

// Starts downloading right away (preload="auto") and fades in only once frames are actually playing,
// so visitors never see a black box: the photo (or navy backdrop) stays visible until then.
function HeroVideo({ src }: { src: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
      onPlaying={() => setPlaying(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}`}
    />
  );
}

// Staggered blur-up entrance used by the hero copy.
const heroItem = (delay: number) => ({
  initial: { opacity: 0, y: 28, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1, delay, ease: EASE },
});

// One call button per saved number (1 or 2), shared by the enquiry band and "Visit us".
function PhoneButtons({ className }: { className: string }) {
  return (
    <>
      {contactPhones().map((p) => (
        <a key={p.href} href={p.href} className={className}><Phone className="h-4 w-4" />{p.label}</a>
      ))}
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const delay = introDelay();
  // Hero photo and video are both optional and added from the admin panel (Homepage).
  const heroImage = str(HOME.heroImage);
  const heroVideo = prefersSaveData() ? "" : str(HOME.heroVideo);
  const hasMedia = Boolean(heroImage || heroVideo);
  return (
    <section ref={ref} className="relative flex min-h-[600px] flex-col overflow-hidden bg-[var(--brand-ink)] md:min-h-screen">
      {hasMedia ? (
        <>
          <motion.div style={{ y }} initial={{ scale: 1.2 }} animate={{ scale: 1.04 }} transition={{ duration: 3, delay, ease: EASE }} className="absolute inset-0">
            {/* Photo loads first with high priority and shows instantly; the video fades in on top once ready. */}
            {heroImage && <Img src={heroImage} alt="The Imperial Palace, Rajkot" priority width={1920} height={1080} sizes="100vw" className="absolute inset-0 h-full w-full object-cover" />}
            {heroVideo && <HeroVideo src={heroVideo} />}
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--brand-ink),color-mix(in_oklab,var(--brand-ink)_35%,transparent),color-mix(in_oklab,var(--brand-ink)_30%,transparent))]" />
        </>
      ) : (
        // No photo or video yet: themed backdrop with soft gold glow.
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,color-mix(in_oklab,var(--brand-gold)_22%,transparent),transparent_55%),radial-gradient(ellipse_at_10%_90%,color-mix(in_oklab,var(--brand-gold)_12%,transparent),transparent_50%),linear-gradient(180deg,var(--brand-ink-soft)_0%,var(--brand-ink)_100%)]" />
      )}
      {/* Layout: eyebrow sits just below the fixed header; title + subtitle sit at the bottom. */}
      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-5 pb-16 pt-[96px] md:pt-[108px] lg:px-8 lg:pb-24">
        <motion.div {...heroItem(delay + 0.2)} className="flex items-start gap-4">
          <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: delay + 0.3, ease: EASE }} className="mt-2 h-px w-12 shrink-0 origin-left bg-[var(--brand-gold-light)]" />
          <span className="max-w-md text-[11px] uppercase leading-6 tracking-[0.4em] text-[var(--brand-cream)] [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">{HOME.heroEyebrow}</span>
        </motion.div>
        <div className="pt-16">
          <motion.h1 {...heroItem(delay + 0.35)} className="max-w-4xl font-serif text-4xl font-light leading-[1.04] text-white text-balance sm:text-6xl md:text-7xl">
            {HOME.heroTitle} <em className="bg-[linear-gradient(90deg,var(--brand-cream-2),var(--brand-gold-light),var(--brand-cream-2))] bg-clip-text italic text-transparent">{HOME.heroHighlight}</em>
          </motion.h1>
          {HOME.heroSubtitle && <motion.p {...heroItem(delay + 0.55)} className="mt-6 max-w-xl text-sm leading-7 text-white/85 md:text-base">{HOME.heroSubtitle}</motion.p>}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 1.6, duration: 1 }} className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--brand-cream)]/80">Scroll</span>
        <motion.span animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} className="block h-12 w-px bg-[linear-gradient(to_bottom,var(--brand-cream),transparent)]" />
      </motion.div>
    </section>
  );
}

function Marquee() {
  const base = lines(HOME.marquee);
  const items = [...base, ...base];
  return (
    <div className="overflow-hidden border-y border-border bg-card py-4">
      <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex w-max gap-12">
        {items.map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center gap-12 whitespace-nowrap font-serif text-2xl italic text-[var(--brand-cream)] md:text-3xl">
            {t}<span className="text-sm not-italic text-[var(--brand-gold-dark)]">✦</span>
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
    <section ref={ref} className="relative overflow-hidden bg-[var(--brand-ink)]">
      <ParallaxImage src={str(HOME.weddingImage, HOTEL_IMAGES.wedding)} alt="A wedding celebration at The Imperial Palace" progress={scrollYProgress} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--brand-ink)_90%,transparent),color-mix(in_oklab,var(--brand-ink)_60%,transparent),color-mix(in_oklab,var(--brand-ink)_10%,transparent))]" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Weddings & events" title={str(HOME.weddingTitle)} description={str(HOME.weddingText)} tone="dark" />
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
  const perks = lines(HOME.enquiryPerks).map(splitPipe);
  return (
    <section className="relative overflow-hidden bg-card px-5 py-16 md:py-24 lg:px-8">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[var(--brand-gold-dark)]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[var(--brand-gold-light)]/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow="Enquire" title={str(HOME.enquiryTitle)} description={str(HOME.enquiryText)} />
          <ul className="space-y-4">
            {perks.map(([title, text], i) => {
              const Icon = PERK_ICONS[i % PERK_ICONS.length];
              return (
                <Reveal key={`${title}-${i}`} delay={0.1 + i * 0.1}>
                  <li className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/50 text-primary"><Icon className="h-5 w-5" /></span>
                    <div>
                      <p className="font-serif text-xl text-foreground">{title}</p>
                      {text && <p className="mt-1 text-sm text-muted-foreground">{text}</p>}
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row">
            <EnquiryButton className={BTN.gold}><MessageSquareText className="h-4 w-4" />Send an enquiry</EnquiryButton>
            <PhoneButtons className={BTN.outline} />
          </div>
        </Reveal>
        <Reveal delay={0.2} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden ring-1 ring-primary/40">
            <Img src={str(HOME.enquiryImage, HOTEL_IMAGES.exterior)} alt="The Imperial Palace at dusk" width={900} height={1125} sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--brand-ink)_70%,transparent),transparent)]" />
          </div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-6 left-4 right-4 border border-primary/40 bg-background/95 p-5 shadow-[0_30px_60px_-20px_rgba(6,12,26,0.8)] backdrop-blur sm:left-auto sm:right-[-1.5rem] sm:w-72">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary">Reservations desk</p>
            <p className="mt-2 font-serif text-2xl text-foreground">Open {CONTACT_INFORMATION.reception}</p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Index() {
  const featured = ROOMS.filter((r) => r.featured);
  const facts = lines(HOME.facts).map(splitPipe);
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
              {facts.map(([value, label], i) => (
                <Reveal key={`${label}-${i}`} delay={0.2 + i * 0.1}>
                  <dd className="bg-[linear-gradient(to_bottom_right,var(--brand-gold),var(--brand-cream-2))] bg-clip-text font-serif text-4xl font-light text-transparent md:text-5xl"><CountUp value={value} /></dd>
                  <dt className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{label}</dt>
                </Reveal>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className={`bg-gradient-to-b from-card to-background ${SECTION} md:pb-28`}>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-x-6">
            <Reveal><SectionHeading eyebrow="Stay" title={str(HOME.stayTitle)} description={str(HOME.stayText)} /></Reveal>
            <Link to="/stay" className={`${textLink} mb-8 md:mb-10`}>All rooms and suites <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((room, i) => (
              <Reveal key={room.slug} delay={i * 0.12} className={i === 1 ? "md:translate-y-8" : ""}>
                <Link to={`/stay/${room.slug}`} className="group block">
                  <div className={`relative aspect-[4/5] ${imageCard}`}>
                    <Img src={room.images[0]} alt={`${room.name} at The Imperial Palace`} width={800} height={1000} sizes="(min-width: 768px) 33vw, 100vw" className={zoom} />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--brand-ink)_70%,transparent),transparent,transparent)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    {room.badge && <span className="absolute left-4 top-4 bg-[var(--brand-ink)]/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-[var(--brand-cream)] backdrop-blur">{room.badge}</span>}
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
          <Reveal><SectionHeading eyebrow="Dining" title={str(HOME.diningTitle)} /></Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {RESTAURANTS.map((r, i) => {
              const instagram = instagramOf(r);
              return (
                <Reveal key={r.slug} delay={i * 0.1}>
                  {/* Instagram sits outside the card link so the two links are never nested. */}
                  <div className="group relative transition-transform duration-700 hover:-translate-y-2">
                    <Link to="/dining" className="block">
                      <div className={`aspect-[4/3] ${imageCard}`}><Img src={r.image} alt={`${r.name}, ${r.category}`} width={800} height={600} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className={zoom} /></div>
                      <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-primary">{r.category}</p>
                      <h3 className="mt-1 font-serif text-2xl text-foreground transition-colors group-hover:text-primary">{r.name}</h3>
                      <p className="text-sm text-muted-foreground">{r.timing}</p>
                    </Link>
                    {instagram && (
                      <a
                        href={instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${r.name} on Instagram`}
                        title={`Follow ${r.name} on Instagram`}
                        className="absolute right-3 top-3 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6)] ring-2 ring-white/80 transition-transform duration-300 hover:scale-110"
                      >
                        <InstagramIcon className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <WeddingBand />

      <section className={SECTION}>
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Experiences" title={str(HOME.experiencesTitle)} align="center" /></Reveal>
          <div className="grid gap-4 md:grid-cols-6">
            {EXPERIENCES.slice(0, 5).map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08} className={i < 2 ? "md:col-span-3" : "md:col-span-2"}>
                <Link to={e.to} className={`group relative block ${i < 2 ? "aspect-[16/10]" : "aspect-[4/5]"} ${imageCard}`}>
                  <Img src={e.image} alt={e.title} width={1000} height={700} sizes={i < 2 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"} className={zoom} />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--brand-ink)_85%,transparent),color-mix(in_oklab,var(--brand-ink)_20%,transparent),transparent)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--brand-cream)]">{e.label}</p>
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
              <Img src={str(HOME.tourImage, HOTEL_IMAGES.lobby)} alt="Preview of the 360 degree tour" width={1200} height={750} sizes="(min-width: 1024px) 50vw, 100vw" className={zoom} />
              <span className="absolute inset-0 flex items-center justify-center">
                <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} className="flex h-24 w-24 items-center justify-center rounded-full border border-white/70 bg-white/10 font-serif text-xl text-white backdrop-blur">360°</motion.span>
              </span>
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <SectionHeading eyebrow="Virtual experience" title={str(HOME.tourTitle)} description={str(HOME.tourText)} />
            <Link to="/tour" className={BTN.gold}>Start the tour</Link>
          </Reveal>
        </div>
      </section>

      <section className={`bg-gradient-to-b from-background to-card ${SECTION}`}>
        <div className="mx-auto max-w-7xl">
          <Reveal><SectionHeading eyebrow="Gallery" title={str(HOME.galleryTitle)} /></Reveal>
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
          <p className="text-[11px] uppercase tracking-[0.35em] text-primary">{str(HOME.visitTitle, "Visit us")}</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl font-light text-foreground text-balance sm:text-5xl">{CONTACT_INFORMATION.addressLines.join(", ")}</h2>
          <div className="mt-8 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
            <BookStayButton className={BTN.gold}>Reserve now</BookStayButton>
            <EnquiryButton className={BTN.outline}><MessageSquareText className="h-4 w-4" />Send an enquiry</EnquiryButton>
          </div>
        </Reveal>
      </section>
    </PageLayout>
  );
}
