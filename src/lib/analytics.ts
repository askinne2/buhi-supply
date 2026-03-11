/**
 * Central analytics: GA4 (via GTM), Meta Pixel, TikTok Pixel.
 * Never call window.gtag / window.fbq / window.ttq directly — use trackEvent.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (name: string, payload?: Record<string, unknown>) => void };
  }
}

export type AnalyticsEvent =
  | "product_view"
  | "add_to_cart"
  | "email_signup"
  | "quiz_start"
  | "quiz_complete"
  | "lifestyle_category_click"
  | "contact_form_submit"
  | "checkout_start"
  | "purchase";

export type EventParams = {
  product_id?: string;
  name?: string;
  price?: number;
  source?: string;
  category?: string;
  result_product_id?: string;
  value?: number;
  item_count?: number;
};

export function trackEvent(
  event: AnalyticsEvent,
  params?: EventParams
): void {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", event, params);
  }
  if (window.fbq) {
    window.fbq("track", "CustomEvent", { eventName: event, ...params });
  }
  if (window.ttq?.track) {
    window.ttq.track(event, params as Record<string, unknown>);
  }
}
