"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Package, Truck, Mail } from "lucide-react";

function randomOrderId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

export default function OrderConfirmationPage() {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    setOrderId(randomOrderId());
  }, []);

  return (
    <div className="max-w-lg mx-auto px-4 pt-16 pb-24 text-center">
      <CheckCircle
        className="w-20 h-20 text-green-500 mx-auto"
        aria-hidden
      />
      <h1 className="font-heading font-bold text-4xl text-primary tracking-tight mt-6">
        Order Confirmed!
      </h1>
      <p className="font-body text-lg text-muted tracking-tight mt-4">
        Thank you for your order. In a real store, you&apos;d receive a
        confirmation email shortly. Your bag is on its way! 🎉
      </p>
      {orderId && (
        <p className="font-heading font-bold text-primary tracking-tight mt-4">
          Order #BUHI-{orderId}
        </p>
      )}
      <div className="bg-surface rounded-lg p-6 w-full text-left space-y-3 mt-8">
        <div className="flex items-center gap-3 text-sm font-body text-muted tracking-tight">
          <Package className="w-5 h-5 text-primary flex-shrink-0" />
          <span>Your order is being prepared</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-body text-muted tracking-tight">
          <Truck className="w-5 h-5 text-primary flex-shrink-0" />
          <span>Estimated delivery: 3-5 business days</span>
        </div>
        <div className="flex items-center gap-3 text-sm font-body text-muted tracking-tight">
          <Mail className="w-5 h-5 text-primary flex-shrink-0" />
          <span>A confirmation email would be sent to your address</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center bg-primary text-white font-body text-base rounded-md h-12 px-8 tracking-tight hover:opacity-90 transition-opacity"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-white text-primary font-body text-base rounded-md h-12 px-8 tracking-tight border border-primary/20 hover:bg-surface transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
