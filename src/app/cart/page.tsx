"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, X, Lock } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { trackEvent } from "@/lib/analytics";

const SHIPPING_THRESHOLD = 75;
const SHIPPING_COST = 8.99;

export default function CartPage() {
  const router = useRouter();
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart();

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const handleProceedToCheckout = () => {
    trackEvent("checkout_start", { value: subtotal, item_count: itemCount });
    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="pt-24 flex flex-col items-center justify-center min-h-[50vh] px-4">
        <ShoppingCart className="w-16 h-16 text-muted" aria-hidden />
        <h1 className="font-heading font-bold text-2xl text-primary tracking-tight mt-6">
          Your cart is empty
        </h1>
        <p className="font-body text-muted tracking-tight mt-2 text-center">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center justify-center bg-primary text-white font-body text-base rounded-md h-12 px-8 tracking-tight hover:opacity-90 transition-opacity"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-12">
      <h1 className="font-heading font-bold text-3xl md:text-4xl text-primary tracking-tight">
        Your Cart{" "}
        <span className="text-muted font-body font-normal text-xl">
          ({itemCount} {itemCount === 1 ? "item" : "items"})
        </span>
      </h1>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Line items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-white rounded-lg p-4 flex gap-4 items-start border border-gray-100 relative"
            >
              <button
                type="button"
                aria-label="Remove item"
                onClick={() => removeItem(product.id)}
                className="absolute top-4 right-4 p-1 text-muted hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-surface">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex-1 min-w-0 pr-8">
                <h3 className="font-heading font-bold text-primary text-base tracking-tight">
                  {product.name}
                </h3>
                <p className="font-heading font-bold text-primary tracking-tight mt-1">
                  ${product.price.toFixed(2)}
                </p>
                {quantity > 1 && (
                  <p className="font-body text-sm text-muted tracking-tight mt-1">
                    {quantity} × ${product.price.toFixed(2)} = $
                    {(product.price * quantity).toFixed(2)}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() =>
                    updateQuantity(product.id, quantity === 1 ? 0 : quantity - 1)
                  }
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-surface transition-colors font-body text-lg"
                >
                  −
                </button>
                <span className="font-body font-medium w-8 text-center text-primary">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() =>
                    updateQuantity(product.id, Math.min(10, quantity + 1))
                  }
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-surface transition-colors font-body text-lg"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <Link
            href="/shop"
            className="inline-block font-body text-base text-primary tracking-tight hover:underline mt-4"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 bg-surface rounded-lg p-6 space-y-4">
            <h2 className="font-heading font-bold text-lg text-primary tracking-tight">
              Order Summary
            </h2>
            <div className="flex justify-between font-body text-base text-primary tracking-tight">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-body text-base text-primary tracking-tight">
              <span>Shipping</span>
              <span className={shipping === 0 ? "text-green-600" : ""}>
                {shipping === 0 ? "FREE" : `$${SHIPPING_COST.toFixed(2)}`}
              </span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between font-heading font-bold text-lg text-primary tracking-tight">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="w-full bg-primary text-white font-body text-base h-12 rounded-md tracking-tight hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout
            </button>
            <p className="text-xs text-muted text-center flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              Secure checkout · Free returns · Lifetime warranty
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
