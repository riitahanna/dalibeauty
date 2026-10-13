# Dali Beauty brand guide

Extracted on 2026-10-13 from https://dalibeauty.co (WordPress, WoodMart theme + Elementor).
Sources: the theme's CSS variables (`--wd-*`), the Elementor global kit (`post-11.css`)
and the homepage layout. Every value below is wired into `css/style.css` under `:root`.

## Fonts (Google Fonts)

| Role | Font | Weights used | Notes |
|---|---|---|---|
| Headings, nav, product titles, buttons labels in tiles | Urbanist | 600, 700 | Titles are bold, often Capitalized |
| Body text, prices, buttons | Work Sans | 400, 500, 600 | Base size 15px, line-height 24px |
| Alternative (rare) | Lato | 400 | Not used on this site |

Load line used in every page:
`https://fonts.googleapis.com/css2?family=Urbanist:wght@600;700&family=Work+Sans:wght@400;500;600&display=swap`

## Color palette

| Token in style.css | Hex | Where the brand uses it |
|---|---|---|
| `--pink` | `#F59BC8` | Primary / accent: buttons, badges, pink panels, swatches |
| `--pink-soft` | `#FDE9F3` | Derived light tint for subtle backgrounds |
| `--pink-deep` | `#C7407F` | Derived darker pink for pink **text** (see Accessibility) |
| `--ink` | `#242424` | Titles, dark buttons |
| `--ink-2` | `#333333` | Product titles, links, header text |
| `--text` | `#767676` | Body text |
| `--grey-100` | `#F7F7F7` | Light section backgrounds, product image backgrounds, footer |
| `--grey-200` | `#EDEDED` | Borders, dividers |
| `--warm` | `#F1F0ED` | Warm off-white (theme "alternative" color) |
| `--white` | `#FFFFFF` | Page background |

Other colors seen on the brand site but not needed here: `#000418` (near-black navy) and `#FFBC7D` (peach, page transition only).

## Buttons

- Pill shape: `border-radius: 35px`, height about 46px, padding `10px 26px`.
- Font: Work Sans 600, 15px, no text-transform, no shadow.
- Primary (brand): pink `#F59BC8` background. On the brand site the label is white and the hover state is light grey `#EFEFEF` with `#333` text.
- Dark variant (hero "Shop Now"): `#242424` background, white label.
- This site: primary = pink background with `#242424` label (readable), hover flips to dark; dark variant unchanged; outline variant for secondary actions.

## Shape and spacing

| Thing | Value |
|---|---|
| Card / image / panel corners | 10px |
| Form fields and selects | 30px (pill) |
| Category circles | 50% |
| Container width | 1222px, 15px side gutter on mobile, 30px on desktop |
| Grid gap | 16px mobile, 30px desktop |
| Section spacing | 40 to 60px mobile, 80 to 140px desktop |
| Product grid | 2 columns mobile, 3 tablet, 4 desktop |

## Type scale (Elementor kit)

| Style | Desktop | Mobile |
|---|---|---|
| H1 / hero | Urbanist 700, 78px / 93.6px | 36px / 43.2px |
| H2 / section title | Urbanist 700, 32px / 44.8px | 22px / 30.8px |
| H3 / card title | Urbanist 700, 22px / 30.8px, 16 to 18px on product cards | |
| Feature title | Urbanist 600, 38px / 45px | 24px / 30px |
| Body | Work Sans 400, 15px / 24px | same |
| Accent / buttons | Work Sans 600, 15px / 24px | same |

In `style.css` these are expressed with `clamp()` so they scale smoothly between the two sizes.

## Overall feel

- White canvas, lots of air, candy-pink accents, dark charcoal headings, mid-grey body copy.
- Product photography on a light grey (`#F7F7F7`) square background, rounded corners, subtle zoom on hover.
- Section pattern: centered bold title + one-line grey subtitle, then a grid.
- Big rounded image tiles with a white title in the top-left corner for categories.
- Image + text panels (one light grey, one solid pink) for featured products.
- Full-width lifestyle banners with rounded corners.
- Header: logo, simple Urbanist nav, pill call-to-action. Footer on light grey with logo, link columns and social icons.
- Copy voice: short, warm, confident. "Born in Lebanon. Loved for Generations."

## Accessibility note

The brand's white-on-pink buttons and pink price text measure about 1.9:1 contrast, below WCAG AA (4.5:1).
This site keeps the pink fills but uses `#242424` text on pink (about 9:1) and the deeper `#C7407F`
for pink text on white (about 4.7:1). If you want the exact brand look back, change
`.btn-primary { color: var(--ink) }` to `color: var(--white)` and `--pink-deep` to `#F59BC8` in `css/style.css`.
