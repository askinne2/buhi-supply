import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Buhi Supply Co",
  description:
    "Get in touch with Buhi Supply Co. We respond within 24 hours.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
