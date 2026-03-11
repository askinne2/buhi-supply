"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const INSTAGRAM_URL = "https://instagram.com/buhisupplyco";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-accent text-white text-sm text-center py-2 px-4 relative">
      <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-2 pr-8">
        <span className="font-body tracking-tight">
          <span className="hidden sm:inline">
            🛍️ <strong>Site Under Construction</strong> — New pages and full shopping experience coming soon.{" "}
            <Link
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Follow us on Instagram →
            </Link>
          </span>
          <span className="sm:hidden">
            Site Under Construction — Coming Soon.
          </span>
        </span>
      </div>
      <button
        type="button"
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/20 transition-colors"
        onClick={() => setDismissed(true)}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
