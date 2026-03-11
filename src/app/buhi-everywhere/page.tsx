import { UGCFeed } from "@/components/sections/UGCFeed";
import { EmailCapture } from "@/components/sections/EmailCapture";
import { ProductCard } from "@/components/ui/ProductCard";
import { PRODUCTS } from "@/lib/data/products";

const FEATURED_SLUGS = ["commuter-backpack", "daily-tote", "weekender-duffel"];

const STEPS = [
  { step: 1, title: "Buy your Buhi", body: "Choose the bag that fits your lifestyle." },
  { step: 2, title: "Share a photo with #BuhiEverywhere", body: "Post on Instagram or TikTok." },
  { step: 3, title: "Get featured on our site", body: "We highlight our favorite community photos." },
];

export const metadata = {
  title: "#BuhiEverywhere — Buhi Supply Co",
  description:
    "Share your Buhi moment with the community. Buy, share with #BuhiEverywhere, get featured.",
};

export default function BuhiEverywherePage() {
  const featured = PRODUCTS.filter((p) => FEATURED_SLUGS.includes(p.slug));

  return (
    <>
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-6xl tracking-tight">
            #BuhiEverywhere Challenge
          </h1>
          <p className="font-body text-lg text-white/90 tracking-tight mt-6 max-w-2xl mx-auto">
            Share your Buhi moment with the community
          </p>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight text-center mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {STEPS.map(({ step, title, body }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white font-heading font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {step}
                </div>
                <h3 className="font-heading font-bold text-xl text-primary tracking-tight">
                  {title}
                </h3>
                <p className="font-body text-base text-muted tracking-tight mt-2">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <UGCFeed />

      <section className="bg-surface py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary tracking-tight text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      <EmailCapture />
    </>
  );
}
