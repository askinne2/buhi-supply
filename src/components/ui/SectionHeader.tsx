interface SectionHeaderProps {
  title: string;
  subtitle: string;
  /** Use "dark" when section background is primary (e.g. email capture) */
  variant?: "default" | "dark";
}

export function SectionHeader({ title, subtitle, variant = "default" }: SectionHeaderProps) {
  const isDark = variant === "dark";
  return (
    <div className="text-center pt-16 pb-8 md:py-12 md:pt-16">
      <h2
        className={`font-heading font-bold text-3xl md:text-5xl tracking-tight leading-tight ${
          isDark ? "text-white" : "text-primary"
        }`}
      >
        {title}
      </h2>
      <p
        className={`font-body text-lg tracking-tight mt-5 max-w-2xl mx-auto ${
          isDark ? "text-white/90" : "text-muted"
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
}
