import Image from "next/image";
import { Shield, Repeat, Users } from "lucide-react";
import { EmailCapture } from "@/components/sections/EmailCapture";
import { HERO_IMAGE } from "@/lib/figma-assets";

const VALUES = [
  {
    icon: Shield,
    title: "Quality",
    description:
      "Every bag is built to last with premium materials and thoughtful construction. We stand behind our products with a lifetime warranty.",
  },
  {
    icon: Repeat,
    title: "Versatility",
    description:
      "From desk to gym, campus to airport—our bags are designed to move with you through every part of your day.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We listen to our customers and design for real life. Join thousands of people who carry Buhi every day.",
  },
];

const STATS = [
  { value: "50,000+", label: "Happy Customers" },
  { value: "4.9", label: "Average Rating" },
  { value: "Lifetime Warranty", label: "On Every Bag" },
];

export const metadata = {
  title: "About Us — Buhi Supply Co",
  description:
    "Buhi Supply Co was born from a simple frustration — bags that looked great but couldn't keep up with real life. Learn our story.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-surface py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-primary tracking-tight">
            Built for the Way You Move
          </h1>
          <p className="font-body text-lg text-muted tracking-tight mt-6 max-w-2xl mx-auto">
            We started Buhi because we were tired of bags that looked good but
            fell short when life got busy. Our mission is simple: design bags
            that keep up with you—every day.
          </p>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={HERO_IMAGE}
                alt="Buhi lifestyle"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight">
                Our Story
              </h2>
              <p className="font-body text-lg text-muted tracking-tight mt-6">
                Buhi Supply Co was born from a simple frustration — bags that
                looked great but couldn&apos;t keep up with real life. We set out to
                build something different: bags designed around how people
                actually move through their day — from desk to gym, campus to
                airport, meeting to weekend.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight text-center mb-12">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center">
                <div className="flex justify-center">
                  <Icon className="w-12 h-12 text-primary" aria-hidden />
                </div>
                <h3 className="font-heading font-bold text-xl text-primary tracking-tight mt-4">
                  {title}
                </h3>
                <p className="font-body text-base text-muted tracking-tight mt-2">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="font-heading font-bold text-2xl md:text-3xl tracking-tight">
                  {value}
                </p>
                <p className="font-body text-base text-white/90 tracking-tight mt-2">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmailCapture />
    </>
  );
}
