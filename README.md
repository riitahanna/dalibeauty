# Dali Beauty website

A simple website for Dali Beauty. Plain HTML, CSS and a little JavaScript. No installation,
no build step, no database. Open `index.html` in a browser and it works.

Customers browse products and tap **Order on WhatsApp**. That opens a WhatsApp chat with you,
with the product name, shade and price already typed in.

## The files

| File | What it is |
|---|---|
| `index.html` | Home page |
| `products.html` | Full catalog with Makeup / Skin / Nails filter |
| `about.html` | About page |
| `contact.html` | Contact page |
| `js/products.js` | **All products, prices, and your contact details. This is the file you edit most.** |
| `css/style.css` | Colors, fonts and layout |
| `images/products/` | One folder per product, with its pictures |
| `images/site/` | Banners and lifestyle photos |
| `images/brand/` | Logo and favicon |
| `BRAND.md` | The brand's fonts and colors, for reference |

## Change things

Open the file in any text editor (TextEdit, Notepad, VS Code). Save. Refresh the browser.

### Your WhatsApp number

In `js/products.js`, the first setting is:

```js
const WHATSAPP_NUMBER = "96100000000";
```

Replace it with your number: country code first, digits only, no `+`, spaces or dashes.
Lebanon example: `"96170123456"`. USA example: `"12015550123"`.

### Phone, email, Instagram, address, hours

Just below the WhatsApp number, in the `SITE` block. Change the text between the quotes.
Leave `email` or `mapLink` as `""` to hide them.

### Prices

Find the product in `js/products.js` and change `price: 4.99` to the new number. No currency symbol.
To change the currency symbol for the whole site, edit `currency: "$"` in the `SITE` block.

### Add, remove or edit a product

Each product is one block between `{` and `},` in `js/products.js`. The comment at the top of the
file explains every line. To add a product, copy a block, paste it, and change the values.
To remove one, delete its block. `category` must be exactly `"Makeup"`, `"Skin"` or `"Nails"`.
Set `bestseller: true` on the products you want on the home page (the first 8 are shown).

### Pictures

Put the new picture in `images/products/<product-name>/` and update the `image:` path in
`js/products.js`. Square pictures (for example 1000 x 1000 pixels) look best. `.webp` or `.jpg` both work.
Keep files under about 300 KB so pages load fast.

Banners and category photos are in `images/site/`. Replace a file with a new one of the same
name, or change the path in the HTML page that uses it.

### Colors and fonts

At the top of `css/style.css` is a `:root` block with the brand colors (`--pink`, `--ink`, ...).
Change a value there and it updates everywhere.

### Text on the pages

Open the `.html` file and edit the text between the tags. The header and footer are the same
block of code repeated in all four pages, so a change to the menu must be made in each file.

## Ask an AI to do it for you

This site was built to be edited with an AI assistant (Claude, ChatGPT, Cursor...). Open the
project folder in the assistant and ask in plain English, for example:

- "Change the WhatsApp number to 961 70 123 456."
- "Raise the price of Liquid Lipstick to 5.50."
- "Add a new product called Hand Cream in the Skin category at 4.00 with this picture."
- "Make the home page hero text say 'New winter shades are here'."
- "Add a Sale badge to Creamy Blush."

There is a `CLAUDE.md` file in the folder that tells the assistant how the site is organised.

## Put it online

The folder deploys as-is.

- **GitHub Pages:** push this folder to a GitHub repository, then in the repository settings
  open *Pages* and choose the `main` branch. The site appears at `https://<user>.github.io/<repo>/`.
- **Vercel:** import the repository at vercel.com (framework preset "Other", no build command)
  or drag the folder onto Vercel Drop.

## Look at it locally

Double-click `index.html`. For the catalog filter links to work exactly like online, you can also
run a tiny local server from the folder:

```
python3 -m http.server 8000
```

and open http://localhost:8000 in your browser.
