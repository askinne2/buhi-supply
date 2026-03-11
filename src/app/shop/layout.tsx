import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Bags — Buhi Supply Co",
  description:
    "Browse our full collection of backpacks, totes, duffels, and more.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
