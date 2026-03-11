export type ProductCategory = "work" | "school" | "travel" | "gym";

export type ProductBadge = "Trending" | "New" | "Bestseller";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: ProductBadge;
  /** Primary category (e.g. for related products). */
  category: ProductCategory;
  /** All categories this product appears in for filtering. */
  categories: ProductCategory[];
}

export interface LifestyleCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  href: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  quote: string;
  avatar: string;
  rating: number;
}
