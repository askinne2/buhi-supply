"use client";

import { CartContextProvider } from "@/lib/context/CartContext";

export function CartProvider({ children }: { children: React.ReactNode }) {
  return <CartContextProvider>{children}</CartContextProvider>;
}
