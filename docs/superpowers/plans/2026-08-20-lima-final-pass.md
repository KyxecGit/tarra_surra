# Lima Final Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close every remaining Lima note from 20 Aug 02:12–03:41 on the already-shipped launch site, without reprocessing the photo dump or inventing missing bios.

**Architecture:** Static HTML/CSS/JS. Previous branch work is already on `main` (`8f6f6db`). This pass is copy, nav, footer, menu-page, and Visit consistency only. Photo mapping from `docs/superpowers/plans/2026-08-20-client-launch-edits.md` stays locked.

**Tech Stack:** Static HTML, `css/style.css`, `js/main.js`. No new assets required.

## Global Constraints

- Latest Lima text (20 Aug 03:41) wins over older notes when they conflict.
- Do not commit `ChatExport_2026-08-20/`, `Artem TARRA Website/`, `docs/_tmp_mosaics/`, `docs/_tmp_parse_chat.py`, `docs/_tmp_chat_messages.txt`.
- Do not re-run vision on the 55-file interior dump. Mapping is already locked. Heroes are already real rooms (Tarra stair-rail dining, Sura crystal lounge).
- Do not invent Lorraine or Sip bios. STAFF PICS is empty. Two Artem voicemails + 76s call are still missing.
- Email is `main@tarrachicago.com` everywhere. Never `reservations@`.
- Phone is `312.955.8889` / `tel:312.955.8889`.
- Address is `121 W Hubbard St, Chicago, IL 60654`.
- Hours (one block, every page): `Wednesday — Sunday` / `5:00 PM — 12:00 AM` then `Monday — Tuesday` / `Closed`.
- Sura is **The Lounge**. Keep Lima’s official blurb that says “cocktail lounge”. Do not call Sura a bar in headings, nav, hero, or section titles.
- Official Lima blurbs on `tarra.html` / `sura.html` stay verbatim.
- Cocktail names Capitalized; ingredients lowercase. Cards already match chat captions.
- OpenTable is the only booking path.
- Keep PDFs on disk under `menus/` but **do not link them**. 03:41: “remove pdf and rephrase menu coming soon” / “List coming soon”.
- Homepage `index.html` stays split-only. Do **not** add a header there. “Header on the first page” = inner-page navbar (Home / Tarra / Sura / Menu / Gallery / Reserve).
- Footer tagline: Tarra/shared pages = `Contemporary Thai Cuisine`. Sura pages = `The Lounge`.

---

## What is already done (do not redo)

Verified against `main` at `8f6f6db` plus current working tree.

| Lima request | Status | Where |
|---|---|---|
| Real interiors instead of CGI | Done | `images/tarra/*`, `images/sura/*` — Tarra is the real stair-rail dining room; Sura is the real crystal lounge |
| Real food, no captions | Done | `tarra.html` three `dish-card--photo-only`; gallery food filter |
| Real cocktails from chat (Coco Noir, Hokkajillo, Golden Mermaid, Corona) | Done | `sura.html` cards + gallery |
| Official Tarra / Sura / dual-brand blurbs | Done | `tarra.html`, `sura.html` |
| Remove “fine dining” | Done | grep clean across `*.html` |
| `main@tarrachicago.com` | Done | every page email |
| Phone on homepage | Done | `index.html` address line |
| Common hours Wed–Sun 5–12, Mon–Tue Closed | Done | footers + Visit + Reservation |
| Remove Tarra Offerings / Sura Offerings | Done | no Offerings sections remain |
| Remove footer Menu “Dinner, tasting, and dessert lists” | Done on tarra/sura/gallery/menu; **still leftover** on chef/robert/reservation/privacy/terms/visit Explore |
| Remove `Visit guide →` | Done | grep clean |
| Sura hero / about = The Lounge | Done | `sura.html` |
| Meet Namo / platform CTA = Experience above OpenTable | Done | `tarra.html` chef-section + `chef.html` CTA |
| Add Sip under Beverage | Done | `visit.html` team |
| Remove “Recommended…” format | Done | team cards are name + role |
| Parking: no valet; public garage nearby | Done | `visit.html` (wording still needs ride-share tweak) |
| Gallery footer tagline “Contemporary Thai Cuisine” | Done | `gallery.html` |
| Sura Instagram `surachicago` | Done | `sura.html`, `sura-menu.html` |
| Fake cocktail names gone | Done | grep clean |
| Official PDFs copied to `menus/` | Files exist; **03:41 says hide them** |

## Sources (so nothing is guessed)

**Telegram export `ChatExport_2026-08-20/messages.html`** — 40 messages, 19 Aug 01:21 → 20 Aug 00:42. Does **not** contain the 02:12–03:41 notes; those were pasted by the client after export.

Missing from export (do not invent): Artem voice 00:21, Artem voice 00:30, incoming call 76s.

**New edits `IMG_3687–3696.PNG`** confirm the 19 Aug markup already applied: X on 5–10 hours, X on split Tarra/Sura hours, X on Visit guide, X on FINE DINING, X on reservations@, X on footer Menu column, food without captions, load menu (later overridden), replace CGI.

**20 Aug 02:12–02:14 (applied except gaps below)** plus **20 Aug 03:41 numbered list (this plan)**.

**Locked conflict:** 19 Aug 17:10 “Загрузить меню” vs 20 Aug 03:41 “remove pdf / menu coming soon / List coming soon”. **Follow 03:41.** Keep files, unlink them.

---

## Files to modify

| Path | Role |
|---|---|
| `css/style.css` | Navbar one size larger; reserve button fits “Reserve a Table”; IG icon stays small |
| `index.html` | ZIP on address line + JSON-LD `postalCode` |
| `tarra.html` | Nav label, ZIP, unified Contact/IG, no leftover Menu column |
| `sura.html` | Nav label, ZIP, lounge alts, See Full Menu → `sura-menu.html` not PDF |
| `menu.html` | Remove PDF button; “Menu coming soon”; nav + footer |
| `sura-menu.html` | Remove PDF button; “List coming soon”; nav + footer |
| `gallery.html` | Nav label, ZIP, phone already present |
| `visit.html` | ZIP, ride-share drop-off, Contact phone+email+IG, footer tagline + IG, drop Explore/Menu column |
| `reservation.html` | ZIP, nav, footer contact/IG, drop Menu column |
| `chef.html` | Nav label, ZIP, footer contact/IG, drop Menu column |
| `robert.html` | Nav label, ZIP, restore missing IG, drop Menu column, Sura CTA “bar program” → lounge wording |
| `privacy.html`, `terms.html` | ZIP, nav, footer contact/IG, drop Menu column |

Do not touch image binaries, PDFs on disk, or `js/main.js` unless a menu-page class needs no JS.

---

### Shared snippets (paste, do not paraphrase)

**Navbar reserve (desktop + mobile), every page that has it:**

```html
Reserve a Table
```

**Address block:**

```html
<p>121 W Hubbard St<br>Chicago, IL 60654</p>
```

**Homepage line:**

```html
<span>121 W Hubbard St, Chicago, IL 60654  ·  312.955.8889</span>
```

**Tarra/shared Contact column** (replace plain “Instagram” / empty `footer__social`):

```html
<div class="footer__col">
  <h4>Contact</h4>
  <p><a href="tel:312.955.8889">312.955.8889</a></p>
  <p><a href="mailto:main@tarrachicago.com">main@tarrachicago.com</a></p>
  <a class="footer__ig" href="https://www.instagram.com/tarrachicago/" target="_blank" rel="noopener noreferrer">
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm11 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>
    Follow us on Instagram
  </a>
</div>
```

Sura pages (`sura.html`, `sura-menu.html`, `robert.html`) use `https://www.instagram.com/surachicago` in that same markup.

**Visit parking:**

```html
<h4>Parking</h4>
<p>Public garage parking nearby.</p>
<p style="margin-top:12px;">Ride-share drop-off at main entrance.</p>
```

---

### Task 1: Navbar — larger type + “Reserve a Table”

**Files:**
- Modify: `css/style.css:403-417` and the override at `css/style.css:1902-1904`
- Modify: every `*.html` with `navbar__reserve` or mobile `Reserve` (not `index.html` — no nav)

**Interfaces:**
- Consumes: existing navbar markup
- Produces: readable inner-page nav; button text `Reserve a Table`

- [ ] **Step 1: Bump CSS**

Replace both navbar link size rules so the later override cannot shrink them again:

```css
.navbar__link {
  font-size: 0.82rem; font-weight: 400;
  text-transform: uppercase; letter-spacing: 0.16em;
  color: var(--white); position: relative; padding: 6px 0;
  white-space: nowrap;
}
.navbar__reserve {
  font-size: 0.72rem;
  padding: 10px 18px;
  letter-spacing: 0.12em;
  white-space: nowrap;
}
```

At line 1902–1904, change to:

```css
.navbar__links { gap: clamp(10px, 1.4vw, 22px); }
.navbar__link { font-size: 0.82rem; letter-spacing: 0.16em; }
```

- [ ] **Step 2: Replace visible “Reserve” in nav + mobile menu**

Exact string replacements (nav/button/mobile only — do **not** change “Reserve Tarra” / “Reserve Sura” OpenTable buttons, and do **not** change body copy like “Reserve your table”):

Pages: `tarra.html`, `sura.html`, `menu.html`, `sura-menu.html`, `gallery.html`, `visit.html`, `reservation.html` (no reserve button today — leave it), `chef.html`, `robert.html`, `privacy.html`, `terms.html`.

Desktop: `class="btn navbar__reserve"` inner text `Reserve` → `Reserve a Table`.
Mobile: the last `<a …>Reserve</a>` inside `.navbar__mobile-menu` → `Reserve a Table`.

- [ ] **Step 3: Grep gate**

```
rg "navbar__reserve\">Reserve<" --glob "*.html"
rg "navbar__mobile-menu" -A 8 --glob "*.html"
```

Expected: no desktop reserve button still says only `Reserve`. Mobile last items say `Reserve a Table`.

- [ ] **Step 4: Commit**

```bash
git add css/style.css tarra.html sura.html menu.html sura-menu.html gallery.html visit.html chef.html robert.html privacy.html terms.html
git commit -m "fix: larger nav type and Reserve a Table"
```

---

### Task 2: ZIP 60654 on every address

**Files:**
- Modify: `index.html` (visible line + both JSON-LD PostalAddress nodes)
- Modify: `visit.html` (body address, map query, JSON-LD, footer)
- Modify: footer Visit columns on `tarra.html`, `sura.html`, `menu.html`, `sura-menu.html`, `gallery.html`, `reservation.html`, `chef.html`, `robert.html`, `privacy.html`, `terms.html`
- Modify: `reservation.html` address card
- Modify: `terms.html` postal line if present

**Interfaces:**
- Consumes: existing `121 W Hubbard St` / `Chicago, IL`
- Produces: ZIP on every guest-facing address and schema

- [ ] **Step 1: JSON-LD**

In `index.html` both venue addresses and `visit.html` LocalBusiness, add:

```json
"postalCode": "60654"
```

- [ ] **Step 2: Visible copy**

Replace `Chicago, IL` address lines that are the street block with `Chicago, IL 60654`. Do **not** invent a second street. Homepage:

```html
<span>121 W Hubbard St, Chicago, IL 60654  ·  312.955.8889</span>
```

Visit iframe query may become `121%20W%20Hubbard%20St%20Chicago%20IL%2060654` (optional; street+city already geocodes).

- [ ] **Step 3: Grep gate**

```
rg "121 W Hubbard St" --glob "*.html"
```

Every guest-facing match must include `60654` on the next line or same line. `careers@` unchanged.

- [ ] **Step 4: Commit**

```bash
git add index.html visit.html tarra.html sura.html menu.html sura-menu.html gallery.html reservation.html chef.html robert.html privacy.html terms.html
git commit -m "fix: add ZIP 60654 to every address"
```

---

### Task 3: Contact block — phone, main@, Follow us on Instagram + small icon

**Files:**
- Modify: `tarra.html`, `visit.html`, `reservation.html`, `chef.html`, `robert.html`, `privacy.html`, `terms.html` (these still have plain “Instagram” or a broken empty span)
- Leave as-is if already correct: `gallery.html`, `menu.html`, `sura.html`, `sura-menu.html` — but still add **phone** on Contact if missing, and ZIP is Task 2

**Interfaces:**
- Consumes: shared Contact snippet above
- Produces: one Contact pattern; icon 14px; no `?hl=en` tracking

- [ ] **Step 1: `visit.html` Contact item (Practical Details)**

Replace the Contact item so it is:

```html
<div class="visit-block__item">
  <h4>Contact</h4>
  <p><a href="tel:312.955.8889">312.955.8889</a></p>
  <p><a href="mailto:main@tarrachicago.com">main@tarrachicago.com</a></p>
  <a class="footer__ig" href="https://www.instagram.com/tarrachicago/" target="_blank" rel="noopener noreferrer">
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm11 1.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>
    Follow us on Instagram
  </a>
</div>
```

- [ ] **Step 2: Unify footers**

On pages with 4-column footers (`footer__grid` without `--3`): delete the **Menu** or **Explore** column entirely and switch the grid to `footer__grid footer__grid--3` (Hours / Visit / Contact). Contact uses the shared snippet.

Special cases:
- `robert.html` Contact currently has `<div class="footer__social"><span></span></div>` — Instagram is **missing**. Restore Sura IG.
- `tarra.html` already has phone + plain Instagram — swap to `footer__ig`.
- `visit.html` footer tagline `Contemporary Thai Dining &amp; Cocktail Lounge` → `Contemporary Thai Cuisine`. Add phone + `footer__ig`. Drop Explore.
- `gallery.html` / `menu.html` already have `footer__ig`; add ZIP via Task 2 only.
- Strip `?hl=en` from remaining IG URLs.

- [ ] **Step 3: Grep gate**

```
rg "reservations@|Follow us on Instagram|footer__social|hl=en|<h4>Menu</h4>|<h4>Explore</h4>" --glob "*.html"
```

Expected: `Follow us on Instagram` on every public footer. Zero `reservations@`. Zero `hl=en`. Zero footer Menu/Explore columns. `careers@tarrachicago.com` may remain on Visit careers.

- [ ] **Step 4: Commit**

```bash
git add tarra.html sura.html menu.html sura-menu.html gallery.html visit.html reservation.html chef.html robert.html privacy.html terms.html
git commit -m "fix: contact phone, main@, Instagram icon on every footer"
```

---

### Task 4: Visit parking wording

**Files:**
- Modify: `visit.html` parking item

**Interfaces:**
- Consumes: current “Passenger Drop-Off: Main Entrance”
- Produces: 03:41 wording

- [ ] **Step 1: Replace parking copy** with the Visit parking snippet in Shared snippets.

- [ ] **Step 2: Confirm valet is still absent** (`rg -i "valet" --glob "*.html"` → zero).

- [ ] **Step 3: Commit**

```bash
git add visit.html
git commit -m "fix: ride-share drop-off wording on Visit"
```

---

### Task 5: Menu pages — coming soon, unlink PDFs

**Files:**
- Modify: `menu.html`
- Modify: `sura-menu.html`
- Modify: `sura.html` (See Full Menu currently points at the PDF)
- Modify: `tarra.html` (See Full Menu already points at `menu.html` — keep that)

**Interfaces:**
- Consumes: existing page-hero
- Produces: no public PDF links; Tarra “Menu coming soon”; Sura “List coming soon”

- [ ] **Step 1: `menu.html` hero**

Replace the paragraph + PDF button:

```html
<p>Contemporary Thai dinner. Menu coming soon.</p>
```

Delete the entire `<div style="margin-top:36px;">…View Menu PDF…</div>`. Title can stay `The Menu`. Do not mention PDF.

- [ ] **Step 2: `sura-menu.html` hero**

```html
<span class="section-subtitle">The Lounge</span>
<h1>The List</h1>
<div class="gold-line-center"></div>
<p>List coming soon.</p>
```

Delete the PDF button. No “card appears…”. No bar offering section (already gone — do not add one).

- [ ] **Step 3: `sura.html` CTA**

Change

```html
<a href="menus/sura-menu.pdf" class="btn btn-arrow btn-lg" target="_blank" rel="noopener">See Full Menu</a>
```

to

```html
<a href="sura-menu.html" class="btn btn-arrow btn-lg">See Full Menu</a>
```

- [ ] **Step 4: Grep gate**

```
rg "menus/.*\.pdf|View Menu PDF|card appears" --glob "*.html"
```

Expected: zero matches. Files `menus/tarra-menu.pdf` and `menus/sura-menu.pdf` remain on disk, unlinked.

- [ ] **Step 5: Commit**

```bash
git add menu.html sura-menu.html sura.html
git commit -m "fix: menu coming soon, unlink PDFs for launch"
```

---

### Task 6: Sura “lounge not bar” leftovers

**Files:**
- Modify: `sura.html` about image alt
- Modify: `gallery.html` Sura alts
- Modify: `robert.html` CTA paragraph (Sura-facing)

**Interfaces:**
- Consumes: official Sura blurb (keep “cocktail lounge”)
- Produces: no “bar” as the venue name in Sura UI chrome

- [ ] **Step 1: Alts**

`sura.html`: `alt="Sura lounge bar"` → `alt="Sura lounge"`.
`gallery.html`: `alt="Sura bar"` → `alt="Sura lounge"`; `alt="Sura back bar"` → `alt="Sura lounge"`.

- [ ] **Step 2: Robert CTA** (visible Sura language)

```html
<p>Reserve your place at Sura and experience a lounge program designed to tell your story.</p>
```

Do **not** rewrite Robert’s biography (his career copy uses “bar” as a job history word). Do **not** edit Lima’s official Sura paragraphs.

- [ ] **Step 3: Grep on `sura.html` only**

```
rg -i "bar" sura.html
```

Expected: no heading/label/alt using “bar”. Official blurb may still say “cocktail lounge” only.

- [ ] **Step 4: Commit**

```bash
git add sura.html gallery.html robert.html
git commit -m "fix: Sura lounge wording, drop bar labels"
```

---

### Task 7: Team page — leave gaps honest

**Files:**
- Modify: none unless Task 3 already touched `visit.html` team styles

**Interfaces:**
- Consumes: current four cards (Lorraine, Chef Namo, Sip, Robert)
- Produces: no invented bios

- [ ] **Step 1: Confirm cards**

`visit.html` `#team` must remain:

1. Hospitality — Lorraine (name only, no bio)
2. Culinary — Chef Namo + Profile → `chef.html`
3. Beverage — Sip (name only, no bio)
4. Beverage Director — Robert + Profile → `robert.html`

Do **not** add headshots. Do **not** write Lorraine/Sip copy. Do **not** move team off Visit in this pass (03:41: “update the context first”).

- [ ] **Step 2: No commit if unchanged**

---

### Task 8: Browser pass and push

**Files:** none new

- [ ] **Step 1: Desktop ~1440px**

Walk: `index.html` (no header — split + address with ZIP + phone) → Tarra (nav readable, Reserve a Table, Experience above OpenTable, food still captionless) → Menu (coming soon, no PDF) → Sura (The Lounge, real drinks, See Full Menu goes to List coming soon) → Gallery (tagline Contemporary Thai Cuisine, filters) → Visit (ZIP, hours format, phone + main@ + IG icon, public garage, ride-share drop-off, team cards) → Reservation (OpenTable still works).

- [ ] **Step 2: Mobile ~390px**

Same path. Nav hamburger shows Home / Tarra / Sura / Reserve a Table. Footer IG icon visible but small. Address + ZIP wrap cleanly.

- [ ] **Step 3: Final grep**

```
rg "reservations@|FINE DINING|fine dining|Visit guide|Valet|View Menu PDF|menus/.*\\.pdf|60654|Follow us on Instagram|Reserve a Table" --glob "*.html"
```

Expected: forbidden strings absent; `60654`, `Follow us on Instagram`, `Reserve a Table` present.

- [ ] **Step 4: Push**

```bash
git push origin main
```

---

## Explicit non-goals / known gaps

| Gap | Why | What we do |
|---|---|---|
| Lorraine bio | Owner marked for revision; no copy in dump or 03:41 | Name + role only |
| Sip bio | No copy, empty STAFF PICS | Name + role only |
| Two voicemails + 76s call | Export “Not included” | Hours stay the common block already shipped |
| Menu PDFs exist | 03:41 hide them | Keep files, no links |
| Homepage has no header | Split gate by design | Do not add nav to `index.html` |
| Move team content elsewhere | 03:41 deferred (“update context first”) | Leave on Visit |
| Corona vodka brand chat vs PDF | Cards already follow chat | Do not reopen |
| Monk / extinguisher / sideways interiors | Already excluded | Leave excluded |

---

## Self-review

**Spec coverage (03:41 1–11 + 02:12–02:14)**

1. Header one size bigger → Task 1
2. Reserve → Reserve a Table → Task 1
3. Gallery under-logo “contemporary Thai cuisine” → already done; Visit tagline aligned in Task 3
4. Hours Mon–Tue Closed format → already done
4b. ZIP 60654 → Task 2
5. Contact phone + main@ + Instagram icon small → Task 3
6. Menu: remove PDF, “menu coming soon” → Task 5
7. Tarra offerings remove → already done
8. Sura “List coming soon”, no bar offering → Task 5
9. Sura lounge, not bar → Task 6 + already on hero/about
10. Tarra Experience above OpenTable → already done
11. Team context first → Task 7
02:12 Instagram + logo → Task 3
02:12–13 Offerings gone → already done
02:13 Sura The Lounge → already done + Task 6
02:13 Meet Namo Experience → already done
02:13 Lorraine/Sip/Recommended/email → Task 7 + already done
02:14 Parking → Task 4

**Placeholder scan:** no TBD, no “add validation later”.

**Name consistency:** `main@tarrachicago.com`, `312.955.8889`, `60654`, `Reserve a Table`, `Menu coming soon`, `List coming soon`, Instagram 14px icon, Sura IG without `igsh`.
