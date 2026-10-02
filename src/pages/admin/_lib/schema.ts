import type { ContentKey, Row } from "../../lib/content.ts";

export type FieldType = "text" | "optionalText" | "textarea" | "image" | "lines" | "checkbox" | "select";
export type AdminField = { name: string; label: string; type: FieldType; required?: boolean; options?: string[]; help?: string };
export type SectionDef = {
  key: ContentKey;
  label: string;
  single?: boolean;
  titleField: string;
  noun: string;
  fields: AdminField[];
  blank: Row;
};

const text = (name: string, label: string, required = true, help?: string): AdminField => ({ name, label, type: "text", required, help });
const area = (name: string, label: string): AdminField => ({ name, label, type: "textarea", required: true });
const image = (name = "image", label = "Photo"): AdminField => ({ name, label, type: "image", required: true });

export const SECTIONS: SectionDef[] = [
  {
    key: "rooms", label: "Rooms & suites", titleField: "name", noun: "room",
    blank: { name: "New room", slug: "", size: "", desc: "", longDesc: "", badge: null, featured: false, amenities: [], images: [] },
    fields: [
      text("name", "Room name"), text("size", "Size", true, "For example ~320 sq.ft"),
      area("desc", "Short description"), area("longDesc", "Full description"),
      { name: "badge", label: "Badge (optional)", type: "optionalText", help: "For example Club Floor" },
      { name: "featured", label: "Show on the home page", type: "checkbox" },
      { name: "amenities", label: "Amenities", type: "lines", help: "One per line" },
      { name: "images", label: "Photos", type: "lines", required: true, help: "One image address per line. The first is the main photo." },
    ],
  },
  {
    key: "restaurants", label: "Dining", titleField: "name", noun: "restaurant",
    blank: { name: "New restaurant", slug: "", category: "", description: "", timing: "", image: "" },
    fields: [text("name", "Name"), text("category", "Type of dining"), area("description", "Description"), text("timing", "Timings"), image()],
  },
  {
    key: "venues", label: "Venues", titleField: "name", noun: "venue",
    blank: { name: "New venue", size: "", capacity: "", types: "", image: "", forWeddings: false },
    fields: [
      text("name", "Venue name"), text("size", "Size"), text("capacity", "Capacity"), text("types", "Suitable for"), image(),
      { name: "forWeddings", label: "Available for weddings", type: "checkbox" },
    ],
  },
  {
    key: "amenities", label: "Wellness", titleField: "name", noun: "experience",
    blank: { name: "New experience", category: "", description: "", image: "" },
    fields: [text("name", "Name"), text("category", "Category"), area("description", "Description"), image()],
  },
  {
    key: "experiences", label: "Experiences", titleField: "title", noun: "experience",
    blank: { title: "New experience", label: "", text: "", image: "", to: "/gallery" },
    fields: [
      text("title", "Title"), text("label", "Small heading"), area("text", "Description"), image(),
      { name: "to", label: "Links to page", type: "select", required: true, options: ["/stay", "/dining", "/weddings", "/events", "/wellness", "/tour", "/gallery", "/contact"] },
    ],
  },
  {
    key: "gallery", label: "Gallery", titleField: "title", noun: "photo",
    blank: { category: "Hotel", image: "", title: "New photo" },
    fields: [
      text("title", "Caption"), image(),
      { name: "category", label: "Category", type: "select", required: true, options: ["Hotel", "Rooms", "Dining", "Weddings", "Events", "Wellness"] },
    ],
  },
  {
    key: "tour", label: "360° tour", titleField: "label", noun: "location",
    blank: { id: "", label: "New location", area: "", description: "", image: "", hotspots: [] },
    fields: [text("label", "Location name"), text("area", "Area"), area("description", "Description"), image("image", "Photo or 360° image")],
  },
  {
    key: "contact", label: "Contact details", single: true, titleField: "name", noun: "contact details",
    blank: {},
    fields: [
      text("name", "Hotel name"), { name: "addressLines", label: "Address", type: "lines", required: true, help: "One line per row" },
      text("phone", "Phone (as shown)"), text("phoneHref", "Phone link", true, "For example tel:+912812480000"),
      text("email", "Email"), text("reception", "Reception hours"), text("checkIn", "Check-in time"), text("checkOut", "Check-out time"), text("mapsUrl", "Google Maps link"),
    ],
  },
];
