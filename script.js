/* ── WhatsApp Tracking ───────────────────────── */

window.dataLayer = window.dataLayer || [];

document.addEventListener(
  "click",
  (event) => {
    const whatsappLink = event.target.closest?.('a[href*="wa.me/5551999436135"]');
    if (!whatsappLink) return;

    window.dataLayer.push({
      event: "whatsapp_click",
      whatsapp_button_text:
        whatsappLink.getAttribute("aria-label") ||
        whatsappLink.textContent.trim().replace(/\s+/g, " "),
      whatsapp_button_classes: whatsappLink.className,
      whatsapp_url: whatsappLink.href,
    });
  },
  true
);

/* ── Scroll Reveal ────────────────────────────── */

const revealTargets = document.querySelectorAll(
  ".section-label, .section h2, .diff-card, .mat-card, .test-card, .step, .cta-desc, .cta-main--large, .cta-inline, .g-item, .cta-contact"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
);

revealTargets.forEach((el, i) => {
  el.classList.add("reveal");
  const parent = el.closest(".materials, .how-steps, .gallery, .cta-final, .diff-grid, .testimonials-grid");
  if (parent) {
    const siblings = parent.querySelectorAll(".reveal");
    const idx = Array.from(siblings).indexOf(el);
    el.style.transitionDelay = `${idx * 0.06}s`;
  }
  observer.observe(el);
});

/* ── Gallery Filter ──────────────────────────── */

const filters = document.querySelectorAll(".filter");
const items = document.querySelectorAll(".g-item");

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    const cat = btn.dataset.filter;
    filters.forEach((f) => f.classList.remove("active"));
    btn.classList.add("active");
    items.forEach((item) => {
      item.classList.toggle("is-hidden", cat !== "all" && item.dataset.category !== cat);
    });
  });
});

/* ── Lightbox ────────────────────────────────── */

const lightbox = document.getElementById("lightbox");
const lbImg = lightbox?.querySelector("img");
const lbClose = document.querySelector(".lightbox-close");

items.forEach((item) => {
  item.addEventListener("click", () => {
    if (!lightbox || !lbImg) return;
    lbImg.src = item.dataset.src;
    lbImg.alt = item.querySelector("img")?.alt || "";
    lightbox.showModal();
    document.body.classList.add("lightbox-open");
  });
});

function close() {
  lightbox?.close();
  document.body.classList.remove("lightbox-open");
}

lbClose?.addEventListener("click", close);
lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
