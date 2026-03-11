import Image from "next/image";
import { Instagram } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { UGC_IMAGES } from "@/lib/figma-assets";

export function UGCFeed() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <SectionHeader
          title="#BuhiEverywhere"
          subtitle="See how our community carries Buhi"
        />
        <div className="flex justify-center mt-6">
          <a
            href="https://instagram.com/buhisupplyco"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white font-body text-base rounded-md h-12 px-6 tracking-tight hover:opacity-90 transition-opacity"
          >
            <Instagram className="w-5 h-5" aria-hidden />
            Follow @buhisupplyco
          </a>
        </div>
        <div className="mt-8 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-6 md:overflow-visible md:pb-0">
          {UGC_IMAGES.map((src, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-48 h-48 md:w-full md:aspect-square rounded-lg overflow-hidden"
            >
              <Image
                src={src}
                alt={`Community photo ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 200px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
