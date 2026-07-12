# DORDO ATELIER PAGE UPDATE

This package adds the new luxury Atelier / About DORDO page and updates navigation/sitemap.

## New page

- `/atelier`

## Page sections

- Hero: DORDO Atelier — Where AI imagination meets couture craftsmanship
- Our Story
- The Atelier Philosophy
- AI + Human Craft
- Made for Private Clients
- Call to action: Begin your couture journey

## Updated files

- `src/routes/atelier.tsx` — new page
- `src/components/site-brand.tsx` — navigation/footer now link to Atelier page
- `src/routes/sitemap.xml.ts` — dynamic sitemap includes `/atelier`
- `public/sitemap.xml` — static sitemap includes `/atelier`
- `src/routeTree.gen.ts` — route tree includes `/atelier`

## Preserved

- Current DORDO reference luxury design
- Email-only quote workflow
- Current AI model/API logic
- No database/Supabase requirement
- Hostinger Nitro deployment structure

## Hostinger settings

- Framework preset: Nitro
- Node version: 22.x
- Root directory: ./
- Build command: npm run build
- Output directory: .output
- Entry file: server/index.mjs

## Required environment variables for quote email

- RESEND_API_KEY
- QUOTE_FROM_EMAIL
- QUOTE_RECIPIENT_EMAIL


## Phase 2 update

- Added a new `/collections` page with 7 couture categories
- Updated header/footer navigation to include Collections
- Updated sitemap entries for the new page

## Phase 3 and 4 update

Added two new premium guide pages:

- `/how-it-works` — explains the DORDO process from uploaded references to AI concept, atelier review, private quote, and couture creation.
- `/fabric-guide` — explains fabric choices and couture detail vocabulary so customers can describe their dream dress more clearly.

Updated:

- Header navigation
- Footer navigation
- Public sitemap
- TanStack route tree

The existing email-only quote workflow, current AI generation logic, no-database setup, and Hostinger Nitro deployment structure are preserved.

## Phase 5 and 6 update

Added and improved:

- `/measurement-guide` — a practical luxury measurement guide with an inline schematic/sketch for bust, waist, hips, shoulder width, arm length, height, and dress length.
- Improved `/quote` page — now feels like a private couture consultation request instead of a simple form.

Quote page upgrades:

- Added top section: Private Couture Quote
- Added reassurance blocks:
  - No payment required now
  - Private review by our atelier
  - Quote includes fabric, construction, and timeline
  - We reply within 24–48 hours
- Added direct link to Measurement Guide from the quote form
- Added Dress length to the quote form and email template
- Updated the successful submission message

Updated:

- Header navigation
- Footer navigation
- Public sitemap
- Dynamic sitemap route
- TanStack route tree
- Quote email payload/template

The existing email-only quote workflow, current AI generation logic, no-database setup, and Hostinger Nitro deployment structure are preserved.

## Phase 7-10 update

Added the final trust and conversion pages:

- `/consultation` — private consultation request using the same email-only workflow
- `/faq` — answers customer hesitation questions
- `/privacy` — image use and privacy reassurance for uploaded photos
- `/gallery` — inspiration categories with sample image cards linking to the design studio

Updated navigation, footer links, sitemap, and route tree for the new pages.
The quote email subject now distinguishes consultation requests from quote requests.

## DORDO wordmark texture update

- The large DORDO hero wordmark now uses the actual uploaded DORDO logo texture as a transparent image asset.
- Base project includes all Phase 1-10 pages and updates.

## Logo display update

- DORDO logo image is displayed only in the site header.
- Body pages and footer no longer show the stacked logo image.

## Luxury image update

- Replaced the main hero and key website visuals with the newly generated DORDO luxury couture images.
- Updated existing asset filenames so all existing Phase 1–10 pages continue working without route changes.
- Images are optimized as high-quality progressive JPG files for web use.
