// ── Helpers ───────────────────────────────────────────────────────────────
function t(field, lang) {
  if (!field || typeof field === 'string') return field || '';
  return field[lang] || field['en'] || '';
}

const CHEVRON_SVG = `<svg class="tl-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06z" clip-rule="evenodd"/></svg>`;

// ── Skill bar animation ───────────────────────────────────────────────────
function animateSkillBars() {
  document.querySelectorAll('.skill-item').forEach(item => {
    const bar = item.querySelector('.bar-fill');
    if (bar) bar.style.width = item.dataset.level + '%';
  });
}

// ── Section fade-in on scroll ─────────────────────────────────────────────
function initSectionAnimations() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    }),
    { threshold: 0.08 }
  );
  document.querySelectorAll('.section').forEach(s => observer.observe(s));
}

// ── Collapsible sections & timeline items ─────────────────────────────────
function initCollapsible() {
  document.querySelectorAll('.collapsible-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      trigger.closest('.section').classList.toggle('collapsed');
    });
  });
  document.querySelectorAll('.tl-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      trigger.closest('.tl-item').classList.toggle('collapsed');
    });
  });
}

// ── Page rendering ────────────────────────────────────────────────────────
function renderPersonal(data, lang) {
  const p = data.personal;
  const ui = data.ui[lang];

  // Sidebar name & tagline
  const nameParts = p.name.split(' ');
  const firstName = nameParts[0];
  const rest = nameParts.slice(1).join(' ');
  document.getElementById('sb-name').innerHTML = `${firstName}<br/><span>${rest}</span>`;
  document.getElementById('sb-tagline').innerHTML = t(p.tagline, lang).replace(/\n/g, '<br/>');

  // Sidebar contact
  document.getElementById('sb-contact-title').textContent = ui.contact;
  document.getElementById('sb-contact').innerHTML = `
    <li><span class="icon">📍</span><span>${p.location}</span></li>
    <li><span class="icon">📞</span><span>${p.phone}</span></li>
    <li><span class="icon">✉️</span><a href="mailto:${p.email}">${p.email}</a></li>
    <li><span class="icon">🔗</span><a href="${p.linkedin}" target="_blank">LinkedIn Profile</a></li>
  `;

  // Header
  document.getElementById('header-label').textContent = ui.cvLabel;
  document.getElementById('header-title').innerHTML = `${firstName} <span>${rest}</span>`;
  document.getElementById('header-sub').textContent = t(p.headerSub, lang);
  document.getElementById('header-contact').innerHTML = `
    <a href="mailto:${p.email}" class="hc-item">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884 10 9.882l7.997-3.998A2 2 0 0 0 16 4H4a2 2 0 0 0-1.997 1.884z"/><path d="m18 8.118-8 4-8-4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.118z"/></svg>
      ${p.email}
    </a>
    <a href="tel:${p.phone.replace(/[^+\d]/g, '')}" class="hc-item">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 0 1 1-1h2.153a1 1 0 0 1 .986.836l.74 4.435a1 1 0 0 1-.54 1.06l-1.548.773a11.037 11.037 0 0 0 6.105 6.105l.774-1.548a1 1 0 0 1 1.059-.54l4.435.74a1 1 0 0 1 .836.986V17a1 1 0 0 1-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
      ${p.phone}
    </a>
    <a href="${p.linkedin}" target="_blank" class="hc-item">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      LinkedIn
    </a>
    <span class="hc-item hc-location">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 15.012 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 6.012 3.354 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003zM10 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" clip-rule="evenodd"/></svg>
      ${p.location}
    </span>
  `;

  // Download button label
  document.getElementById('btn-download-label').textContent = ui.downloadBtn;

  // Footer
  document.getElementById('footer-text').innerHTML =
    `${p.name} &nbsp;·&nbsp; Madrid, Spain &nbsp;·&nbsp; <a href="mailto:${p.email}">${p.email}</a>`;
}

function renderSkills(data, lang) {
  document.getElementById('sb-skills-title').textContent = data.ui[lang].coreSkills;
  document.getElementById('sb-skills').innerHTML = data.skills.map(s => `
    <div class="skill-item" data-level="${s.level}">
      <span class="skill-name">${t(s.name, lang)}</span>
      <div class="bar-track"><div class="bar-fill"></div></div>
    </div>
  `).join('');
}

function renderLanguages(data, lang) {
  document.getElementById('sb-languages-title').textContent = data.ui[lang].languages;
  document.getElementById('sb-languages').innerHTML = data.languages.map(l => `
    <div class="lang-item">
      <span class="lang-name">${t(l.name, lang)}</span>
      <span class="lang-level ${l.badge}">${t(l.level, lang)}</span>
    </div>
  `).join('');
}

function renderTechnologies(data, lang) {
  document.getElementById('sb-tech-title').textContent = data.ui[lang].technologies;
  document.getElementById('sb-technologies').innerHTML = data.technologies
    .map(tech => `<span class="pill">${tech}</span>`)
    .join('');
}

function renderJobs(data, lang) {
  document.getElementById('experience-title').textContent = data.ui[lang].experience;
  document.getElementById('timeline').innerHTML = data.jobs.map(job => {
    const dotClass = job.minor ? 'tl-dot small' : 'tl-dot';
    const tags = job.tags.map(tag => `<span>${t(tag, lang)}</span>`).join('');
    return `
      <div class="tl-item">
        <div class="${dotClass}"></div>
        <div class="tl-content">
          <div class="tl-header tl-trigger">
            <div>
              <h3 class="tl-role">${t(job.role, lang)}</h3>
              <p class="tl-company">${job.company}</p>
            </div>
            <div class="tl-header-right">
              <span class="tl-date">${t(job.date, lang)}</span>
              ${CHEVRON_SVG}
            </div>
          </div>
          <div class="tl-body">
            <p class="tl-desc">${t(job.description, lang)}</p>
          </div>
          <div class="tl-tags">${tags}</div>
        </div>
      </div>
    `;
  }).join('');
}

function renderEducation(data, lang) {
  document.getElementById('education-title').textContent = data.ui[lang].education;
  document.getElementById('edu-grid').innerHTML = data.education.map(edu => {
    const sub = edu.sub ? `<p>${t(edu.sub, lang)}</p>` : (edu.institution ? `<p>${edu.institution}</p>` : '');
    return `
      <div class="edu-card">
        <span class="edu-year">${edu.years}</span>
        <h4>${t(edu.title, lang)}</h4>
        ${sub}
      </div>
    `;
  }).join('');
}

function renderCertifications(data, lang) {
  document.getElementById('cert-subtitle').textContent = data.ui[lang].certifications;
  document.getElementById('cert-list').innerHTML = data.certifications.map(c => `
    <div class="cert-item${c.featured ? ' featured' : ''}">
      <span class="cert-year">${c.year}</span>
      <div>
        <strong>${c.name}</strong>
        <span class="cert-issuer">${c.issuer}</span>
      </div>
    </div>
  `).join('');
}

function renderAbout(data, lang) {
  document.getElementById('about-title').textContent = data.ui[lang].about;
  document.getElementById('about-text').innerHTML = t(data.about, lang);
}

function renderPage(data, lang) {
  renderPersonal(data, lang);
  renderSkills(data, lang);
  renderLanguages(data, lang);
  renderTechnologies(data, lang);
  renderAbout(data, lang);
  renderJobs(data, lang);
  renderEducation(data, lang);
  renderCertifications(data, lang);
  document.documentElement.lang = lang;
}

// ── i18n ──────────────────────────────────────────────────────────────────
let currentLang = 'en';
let cvData = null;

function applyLang(lang) {
  currentLang = lang;
  if (!cvData) return;
  renderPage(cvData, lang);
  setTimeout(animateSkillBars, 50);
  initCollapsible();
}

function initLangSwitcher() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang === currentLang) return;
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyLang(lang);
    });
  });
}

// ── PDF generation ────────────────────────────────────────────────────────

const C = {
  dark:    '#0f172a',
  dark2:   '#1e293b',
  sidebar: '#1a1f35',
  accent:  '#3b82f6',
  accent2: '#38bdf8',
  text:    '#f1f5f9',
  muted:   '#94a3b8',
  border:  '#1e3a5f',
  tagBg:   '#162032',
  tagCol:  '#bfdbfe',
};

function loadPhotoBase64() {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };
    img.onerror = () => resolve(null);
    img.src = 'photo.png';
  });
}

function skillBar(label, pct) {
  const BAR_W = 108;
  const BAR_H = 4;
  const filled = Math.max(2, Math.round(BAR_W * pct / 100));
  return {
    margin: [0, 0, 0, 7],
    stack: [
      { text: label, fontSize: 7.5, color: C.text, bold: true, margin: [0, 0, 0, 2] },
      { canvas: [
          { type: 'rect', x: 0, y: 0, w: BAR_W, h: BAR_H, r: 2, color: C.border },
          { type: 'rect', x: 0, y: 0, w: filled, h: BAR_H, r: 2, color: C.accent2 },
      ]},
    ],
  };
}

function sbTitle(label) {
  return {
    text: label.toUpperCase(),
    fontSize: 6.5, bold: true, color: C.accent2,
    characterSpacing: 1.5,
    margin: [0, 0, 0, 7],
  };
}

function badge(label, color, bgColor) {
  return {
    table: { body: [[{
      text: label, fontSize: 6.5, bold: true,
      color: color, fillColor: bgColor,
      border: [false, false, false, false],
      margin: [4, 1, 4, 1],
    }]]},
    layout: 'noBorders',
  };
}

function pdfTag(label) {
  return {
    table: { body: [[{
      text: label, fontSize: 6.5,
      color: C.tagCol, fillColor: C.tagBg,
      border: [false, false, false, false],
      margin: [4, 1, 4, 1],
    }]]},
    layout: 'noBorders',
  };
}

function sectionTitle(label) {
  return {
    margin: [0, 0, 0, 10],
    columns: [
      { canvas: [{ type: 'rect', x: 0, y: 2, w: 3, h: 8, r: 1, color: C.accent2 }], width: 8 },
      { text: label, fontSize: 10, bold: true, color: C.text, width: '*' },
    ],
    columnGap: 4,
  };
}

function hRule(width) {
  return { canvas: [{ type: 'line', x1: 0, y1: 0, x2: width, y2: 0, lineWidth: 0.5, lineColor: C.border }], margin: [0, 8, 0, 8] };
}

function buildSidebar(photoDataUrl, data, lang) {
  const p = data.personal;
  const ui = data.ui[lang];
  const nameParts = p.name.split(' ');
  const items = [];

  if (photoDataUrl) {
    items.push({
      image: photoDataUrl,
      width: 80, height: 80,
      alignment: 'center',
      margin: [0, 0, 0, 10],
    });
  }

  items.push(
    {
      text: [
        { text: nameParts[0] + ' ', color: '#ffffff' },
        { text: nameParts.slice(1).join(' '), color: C.accent2 },
      ],
      font: 'Roboto', bold: true, fontSize: 13,
      alignment: 'center',
      margin: [0, 0, 0, 4],
    },
    {
      text: t(p.tagline, lang),
      fontSize: 7.5, color: C.muted, alignment: 'center',
      lineHeight: 1.4,
      margin: [0, 0, 0, 10],
    },

    hRule(110),
    sbTitle(ui.contact),
    { text: [{ text: 'Loc  ', bold: true, color: C.accent2 }, { text: p.location, color: C.muted }],           fontSize: 7.5, margin: [0, 0, 0, 4] },
    { text: [{ text: 'Tel  ', bold: true, color: C.accent2 }, { text: p.phone, color: C.muted }],               fontSize: 7.5, margin: [0, 0, 0, 4] },
    { text: [{ text: 'Mail  ', bold: true, color: C.accent2 }, { text: p.email, color: C.muted }],              fontSize: 7.5, margin: [0, 0, 0, 4] },
    { text: [{ text: 'Web  ', bold: true, color: C.accent2 }, { text: p.linkedinLabel, color: C.muted }],       fontSize: 7.5, margin: [0, 0, 0, 0] },

    hRule(110),
    sbTitle(ui.coreSkills),
    ...data.skills.map(s => skillBar(t(s.name, lang), s.level)),

    hRule(110),
    sbTitle(ui.languages),
    ...data.languages.map((l, i) => {
      const nativeColors = { color: C.accent2, bg: '#0e2d4a' };
      const c1Colors     = { color: C.tagCol,  bg: C.tagBg };
      const b1Colors     = { color: C.muted,   bg: '#1a2540' };
      const colorMap     = { native: nativeColors, c1: c1Colors, b1: b1Colors };
      const col          = colorMap[l.badge] || b1Colors;
      return {
        columns: [
          { text: t(l.name, lang), fontSize: 8, color: C.text, width: '*' },
          { ...badge(t(l.level, lang), col.color, col.bg), width: 'auto' },
        ],
        margin: [0, 0, 0, i < data.languages.length - 1 ? 6 : 0],
      };
    }),

    hRule(110),
    sbTitle(ui.technologies),
    {
      text: data.technologies.join(' · '),
      fontSize: 7, color: C.muted, lineHeight: 1.7,
    }
  );

  return items;
}

function tlItem(role, company, date, desc, tags) {
  return {
    margin: [0, 0, 0, 10],
    stack: [
      {
        columns: [
          {
            stack: [
              { text: role,    fontSize: 8.5, bold: true,  color: C.text },
              { text: company, fontSize: 7.5, color: C.accent2, margin: [0, 1, 0, 0] },
            ],
            width: '*',
          },
          {
            table: { body: [[{
              text: date, fontSize: 6.5, color: C.muted,
              fillColor: '#162032',
              border: [false, false, false, false],
              margin: [5, 2, 5, 2],
            }]]},
            layout: 'noBorders',
            width: 'auto',
          },
        ],
        columnGap: 6,
        margin: [0, 0, 0, 4],
      },
      { text: desc, fontSize: 7.5, color: C.muted, lineHeight: 1.5, margin: [0, 0, 0, tags.length ? 5 : 0] },
      tags.length ? {
        columns: tags.map(tg => ({ ...pdfTag(tg), width: 'auto' })),
        columnGap: 3,
      } : { text: '' },
    ],
  };
}

function buildMain(data, lang) {
  const p = data.personal;
  const ui = data.ui[lang];
  const nameParts = p.name.split(' ');

  return [
    // Header
    { text: ui.cvLabel.toUpperCase(), fontSize: 6.5, color: C.accent2, bold: true, characterSpacing: 2, margin: [0, 0, 0, 5] },
    {
      text: [
        { text: nameParts[0] + ' ', color: '#ffffff' },
        { text: nameParts.slice(1).join(' '), color: C.accent2 },
      ],
      font: 'Roboto', bold: true, fontSize: 22,
      margin: [0, 0, 0, 4],
    },
    { text: t(p.headerSub, lang), fontSize: 8, color: C.muted, margin: [0, 0, 0, 8] },
    {
      columns: [
        { text: p.email,           fontSize: 7, color: C.muted, width: 'auto' },
        { text: p.phone,           fontSize: 7, color: C.muted, width: 'auto' },
        { text: p.linkedinLabel,   fontSize: 7, color: C.muted, width: 'auto' },
        { text: p.location,        fontSize: 7, color: C.muted, width: 'auto' },
      ],
      columnGap: 10,
      margin: [0, 0, 0, 14],
    },
    hRule(370),

    // About
    sectionTitle(ui.about),
    {
      text: t(data.about, lang).replace(/<strong>/g, '').replace(/<\/strong>/g, ''),
      fontSize: 8, color: C.muted, lineHeight: 1.6,
      margin: [0, 0, 0, 14],
    },
    hRule(370),

    // Experience
    sectionTitle(ui.experience),
    ...data.jobs.map(job =>
      tlItem(
        t(job.role, lang),
        job.company,
        t(job.date, lang),
        t(job.description, lang),
        job.tags.map(tg => t(tg, lang))
      )
    ),
    hRule(370),

    // Education & Certifications
    sectionTitle(ui.education),
    {
      columns: data.education.map(edu => ({
        width: '50%',
        stack: [
          { text: edu.years, fontSize: 7, color: C.accent2, bold: true, margin: [0, 0, 0, 2] },
          { text: t(edu.title, lang), fontSize: 8, bold: true, color: C.text, margin: [0, 0, 0, 2] },
          { text: edu.institution || t(edu.sub, lang), fontSize: 7, color: C.muted },
        ],
      })),
      columnGap: 12,
      margin: [0, 0, 0, 14],
    },

    { text: ui.certifications.toUpperCase(), fontSize: 7, bold: true, color: C.muted, characterSpacing: 1.2, margin: [0, 0, 0, 8] },
    ...data.certifications.map(c => ({
      columns: [
        { text: c.year, fontSize: 7, color: C.accent2, bold: true, width: 26 },
        {
          stack: [
            { text: c.name,   fontSize: 7.5, color: C.text, bold: !!c.featured },
            { text: c.issuer, fontSize: 7,   color: C.muted, margin: [0, 1, 0, 0] },
          ],
          width: '*',
        },
      ],
      columnGap: 6,
      margin: [0, 0, 0, 7],
    })),

    // Footer
    hRule(370),
    { text: `${p.name}  ·  Madrid, Spain  ·  ${p.email}`, fontSize: 7, color: C.muted, alignment: 'center', margin: [0, 4, 0, 0] },
  ];
}

async function generatePDF() {
  const btn = document.getElementById('btn-download');
  btn.disabled = true;
  btn.querySelector('#btn-download-label').textContent = 'Generating…';

  try {
    const photoDataUrl = await loadPhotoBase64();

    const docDefinition = {
      pageSize:    'A4',
      pageMargins: [0, 0, 0, 0],

      background(currentPage, pageSize) {
        return { canvas: [{ type: 'rect', x: 0, y: 0, w: pageSize.width, h: pageSize.height, color: C.dark }] };
      },

      content: [{
        table: {
          widths: [140, '*'],
          body: [[
            {
              stack: buildSidebar(photoDataUrl, cvData, currentLang),
              fillColor: C.sidebar,
              border: [false, false, false, false],
              margin: [14, 20, 12, 20],
            },
            {
              stack: buildMain(cvData, currentLang),
              fillColor: C.dark,
              border: [false, false, false, false],
              margin: [16, 20, 18, 20],
            },
          ]],
        },
        layout: {
          defaultBorder: false,
          paddingLeft:   () => 0,
          paddingRight:  () => 0,
          paddingTop:    () => 0,
          paddingBottom: () => 0,
        },
      }],

      defaultStyle: {
        font: 'Roboto',
        fontSize: 8,
        color: C.text,
        lineHeight: 1.4,
      },
    };

    const btnSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 17a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm3.293-7.707a1 1 0 0 1 1.414 0L9 10.586V3a1 1 0 1 1 2 0v7.586l1.293-1.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" clip-rule="evenodd"/></svg>';
    pdfMake.createPdf(docDefinition).download('Daniel_Alamo_Casanueva_CV.pdf', () => {
      btn.disabled = false;
      btn.innerHTML = `${btnSVG} <span id="btn-download-label">${cvData.ui[currentLang].downloadBtn}</span>`;
    });

  } catch (err) {
    console.error('PDF generation failed:', err);
    alert('Could not generate PDF: ' + err.message);
    btn.disabled = false;
    btn.querySelector('#btn-download-label').textContent = cvData.ui[currentLang].downloadBtn;
  }
}

// ── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('data.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    cvData = await res.json();
  } catch (err) {
    console.error('Failed to load data.json — serve via a local server (e.g. python -m http.server 8080):', err);
    document.body.innerHTML = '<div style="padding:2rem;font-family:sans-serif;color:#f1f5f9;background:#0f172a;min-height:100vh"><h2 style="color:#38bdf8">⚠ Serve via a local server</h2><p>Open a terminal in this folder and run:<br><code style="background:#1e293b;padding:.3rem .6rem;border-radius:4px">python -m http.server 8080</code><br>Then open <a href="http://localhost:8080" style="color:#38bdf8">http://localhost:8080</a></p></div>';
    return;
  }

  renderPage(cvData, currentLang);
  setTimeout(animateSkillBars, 300);
  initSectionAnimations();
  initCollapsible();
  initLangSwitcher();
  document.getElementById('btn-download').addEventListener('click', generatePDF);
});
