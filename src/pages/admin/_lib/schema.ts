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
      text("heroEyebrow", "Hero small heading (top line)"), text("heroTitle", "Hero title"), text("heroHighlight", "Hero highlighted word", true, "Shown in gold italics after the title"),
      area("heroSubtitle", "Hero subtitle"),
      { name: "heroImage", label: "Hero background photo (below the header)", type: "image", required: false, help: "Optional. Leave empty to show the navy and gold background. Tip: add a photo too when you use a video, it shows instantly while the video loads." },
      { name: "heroVideo", label: "Hero background video (below the header)", type: "video", required: false, help: "Optional. MP4, under 30 MB. For the fastest loading keep it under 10 MB: 1080p or 720p, 10 to 20 seconds, no sound. Plays silently on loop." },
      { name: "marquee", label: "Scrolling highlights ribbon", type: "lines", required: true, help: "One phrase per line" },
      text("welcomeTitle", "Welcome heading"), area("welcomeText", "Welcome text"),
      { name: "facts", label: "Key numbers", type: "lines", required: true, help: "One per line, format: 200+ | Rooms & suites" },
      text("stayTitle", "Rooms section heading"), area("stayText", "Rooms section text"),
      text("diningTitle", "Dining section heading"),
      text("weddingTitle", "Weddings band heading"), area("weddingText", "Weddings band text"), image("weddingImage", "Weddings band photo"),
      text("experiencesTitle", "Experiences section heading"),
      area("quote", "Signature quote"), text("quoteAuthor", "Quote by"),
      text("tourTitle", "360° tour heading"), area("tourText", "360° tour text"), image("tourImage", "360° tour preview photo"),
      text("galleryTitle", "Gallery section heading"),
      text("enquiryTitle", "Enquiry section heading"), area("enquiryText", "Enquiry section text"),
      { name: "enquiryPerks", label: "Enquiry section points", type: "lines", required: true, help: "One per line, format: Title | Short text" },
      image("enquiryImage", "Enquiry section photo"),
      text("visitTitle", "Visit us small heading"),
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
    blank: { name: "New restaurant", slug: "", category: "", description: "", timing: "", image: "", instagram: null },
    fields: [
      text("name", "Name"), text("category", "Type of dining"), area("description", "Description"), text("timing", "Timings"), image(),
      { name: "instagram", label: "Instagram link (optional)", type: "optionalText", help: "Shows an Instagram icon on this restaurant's card on the home page. Leave empty to hide." },
    ],
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
      text("phone", "Phone 1 (as shown)"), text("phoneHref", "Phone 1 link", true, "For example tel:+912812480000"),
      text("phone2", "Phone 2 (optional)", false, "Shown as a second call button on the home page, contact page and footer. Leave empty to hide."),
      text("email", "Main email", true, "Used for booking pop-ups and quick links"),
      { name: "reservationEmails", label: "Reservations emails", type: "lines", help: "Shown in the footer, home page reservations desk and contact page. One email per line" },
      { name: "mailEmails", label: "Mail emails", type: "lines", help: "Shown in the footer and on the contact page. One email per line" },
      text("reception", "Reception hours"), text("checkIn", "Check-in time"), text("checkOut", "Check-out time"), text("mapsUrl", "Google Maps link"),
      { name: "mapStyle", label: "Footer map", type: "select", required: true, options: ["Premium map", "Google map", "Both maps"], help: "Choose which map visitors see in the website footer." },
    ],
  },
];
