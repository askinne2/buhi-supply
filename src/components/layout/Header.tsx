"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { LOGO_IMAGE } from "@/lib/figma-assets";
import { HEADER_NAV_LINKS } from "@/lib/categories";

const BESTSELLERS_ANCHOR = "#bestsellers";

/** Nav link is "Shop" when href is /shop; only that one is clickable (to #bestsellers). */
function isShopLink(href: string) {
  return href === "/shop";
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-[72px] md:h-20 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-full px-4 md:px-8 max-w-[1440px] mx-auto">
        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          className="md:hidden p-2 -ml-2"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6 text-muted" />
        </button>

        {/* Logo - centered on mobile, left on desktop */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:ml-0 flex items-center justify-center min-h-[44px] py-2 md:min-h-0 md:py-0 md:h-[54px] md:w-[115px]"
          aria-label="Buhi Supply Co – Home"
        >
          <Image
            src={LOGO_IMAGE}
            alt="Buhi Supply Co"
            width={115}
            height={54}
            className="h-8 w-[68px] object-contain md:h-[54px] md:w-[115px]"
            priority
          />
        </Link>

        {/* Desktop nav - centered; only Shop is clickable */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
          {HEADER_NAV_LINKS.map(({ label, href }) =>
            isShopLink(href) ? (
              <Link
                key={href}
                href={BESTSELLERS_ANCHOR}
                className="font-body text-base text-muted tracking-tight hover:text-primary transition-colors"
              >
                {label}
              </Link>
            ) : (
              <span
                key={href}
                className="font-body text-base text-muted tracking-tight cursor-not-allowed opacity-50"
                title="Coming Soon"
              >
                {label}
              </span>
            )
          )}
        </nav>

        {/* Right: search, cart (not a link), CTA */}
        <div className="flex items-center gap-2 md:gap-4">
          <button type="button" aria-label="Search" className="p-2">
            <Search className="w-5 h-5 text-muted" />
          </button>
          <span
            className="relative p-2 cursor-default"
            aria-label="Cart (coming soon)"
            title="Coming Soon"
          >
            <ShoppingCart className="w-5 h-5 text-muted opacity-50" />
          </span>
          <Link
            href={BESTSELLERS_ANCHOR}
            className="hidden md:inline-flex items-center justify-center bg-primary text-white font-body text-base rounded-md h-12 px-6 tracking-tight hover:opacity-90 transition-opacity"
          >
            Shop Bestsellers
          </Link>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-background md:hidden"
          aria-modal
          role="dialog"
        >
          <div className="flex items-center justify-between h-[72px] px-4 border-b border-gray-200">
            <Link href="/" className="flex items-center min-h-[44px]" aria-label="Buhi Supply Co – Home">
              <Image
                src={LOGO_IMAGE}
                alt="Buhi Supply Co"
                width={115}
                height={54}
                className="h-8 w-[68px] object-contain"
              />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-6 h-6 text-muted" />
            </button>
          </div>
          <nav className="flex flex-col p-6 gap-4">
            {HEADER_NAV_LINKS.map(({ label, href }) =>
              isShopLink(href) ? (
                <Link
                  key={href}
                  href={BESTSELLERS_ANCHOR}
                  className="font-body text-base text-muted tracking-tight py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ) : (
                <span
                  key={href}
                  className="font-body text-base text-muted tracking-tight py-2 cursor-not-allowed opacity-50"
                  title="Coming Soon"
                >
                  {label}
                </span>
              )
            )}
            <Link
              href={BESTSELLERS_ANCHOR}
              className="mt-4 flex items-center justify-center bg-primary text-white font-body text-base rounded-md h-12 px-6 tracking-tight"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop Bestsellers
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
