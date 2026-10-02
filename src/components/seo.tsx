import { useEffect } from "react";
import { HOTEL_IMAGES, withWidth } from "../lib/hotel-data.ts";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// Per-page title and social tags. Static defaults + Hotel structured data live in index.html.
export default function Seo({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", withWidth(HOTEL_IMAGES.lobby, 1200));
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
  }, [title, description]);
  return null;
}
