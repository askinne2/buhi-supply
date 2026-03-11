## The Pages You Need

From the nav: **Shop, Work, School, Travel, About, Contact** plus the linked pages: **Product Detail, FAQ, Find Your Buhi Quiz, Buhi Everywhere Campaign**

That's roughly 10 pages, but most share the same layout patterns so it's not as much work as it sounds.

# Before building any pages, extract the product array from the homepage into src/lib/data/products.ts and add a slug field to each product. Import from there in all pages.

---

## The Strategy: Content-First Prompting

Since you have no mockups, the key is giving Cursor **the content + the design rules** and letting it figure out layout. The `.cursorrules` file handles the design rules. You just need to front-load the content and purpose of each page in the prompt.

The formula for each page prompt is:
```
Page purpose → Key sections → Content/copy → Component reuse rules → SEO metadata
```

---

## Page-by-Page Prompt Kit (No Mockups Needed)

---

### 📦 Shop / Collections — `/shop`

> Create `src/app/shop/page.tsx`. This is the main collections page showing all 6 products in a filterable grid.
>
> Layout:
> - Page hero: small `bg-surface` banner, `h-[200px]`, headline "All Bags" with breadcrumb "Home / Shop"
> - Filter bar below hero: pill buttons for All, Work, School, Travel, Gym — active state uses `bg-primary text-white`, inactive uses `bg-white border border-gray-200`. Use `useState` to track active filter.
> - Product grid: 3 columns desktop, 2 columns mobile, filtered by active category using the same `ProductCard` component from homepage
> - All 6 products from `src/lib/types.ts` — reuse the same product data array, extract it to `src/lib/data/products.ts` so both homepage and shop page can import it
>
> Page metadata: title "Shop All Bags — Buhi Supply Co", description "Browse our full collection of backpacks, totes, duffels, and more."

---

### 👔 Work / School / Travel / Gym — `/work`, `/school`, `/travel`, `/gym`

> Create a dynamic category page template at `src/app/[category]/page.tsx` that works for all four lifestyle categories.
>
> Layout:
> - Full-width lifestyle hero image (use the matching image from `public/images/lifestyle/[category].jpg`), 400px tall, dark overlay, category name as large white heading, short description
> - "Shop [Category] Bags" product grid below — filtered products for that category using the shared product data
> - Trust bar section (reuse `<TrustBar />`)
> - Email capture at bottom (reuse `<EmailCapture />`)
>
> Generate static params for: `work`, `school`, `travel`, `gym`
>
> Category copy:
> - Work: "Professional bags engineered for the modern workplace. Organized, polished, and ready for anything."
> - School: "Stay organized from first period to finals. Smart compartments for every student."
> - Travel: "Adventure-ready bags built to keep up with your itinerary."
> - Gym: "Lightweight, durable bags that go from locker room to street without missing a beat."

---

### 🛍️ Product Detail — `/products/[slug]`

> Create `src/app/products/[slug]/page.tsx`. This is the most important conversion page — add-to-cart must be above the fold on mobile.
>
> Layout (desktop: 2-column, mobile: stacked):
> - Left: product image gallery (main image + 3 thumbnail placeholders), `sticky top-24`
> - Right: breadcrumb → product name (h1) → star rating + review count → price → short description → color/size selector (placeholder dropdowns) → quantity selector → "Add to Cart" button (full-width `bg-primary`, `h-[56px]`) → "Add to Wishlist" text link → divider → feature highlights (3 bullet points with lucide-react icons: Padded laptop sleeve, Water-resistant exterior, Lifetime warranty) → accordion FAQ (3 questions)
>
> Below the fold: "You Might Also Like" — 3 related `ProductCard` components
>
> Generate static params from the 6 products in `src/lib/data/products.ts`. Add a `slug` field to the Product type.
>
> On "Add to Cart" click, fire `trackEvent('add_to_cart', { product_id, name, price })`.

---

### ℹ️ About — `/about`

> Create `src/app/about/page.tsx`. Brand story page.
>
> Sections in order:
> 1. **Hero** — `bg-surface`, centered, headline "Built for the Way You Move", subtext about the brand origin
> 2. **Brand story** — 2-column layout: left is a large lifestyle image (`public/images/hero.jpg`), right is copy: "Buhi Supply Co was born from a simple frustration — bags that looked great but couldn't keep up with real life. We set out to build something different: bags designed around how people actually move through their day — from desk to gym, campus to airport, meeting to weekend."
> 3. **Values row** — 3 columns: Quality (Shield icon), Versatility (Repeat icon), Community (Users icon) — each with a heading and 2-sentence description
> 4. **Stats bar** — `bg-primary text-white`, 3 stats: "50,000+ Happy Customers", "4.9 Average Rating", "Lifetime Warranty on Every Bag"
> 5. **Email capture** — reuse `<EmailCapture />`

---

### ❓ FAQ — `/faq`

> Create `src/app/faq/page.tsx`.
>
> Layout:
> - Small `bg-surface` page hero: "Frequently Asked Questions", subtext "Everything you need to know about Buhi bags"
> - Accordion FAQ list using `useState` for open/close — use lucide-react `ChevronDown` icon
> - Group questions into 3 categories with subheadings: **Shipping & Returns**, **Products & Care**, **Orders & Payment**
>
> Questions to include:
> - Shipping: "How long does shipping take? (3-5 business days standard)", "Do you offer free shipping? (Yes, on orders over $75)", "What is your return policy? (30 days, hassle-free)"
> - Products: "What materials are your bags made from?", "Are Buhi bags water resistant?", "How do I clean my bag?", "What does the lifetime warranty cover?"
> - Orders: "Can I change or cancel my order?", "Do you offer gift wrapping?", "What payment methods do you accept?"

---

### 📬 Contact — `/contact`

> Create `src/app/contact/page.tsx`.
>
> Layout:
> - `bg-surface` page hero: "We'd Love to Hear From You"
> - 2-column layout desktop, stacked mobile:
>   - Left: contact info — Email (Mail icon) `hello@buhisupplyco.com`, Response time (Clock icon) "We respond within 24 hours", Social links (Instagram, TikTok, Facebook)
>   - Right: contact form with fields: Name, Email, Order number (optional), Message (textarea), Submit button `bg-primary`
> - Form submission calls `trackEvent('contact_form_submit')`
> - Below form: trust row — same 3 items from TrustBar

---

### 🧭 Find Your Buhi Quiz — `/quiz`

> Create `src/app/quiz/page.tsx`. Multi-step product recommendation quiz.
>
> Use `useState` for `currentStep` (0–3) and `answers` object.
>
> 4 steps:
> 1. "What's your main use?" — Work / School / Travel / Gym (large tap-target cards with icons)
> 2. "How do you carry your bag?" — One shoulder / Both shoulders / Hand carry / Cross-body
> 3. "What matters most?" — Organization / Lightweight / Style / Durability
> 4. Results — show 2 recommended `ProductCard` components based on answers (map answer combinations to products in a simple lookup object)
>
> Progress bar at top showing step X of 4. Back button on steps 2+.
> On completion fire `trackEvent('quiz_complete', { result_product_id })`.
>
> Page metadata: title "Find Your Perfect Buhi — Take the Quiz"

---

### 🌍 Buhi Everywhere — `/buhi-everywhere`

> Create `src/app/buhi-everywhere/page.tsx`. Campaign landing page.
>
> Sections:
> 1. **Hero** — full-bleed `bg-primary text-white`, "#BuhiEverywhere Challenge", subtext "Share your Buhi moment with the community"
> 2. **How it works** — 3 steps: Buy your Buhi → Share a photo with #BuhiEverywhere → Get featured on our site
> 3. **UGC grid** — reuse `<UGCFeed />` component
> 4. **Featured products** — 3 `ProductCard` components (Commuter Backpack, Daily Tote, Weekender Duffel)
> 5. **Email capture** — reuse `<EmailCapture />`

---
