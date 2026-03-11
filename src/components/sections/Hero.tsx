"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { HERO_IMAGE } from "@/lib/figma-assets";

export function Hero() {
  return (
    <section className="relative h-[600px] md:h-[800px] w-full">
      <Image
        src={HERO_IMAGE}
        alt="Woman with Buhi backpack in modern workspace"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/55 to-black/30"
        aria-hidden
      />
      <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-8 text-center md:justify-center md:pb-0">
        <h1 className="font-heading font-bold text-3xl md:text-6xl text-white tracking-tight max-w-3xl leading-tight">
          Bags That Move With Your Life
        </h1>
        <p className="font-body text-lg md:text-xl text-white/90 tracking-tight mt-4 max-w-2xl">
          Versatile, durable, and designed for work, school, gym, and travel.
          Find your perfect Buhi.
        </p>
        <div className="mt-8 flex flex-col w-full gap-4 sm:flex-row sm:w-auto sm:gap-6">
          <Button
            href="#bestsellers"
            variant="primary"
            className="h-[60px] w-full rounded-md sm:w-auto"
          >
            Shop Bestsellers
          </Button>
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center justify-center bg-white text-primary font-body text-base rounded-md h-[60px] px-6 md:px-8 tracking-tight border border-primary/20 hover:bg-surface transition-colors w-full sm:w-auto cursor-not-allowed opacity-75"
            title="Coming Soon"
          >
            Find Your Buhi Quiz
          </button>
        </div>
      </div>
    </section>
  );
}
