"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { trackEvent } from "@/lib/analytics";
import { LIFESTYLE_IMAGES } from "@/lib/figma-assets";
import type { LifestyleCategory } from "@/lib/types";

const CATEGORIES: LifestyleCategory[] = [
  {
    id: "work",
    name: "Work",
    description: "Professional bags for the modern workspace",
    image: LIFESTYLE_IMAGES[0],
    href: "/work",
  },
  {
    id: "school",
    name: "School",
    description: "Smart organization for students",
    image: LIFESTYLE_IMAGES[1],
    href: "/school",
  },
  {
    id: "travel",
    name: "Travel",
    description: "Adventure-ready duffels and packs",
    image: LIFESTYLE_IMAGES[2],
    href: "/travel",
  },
  {
    id: "gym",
    name: "Gym",
    description: "Lightweight bags for active lifestyles",
    image: LIFESTYLE_IMAGES[3],
    href: "/gym",
  },
];

export function LifestyleCategories() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <SectionHeader
          title="Shop by Lifestyle"
          subtitle="Find the perfect bag for every part of your day"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-4 md:mt-12">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="relative h-64 md:h-80 rounded-lg overflow-hidden group"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 280px"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                aria-hidden
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex flex-col gap-1 md:gap-2">
                <h3 className="font-heading font-bold text-xl md:text-2xl text-white tracking-tight">
                  {cat.name}
                </h3>
                <p className="font-body text-sm text-white/90 tracking-tight line-clamp-2 md:line-clamp-none">
                  {cat.description}
                </p>
                <Link
                  href={cat.href}
                  onClick={() =>
                    trackEvent("lifestyle_category_click", { category: cat.id })
                  }
                  className="inline-flex items-center justify-center bg-white text-primary font-body text-sm md:text-base rounded-md h-9 md:h-10 w-fit px-4 min-h-[36px] tracking-tight hover:bg-surface transition-colors mt-2"
                >
                  Shop {cat.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
