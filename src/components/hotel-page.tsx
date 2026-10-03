import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import Img from "./img.tsx";
import { introDelay } from "../lib/intro.ts";

const EASE = [0.22, 1, 0.36, 1] as const;

export function PageHero({ title, eyebrow, image, subtitle }: { title: string; eyebrow: string; image: string; subtitle?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const delay = introDelay();
  return (
    <section ref={ref} className="relative flex min-h-[380px] items-end overflow-hidden bg-[#14110c] md:min-h-[520px]">
      <motion.div style={{ y }} initial={{ scale: 1.15 }} animate={{ scale: 1.03 }} transition={{ duration: 2.4, delay, ease: EASE }} className="absolute inset-0">
        <Img src={image} alt="" priority width={1920} height={1080} sizes="100vw" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b08] via-[#0d0b08]/45 to-[#0d0b08]/10" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-12 pt-24 md:pb-16 lg:px-8">
        <HeroText eyebrow={eyebrow} title={title} subtitle={subtitle} delay={delay} />
      </div>
    </section>
  );
}

// Staggered entrance for hero copy, shared by the home page and inner pages.
export function HeroText({ eyebrow, title, subtitle, children, delay = 0 }: { eyebrow: string; title: ReactNode; subtitle?: string; children?: ReactNode; delay?: number }) {
  const item = (d: number) => ({ initial: { opacity: 0, y: 28, filter: "blur(6px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 1, delay: delay + d, ease: EASE } });
  return (
    <>
      <motion.div {...item(0.2)} className="mb-5 flex items-center gap-4">
        <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: delay + 0.3, ease: EASE }} className="h-px w-12 origin-left bg-[#d9bc6a]" />
        <span className="text-[11px] uppercase tracking-[0.4em] text-[#e8d5a3]">{eyebrow}</span>
      </motion.div>
      <motion.h1 {...item(0.35)} className="max-w-4xl font-serif text-4xl font-light leading-[1.04] text-white text-balance sm:text-6xl md:text-7xl">{title}</motion.h1>
      {subtitle && <motion.p {...item(0.55)} className="mt-6 max-w-xl text-sm leading-7 text-white/85 md:text-base">{subtitle}</motion.p>}
      {children && <motion.div {...item(0.75)}>{children}</motion.div>}
    </>
  );
}

type HeadingProps = { eyebrow: string; title: string; description?: string; align?: "left" | "center"; tone?: "light" | "dark" };

export function SectionHeading({ eyebrow, title, description, align = "left", tone = "light" }: HeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={`mb-8 max-w-2xl md:mb-10 ${align === "center" ? "mx-auto text-center" : ""}`}>
      <div className={`mb-4 flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}>
        <span className="h-px w-10 bg-gradient-to-r from-[#c9a84c] to-[#e8d5a3]" />
        <span className={`text-[11px] uppercase tracking-[0.35em] ${dark ? "text-[#e8d5a3]" : "text-primary"}`}>{eyebrow}</span>
      </div>
      <h2 className={`font-serif text-3xl font-light leading-tight text-balance sm:text-4xl md:text-5xl ${dark ? "text-white" : "text-foreground"}`}>{title}</h2>
      {description && <p className={`mt-4 text-sm leading-7 md:text-base ${dark ? "text-white/75" : "text-muted-foreground"}`}>{description}</p>}
    </div>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
