# STATUS (read this first)

**Superseded for remaining work.** Photo dump + first launch pass is done on `main` (`8f6f6db`). Do not re-run vision on interiors. Remaining Lima notes (20 Aug 02:12–03:41) are in `docs/superpowers/plans/2026-08-20-lima-final-pass.md`.

**Do not use subagents or vision on the photo dump.** That loop burned hours. Images are already processed on `main`.

**Work here:** `C:\Users\Kyxec\Desktop\tarra_surra-main\.worktrees\launch-client-edits`  
**Branch:** `launch-client-edits` (forked from main `9aded08`)  
**Do not commit** `ChatExport_2026-08-20/`, `Artem TARRA Website/`, `.worktrees/`.

## Done on this branch
- Real interiors/food/cocktails compressed into `images/`
- Official PDFs in `menus/tarra-menu.pdf` and `menus/sura-menu.pdf`
- Homepage: real photos, phone `312.955.8889`, no “fine dining”
- Tarra page: official blurb, food 3-up without captions, real interiors
- Sura page: The Lounge copy, real cocktails Coco Noir / Hokkajillo / Golden Mermaid / Corona
- Menu pages: Offerings sections **removed**; single PDF buttons
- Gallery: real rooms + food + cocktails
- Footers: `main@tarrachicago.com`, common hours Wed–Sun 5pm–12am, Follow us on Instagram + icon
- Visit: common hours, no valet, public garage, Passenger Drop-Off: Main Entrance
- Team: Lorraine (name only — **no bio in dump**), Namo, Sip (Beverage, no bio), Robert
- Chef page CTA: Experience / OpenTable

## Still needed
- Merge `launch-client-edits` → `main` and `git push origin main`
- Browser check desktop + phone
- Lorraine / Sip bios if owner sends copy
- Two missing Artem voicemails (cannot invent)

## New Lima notes 20 Aug 02:12–02:14 (already applied unless noted)
- Follow us on Instagram + logo
- Remove Tarra Offerings / Sura Offerings
- Sura wording → The Lounge
- Meet Namo Reserve → Experience above OpenTable
- Team: Lorraine revision (no source copy), add Sip, drop “Recommended…”, email main@
- Parking: no valet; public garage; Passenger Drop-Off: Main Entrance

---

# Client Launch Edits Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the Tarra & Sura site for tonight’s opening by applying every Telegram markup, official blurb, real photo, and PDF from the 19–20 Aug 2026 dump — without dumping files by folder name.

**Architecture:** Static HTML/CSS/JS luxury dual-venue site. Process source photos into compressed JPEGs under `images/`, host both official PDFs under `menus/`, then rewrite page copy, cards, footers, and schema so every slot that currently shows 3D/CGI or invented cocktail names is replaced by a vision-verified real object.

**Tech Stack:** Static HTML, `css/style.css`, `js/main.js`, Python Pillow for image prep, GitHub Pages / tarrachicago.com.

## Global Constraints

- Do not commit `ChatExport_2026-08-20/`, `Artem TARRA Website/`, `docs/_tmp_mosaics/`, or any `.ARW`.
- Do not place an image by its parent folder name. The folder `Tarra Interior` contains Sura lounge, Tarra dining, AND a monk blessing. Mixing those is a launch-breaking error.
- Cocktail **names** are Capitalized. Brands and ingredients stay **all lowercase** (Artem, 19 Aug 04:20).
- Remove the words “fine dining” / “FINE DINING” from every visible string, title, meta, and JSON-LD. Client markup: “ubrat' fine dining”.
- Email is `main@tarrachicago.com` everywhere. Kill `reservations@tarrachicago.com`.
- Phone is `312.955.8889` (official Instagram). Add it next to the address.
- Sura Instagram is `https://www.instagram.com/surachicago` (strip the `igsh` tracking query).
- Address stays `121 W Hubbard St, Chicago, IL`. ZIP 60654 is optional in body copy; do not invent a second street.
- OpenTable stays the only booking path. No fake forms.
- Latest official blurbs from Lima (19 Aug 17:12–17:13) win over older Michael “brand-not-chef” copy for the Tarra / Sura / dual-brand paragraphs. Chef Namo is named in the official Tarra blurb — keep that sentence.
- STAFF PICS folder is empty. Do not invent headshots.
- Two Artem voice messages (00:21 and 00:30) and a 76-second call on 20 Aug are **not in the export**. Do not invent what they said.
- JPEG delivery: long edge ~1920px, quality 82–85, sRGB. Skip `DSC09704.ARW`.

---

## Source inventory (already vision-read — do not re-guess)

### Telegram `ChatExport_2026-08-20` (chat “Lima Kairat”, 19–20 Aug 2026)

| When | Who | What it means |
|---|---|---|
| 19 Aug 01:21 | Artem | Voice 00:21 — **missing audio** |
| 19 Aug 04:05 | Artem | Asking Lima for missing materials + feedback |
| 19 Aug 04:17–04:19 | Lima | Four cocktail photos + recipes (see cocktail table) |
| 19 Aug 04:20 | Lima | Capitalize cocktail names only |
| 19 Aug 10:32 | Lima + photo_286 | Homepage split: “po simmetrii nijney nadpisi” — SURA wordmark wider than `THAI INSPIRED COCKTAILS` |
| 19 Aug 10:32 | Lima + photo_287 | Homepage bottom line is the address |
| 19 Aug 10:33 | Lima | “I nomer telefona” — add phone with the address |
| 19 Aug 10:34 | Lima + photo_288 | “zadnie fotki pomenyat'” — replace CGI split backgrounds |
| 19 Aug 10:34 | Lima + photo_289 | Tarra hero “simmetriya” — gold line / tagline not matching wordmark width |
| 19 Aug 10:34 | Lima + photo_290 | Tarra hero “fotku na real'nuu pomenyat'” — CGI dining room → real photo |
| 19 Aug 10:36 | Lima + lobby screenshot | Atmosphere marquee CGI lobby “fotki pomenyat'” |
| 19 Aug 10:36 | Lima + photo_291 | Footer tagline `CONTEMPORARY THAI FINE DINING` — remove “FINE DINING” |
| 19 Aug 15:13 | Artem | Voice 00:30 — **missing audio** |
| 19 Aug 17:10 | Lima + photo_292 | Footer email → `main@tarrachicago.com` |
| 19 Aug 17:10 | Lima + photo_293 | Footer Menu column (“Dinner, tasting, and dessert lists”) — **remove the section** |
| 19 Aug 17:10 | Lima + photo_294 | Flavor of Thailand 3-up: put **food photos, no captions** |
| 19 Aug 17:10 | Lima + photo_295 | Circle on `SEE FULL MENU` — **load the real PDF** |
| 19 Aug 17:10 | Lima + photo_296 | Tarra about image (CGI plants/rings) — replace with real |
| 19 Aug 17:10 | Lima + photo_297 | Sura hero: red bars on SURA vs `THAI INSPIRED COCKTAIL LOUNGE` — **align widths** |
| 19 Aug 17:10 | Lima + photo_298 | Sura hero CGI stairs — “Поменять на реальные фотки” |
| 19 Aug 17:10 | Lima + photo_299 | Sura `SEE FULL MENU` — add the Sura PDF |
| 19 Aug 17:10 | Lima + photo_300 | “The Sura Atmosphere” CGI marquee — add real photos |
| 19 Aug 17:10 | Lima + photo_301 | Fake cocktails (Bangkok Sunset / Chao Phraya / Golden Temple / Midnight Orchid) on CGI rooms — “Обновить фотки которые я добавила в чат” |
| 19 Aug 17:10 | Lima + photo_302 | Footer Hours `5:00 PM — 10:00 PM` — “Это нужно поменять” |
| 19 Aug 17:11 | Lima | “Google map” |
| 19 Aug 17:12 | Lima | Sura IG URL |
| 19 Aug 17:12 | Lima | “Номер телефона в гугл мепс” |
| 19 Aug 17:12 | Lima | Official Sura blurb |
| 19 Aug 17:13 | Lima | Official Tarra blurb (names Chef Namo Chowcharoen) |
| 19 Aug 17:13 | Lima | Official dual-brand blurb |
| 20 Aug 00:38 | Lima | “Артем / Привет” |
| 20 Aug 00:42 | — | Incoming call 76s — **no transcript** |

### New edits `IMG_3687–3696.PNG` (phone screenshots of the same chat, extra X marks)

These **confirm** the export and add two marks the HTML captions alone could miss:

- X on Visit page Hours that lists Tarra 5–10 and Sura 5–12 separately. Caption: “На это (просто общие часы поставить)”.
- Red circle + “Эту секцию убрать” on footer `Visit guide →`.
- X on footer `CONTEMPORARY THAI FINE DINING`.
- X on footer Menu column.

### Cocktails — identity is from the **caption**, not the filename

| Chat file | Name | Glass (vision) | Overhead twin in `SURA COCKTAILS` | On-site card image | On-site ingredient lines (lowercase) |
|---|---|---|---|---|---|
| `photo_282@19-08-2026_04-17-46.jpg` | Coco Noir | Rocks, amber, orange peel, bokeh lights | `DSC09729.JPG` | **Use the chat 3/4 shot** | high west double rye / alessio vino chinato / okar island red bitter / pandan & toasted coconut / coffee bean |
| `photo_283@19-08-2026_04-18-20.jpg` | Hokkajillo | Grey ceramic cup, foam, three dried flowers | `DSC09744.JPG` | chat 3/4 | mugi hokka shochu / el viejito fuerte / coffee shochu / coconut molasses / espresso |
| `photo_284@19-08-2026_04-18-55.jpg` | Golden Mermaid | Footed highball, crushed ice, long green leaf | `DSC09743.JPG` and `DSC09747.JPG` (same drink, skip duplicate) | chat 3/4 | gray whale gin / g4 blanco tequila / maraschino / aloe & kombu cordial / coconut water |
| `photo_285@19-08-2026_04-19-54.jpg` | Corona | Coupe, pale foam, spice dust | `DSC09740.JPG` | chat 3/4 | espresso oil washed weber ranch vodka / crème de cacao / espresso distillate / coconut & pandan cold foam |

PDF vs chat (do **not** silently merge): Sura PDF lists Corona as `espresso oil washed haku vodka` and `spiced coconut & pandan cold foam`; Hokkajillo PDF says `coconut sugar` not `coconut molasses`. Cards follow the chat captions that were paired with the photos. The downloadable PDF is the official list.

Do **not** use the invented site names Bangkok Sunset, Chao Phraya, Golden Temple, Midnight Orchid anywhere.

### Food — `TARRA FOOD/Tarra food/` (all six are plated dishes on walnut, palm backdrop)

| File | What is on the plate | Best menu match (PDF names, visual only) | Use |
|---|---|---|---|
| `DSC09199.jpg` | Bone-in short rib, cinnamon stick, potato, red curry | Massaman Nuea | Flavor card 1 **or** gallery |
| `DSC09204.jpg` | Wok mushrooms, cashews, chili, onion | Cashew/mushroom stir-fry (not labelled on the sparse PDF) | Gallery (keep 3-up to the three most composed plates) |
| `DSC09208.jpg` | Green ceramic lon/nam prik pot, raw veg crudités | Kueng Jim / nam prik style | Gallery |
| `DSC09211.jpg` | White fish fillet in orange curry, fried shallot, chili | Chu Chee Pla | Flavor card 2 |
| `DSC09219.jpg` | Clams, Thai basil, chili, scalloped bowl | Hoi Lai Pad Prik Pow | Flavor card 3 |
| `DSC09220.jpg` | Grilled meat skewer, peanut, chili, cilantro, metal plate | Nuea Ping / Moo Satay family | Gallery |

Lima: “Поставить фотки еды **(пока без надписей)**”. The three Flavor of Thailand cards get images only — delete `Citrus & Heat` / `Wok & Glaze` / `Slow Spice` and their descriptions.

### Interiors — `Tarra Interior/` (55 files). **This folder is mixed.**

| Files | What they actually are | Site use |
|---|---|---|
| `DSC05960.JPG`–`DSC05968.JPG` (5) | Buddhist monks in saffron, candles, blessing. People, ceremony, not rooms. | **Do not publish.** |
| `DSC09065.jpeg` | Dark lounge, hanging green crystals, teal backlit curtains, banquettes, votives | Sura homepage bg **and** Sura hero |
| `DSC09076.jpeg`, `DSC09078.jpeg` | Sura back bar, bottles, orange stools, dark | Sura atmosphere / gallery |
| `DSC09079.jpeg` | Sura bar close: marble top, brass lamp, orange tubular stools, bottle wall | Sura about image |
| `DSC09083.jpeg` | Sura lounge, crystals, curtains, cocktail tables | Sura atmosphere |
| `DSC09093.jpeg`, `DSC09093 2.jpeg`, `DSC09093 3.jpeg` | Lit **SURA** neon, hanging green glass, teal booth | Gallery / about alternate. **Do not** also overlay the SURA wordmark on this as a hero — double logo. Prefer `09065` for hero. Use `DSC09093.jpeg` (clearest of the three) in gallery. |
| `DSC09094.jpeg`–`DSC09096.jpeg` | Tarra dining bar, concentric wood rings, geometric floor, bar stools | Tarra about (`09096` best bar angle) and atmosphere |
| `DSC09097.jpeg`–`DSC09103.jpeg` | Tarra dining tables, floral chairs, green curtains, rings | Atmosphere / gallery. `09101` good dark dining. |
| `DSC09104.jpeg` | Service / pastry marble station | Gallery detail |
| `DSC09105.jpeg`–`DSC09107.jpeg` | Palms, columns, dining beyond | Atmosphere |
| `DSC09108.jpeg`–`DSC09110.jpeg` | Wave mosaic wall, rattan pendants, beige banquette | Tarra atmosphere + gallery. `09109` is the hero-quality mosaic shot. |
| `DSC09111.jpeg` | Dining + green curtains + portrait | Gallery |
| `DSC09112.jpeg` | Real Tarra reception desk + wall emblem + stair down. **Red fire extinguisher left of desk.** | Do **not** use as homepage/hero (extinguisher). Gallery only if cropped, or skip. |
| `DSC09114.jpeg`, `DSC09115.jpeg` | From the stair rail: rings, palms, dining, green curtain, bar beyond | **Homepage Tarra panel** and Tarra hero: `09114` |
| `DSC09116.jpeg`–`DSC09136.jpeg` | Many are camera-rotated 90° table/banquette/mosaic details | Gallery only after `Image.rotate` if used. Do not put sideways photos on the site. |

Current live `images/tarra/*` and `images/sura/*` are 3D/CGI (perfect geometry, no wear, CGI staircase + textured glass lobby). They must leave every public slot.

### PDFs — `TARRA & SURA MENU/`

- `TARRA FINAL MENU 3.0.pdf` (2 pages): page 1 = Tarra **bar** cocktails (Clear Intentions … Winging It). Page 2 = food (Amuse / Cold / Hot / Grill / Sides / Entrée). Layout is sparse; several side-dish names are visually broken in the file itself. Host the PDF as-is. Do not re-typeset food onto HTML.
- `SURA MENU FINAL.pdf` (2 pages): page 1 = navy `SURA` cover. Page 2 = wine/beer/sake + 16 cocktails including the four photographed drinks. Host as-is.

There is no tasting menu PDF and no dessert PDF. Do not keep “Tasting Journey” / “Dessert” / “Bar Bites” rows that say “PDF soon”.

---

## Locked copy (paste verbatim)

**Tarra about (Lima 17:13):**

```
Tarra is a contemporary Thai restaurant in Chicago’s River North, offering a modern interpretation of Thai cuisine rooted in authentic flavors and traditions.

Led by Chef Namo Chowcharoen, the menu draws inspiration from Thailand while bringing a refined, contemporary approach to each dish. Tarra is designed as an elevated dining experience centered around thoughtful food, warm hospitality, and the spirit of modern Thailand.
```

**Sura about (Lima 17:12):**

```
Sura is a Thai-inspired cocktail lounge located beneath Tarra in Chicago’s River North.

Inspired by the energy of Bangkok after dark, Sura combines a sophisticated late-night atmosphere with a cocktail program built around Thai flavors, ingredients, and unexpected combinations. Designed for cocktails, conversation, and nights that continue beyond dinner, Sura offers a darker, more intimate side of the Tarra & Sura experience.
```

**Dual-brand (Lima 17:13)** — use in meta descriptions / any remaining shared intro, not as a third homepage section (homepage stays split-only):

```
Tarra & Sura is a two-level Thai dining and cocktail destination in the heart of Chicago’s River North.

Tarra presents contemporary Thai cuisine inspired by the flavors, ingredients, and traditions of Thailand through a modern lens. Downstairs, Sura continues the experience with a Thai-inspired cocktail lounge influenced by the energy and nightlife of Bangkok.

Together, Tarra & Sura bring two distinct experiences under one roof, from dinner upstairs to cocktails late into the night.
```

**Hours (decision, because the voices are missing):**

Lima X’d the Visit page that listed Tarra 5–10 and Sura 5–12 separately and wrote “просто общие часы”. She separately X’d the footer that said `5:00 PM — 10:00 PM`.

Use one block on every page:

```
Wednesday — Sunday
5:00 PM — 12:00 AM
Monday — Tuesday
Closed
```

Do not label the lines “Tarra” / “Sura”. 5–10 was the thing she marked. Midnight is the existing lounge close and is the only common window that covers both rooms. If this is wrong, only the missing voice/call can override it — do not split the hours again.

**Contact constants:**

```
121 W Hubbard St
Chicago, IL
312.955.8889
main@tarrachicago.com
Tarra IG: https://www.instagram.com/tarrachicago/
Sura IG:  https://www.instagram.com/surachicago
Tarra maps: https://maps.app.goo.gl/SH2kncDU5CCWkVD27
Sura maps:  https://maps.app.goo.gl/awRD1zMe6Aw5E2sHA
```

Homepage bottom line becomes:

```
121 W Hubbard St, Chicago, IL  ·  312.955.8889
```

---

## Files to create or modify

| Path | Role |
|---|---|
| `images/food/*.jpg` | 6 compressed food plates |
| `images/cocktails/*.jpg` | 4 chat 3/4 cocktails + 4 overheads for gallery |
| `images/tarra/*.jpg` | Replace CGI with real Tarra dining |
| `images/sura/*.jpg` | Replace CGI with real Sura lounge |
| `menus/tarra-menu.pdf` | Copy of `TARRA FINAL MENU 3.0.pdf` |
| `menus/sura-menu.pdf` | Copy of `SURA MENU FINAL.pdf` |
| `index.html` | Real split photos, phone on address, no “fine dining” in meta/JSON-LD |
| `tarra.html` | Real hero/about/food/marquee, official blurb, footer, no fine dining |
| `sura.html` | Real hero/about/cocktails/marquee, official blurb, Sura IG, footer |
| `menu.html` | Two PDF rows only (Dinner, Bar) |
| `sura-menu.html` | Two PDF rows only (Cocktails, Wine & beer) |
| `gallery.html` | Real Tarra + Sura + food + cocktails, no CGI, no monks |
| `visit.html` | Common hours, email, phone |
| `reservation.html` | Common hours, email, phone |
| `chef.html`, `robert.html`, `privacy.html`, `terms.html` | Footer / email / fine-dining sweep |
| `css/style.css` | Homepage tagline width = wordmark; hero tagline width = wordmark; 3-col footer; food cards without titles |
| `sitemap.xml` | Unchanged URLs; no new pages required |
| `.gitignore` | Ignore dumps, mosaics, RAW |

Do **not** create a staff page or events page. Do **not** resurrect homepage nav.

---

### Task 1: Ignore dumps and process images

**Files:**
- Modify: `.gitignore`
- Create: `images/food/`, `images/cocktails/`, overwrite `images/tarra/*.jpg`, `images/sura/*.jpg`
- Create: `menus/tarra-menu.pdf`, `menus/sura-menu.pdf`
- Create (local only, do not commit): `_prep_launch_images.py`

**Interfaces:**
- Consumes: source files listed in the inventory
- Produces: web JPEGs at the exact filenames in the mapping below

- [ ] **Step 1: Extend `.gitignore`**

```
ChatExport_2026-08-20/
Artem TARRA Website/
docs/_tmp_mosaics/
*.ARW
_prep_launch_images.py
```

- [ ] **Step 2: Copy PDFs**

```
menus/tarra-menu.pdf  ← Artem TARRA Website/TARRA & SURA MENU/TARRA FINAL MENU 3.0.pdf
menus/sura-menu.pdf   ← Artem TARRA Website/TARRA & SURA MENU/SURA MENU FINAL.pdf
```

- [ ] **Step 3: Write and run the image prep script**

Map, then compress long edge 1920, JPEG q=85, sRGB:

```
images/tarra/tarra-interior-1.jpg  ← Tarra Interior/DSC09114.jpeg     homepage + OG
images/tarra/tarra-interior-2.jpg  ← Tarra Interior/DSC09114.jpeg     tarra hero (same frame is fine; hero can reuse)
images/tarra/tarra-interior-3.jpg  ← Tarra Interior/DSC09096.jpeg     about (real bar)
images/tarra/tarra-interior-4.jpg  ← Tarra Interior/DSC09109.jpeg     mosaic banquettes
images/tarra/tarra-interior-5.jpg  ← Tarra Interior/DSC09101.jpeg     dining + green curtains
images/tarra/tarra-interior-6.jpg  ← Tarra Interior/DSC09105.jpeg     palms / columns
images/tarra/tarra-interior-7.jpg  ← Tarra Interior/DSC09094.jpeg     bar wide
images/tarra/tarra-interior-8.jpg  ← Tarra Interior/DSC09108.jpeg     mosaic long booth

images/sura/sura-interior-1.jpg    ← Tarra Interior/DSC09065.jpeg     homepage + hero
images/sura/sura-interior-2.jpg    ← Tarra Interior/DSC09079.jpeg     about (bar + stools)
images/sura/sura-interior-3.jpg    ← Tarra Interior/DSC09078.jpeg     back bar
images/sura/sura-interior-4.jpg    ← Tarra Interior/DSC09083.jpeg     lounge
images/sura/sura-interior-5.jpg    ← Tarra Interior/DSC09093.jpeg     SURA neon (gallery, not hero)
images/sura/sura-interior-6.jpg    ← Tarra Interior/DSC09076.jpeg     bar stools row
images/sura/sura-interior-7.jpg    ← Tarra Interior/DSC09065.jpeg     atmosphere repeat OK
images/sura/sura-interior-8.jpg    ← SURA COCKTAILS/DSC09729.JPG      (temp; overwritten conceptually by cocktail files)

images/food/massaman.jpg           ← TARRA FOOD/Tarra food/DSC09199.jpg
images/food/cashew-mushrooms.jpg   ← TARRA FOOD/Tarra food/DSC09204.jpg
images/food/nam-prik.jpg           ← TARRA FOOD/Tarra food/DSC09208.jpg
images/food/chu-chee.jpg           ← TARRA FOOD/Tarra food/DSC09211.jpg
images/food/clams.jpg              ← TARRA FOOD/Tarra food/DSC09219.jpg
images/food/skewer.jpg             ← TARRA FOOD/Tarra food/DSC09220.jpg

images/cocktails/coco-noir.jpg         ← ChatExport photos/photo_282@19-08-2026_04-17-46.jpg
images/cocktails/hokkajillo.jpg        ← ChatExport photos/photo_283@19-08-2026_04-18-20.jpg
images/cocktails/golden-mermaid.jpg    ← ChatExport photos/photo_284@19-08-2026_04-18-55.jpg
images/cocktails/corona.jpg            ← ChatExport photos/photo_285@19-08-2026_04-19-54.jpg
images/cocktails/coco-noir-top.jpg     ← SURA COCKTAILS/DSC09729.JPG
images/cocktails/hokkajillo-top.jpg    ← SURA COCKTAILS/DSC09744.JPG
images/cocktails/golden-mermaid-top.jpg← SURA COCKTAILS/DSC09743.JPG
images/cocktails/corona-top.jpg        ← SURA COCKTAILS/DSC09740.JPG
```

Skip `DSC09747.JPG` (duplicate Golden Mermaid). Skip `DSC09704.ARW`. Skip all `DSC0596x` monks. Skip `DSC09112` on public heroes (extinguisher). Skip sideways `DSC09116–136` unless you rotate them first and only then put them in the gallery.

Python shape:

```python
from PIL import Image
from pathlib import Path

def web(src, dest, long=1920, q=85):
    im = Image.open(src).convert("RGB")
    w, h = im.size
    scale = long / max(w, h)
    if scale < 1:
        im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    Path(dest).parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "JPEG", quality=q, optimize=True, progressive=True)
```

- [ ] **Step 4: Spot-check outputs**

Open `images/tarra/tarra-interior-1.jpg` and `images/sura/sura-interior-1.jpg`. Confirm: real rooms (visible texture, not CGI glass lobby / CGI stairs). Confirm Sura-1 is the dark crystal lounge, **not** the Tarra mosaic wall.

- [ ] **Step 5: Commit**

```bash
git add .gitignore menus images/food images/cocktails images/tarra images/sura
git commit -m "assets: real interiors, food, cocktails, and official menus"
```

---

### Task 2: Homepage split — real photos, phone, no fine dining

**Files:**
- Modify: `index.html`
- Modify: `css/style.css` (`.split-panel__tagline`, logo slot)

**Interfaces:**
- Consumes: `images/tarra/tarra-interior-1.jpg`, `images/sura/sura-interior-1.jpg`
- Produces: split gate that matches photo_286 / photo_288 markup

- [ ] **Step 1: Swap backgrounds and address line in `index.html`**

Tarra panel `background-image` → `images/tarra/tarra-interior-1.jpg` (DSC09114).
Sura panel `background-image` → `images/sura/sura-interior-1.jpg` (DSC09065).

Replace the bottom tagline:

```html
<div class="split-screen__tagline">
  <span>121 W Hubbard St, Chicago, IL  ·  312.955.8889</span>
</div>
```

Phone must be a `tel:+13129558889` link if it is clickable; plain text is acceptable if the existing span has no link pattern.

- [ ] **Step 2: Fix “po simmetrii nijney nadpisi”**

The SURA wordmark is much wider than `THAI INSPIRED COCKTAILS`. Make the tagline the same visual width as that panel’s logo.

In `css/style.css` set each tagline to the same max-width as its logo slot and center it:

```css
.split-panel__tagline {
  width: min(86%, 420px);
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  letter-spacing: 0.22em; /* tighten if the line still overruns or underruns the logo */
}
```

If Sura’s logo is visually wider than Tarra’s, do **not** force both taglines to the same letter-spacing — match **each** tagline to **its** wordmark. Photo_286 is a crop of the two taglines; the complaint is Sura’s lower line vs SURA.

- [ ] **Step 3: Strip “fine dining” from homepage meta + JSON-LD**

`index.html` description, keywords, WebSite.description, Restaurant.description: replace “fine dining” with “dining” / “contemporary Thai restaurant”. Restaurant schema hours stay Wed–Sun 17:00–22:00 for Tarra and 17:00–00:00 for Sura (schema can stay venue-specific even though the visible footer is common). Add `telephone: +1-312-955-8889` and `email: main@tarrachicago.com` on both venue nodes. Add Sura `sameAs` `https://www.instagram.com/surachicago`.

- [ ] **Step 4: Open `index.html` in the browser, desktop and ~390px**

Confirm: real dining on the left, real dark lounge on the right, address + phone readable, Sura tagline lines up with SURA, no “fine dining”.

- [ ] **Step 5: Commit**

```bash
git add index.html css/style.css
git commit -m "fix: homepage real photos, phone, tagline symmetry"
```

---

### Task 3: Tarra page — real room, food without captions, official blurb

**Files:**
- Modify: `tarra.html`
- Modify: `css/style.css` (`.hero__tagline`, `.dish-card__content`)

**Interfaces:**
- Consumes: processed Tarra interiors + `images/food/{massaman,chu-chee,clams}.jpg`
- Produces: tarra.html matching photo_289–296 + New edits Xs

- [ ] **Step 1: Hero**

`hero__bg` → `images/tarra/tarra-interior-2.jpg` (DSC09114). Keep logo + `Contemporary Thai Cuisine`. For “simmetriya” (photo_289): make `.hero__tagline` the same width as `.hero__logo-img` and keep `.hero__line` centered under that pair (it is already `margin: 30px auto 0`). If the gold tagline is much shorter than the wordmark, increase letter-spacing or add `width` equal to the logo’s rendered width so the line of type matches the logo, which is what Lima marked.

- [ ] **Step 2: About**

Image → `images/tarra/tarra-interior-3.jpg` (real bar, not CGI plants).
Replace both about `<p>` blocks with the official Tarra blurb (two paragraphs).
Heading can stay or become `Contemporary Thai in River North`. Remove “fine dining” from the leftover sentence if any survives. Stats may stay.

- [ ] **Step 3: Flavor of Thailand → food, no captions**

```html
<div class="dish-card reveal stagger-1">
  <img src="images/food/massaman.jpg" alt="" class="dish-card__img" loading="lazy">
</div>
<div class="dish-card reveal stagger-2">
  <img src="images/food/chu-chee.jpg" alt="" class="dish-card__img" loading="lazy">
</div>
<div class="dish-card reveal stagger-3">
  <img src="images/food/clams.jpg" alt="" class="dish-card__img" loading="lazy">
</div>
```

Delete the overlay titles. Empty `alt` is intentional (client: no captions). Add this CSS so leftover content wrappers cannot reappear:

```css
.dish-card--photo-only .dish-card__content,
.dish-card--photo-only .dish-card__overlay { display: none; }
```

Add class `dish-card--photo-only` on those three cards.

`See Full Menu` stays and must go to `menu.html`, which in Task 5 will actually open the PDF.

- [ ] **Step 4: Culinary platform image + atmosphere marquee**

Chef/platform image → `images/tarra/tarra-interior-4.jpg`.
Marquee images, in order: interiors 1, 3, 4, 5, 6, 7. No CGI. No monks. No `09112` extinguisher.

- [ ] **Step 5: Footer on `tarra.html`**

- Tagline: `Contemporary Thai Cuisine` (not Fine Dining).
- Hours: the common block from Global Constraints.
- Visit: address + `Google Maps →` (Tarra maps URL). **Delete** `Visit guide →`.
- Contact: `main@tarrachicago.com`, `tel:312.955.8889`, Instagram `tarrachicago`.
- **Delete the entire Menu column** (`Dinner, tasting, and dessert lists`).

- [ ] **Step 6: Titles / meta**

`<title>` and og/description: drop “Fine Dining”. Use “Contemporary Thai Cuisine”.

- [ ] **Step 7: Browser-check `tarra.html`**

Hero is the real stair-rail dining shot. Food cards have no words. Footer has no Menu column, no Visit guide, no Fine Dining, new email, phone, common hours.

- [ ] **Step 8: Commit**

```bash
git add tarra.html css/style.css
git commit -m "fix: tarra real interiors, food cards, official blurb"
```

---

### Task 4: Sura page — real lounge, real drinks, official blurb, IG

**Files:**
- Modify: `sura.html`

**Interfaces:**
- Consumes: processed Sura interiors + `images/cocktails/{coco-noir,hokkajillo,golden-mermaid,corona}.jpg`
- Produces: sura.html matching photo_297–301 + cocktail captions

- [ ] **Step 1: Hero**

Background → `images/sura/sura-interior-1.jpg` (crystal lounge, **not** the neon sign, **not** CGI stairs).
Keep the SURA wordmark + `Thai Inspired Cocktail Lounge`.
Match tagline width to the wordmark (same CSS idea as Task 2 / photo_297 red bars).

- [ ] **Step 2: About**

Image → `images/sura/sura-interior-2.jpg` (real bar + orange stools).
Replace both about `<p>` blocks with the official Sura blurb.

- [ ] **Step 3: Replace the four fake cocktails**

```html
<div class="cocktail-card reveal stagger-1">
  <img src="images/cocktails/coco-noir.jpg" alt="Coco Noir" class="cocktail-card__img" loading="lazy">
  <div class="cocktail-card__overlay"></div>
  <div class="cocktail-card__content">
    <div class="cocktail-card__name">Coco Noir</div>
    <div class="cocktail-card__desc">high west double rye, alessio vino chinato, okar island red bitter, pandan &amp; toasted coconut, coffee bean</div>
  </div>
</div>
<!-- Hokkajillo, Golden Mermaid, Corona — names Capitalized, ingredients lowercase, chat recipes -->
```

Do not `text-transform: uppercase` the desc. Names stay as written (Coco Noir, Hokkajillo, Golden Mermaid, Corona).

- [ ] **Step 4: Atmosphere marquee**

Use `sura-interior-1` (lounge), `2` (bar stools), `3` (back bar), `4` (lounge), `5` (neon sign), plus one cocktail 3/4 if a sixth slot is required. No CGI stairs.

- [ ] **Step 5: Footer**

Common hours. Address + Sura Google Maps. **No** Visit guide. Email `main@tarrachicago.com`. Phone. Instagram link to `https://www.instagram.com/surachicago` — replace `Instagram soon`. Delete the Menu column (or turn it into a single “Sura menu →” under Contact if a fourth column collapse looks empty; the X is on the Tarra-style “Dinner, tasting…” block — do not leave an empty Menu header).

- [ ] **Step 6: Browser-check `sura.html`**

Hero is the real dark lounge. Cards show the four real drinks with the chat photos. Neon SURA appears in the marquee or gallery, not stacked under the SVG wordmark. IG is live.

- [ ] **Step 7: Commit**

```bash
git add sura.html
git commit -m "fix: sura real lounge, real cocktails, official blurb and IG"
```

---

### Task 5: Wire the two official PDFs

**Files:**
- Modify: `menu.html`
- Modify: `sura-menu.html`

**Interfaces:**
- Consumes: `menus/tarra-menu.pdf`, `menus/sura-menu.pdf`
- Produces: working PDF links behind every “See Full Menu”

- [ ] **Step 1: Rewrite Tarra `menu.html` list**

Replace the three “PDF soon” rows with:

```html
<a class="menu-list__item reveal" id="dinner" href="menus/tarra-menu.pdf" target="_blank" rel="noopener">
  <div>
    <h3>Dinner</h3>
    <p class="menu-list__item-desc">À la carte evening menu</p>
  </div>
  <span class="menu-list__item-arrow">View PDF</span>
</a>
<a class="menu-list__item reveal" id="bar" href="menus/tarra-menu.pdf" target="_blank" rel="noopener">
  <div>
    <h3>Bar</h3>
    <p class="menu-list__item-desc">House cocktails</p>
  </div>
  <span class="menu-list__item-arrow">View PDF</span>
</a>
```

Delete Tasting Journey and Dessert. Hero copy: drop “tasting journey and dessert” and “PDF soon”. Footer: common hours, new email, no Visit guide, no “fine dining” in the title.

- [ ] **Step 2: Rewrite `sura-menu.html` list**

```html
<a class="menu-list__item reveal" id="cocktails" href="menus/sura-menu.pdf" target="_blank" rel="noopener">
  <div>
    <h3>Cocktail Program</h3>
    <p class="menu-list__item-desc">House signatures</p>
  </div>
  <span class="menu-list__item-arrow">View PDF</span>
</a>
<a class="menu-list__item reveal" id="wine" href="menus/sura-menu.pdf" target="_blank" rel="noopener">
  <div>
    <h3>Wine, beer &amp; sake</h3>
    <p class="menu-list__item-desc">By the glass and bottle</p>
  </div>
  <span class="menu-list__item-arrow">View PDF</span>
</a>
```

Delete Spirits and Bar Bites (not in the PDF). Footer: Sura IG, common hours, new email, no Visit guide.

- [ ] **Step 3: Click every “See Full Menu” and every new row**

Tarra page button → `menu.html` → PDF opens. Sura page button → `sura-menu.html` → PDF opens. Confirm both PDFs are the cream Tarra booklet and the navy Sura booklet, not 404.

- [ ] **Step 4: Commit**

```bash
git add menu.html sura-menu.html menus
git commit -m "feat: publish official Tarra and Sura menu PDFs"
```

---

### Task 6: Gallery — real rooms, food, drinks

**Files:**
- Modify: `gallery.html`

**Interfaces:**
- Consumes: the processed image set
- Produces: a gallery that is no longer a CGI reel

- [ ] **Step 1: Replace the grid**

Keep the All / Tarra / Sura filters. Add a Food filter and a Cocktails filter if the existing JS already keys off `data-category` (it does). Categories:

- `tarra`: interiors 1, 3, 4, 5, 6, 7, 8
- `sura`: interiors 1–6 (neon is 5)
- `food`: all six plates
- `cocktails`: four 3/4 shots (overheads optional)

Overlays: venue or object only (`Tarra dining room`, `Sura bar`, `Sura lounge`) — **no dish names** (same rule as the 3-up). Cocktail overlays may use the real drink names.

Hero blurb: delete “Food and cocktail photography will join this gallery as it is produced.”

- [ ] **Step 2: Footer sweep on this page** (same as Task 7)

- [ ] **Step 3: Browser-check filters**

All / Tarra / Sura / Food / Cocktails each show the right set. No monk. No CGI lobby. No sideways table shots.

- [ ] **Step 4: Commit**

```bash
git add gallery.html
git commit -m "feat: gallery of real interiors, food, and cocktails"
```

---

### Task 7: Visit, reservation, and global footer / email / hours / phone

**Files:**
- Modify: `visit.html`, `reservation.html`, `chef.html`, `robert.html`, `privacy.html`, `terms.html`, and any footer still dirty after Tasks 3–6
- Modify: `visit.html` JSON-LD email

**Interfaces:**
- Consumes: the contact constants
- Produces: one hours block, one email, a phone number, no Visit-guide teaser, no Fine Dining leftovers

- [ ] **Step 1: `visit.html` Hours**

Replace the two venue blocks with the single common block. Contact: email + `312.955.8889`. JSON-LD `email` → `main@tarrachicago.com`, add `telephone`. Keep both Maps links (they are official listings). Keep the iframe. Do **not** delete the Visit page — only the footer teaser link.

- [ ] **Step 2: `reservation.html`**

Same hours, email, phone. Keep OpenTable buttons.

- [ ] **Step 3: Repo-wide string replace**

Search every `*.html` for:

| Find | Replace / action |
|---|---|
| `reservations@tarrachicago.com` | `main@tarrachicago.com` |
| `Visit guide →` and its `<p>` | delete |
| `FINE DINING` / `fine dining` / `Fine Dining` | remove the words (keep “Contemporary Thai”) |
| `Instagram soon` | Sura IG link |
| `5:00 PM — 10:00 PM` as the only close | common hours block |
| split Tarra/Sura hour pairs | common hours block |
| `Dinner, tasting, and dessert lists.` | delete that column |
| `Chicago's premier Dining Experience` | `Contemporary Thai Cuisine` or the dual-brand one-liner |

`careers@tarrachicago.com` stays (not mentioned by the client).

- [ ] **Step 4: `robert.html` / `chef.html`**

No staff photos to add. Only footer + “fine dining” cleanup. Do not touch biography substance except the forbidden phrase.

- [ ] **Step 5: Grep to prove the sweep**

```
rg "reservations@|FINE DINING|fine dining|Visit guide|Instagram soon|Bangkok Sunset|Chao Phraya|Golden Temple|Midnight Orchid" --glob "*.html"
```

Expected: zero matches outside `ChatExport_2026-08-20` (which is gitignored).

- [ ] **Step 6: Browser-check visit + reservation + one legal page**

Hours are one block. Email is main@. Phone is present. Maps iframe works. OpenTable buttons still leave the site.

- [ ] **Step 7: Commit**

```bash
git add visit.html reservation.html chef.html robert.html privacy.html terms.html
git commit -m "fix: common hours, main@ email, phone, footer sweep"
```

---

### Task 8: Full-site browser pass and push

**Files:** none new — verification only, then git push.

- [ ] **Step 1: Desktop pass (~1440px)**

Walk: `index.html` → Tarra → Menu PDF → back → Sura → Sura menu PDF → Gallery (every filter) → Visit → Reservation (both OpenTable buttons). Confirm no CGI leftover in any hero, about, 3-up, cocktail grid, or marquee.

- [ ] **Step 2: Mobile pass (~390px)**

Same path. Split panels stack. Address + phone still readable. Taglines do not overflow the logos. Hamburgers still hide the current-page rule from earlier work.

- [ ] **Step 3: Push**

```bash
git push origin main
```

Do not force-push unless history diverged the same way as the earlier KyxecGit fix.

---

## Explicit non-goals / known gaps

| Gap | Why it is a gap | What we do |
|---|---|---|
| Two Artem voicemails + 76s call | Export says “Not included” | Do not invent. Hours decision is documented above. |
| `STAFF PICS/` empty | No files | No headshots. Team cards stay text. |
| Corona vodka brand (Weber Ranch vs Haku) | Chat caption ≠ Sura PDF | Cards = chat. PDF = PDF. |
| Hokkajillo coconut molasses vs coconut sugar | Same split | Cards = chat. |
| Tarra food PDF is sparse / some side names unreadable | File itself is broken | Host PDF; do not typeset a fake complete list. |
| No Sura bar-bites PDF | Not in the dump | Removed from the menu page. |
| No tasting / dessert PDF | Not in the dump | Removed from the menu page. |
| Monk blessing photos | People + ceremony | Never on the site. |
| Fire extinguisher on `DSC09112` | Visible in frame | Not a hero. |
| Sideways `DSC09116–136` | Camera rotation | Skip or rotate first. |
| IG bio hours “Tue–Sat 1–6 PM” | Construction / hiring window, not service | Ignore. |
| Homepage stays split-only | Earlier client + already shipped | Do not put the dual-brand essay on `index.html`. |

---

## Self-review

**Spec coverage**

- Homepage backgrounds, address, phone, Sura tagline symmetry → Tasks 2
- Tarra hero real + symmetry, about real, food no captions, menu PDF, fine dining, footer menu column, visit guide, email → Tasks 3, 5, 7
- Sura hero real + symmetry, about real, cocktails from chat, atmosphere real, menu PDF, IG, maps → Tasks 4, 5, 7
- Official blurbs → Tasks 3, 4
- Common hours → Task 7
- Gallery real photos → Task 6
- Google Maps already embedded; listings kept → Task 7
- Image-by-content mapping (not folder name) → Task 1 + inventory
- Voices / empty staff / recipe diffs → Explicit non-goals

**Placeholder scan:** no TBD, no “add validation later”, no “similar to Task N” without the actual markup.

**Name consistency:** `main@tarrachicago.com`, `312.955.8889`, cocktail file slugs `coco-noir` / `hokkajillo` / `golden-mermaid` / `corona`, menu paths `menus/tarra-menu.pdf` and `menus/sura-menu.pdf` are used the same way in every task.
