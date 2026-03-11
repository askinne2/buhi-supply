"use client";

import { useState } from "react";
import { Mail, Clock, Instagram, Facebook } from "lucide-react";
import { TrustBar } from "@/components/sections/TrustBar";
import { trackEvent } from "@/lib/analytics";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackEvent("contact_form_submit");
    setSubmitted(true);
  };

  return (
    <>
      <section className="bg-surface py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary tracking-tight">
            We&apos;d Love to Hear From You
          </h1>
        </div>
      </section>

      <section className="bg-background py-8 md:py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h2 className="font-heading font-bold text-xl text-primary tracking-tight mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-body text-sm text-muted tracking-tight">
                      Email
                    </p>
                    <a
                      href="mailto:hello@buhisupplyco.com"
                      className="font-body text-base text-primary tracking-tight hover:underline"
                    >
                      hello@buhisupplyco.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-body text-sm text-muted tracking-tight">
                      Response time
                    </p>
                    <p className="font-body text-base text-primary tracking-tight">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="text-primary hover:opacity-80"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a
                      href="https://tiktok.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                      className="text-primary hover:opacity-80"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88 2.1V9.4a6.84 6.84 0 0 0-1.05-.08A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="text-primary hover:opacity-80"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                  </div>
                  <p className="font-body text-sm text-muted tracking-tight">
                    Social
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-heading font-bold text-xl text-primary tracking-tight mb-6">
                Send a Message
              </h2>
              {submitted ? (
                <p className="font-body text-lg text-muted tracking-tight">
                  Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="font-body text-sm text-muted tracking-tight block mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      className="w-full h-12 px-4 rounded-md border border-gray-200 font-body text-base bg-white tracking-tight"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="font-body text-sm text-muted tracking-tight block mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      className="w-full h-12 px-4 rounded-md border border-gray-200 font-body text-base bg-white tracking-tight"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-order"
                      className="font-body text-sm text-muted tracking-tight block mb-2"
                    >
                      Order number (optional)
                    </label>
                    <input
                      id="contact-order"
                      type="text"
                      name="order"
                      className="w-full h-12 px-4 rounded-md border border-gray-200 font-body text-base bg-white tracking-tight"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="font-body text-sm text-muted tracking-tight block mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-200 font-body text-base bg-white tracking-tight resize-y"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white font-body text-base h-12 rounded-md tracking-tight hover:opacity-90 transition-opacity"
                  >
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <TrustBar />
    </>
  );
}
