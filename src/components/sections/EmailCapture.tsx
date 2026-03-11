"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { trackEvent } from "@/lib/analytics";

export function EmailCapture() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      trackEvent("email_signup", { source: "homepage_footer" });
      setEmail("");
    }
  };

  return (
    <section className="bg-primary text-white py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 text-center">
        <SectionHeader
          title="Join the Buhi Community"
          subtitle="Get 10% off your first order plus exclusive access to new releases, style tips, and special offers"
          variant="dark"
        />
        <div className="max-w-xl mx-auto mt-8">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 h-12 md:h-14 px-4 rounded-l-md rounded-r-md sm:rounded-r-none bg-white text-primary font-body text-base tracking-tight placeholder:text-muted"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="h-12 md:h-14 px-8 bg-accent text-white font-body text-base rounded-md sm:rounded-l-none sm:rounded-r-md tracking-tight hover:opacity-90 transition-opacity"
            >
              Subscribe
            </button>
          </form>
          <p className="font-body text-sm text-white/70 tracking-tight mt-3">
            By subscribing you agree to receive email marketing communications
            from us.
          </p>
        </div>
      </div>
    </section>
  );
}
