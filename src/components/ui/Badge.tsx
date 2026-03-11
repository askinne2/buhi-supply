interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`font-body text-xs text-white tracking-tight px-2 py-1 rounded ${className}`}
    >
      {children}
    </span>
  );
}
