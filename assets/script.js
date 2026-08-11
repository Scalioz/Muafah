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

// ── TEAM PROFILE MODAL ────────────────────────────────
function openTeamModal(card) {
  const modal = document.getElementById('team-modal');
  const content = document.getElementById('team-modal-content');
  if (!modal || !content) return;

  const name = card.dataset.name || '';
  const title = card.dataset.title || '';
  const exp = card.dataset.exp || '';
  const photo = card.dataset.photo || '';
  const bio = card.dataset.bio || '';
  const tags = (card.dataset.tags || '').split('|').filter(Boolean);
  const expNumber = exp.split(' ')[0] || '';

  const photoHtml = photo
    ? `<img src="${photo}" alt="${name} - ${title}, Mu'afah Architects Chennai">`
    : `<div class="team-modal-placeholder"><span>${name.toUpperCase()}</span></div>`;

  content.innerHTML = `
    <div class="tm-body">
      <div class="tm-photo">${photoHtml}</div>
      <div class="tm-info">
        <h2 class="tm-name">${name}</h2>
        <p class="tm-title">${title}</p>
        <div class="tm-exp"><strong>${expNumber}</strong> Years of Experience</div>
        <p class="tm-bio">${bio}</p>
        <div class="tm-tags">${tags.map(t => `<span class="team-tag">${t}</span>`).join('')}</div>
      </div>
    </div>
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeTeamModal() {
  const modal = document.getElementById('team-modal');
  if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
}
document.querySelectorAll('.team-card').forEach(card => {
  const btn = card.querySelector('.team-more-btn');
  if (btn) btn.addEventListener('click', () => openTeamModal(card));
});
const teamModalCloseBtn = document.getElementById('team-modal-close');
if (teamModalCloseBtn) teamModalCloseBtn.addEventListener('click', closeTeamModal);
const teamModalEl = document.getElementById('team-modal');
if (teamModalEl) teamModalEl.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeTeamModal(); });

// ── BLOG ARTICLE MODAL ────────────────────────────────
function openBlogModal(article) {
  const modal = document.getElementById('blog-modal');
  const content = document.getElementById('blog-modal-content');
  if (!modal || !content) return;

  const template = article.querySelector('.blog-full-content');
  if (!template) return;

  const cat = template.dataset.cat || '';
  const title = template.dataset.title || '';
  const img = template.dataset.img || '';
  const alt = template.dataset.alt || '';
  const bodyHtml = template.innerHTML;

  content.innerHTML = `
    <div class="bm-hero"><img src="${img}" alt="${alt}"></div>
    <div class="bm-body">
      <div class="cm-eyebrow">${cat}</div>
      <h2 class="cm-title">${title}</h2>
      ${bodyHtml}
    </div>
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeBlogModal() {
  const modal = document.getElementById('blog-modal');
  if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
}
document.querySelectorAll('.blog-card').forEach(article => {
  const btn = article.querySelector('.blog-read-more');
  if (btn) btn.addEventListener('click', () => openBlogModal(article));
});
const blogModalCloseBtn = document.getElementById('blog-modal-close');
if (blogModalCloseBtn) blogModalCloseBtn.addEventListener('click', closeBlogModal);
const blogModalEl = document.getElementById('blog-modal');
if (blogModalEl) blogModalEl.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeBlogModal(); });

/* ═══ MU'AFAH AI CHAT ASSISTANT — appears on every page ═══ */
(function setupChatWidget() {
  const MUAFAH_BACKEND_URL = 'https://muafah-ai-backend.scalioz.workers.dev/';

  // Inject styles
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    #mf-chat-bubble {
      position: fixed; bottom: 96px; right: 28px; z-index: 1600;
      width: 56px; height: 56px; border-radius: 50%; background: var(--gold, #C9A84C);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 8px 24px rgba(0,0,0,.4); transition: transform .2s; border: none; cursor: pointer;
    }
    #mf-chat-bubble:hover { transform: scale(1.08); }
    #mf-chat-bubble svg { width: 26px; height: 26px; }
    #mf-chat-panel {
      position: fixed; bottom: 164px; right: 20px; z-index: 1600;
      width: 340px; max-width: calc(100vw - 40px);
      height: 460px; max-height: calc(100vh - 200px);
      background: #161616; border: 1px solid #2A2A2A; border-radius: 8px;
      display: none; flex-direction: column; overflow: hidden;
      box-shadow: 0 24px 60px rgba(0,0,0,.55);
      font-family: 'Inter', system-ui, sans-serif;
      box-sizing: border-box;
    }
    #mf-chat-panel.open { display: flex; }
    #mf-chat-header {
      background: #1E1E1E; border-bottom: 1px solid #2A2A2A; padding: 14px 16px;
      display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
    }
    #mf-chat-header-title { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 500; letter-spacing: .04em; color: #F5F0E8; }
    #mf-chat-header-title .dot { width: 7px; height: 7px; border-radius: 50%; background: #C9A84C; }
    #mf-chat-close { background: none; border: none; color: #888880; font-size: 16px; cursor: pointer; line-height: 1; padding: 4px; }
    #mf-chat-close:hover { color: #F5F0E8; }
    #mf-chat-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
    #mf-chat-messages::-webkit-scrollbar { width: 3px; }
    #mf-chat-messages::-webkit-scrollbar-thumb { background: #2A2A2A; }
    .mf-msg { display: flex; gap: 8px; max-width: 88%; }
    .mf-msg.user { align-self: flex-end; flex-direction: row-reverse; }
    .mf-msg-bubble { padding: 9px 12px; border-radius: 4px; font-size: 12.5px; line-height: 1.55; }
    .mf-msg.ai .mf-msg-bubble { background: #1E1E1E; color: #F5F0E8; }
    .mf-msg.user .mf-msg-bubble { background: #C9A84C; color: #0A0A0A; }
    .mf-typing { display: flex; gap: 4px; padding: 9px 12px; background: #1E1E1E; border-radius: 4px; width: fit-content; }
    .mf-typing span { width: 5px; height: 5px; border-radius: 50%; background: #C9A84C; animation: mfBounce 1.2s infinite; }
    .mf-typing span:nth-child(2) { animation-delay: .2s; }
    .mf-typing span:nth-child(3) { animation-delay: .4s; }
    @keyframes mfBounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
    #mf-chat-input-area { border-top: 1px solid #2A2A2A; padding: 10px; display: flex; gap: 8px; flex-shrink: 0; }
    #mf-chat-input {
      flex: 1; background: #0A0A0A; border: 1px solid #2A2A2A; color: #F5F0E8; font-family: inherit;
      font-size: 12.5px; padding: 9px 12px; border-radius: 4px; resize: none; max-height: 80px;
    }
    #mf-chat-input:focus { outline: none; border-color: #9A7A32; }
    #mf-chat-send { background: #C9A84C; color: #0A0A0A; border: none; border-radius: 4px; width: 36px; flex-shrink: 0; cursor: pointer; font-size: 14px; }
    #mf-chat-send:hover { background: #E8D5A0; }
    @media(max-width: 768px) {
      #mf-chat-bubble { bottom: 88px; right: 20px; width: 50px; height: 50px; }
      #mf-chat-panel { left: 12px; right: 12px; width: auto; max-width: none; bottom: 148px; }
    }
    @media(max-width: 480px) {
      #mf-chat-panel { max-height: calc(100vh - 180px); }
    }
  `;
  document.head.appendChild(styleTag);

  // Inject bubble button
  const bubble = document.createElement('button');
  bubble.id = 'mf-chat-bubble';
  bubble.setAttribute('aria-label', "Chat with Mu'afah Assistant");
  bubble.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" stroke-width="1.8"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';
  document.body.appendChild(bubble);

  // Inject panel
  const panel = document.createElement('div');
  panel.id = 'mf-chat-panel';
  panel.innerHTML = `
    <div id="mf-chat-header">
      <div id="mf-chat-header-title"><span class="dot"></span> Mu'afah Assistant</div>
      <button id="mf-chat-close" aria-label="Close chat">✕</button>
    </div>
    <div id="mf-chat-messages"></div>
    <div id="mf-chat-input-area">
      <textarea id="mf-chat-input" rows="1" placeholder="Type your message..."></textarea>
      <button id="mf-chat-send" aria-label="Send">➤</button>
    </div>
  `;
  document.body.appendChild(panel);

  const messagesEl = document.getElementById('mf-chat-messages');
  const inputEl = document.getElementById('mf-chat-input');
  const sendBtn = document.getElementById('mf-chat-send');
  const closeBtn = document.getElementById('mf-chat-close');

  function addMessage(role, text) {
    const row = document.createElement('div');
    row.className = `mf-msg ${role}`;
    const b = document.createElement('div');
    b.className = 'mf-msg-bubble';
    b.innerHTML = text.replace(/\n/g, '<br>');
    row.appendChild(b);
    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    const row = document.createElement('div');
    row.className = 'mf-msg ai';
    row.id = 'mf-typing-row';
    row.innerHTML = '<div class="mf-typing"><span></span><span></span><span></span></div>';
    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }
  function removeTyping() {
    const t = document.getElementById('mf-typing-row');
    if (t) t.remove();
  }

  async function sendToAI(message) {
    showTyping();
    try {
      const response = await fetch(MUAFAH_BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message, mode: 'consult' })
      });
      const data = await response.json();
      removeTyping();
      if (data.error) {
        addMessage('ai', "I apologise — I'm having trouble responding right now. Please try again shortly, or reach us directly on WhatsApp.");
        return;
      }
      addMessage('ai', data.reply || "I apologise — I encountered an issue. Please try again.");
    } catch (err) {
      removeTyping();
      addMessage('ai', "I'm having trouble connecting right now. Please try again in a moment, or reach us on WhatsApp for immediate help.");
    }
  }

  function handleSend() {
    const text = inputEl.value.trim();
    if (!text) return;
    addMessage('user', text);
    inputEl.value = '';
    inputEl.style.height = 'auto';
    sendToAI(text);
  }

  sendBtn.addEventListener('click', handleSend);
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  });
  inputEl.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 80) + 'px';
  });

  function openPanel() { panel.classList.add('open'); }
  function closePanel() { panel.classList.remove('open'); }

  bubble.addEventListener('click', () => {
    if (panel.classList.contains('open')) { closePanel(); } else { openPanel(); }
  });
  closeBtn.addEventListener('click', closePanel);

  // Auto-open with greeting once the page has fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      openPanel();
      addMessage('ai', "Hi, this is Mu'afah Assistant — how can I help you today?");
    }, 700);
  });
})();

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
