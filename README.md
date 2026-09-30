# StayLift theme

Shopify theme for **StayLift**, a Canadian strapless bra brand. Store: `bjjqhg-1n.myshopify.com` (CAD).

> The strapless bra that actually stays put.

The theme is a fork of [Shopify Dawn 16.0.0](https://github.com/Shopify/dawn) with a small conversion layer added on top and a brand pass over colours, type and templates. Nothing in Dawn's core has been rewritten, so Dawn updates can still be merged in.

## Voice

Calm, plain, honest, fit-first. Canadian English, sentence case. The copy in the templates follows a few rules:

- Sizing runs small, so size up. "If you normally wear a 34B, order a 36B."
- Facts, not hype: silicone grip along the band, wide bonded underband, seamless bonded edges, free exchanges within 30 days with return shipping covered and no restocking fees, free shipping over $60.
- No invented urgency, no countdown timers, no made-up review counts.
- No body-shaming language. Avoid "flattering" and "slimming".

## Palette and type

Colour schemes are set in `config/settings_data.json`.

| Scheme | Use | Background | Text | Button | Button label |
| --- | --- | --- | --- | --- | --- |
| scheme-1 | Default page | `#FBF8F5` | `#1C1917` | `#1C1917` | `#FBF8F5` |
| scheme-2 | Blush panel | `#F3E7E1` | `#1C1917` | `#1C1917` | `#FBF8F5` |
| scheme-3 | Deep plum band (announcement, stats, footer) | `#3B2A32` | `#FBF8F5` | `#E8C9C0` | `#1C1917` |
| scheme-4 | Rose CTA band | `#B5485D` | `#FFFFFF` | `#FFFFFF` | `#B5485D` |
| scheme-5 | Warm grey | `#EFE9E3` | `#1C1917` | `#B5485D` | `#FFFFFF` |

Fonts: **Playfair Display** (headings, `playfair_display_n4`, scale 115) and **DM Sans** (body, `dm_sans_n4`). Buttons have a 2px radius and 1px border, cards and media a 4px radius, page width 1400px, cart is a drawer.

Brand CSS lives in `assets/custom.css` (loaded after `base.css` and `cro.css` from `layout/theme.liquid`). It only uses Dawn's CSS variables and respects `prefers-reduced-motion`.

## Conversion layer

Custom sections (all in `sections/`, all editable in the theme editor):

| Section | What it does |
| --- | --- |
| `trust-bar` | Row of 2 to 6 icon + heading + text items. Used under the hero and at the bottom of product, collection and page templates. |
| `stats-strip` | Up to 4 large value + label pairs on a colour band. |
| `testimonials` | Grid of 2 to 4 review cards with star rating, title, quote, author and an optional "Verified buyer" tag. |
| `comparison-table` | Feature table, shop vs a named alternative, with a CTA button. |

Snippets and settings (Theme settings > Conversion):

- **Sticky add to cart** (`snippets/sticky-atc.liquid`, `assets/sticky-atc.js`, `assets/sticky-atc.css`) on product pages. Settings `sticky_atc_enabled`, `sticky_atc_color_scheme`.
- **Free shipping progress bar** (`snippets/free-shipping-bar.liquid`) inside the cart drawer. Settings `free_shipping_enabled`, `free_shipping_threshold` (60), `free_shipping_text_remaining` (use `[amount]`), `free_shipping_text_unlocked`.

Shared styles for these are in `assets/cro.css`.

## Templates

- `sections/header-group.json`: announcement bar (scheme-3) and a centred, sticky-on-scroll header.
- `templates/index.json`: hero, trust bar, featured product, "How it stays up" multirow, featured collection, stats strip, testimonials, comparison table, FAQ, newsletter, closing CTA.
- `templates/product.json`: fit note, title, price, variant pills with colour swatches, quantity, buy buttons, icon row, "Find your fit", description, "Shipping and exchanges", "Care", share. Then related products, testimonials and a trust bar.
- `templates/collection.json`: banner, 3-column grid with filters, sorting and quick add, trust bar.
- `templates/page.json`: page content plus trust bar.
- `sections/footer-group.json`: brand block, footer menu, fit note, newsletter, payment icons and policy links on scheme-3.

## Local development

Requires [Shopify CLI](https://shopify.dev/docs/themes/tools/cli) 3.x or newer.

```sh
shopify theme dev --store bjjqhg-1n.myshopify.com
shopify theme check
```

`shopify theme dev` gives you a local preview with hot reload and a theme editor link for the development theme.

## Connect the theme to the store from GitHub

1. Push this repo to GitHub (branch `main`).
2. In Shopify admin go to **Online Store > Themes**.
3. Click **Add theme > Connect from GitHub**.
4. Sign in to GitHub if asked, choose the `Bello-online/staylift-theme` repo and the `main` branch.
5. The theme appears in the theme library. Click **Customize** to review it, then **Publish** when ready.

Commits to `main` sync to the connected theme automatically. Changes made in the theme editor are committed back to the branch, so pull before editing JSON templates locally.

A GitHub Action (`.github/workflows/theme-check.yml`) runs `shopify/theme-check-action` on every push and pull request to `main` and fails on errors.

## What the merchant still needs to add

The theme ships without imagery or real social proof. Before publishing:

- **Logo**: upload in Theme settings > Logo. The header is set to logo centre.
- **Hero and lifestyle photography**: the homepage hero and the three "How it stays up" rows have empty image slots. Portrait or 3:2 crops work best.
- **Product photography**: both products, on a model and flat, in Skin and Black.
- **Real testimonials**: the three testimonial cards on the homepage and product page are placeholders. Replace them with real customer feedback (with permission) and tick "Verified" once they are from confirmed orders.
- **Size chart image**: add it to the `find-your-fit` page and, if wanted, to the "Find your fit" collapsible tab on the product template.
- **Pages**: `about`, `find-your-fit`, `faq`, `shipping`, `returns`, `track-order`, `contact`. The theme links to them by URL already.
- **Collections**: `Bestsellers`, `Bras`, `Sale`. The homepage featured collection currently points at `all`; switch it once the collections exist.
- **Menus**: fill in `main-menu` and `footer` under Navigation.
- **Colour swatches**: the variant picker is set to show swatches for the colour option. Shopify draws these from the product option's colour taxonomy values or a `color` metafield; set those on each product for the swatches to render.

## Licence

Dawn is released under the MIT licence (see `LICENSE.md`). Brand copy and assets in this repository belong to StayLift.
