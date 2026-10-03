// Shared class strings so buttons and fields stay consistent across the site.
const base =
  "group/btn relative inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 overflow-hidden px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] transition-all duration-500 hover:-translate-y-0.5 active:translate-y-0";

export const BTN = {
  gold: `${base} bg-gradient-to-r from-[#b8933a] via-[#ecd594] to-[#b8933a] bg-[length:200%_100%] bg-left text-[#14110c] shadow-[0_10px_30px_-12px_rgba(212,180,106,0.6)] hover:bg-right hover:shadow-[0_16px_40px_-12px_rgba(212,180,106,0.8)]`,
  outline: `${base} border border-primary/70 text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground`,
  light: `${base} border border-white/60 text-white backdrop-blur-sm hover:border-[#e8d5a3] hover:bg-white/10 hover:text-[#f1e2b8]`,
} as const;

export const FIELD =
  "h-11 w-full min-w-0 border border-input bg-secondary/60 px-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-primary/40";

export const LABEL = "text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground";
