import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Buhi Supply Co",
  description:
    "Everything you need to know about Buhi bags: shipping, returns, care, and orders.",
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
