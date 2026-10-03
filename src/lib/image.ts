// Image URL helpers: ask the CDN for a right-sized, modern-format (AVIF/WebP) copy
// instead of downloading the full-size original. This is the biggest speed win for photos.

const HERCULES = /^https:\/\/(?:hercules-cdn\.com|cdn\.hercules\.app)\/(?:cdn-cgi\/image\/[^/]+\/)?(file_[A-Za-z0-9]+)/;
const UNSPLASH = /^https:\/\/images\.unsplash\.com\//;
const STEPS = [320, 480, 640, 800, 1080, 1366, 1600, 1920, 2560];
const MAX_WIDTH = 2560;

const isOptimisable = (url: string) => HERCULES.test(url) || UNSPLASH.test(url);

/** Returns a resized, compressed version of the image URL (unknown hosts are returned unchanged). */
export function cdnImage(url: string, width: number, quality = 75): string {
  const w = Math.min(MAX_WIDTH, Math.round(width));
  const match = url.match(HERCULES);
  if (match) return `https://hercules-cdn.com/cdn-cgi/image/w=${w},quality=${quality},fit=scale-down,format=auto/${match[1]}`;
  if (UNSPLASH.test(url)) {
    const u = new URL(url);
    u.searchParams.delete("fm");
    u.searchParams.set("w", String(w));
    u.searchParams.set("q", String(quality));
    u.searchParams.set("auto", "format");
    return u.toString();
  }
  return url;
}

/** A srcset so phones download small files and retina screens get sharp ones. */
export function cdnSrcSet(url: string, width: number): string | undefined {
  if (!isOptimisable(url)) return undefined;
  const max = Math.min(width * 2, MAX_WIDTH);
  const widths = [...STEPS.filter((s) => s < max), max];
  return widths.map((w) => `${cdnImage(url, w)} ${w}w`).join(", ");
}
