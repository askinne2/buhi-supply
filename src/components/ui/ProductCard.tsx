"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { StarRating } from "./StarRating";
import { Badge } from "./Badge";
import { trackEvent } from "@/lib/analytics";
import { useCart } from "@/lib/context/CartContext";
import type { Product } from "@/lib/types";

interface ProductCardProps extends Product {}

export function ProductCard({
  id,
  slug,
  name,
  description,
  price,
  rating,
  reviewCount,
  image,
  badge,
  category,
  categories,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const product: Product = { id, slug, name, description, price, rating, reviewCount, image, badge, category, categories };
    addItem(product);
    trackEvent("add_to_cart", { product_id: id, name, price });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAdded(true);
    timeoutRef.current = setTimeout(() => {
      setAdded(false);
      timeoutRef.current = null;
    }, 1500);
  };

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
      <Link href={slug ? `/products/${slug}` : "#"} className="block flex flex-col flex-1">
        <div className="relative h-64 md:h-80 w-full bg-surface">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 384px"
          />
          {badge && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary/90">{badge}</Badge>
            </div>
          )}
          <button
            type="button"
            aria-label="Add to wishlist"
            className="absolute top-4 right-4 rounded-full bg-white shadow-md w-10 h-10 md:w-11 md:h-11 flex items-center justify-center hover:opacity-90 transition-opacity z-10"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="w-5 h-5 text-muted" />
          </button>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-heading font-bold text-xl text-primary tracking-tight">
            {name}
          </h3>
          <p className="font-body text-sm text-muted tracking-tight mt-1 line-clamp-2">
            {description}
          </p>
          <p className="font-heading font-bold text-2xl text-primary tracking-tight mt-2">
            ${price}
          </p>
          <div className="mt-2">
            <StarRating rating={rating} reviewCount={reviewCount} />
          </div>
        </div>
      </Link>
      <div className="px-6 pb-6">
        <button
          type="button"
          onClick={handleAddToCart}
          className={`w-full font-body text-base h-12 rounded-md tracking-tight transition-opacity min-h-[48px] ${
            added ? "bg-accent text-white" : "bg-primary text-white hover:opacity-90"
          }`}
        >
          {added ? "Added! ✓" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
