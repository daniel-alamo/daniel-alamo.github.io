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

// ── PDF generation ────────────────────────────────────────────────────────
async function generatePDF() {
  const btn = document.getElementById('btn-download');
  btn.disabled = true;

  try {
    const { jsPDF } = window.jspdf;

    const A4_W_MM  = 210;
    const A4_H_MM  = 297;
    const SCALE    = 2;
    const MARGIN   = 0; // full bleed

    const body    = document.getElementById('cv-root');
    const sidebar = document.querySelector('.sidebar');
    const main    = document.querySelector('.main');

    // Force all sections visible
    document.querySelectorAll('.section').forEach(s => s.classList.add('visible'));

    // Unlock sidebar so full height renders
    const prev = {
      sidebarH:   sidebar.style.height,
      sidebarOv:  sidebar.style.overflow,
      sidebarPos: sidebar.style.position,
      mainOv:     main.style.overflow,
      bodyOv:     body.style.overflow,
    };

    const fullH = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

    sidebar.style.height   = fullH + 'px';
    sidebar.style.overflow = 'visible';
    sidebar.style.position = 'relative';
    main.style.overflow    = 'visible';
    body.style.overflow    = 'visible';
    btn.style.visibility   = 'hidden'; // hide button in capture

    // Render full page to canvas
    const canvas = await html2canvas(body, {
      scale:         SCALE,
      useCORS:       true,
      allowTaint:    true,
      backgroundColor: '#0f172a',
      scrollX:       0,
      scrollY:       -window.scrollY,
      windowWidth:   body.scrollWidth,
      windowHeight:  fullH,
      width:         body.scrollWidth,
      height:        fullH,
      logging:       false,
    });

    // Restore styles
    sidebar.style.height   = prev.sidebarH;
    sidebar.style.overflow = prev.sidebarOv;
    sidebar.style.position = prev.sidebarPos;
    main.style.overflow    = prev.mainOv;
    body.style.overflow    = prev.bodyOv;
    btn.style.visibility   = '';

    // --- Smart page-break calculation ------------------------------------
    // We work in "source pixels" (before SCALE) for breakpoint detection,
    // then multiply by SCALE when slicing the canvas.

    const canvasW  = canvas.width;           // already SCALE×
    const srcW     = canvasW / SCALE;        // logical px width of the page
    const pxPerMm  = canvasW / A4_W_MM;     // canvas px per mm (width axis)
    const pgHeightPx = A4_H_MM * pxPerMm;   // canvas px per A4 page

    // Collect the bottom-edges of every "break-safe" block in logical px.
    // We prefer to cut just below section/card boundaries.
    const breakableSelectors = [
      '.tl-item', '.cert-item', '.edu-card',
      '.section', '.main-header', '.main-footer',
      '.sb-section', '.divider',
    ];
    const bodyRect = body.getBoundingClientRect();
    const scrollTop = window.scrollY;

    const safeBreaks = new Set();
    breakableSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        const r = el.getBoundingClientRect();
        // bottom of this element in document coordinates (logical px)
        const bottomDoc = r.bottom + scrollTop - bodyRect.top - scrollTop;
        safeBreaks.add(Math.round(bottomDoc));
      });
    });

    const sortedBreaks = Array.from(safeBreaks).sort((a, b) => a - b);

    // Convert logical px → canvas px
    const logicalToCanvas = (logPx) => logPx * SCALE;
    const totalCanvasH = canvas.height;

    // Build page slices: each slice is [canvasYStart, canvasYEnd]
    const slices = [];
    let cursor = 0; // in canvas px

    while (cursor < totalCanvasH) {
      const idealEnd = cursor + pgHeightPx;

      if (idealEnd >= totalCanvasH) {
        // Last page — take whatever remains
        slices.push([cursor, totalCanvasH]);
        break;
      }

      // Find the nearest safe break that is BEFORE idealEnd
      // Convert idealEnd back to logical px to compare with safeBreaks
      const idealEndLogical = idealEnd / SCALE;

      // Walk backwards from idealEnd to find a safe break point
      let bestBreak = -1;
      for (let i = sortedBreaks.length - 1; i >= 0; i--) {
        if (sortedBreaks[i] <= idealEndLogical) {
          bestBreak = sortedBreaks[i];
          break;
        }
      }

      let sliceEnd;
      if (bestBreak > 0 && logicalToCanvas(bestBreak) > cursor + pgHeightPx * 0.5) {
        // Good safe break found within the lower half of the page
        sliceEnd = logicalToCanvas(bestBreak);
      } else {
        // No good break — cut at the exact A4 boundary
        sliceEnd = idealEnd;
      }

      slices.push([cursor, Math.min(sliceEnd, totalCanvasH)]);
      cursor = sliceEnd;
    }

    // --- Build PDF from slices -------------------------------------------
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    slices.forEach(([ y0, y1 ], i) => {
      if (i > 0) pdf.addPage();

      const stripH = y1 - y0;
      const strip = document.createElement('canvas');
      strip.width  = canvasW;
      strip.height = Math.ceil(stripH);
      strip.getContext('2d').drawImage(
        canvas,
        0, y0, canvasW, Math.ceil(stripH),
        0, 0,  canvasW, Math.ceil(stripH)
      );

      const imgData      = strip.toDataURL('image/jpeg', 0.95);
      const stripHeightMm = (stripH / pxPerMm);
      pdf.addImage(imgData, 'JPEG', MARGIN, MARGIN, A4_W_MM - MARGIN * 2, stripHeightMm, '', 'FAST');
    });

    pdf.save('Daniel_Alamo_Casanueva_CV.pdf');

  } catch (err) {
    console.error('PDF generation failed:', err);
    alert('Could not generate PDF. Please try again.');
  } finally {
    document.getElementById('btn-download').disabled = false;
  }
}

// ── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(animateSkillBars, 300);
  initSectionAnimations();
  document.getElementById('btn-download').addEventListener('click', generatePDF);
});
