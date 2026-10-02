import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { loadContent } from "./lib/content.ts";

const start = () => createRoot(document.getElementById("root")!).render(<App />);

// Apply admin edits before the first render; fall back to built-in content if it takes too long.
const timeout = new Promise<void>((resolve) => setTimeout(resolve, 3000));
void Promise.race([loadContent().catch(() => undefined), timeout]).then(start);
