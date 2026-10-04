import { useEffect, useState } from "react";
import { Check, Palette } from "lucide-react";
import { THEMES, applyTheme, readStoredTheme } from "../lib/theme.ts";
import type { ThemeId } from "../lib/theme.ts";

// Floating button so a theme can be previewed live, on any page, for client demos.
// Sits above the WhatsApp/Enquiry/Book Stay cluster so it never overlaps them.
export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeId>("royal");
  const [open, setOpen] = useState(false);

  // Reads the previously saved choice once the component mounts (client-only storage).
  useEffect(() => {
    setTheme(readStoredTheme());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const choose = (id: ThemeId) => {
    setTheme(id);
    applyTheme(id);
    setOpen(false);
  };

  return (
    <div className="fixed right-4 top-24 z-40 sm:right-6 sm:top-28">
      {open && (
        // Full-screen invisible button to close the popover on an outside click.
        <button type="button" aria-label="Close theme menu" onClick={() => setOpen(false)} className="fixed inset-0 z-40 cursor-default" />
      )}
      <div className="relative z-50">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Preview a different theme"
          aria-expanded={open}
          aria-haspopup="menu"
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[var(--brand-gold)]/50 bg-[var(--brand-ink-2)]/70 text-[var(--brand-cream)] shadow-[0_8px_20px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <Palette className="h-5 w-5" aria-hidden="true" />
        </button>

        {open && (
          <div role="menu" aria-label="Theme options" className="theme-ivory absolute right-0 top-14 w-72 rounded-xl border border-border bg-popover p-3 text-popover-foreground shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)]">
            <p className="px-1.5 pb-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Preview a theme (demo only)</p>
            <ul className="space-y-1">
              {THEMES.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={theme === t.id}
                    onClick={() => choose(t.id)}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-accent"
                  >
                    <span className="flex h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-border" aria-hidden="true">
                      <span className="h-full w-1/2" style={{ backgroundColor: t.swatch[0] }} />
                      <span className="h-full w-1/2" style={{ backgroundColor: t.swatch[1] }} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-foreground">{t.label}</span>
                      <span className="block text-xs leading-5 text-muted-foreground">{t.description}</span>
                    </span>
                    {theme === t.id && <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
