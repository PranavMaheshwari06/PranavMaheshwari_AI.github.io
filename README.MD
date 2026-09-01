# Portfolio — Backend & AI Engineer

A single-page, dark, minimal portfolio. No framework, no build step, no dependencies.

Open `index.html` in a browser and it works.

```
index.html    layout skeleton (empty containers)
styles.css    theme + layout (CSS variables at the top)
content.js    ← EVERYTHING YOU EDIT lives here
main.js       renders content.js into the page + interactions
```

---

## Run it locally

Double-click `index.html`.

Optionally serve it (avoids any file:// quirks):

```powershell
# Python
python -m http.server 5173
# or Node
npx serve .
```

Then open <http://localhost:5173>.

---

## Editing `content.js`

All content is one object: `window.CONTENT = { ... }`. Change a value, save, refresh.

Keep the quotes and commas — it is plain JavaScript. Arrays `[ ... ]` can grow or shrink freely.

### `meta`

| Field | What it does |
| --- | --- |
| `title` | Browser tab title / search result title |
| `description` | SEO + link-preview description |
| `accent` | **The primary theme colour.** Change this hex value to re-theme most of the site |
| `accent2` | The second colour in every gradient (name, metrics, glows, CTA) |
| `ogImage` | OPTIONAL 1200×630 image URL shown when your link is shared on LinkedIn/X/Slack |

### `nav`

| Field | What it does |
| --- | --- |
| `monogram` | Your initials in the top-left box (2–3 chars looks best) |
| `links[]` | `{ label, target }`. `target` must be a section id: `home`, `about`, `career`, `work`, `contact`. Delete an entry to remove it from the nav |
| `resume` | `{ label, href }`. Drop your PDF next to `index.html` and set `href: "resume.pdf"` (or paste any URL). Delete the whole `resume` block to hide the button |

### `hero`

| Field | What it does |
| --- | --- |
| `name` | Big animated heading |
| `role` | Small uppercase line above the name |
| `rotating[]` | The typewriter phrases. Add as many as you like — they loop |
| `punchline` | One-line statement under the typewriter |
| `scrollCue` | Label next to the scroll indicator. Set `""` to hide it |
| `availability` | Small status pill above your name, e.g. `"Open to senior roles · 2026"`. Set `""` to hide it |
| `metrics[]` | Proof strip under the punchline. Each `{ value, label }` counts up on scroll (e.g. `"40M+"`, `"62%"`, `"380ms"`). Delete the array to hide it |

### `about`

- `bio` — an array of strings; **one string = one paragraph**.
- `skills` — an array of `{ group, items[] }`. Each group renders a label and a row of tags.
- `marquee` — an array of keyword strings that scroll in a slow band between About and Career. Delete the array to remove the band.

### `career` — adding or removing a job

Copy one block inside `jobs` and edit it. Order is top-to-bottom, so keep newest first.

```js
{
  period: "2023 — Present",     // date range
  current: true,                // OPTIONAL — adds a pulsing "Now" badge
  role: "Senior AI Engineer",   // job title
  company: "Northwind AI",      // employer
  url: "https://example.com",   // OPTIONAL — makes the company a link ("" = plain text)
  location: "Remote",           // OPTIONAL
  points: [                     // 1–2 short impact lines
    "Shipped X, which did Y.",
  ],
  tech: ["Python", "Kubernetes"] // pill tags
},
```

Delete a whole `{ ... },` block to remove a job. The timeline dot, line and scroll animation are handled automatically.

### `work` — adding a project

```js
{
  title: "Atlas Agent Runtime",
  year: "2025",                 // OPTIONAL, shown in the card corner
  featured: true,               // OPTIONAL, makes the card span two columns
  blurb: "What it does and why it matters.",
  tech: ["Python", "FastAPI"],
  links: [                      // OPTIONAL — delete the array for no links
    { label: "Live", href: "https://example.com" },
    { label: "Repo", href: "https://github.com/you/repo" }
  ]
},
```

### `contact`

- `cta` — the big statement line above the blurb. Wrap words in `*stars*` to render them in the accent gradient, e.g. `"Let's build something *that survives production*."`
- `email` — becomes the big `mailto:` link, with a one-click **Copy** button next to it.
- `links[]` — `{ label, handle, href, icon }`.

  Built-in `icon` values: `email`, `github`, `linkedin`, `x`, `mastodon`, `bluesky`, `website`, `link`.

  Anything unrecognised falls back to a generic link icon.

### `education`

Optional. Delete the entire `education: { ... },` block to hide the section.

### `footer`

`copyright` supports `{year}`, which is replaced with the current year automatically.

`timezone` (OPTIONAL) shows a small live clock, e.g. `"Asia/Kolkata"` or `"America/New_York"` — use any IANA zone name. Set `""` to hide it.

---

## Theming

Either set `meta.accent` in `content.js` (applied at runtime), or edit the variables at the top of `styles.css`:

```css
:root {
  --bg: #0a0b0e;        /* page background */
  --surface: #13151c;   /* cards */
  --text: #e9ebf2;      /* main text */
  --text-dim: #a2a9ba;  /* body copy */
  --accent: #5b6cff;    /* links, tags, timeline dots */
  --container: 1120px;  /* max content width */
}
```

Spacing (`--space-*`), fonts (`--font-sans`, `--font-mono`) and radii are in the same block.

---

## Accessibility & performance notes

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), one `h1`, skip link, visible focus rings.
- Fully keyboard navigable, including the mobile menu (`Esc` closes it).
- `prefers-reduced-motion: reduce` disables the typewriter, reveal animations and cursor glow.
- No web fonts, no images, no network requests — the whole site is a few KB.
- Content is inserted via `textContent`, so text in `content.js` is never treated as HTML.

---

## Deploy to Netlify

**Drag & drop (fastest)**

1. Go to <https://app.netlify.com/drop>.
2. Drag the project folder onto the page.
3. Done — you get a live URL. Rename it under *Site settings → Change site name*.

**Git-based (auto-deploy on push)**

1. Push the folder to a GitHub repo.
2. Netlify → *Add new site → Import an existing project* → pick the repo.
3. Build settings:
   - **Build command:** *(leave empty)*
   - **Publish directory:** `.`
4. Deploy. Every push to `main` redeploys automatically.

**Custom domain:** *Domain settings → Add a domain*, then point your DNS at Netlify. HTTPS is issued automatically.

## Deploy to GitHub Pages

1. Push the folder to a repo (files must be at the repo root).
2. Repo → *Settings → Pages*.
3. **Source:** Deploy from a branch → **Branch:** `main`, **Folder:** `/ (root)` → Save.
4. Your site appears at `https://<username>.github.io/<repo>/`.