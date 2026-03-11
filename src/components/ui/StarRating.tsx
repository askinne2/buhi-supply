import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount: number;
  className?: string;
}

export function StarRating({ rating, reviewCount, className = "" }: StarRatingProps) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className="w-4 h-4 text-amber-400 fill-amber-400"
            aria-hidden
          />
        ))}
      </div>
      <span className="font-body text-sm text-muted tracking-tight">
        ({reviewCount})
      </span>
    </div>
  );
}
