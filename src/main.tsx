import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { loadContent } from "./lib/content.ts";
import { setIntroEnd } from "./lib/intro.ts";

const SEEN_KEY = "ip-intro-seen";
const FADE_MS = 800;

const readSeen = () => {
  try { return sessionStorage.getItem(SEEN_KEY) === "1"; } catch { return false; }
};
const markSeen = () => {
  try { sessionStorage.setItem(SEEN_KEY, "1"); } catch { /* private mode: ignore */ }
};

// First visit in a session plays the full logo intro; later reloads only show it while loading.
const minIntroMs = readSeen() ? 0 : 1700;

function hideIntro() {
  const intro = document.getElementById("intro");
  if (!intro) return;
  const wait = Math.max(0, minIntroMs - performance.now());
  setIntroEnd(performance.now() + wait + FADE_MS * 0.4);
  setTimeout(() => {
    intro.classList.add("intro-done");
    markSeen();
    setTimeout(() => intro.remove(), FADE_MS);
  }, wait);
}

const start = () => {
  createRoot(document.getElementById("root")!).render(<App />);
  hideIntro();
};

// Apply admin edits before the first render; fall back to built-in content if it takes too long.
const timeout = new Promise<void>((resolve) => setTimeout(resolve, 3000));
void Promise.race([loadContent().catch(() => undefined), timeout]).then(start);
