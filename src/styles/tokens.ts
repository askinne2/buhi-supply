/**
 * Design token constants (mirrors tailwind.config.ts).
 * Use Tailwind classes in components; use these for JS or non-Tailwind contexts.
 */

export const colors = {
  primary: "#3D4A3D",
  accent: "#264252",
  secondary: "#3C422A",
  muted: "#585C62",
  surface: "#F0F2E9",
  background: "#FFFFFF",
} as const;

export const fontFamilies = {
  heading: ["Open Sans", "sans-serif"].join(", "),
  body: ["Average Sans", "sans-serif"].join(", "),
} as const;

export const spacing = {
  1: 8,
  2: 16,
  3: 24,
  4: 32,
  5: 40,
  6: 48,
  8: 64,
  10: 80,
  12: 96,
} as const;

export const borderRadius = {
  button: 6,
  card: 8,
} as const;

export const boxShadow = {
  card: "0px 1px 2px rgba(0,0,0,0.05)",
  wishlistBtn: "0px 2px 4px rgba(0,0,0,0.1)",
} as const;
