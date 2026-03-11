import { Hero } from "@/components/sections/Hero";
import { LifestyleCategories } from "@/components/sections/LifestyleCategories";
import { Bestsellers } from "@/components/sections/Bestsellers";
import { TrustBar } from "@/components/sections/TrustBar";
import { Testimonials } from "@/components/sections/Testimonials";
import { EmailCapture } from "@/components/sections/EmailCapture";
import { UGCFeed } from "@/components/sections/UGCFeed";

export default function Home() {
  return (
    <>
      <Hero />
      <LifestyleCategories />
      <Bestsellers />
      <TrustBar />
      <Testimonials />
      <EmailCapture />
      <UGCFeed />
    </>
  );
}
