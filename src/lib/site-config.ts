// Central site configuration. Replace placeholder values here; nothing else needs to change.
export const SITE = {
  name: "The Imperial Palace",
  city: "Rajkot",
  tagline: "Where Elegance Meets Rajkot",
  // Placeholder domain for canonical / structured data until the real one is known.
  url: "https://www.example.com",
  description:
    "The Imperial Palace, Rajkot: a 5-star hotel for refined stays, considered dining, grand weddings, corporate events and warm Gujarati hospitality.",
} as const;

// PLACEHOLDER number (country code + number, digits only). Replace with the hotel's WhatsApp number.
export const WHATSAPP = {
  number: "910000000000",
  message: "Hello, I would like to know more about The Imperial Palace, Rajkot.",
} as const;

export const whatsappUrl = (message: string = WHATSAPP.message) =>
  `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(message)}`;

export const pageTitle = (title: string) => `${title} | ${SITE.name} ${SITE.city}`;

export const THANK_YOU = "Thank you for your enquiry.";
export const DEMO_DISCLAIMER =
  "This is a demonstration form and is not connected to a live booking system.";

export const TOUR_NOTE =
  "Demonstration using still photography. Professional 360° photography can be dropped in later; the hotspots, labels, zoom and navigation shown here stay exactly as they are.";
