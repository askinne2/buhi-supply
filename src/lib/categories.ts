import type { ProductCategory } from "@/lib/types";

/** Category metadata for lifestyle pages (hero, meta, nav labels). */
export const CATEGORIES: Record<
  ProductCategory,
  { title: string; description: string; imageIndex: number }
> = {
  work: {
    title: "Work",
    description:
      "Professional bags engineered for the modern workplace. Organized, polished, and ready for anything.",
    imageIndex: 0,
  },
  school: {
    title: "School",
    description:
      "Stay organized from first period to finals. Smart compartments for every student.",
    imageIndex: 1,
  },
  travel: {
    title: "Travel",
    description:
      "Adventure-ready bags built to keep up with your itinerary.",
    imageIndex: 2,
  },
  gym: {
    title: "Gym",
    description:
      "Lightweight, durable bags that go from locker room to street without missing a beat.",
    imageIndex: 3,
  },
};

export const VALID_CATEGORIES: ProductCategory[] = ["work", "school", "travel", "gym"];

/** Static nav links (non-lifestyle). */
const STATIC_NAV = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Full header nav: Shop, then all lifestyle categories in order, then About, Contact. */
export const HEADER_NAV_LINKS: { label: string; href: string }[] = [
  { label: "Shop", href: "/shop" },
  ...VALID_CATEGORIES.map((slug) => ({
    label: CATEGORIES[slug].title,
    href: `/${slug}`,
  })),
  ...STATIC_NAV.slice(1),
];
