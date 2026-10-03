import { supabase } from "./supabase.ts";
import { FORM_CONFIGS } from "./forms.ts";
import type { EnquiryKind } from "./forms.ts";
import { AMENITIES, CONTACT_INFORMATION, EXPERIENCES, GALLERY, HOME, RESTAURANTS, ROOMS, TOUR_LOCATIONS, VENUES } from "./hotel-data.ts";

// Website content can be edited from /admin. Edits are stored in Supabase (table site_content)
// and applied on top of the built-in defaults in hotel-data.ts when the site loads.

export type Row = Record<string, unknown>;
export const CONTENT_KEYS = ["home", "rooms", "restaurants", "venues", "amenities", "experiences", "gallery", "tour", "contact"] as const;
export type ContentKey = (typeof CONTENT_KEYS)[number];

const TARGETS: Record<ContentKey, Row[] | Row> = {
  home: HOME,
  rooms: ROOMS,
  restaurants: RESTAURANTS,
  venues: VENUES,
  amenities: AMENITIES,
  experiences: EXPERIENCES,
  gallery: GALLERY,
  tour: TOUR_LOCATIONS,
  contact: CONTACT_INFORMATION,
};

// Snapshot of the built-in content, taken before any saved edits are applied.
const DEFAULTS: Record<ContentKey, Row[] | Row> = structuredClone(TARGETS);

const isContentKey = (value: unknown): value is ContentKey => CONTENT_KEYS.some((k) => k === value);
const isRow = (value: unknown): value is Row => typeof value === "object" && value !== null && !Array.isArray(value);

export const slugify = (text: string) => text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/** A deep copy of what the site currently shows for a section. */
export function getContent(key: ContentKey): Row[] | Row {
  return structuredClone(TARGETS[key]);
}

// Form dropdowns are built once at import time, so refresh them after content changes.
function syncFormOptions() {
  const set = (kind: EnquiryKind, name: string, options: string[]) => {
    const field = FORM_CONFIGS[kind].fields.find((f) => f.name === name);
    if (field) field.options = options;
  };
  set("booking", "roomType", ["Any room type", ...ROOMS.map((r) => r.name)]);
  set("wedding", "venue", VENUES.filter((v) => v.forWeddings).map((v) => v.name));
  set("event", "venue", VENUES.map((v) => v.name));
  set("dining", "restaurant", RESTAURANTS.map((r) => r.name));
  set("wellness", "service", AMENITIES.map((a) => a.name));
}

function applyContent(key: ContentKey, data: unknown) {
  const target = TARGETS[key];
  if (Array.isArray(target) && Array.isArray(data) && data.length > 0 && data.every(isRow)) target.splice(0, target.length, ...data);
  else if (!Array.isArray(target) && isRow(data)) Object.assign(target, data);
  syncFormOptions();
}

export async function loadContent(): Promise<void> {
  const { data, error } = await supabase.from("site_content").select("key,data");
  if (error || !data) return;
  for (const row of data) if (isContentKey(row.key)) applyContent(row.key, row.data);
}

// Keeps slugs and ids unique so two items never share a page address.
function uniqueBy(rows: Row[], field: string): Row[] {
  const seen = new Map<string, number>();
  return rows.map((r) => {
    const base = String(r[field]);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    return count === 1 ? r : { ...r, [field]: `${base}-${count}` };
  });
}

/** Tidies a section before saving: unique slugs, and tour hotspots that point to a removed location. */
export function normalize(key: ContentKey, data: Row[] | Row): Row[] | Row {
  if (!Array.isArray(data)) return data;
  if (key === "rooms" || key === "restaurants") {
    return uniqueBy(data.map((r) => ({ ...r, slug: slugify(typeof r.slug === "string" && r.slug.trim() ? r.slug : String(r.name ?? "")) })), "slug");
  }
  if (key === "tour") {
    const withIds = uniqueBy(data.map((r) => ({ ...r, id: slugify(typeof r.id === "string" && r.id.trim() ? r.id : String(r.label ?? "")) })), "id");
    const ids = new Set(withIds.map((r) => r.id));
    return withIds.map((r) => ({
      ...r,
      hotspots: Array.isArray(r.hotspots) ? r.hotspots.filter((h) => isRow(h) && ids.has(h.to) && h.to !== r.id) : [],
    }));
  }
  return data;
}

/* ------------------------- Cleaning up removed uploads ------------------------- */

const BUCKET = "site-media";
const BUCKET_PREFIX = `/storage/v1/object/public/${BUCKET}/`;

// Only files we uploaded to our own bucket can be deleted; built-in CDN photos are never touched.
function storagePath(url: string): string | null {
  const index = url.indexOf(BUCKET_PREFIX);
  if (index < 0) return null;
  return decodeURIComponent(url.slice(index + BUCKET_PREFIX.length).split("?")[0]) || null;
}

function collectPaths(value: unknown, out: Set<string>): Set<string> {
  if (typeof value === "string") {
    const path = storagePath(value);
    if (path) out.add(path);
  } else if (Array.isArray(value)) value.forEach((v) => collectPaths(v, out));
  else if (isRow(value)) Object.values(value).forEach((v) => collectPaths(v, out));
  return out;
}

/**
 * Deletes uploads that were in a section before a save but are no longer used anywhere on the site.
 * Runs after the save succeeds, and a file still used by another section is kept.
 */
async function deleteUnusedUploads(before: Row[] | Row): Promise<void> {
  const inUse = collectPaths(TARGETS, new Set());
  const unused = [...collectPaths(before, new Set())].filter((p) => !inUse.has(p));
  if (unused.length) await supabase.storage.from(BUCKET).remove(unused);
}

/* ------------------------------- Save and reset -------------------------------- */

/** Returns an error message, or null on success. */
export async function saveContent(key: ContentKey, data: Row[] | Row): Promise<string | null> {
  const before = getContent(key);
  const clean = normalize(key, data);
  const { error } = await supabase.from("site_content").upsert({ key, data: clean, updated_at: new Date().toISOString() });
  if (error) return "Could not save. Please check your connection and try again.";
  if (Array.isArray(TARGETS[key])) applyContent(key, clean);
  else applyContent(key, { ...DEFAULTS[key], ...(clean as Row) });
  // A failed cleanup only leaves an unused file behind, so it never blocks the save.
  await deleteUnusedUploads(before).catch(() => undefined);
  return null;
}

export async function resetContent(key: ContentKey): Promise<string | null> {
  const before = getContent(key);
  const { error } = await supabase.from("site_content").delete().eq("key", key);
  if (error) return "Could not reset this section.";
  applyContent(key, structuredClone(DEFAULTS[key]));
  await deleteUnusedUploads(before).catch(() => undefined);
  return null;
}

/* ------------------------------------ Upload ----------------------------------- */

const MB = 1024 * 1024;
const MEDIA = {
  image: { prefix: "image/", max: 5 * MB, fallbackExt: "jpg", typeError: "Please choose an image file.", sizeError: "Image must be smaller than 5 MB." },
  // Smaller videos start playing much sooner, especially on phones. Under 10 MB is ideal.
  video: { prefix: "video/", max: 30 * MB, fallbackExt: "mp4", typeError: "Please choose a video file (MP4 or WebM).", sizeError: "Video must be smaller than 30 MB. Compress it to under 10 MB for the fastest loading." },
} as const;
export type MediaKind = keyof typeof MEDIA;

// Every upload gets a unique file name, so browsers and the CDN can safely cache it for a year.
const ONE_YEAR_SECONDS = "31536000";

/** Uploads an image or video to the public site-media bucket and returns its URL. */
export async function uploadMedia(file: File, kind: MediaKind): Promise<string> {
  const rule = MEDIA[kind];
  if (!file.type.startsWith(rule.prefix)) throw new Error(rule.typeError);
  if (file.size > rule.max) throw new Error(rule.sizeError);
  const ext = file.name.split(".").pop()?.toLowerCase() ?? rule.fallbackExt;
  const path = `${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, "")) || kind}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type, cacheControl: ONE_YEAR_SECONDS });
  if (error) throw new Error("Upload failed. Please try again.");
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

export const uploadImage = (file: File) => uploadMedia(file, "image");
