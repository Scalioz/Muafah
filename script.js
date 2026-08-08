// ── NAV ──────────────────────────────────────────────
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── REVEAL ON SCROLL ─────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 70);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── PORTFOLIO FILTER (portfolio page only) ───────────
document.querySelectorAll('.filter-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.case-card').forEach(item => {
      const show = filter === 'all' || item.dataset.cat === filter;
      item.classList.toggle('show', show);
    });
  });
});

// ── CASE STUDY MODAL ──────────────────────────────────
function openCaseModal(card) {
  const modal = document.getElementById('case-modal');
  const content = document.getElementById('case-modal-content');
  const badge = card.dataset.badge;
  const title = card.dataset.title;
  const type = card.dataset.type;
  const area = card.dataset.area;
  const duration = card.dataset.duration;
  const hero = card.dataset.hero;
  const overview = card.dataset.overview;
  const features = card.dataset.features;
  const requirements = card.dataset.requirements;

  content.innerHTML = `
    <div class="cm-hero"><img src="${hero}" alt="${title} - Mu'afah Architects Chennai"></div>
    <div class="cm-body">
      <div class="cm-eyebrow">${badge}</div>
      <h2 class="cm-title">${title}</h2>
      <div class="cm-meta">
        <div class="cm-meta-item"><strong>${type}</strong>Project Type</div>
        <div class="cm-meta-item"><strong>${area}</strong>Area</div>
        <div class="cm-meta-item"><strong>${duration}</strong>Design Timeline</div>
      </div>
      <div class="cm-section-label">Project Overview</div>
      <p class="cm-overview">${overview}</p>
      <div class="cm-section-label">Special Features</div>
      <p class="cm-overview">${features}</p>
      <div class="cm-section-label">Client Requirements Addressed</div>
      <p class="cm-overview">${requirements}</p>
    </div>
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCaseModal() {
  const modal = document.getElementById('case-modal');
  if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
}
document.querySelectorAll('.case-card').forEach(card => {
  card.addEventListener('click', () => openCaseModal(card));
});
const modalCloseBtn = document.getElementById('case-modal-close');
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCaseModal);
const modalEl = document.getElementById('case-modal');
if (modalEl) modalEl.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeCaseModal(); });

// ── CONTACT FORM ─────────────────────────────────────
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('cf-name').value.trim();
  const phone = document.getElementById('cf-phone').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const service = document.getElementById('cf-service').value;
  const brief = document.getElementById('cf-brief').value.trim();

  if (!name || !phone) {
    alert('Please enter at least your name and phone number.');
    return;
  }

  const lines = [
    `Hello Mu'afah Architects, I'd like to enquire about a project.`,
    ``,
    `Name: ${name}`,
    `Phone: ${phone}`,
    email ? `Email: ${email}` : null,
    service ? `Service Required: ${service}` : null,
    brief ? `Project Brief: ${brief}` : null,
  ].filter(Boolean).join('\n');

  const muafahWhatsAppNumber = '919043002745';
  const waUrl = `https://wa.me/${muafahWhatsAppNumber}?text=${encodeURIComponent(lines)}`;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'whatsapp_enquiry_submit', enquiry_service: service || 'not specified' });

  window.open(waUrl, '_blank');
}
