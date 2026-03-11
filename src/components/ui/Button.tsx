import Link from "next/link";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  type?: "button" | "submit";
  className?: string;
  onClick?: () => void;
  mobileFullWidth?: boolean;
}

const base =
  "inline-flex items-center justify-center font-body text-base rounded-md h-12 md:h-[60px] px-6 md:px-8 tracking-tight transition-opacity";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:opacity-90",
  secondary:
    "bg-white text-primary border border-primary/20 hover:bg-surface",
};

export function Button({
  children,
  variant = "primary",
  href,
  type = "button",
  className = "",
  onClick,
  mobileFullWidth = false,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${mobileFullWidth ? "w-full md:w-auto" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
