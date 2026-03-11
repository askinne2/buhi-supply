"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ui/ProductCard";
import { PRODUCTS } from "@/lib/data/products";
import type { ProductCategory } from "@/lib/types";

const CATEGORY_FILTERS: { value: "all" | ProductCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "work", label: "Work" },
  { value: "school", label: "School" },
  { value: "travel", label: "Travel" },
  { value: "gym", label: "Gym" },
];

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | ProductCategory>("all");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") return PRODUCTS;
    return PRODUCTS.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <>
      <section className="bg-surface h-[200px] flex flex-col justify-center">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 w-full">
          <nav className="font-body text-sm text-muted tracking-tight" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary">Shop</span>
          </nav>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary tracking-tight mt-2">
            All Bags
          </h1>
        </div>
      </section>

      <section className="bg-background py-8">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORY_FILTERS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setActiveFilter(value)}
                className={`font-body text-sm rounded-full px-4 py-2 tracking-tight transition-colors ${
                  activeFilter === value
                    ? "bg-primary text-white"
                    : "bg-white border border-gray-200 text-muted hover:border-primary/30"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
