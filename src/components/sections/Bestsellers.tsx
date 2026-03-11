import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductCard } from "@/components/ui/ProductCard";
import { PRODUCTS } from "@/lib/data/products";

export function Bestsellers() {
  return (
    <section id="bestsellers" className="bg-surface py-16 md:py-24 scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <SectionHeader
          title="Bestsellers"
          subtitle="Our most-loved bags for every lifestyle"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-4 md:mt-12">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
