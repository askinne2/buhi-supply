import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/data/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    return { title: "Product Not Found — Buhi Supply Co" };
  }
  return {
    title: `${product.name} — Buhi Supply Co`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
