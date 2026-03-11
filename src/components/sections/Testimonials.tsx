"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StarRating } from "@/components/ui/StarRating";
import type { Testimonial } from "@/lib/types";

const SLIDES_PER_VIEW_DESKTOP = 3;
const DESKTOP_BREAKPOINT = 768;

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Martinez",
    title: "Marketing Manager",
    quote:
      "I take my Buhi backpack everywhere — from the office to the gym to weekend trips. The organization is incredible and it still looks brand new after 6 months of daily use. Best investment I've made!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    id: "2",
    name: "Jordan Lee",
    title: "Graduate Student",
    quote:
      "The Mini Backpack fits my laptop, books, and lunch without feeling bulky. I get compliments every time I'm on campus. So glad I found Buhi.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
  },
  {
    id: "3",
    name: "Alex Chen",
    title: "Frequent Traveler",
    quote:
      "The Weekender has been on every trip with me this year. Durable, stylish, and the right size for a few days away. The water-resistant fabric is a game-changer.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
  },
  {
    id: "4",
    name: "Morgan Taylor",
    title: "Personal Trainer",
    quote:
      "I needed a bag that could handle the gym and then look presentable at brunch. The Daily Tote does both. The quality is obvious from day one.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.5,
  },
  {
    id: "5",
    name: "Riley Davis",
    title: "Remote Worker",
    quote:
      "Padded laptop sleeve, tons of pockets, and it doesn't scream 'work bag.' The Commuter Backpack is exactly what I was looking for. Worth every penny.",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    rating: 5,
  },
];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const isDesktop = useIsDesktop();

  const maxIndex = isDesktop
    ? Math.max(0, Math.ceil(TESTIMONIALS.length / SLIDES_PER_VIEW_DESKTOP) - 1)
    : TESTIMONIALS.length - 1;
  const dotCount = isDesktop ? maxIndex + 1 : TESTIMONIALS.length;

  const goPrev = () => {
    setIndex((i) => (i === 0 ? maxIndex : i - 1));
  };
  const goNext = () => {
    setIndex((i) => (i >= maxIndex ? 0 : i + 1));
  };

  const translatePercent = isDesktop ? index * 100 : index * 100;
  const slideWidthPercent = isDesktop ? 100 / SLIDES_PER_VIEW_DESKTOP : 100;

  return (
    <section className="bg-background py-16 md:py-24 w-full overflow-hidden">
      <SectionHeader
        title="What Our Customers Say"
        subtitle="Real experiences from the Buhi community"
      />
      <div className="relative w-full">
        {/* Slider track: mobile 1 per view, desktop 3 per view */}
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${translatePercent}%)`,
          }}
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="flex-shrink-0 flex justify-center px-2 md:px-3"
              style={{ width: `${slideWidthPercent}%` }}
            >
              <div className="w-full max-w-md mx-auto bg-surface rounded-2xl p-6 md:p-8 shadow-sm h-full flex flex-col">
                <div className="flex flex-col items-center text-center flex-1">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover w-16 h-16 md:w-20 md:h-20"
                  />
                  <div className="mt-3">
                    <StarRating rating={t.rating} reviewCount={5} />
                  </div>
                  <blockquote className="font-body text-base md:text-lg text-muted italic tracking-tight mt-3 line-clamp-4 md:line-clamp-5">
                    {t.quote}
                  </blockquote>
                  <p className="font-heading font-bold text-base md:text-lg text-primary tracking-tight mt-3">
                    {t.name}
                  </p>
                  <p className="font-body text-sm text-muted tracking-tight">
                    {t.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prev / Next */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous testimonial"
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-primary hover:bg-surface transition-colors"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next testimonial"
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-primary hover:bg-surface transition-colors"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Dots: 2 on desktop (2 pages), 5 on mobile */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: dotCount }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`View testimonial set ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === index ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
