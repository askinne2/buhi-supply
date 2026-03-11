import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ui/ProductCard";
import { TrustBar } from "@/components/sections/TrustBar";
import { EmailCapture } from "@/components/sections/EmailCapture";
import { PRODUCTS } from "@/lib/data/products";
import { LIFESTYLE_IMAGES } from "@/lib/figma-assets";
import { CATEGORIES, VALID_CATEGORIES } from "@/lib/categories";
import type { ProductCategory } from "@/lib/types";

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category as ProductCategory)) return {};
  const meta = CATEGORIES[category as ProductCategory];
  return {
    title: `Shop ${meta.title} Bags — Buhi Supply Co`,
    description: meta.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category as ProductCategory)) notFound();

  const meta = CATEGORIES[category as ProductCategory];
  const products = PRODUCTS.filter((p) => p.categories.includes(category as ProductCategory));
  const imageSrc = LIFESTYLE_IMAGES[meta.imageIndex];

  return (
    <>
      <section className="relative h-[400px] w-full">
        <Image
          src={imageSrc}
          alt={meta.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center px-4"
          aria-hidden
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight">
            {meta.title}
          </h1>
          <p className="font-body text-lg text-white/90 tracking-tight mt-4 max-w-xl">
            {meta.description}
          </p>
        </div>
      </section>

      <section className="bg-surface py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight text-center mb-8">
            Shop {meta.title} Bags
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      <TrustBar />
      <EmailCapture />
    </>
  );
}
