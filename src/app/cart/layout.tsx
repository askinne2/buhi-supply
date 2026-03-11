import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart — Buhi Supply Co",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
