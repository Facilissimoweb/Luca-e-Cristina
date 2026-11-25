---
name: Onyx Pizza in Corso
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#d4c5ac'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#9c8f78'
  outline-variant: '#504532'
  surface-tint: '#fbbc0e'
  primary: '#ffd88a'
  on-primary: '#402d00'
  primary-container: '#f5b700'
  on-primary-container: '#664a00'
  inverse-primary: '#795900'
  secondary: '#ffb4a8'
  on-secondary: '#690001'
  secondary-container: '#9c0202'
  on-secondary-container: '#ffa496'
  tertiary: '#ace5ff'
  on-tertiary: '#003545'
  tertiary-container: '#45cfff'
  on-tertiary-container: '#00566e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea0'
  primary-fixed-dim: '#fbbc0e'
  on-primary-fixed: '#261a00'
  on-primary-fixed-variant: '#5c4300'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4a8'
  on-secondary-fixed: '#410000'
  on-secondary-fixed-variant: '#930001'
  tertiary-fixed: '#bce9ff'
  tertiary-fixed-dim: '#62d4ff'
  on-tertiary-fixed: '#001f29'
  on-tertiary-fixed-variant: '#004d63'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Archivo Narrow
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Archivo Narrow
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Archivo Narrow
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Archivo Narrow
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Archivo Narrow
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.03em
  label-sm:
    fontFamily: Geist
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

The design system establishes a high-performance, utilitarian aesthetic tailored for fast-paced Italian street food ordering and pizza al taglio takeaway. Built for rapid scanning on mobile devices in high-glare or late-night street environments, the visual character draws inspiration from neon-lit Roman display counters, chalk-written blackboard slates, and industrial kitchen order dockets.

The personality balances artisanal Italian craft with high-velocity street utility:
- **Atmospheric & Focused:** Deep charcoal and pitch surfaces simulate nighttime Corso Cavour storefronts, eliminating visual clutter to direct full focus toward vibrant food photography and dual-format pricing.
- **Punchy & Urgent:** High-visibility electric warning yellow accents guide immediate micro-interactions (add to cart, select portion size, live store status).
- **Legible & Structural:** Crisp hairline divisions, dense information clusters, and condensed typographic hierarchy deliver immediate comprehension for commuters on the move.

## Colors

The palette operates in strict dark mode, engineered for WCAG AAA legibility, reduced screen power draw during quick orders, and stark contrast under ambient light.

- **Primary (`#F5B700`):** Electric Street Food Yellow. Reserved for primary conversion triggers, checkout flows, selected segment controls, and active dual-pricing state highlights.
- **Secondary (`#D93829`):** Ripened Tomato Red. Deployed for urgent operational indicators (e.g., "Sold Out", spicy dietary tags, critical warnings, and live store closure).
- **Neutral Stack:**
  - **Canvas Base (`#060605`):** Ultra-deep obsidian background serving as the foundational floor.
  - **Chalkboard Charcoal (`#141414`):** Section containers and sticky navigation structures.
  - **Card Surface (`#1A1917`):** Elevated item containers providing subtle warm slate depth.
  - **Inset Surface (`#22201E`):** Nested interactive elements, quantity toggles, and dual-pricing comparison boxes.
  - **Structural Hairline (`#2C2A26`):** Micro-borders dividing dense information panels.
- **Ink Palette:**
  - **Primary Ink (`#F9F8F6`):** Pure warm off-white for headers, pizza titles, and prices.
  - **Secondary Ink (`#B0AEAA`):** Muted slate gray for ingredient listings, allergen metadata, and unit labels.

## Typography

Typography prioritizes condensed vertical efficiency and scannability:
- **Headline Font (`Archivo Narrow`):** High-density geometric gothic tailored for rapid menu skimming. The narrow proportion prevents multiline overflow on long Italian pizza designations (e.g., "Patate, Rosmarino e Salsiccia di Norcia") and maintains impact on small viewports.
- **Body & Label Font (`Geist`):** Monoline precision engineered for numerical alignment, ingredient legibility, and technical tabular balance across dual-pricing grids ("Trancio" vs. "Pinsa Intera").

## Layout & Spacing

The layout is built mobile-first, utilizing a single-column fluid flow optimized for single-thumb navigation, transitioning into a multi-column display grid on tablet and desktop terminals:

- **Mobile Viewport (< 640px):** Single-column stacked cards. Outer horizontal margin set to `1rem` (`16px`) to maximize surface space for menu descriptions, with `0.75rem` (`12px`) gutters between split price selectors.
- **Tablet & Counter Screens (640px - 1024px):** 2-column symmetric card grid with `1.5rem` margins.
- **Desktop & In-Store Kiosk (1024px+):** Fixed-width centered canvas (`1120px` maximum) with sticky order rail on the right column.

Spacing tokens follow an ultra-compact 4px modular baseline (`0.25rem` intervals) to ensure maximum content density without visual clutter.

## Elevation & Depth

Visual hierarchy rejects decorative drop shadows and blurred skeuomorphism, instead using flat architectural tonal layering bounded by razor-sharp hairline borders:

- **Layer 0 (Canvas):** `#060605` creates the unlit foundation.
- **Layer 1 (Card & Section):** `#1A1917` elevates interactive pizza menu items, framed with a 1px solid hairline (`#2C2A26`).
- **Layer 2 (Inset & Controls):** `#22201E` recedes dual-pricing selectors, count adjusters, and secondary metadata containers.
- **Layer 3 (Sticky Command):** Bottom order bar anchored over a dark `#141414` fill with a top border hairline (`#2C2A26`) and an intentional 4% pure yellow ambient downward tint for primary CTA presence.

## Shapes

The design system employs a soft industrial form factor:
- **Base Components:** Radius of `0.25rem` (`4px`) on standard buttons, input fields, and pricing toggles.
- **Card Containers:** Radius of `0.5rem` (`8px`) on product cards and modals.
- **Status & Meta Badges:** Radius of `0.25rem` (`4px`) or clipped micro-capsules to echo chalk price tags.

Sharp, near-orthogonal corners reflect the rectangular cut geometry of authentic *pizza al taglio*.

## Components

### Dual-Pricing Switcher (Trancio vs. Pinsa Intera)
- Encased within an inset surface (`#22201E`) container with a 1px border (`#2C2A26`).
- Split segment layout: Left segment displays "Trancio" with weight approximation; right segment displays "Pinsa Intera".
- Active state: Fills with `#F5B700`, text switches to `#060605` with `Archivo Narrow` bold typography.
- Inactive state: Background transparent, text in `#B0AEAA`.

### Live Store Status Indicator (Open / Closed)
- Micro-pill badge floating in the header.
- **Open:** Background `rgba(245, 183, 0, 0.12)`, border 1px solid `#F5B700`, text `#F5B700`, with a pulsing 6px radial dot.
- **Closed / Sold Out:** Background `rgba(217, 56, 41, 0.15)`, border 1px solid `#D93829`, text `#D93829`.

### Product Menu Cards
- Surface background `#1A1917` with 1px border `#2C2A26`.
- Direct visual stacking: Full-bleed product photography, food title in `headline-md`, concise Italian ingredient listing in `body-sm` (`#B0AEAA`), followed by the Dual-Pricing Switcher.

### Buttons & CTAs
- **Primary CTA:** Solid `#F5B700` background, `#060605` label text, `0.25rem` corner radius, font `label-lg`.
- **Secondary CTA:** Surface `#22201E`, 1px border `#2C2A26`, `#F9F8F6` text.
- **Quantity Selector:** Compact 3-part stepper with `#22201E` background, `#F5B700` icons, and centered mono tabular numeral.

### Sticky Bottom Call-to-Action Bar
- Fixed to the bottom viewport with persistent `z-index: 100`.
- Background `#141414` bordered at top with 1px `#2C2A26`.
- Layout: Current item summary and price total left-aligned; high-contrast "Ordina Ora" button right-aligned.