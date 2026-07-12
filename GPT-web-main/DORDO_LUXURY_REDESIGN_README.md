# DORDO Luxury Website Redesign

This version upgrades the DORDO website into a more polished, editorial, luxury couture experience while preserving the existing TanStack Start / Nitro deployment structure.

## Main improvements

### Shared website design

- New responsive luxury header with a working mobile navigation drawer
- Clear primary actions for **Design Your Dress** and **Consultation**
- Refined black, ivory, champagne, and restrained-gold visual system
- Improved typography, spacing, focus states, cards, buttons, and footer
- Shared trust messaging about private image review and quote requests

### Homepage

- Rebuilt editorial hero with stronger value proposition and calls to action
- Added a four-step journey from customer vision to atelier production
- Added a clear explanation of the difference between an AI concept and a real garment proposal
- Upgraded collection cards and luxury content hierarchy
- Added practical FAQ previews and stronger final conversion section
- Removed awkward spacing and weak headline formatting from the former hero

### Design Your Dress studio

- New four-stage studio:
  1. References
  2. Preferences
  3. AI generation
  4. Review and selection
- Optional private uploads for:
  - Face / personal style
  - Front body reference
  - Side body reference
  - Multiple dress inspiration images
  - Multiple fabric and texture images
- Supports up to 8 compressed private reference images in total
- Visual cards for occasion and silhouette
- Color swatches plus custom color entry
- Fabric choices plus custom fabric entry
- New neckline, sleeve, length, back-style, and couture-detail controls
- Improved written design brief and fit/special-instruction fields
- Generates and preserves up to four AI variations during a session
- Customers can select and download a preferred AI concept
- Selected design, prompt, and compressed references transfer to the quote page

### Important current AI behavior

The existing Cloudflare AI route was preserved.

- The current model accepts one image reference per generation.
- The first **dress inspiration** image is used when available.
- If there is no dress inspiration, the first **fabric reference** may be used.
- Face and body images are not sent to the current AI model.
- All customer references can still be attached to the private atelier quote email.

### Quote page and email workflow

- Redesigned into a structured private couture consultation form
- Added:
  - Country / delivery location
  - Preferred contact method
  - Budget direction
  - Inches / centimeters selector
  - Better measurement presentation
  - Multiple private reference uploads
  - Required privacy and quote-request consent
- The quote email now includes:
  - Contact and project details
  - Budget direction
  - Measurement units
  - Selected AI design attachment
  - Up to 8 private reference image attachments
  - Design prompt and customer notes
- No database was added; the workflow remains email-only

## Key functional files changed

- `src/components/site-brand.tsx`
- `src/routes/index.tsx`
- `src/routes/design.tsx`
- `src/routes/quote.tsx`
- `src/lib/quote.functions.ts`
- `src/styles.css`

Other source files were formatted consistently with Prettier; their functionality was not intentionally changed.

## Validation completed

- `npm run lint` completed with no errors
- Six existing Fast Refresh warnings remain in reusable UI component files
- `npm run build` completed successfully
- Nitro generated `.output/server/index.mjs` successfully

## Hostinger deployment settings

Use these settings:

- **Framework preset:** Nitro
- **Node version:** 22.x
- **Root directory:** `./`
- **Build command:** `npm run build`
- **Output directory:** `.output`
- **Entry file:** `server/index.mjs`

Upload the contents of the full project ZIP, not the ZIP file itself inside another project folder unless Hostinger specifically extracts it for you.

## Required environment variables

### Email-only quote workflow

```env
RESEND_API_KEY=
QUOTE_FROM_EMAIL=
QUOTE_RECIPIENT_EMAIL=
```

### Existing Cloudflare AI generation

```env
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=
```

Keep all API keys in Hostinger environment variables. Do not place secrets in frontend source files.

## Before publishing

Replace or verify these business details:

- `info@dordofashion.com` in the footer
- Instagram URL in `src/components/site-brand.tsx`
- Quote response promise of 24–48 hours
- Budget ranges on the quote page
- Privacy wording and business policies
- Final real portfolio photographs when available
