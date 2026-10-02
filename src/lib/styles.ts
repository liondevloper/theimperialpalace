// Shared class strings so buttons and fields stay consistent across the site.
const base =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors";

export const BTN = {
  gold: `${base} border border-[#c9a84c] bg-[#c9a84c] text-[#14110c] hover:bg-[#dcc06a]`,
  outline: `${base} border border-[#8a6a22] text-[#6f5318] hover:bg-[#c9a84c] hover:text-[#14110c]`,
  light: `${base} border border-white/50 text-white hover:border-[#c9a84c] hover:text-[#c9a84c]`,
} as const;

export const FIELD =
  "h-11 w-full min-w-0 border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-[#8a6a22]";

export const LABEL = "text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground";
