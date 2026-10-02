// All website content lives here in plain, typed structures.
// Later, each export can be replaced by data fetched from an admin panel / API
// without touching any page or component.

export const withWidth = (url: string, width: number) => url.replace(/w=\d+/, `w=${width}`);

// Local photos in /public/images/ folder
const L = (name: string) => `/images/${name}`;

export const HOTEL_IMAGES = {
  lobby:          L('hotel_lobby.jpg'),
  standard:       L('hotel_room.jpg'),
  superior:       L('hotel_room.jpg'),
  clubSelect:     L('hotel_room.jpg'),
  clubDeluxe:     L('hotel_room.jpg'),
  executive:      L('hotel_room.jpg'),
  presidential:   L('hotel_building.jpg'),
  imperial:       L('hotel_building.jpg'),
  diningCourtyard:L('dining_courtyard.jpg'),
  diningSenso:    L('dining_senso.jpg'),
  diningInRoom:   L('dining_thali.jpg'),
  delicacy:       L('dining_delicacy.jpg'),
  wedding:        L('hotel_ballroom.jpg'),
  ballroom:       L('hotel_ballroom.jpg'),
  eventHall:      L('hotel_ballroom.jpg'),
  pool:           L('hotel_exterior.jpg'),
  spa:            L('hotel_exterior.jpg'),
  gym:            L('hotel_exterior.jpg'),
  massage:        L('hotel_exterior.jpg'),
} as const;

/* ---------------------------------- Navigation --------------------------------- */

export type NavLinkItem = { label: string; to: string };

export const NAV_LINKS: NavLinkItem[] = [
  { label: 'Stay', to: '/stay' },
  { label: 'Dining', to: '/dining' },
  { label: 'Weddings', to: '/weddings' },
  { label: 'Events', to: '/events' },
  { label: 'Wellness', to: '/wellness' },
  { label: '360° Tour', to: '/tour' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

export const FOOTER_EXTRA_LINKS: NavLinkItem[] = [{ label: 'Experiences', to: '/experiences' }];

/* ------------------------------------ Rooms ------------------------------------ */

export type Room = {
  name: string;
  slug: string;
  size: string;
  desc: string;
  longDesc: string;
  badge: string | null;
  featured: boolean;
  amenities: string[];
  images: string[];
};

export const ROOMS: Room[] = [
  { name: 'Superior Room', slug: 'superior-room', size: '~320 sq.ft', desc: 'Thoughtfully appointed with contemporary comforts, ideal for the discerning business or leisure traveller.', longDesc: 'A calm, considered retreat with thoughtful details and contemporary comforts. Warmly decorated with free Internet access, flat-screen TVs and minibars.', badge: null, featured: false, amenities: ['King bed', 'Complimentary Wi-Fi', 'Air conditioning', 'Flat-screen TV', 'Minibar', 'In-room safe'], images: [HOTEL_IMAGES.standard, HOTEL_IMAGES.superior, HOTEL_IMAGES.clubSelect] },
  { name: 'Club Deluxe Room', slug: 'club-deluxe-room', size: '~400 sq.ft', desc: 'Elevated in space and refined in detail, offering a generous retreat after a day of exploration.', longDesc: 'Upgraded rooms with sitting areas. Extra room to stretch out, premium furnishings, and Club access come together in a contemporary sanctuary designed for an unhurried stay.', badge: null, featured: false, amenities: ['King bed', 'Sitting area', 'Complimentary Wi-Fi', 'Air conditioning', 'Flat-screen TV', 'Minibar', 'In-room safe'], images: [HOTEL_IMAGES.clubDeluxe, HOTEL_IMAGES.standard, HOTEL_IMAGES.executive] },
  { name: 'Executive Suite', slug: 'executive-suite', size: '~650 sq.ft', desc: 'Dedicated living and dining areas with bespoke furnishings for extended stays.', longDesc: 'Suites add features such as separate living rooms and whirlpool baths. The Executive Suite pairs a gracious bedroom with a separate living area.', badge: 'Suite', featured: true, amenities: ['King bed', 'Separate living room', 'Whirlpool bath', 'Complimentary Wi-Fi', 'Air conditioning', 'Smart TV', 'Minibar', 'Room service'], images: [HOTEL_IMAGES.executive, HOTEL_IMAGES.presidential, HOTEL_IMAGES.imperial] },
  { name: 'Presidential Suite', slug: 'presidential-suite', size: '~1,200 sq.ft', desc: 'An exceptional expression of elegance with panoramic city views.', longDesc: 'A remarkable suite with expansive living spaces, considered service. The Presidential Suite makes room for both quiet moments and gracious entertaining.', badge: 'Premium', featured: true, amenities: ['King bed', 'Separate living room', 'Complimentary Wi-Fi', 'Smart TV', 'Minibar', 'Whirlpool bath', 'Room service'], images: [HOTEL_IMAGES.presidential, HOTEL_IMAGES.executive, HOTEL_IMAGES.imperial] },
  { name: 'Imperial Suite', slug: 'imperial-suite', size: '~2,000 sq.ft', desc: 'The pinnacle of palatial living: bespoke luxury, dedicated service, and timeless grandeur.', longDesc: 'A private world of palatial proportions, the Imperial Suite brings together bespoke details, generous entertaining spaces, and attentive service for a truly signature stay.', badge: 'Signature', featured: true, amenities: ['King bed', 'Butler service', 'Separate living room', 'Complimentary Wi-Fi', 'Smart TV', 'Minibar', 'Whirlpool bath', 'Room service'], images: [HOTEL_IMAGES.imperial, HOTEL_IMAGES.presidential, HOTEL_IMAGES.executive] },
];

/* ---------------------------------- Restaurants --------------------------------- */

export type Restaurant = { name: string; slug: string; category: string; description: string; timing: string; image: string };

export const RESTAURANTS: Restaurant[] = [
  { name: 'The Courtyard', slug: 'the-courtyard', category: 'Multi-cuisine restaurant', description: 'An upscale international restaurant offering Indian favourites and global flavours — from Gujarati Thali and Hyderabadi Biryani to continental delights. Served with warm palace hospitality.', timing: 'Daily · 7:00 am – 11:00 pm', image: HOTEL_IMAGES.diningCourtyard },
  { name: 'Stattus', slug: 'stattus', category: 'The regional appetite', description: 'Celebrating the rich culinary heritage of Gujarat and beyond. Signature dishes include our famous Gujarati Thali, an authentic taste of the region.', timing: 'Daily · 11:00 am – 11:00 pm', image: HOTEL_IMAGES.diningInRoom },
  { name: 'Senso', slug: 'senso', category: '24-hour coffee shop', description: 'A bright, welcoming coffee shop for a leisurely breakfast, a quick bite, or a late-night conversation. From Mexican Burgers to Dragon Rolls, Senso serves round the clock.', timing: 'Open 24 hours', image: HOTEL_IMAGES.diningSenso },
  { name: 'Delicacy', slug: 'delicacy', category: 'The cake shop', description: 'Freshly prepared pastries, delicate cakes, and sweet treats made for gifting or a small indulgence. Specialty birthday and occasion cakes available.', timing: 'Daily · 10:00 am – 10:00 pm', image: HOTEL_IMAGES.delicacy },
];

/* ------------------------------------ Venues ----------------------------------- */

export type Venue = { name: string; size: string; capacity: string; types: string; image: string; forWeddings: boolean };

export const VENUES: Venue[] = [
  { name: 'Regent Room', size: '8,000 sq.ft', capacity: 'Up to 800 guests', types: 'Weddings · Galas · Conferences', image: HOTEL_IMAGES.ballroom, forWeddings: true },
  { name: 'Regal Room', size: '4,500 sq.ft', capacity: 'Up to 450 guests', types: 'Receptions · Social celebrations · Birthday parties', image: HOTEL_IMAGES.eventHall, forWeddings: true },
  { name: 'Pool Deck', size: 'Open-air setting', capacity: 'Up to 250 guests', types: 'Cocktail evenings · Celebrations', image: HOTEL_IMAGES.pool, forWeddings: true },
  { name: 'The Courtyard', size: '3,200 sq.ft', capacity: 'Up to 300 guests', types: 'Private dining · Family gatherings', image: HOTEL_IMAGES.diningCourtyard, forWeddings: false },
  { name: 'Meeting Suite', size: '1,200 sq.ft', capacity: 'Up to 100 guests', types: 'Board meetings · Workshops · Corporate meetings', image: HOTEL_IMAGES.lobby, forWeddings: false },
];

/* ----------------------------------- Amenities ---------------------------------- */

export type Amenity = { name: string; category: string; description: string; image: string };

export const AMENITIES: Amenity[] = [
  { name: 'Fitness', category: 'Fitness studio', description: 'A welcoming, well-equipped space to keep your routine moving while you travel.', image: HOTEL_IMAGES.gym },
  { name: 'Swimming Pool', category: 'Outdoor escape', description: 'Take a refreshing dip or linger poolside in the sunshine. Outdoor pool with a poolside bar.', image: HOTEL_IMAGES.pool },
  { name: 'Steam Bath', category: 'Rest & restore', description: 'Slow down in a soothing steam experience designed to leave you feeling renewed.', image: HOTEL_IMAGES.spa },
  { name: 'Jacuzzi', category: 'Warm relaxation', description: 'Hot tub — unwind in warm, bubbling water and let the pace of the day gently fade away.', image: HOTEL_IMAGES.pool },
  { name: 'Massage', category: 'Therapeutic care', description: 'Restore your sense of ease with a relaxing treatment tailored to your needs.', image: HOTEL_IMAGES.massage },
  { name: 'Aroma Therapy', category: 'Sensory ritual', description: 'A calming aromatic ritual pairs gentle care with a quiet moment to yourself.', image: HOTEL_IMAGES.spa },
];

/* ---------------------------------- Experiences --------------------------------- */

export type Experience = { title: string; label: string; text: string; image: string; to: string };

export const EXPERIENCES: Experience[] = [
  { title: 'Grand Celebrations', label: 'A place to celebrate', text: 'From birthdays to weddings — celebrate in style. Perfect venues, exceptional cuisine, timeless celebrations.', image: HOTEL_IMAGES.ballroom, to: '/weddings' },
  { title: 'The Courtyard', label: 'A table for every hour', text: 'Indulge in a multi-cuisine feast at The Courtyard — from Gujarati Thali to global flavours.', image: HOTEL_IMAGES.diningCourtyard, to: '/dining' },
  { title: 'Poolside Retreat', label: 'A refreshing escape', text: 'Take a dip, bask in the sun, and enjoy a quieter side of the city by our outdoor pool.', image: HOTEL_IMAGES.pool, to: '/wellness' },
  { title: 'Celebrity Visits', label: 'The art of occasion', text: 'A landmark address for celebrated guests. The Imperial Palace has hosted cricket stars, Bollywood celebrities and more.', image: HOTEL_IMAGES.lobby, to: '/gallery' },
  { title: '20 Years of Excellence', label: '15 November 2004 – 2024', text: 'Celebrating two decades of outstanding hospitality, exceptional cuisine, and timeless elegance in the heart of Rajkot.', image: HOTEL_IMAGES.exterior ?? HOTEL_IMAGES.lobby, to: '/gallery' },
];

/* ------------------------------------ Gallery ----------------------------------- */

export const GALLERY_CATEGORIES = ['All', 'Hotel', 'Rooms', 'Dining', 'Weddings', 'Events', 'Wellness'] as const;
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];
export type GalleryItem = { category: Exclude<GalleryCategory, 'All'>; image: string; title: string };

export const GALLERY: GalleryItem[] = [
  { category: 'Hotel', image: HOTEL_IMAGES.lobby, title: 'The Grand Lobby' },
  { category: 'Hotel', image: L('hotel_exterior.jpg'), title: 'Hotel Exterior' },
  { category: 'Rooms', image: HOTEL_IMAGES.standard, title: 'Superior Room' },
  { category: 'Rooms', image: HOTEL_IMAGES.executive, title: 'Executive Suite' },
  { category: 'Dining', image: L('dining_courtyard.jpg'), title: 'Chole Puri' },
  { category: 'Dining', image: L('dining_senso.jpg'), title: 'Mexican Burger – Senso' },
  { category: 'Dining', image: L('dining_thali.jpg'), title: 'Gujarati Thali' },
  { category: 'Dining', image: L('dining_delicacy.jpg'), title: 'Birthday Cake – Delicacy' },
  { category: 'Dining', image: L('food_biryani.jpg'), title: 'Hyderabadi Biryani' },
  { category: 'Dining', image: L('food_sizzler.jpg'), title: 'Classic Veg Sizzler' },
  { category: 'Dining', image: L('food_kabab.jpg'), title: 'Hara Bhara Kabab' },
  { category: 'Dining', image: L('food_noodles.jpg'), title: 'Exotic Hakka Noodles' },
  { category: 'Dining', image: L('food_dragon_roll.jpg'), title: 'Dragon Roll' },
  { category: 'Dining', image: L('food_paneer.jpg'), title: 'Paneer Sabji & Naan' },
  { category: 'Weddings', image: HOTEL_IMAGES.ballroom, title: 'Grand Ballroom' },
  { category: 'Events', image: HOTEL_IMAGES.eventHall, title: 'Corporate Event' },
  { category: 'Events', image: L('celebrity_01.jpg'), title: 'Celebrity Visit' },
  { category: 'Wellness', image: HOTEL_IMAGES.pool, title: 'Poolside' },
];

/* ---------------------------------- 360° tour ----------------------------------- */

export type TourHotspot = { to: string; label: string; x: number; y: number };
export type TourLocation = { id: string; label: string; area: string; description: string; image: string; hotspots: TourHotspot[] };

export const TOUR_LOCATIONS: TourLocation[] = [
  { id: 'lobby', label: 'Grand Lobby', area: 'Arrival', description: 'The first impression: a warm, high-ceilinged welcome.', image: HOTEL_IMAGES.lobby, hotspots: [{ to: 'courtyard', label: 'The Courtyard', x: 26, y: 60 }, { to: 'guest-rooms', label: 'Guest Rooms', x: 56, y: 46 }, { to: 'regent-room', label: 'Regent Room', x: 82, y: 62 }] },
  { id: 'guest-rooms', label: 'Guest Rooms', area: 'Stay', description: 'A private, quiet retreat above the city.', image: HOTEL_IMAGES.executive, hotspots: [{ to: 'lobby', label: 'Lobby', x: 22, y: 56 }, { to: 'pool', label: 'Pool Deck', x: 72, y: 44 }] },
  { id: 'regent-room', label: 'Regent Room', area: 'Weddings & events', description: 'Our grand ballroom for celebrations and galas.', image: HOTEL_IMAGES.ballroom, hotspots: [{ to: 'lobby', label: 'Lobby', x: 20, y: 58 }, { to: 'regal-room', label: 'Regal Room', x: 76, y: 52 }] },
  { id: 'regal-room', label: 'Regal Room', area: 'Weddings & events', description: 'An elegant hall for receptions and gatherings.', image: HOTEL_IMAGES.eventHall, hotspots: [{ to: 'regent-room', label: 'Regent Room', x: 24, y: 54 }, { to: 'courtyard', label: 'The Courtyard', x: 74, y: 60 }] },
  { id: 'pool', label: 'Pool Deck', area: 'Wellness', description: 'Open-air calm, poolside.', image: HOTEL_IMAGES.pool, hotspots: [{ to: 'guest-rooms', label: 'Guest Rooms', x: 30, y: 46 }, { to: 'lobby', label: 'Lobby', x: 78, y: 58 }] },
  { id: 'courtyard', label: 'The Courtyard', area: 'Dining', description: 'All-day dining in a relaxed, open setting.', image: HOTEL_IMAGES.diningCourtyard, hotspots: [{ to: 'lobby', label: 'Lobby', x: 24, y: 58 }, { to: 'regal-room', label: 'Regal Room', x: 76, y: 50 }] },
];

/* -------------------------------- Contact information --------------------------- */

export const CONTACT_INFORMATION = {
  name: 'The Imperial Palace',
  addressLines: ['Dr. Yagnik Rd, Jagnath Plot', 'Rajkot, Gujarat 360001', 'India'],
  phone: '+91 281 248 0000',
  phoneHref: 'tel:+912812480000',
  email: 'reservations@theimperialpalace.biz',
  reception: '24 hours, 7 days',
  checkIn: '2:00 PM',
  checkOut: '12:00 PM',
  mapsUrl: 'https://maps.google.com/?q=The+Imperial+Palace+Rajkot+Dr+Yagnik+Road',
  distances: [
    { label: 'Airport', distance: '33 kms', note: '50 mins · Rajkot Airport' },
    { label: 'Railway Station', distance: '2.8 kms', note: '5 mins · Rajkot Junction' },
    { label: 'Bus Station', distance: '1.9 kms', note: '4 mins' },
  ],
} as const;
