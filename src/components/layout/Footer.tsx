"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook } from "lucide-react";
import { LOGO_IMAGE } from "@/lib/figma-assets";
import type { ReactNode } from "react";

const SHOP_LINKS = [
  { label: "Shop All", href: "/shop" },
  { label: "Work", href: "/work" },
  { label: "School", href: "/school" },
  { label: "Travel", href: "/travel" },
  { label: "Gym", href: "/gym" },
];

const SUPPORT_LINKS = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Find Your Buhi Quiz", href: "/quiz" },
  { label: "Buhi Everywhere", href: "/buhi-everywhere" },
];

function FooterColumn({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/20 md:border-0">
      <button
        type="button"
        className="flex w-full items-center justify-between py-4 md:py-0 md:pointer-events-none font-heading font-bold text-base text-white tracking-tight"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {title}
        <span className="md:hidden">{open ? "−" : "+"}</span>
      </button>
      <div
        className={`overflow-hidden transition-all md:block ${
          open ? "max-h-96" : "max-h-0 md:max-h-none"
        }`}
      >
        <ul className="pb-4 md:pb-0 md:pt-4 space-y-2">
          {children}
        </ul>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8">
          {/* Brand column - always first and expanded on mobile */}
          <FooterColumn title="Brand" defaultOpen={true}>
            <li>
              <Link href="/" className="relative inline-block h-[39px] w-[83px]" aria-label="Buhi Supply Co – Home">
                <Image
                  src={LOGO_IMAGE}
                  alt="Buhi Supply Co"
                  width={83}
                  height={39}
                  className="object-contain object-left brightness-0 invert"
                />
              </Link>
            </li>
            <li className="font-body text-sm text-white/90 tracking-tight mt-2">
              Bags built for your everyday adventures
            </li>
            <li className="flex gap-4 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/90 hover:text-white"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-white/90 hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88 2.1V9.4a6.84 6.84 0 0 0-1.05-.08A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/90 hover:text-white"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </li>
          </FooterColumn>

          <FooterColumn title="Shop" defaultOpen={false}>
            {SHOP_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-body text-sm text-white/90 tracking-tight hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Support" defaultOpen={false}>
            {SUPPORT_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-body text-sm text-white/90 tracking-tight hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Company" defaultOpen={false}>
            {COMPANY_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-body text-sm text-white/90 tracking-tight hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-12 pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-white/80 tracking-tight">
            © {new Date().getFullYear()} Buhi Supply Co. All rights reserved.
          </p>
          <span className="font-body text-sm text-white/60 tracking-tight">
            Analytics: GA4
          </span>
        </div>
      </div>
    </footer>
  );
}
