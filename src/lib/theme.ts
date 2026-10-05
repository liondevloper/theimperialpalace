// Three switchable demo looks for client presentations. The default "royal" theme needs no
// data-theme attribute (it lives on :root in index.css); the others set data-theme on <html>.
export type ThemeId = "royal" | "noir" | "emerald";

export type ThemeOption = {
  id: ThemeId;
  label: string;
  description: string;
  /** [dark base, gold accent] used for the little swatch preview in the switcher. */
  swatch: [string, string];
};

export const THEMES: ThemeOption[] = [
  { id: "royal", label: "Royal Navy & Gold", description: "The signature look: deep royal navy with champagne gold.", swatch: ["#152245", "#c9a84c"] },
  { id: "noir", label: "Noir & Gold", description: "Matte black with classic gold detailing for a sleek, modern feel.", swatch: ["#181818", "#d4af37"] },
  { id: "emerald", label: "Emerald & Gold", description: "Deep emerald green with antique gold, a rich botanical take.", swatch: ["#0a2a21", "#c9a66b"] },
];

const STORAGE_KEY = "ip-theme";
const DEFAULT_THEME: ThemeId = "royal";

const isThemeId = (value: string | null): value is ThemeId => THEMES.some((t) => t.id === value);

/** Reads the previously chosen theme (if any), falling back to the default. */
export function readStoredTheme(): ThemeId {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isThemeId(saved)) return saved;
  } catch {
    /* private mode: ignore */
  }
  return DEFAULT_THEME;
}

/** Applies a theme to the document immediately and remembers the choice for next visit. */
export function applyTheme(theme: ThemeId): void {
  const root = document.documentElement;
  if (theme === DEFAULT_THEME) root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* private mode: ignore */
  }
}
