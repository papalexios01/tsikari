const seq = (dir: string, nums: number[], ext = "jpg") =>
  nums.map((n) => `/images/${dir}/${String(n).padStart(2, "0")}.${ext}`);
const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

export const media = {
  logo: "/images/logo.webp",
  home: {
    exterior: "/images/main-1.webp",
    facade: "/images/main-2.webp",
    banner: "/images/main-3.jpg",
    amenities: "/images/findout5.jpg",
    island: "/images/findout3.jpg",
    tsikaris: "/images/findout1.jpg",
  },
  about: {
    family: "/images/about/1.jpg",
    lemnos: "/images/about/2.jpg",
    portraitA: "/images/about/3.webp",
    portraitB: "/images/about/4.jpg",
  },
  gallery: seq("gallery", [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]),
  studio23: seq("rooms/2-3", range(1, 19)),
  studio24: seq("rooms/2-4", range(1, 47)),
  entrance: seq("hotel/entrance", range(1, 13)),
  exterior: seq("hotel/exterior", range(1, 9)),
};

export type GalleryGroup = { id: string; label: string; photos: string[] };

export const galleryGroups: GalleryGroup[] = [
  {
    id: "hotel",
    label: "The Hotel",
    photos: [media.home.exterior, media.home.facade, ...media.exterior, media.home.banner],
  },
  { id: "entrance", label: "Entrance", photos: media.entrance },
  { id: "studios", label: "Studios", photos: media.gallery },
  { id: "studio23", label: "Studio 2-3 Persons", photos: media.studio23 },
  { id: "studio24", label: "Family Studio 2-4", photos: media.studio24 },
  {
    id: "restoration",
    label: "Restoration",
    photos: [media.about.portraitB, media.about.lemnos],
  },
  {
    id: "moments",
    label: "Moments",
    photos: [media.home.island, media.home.amenities, media.home.tsikaris, media.about.family],
  },
];
