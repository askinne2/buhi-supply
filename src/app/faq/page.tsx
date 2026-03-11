"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_GROUPS = [
  {
    heading: "Shipping & Returns",
    items: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping takes 3-5 business days.",
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes, on orders over $75.",
      },
      {
        q: "What is your return policy?",
        a: "30 days, hassle-free returns.",
      },
    ],
  },
  {
    heading: "Products & Care",
    items: [
      {
        q: "What materials are your bags made from?",
        a: "We use durable, water-resistant fabrics and quality hardware designed for daily use.",
      },
      {
        q: "Are Buhi bags water resistant?",
        a: "Yes, our bags feature water-resistant exteriors to protect your belongings.",
      },
      {
        q: "How do I clean my bag?",
        a: "Spot clean with a damp cloth. Do not machine wash.",
      },
      {
        q: "What does the lifetime warranty cover?",
        a: "Defects in materials and workmanship. Normal wear and tear are not covered.",
      },
    ],
  },
  {
    heading: "Orders & Payment",
    items: [
      {
        q: "Can I change or cancel my order?",
        a: "Contact us within 24 hours of placing your order and we'll do our best to help.",
      },
      {
        q: "Do you offer gift wrapping?",
        a: "Yes, select gift wrapping at checkout.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards, PayPal, and Apple Pay.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <>
      <section className="bg-surface py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="font-body text-lg text-muted tracking-tight mt-4">
            Everything you need to know about Buhi bags
          </p>
        </div>
      </section>

      <section className="bg-background py-8 md:py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          {FAQ_GROUPS.map((group) => (
            <div key={group.heading} className="mb-12">
              <h2 className="font-heading font-bold text-xl text-primary tracking-tight mb-6">
                {group.heading}
              </h2>
              <div className="space-y-2">
                {group.items.map((item) => {
                  const key = `${group.heading}-${item.q}`;
                  const isOpen = openKey === key;
                  return (
                    <div
                      key={key}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenKey(isOpen ? null : key)
                        }
                        className="flex w-full items-center justify-between px-4 py-4 text-left font-body text-base text-primary tracking-tight hover:bg-surface transition-colors"
                        aria-expanded={isOpen}
                      >
                        {item.q}
                        <ChevronDown
                          className={`w-5 h-5 text-muted flex-shrink-0 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 font-body text-base text-muted tracking-tight">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
