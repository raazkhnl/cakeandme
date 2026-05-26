# Changelog

All notable changes to **Cakes by Ratna**.

## `feat/cakes-by-ratna-app` — full-feature build

### Added — public site
- `/checkout/success` and `/checkout/cancel` (confetti + copyable order code)
- `/forgot-password` flow (Firebase password reset)
- `/account` — profile, phone, full address book (CRUD)
- `/categories` (listing) and `/categories/[slug]` (detail)
- `/gallery`, `/faq`, `/privacy`, `/terms`, `/booking`, `/search`, `/wishlist`
- Hero CTA now routes to `/booking` (consultation form)
- Skip-to-content link, WhatsApp floating button, scroll-to-top
- Newsletter subscribe component on home, footer-aware
- Global `loading.tsx`, `error.tsx`, `global-error.tsx`, plus segment-level loading/error for `/shop` and `/admin`

### Added — product detail
- New `ProductGallery` carousel (replaces static thumbs)
- Wishlist heart on product detail
- `ReviewSection` with star input + moderation gating

### Added — payments
- Khalti API routes — `/api/payments/khalti/init` + `/verify`
- eSewa verify route — `/api/payments/esewa/verify`
- eSewa client-side POST form submission
- Coupon support in checkout (percent / amount, min-subtotal, expiry)

### Added — admin
- **Customers** view (aggregated from orders) with search + CSV export
- **Coupons** CRUD
- **Reviews** moderation (approve / unpublish / delete) per product
- **Messages** inbox (contact + booking forms) with resolve / reply / delete
- **Newsletter** subscribers list with CSV export
- **Orders**: bulk status update + CSV export
- Sidebar redesigned with all sections

### Added — backend / data
- `firestore.rules` and `storage.rules` (admin-gated writes, public reads where appropriate)
- New collections: `users` (profile + addresses + wishlist), `coupons`, `newsletter`, `messages`; reviews live under `products/{id}/reviews`
- `users.ts`, `reviews.ts`, `coupons.ts`, `newsletter.ts`, `messages.ts` data adapters with seed/localStorage fallback
- API routes: `/api/orders`, `/api/newsletter`, `/api/contact`
- `useAuth` now ensures a `users/{uid}` profile exists on sign-in; adds `resetPassword`

### Added — SEO / PWA
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`
- Twitter + OG metadata with hero image

### Polished
- Hydration-safe cart count in `Navbar`
- Cart drawer + page styling tightened
- Footer expanded to four columns with full nav, FAQ, legal
- Search dialog accessible from navbar (⌘K / ctrl-K)
- Color tokens defined as HSL, dark/light parity verified

## `next-migration` — scaffold

- Replaced CRA scaffold with Next.js 15 + TypeScript + Tailwind v3
- Set up Firebase client + storage + auth
- Built home, shop, product detail, cart, checkout, track, login/signup, about/contact, admin (dashboard, products, orders, categories, content, settings)
- Pulled visual language from `demo.html` (Playfair Display, plum/gold palette, glassmorphism)
