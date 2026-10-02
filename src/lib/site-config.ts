// Central site configuration.
export const SITE = {
  name: 'The Imperial Palace',
  city: 'Rajkot',
  tagline: 'Where Elegance Meets Rajkot',
  url: 'https://www.theimperialpalace.biz',
  description:
    'The Imperial Palace, Rajkot: a 5-star hotel for refined stays, considered dining, grand weddings, corporate events and warm Gujarati hospitality. Dr. Yagnik Road, Jagnath Plot, Rajkot 360001.',
} as const;

// Real WhatsApp number: 0281 248 0000 main, 09099500007 alternate
export const WHATSAPP = {
  number: '919099500007',
  message: 'Hello, I would like to know more about The Imperial Palace, Rajkot.',
} as const;

export const whatsappUrl = (message: string = WHATSAPP.message) =>
  `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(message)}`;

export const pageTitle = (title: string) => `${title} | ${SITE.name} ${SITE.city}`;

export const THANK_YOU = 'Thank you for your enquiry.';
export const DEMO_DISCLAIMER =
  'This is a demonstration form and is not connected to a live booking system.';

export const TOUR_NOTE =
  'Demonstration using still photography. Professional 360° photography can be dropped in later; the hotspots, labels, zoom and navigation shown here stay exactly as they are.';
