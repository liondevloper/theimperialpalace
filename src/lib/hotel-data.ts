// All website content lives here in plain, typed structures.
// Later, each export can be replaced by data fetched from an admin panel / API
// without touching any page or component.

export const withWidth = (url: string, width: number) => url.replace(/w=\d+/, `w=${width}`);

const U = (id: string, w = 1000, q = 80) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=${w}&q=${q}`;

export const HOTEL_IMAGES = {
  lobby: U("photo-1782113268782-202ccef98e50", 1200),
  standard: U("photo-1758194090785-8e09b7288199"),
  superior: U("photo-1774916698642-258ea43637e9"),
  clubSelect: U("photo-1758194190679-198a77cba84f"),
  clubDeluxe: U("photo-1772537507935-065b8aba4df5"),
  executive: U("photo-1782854356665-000b01a48016"),
  presidential: U("photo-1758802416783-af30c485fbe1"),
  imperial: U("photo-1767395523614-53f52709c37a"),
  diningCourtyard: U("photo-1741852197045-cc35920a3aa0"),
  diningSenso: U("photo-1785845506893-70768a28ba44"),
  diningInRoom: U("photo-1768397003905-a202ea6325f5"),
  delicacy: U("photo-1781181727460-ccd6962647d4"),
  wedding: U("photo-1779308936221-89739e035a53", 1600, 85),
  ballroom: U("photo-1780593116478-c46838f86523"),
  eventHall: U("photo-1775918427144-51f0bf53f8c4"),
  pool: U("photo-1769149255670-aa0ad6428dd6"),
  spa: U("photo-1745327883290-1e9c6447b938"),
  gym: U("photo-1693578538512-fc66f318c833"),
  massage: U("photo-1787651343620-8d5303006ecb"),
} as const;

/* ---------------------------------- Navigation --------------------------------- */

export type NavLinkItem = { label: string; to: string };

export const NAV_LINKS: NavLinkItem[] = [
  { label: "Stay", to: "/stay" },
  { label: "Dining", to: "/dining" },
  { label: "Weddings", to: "/weddings" },
  { label: "Events", to: "/events" },
  { label: "Wellness", to: "/wellness" },
  { label: "360° Tour", to: "/tour" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

export const FOOTER_EXTRA_LINKS: NavLinkItem[] = [{ label: "Experiences", to: "/experiences" }];

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
  { name: "Standard Room", slug: "standard-room", size: "~280 sq.ft", desc: "Thoughtfully appointed with contemporary comforts, ideal for the discerning business or leisure traveller.", longDesc: "A calm, considered retreat with thoughtful details and contemporary comforts. The Standard Room offers a welcoming place to unwind, work, and restore your sense of balance in the heart of Rajkot.", badge: null, featured: false, amenities: ["King bed", "Complimentary Wi-Fi", "Air conditioning", "Smart TV", "Minibar", "In-room safe"], images: [HOTEL_IMAGES.standard, HOTEL_IMAGES.superior, HOTEL_IMAGES.clubSelect] },
  { name: "Superior Room", slug: "superior-room", size: "~320 sq.ft", desc: "Elevated in space and refined in detail, offering a generous retreat after a day of exploration.", longDesc: "Settle into a more generous sanctuary, finished with warm textures and quietly elegant furnishings. A considered mix of space and service makes the Superior Room an inviting base for a Rajkot stay.", badge: null, featured: false, amenities: ["King bed", "Complimentary Wi-Fi", "Air conditioning", "Smart TV", "Minibar", "In-room safe"], images: [HOTEL_IMAGES.superior, HOTEL_IMAGES.standard, HOTEL_IMAGES.clubDeluxe] },
  { name: "Club Select Room", slug: "club-select-room", size: "~360 sq.ft", desc: "Club floor access with a curated selection of privileges and thoughtful comforts.", longDesc: "A refined Club-floor hideaway for guests who appreciate an elevated sense of privacy. Enjoy a polished room, premium amenities, and the thoughtful privileges that make every stay feel personal.", badge: "Club Floor", featured: false, amenities: ["King bed", "Club lounge access", "Complimentary Wi-Fi", "Air conditioning", "Smart TV", "Minibar", "In-room safe"], images: [HOTEL_IMAGES.clubSelect, HOTEL_IMAGES.clubDeluxe, HOTEL_IMAGES.executive] },
  { name: "Club Deluxe Room", slug: "club-deluxe-room", size: "~400 sq.ft", desc: "A spacious sanctuary with premium furnishings and full Club access.", longDesc: "Extra room to stretch out, premium furnishings, and Club access come together in a contemporary sanctuary designed for an unhurried stay.", badge: "Club Floor", featured: false, amenities: ["King bed", "Club lounge access", "Complimentary Wi-Fi", "Air conditioning", "Smart TV", "Minibar", "Bathtub"], images: [HOTEL_IMAGES.clubDeluxe, HOTEL_IMAGES.clubSelect, HOTEL_IMAGES.presidential] },
  { name: "Executive Suite", slug: "executive-suite", size: "~650 sq.ft", desc: "Dedicated living and dining areas with bespoke furnishings for extended stays.", longDesc: "The Executive Suite pairs a gracious bedroom with a separate living area, creating a versatile private residence for work, relaxation, and longer stays.", badge: "Suite", featured: true, amenities: ["King bed", "Separate living room", "Complimentary Wi-Fi", "Air conditioning", "Smart TV", "Minibar", "Bathtub", "Room service"], images: [HOTEL_IMAGES.executive, HOTEL_IMAGES.presidential, HOTEL_IMAGES.imperial] },
  { name: "Presidential Suite", slug: "presidential-suite", size: "~1,200 sq.ft", desc: "An exceptional expression of elegance with private terrace and city panoramas.", longDesc: "A remarkable suite with expansive living spaces, considered service, and a private terrace. The Presidential Suite makes room for both quiet moments and gracious entertaining.", badge: "Premium", featured: true, amenities: ["King bed", "Private terrace", "Separate living room", "Complimentary Wi-Fi", "Smart TV", "Minibar", "Bathtub", "Room service"], images: [HOTEL_IMAGES.presidential, HOTEL_IMAGES.executive, HOTEL_IMAGES.imperial] },
  { name: "Imperial Suite", slug: "imperial-suite", size: "~2,000 sq.ft", desc: "The pinnacle of palatial living: bespoke luxury, dedicated service, and timeless grandeur.", longDesc: "A private world of palatial proportions, the Imperial Suite brings together bespoke details, generous entertaining spaces, and attentive service for a truly signature stay.", badge: "Signature", featured: true, amenities: ["King bed", "Private terrace", "Dedicated butler service", "Separate living room", "Complimentary Wi-Fi", "Smart TV", "Minibar", "Bathtub"], images: [HOTEL_IMAGES.imperial, HOTEL_IMAGES.presidential, HOTEL_IMAGES.executive] },
];

/* ---------------------------------- Restaurants --------------------------------- */

export type Restaurant = { name: string; slug: string; category: string; description: string; timing: string; image: string };

export const RESTAURANTS: Restaurant[] = [
  { name: "The Courtyard", slug: "the-courtyard", category: "Multi-cuisine", description: "An inviting all-day destination for Indian favourites and global flavours, served with relaxed palace hospitality.", timing: "Daily · 7:00 am – 11:00 pm", image: HOTEL_IMAGES.diningCourtyard },
  { name: "Senso", slug: "senso", category: "24-hour coffee shop", description: "A bright, welcoming coffee shop for a leisurely breakfast, a quick bite, or a late-night conversation.", timing: "Open 24 hours", image: HOTEL_IMAGES.diningSenso },
  { name: "Delicacy", slug: "delicacy", category: "Patisserie & bakery", description: "Freshly prepared pastries, delicate cakes, and sweet treats made for gifting or a small indulgence.", timing: "Daily · 10:00 am – 10:00 pm", image: HOTEL_IMAGES.delicacy },
  { name: "In-Room Dining", slug: "in-room-dining", category: "Private dining", description: "A thoughtfully prepared selection of favourites, delivered to the comfort and privacy of your room.", timing: "Available 24 hours", image: HOTEL_IMAGES.diningInRoom },
];

/* ------------------------------------ Venues ----------------------------------- */

export type Venue = { name: string; size: string; capacity: string; types: string; image: string; forWeddings: boolean };

export const VENUES: Venue[] = [
  { name: "Regent Room", size: "8,000 sq.ft", capacity: "Up to 800 guests", types: "Weddings · Galas · Conferences", image: HOTEL_IMAGES.ballroom, forWeddings: true },
  { name: "Regal Room", size: "4,500 sq.ft", capacity: "Up to 450 guests", types: "Receptions · Social celebrations", image: HOTEL_IMAGES.eventHall, forWeddings: true },
  { name: "Pool Deck", size: "Open-air setting", capacity: "Up to 250 guests", types: "Cocktail evenings · Celebrations", image: HOTEL_IMAGES.pool, forWeddings: true },
  { name: "The Courtyard", size: "3,200 sq.ft", capacity: "Up to 300 guests", types: "Private dining · Gatherings", image: HOTEL_IMAGES.diningCourtyard, forWeddings: false },
  { name: "Meeting Suite", size: "1,200 sq.ft", capacity: "Up to 100 guests", types: "Board meetings · Workshops", image: HOTEL_IMAGES.lobby, forWeddings: false },
];

/* ----------------------------------- Amenities ---------------------------------- */

export type Amenity = { name: string; category: string; description: string; image: string };

export const AMENITIES: Amenity[] = [
  { name: "Fitness", category: "Fitness studio", description: "A welcoming, well-equipped space to keep your routine moving while you travel.", image: HOTEL_IMAGES.gym },
  { name: "Swimming Pool", category: "Outdoor escape", description: "Take a refreshing dip or linger poolside in the sunshine between city adventures.", image: HOTEL_IMAGES.pool },
  { name: "Steam Bath", category: "Rest & restore", description: "Slow down in a soothing steam experience designed to leave you feeling renewed.", image: HOTEL_IMAGES.spa },
  { name: "Jacuzzi", category: "Warm relaxation", description: "Unwind in warm, bubbling water and let the pace of the day gently fade away.", image: HOTEL_IMAGES.pool },
  { name: "Massage", category: "Therapeutic care", description: "Restore your sense of ease with a relaxing treatment tailored to your needs.", image: HOTEL_IMAGES.massage },
  { name: "Aroma Therapy", category: "Sensory ritual", description: "A calming aromatic ritual pairs gentle care with a quiet moment to yourself.", image: HOTEL_IMAGES.spa },
  { name: "Body Treatments", category: "Signature treatments", description: "Discover restorative treatments that leave you feeling balanced and refreshed.", image: HOTEL_IMAGES.massage },
];

/* ---------------------------------- Experiences --------------------------------- */

export type Experience = { title: string; label: string; text: string; image: string; to: string };

export const EXPERIENCES: Experience[] = [
  { title: "Mayfair", label: "A place to celebrate", text: "A gracious setting for celebrations, evenings together, and moments worth gathering for.", image: HOTEL_IMAGES.wedding, to: "/weddings" },
  { title: "Outlook", label: "A change of perspective", text: "Pause by the water and settle into the easy pace of an afternoon well spent.", image: HOTEL_IMAGES.pool, to: "/wellness" },
  { title: "Invogue", label: "The art of occasion", text: "Discover the small details and polished touches that make a palace stay distinctive.", image: HOTEL_IMAGES.lobby, to: "/gallery" },
  { title: "Fitness Studio", label: "Keep your rhythm", text: "Make time for your routine in a welcoming, well-equipped fitness space.", image: HOTEL_IMAGES.gym, to: "/wellness" },
  { title: "Swimming Pool", label: "A refreshing escape", text: "Take a dip, bask in the sun, and enjoy a quieter side of the city.", image: HOTEL_IMAGES.pool, to: "/wellness" },
];

/* ------------------------------------ Gallery ----------------------------------- */

export const GALLERY_CATEGORIES = ["All", "Hotel", "Rooms", "Dining", "Weddings", "Events", "Wellness"] as const;
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];
export type GalleryItem = { category: Exclude<GalleryCategory, "All">; image: string; title: string };

export const GALLERY: GalleryItem[] = [
  { category: "Hotel", image: HOTEL_IMAGES.lobby, title: "The welcome" },
  { category: "Rooms", image: HOTEL_IMAGES.standard, title: "Standard Room" },
  { category: "Rooms", image: HOTEL_IMAGES.superior, title: "Superior Room" },
  { category: "Rooms", image: HOTEL_IMAGES.clubSelect, title: "Club Select" },
  { category: "Rooms", image: HOTEL_IMAGES.clubDeluxe, title: "Club Deluxe" },
  { category: "Rooms", image: HOTEL_IMAGES.executive, title: "Executive Suite" },
  { category: "Rooms", image: HOTEL_IMAGES.presidential, title: "Presidential Suite" },
  { category: "Rooms", image: HOTEL_IMAGES.imperial, title: "Imperial Suite" },
  { category: "Dining", image: HOTEL_IMAGES.diningCourtyard, title: "The Courtyard" },
  { category: "Dining", image: HOTEL_IMAGES.diningSenso, title: "Senso" },
  { category: "Dining", image: HOTEL_IMAGES.diningInRoom, title: "In-Room Dining" },
  { category: "Dining", image: HOTEL_IMAGES.delicacy, title: "Delicacy" },
  { category: "Weddings", image: HOTEL_IMAGES.wedding, title: "A day to remember" },
  { category: "Events", image: HOTEL_IMAGES.ballroom, title: "Regent Room" },
  { category: "Events", image: HOTEL_IMAGES.eventHall, title: "Regal Room" },
  { category: "Wellness", image: HOTEL_IMAGES.pool, title: "Poolside pause" },
  { category: "Wellness", image: HOTEL_IMAGES.spa, title: "Rest and restore" },
  { category: "Wellness", image: HOTEL_IMAGES.gym, title: "Fitness" },
  { category: "Wellness", image: HOTEL_IMAGES.massage, title: "Therapeutic care" },
];

/* ---------------------------------- 360° tour ----------------------------------- */

export type TourHotspot = { to: string; label: string; x: number; y: number };
export type TourLocation = { id: string; label: string; area: string; description: string; image: string; hotspots: TourHotspot[] };

// `image` is a still photo today. Swap in an equirectangular 360° image later; hotspots stay as they are.
export const TOUR_LOCATIONS: TourLocation[] = [
  { id: "lobby", label: "Grand Lobby", area: "Arrival", description: "The first impression: a warm, high-ceilinged welcome.", image: HOTEL_IMAGES.lobby, hotspots: [{ to: "courtyard", label: "The Courtyard", x: 26, y: 60 }, { to: "guest-rooms", label: "Guest Rooms", x: 56, y: 46 }, { to: "regent-room", label: "Regent Room", x: 82, y: 62 }] },
  { id: "guest-rooms", label: "Guest Rooms", area: "Stay", description: "A private, quiet retreat above the city.", image: HOTEL_IMAGES.executive, hotspots: [{ to: "lobby", label: "Lobby", x: 22, y: 56 }, { to: "pool", label: "Pool Deck", x: 72, y: 44 }] },
  { id: "regent-room", label: "Regent Room", area: "Weddings & events", description: "Our grand ballroom for celebrations and galas.", image: HOTEL_IMAGES.ballroom, hotspots: [{ to: "lobby", label: "Lobby", x: 20, y: 58 }, { to: "regal-room", label: "Regal Room", x: 76, y: 52 }] },
  { id: "regal-room", label: "Regal Room", area: "Weddings & events", description: "An elegant hall for receptions and gatherings.", image: HOTEL_IMAGES.eventHall, hotspots: [{ to: "regent-room", label: "Regent Room", x: 24, y: 54 }, { to: "courtyard", label: "The Courtyard", x: 74, y: 60 }] },
  { id: "pool", label: "Pool Deck", area: "Wellness", description: "Open-air calm, poolside.", image: HOTEL_IMAGES.pool, hotspots: [{ to: "guest-rooms", label: "Guest Rooms", x: 30, y: 46 }, { to: "lobby", label: "Lobby", x: 78, y: 58 }] },
  { id: "courtyard", label: "The Courtyard", area: "Dining", description: "All-day dining in a relaxed, open setting.", image: HOTEL_IMAGES.diningCourtyard, hotspots: [{ to: "lobby", label: "Lobby", x: 24, y: 58 }, { to: "regal-room", label: "Regal Room", x: 76, y: 50 }] },
];

/* -------------------------------- Contact information --------------------------- */

export const CONTACT_INFORMATION = {
  name: "The Imperial Palace",
  addressLines: ["Dr. Yagnik Road", "Rajkot 360001", "Gujarat, India"],
  phone: "+91 281 248 0000",
  phoneHref: "tel:+912812480000",
  email: "reservations@imperialpalace.in",
  reception: "24 hours, 7 days",
  checkIn: "2:00 PM",
  checkOut: "12:00 PM",
  mapsUrl: "https://maps.google.com/?q=The+Imperial+Palace+Rajkot",
  distances: [
    { label: "Airport", distance: "~8 km", note: "Rajkot Airport" },
    { label: "Railway", distance: "~3 km", note: "Rajkot Junction" },
    { label: "City centre", distance: "~1 km", note: "Dr. Yagnik Road" },
  ],
} as const;
