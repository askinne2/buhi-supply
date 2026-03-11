# Buhi Supply Co — Cart & Checkout Implementation

## Overview

Implement a fully functional demo cart and checkout system with no real payment processing,
no Stripe, no backend, no email confirmations. Everything runs in client-side state only.

The experience should feel like a real e-commerce checkout — polished, on-brand, with
success and failure states — but all order processing is simulated.

Read `.cursorrules` before writing any code. Follow all design tokens, component patterns,
and conventions defined there without exception.

---

## Architecture

```
CartContext (React Context + localStorage)
    ↓
Header cart icon (live badge count) → /cart
    ↓
/cart page (line items + order summary)
    ↓
"Proceed to Checkout" → /checkout
    ↓
/checkout page (mock form + order summary sidebar)
    ↓
Simulate 1.5s processing → success or failure state
    ↓
Success: /order-confirmation
Failure: inline error on /checkout (stay on page)
```

No API routes. No external services. No environment variables needed.

---

## Step 1 — Cart Context

**File:** `src/lib/context/CartContext.tsx`

Create a React Context that manages all cart state globally.

### Types (add to `src/lib/types.ts`):

```ts
export interface CartItem {
  product: Product
  quantity: number
}

export interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}
```

### CartContext behavior:

- `addItem`: if product already in cart, increment quantity. Otherwise add new item with qty 1 (or passed qty).
- `removeItem`: remove by product id.
- `updateQuantity`: set quantity. If quantity <= 0, remove the item.
- `itemCount`: sum of all item quantities (shows in header badge).
- `subtotal`: sum of (item.product.price * item.quantity) for all items.
- Persist entire `items` array to `localStorage` under key `buhi-cart` on every change.
- On mount, hydrate from `localStorage` using `useEffect`. Handle JSON parse errors gracefully (clear storage on error).
- Export a `useCart()` hook that throws if used outside `<CartProvider>`.

### Wrap the app:

In `src/app/layout.tsx`, wrap `<Header />` + `<main>` + `<Footer />` with `<CartProvider>`.
CartProvider must be a Client Component (`'use client'`).

---

## Step 2 — Wire Up Existing Components

### Header (`src/components/layout/Header.tsx`):

- Import `useCart()`.
- Replace hardcoded badge `0` with `{itemCount}`.
- Only show badge when `itemCount > 0`.
- Make the cart icon a `<Link href="/cart">` instead of a plain button.
- Badge styling: `bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-2`.

### ProductCard (`src/components/ui/ProductCard.tsx`):

- Import `useCart()`.
- On "Add to Cart" click: call `addItem(product)` from context AND fire existing `trackEvent('add_to_cart', ...)`.
- Show a brief "Added!" confirmation state on the button for 1.5 seconds after clicking (use `useState` for `added` boolean, reset with `setTimeout`).
- Button text: default "Add to Cart" → "Added! ✓" for 1.5s → back to "Add to Cart".
- Button during "Added!" state: `bg-accent` instead of `bg-primary`.

### Product Detail page (`src/app/products/[slug]/page.tsx`):

- Import `useCart()`.
- `handleAddToCart` should call `addItem(product, quantity)` from context (passing the selected quantity from the stepper).
- Keep the existing `trackEvent` call.
- Same "Added!" button state as ProductCard (1.5s feedback).

---

## Step 3 — Cart Page

**File:** `src/app/cart/page.tsx`

This is a Client Component (`'use client'`).

### Empty state:

When `items.length === 0`, show:
- Centered layout, top padding `pt-24`
- ShoppingCart icon (lucide-react, size 64, `text-muted`)
- Heading "Your cart is empty" (`font-heading font-bold text-2xl text-primary`)
- Subtext "Looks like you haven't added anything yet."
- Button: "Start Shopping" → `/shop` (`bg-primary text-white`)

### Filled state layout:

Two-column desktop (`grid-cols-1 lg:grid-cols-3 gap-8`):
- Left: `lg:col-span-2` — cart line items
- Right: `lg:col-span-1` — order summary (sticky `top-24`)

Page heading: "Your Cart" + item count e.g. "(3 items)" in `text-muted font-body`.

### Cart line items (left column):

Each item in a white card row (`bg-white rounded-lg p-4 flex gap-4 items-start border border-gray-100`):

- Product image: `next/image`, `w-20 h-20` (80×80), `object-cover rounded-md`
- Product info (flex-1):
  - Name: `font-heading font-bold text-primary text-base`
  - Price: `font-heading font-bold text-primary` (unit price)
  - Line total: `font-body text-sm text-muted` — e.g. "2 × $89.00 = $178.00" (only show when qty > 1)
- Quantity stepper: minus button / quantity display / plus button
  - Buttons: `w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-surface`
  - Minus: calls `updateQuantity(id, qty - 1)`. If qty is 1, minus removes the item (same as removeItem).
  - Plus: calls `updateQuantity(id, qty + 1)`. Max quantity: 10.
  - Quantity number: `font-body font-medium w-8 text-center`
- Remove button: `X` (lucide-react `X` icon, small), top-right of the row, `text-muted hover:text-red-500`

Below items: "← Continue Shopping" text link back to `/shop`.

### Order summary (right column):

Card: `bg-surface rounded-lg p-6 space-y-4`

Content:
- Heading "Order Summary" (`font-heading font-bold text-lg text-primary`)
- Subtotal row: "Subtotal" + `$${subtotal.toFixed(2)}`
- Shipping row: "Shipping" + "FREE" (green `text-green-600`) if subtotal >= 75, otherwise "$8.99"
- Divider `<hr>`
- Total row: "Total" (bold) + calculated total (bold, larger)
- "Proceed to Checkout" button: full-width `bg-primary text-white h-12 rounded-md font-body text-base`
  - On click: `router.push('/checkout')` (use `useRouter` from `next/navigation`)
  - Fire `trackEvent('checkout_start', { value: subtotal, item_count: itemCount })`
- Below button: small trust line with lock icon: "Secure checkout · Free returns · Lifetime warranty" (`text-xs text-muted text-center`)

### Metadata:

```ts
export const metadata = {
  title: 'Your Cart — Buhi Supply Co',
}
```

Note: since this is a Client Component, metadata must be in a separate `layout.tsx` inside `src/app/cart/` or handled via `<title>` tag directly.

---

## Step 4 — Checkout Page

**File:** `src/app/checkout/page.tsx`

Client Component (`'use client'`).

Redirect to `/cart` if cart is empty on mount (use `useEffect` + `useRouter`).

### Layout:

Two-column desktop (`grid-cols-1 lg:grid-cols-5 gap-8`), single column mobile:
- Left: `lg:col-span-3` — checkout form
- Right: `lg:col-span-2` — order summary sidebar (sticky `top-24`)

Page heading: "Checkout" with a small breadcrumb above: "Cart → Checkout"

### Checkout form (left):

Use `useState` for all field values. No form library needed.

Group fields into three sections with subheadings:

**Contact Information**
- Email address (full width)

**Shipping Address**
- First name + Last name (side by side on desktop, stacked mobile)
- Address line 1 (full width)
- Address line 2 / Apt (full width, optional label)
- City + State + ZIP (three columns desktop, stacked mobile)
- Country (full width, default "United States")

**Payment Details** (mock — clearly labeled as demo)
- Small notice banner above payment fields: yellow/amber background `bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800` with ⚠️ icon: "Demo mode — no real payment will be processed. Use any values below."
- Card number (full width, placeholder "1234 5678 9012 3456")
- Expiry date + CVV (side by side, placeholders "MM/YY" and "123")
- Name on card (full width)

**Form field styling** (apply consistently to all inputs):
```
className="w-full border border-gray-200 rounded-md px-4 py-3 font-body text-base
text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2
focus:ring-primary/30 focus:border-primary bg-white"
```

**Section subheadings:**
```
className="font-heading font-bold text-lg text-primary mb-4"
```

**Form validation** (basic, on submit only):
- Required fields: email, first name, last name, address, city, state, zip, card number, expiry, CVV, name on card.
- If any required field is empty on submit, show a red error message below the submit button: "Please fill in all required fields."
- No per-field validation needed, just the single submit-time check.

**Submit button:**
- Full width, `bg-primary text-white h-14 rounded-md font-body text-lg`
- Text: "Place Order"
- On click: validate → if invalid show error → if valid start simulation
- During simulation: button disabled, text changes to "Processing..." with a spinner (use CSS `animate-spin` on a small circle div or lucide-react `Loader2` icon)

### Simulation logic:

```ts
const simulateOrder = async () => {
  setIsProcessing(true)
  setOrderError(null)
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Use card number last digit to determine outcome:
  // Any card number ending in an even digit = success
  // Any card number ending in an odd digit = failure (for demo testing)
  // Default (no card / unrecognized) = success
  
  const lastDigit = parseInt(cardNumber.replace(/\s/g, '').slice(-1))
  const isFailure = !isNaN(lastDigit) && lastDigit % 2 !== 0
  
  if (isFailure) {
    setIsProcessing(false)
    setOrderError(
      'Your card was declined. Please check your card details and try again. (Tip: use a card number ending in an even digit for demo success.)'
    )
  } else {
    clearCart()
    trackEvent('purchase', { value: subtotal, item_count: itemCount })
    router.push('/order-confirmation')
  }
}
```

**Error display:**
- Red banner below submit button: `bg-red-50 border border-red-200 rounded-md p-4 text-sm text-red-700`
- Include the error message from `orderError` state
- Show an X icon (lucide-react) to dismiss

### Order summary sidebar (right):

Card: `bg-surface rounded-lg p-6`

Content:
- Heading "Order Summary"
- List each cart item: small image (40×40) + name + qty + line total
- Divider
- Subtotal, shipping (FREE if >= $75 else $8.99), total
- Lock icon + "Secure checkout" in small muted text at bottom

---

## Step 5 — Order Confirmation Page

**File:** `src/app/order-confirmation/page.tsx`

Client Component. No cart data needed here (cart is already cleared by checkout).

### Layout:

Centered, max-width `max-w-lg mx-auto`, generous top padding `pt-16 pb-24`.

Content (vertically stacked, centered):

1. **Success icon:** `CheckCircle` (lucide-react), `w-20 h-20 text-green-500 mx-auto`
2. **Heading:** "Order Confirmed!" — `font-heading font-bold text-4xl text-primary text-center`
3. **Subtext:** "Thank you for your order. In a real store, you'd receive a confirmation email shortly. Your bag is on its way! 🎉"
   - Style: `font-body text-lg text-muted text-center`
4. **Mock order number:** Generate a random 8-character alphanumeric order ID on mount (`useEffect`) and display: "Order #BUHI-XXXXXXXX" in `font-heading font-bold text-primary`
5. **What's next box:** `bg-surface rounded-lg p-6 w-full text-left space-y-3`
   - Row with Package icon: "Your order is being prepared"
   - Row with Truck icon: "Estimated delivery: 3-5 business days"  
   - Row with Mail icon: "A confirmation email would be sent to your address"
   - Each row: icon + text side by side, `text-sm font-body text-muted`
6. **CTA buttons** (stacked, full width on mobile, side by side on desktop):
   - "Continue Shopping" → `/shop` (primary button)
   - "Back to Home" → `/` (secondary/outline button)

### Metadata:

```ts
export const metadata = {
  title: 'Order Confirmed — Buhi Supply Co',
}
```

---

## Step 6 — Update .cursorrules

After implementation, append the following to `.cursorrules`:

```
## CART SYSTEM

CartContext is at `src/lib/context/CartContext.tsx`.
- All components needing cart state MUST use `useCart()` hook
- Never manage cart state locally in a component
- Never call localStorage directly for cart — always go through CartContext
- CartProvider wraps the entire app in layout.tsx

Cart flow: ProductCard/ProductDetail → addItem() → /cart → /checkout → /order-confirmation

## CHECKOUT

Checkout is demo only — no Stripe, no API routes, no payments.
Simulation: card number ending in even digit = success, odd = failure.
On success: clearCart() then router.push('/order-confirmation').
On failure: show inline error, stay on /checkout page.
Never add real payment processing without explicit instruction.
```

---

## Implementation Order

Run these in sequence in Cursor agent mode. Verify each step builds before proceeding.

1. Add `CartItem` and `CartContextType` to `src/lib/types.ts`
2. Create `src/lib/context/CartContext.tsx`
3. Wrap layout in `CartProvider`
4. Update Header (badge + link)
5. Update ProductCard (addItem + "Added!" state)
6. Update Product Detail page (addItem with quantity)
7. Create `/cart` page
8. Create `/checkout` page
9. Create `/order-confirmation` page
10. Append cart rules to `.cursorrules`
11. Run `npm run build` — fix any TypeScript errors before marking done

---

## What NOT to Do

- Do NOT install any new npm packages (no Stripe, no form libraries, no state management libraries)
- Do NOT create any API routes
- Do NOT add any environment variables
- Do NOT implement email sending of any kind
- Do NOT use Zustand, Redux, Jotai, or any external state library — React Context only
- Do NOT add per-field real-time validation — submit-time check only
- Do NOT hardcode cart state — always derive from context