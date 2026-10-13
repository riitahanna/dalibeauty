# Dali Beauty static site: notes for AI assistants

The owner of this site is not technical and edits it by asking an AI assistant. Keep every
change simple, explain what you did in plain words, and never introduce tooling they would
have to install.

## Hard rules

- Plain HTML, CSS and vanilla JavaScript only. No frameworks, no npm, no build step, no backend,
  no forms that submit anywhere, no third-party scripts except Google Fonts.
- The site must keep working when opened from `index.html` directly (file://) and on GitHub
  Pages or Vercel as a static folder. All paths are relative (`images/...`, `css/...`, never `/images`).
- Do not use em dashes in any text, code comment or commit message.
- Commit with short, plain messages. No AI attribution lines.

## Structure

```
index.html  products.html  about.html  contact.html   the four pages
css/style.css        all styling; brand tokens in :root at the top
js/products.js       WHATSAPP_NUMBER, SITE (contact details) and PRODUCTS (the catalog)
js/site.js           renders product cards, catalog filter, mobile menu, fills SITE values
images/products/<slug>/   product and shade images
images/site/         hero, banners, category tiles, lifestyle shots
images/brand/        logo, favicon
BRAND.md             fonts, palette, spacing extracted from dalibeauty.co
README.md            guide for the owner
```

## Conventions

- `js/products.js` is the single source of truth for products and contact details. Product
  cards on the home page and the catalog are generated from it by `js/site.js`. Never hardcode
  product HTML in the pages.
- Product fields: `name`, `category` ("Makeup" | "Skin" | "Nails"), `type`, `price` (number),
  `size` (optional), `description`, `image`, `shades` (optional array of `{name, image?}`),
  `bestseller` (optional), `badge` (optional). Keep the array grouped by category.
- The header and footer are duplicated verbatim in all four pages between the
  `<!-- ===== Shared header` / `End shared header` and `Shared footer` / `End shared footer`
  comments. When editing them, apply the same change to all four files and keep them identical.
- Elements with `data-site="..."` and `data-wa` are filled in by `site.js` from `SITE` and
  `WHATSAPP_NUMBER`. Rows wrapped in `data-site-row` are hidden automatically when the value is empty.
- Styling: change tokens in `:root` before adding new colors. Mobile-first; breakpoints at
  640, 768, 900 and 1024px. Buttons are pills (`.btn`, `.btn-primary`, `.btn-dark`, `.btn-outline`).
- Images: webp, square 1000px for products, under about 300 KB. `cwebp` is available on this
  machine if resizing is needed (`dwebp in.webp -o tmp.png && cwebp -q 80 -resize 1000 0 tmp.png -o out.webp`).
- Accessibility: every image needs meaningful `alt`, keep the dark-text-on-pink buttons (the
  brand's white-on-pink fails contrast), keep focus styles.

## Testing a change

```
python3 -m http.server 8000     # from the project folder, then open http://localhost:8000
```

Check all four pages at phone width (390px) and desktop. Make sure `products.html?category=Skin`
filters, the shade dropdown swaps the picture and updates the WhatsApp link, and the mobile menu opens.
A quick link check: every `href`/`src` that is not `http`, `mailto:`, `tel:` or `#` must exist on disk.

## Re-importing the catalog from the brand

The brand site exposes its catalog at
`https://dalibeauty.co/wp-json/wc/store/v1/products?per_page=100` (WooCommerce Store API), with
`/products/<id>` for each shade variation and `/products/categories` for the category tree.
If the owner asks to refresh products, write a one-off script in a temp folder (do not commit it),
and merge into `js/products.js` without overwriting prices or text the owner has customised.
