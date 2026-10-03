// Instagram glyph (rounded square, lens and flash dot), drawn with currentColor.
export default function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Default Instagram per restaurant slug. Admin > Dining "Instagram link" overrides it.
// An empty admin field falls back to this default, because the admin saves untouched optional fields as empty.
const DEFAULT_INSTAGRAM: Record<string, string> = {
  delicacy: "https://www.instagram.com/delicacybakery",
};

export function instagramOf(r: { slug: string; instagram?: unknown }): string {
  const saved = typeof r.instagram === "string" ? r.instagram.trim() : "";
  return saved || (DEFAULT_INSTAGRAM[r.slug] ?? "");
}
