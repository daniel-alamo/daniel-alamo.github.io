# Daniel Álamo Casanueva — CV Webpage

A static personal CV website built with plain HTML, CSS, and JavaScript. No frameworks, no build step. All content is stored in `data.json` — edit that one file to update anything on the CV.

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

## Local preview

`script.js` fetches `data.json` at runtime, so you **must** serve the files through a local HTTP server. Opening `index.html` directly as a `file://` URL will block the fetch.

```bash
# Python 3 — run this inside the CV_Webpage folder
python -m http.server 8080
```

Then open <http://localhost:8080>.

---

## Editing the CV — `data.json` reference

`data.json` is a single JSON file with the following top-level sections. Every field that has both an English and a Spanish version is written as `{ "en": "...", "es": "..." }`. Fields that don't change between languages (company names, email, tech names) are plain strings.

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

### `about` — the summary paragraph (supports `<strong>` tags)

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

- `name` — plain string (same in both languages) or `{ "en": "...", "es": "..." }`
- `level` — integer 0–100, controls the bar width

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

- `badge` — controls the badge colour; accepted values: `native`, `c1`, `b1`

### `technologies` — sidebar pill cloud

```json
"technologies": ["SAP BTP", "S/4HANA", "CAP", "Fiori", "Python", ...]
```

Plain array of strings. Add, remove, or reorder freely.

### `jobs` — experience timeline (ordered top to bottom)

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
- `minor` — set to `true` for internship/early-career roles (smaller dot on the timeline); omit or set `false` otherwise

### `education` — education cards (displayed as a two-column grid)

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

- Use `institution` for the institution line when it doesn't need translation, or `sub` for a translated subtitle. Set the unused one to `null`.

### `certifications` — certification list

```json
"certifications": [
  { "year": "2025", "name": "SAP Certified Professional – Solution Architect – SAP BTP",
    "issuer": "SAP", "featured": true },
  { "year": "2024", "name": "Positioning SAP Business AI", "issuer": "SAP" }
]
```

- `featured` — set to `true` to highlight the row (bolder text, accent border); omit or `false` for regular rows
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

Only edit this if you want to rename a section heading or the download button label.

---

## Deploying

Upload these five files to any static host: `index.html`, `style.css`, `script.js`, `data.json`, `photo.png`. No backend or build step required.

### Option A — GitHub Pages (free)

1. Create a public repository named `<your-username>.github.io`.
2. Push (or drag & drop) the five files to the root of the `main` branch.
3. Go to **Settings → Pages**, set source to **Deploy from branch → main → / (root)**.
4. Live at `https://<your-username>.github.io` within a few minutes.

**Custom domain:** Add an `A` record pointing to GitHub's IPs (`185.199.108.153` etc.) and set the custom domain in Pages settings.

### Option B — Netlify (drag & drop)

1. <https://netlify.com> → **Add new site → Deploy manually**.
2. Drag the project folder onto the upload zone.
3. Instant URL. Add a custom domain in **Site settings → Domain management**.

### Option C — Vercel

```bash
npm i -g vercel
vercel   # run inside the project folder
```

### Option D — Traditional hosting (FTP / cPanel)

Upload the five files to `public_html` and point your domain's `A` record to the host IP.

---

## HTTPS / SSL

All options above provide free HTTPS automatically. Never serve a personal CV over plain HTTP.
