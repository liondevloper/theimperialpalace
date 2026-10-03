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

/** Returns an error message, or null on success. */
export async function saveContent(key: ContentKey, data: Row[] | Row): Promise<string | null> {
  const clean = normalize(key, data);
  const { error } = await supabase.from("site_content").upsert({ key, data: clean, updated_at: new Date().toISOString() });
  if (error) return "Could not save. Please check your connection and try again.";
  applyContent(key, clean);
  return null;
}

export async function resetContent(key: ContentKey): Promise<string | null> {
  const { error } = await supabase.from("site_content").delete().eq("key", key);
  if (error) return "Could not reset this section.";
  applyContent(key, structuredClone(DEFAULTS[key]));
  return null;
}

const MAX_UPLOAD = 5 * 1024 * 1024;

/** Uploads an image to the public site-media bucket and returns its URL. */
export async function uploadImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");
  if (file.size > MAX_UPLOAD) throw new Error("Image must be smaller than 5 MB.");
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${Date.now()}-${slugify(file.name.replace(/\.[^.]+$/, "")) || "image"}.${ext}`;
  const { error } = await supabase.storage.from("site-media").upload(path, file, { contentType: file.type });
  if (error) throw new Error("Upload failed. Please try again.");
  return supabase.storage.from("site-media").getPublicUrl(path).data.publicUrl;
}
