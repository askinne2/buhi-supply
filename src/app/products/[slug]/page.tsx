"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronDown,
  Laptop,
  Droplets,
  Shield,
  Heart,
} from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { StarRating } from "@/components/ui/StarRating";
import { trackEvent } from "@/lib/analytics";
import { useCart } from "@/lib/context/CartContext";
import { PRODUCTS } from "@/lib/data/products";
import type { Product } from "@/lib/types";

const FEATURES = [
  { icon: Laptop, text: "Padded laptop sleeve" },
  { icon: Droplets, text: "Water-resistant exterior" },
  { icon: Shield, text: "Lifetime warranty" },
];

const FAQ_ITEMS = [
  { q: "What size laptop fits?", a: "Sleeve fits laptops up to 15 inches." },
  { q: "Is it machine washable?", a: "Spot clean only. Do not machine wash." },
  { q: "What's included?", a: "Bag only. Accessories sold separately." },
];

function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

function getRelatedProducts(product: Product, limit: number): Product[] {
  return PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      p.categories.some((c) => product.categories.includes(c))
  )
    .slice(0, limit);
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const related = product ? getRelatedProducts(product, 3) : [];

  useEffect(() => {
    if (product) {
      trackEvent("product_view", {
        product_id: product.id,
        name: product.name,
        price: product.price,
      });
    }
  }, [product]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addItem(product, quantity);
    trackEvent("add_to_cart", {
      product_id: product.id,
      name: product.name,
      price: product.price,
    });
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setAdded(true);
    timeoutRef.current = setTimeout(() => {
      setAdded(false);
      timeoutRef.current = null;
    }, 1500);
  }, [product, quantity, addItem]);

  if (!product) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 text-center">
        <h1 className="font-heading font-bold text-2xl text-primary tracking-tight">
          Product not found
        </h1>
        <Link
          href="/shop"
          className="mt-4 inline-block font-body text-base text-primary underline"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-background py-8 md:py-12">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <nav className="font-body text-sm text-muted tracking-tight" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-primary transition-colors">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{product.name}</span>
          </nav>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: image gallery */}
            <div className="lg:sticky lg:top-24 self-start">
              <div className="relative aspect-square max-h-[480px] w-full bg-surface rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="relative aspect-square bg-surface rounded-md overflow-hidden"
                  >
                    <Image
                      src={product.image}
                      alt={`${product.name} view ${i}`}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: details */}
            <div>
              <h1 className="font-heading font-bold text-3xl md:text-4xl text-primary tracking-tight">
                {product.name}
              </h1>
              <div className="mt-2">
                <StarRating rating={product.rating} reviewCount={product.reviewCount} />
              </div>
              <p className="font-heading font-bold text-2xl text-primary tracking-tight mt-4">
                ${product.price}
              </p>
              <p className="font-body text-lg text-muted tracking-tight mt-4">
                {product.description}
              </p>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="font-body text-sm text-muted tracking-tight block mb-2">
                    Color
                  </label>
                  <select
                    className="w-full max-w-[200px] h-12 px-4 rounded-md border border-gray-200 font-body text-base bg-white"
                    aria-label="Color"
                  >
                    <option>Black</option>
                    <option>Navy</option>
                    <option>Sage</option>
                  </select>
                </div>
                <div>
                  <label className="font-body text-sm text-muted tracking-tight block mb-2">
                    Size
                  </label>
                  <select
                    className="w-full max-w-[200px] h-12 px-4 rounded-md border border-gray-200 font-body text-base bg-white"
                    aria-label="Size"
                  >
                    <option>One Size</option>
                  </select>
                </div>
                <div>
                  <label className="font-body text-sm text-muted tracking-tight block mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-12 rounded-md border border-gray-200 font-body text-lg"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="font-body text-base w-8 text-center">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-12 rounded-md border border-gray-200 font-body text-lg"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`mt-6 w-full font-body text-base h-14 rounded-md tracking-tight transition-opacity min-h-[48px] md:h-14 ${
                  added ? "bg-accent text-white" : "bg-primary text-white hover:opacity-90"
                }`}
              >
                {added ? "Added! ✓" : "Add to Cart"}
              </button>
              <button
                type="button"
                className="mt-4 flex items-center gap-2 font-body text-sm text-muted tracking-tight hover:text-primary transition-colors"
              >
                <Heart className="w-4 h-4" />
                Add to Wishlist
              </button>

              <div className="border-t border-gray-200 mt-8 pt-8">
                <h3 className="font-heading font-bold text-lg text-primary tracking-tight mb-4">
                  Features
                </h3>
                <ul className="space-y-3">
                  {FEATURES.map(({ icon: Icon, text }) => (
                    <li
                      key={text}
                      className="flex items-center gap-3 font-body text-base text-muted tracking-tight"
                    >
                      <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h3 className="font-heading font-bold text-lg text-primary tracking-tight mb-4">
                  FAQ
                </h3>
                <div className="space-y-2">
                  {FAQ_ITEMS.map((item, i) => (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-md overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaqIndex(openFaqIndex === i ? null : i)
                        }
                        className="flex w-full items-center justify-between px-4 py-3 text-left font-body text-base text-primary tracking-tight hover:bg-surface transition-colors"
                        aria-expanded={openFaqIndex === i}
                      >
                        {item.q}
                        <ChevronDown
                          className={`w-5 h-5 text-muted flex-shrink-0 transition-transform ${
                            openFaqIndex === i ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openFaqIndex === i && (
                        <div className="px-4 pb-3 font-body text-sm text-muted tracking-tight">
                          {item.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-surface py-16 md:py-24">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8">
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight text-center mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
