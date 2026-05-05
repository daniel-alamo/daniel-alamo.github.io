# Daniel Álamo Casanueva — CV Webpage

A static personal CV website built with plain HTML, CSS, and JavaScript. No frameworks, no build step — just open `index.html` in a browser.

## Project structure

```
CV_Webpage/
├── index.html           # Main page
├── style.css            # All styles
├── script.js            # Animations (skill bars, section fade-ins)
├── photo.png            # Profile photo
└── Daniel_Alamo_CV.pdf  # Downloadable CV (linked from the Download button)
```

---

## Local preview

Double-click `index.html`, or from a terminal:

```bash
# macOS / Linux
open index.html

# Windows
start index.html
```

For a proper local server (avoids any CORS quirks):

```bash
# Python 3
python -m http.server 8080
# then open http://localhost:8080
```

---

## Deploying to a domain

You only need to upload 5 files: `index.html`, `style.css`, `script.js`, `photo.png`, and `Daniel_Alamo_CV.pdf`. No backend, no database.

### Option A — GitHub Pages (free, great for personal CVs)

1. Create a GitHub account at <https://github.com> if you don't have one.
2. Create a new **public** repository named `<your-username>.github.io`  
   *(e.g. `daniel-alamo.github.io`)*
3. Upload the five files to the root of that repository (drag & drop in the browser UI, or push via git).
4. Go to **Settings → Pages** and set the source to **Deploy from branch → main → / (root)**.
5. Your CV will be live at `https://<your-username>.github.io` within a couple of minutes.

**Custom domain with GitHub Pages:**

1. Buy a domain (Namecheap, GoDaddy, Cloudflare Registrar, etc.).
2. In your domain registrar's DNS settings, add:
   - `A` record → `185.199.108.153` (and the other three GitHub Pages IPs)
   - `CNAME` record → `www` → `<your-username>.github.io`
3. In GitHub Pages settings, enter your custom domain and tick **Enforce HTTPS**.

---

### Option B — Netlify (drag & drop, free tier)

1. Go to <https://netlify.com> and sign up.
2. On the dashboard click **Add new site → Deploy manually**.
3. Drag the entire `CV_Webpage` folder onto the upload zone.
4. Netlify gives you a random URL instantly (e.g. `quirky-name-123.netlify.app`).
5. To use a custom domain: **Site settings → Domain management → Add custom domain**.

---

### Option C — Vercel (free, fast CDN)

1. Install the Vercel CLI: `npm i -g vercel`
2. From inside the `CV_Webpage` folder run: `vercel`
3. Follow the prompts — it deploys in seconds.
4. Add a custom domain in the Vercel dashboard under **Domains**.

---

### Option D — Traditional hosting (cPanel / FTP)

1. Log in to your host's **File Manager** or connect via FTP (FileZilla, Cyberduck).
2. Navigate to `public_html` (or `www`, depending on your host).
3. Upload the five files.
4. Point your domain's DNS `A` record to your host's IP address.

---

## Updating the CV

| What to change | Where |
|---|---|
| Text content / experience | `index.html` |
| Colors, fonts, layout | `style.css` |
| Profile photo | Replace `photo.png` (keep same filename) |
| Downloadable PDF | Replace `Daniel_Alamo_CV.pdf` (keep same filename) |

After editing, re-upload only the changed files.

---

## HTTPS / SSL

All four options above give you free HTTPS automatically (Let's Encrypt).  
Never serve a personal CV over plain HTTP — browsers will warn visitors.
