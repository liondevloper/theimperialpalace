import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Resets scroll on navigation and honours #hash anchors.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const frame = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
