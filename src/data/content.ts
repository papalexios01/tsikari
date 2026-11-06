import {
  AirVent,
  BedDouble,
  Bath,
  Coffee,
  Flower2,
  HandHeart,
  Leaf,
  Shirt,
  ShoppingBasket,
  Sparkles,
  Tv,
  UtensilsCrossed,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { media } from "@/data/media";
type Route = string;

const own = media.home;

export const navLinks: { label: string; route: Route }[] = [
  { label: "Home", route: "home" },
  { label: "About", route: "about" },
  { label: "Rooms", route: "rooms" },
  { label: "Gallery", route: "gallery" },
  { label: "How to Get Here", route: "how-to-get-here" },
  { label: "Contact", route: "contact" },
];

export const stats = [
  { value: "1901", label: "Year the mansion was built" },
  { value: "5", label: "Private studios" },
  { value: "3 min", label: "Drive to the airport" },
  { value: "Central", label: "Location in Varos, Lemnos" },
];

export type Feature = {
  id: string;
  tab: string;
  title: string;
  lead: string;
  image: string;
  body: string[];
  highlights: string[];
  extrasTitle: string;
  extras: string[];
};

export const features: Feature[] = [
  {
    id: "stay",
    tab: "Amenities",
    title: "Five studios, each with its own quiet",
    lead: "Earth tones, hand-picked objects and windows that frame the village square.",
    image: media.gallery[0]!,
    body: [
      "Five self-contained studios share the old mansion, every one styled with pieces picked by hand and a view across the village rooftops. The restoration pairs time-worn island craftsmanship with clean modern lines: unmistakably Greek, never old-fashioned.",
      "You sleep on natural COCO-MAT mattresses under soft linen, surrounded by warm, earthy colours. With a kitchenette and a roomy table of your own, dinner in can be just as special as dinner out.",
      "Maria keeps your studio fresh each day from 11:30 to 13:30. Planning a late morning? Just leave the card on your door handle with a time that works better for you.",
    ],
    highlights: [
      "COCO-MAT ecological mattresses",
      "Private kitchenette & table",
      "Personal housekeeper, Maria",
      "Cleaning hours on your schedule",
    ],
    extrasTitle: "In every studio",
    extras: [
      "Air conditioning",
      "Hairdryer",
      "Slippers",
      "Bathrobes",
      "Modern shower room",
      "Free Wi-Fi",
      "TV",
    ],
  },
  {
    id: "island",
    tab: "Limnos Island",
    title: "Right in the heart of Lemnos",
    lead: "Varos sits at the island\u2019s centre, so every beach and village is close at hand.",
    image: own.island,
    body: [
      "Varos sits in a central part of Lemnos, making a convenient base for exploring its villages and beaches. Myrina port is about twenty minutes away by car, and the airport is close by.",
      "Our favourite swims: the two Fanaraki coves, Chavouli, Plati, Thanos and Zematas. Surfers head for Keros, while Gomati\u2019s dunes look more like the desert than the Aegean. Avlonas and Agios Ioannis lie close to Myrina, and Alykes is the spot for scooping up sea salt.",
      "Save a whole day for Myrina. Browse the Archaeological Museum, climb to the Venetian castle to meet its resident deer, then wander the market before dinner by the water on Romeiko or Tourkiko Gialos. As evening falls, the sun sinks behind Mount Athos, a view many keep on their bucket list.",
      "The island\u2019s clean air has been celebrated for thousands of years, and its rich earth grows wonderful produce, from vegetables and fruit to its prized flour. Plenty of visitors leave feeling rested in a way they hadn\u2019t expected.",
    ],
    highlights: [
      "Airport 3 min",
      "Port 20 min",
      "Over 10 beaches nearby",
      "Sunset behind Mount Athos",
    ],
    extrasTitle: "Don\u2019t miss",
    extras: [
      "Archaeological Museum",
      "Venetian castle & deer",
      "Romeiko Gialos",
      "Tourkiko Gialos",
      "Myrina market",
      "Alykes sea salt",
    ],
  },
  {
    id: "mornings",
    tab: "Tsikaris",
    title: "The perfect breakfast after the perfect sleep",
    lead: "A fully equipped kitchenette and a complimentary pantry for unhurried mornings.",
    image: own.tsikaris,
    body: [
      "Good mornings start in your own kitchenette, stocked with all the equipment for anything from a quick coffee to a slow, generous spread.",
      "The village mini-market around the corner sells local honey, yogurt, fresh bread, eggs, fruit and more. Short on time? Write down what you need and we\u2019ll pick it up.",
      "For a morning off, Café Taro serves breakfast nearby. Anything already waiting in your fridge or cupboards is our treat.",
    ],
    highlights: [
      "Everything in the fridge is free",
      "Fully equipped kitchenette",
      "Shopping done for you",
      "Breakfast at Café Taro",
    ],
    extrasTitle: "Your kitchenette",
    extras: [
      "Stove",
      "Toaster",
      "Microwave",
      "Electric frother",
      "Coffee maker",
      "Pot & pan",
      "Plates & cutlery",
      "Cups & glasses",
    ],
  },
];

export type Amenity = { icon: LucideIcon; title: string; text: string };

export const amenities: Amenity[] = [
  {
    icon: BedDouble,
    title: "COCO-MAT beds",
    text: "Ecological mattresses for deep, unbroken sleep.",
  },
  {
    icon: UtensilsCrossed,
    title: "Kitchenette",
    text: "Fully equipped, with a generous dining table.",
  },
  {
    icon: Coffee,
    title: "Complimentary pantry",
    text: "Everything in the fridge is on the house.",
  },
  { icon: AirVent, title: "Air conditioning", text: "Comfortable in every season." },
  { icon: Wifi, title: "Free Wi-Fi", text: "Stay connected throughout the house." },
  { icon: Tv, title: "Television", text: "For slow evenings in." },
  { icon: Bath, title: "Modern bathroom", text: "Contemporary shower room and hairdryer." },
  { icon: Shirt, title: "Robes & slippers", text: "Soft bathrobes waiting for you." },
  {
    icon: HandHeart,
    title: "Personal housekeeper",
    text: "Maria tends your studio, 11:30 to 13:30.",
  },
  { icon: Leaf, title: "Ecological products", text: "Natural materials and soft linens." },
  { icon: ShoppingBasket, title: "Shopping service", text: "Give us a list, we fill the fridge." },
  { icon: Sparkles, title: "Tailored hospitality", text: "A friendly, family atmosphere." },
  { icon: Flower2, title: "Village square views", text: "Overlooking the 1907 drinking fountain." },
];

export type Place = { name: string; area: string; note: string; minutes: number; photo: string };

const l = media.about;

export const places: Place[] = [
  {
    name: "Mikro & Megalo Fanaraki",
    area: "East coast",
    note: "Twin sandy coves with calm, shallow water.",
    minutes: 15,
    photo: own.island,
  },
  {
    name: "Chavouli",
    area: "Moudros",
    note: "A sheltered bay, ideal for a long swim.",
    minutes: 15,
    photo: l.lemnos,
  },
  {
    name: "Keros",
    area: "North-east",
    note: "Wind-swept and wild, a paradise for surfers.",
    minutes: 20,
    photo: l.portraitA,
  },
  {
    name: "Gomati",
    area: "North coast",
    note: "Sand dunes that feel like Africa.",
    minutes: 20,
    photo: l.portraitB,
  },
  {
    name: "Plati & Thanos",
    area: "Near Myrina",
    note: "Soft sand, tavernas and sunset swims.",
    minutes: 15,
    photo: own.island,
  },
  {
    name: "Zematas",
    area: "South-west",
    note: "A quiet beach far from the crowds.",
    minutes: 15,
    photo: l.lemnos,
  },
  {
    name: "Avlonas & Agios Ioannis",
    area: "Near Myrina",
    note: "Rock formations and seaside dining.",
    minutes: 18,
    photo: l.portraitA,
  },
  {
    name: "Alykes",
    area: "East",
    note: "Collect your own sea salt.",
    minutes: 12,
    photo: l.portraitB,
  },
  {
    name: "Myrina",
    area: "Island capital",
    note: "Museum, Venetian castle, market and tavernas.",
    minutes: 20,
    photo: l.lemnos,
  },
];

export const homeGallery: { photo: string; alt: string; span: string }[] = [
  {
    photo: own.exterior,
    alt: "Archontiko Tsikari exterior with the 1907 drinking fountain on Varos square",
    span: "md:col-span-2 md:row-span-2",
  },
  { photo: media.entrance[0]!, alt: "Entrance of Archontiko Tsikari", span: "md:row-span-2" },
  { photo: media.gallery[0]!, alt: "Studio with twin beds, robes and towels", span: "" },
  { photo: media.exterior[1]!, alt: "The mansion seen from the village", span: "md:col-span-2" },
  { photo: own.tsikaris, alt: "Kitchenette and breakfast table", span: "" },
  { photo: media.studio24[1]!, alt: "Family studio for 2-4 persons", span: "md:col-span-2" },
];

export const contact = {
  email: "hotel.tsikari@gmail.com",
  mobile: "+30 698 2945 676",
  landline: "+30 22540 31701",
  whatsapp: "https://wa.me/306982945676",
  address: ["Varos", "Lemnos 81400", "Greece"],
  languages: ["Greek", "English", "French", "Romanian", "Italian"],
};

export const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;

const HOTEL = "Archontiko Tsikari, Varos, Lemnos 814 00, Greece";
const PORT = "Port of Myrina, Lemnos, Greece";
const AIRPORT = "Lemnos International Airport, Greece";
const q = encodeURIComponent;
const embedRoute = (from: string) =>
  `https://maps.google.com/maps?saddr=${q(from)}&daddr=${q(HOTEL)}&output=embed`;
const openRoute = (from: string) =>
  `https://www.google.com/maps/dir/?api=1&origin=${q(from)}&destination=${q(HOTEL)}`;

export const maps = {
  hotel: `https://maps.google.com/maps?q=${q(HOTEL)}&z=15&output=embed`,
  fromPort: embedRoute(PORT),
  fromAirport: embedRoute(AIRPORT),
  links: {
    hotel: `https://www.google.com/maps/search/?api=1&query=${q(HOTEL)}`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${q(HOTEL)}`,
    fromPort: openRoute(PORT),
    fromAirport: openRoute(AIRPORT),
  },
};

export type Room = {
  id: string;
  name: string;
  guests: number;
  summary: string;
  details: string[];
  photos: string[];
};

export const rooms: Room[] = [
  {
    id: "studio-2-3",
    name: "Studio for 2-3 Persons",
    guests: 3,
    summary:
      "A cosy studio for couples or a small group, with COCO-MAT bedding and its own fully equipped kitchenette.",
    details: [
      "Up to 3 guests",
      "COCO-MAT bedding",
      "Fully equipped kitchenette",
      "Village square views",
      "Air conditioning & Wi-Fi",
      "Shower room, robes & slippers",
    ],
    photos: media.studio23,
  },
  {
    id: "studio-2-4",
    name: "Family Studio for 2-4 Persons",
    guests: 4,
    summary:
      "A roomy studio made for families, with a fold-out ottoman bed and a baby cot available on request.",
    details: [
      "Up to 4 guests",
      "Fold-out ottoman bed",
      "Baby cot on request",
      "COCO-MAT bedding",
      "Fully equipped kitchenette",
      "Air conditioning & Wi-Fi",
    ],
    photos: media.studio24,
  },
];

export type Carrier = { name: string; url: string };
export type TravelRoute = { mode: "ferry" | "plane"; title: string; carriers: Carrier[] };

export const travelRoutes: TravelRoute[] = [
  {
    mode: "ferry",
    title: "Kavala & Lavrio",
    carriers: [
      { name: "Blue Star Ferries", url: "https://www.bluestarferries.com/en/" },
      { name: "Aegean Sealines", url: "https://aeg-booking.certusonline.com/index.php?lang=en" },
    ],
  },
  {
    mode: "ferry",
    title: "Alexandroupolis & Samothraki",
    carriers: [
      { name: "Zante Ferries", url: "https://www.zanteferries.gr/?lang=en" },
      { name: "Pravlis travel agency", url: "https://pravlis.gr/en/ferry-itineraries/" },
    ],
  },
  {
    mode: "plane",
    title: "Athens",
    carriers: [
      { name: "Olympic Air", url: "https://www.olympicair.com/en/" },
      { name: "Sky Express", url: "https://www.skyexpress.gr/en/" },
    ],
  },
  {
    mode: "plane",
    title: "Thessaloniki",
    carriers: [
      { name: "Olympic Air", url: "https://www.olympicair.com/en/" },
      { name: "Sky Express", url: "https://www.skyexpress.gr/en/" },
    ],
  },
];

export const timeline = [
  {
    year: "1901",
    title: "A merchant\u2019s house",
    text: "Haralabos Tsikaris, a successful trader from Asia Minor, builds a 333 m\u00b2 mansion on the square of Varos. The island is still under Ottoman rule.",
  },
  {
    year: "1901\u20131910",
    title: "Shop below, home above",
    text: "The ground floor holds his store, warehouse, coffee shop and office. Upstairs, he and his wife Stamatina raise three sons and a daughter.",
  },
  {
    year: "1910",
    title: "A family carries on",
    text: "After Haralabos dies, Stamatina marries Dimitris Zavalakis, the business\u2019s accountant, to protect her children\u2019s inheritance. He keeps the estate safe and grows it further.",
  },
  {
    year: "1912",
    title: "Liberation",
    text: "The Greek navy frees Lemnos. Zavalakis becomes one of the island\u2019s most respected figures.",
  },
  {
    year: "Later years",
    title: "Distinguished guests",
    text: "Prime Minister Eleftherios Venizelos calls on Zavalakis at the house during his visit to Lemnos, and George Papandreou, governor of the North Aegean islands, does the same years later.",
  },
  {
    year: "Today",
    title: "A new chapter",
    text: "After Anestis Tsikaris, the last son to live here, passes away, the family\u2019s descendants carefully restore the mansion, so that every guest is treated like a VIP.",
  },
];

export const bookingPerks = [
  { title: "COCO-MAT Comfort", text: "Ecological bedding and bath products in every studio." },
  {
    title: "Central Location",
    text: "Stay in Varos, with convenient access to the airport, Myrina and the island.",
  },
  { title: "Personal Service", text: "Your own housekeeper looks after every detail." },
  {
    title: "Hotel Quality, B&B Warmth",
    text: "Five unique studios and family hospitality since 1901.",
  },
];
