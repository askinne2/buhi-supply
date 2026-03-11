## Buhi Supply Co — Cursor Prompt Kit

### 🔧 Phase 0 — Scaffold (run in terminal, NOT Cursor)

```bash
npx create-next-app@latest buhi-supply \
  --typescript --tailwind --eslint --app --src-dir
cd buhi-supply
npm install @next/font lucide-react
```

---

### 📐 Phase 1 — Design Tokens

Paste this into Cursor chat:

> Set up Buhi's design tokens in `tailwind.config.ts`. Extend the theme with these exact values:
>
> **Colors:**
> - `primary`: `#3D4A3D`
> - `accent`: `#264252`
> - `secondary`: `#3C422A`
> - `muted`: `#585C62`
> - `surface`: `#F0F2E9`
> - `background`: `#FFFFFF`
>
> **Font families:**
> - `heading`: `['Open Sans', 'sans-serif']`
> - `body`: `['Average Sans', 'sans-serif']`
>
> **Spacing:** extend the default scale with an `8px` base unit (spacing multipliers: 1=8px, 2=16px, 3=24px, etc.)
>
> **Border radius:** `button: 6px`, `card: 8px`
>
> Also update `src/app/layout.tsx` to import Open Sans and Average Sans from Google Fonts using `next/font/google`, applying them as CSS variables `--font-heading` and `--font-body`.

---

### 🧱 Phase 2 — Layout Shell

> Create two layout components:
>
> **`src/components/layout/Header.tsx`** — a sticky top navigation bar. White background, 80px height on desktop. Layout: Logo left (use a text placeholder "BUHI" in `font-heading font-bold` for now), nav links centered (Shop, Work, School, Travel, About, Contact) in `font-body text-muted`, and right side icons (search icon, cart icon with badge, and a filled `bg-primary` button "Shop Bestsellers"). On mobile: hamburger menu left, centered logo, cart + search right. Use `lucide-react` for icons. Make it sticky with `z-50`.
>
> **`src/components/layout/Footer.tsx`** — dark footer with `bg-primary text-white`. Four columns: brand (logo + tagline + social icons), Shop links, Support links, Company links. On mobile, collapse to stacked accordion sections. Bottom bar shows copyright.
>
> Wrap both in `src/app/layout.tsx`.

---

### 🦸 Phase 3 — Hero Section

> Create `src/components/sections/Hero.tsx`. Full-width, 800px tall on desktop. Full-bleed background image (`object-cover`) with a dark gradient overlay (`from-black/40 to-black/20`). Centered content block with:
> - H1: "Bags That Move With Your Life" — `font-heading font-bold text-6xl text-white text-center`
> - Subtext: "Versatile, durable, and designed for work, school, gym, and travel. Find your perfect Buhi." — `font-body text-white/90 text-xl text-center`
> - Two buttons side by side: "Shop Bestsellers" (`bg-primary text-white rounded-[6px] h-[60px] px-8`) and "Find Your Buhi Quiz" (`bg-white text-primary rounded-[6px] h-[60px] px-8`)
>
> On mobile: stack buttons vertically, reduce heading to `text-4xl`, image fills 600px height.
>
> Use a placeholder image from `/public/images/hero.jpg` for now.

---

### 🗂️ Phase 4 — Shop by Lifestyle

> Create `src/components/sections/LifestyleCategories.tsx`. Background `bg-surface`. Section heading "Shop by Lifestyle" centered in `font-heading`. Four cards in a horizontal row on desktop, 2-column grid on mobile. Each card has: a square image with dark overlay, category name (Work/School/Travel/Gym) as `font-heading font-bold text-white`, short description, and a CTA button overlaid on the image. Card data should come from a typed props array so it's reusable.

---

### 🛍️ Phase 5 — Product Card + Bestsellers Grid

> First, create `src/components/ui/ProductCard.tsx`. Props: `name`, `description`, `price`, `rating`, `reviewCount`, `image`, `badge` (optional — "Trending", "New", etc.), `onAddToCart`. Card design: white background, `rounded-[8px]`, subtle shadow. Image top 320px tall with `object-cover`, wishlist heart button top-right. Below: product name in `font-heading font-bold text-primary text-xl`, description in `font-body text-muted text-sm`, price in `font-heading font-bold text-2xl`, star rating row, full-width "Add to Cart" button `bg-primary text-white h-[48px] rounded-[6px]`.
>
> Then create `src/components/sections/Bestsellers.tsx` that renders a 3-column desktop / 2-column mobile grid of `ProductCard` components using this product data: [Commuter Backpack $89 (124 reviews), Daily Tote $79 (98 reviews), Weekender Duffel $99 (156 reviews), Compact Crossbody $59 (67 reviews), Tech Sleeve $39 (89 reviews), Mini Backpack $69 (43 reviews)]. Background `bg-surface`.

---

### ✅ Phase 6 — Trust Bar

> Create `src/components/sections/TrustBar.tsx`. White background, three columns centered. Each column: icon (use lucide-react — Truck, Shield, RotateCcw), bold heading, short subtext. Content: "Free Shipping / On orders over $75", "Lifetime Warranty / Quality guaranteed", "30-Day Returns / Hassle-free returns". On mobile, stack vertically.

---

### 💬 Phase 7 — Testimonials

> Create `src/components/sections/Testimonials.tsx`. Light background. Single centered testimonial with: circular avatar image, 5 star rating, quote text in `font-body italic`, reviewer name and title. Add prev/next dot navigation for carousel behavior using `useState`. On desktop max-width 960px centered.

---

### 📧 Phase 8 — Email Capture

> Create `src/components/sections/EmailCapture.tsx`. Background `bg-primary text-white`. Centered content: H2 "Join the Buhi Community", subtext about 15% off first order, email input + "Subscribe" button side by side on desktop, stacked on mobile. Input: white background, `rounded-l-[6px]`. Button: `bg-accent text-white rounded-r-[6px]`. Add a `useAnalytics` hook call on submit (placeholder for now).

---

### 📸 Phase 9 — UGC / #BuhiEverywhere

> Create `src/components/sections/UGCFeed.tsx`. Section heading "#BuhiEverywhere", subtext "See how our community carries Buhi", Instagram follow button. Below: a 6-image square grid on desktop, horizontal scrollable row on mobile. Images are placeholders from `/public/images/ugc/` for now. Each image is square with `object-cover`.

---

### 🏠 Phase 10 — Assemble the Homepage

> Update `src/app/page.tsx` to import and render all sections in order:
> 1. `<Hero />`
> 2. `<LifestyleCategories />`
> 3. `<Bestsellers />`
> 4. `<TrustBar />`
> 5. `<Testimonials />`
> 6. `<EmailCapture />`
> 7. `<UGCFeed />`
>
> Verify the page renders correctly at 1440px desktop and 375px mobile widths.

---

### 📊 Phase 11 — Analytics Setup

> Create `src/lib/analytics.ts` with a `trackEvent` function that supports GA4 via `window.gtag`, Meta Pixel via `window.fbq`, and TikTok Pixel via `window.ttq`. Events to support: `product_view`, `add_to_cart`, `email_signup`, `quiz_start`. Create `src/components/GoogleTagManager.tsx` that injects the GTM script tags into `<head>` using Next.js `Script` component with `strategy="afterInteractive"`. Add it to `layout.tsx`.

---

### 💡 Pro Tips for Using These in Cursor

- Run one phase at a time — don't paste multiple phases at once
- After each phase, check the browser at both 1440px and 375px before moving on
- If Cursor goes off-track, paste the relevant Figma node ID and say: *"Reference Figma node `[ID]` for the exact design spec"*
- Key node IDs to know:
  - Header: `5:340`
  - Hero: `5:334`
  - Lifestyle Categories: `5:335`
  - Bestsellers: `5:336`
  - Desktop full page: `5:331`
  - Mobile full page: `7:396`

Want me to also write the Cursor Rules file (`.cursorrules`) that you'd drop in the project root to keep Claude consistent across all sessions?