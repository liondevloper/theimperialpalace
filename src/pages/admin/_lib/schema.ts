import type { ContentKey, Row } from "../../../lib/content.ts";

export type FieldType = "text" | "optionalText" | "textarea" | "image" | "video" | "images" | "lines" | "checkbox" | "select";
export type AdminField = { name: string; label: string; type: FieldType; required?: boolean; options?: string[]; help?: string };
export type SectionDef = {
  key: ContentKey;
  label: string;
  single?: boolean;
  titleField: string;
  noun: string;
  page?: string;
  fields: AdminField[];
  blank: Row;
};

const text = (name: string, label: string, required = true, help?: string): AdminField => ({ name, label, type: "text", required, help });
const area = (name: string, label: string): AdminField => ({ name, label, type: "textarea", required: true });
const image = (name = "image", label = "Photo"): AdminField => ({ name, label, type: "image", required: true });

export const SECTIONS: SectionDef[] = [
  {
    key: "home", label: "Homepage", single: true, titleField: "heroTitle", noun: "homepage", page: "/",
    blank: {},
    fields: [
      text("heroEyebrow", "Hero small heading"), text("heroTitle", "Hero title"), text("heroHighlight", "Hero highlighted word", true, "Shown in gold italics after the title"),
      area("heroSubtitle", "Hero subtitle"),
      { name: "heroImage", label: "Hero background photo (below the header)", type: "image", required: false, help: "Optional. Leave empty to show the navy and gold background." },
      { name: "heroVideo", label: "Hero background video (below the header)", type: "video", required: false, help: "Optional. MP4 or WebM, under 50 MB. Plays silently on loop. If you add both, the video plays and the photo shows while it loads." },
      text("welcomeTitle", "Welcome heading"), area("welcomeText", "Welcome text"),
      { name: "facts", label: "Key numbers", type: "lines", required: true, help: "One per line, format: 200+ | Rooms & suites" },
      { name: "marquee", label: "Scrolling highlights ribbon", type: "lines", required: true, help: "One phrase per line" },
      area("quote", "Signature quote"), text("quoteAuthor", "Quote by"),
    ],
  },
  {
    key: "rooms", label: "Rooms & suites", titleField: "name", noun: "room", page: "/stay",
    blank: { name: "New room", slug: "", size: "", desc: "", longDesc: "", badge: null, featured: false, amenities: [], images: [] },
    fields: [
      text("name", "Room name"), text("size", "Size", true, "For example ~320 sq.ft"),
      area("desc", "Short description"), area("longDesc", "Full description"),
      { name: "badge", label: "Badge (optional)", type: "optionalText", help: "For example Club Floor" },
      { name: "featured", label: "Show on the home page", type: "checkbox" },
      { name: "amenities", label: "Amenities", type: "lines", help: "One per line" },
      { name: "images", label: "Photos", type: "images", required: true, help: "Upload several photos. The first one is the main photo." },
    ],
  },
  {
    key: "restaurants", label: "Dining", titleField: "name", noun: "restaurant", page: "/dining",
    blank: { name: "New restaurant", slug: "", category: "", description: "", timing: "", image: "" },
    fields: [text("name", "Name"), text("category", "Type of dining"), area("description", "Description"), text("timing", "Timings"), image()],
  },
  {
    key: "venues", label: "Venues", titleField: "name", noun: "venue", page: "/events",
    blank: { name: "New venue", size: "", capacity: "", types: "", image: "", forWeddings: false },
    fields: [
      text("name", "Venue name"), text("size", "Size"), text("capacity", "Capacity"), text("types", "Suitable for"), image(),
      { name: "forWeddings", label: "Show on the weddings page", type: "checkbox" },
    ],
  },
  {
    key: "amenities", label: "Wellness", titleField: "name", noun: "experience", page: "/wellness",
    blank: { name: "New experience", category: "", description: "", image: "" },
    fields: [text("name", "Name"), text("category", "Category"), area("description", "Description"), image()],
  },
  {
    key: "experiences", label: "Experiences", titleField: "title", noun: "experience", page: "/experiences",
    blank: { title: "New experience", label: "", text: "", image: "", to: "/gallery" },
    fields: [
      text("title", "Title"), text("label", "Small heading"), area("text", "Description"), image(),
      { name: "to", label: "Links to page", type: "select", required: true, options: ["/stay", "/dining", "/weddings", "/events", "/wellness", "/tour", "/gallery", "/contact"] },
    ],
  },
  {
    key: "gallery", label: "Gallery", titleField: "title", noun: "photo", page: "/gallery",
    blank: { category: "Hotel", image: "", title: "New photo" },
    fields: [
      text("title", "Caption"), image(),
      { name: "category", label: "Category", type: "select", required: true, options: ["Hotel", "Rooms", "Dining", "Weddings", "Events", "Wellness"] },
    ],
  },
  {
    key: "tour", label: "360° tour", titleField: "label", noun: "location", page: "/tour",
    blank: { id: "", label: "New location", area: "", description: "", image: "", hotspots: [] },
    fields: [text("label", "Location name"), text("area", "Area"), area("description", "Description"), image("image", "Photo or 360° image")],
  },
  {
    key: "contact", label: "Contact details", single: true, titleField: "name", noun: "contact details", page: "/contact",
    blank: {},
    fields: [
      text("name", "Hotel name"), { name: "addressLines", label: "Address", type: "lines", required: true, help: "One line per row" },
      text("phone", "Phone (as shown)"), text("phoneHref", "Phone link", true, "For example tel:+912812480000"),
      text("email", "Main email", true, "Used for booking pop-ups and quick links"),
      { name: "reservationEmails", label: "Reservations emails", type: "lines", help: "Shown in the footer under Reservations. One email per line" },
      { name: "mailEmails", label: "Mail emails", type: "lines", help: "Shown in the footer under Mail and on the contact page. One email per line" },
      text("reception", "Reception hours"), text("checkIn", "Check-in time"), text("checkOut", "Check-out time"), text("mapsUrl", "Google Maps link"),
    ],
  },
];
