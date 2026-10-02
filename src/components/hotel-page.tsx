import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useInView } from "motion/react";
import Img from "./img.tsx";

export function PageHero({ title, eyebrow, image, subtitle }: { title: string; eyebrow: string; image: string; subtitle?: string }) {
  return (
    <section className="relative flex min-h-[380px] items-end overflow-hidden bg-[#14110c] md:min-h-[520px]">
      <Img src={image} alt="" priority width={1600} height={900} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#14110c]/60" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-12 pt-24 md:pb-20 lg:px-8">
        <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-[#c9a84c]">{eyebrow}</p>
        <h1 className="max-w-4xl font-serif text-4xl font-light leading-[1.05] text-white text-balance sm:text-5xl md:text-7xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 md:text-base">{subtitle}</p>}
      </div>
    </section>
  );
}

type HeadingProps = { eyebrow: string; title: string; description?: string; align?: "left" | "center"; tone?: "light" | "dark" };

export function SectionHeading({ eyebrow, title, description, align = "left", tone = "light" }: HeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={`mb-10 max-w-2xl md:mb-14 ${align === "center" ? "mx-auto text-center" : ""}`}>
      <div className={`mb-5 flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}>
        <span className="h-px w-10 bg-[#c9a84c]" />
        <span className={`text-[11px] uppercase tracking-[0.35em] ${dark ? "text-[#c9a84c]" : "text-[#6f5318]"}`}>{eyebrow}</span>
      </div>
      <h2 className={`font-serif text-3xl font-light leading-tight text-balance sm:text-4xl md:text-5xl ${dark ? "text-white" : "text-foreground"}`}>{title}</h2>
      {description && <p className={`mt-5 text-sm leading-7 md:text-base ${dark ? "text-white/70" : "text-muted-foreground"}`}>{description}</p>}
    </div>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}
