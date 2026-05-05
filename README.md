# Daniel Álamo Casanueva — CV Webpage

A static personal CV website built with plain HTML, CSS, and JavaScript. No frameworks, no build step. All content lives in `data.json` — edit that one file to update anything on the CV.

**Live site:** https://daniac23.github.io/daniel-alamo.github.io/

---

## Project structure

```
CV_Webpage/
├── data.json      # ← ALL CV content lives here — the only file you need to edit
├── index.html     # Page structure (empty containers, no hardcoded content)
├── style.css      # All styles and layout
├── script.js      # Fetches data.json, renders the page, generates the PDF
└── photo.png      # Profile photo
```

---

## Features

- **Bilingual** — English / Spanish toggle via flag buttons; all content fields support `{ "en": "...", "es": "..." }` or plain strings
- **Collapsible sections** — every section title and every experience timeline item can be expanded/collapsed; implemented with event delegation so language switches don't break the listeners
- **Animated skill bars** — sidebar bars animate on load and on language switch
- **Scroll fade-in** — sections animate into view via `IntersectionObserver`
- **PDF export** — client-side PDF generation via [pdfMake](https://pdfmake.github.io/) with full two-column layout, sidebar, photo, and matching dark theme
- **Fully static** — no backend, no build step, no `package.json`; works on any static host

---

## Local preview

`script.js` fetches `data.json` at runtime, so the files **must** be served through a local HTTP server. Opening `index.html` directly as a `file://` URL will block the fetch.

```bash
# Python 3 — run inside the CV_Webpage folder
python -m http.server 8080
```

Then open <http://localhost:8080>.

---

## Architecture

### Rendering pipeline

1. On `DOMContentLoaded`, `data.json` is fetched and stored in `cvData`.
2. `renderPage(data, lang)` calls one render function per section — each writes to a specific `id` in the static HTML shell.
3. Language switch calls `applyLang(lang)`, which re-runs `renderPage` and re-animates the skill bars. The DOM is fully rebuilt on each switch.
4. Collapsible behaviour is wired once via **event delegation** on `document` — no re-attachment needed after re-renders.

### Key functions in `script.js`

| Function | Purpose |
|---|---|
| `t(field, lang)` | Returns the correct language string from a bilingual field or a plain string |
| `renderPage(data, lang)` | Orchestrates all section renders |
| `renderJobs(data, lang)` | Builds the experience timeline HTML |
| `renderEducation(data, lang)` | Builds the education cards (single-column stacked layout) |
| `initCollapsible()` | Attaches a single delegated click listener for all collapsibles |
| `initLangSwitcher()` | Wires the flag buttons to `applyLang` |
| `generatePDF()` | Builds a pdfMake document definition and triggers download |
| `buildSidebar(photo, data, lang)` | Returns the pdfMake sidebar content array |
| `buildMain(data, lang)` | Returns the pdfMake main column content array |

### PDF generation

- Uses [pdfMake 0.2.12](https://cdn.jsdelivr.net/npm/pdfmake@0.2.12/) loaded from CDN — no local install needed.
- The layout mirrors the webpage: a fixed-width dark sidebar (`140pt`) and a main column, rendered as a two-column table with no borders.
- The profile photo is drawn onto a `<canvas>` element to produce a base64 JPEG, which pdfMake embeds inline.
- Education entries render as a vertical stack (matching the single-column layout on the webpage).

---

## Editing the CV — `data.json` reference

Every field that has both an English and a Spanish version is written as `{ "en": "...", "es": "..." }`. Fields that don't change between languages (company names, years, tech names) are plain strings.

### `personal` — contact info & header text

```json
"personal": {
  "name": "Daniel Álamo Casanueva",
  "tagline": { "en": "SAP BTP Solution Advisor\nSenior Specialist",
               "es": "Asesor de Soluciones SAP BTP\nEspecialista Senior" },
  "location": "Madrid, Spain",
  "phone": "(+34) 656 33 21 54",
  "email": "danialamo89@gmail.com",
  "linkedin": "https://www.linkedin.com/in/...",
  "linkedinLabel": "linkedin.com/in/daniel-alamo",
  "headerSub": { "en": "SAP BTP Technical Lead · Solution Architect",
                 "es": "Líder Técnico SAP BTP · Arquitecto de Soluciones" }
}
```

### `about` — summary paragraph (supports `<strong>` tags for bold)

```json
"about": {
  "en": "Strategic architect with <strong>13+ years</strong> ...",
  "es": "Arquitecto estratégico con <strong>más de 13 años</strong> ..."
}
```

### `skills` — sidebar progress bars

```json
"skills": [
  { "name": "SAP BTP", "level": 98 },
  { "name": { "en": "Cloud Architecture", "es": "Arquitectura Cloud" }, "level": 88 }
]
```

- `level` — integer 0–100, controls the bar fill width

### `languages` — sidebar language badges

```json
"languages": [
  { "name": { "en": "Spanish", "es": "Español" },
    "level": { "en": "Native", "es": "Nativo" },
    "badge": "native" },
  { "name": { "en": "English", "es": "Inglés" }, "level": "C1", "badge": "c1" },
  { "name": { "en": "French",  "es": "Francés" }, "level": "B1", "badge": "b1" }
]
```

- `badge` — controls badge colour; accepted values: `native`, `c1`, `b1`

### `technologies` — sidebar pill cloud

```json
"technologies": ["SAP BTP", "S/4HANA", "CAP", "Fiori", "Python", ...]
```

Plain array of strings. Add, remove, or reorder freely.

### `jobs` — experience timeline (ordered top to bottom = newest first)

```json
"jobs": [
  {
    "role":        { "en": "BTP Solution Advisor", "es": "Asesor de Soluciones BTP" },
    "company":     "SAP SE",
    "date":        { "en": "Jan 2022 — Present", "es": "Ene 2022 — Presente" },
    "description": { "en": "...", "es": "..." },
    "tags": [
      "SAP BTP",
      { "en": "Cloud Architecture", "es": "Arquitectura Cloud" }
    ],
    "minor": false
  }
]
```

- `tags` — each tag is a plain string or `{ "en": "...", "es": "..." }`
- `minor` — `true` for internship/early-career roles (smaller dot, slightly dimmed); omit or `false` otherwise

### `education` — education cards (single-column stacked layout)

```json
"education": [
  {
    "years":       "2010–2012",
    "title":       { "en": "Computer Engineering", "es": "Ingeniería Informática" },
    "institution": "Universidad Carlos III de Madrid",
    "sub":         null
  },
  {
    "years":       "2007–2010",
    "title":       { "en": "Technical Computer Engineering", "es": "Ingeniería Técnica" },
    "institution": null,
    "sub":         { "en": "Specialised in Management · UC3M", "es": "Especialidad en Gestión · UC3M" }
  }
]
```

- Use `institution` for a plain (untranslated) institution name, or `sub` for a translated subtitle. Set the unused one to `null`.

### `certifications` — certification list

```json
"certifications": [
  { "year": "2025", "name": "SAP Certified Professional – Solution Architect – SAP BTP",
    "issuer": "SAP", "featured": true },
  { "year": "2024", "name": "Positioning SAP Business AI", "issuer": "SAP" }
]
```

- `featured` — `true` highlights the row with an accent border; omit or `false` for regular rows
- Certification names are not translated (they are official credential titles)

### `ui` — section labels and button text

```json
"ui": {
  "en": { "contact": "Contact", "coreSkills": "Core Skills", "about": "About",
          "experience": "Experience", "education": "Education & Certifications",
          "certifications": "Certifications", "languages": "Languages",
          "technologies": "Technologies", "cvLabel": "Curriculum Vitae",
          "downloadBtn": "Download PDF" },
  "es": { "contact": "Contacto", "coreSkills": "Habilidades Principales", ... }
}
```

Only edit this to rename a section heading or the download button label.

---

## Deploying

The site is already live on GitHub Pages. Push to `main` and it redeploys automatically within ~60 seconds.

```bash
git add data.json   # or whichever files changed
git commit -m "Update CV"
git push
```

### GitHub Pages setup (already configured)

- Repo: `https://github.com/daniac23/daniel-alamo.github.io`
- Branch: `main`, folder: `/ (root)`
- Live URL: `https://daniac23.github.io/daniel-alamo.github.io/`

**Custom domain:** Add `A` records pointing to GitHub's IPs (`185.199.108.153`, `.109.`, `.110.`, `.111.153`) at your registrar, then set the custom domain in **Settings → Pages**.

---

## HTTPS / SSL

GitHub Pages provides free HTTPS automatically via Let's Encrypt. Never serve a personal CV over plain HTTP.
