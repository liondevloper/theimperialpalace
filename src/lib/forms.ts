import { AMENITIES, RESTAURANTS, ROOMS, VENUES } from "./hotel-data.ts";

export type FieldType = "text" | "email" | "tel" | "date" | "number" | "select" | "textarea";
export type FormField = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  wide?: boolean;
  min?: number;
};
export type EnquiryKind = "booking" | "wedding" | "event" | "contact" | "dining" | "wellness";
export type FormConfig = { title: string; subtitle: string; submitLabel: string; fields: FormField[] };

const NAME: FormField = { name: "name", label: "Full name", type: "text", required: true, placeholder: "John Smith" };
const EMAIL: FormField = { name: "email", label: "Email", type: "email", required: true, placeholder: "example@gmail.com" };
const PHONE: FormField = { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "+91 98765 43210" };
const message = (placeholder: string): FormField => ({ name: "message", label: "Message", type: "textarea", placeholder, wide: true });
const guests = (label = "Guests"): FormField => ({ name: "guests", label, type: "number", required: true, placeholder: "2", min: 1 });

export const FORM_CONFIGS: Record<EnquiryKind, FormConfig> = {
  booking: {
    title: "Booking enquiry",
    subtitle: "Share your dates and preferences and our reservations team will respond.",
    submitLabel: "Send booking enquiry",
    fields: [NAME, EMAIL, PHONE, guests(),
      { name: "checkin", label: "Check-in", type: "date", required: true },
      { name: "checkout", label: "Check-out", type: "date", required: true },
      { name: "roomType", label: "Room type", type: "select", options: ["Any room type", ...ROOMS.map((r) => r.name)], wide: true },
      message("Tell us a little about your plans")],
  },
  wedding: {
    title: "Wedding enquiry",
    subtitle: "Share your vision and we will prepare a considered proposal.",
    submitLabel: "Request wedding proposal",
    fields: [NAME, EMAIL, PHONE, guests("Expected guests"),
      { name: "eventDate", label: "Preferred date", type: "date", required: true },
      { name: "venue", label: "Preferred venue", type: "select", options: VENUES.filter((v) => v.forWeddings).map((v) => v.name) },
      message("Ceremonies, décor, accommodation needs")],
  },
  event: {
    title: "Event enquiry",
    subtitle: "Tell us about your event and we will help bring it together.",
    submitLabel: "Send event enquiry",
    fields: [NAME, EMAIL, PHONE,
      { name: "company", label: "Company (optional)", type: "text", placeholder: "Company name" },
      { name: "eventType", label: "Event type", type: "select", options: ["Conference", "Board meeting", "Social celebration", "Gala dinner", "Other"] },
      { name: "eventDate", label: "Preferred date", type: "date", required: true },
      guests("Expected guests"),
      { name: "venue", label: "Preferred venue", type: "select", options: VENUES.map((v) => v.name) },
      message("Format, timings, catering preferences")],
  },
  contact: {
    title: "Send an enquiry",
    subtitle: "Whether you are planning a stay or simply have a question, we would love to hear from you.",
    submitLabel: "Send message",
    fields: [NAME, EMAIL, PHONE,
      { name: "subject", label: "Subject", type: "select", options: ["Room reservation", "Dining reservation", "Wedding or event", "Wellness appointment", "General enquiry"] },
      { ...message("How can we help you?"), required: true }],
  },
  dining: {
    title: "Dining reservation",
    subtitle: "Let us know when you would like to visit.",
    submitLabel: "Request reservation",
    fields: [NAME, EMAIL, PHONE,
      { name: "restaurant", label: "Restaurant", type: "select", options: RESTAURANTS.map((r) => r.name) },
      { name: "date", label: "Date", type: "date", required: true },
      guests("Party size"),
      message("Dietary needs or special occasion")],
  },
  wellness: {
    title: "Wellness session",
    subtitle: "Tell us what you have in mind and we will help arrange your visit.",
    submitLabel: "Request session",
    fields: [NAME, EMAIL, PHONE,
      { name: "service", label: "Experience", type: "select", options: AMENITIES.map((a) => a.name) },
      { name: "date", label: "Preferred date", type: "date", required: true },
      message("Anything we should know")],
  },
};

/* ------------------------------- Validation helpers ------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s()-]{8,18}$/;

export function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function validate(fields: FormField[], values: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const field of fields) {
    const value = (values[field.name] ?? "").trim();
    const label = field.label.toLowerCase();
    if (!value) {
      if (field.required) errors[field.name] = `Please ${field.type === "select" ? "select" : "enter"} ${label}.`;
      continue;
    }
    if (field.type === "email" && !EMAIL_RE.test(value)) errors[field.name] = "Please enter a valid email address.";
    if (field.type === "tel" && (!PHONE_RE.test(value) || value.replace(/\D/g, "").length < 8)) errors[field.name] = "Please enter a valid phone number.";
    if (field.type === "number" && (!Number.isFinite(Number(value)) || Number(value) < (field.min ?? 1))) errors[field.name] = `Please enter at least ${field.min ?? 1}.`;
    if (field.type === "date" && value < todayIso()) errors[field.name] = "Please choose today or a later date.";
  }
  const { checkin, checkout } = values;
  if (checkin && checkout && !errors.checkout && checkout <= checkin) errors.checkout = "Check-out must be after check-in.";
  return errors;
}

function parseIso(iso: string): [number, number, number] {
  const [y, m, d] = iso.split("-").map(Number);
  return [y, m - 1, d];
}

export const formatDate = (iso: string) => {
  const [y, m, d] = parseIso(iso);
  return new Date(y, m, d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

export const nightsBetween = (from: string, to: string) =>
  Math.max(0, Math.round((Date.UTC(...parseIso(to)) - Date.UTC(...parseIso(from))) / 86_400_000));
