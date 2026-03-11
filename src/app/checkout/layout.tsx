import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout — Buhi Supply Co",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
