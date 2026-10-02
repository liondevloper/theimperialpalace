export type Room = {
  name: string;
  slug: string;
  size: string;
  desc: string;
  longDesc: string;
  badge: string | null;
  amenities: string[];
  images: string[];
};

export const HOTEL_IMAGES = {
  lobby: "https://images.unsplash.com/photo-1782113268782-202ccef98e50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80",
  standard: "https://images.unsplash.com/photo-1758194090785-8e09b7288199?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80",
  superior: "https://images.unsplash.com/photo-1774916698642-258ea43637e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80",
  clubSelect: "https://images.unsplash.com/photo-1758194190679-198a77cba84f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80",
  clubDeluxe: "https://images.unsplash.com/photo-1772537507935-065b8aba4df5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80",
  executive: "https://images.unsplash.com/photo-1782854356665-000b01a48016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80",
  presidential: "https://images.unsplash.com/photo-1758802416783-af30c485fbe1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80",
  imperial: "https://images.unsplash.com/photo-1767395523614-53f52709c37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80",
  diningCourtyard: "https://images.unsplash.com/photo-1741852197045-cc35920a3aa0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80",
  diningSenso: "https://images.unsplash.com/photo-1785845506893-70768a28ba44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80",
  diningInRoom: "https://images.unsplash.com/photo-1768397003905-a202ea6325f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80",
  delicacy: "https://images.unsplash.com/photo-1781181727460-ccd6962647d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80",
  wedding: "https://images.unsplash.com/photo-1779308936221-89739e035a53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=90",
  ballroom: "https://images.unsplash.com/photo-1780593116478-c46838f86523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80",
  eventHall: "https://images.unsplash.com/photo-1775918427144-51f0bf53f8c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80",
  pool: "https://images.unsplash.com/photo-1769149255670-aa0ad6428dd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80",
  spa: "https://images.unsplash.com/photo-1745327883290-1e9c6447b938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80",
  gym: "https://images.unsplash.com/photo-1693578538512-fc66f318c833?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80",
  massage: "https://images.unsplash.com/photo-1787651343620-8d5303006ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80",
} as const;

export const ROOMS: Room[] = [
  { name: "Standard Room", slug: "standard-room", size: "~280 sq.ft", desc: "Thoughtfully appointed with contemporary comforts, ideal for the discerning business or leisure traveller.", longDesc: "A calm, considered retreat with thoughtful details and contemporary comforts. The Standard Room offers a welcoming place to unwind, work, and restore your sense of balance in the heart of Rajkot.", badge: null, amenities: ["King Bed", "Complimentary Wi-Fi", "Air Conditioning", "Smart TV", "Minibar", "In-room Safe"], images: [HOTEL_IMAGES.standard, HOTEL_IMAGES.superior, HOTEL_IMAGES.clubSelect] },
  { name: "Superior Room", slug: "superior-room", size: "~320 sq.ft", desc: "Elevated in space and refined in detail, offering a generous retreat after a day of exploration.", longDesc: "Settle into a more generous sanctuary, finished with warm textures and quietly elegant furnishings. A considered mix of space and service makes the Superior Room an inviting base for a Rajkot stay.", badge: null, amenities: ["King Bed", "Complimentary Wi-Fi", "Air Conditioning", "Smart TV", "Minibar", "In-room Safe"], images: [HOTEL_IMAGES.superior, HOTEL_IMAGES.standard, HOTEL_IMAGES.clubDeluxe] },
  { name: "Club Select Room", slug: "club-select-room", size: "~360 sq.ft", desc: "Exclusive Club floor access with a curated selection of privileges and thoughtful comforts.", longDesc: "A refined Club-floor hideaway for guests who appreciate an elevated sense of privacy. Enjoy a polished room, premium amenities, and the thoughtful privileges that make every stay feel personal.", badge: "Club Floor", amenities: ["King Bed", "Club Lounge Access", "Complimentary Wi-Fi", "Air Conditioning", "Smart TV", "Minibar", "In-room Safe"], images: [HOTEL_IMAGES.clubSelect, HOTEL_IMAGES.clubDeluxe, HOTEL_IMAGES.executive] },
  { name: "Club Deluxe Room", slug: "club-deluxe-room", size: "~400 sq.ft", desc: "A spacious sanctuary with premium furnishings and full Club access.", longDesc: "Extra room to stretch out, premium furnishings, and Club access come together in a contemporary sanctuary designed for an unhurried stay.", badge: "Club Floor", amenities: ["King Bed", "Club Lounge Access", "Complimentary Wi-Fi", "Air Conditioning", "Smart TV", "Minibar", "Bathtub"], images: [HOTEL_IMAGES.clubDeluxe, HOTEL_IMAGES.clubSelect, HOTEL_IMAGES.presidential] },
  { name: "Executive Suite", slug: "executive-suite", size: "~650 sq.ft", desc: "Dedicated living and dining areas with bespoke furnishings for extended luxury stays.", longDesc: "The Executive Suite pairs a gracious bedroom with a separate living area, creating a versatile private residence for work, relaxation, and longer stays.", badge: "Suite", amenities: ["King Bed", "Separate Living Room", "Complimentary Wi-Fi", "Air Conditioning", "Smart TV", "Minibar", "Bathtub", "Room Service"], images: [HOTEL_IMAGES.executive, HOTEL_IMAGES.presidential, HOTEL_IMAGES.imperial] },
  { name: "Presidential Suite", slug: "presidential-suite", size: "~1,200 sq.ft", desc: "An exceptional expression of elegance with private terrace and city panoramas.", longDesc: "A remarkable suite with expansive living spaces, considered service, and a private terrace. The Presidential Suite makes room for both quiet moments and gracious entertaining.", badge: "Premium", amenities: ["King Bed", "Private Terrace", "Separate Living Room", "Complimentary Wi-Fi", "Smart TV", "Minibar", "Bathtub", "Room Service"], images: [HOTEL_IMAGES.presidential, HOTEL_IMAGES.executive, HOTEL_IMAGES.imperial] },
  { name: "Imperial Suite", slug: "imperial-suite", size: "~2,000 sq.ft", desc: "The pinnacle of palatial living: bespoke luxury, dedicated service, and timeless grandeur.", longDesc: "A private world of palatial proportions, the Imperial Suite brings together bespoke details, generous entertaining spaces, and attentive service for a truly signature stay.", badge: "Signature", amenities: ["King Bed", "Private Terrace", "Dedicated Butler Service", "Separate Living Room", "Complimentary Wi-Fi", "Smart TV", "Minibar", "Bathtub"], images: [HOTEL_IMAGES.imperial, HOTEL_IMAGES.presidential, HOTEL_IMAGES.executive] },
];

export const DINING_VENUES = [
  { name: "The Courtyard", category: "Multi-cuisine", description: "An inviting all-day destination for Indian favourites and global flavours, served with relaxed palace hospitality.", timing: "Daily · 7:00 am – 11:00 pm", image: HOTEL_IMAGES.diningCourtyard },
  { name: "Senso", category: "24-hour coffee shop", description: "A bright, welcoming coffee shop for a leisurely breakfast, a quick bite, or a late-night conversation.", timing: "Open 24 hours", image: HOTEL_IMAGES.diningSenso },
  { name: "Delicacy", category: "Patisserie & bakery", description: "Freshly prepared pastries, delicate cakes, and sweet treats made for gifting or a small indulgence.", timing: "Daily · 10:00 am – 10:00 pm", image: HOTEL_IMAGES.delicacy },
  { name: "In-Room Dining", category: "Private dining", description: "A thoughtfully prepared selection of favourites, delivered to the comfort and privacy of your room.", timing: "Available 24 hours", image: HOTEL_IMAGES.diningInRoom },
];

export const EVENT_VENUES = [
  { name: "Regent Room", size: "8,000 sq.ft", capacity: "Up to 800 guests", types: "Weddings · Galas · Conferences", image: HOTEL_IMAGES.ballroom },
  { name: "Regal Room", size: "4,500 sq.ft", capacity: "Up to 450 guests", types: "Receptions · Social celebrations", image: HOTEL_IMAGES.eventHall },
  { name: "Pool Deck", size: "Open-air setting", capacity: "Up to 250 guests", types: "Cocktail evenings · Celebrations", image: HOTEL_IMAGES.pool },
  { name: "The Courtyard", size: "3,200 sq.ft", capacity: "Up to 300 guests", types: "Private dining · Gatherings", image: HOTEL_IMAGES.diningCourtyard },
  { name: "Meeting Suite", size: "1,200 sq.ft", capacity: "Up to 100 guests", types: "Board meetings · Workshops", image: HOTEL_IMAGES.lobby },
];

export const WELLNESS_ITEMS = [
  { name: "Fitness", category: "Fitness Studio", description: "A welcoming, well-equipped space to keep your routine moving while you travel.", image: HOTEL_IMAGES.gym },
  { name: "Swimming Pool", category: "Outdoor escape", description: "Take a refreshing dip or linger poolside in the sunshine between city adventures.", image: HOTEL_IMAGES.pool },
  { name: "Steam Bath", category: "Rest & restore", description: "Slow down in a soothing steam experience designed to leave you feeling renewed.", image: HOTEL_IMAGES.spa },
  { name: "Jacuzzi", category: "Warm relaxation", description: "Unwind in warm, bubbling water and let the pace of the day gently fade away.", image: HOTEL_IMAGES.pool },
  { name: "Massage", category: "Therapeutic care", description: "Restore your sense of ease with a relaxing treatment tailored to your needs.", image: HOTEL_IMAGES.massage },
  { name: "Aroma Therapy", category: "Sensory ritual", description: "A calming aromatic ritual pairs gentle care with a quiet moment to yourself.", image: HOTEL_IMAGES.spa },
  { name: "Body Treatments", category: "Signature treatments", description: "Discover restorative treatments that leave you feeling balanced and refreshed.", image: HOTEL_IMAGES.massage },
];
