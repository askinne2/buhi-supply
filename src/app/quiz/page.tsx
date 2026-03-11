"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  Plane,
  Dumbbell,
  ShoppingBag,
  Backpack,
  Hand,
  Crosshair,
  LayoutGrid,
  Feather,
  Palette,
  Shield,
} from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { trackEvent } from "@/lib/analytics";
import { PRODUCTS } from "@/lib/data/products";
import type { ProductCategory } from "@/lib/types";

type UseOption = ProductCategory;
type CarryOption = "one_shoulder" | "both_shoulders" | "hand" | "crossbody";
type PriorityOption = "organization" | "lightweight" | "style" | "durability";

const STEPS = [
  {
    title: "What's your main use?",
    options: [
      { value: "work" as UseOption, label: "Work", icon: Briefcase },
      { value: "school" as UseOption, label: "School", icon: GraduationCap },
      { value: "travel" as UseOption, label: "Travel", icon: Plane },
      { value: "gym" as UseOption, label: "Gym", icon: Dumbbell },
    ],
  },
  {
    title: "How do you carry your bag?",
    options: [
      { value: "one_shoulder" as CarryOption, label: "One shoulder", icon: ShoppingBag },
      { value: "both_shoulders" as CarryOption, label: "Both shoulders", icon: Backpack },
      { value: "hand" as CarryOption, label: "Hand carry", icon: Hand },
      { value: "crossbody" as CarryOption, label: "Cross-body", icon: Crosshair },
    ],
  },
  {
    title: "What matters most?",
    options: [
      { value: "organization" as PriorityOption, label: "Organization", icon: LayoutGrid },
      { value: "lightweight" as PriorityOption, label: "Lightweight", icon: Feather },
      { value: "style" as PriorityOption, label: "Style", icon: Palette },
      { value: "durability" as PriorityOption, label: "Durability", icon: Shield },
    ],
  },
];

// Simple recommendation: prefer products in the chosen category; pick top 2 by relevance
function getRecommendations(answers: {
  use?: UseOption;
  carry?: CarryOption;
  priority?: PriorityOption;
}): typeof PRODUCTS {
  const use = answers.use;
  const byCategory = use
    ? PRODUCTS.filter((p) => p.categories.includes(use))
    : PRODUCTS;
  // Return up to 2; if only one in category, add another from rest
  const first = byCategory.slice(0, 2);
  if (first.length >= 2) return first;
  const rest = PRODUCTS.filter((p) => !first.find((f) => f.id === p.id));
  return [...first, ...rest].slice(0, 2);
}

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{
    use?: UseOption;
    carry?: CarryOption;
    priority?: PriorityOption;
  }>({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [recommendations, setRecommendations] = useState<typeof PRODUCTS>([]);

  const totalSteps = 4;
  const isResultsStep = currentStep === 3;

  useEffect(() => {
    if (currentStep === 0) trackEvent("quiz_start");
  }, [currentStep]);

  const handleOption = (key: "use" | "carry" | "priority", value: UseOption | CarryOption | PriorityOption) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (currentStep < 2) setCurrentStep((s) => s + 1);
    else {
      const nextAnswers = { ...answers, [key]: value };
      const recs = getRecommendations(nextAnswers);
      setRecommendations(recs);
      setQuizComplete(true);
      if (recs[0]) {
        trackEvent("quiz_complete", { result_product_id: recs[0].id });
      }
      setCurrentStep(3);
    }
  };

  const currentStepData = STEPS[currentStep];
  const progress = ((currentStep + (isResultsStep ? 1 : 0)) / totalSteps) * 100;

  return (
    <>
      <section className="bg-surface py-8 md:py-12">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-heading font-bold text-2xl md:text-3xl text-primary tracking-tight">
                Find Your Buhi
              </h1>
              <span className="font-body text-sm text-muted tracking-tight">
                Step {Math.min(currentStep + 1, 4)} of 4
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-8 md:py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto">
            {currentStep < 3 && currentStepData && (
              <>
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((s) => s - 1)}
                    className="font-body text-sm text-muted tracking-tight hover:text-primary mb-6"
                  >
                    ← Back
                  </button>
                )}
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary tracking-tight mb-8">
                  {currentStepData.title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentStepData.options.map((opt) => (
                    <button
                      key={String(opt.value)}
                      type="button"
                      onClick={() =>
                        handleOption(
                          currentStep === 0
                            ? "use"
                            : currentStep === 1
                              ? "carry"
                              : "priority",
                          opt.value
                        )
                      }
                      className="flex flex-col items-center gap-3 p-6 rounded-lg border border-gray-200 bg-white hover:border-primary hover:bg-surface transition-colors min-h-[48px]"
                    >
                      <opt.icon className="w-8 h-8 text-primary" />
                      <span className="font-body text-base text-primary tracking-tight">
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {isResultsStep && (
              <div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary tracking-tight mb-2">
                  Your Picks
                </h2>
                <p className="font-body text-lg text-muted tracking-tight mb-8">
                  Based on your answers, we think you&apos;ll love these.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {recommendations.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center bg-primary text-white font-body text-base rounded-md h-12 px-6 tracking-tight hover:opacity-90 transition-opacity"
                  >
                    Shop All Bags
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(0);
                      setAnswers({});
                      setQuizComplete(false);
                      setRecommendations([]);
                    }}
                    className="inline-flex items-center justify-center bg-white text-primary font-body text-base rounded-md h-12 px-6 tracking-tight border border-primary/20 hover:bg-surface"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
