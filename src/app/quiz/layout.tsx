import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Your Perfect Buhi — Take the Quiz",
  description:
    "Answer a few questions and we'll recommend the best Buhi bag for your lifestyle.",
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
