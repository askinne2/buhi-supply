import type { Metadata } from "next";
import { Open_Sans, Average_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { CartProvider } from "@/components/providers/CartProvider";
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
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
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
