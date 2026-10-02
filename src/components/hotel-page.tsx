import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useInView } from "motion/react";

export function PageHero({ title, eyebrow, image, subtitle }: { title: string; eyebrow: string; image: string; subtitle?: string }) {
  return (
    <section className="relative flex min-h-[420px] items-end overflow-hidden bg-[#0e0c09] md:min-h-[560px]">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-65" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c09] via-[#0e0c09]/35 to-[#0e0c09]/15" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-24 md:pb-24 lg:px-8">
        <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-[#c9a84c]">{eyebrow}</p>
        <h1 className="max-w-4xl font-serif text-5xl font-light leading-[1.05] text-white text-balance md:text-7xl">{title}</h1>
        {subtitle && <p className="mt-5 max-w-xl text-sm leading-7 text-white/75 md:text-base">{subtitle}</p>}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: { eyebrow: string; title: string; description?: string; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "mx-auto mb-12 max-w-2xl text-center" : "mb-12 max-w-2xl"}>
      <div className={`mb-5 flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}>
        <span className="h-px w-10 bg-[#c9a84c]" />
        <span className="text-[10px] uppercase tracking-[0.35em] text-[#9a7730]">{eyebrow}</span>
      </div>
      <h2 className="font-serif text-4xl font-light leading-tight text-foreground text-balance md:text-5xl">{title}</h2>
      {description && <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">{description}</p>}
    </div>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function GoldButton({ children, onClick, className = "" }: { children: ReactNode; onClick: () => void; className?: string }) {
  return (
    <button type="button" onClick={onClick} className={`inline-flex items-center justify-center border border-[#c9a84c] bg-[#c9a84c] px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1a1510] transition-colors hover:bg-[#e1c574] ${className}`}>
      {children}
    </button>
  );
}

export function OutlineButton({ children, onClick, className = "" }: { children: ReactNode; onClick: () => void; className?: string }) {
  return (
    <button type="button" onClick={onClick} className={`inline-flex items-center justify-center border border-[#c9a84c] px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#9a7730] transition-colors hover:bg-[#c9a84c] hover:text-[#1a1510] ${className}`}>
      {children}
    </button>
  );
}
