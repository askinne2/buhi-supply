import type { Metadata } from "next";
import { Open_Sans, Average_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const averageSans = Average_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-average-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Buhi Supply Co — Bags That Move With Your Life",
  description:
    "Versatile, durable lifestyle bags for work, school, travel, and gym. Shop backpacks, totes, duffels, and more.",
  openGraph: {
    title: "Buhi Supply Co — Bags That Move With Your Life",
    description:
      "Versatile, durable lifestyle bags for work, school, travel, and gym. Shop backpacks, totes, duffels, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} ${averageSans.variable}`}>
      <body className="min-h-screen bg-background">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
