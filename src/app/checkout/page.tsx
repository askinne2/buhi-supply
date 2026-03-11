"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2, Lock, X } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import { trackEvent } from "@/lib/analytics";

const SHIPPING_THRESHOLD = 75;
const SHIPPING_COST = 8.99;

const inputClass =
  "w-full border border-gray-200 rounded-md px-4 py-3 font-body text-base text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white";
const labelClass = "font-heading font-bold text-lg text-primary mb-4";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemCount, subtotal, clearCart } = useCart();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("United States");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/cart");
    }
  }, [items.length, router]);

  const validate = () => {
    const required = [
      email,
      firstName,
      lastName,
      address1,
      city,
      state,
      zip,
      cardNumber,
      expiry,
      cvv,
      nameOnCard,
    ];
    return required.every((v) => v.trim() !== "");
  };

  const simulateOrder = async () => {
    if (!validate()) {
      setSubmitError("Please fill in all required fields.");
      return;
    }
    setSubmitError(null);
    setOrderError(null);
    setIsProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const lastDigit = parseInt(
      cardNumber.replace(/\s/g, "").slice(-1),
      10
    );
    const isFailure = !Number.isNaN(lastDigit) && lastDigit % 2 !== 0;

    if (isFailure) {
      setIsProcessing(false);
      setOrderError(
        "Your card was declined. Please check your card details and try again. (Tip: use a card number ending in an even digit for demo success.)"
      );
    } else {
      clearCart();
      trackEvent("purchase", { value: subtotal, item_count: itemCount });
      router.push("/order-confirmation");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    simulateOrder();
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-12">
      <nav
        className="font-body text-sm text-muted tracking-tight mb-4"
        aria-label="Breadcrumb"
      >
        <Link href="/cart" className="hover:text-primary transition-colors">
          Cart
        </Link>
        <span className="mx-2">→</span>
        <span className="text-primary">Checkout</span>
      </nav>
      <h1 className="font-heading font-bold text-3xl md:text-4xl text-primary tracking-tight">
        Checkout
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3 space-y-8">
            <section>
              <h2 className={labelClass}>Contact Information</h2>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                aria-label="Email address"
              />
            </section>

            <section>
              <h2 className={labelClass}>Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={inputClass}
                  aria-label="First name"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={inputClass}
                  aria-label="Last name"
                />
              </div>
              <input
                type="text"
                placeholder="Address line 1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className={`${inputClass} mt-4`}
                aria-label="Address line 1"
              />
              <input
                type="text"
                placeholder="Address line 2 / Apt (optional)"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className={`${inputClass} mt-4`}
                aria-label="Address line 2"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={inputClass}
                  aria-label="City"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className={inputClass}
                  aria-label="State"
                />
                <input
                  type="text"
                  placeholder="ZIP"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className={inputClass}
                  aria-label="ZIP"
                />
              </div>
              <input
                type="text"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={`${inputClass} mt-4`}
                aria-label="Country"
              />
            </section>

            <section>
              <h2 className={labelClass}>Payment Details</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800 flex gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" aria-hidden />
                <span>
                  Demo mode — no real payment will be processed. Use any values
                  below.
                </span>
              </div>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className={inputClass}
                aria-label="Card number"
              />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className={inputClass}
                  aria-label="Expiry date"
                />
                <input
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className={inputClass}
                  aria-label="CVV"
                />
              </div>
              <input
                type="text"
                placeholder="Name on card"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
                className={`${inputClass} mt-4`}
                aria-label="Name on card"
              />
            </section>

            <div>
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary text-white font-body text-lg h-14 rounded-md tracking-tight transition-opacity min-h-[48px] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
                    Processing...
                  </>
                ) : (
                  "Place Order"
                )}
              </button>
              {submitError && (
                <p className="mt-4 text-sm text-red-600 font-body">
                  {submitError}
                </p>
              )}
              {orderError && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4 text-sm text-red-700 flex items-start gap-2">
                  <span className="flex-1">{orderError}</span>
                  <button
                    type="button"
                    aria-label="Dismiss error"
                    onClick={() => setOrderError(null)}
                    className="flex-shrink-0 p-1 hover:opacity-70"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24 bg-surface rounded-lg p-6">
              <h2 className="font-heading font-bold text-lg text-primary tracking-tight mb-4">
                Order Summary
              </h2>
              <ul className="space-y-3">
                {items.map(({ product, quantity }) => (
                  <li
                    key={product.id}
                    className="flex gap-3 items-center font-body text-sm text-primary tracking-tight"
                  >
                    <div className="relative w-10 h-10 flex-shrink-0 rounded overflow-hidden bg-white">
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <span className="flex-1 min-w-0 truncate">
                      {product.name} × {quantity}
                    </span>
                    <span className="font-heading font-bold">
                      $
                      {(product.price * quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <hr className="border-gray-200 my-4" />
              <div className="flex justify-between font-body text-sm text-primary tracking-tight">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-body text-sm text-primary tracking-tight mt-2">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600" : ""}>
                  {shipping === 0 ? "FREE" : `$${SHIPPING_COST.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-heading font-bold text-primary tracking-tight mt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted flex items-center gap-1 mt-4">
                <Lock className="w-3 h-3" />
                Secure checkout
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
