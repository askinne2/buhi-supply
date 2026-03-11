import { Truck, Shield, RotateCcw } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Truck,
    title: "Free Shipping",
    subtitle: "On orders over $75",
  },
  {
    icon: Shield,
    title: "Lifetime Warranty",
    subtitle: "Quality guaranteed",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    subtitle: "Hassle-free returns",
  },
];

export function TrustBar() {
  return (
    <section className="bg-background py-12 md:py-12 border-y border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
          {TRUST_ITEMS.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} className="flex flex-col items-center gap-2">
              <Icon className="w-8 h-8 text-primary" aria-hidden />
              <h3 className="font-heading font-bold text-lg text-primary tracking-tight">
                {title}
              </h3>
              <p className="font-body text-sm text-muted tracking-tight">
                {subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
