/* ============================================================
   app.js — Saudi Energy OE Digital Twin Command Center V3
   Shared engine: DB helpers, nav, UI components, canvas
   NO initPage / NO initAuth / NO translateDOM
   Each portal handles its own auth (self-contained pattern)
   ============================================================ */

'use strict';

// ── CONFIG ────────────────────────────────────────────────────
const SUPA_URL = 'https://ekywcrlcjgbjtwnjozov.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVreXdjcmxjamdianR3bmpvem92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4OTg5MzcsImV4cCI6MjA5NzQ3NDkzN30.TQxP2SUjaxSjdsBadmgHIBSVQ5B-YOLkvnl1JwyhISI';

// ── GLOBAL STATE ──────────────────────────────────────────────
const App = { user: null, profile: null, lang: 'ar' };

// ── SESSION HELPERS ───────────────────────────────────────────
function getStoredSession() {
  try {
    const raw = localStorage.getItem('se_session');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function clearSession() {
  localStorage.removeItem('se_session');
}

// ── SUPABASE REST HELPERS ─────────────────────────────────────
function _headers(token) {
  const h = {
    'Content-Type': 'application/json',
    'apikey': SUPA_KEY,
    'Authorization': `Bearer ${token || SUPA_KEY}`
  };
  return h;
}

async function dbList(table, params = {}, token) {
  const url = new URL(`${SUPA_URL}/rest/v1/${table}`);
  url.searchParams.set('select', params.select || '*');
  if (params.filter) {
    Object.entries(params.filter).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  if (params.order)  url.searchParams.set('order', params.order);
  if (params.limit)  url.searchParams.set('limit', String(params.limit));
  if (params.offset) url.searchParams.set('offset', String(params.offset));
  const res = await fetch(url.toString(), { headers: _headers(token) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

async function dbGet(table, id, token) {
  const url = `${SUPA_URL}/rest/v1/${table}?id=eq.${id}&limit=1`;
  const res = await fetch(url, { headers: _headers(token) });
  if (!res.ok) throw new Error(await res.text());
  const rows = await res.json();
  return rows[0] || null;
}

async function dbIns(table, data, token) {
  const res = await fetch(`${SUPA_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: { ..._headers(token), 'Prefer': 'return=representation' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
  const rows = await res.json();
  return Array.isArray(rows) ? rows[0] : rows;
}

async function dbUpd(table, id, data, token) {
  const res = await fetch(`${SUPA_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'PATCH',
    headers: { ..._headers(token), 'Prefer': 'return=representation' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
  const rows = await res.json();
  return Array.isArray(rows) ? rows[0] : rows;
}

async function dbDel(table, id, token) {
  const res = await fetch(`${SUPA_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'DELETE',
    headers: _headers(token)
  });
  if (!res.ok) throw new Error(await res.text());
  return true;
}

async function dbCnt(table, params = {}, token) {
  const url = new URL(`${SUPA_URL}/rest/v1/${table}`);
  url.searchParams.set('select', 'id');
  if (params.filter) {
    Object.entries(params.filter).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), {
    headers: { ..._headers(token), 'Prefer': 'count=exact' }
  });
  if (!res.ok) throw new Error(await res.text());
  const count = res.headers.get('content-range');
  if (count) {
    const m = count.match(/\/(\d+)$/);
    if (m) return parseInt(m[1], 10);
  }
  const rows = await res.json();
  return Array.isArray(rows) ? rows.length : 0;
}

// ── PORTAL / ROLE CONFIG ───────────────────────────────────────
const PORTALS = {
  admin:                    'admin.html',
  director:                 'department.html',
  governance_manager:       'governance.html',
  generation_manager:       'generation.html',
  national_grid_manager:    'national-grid.html',
  distribution_manager:     'distribution.html',
  technical_alerts_manager: 'technical-alerts.html',
  employee:                 'employee.html'
};

const ROLE_AR = {
  admin:                    'مدير النظام',
  director:                 'مدير الإدارة',
  governance_manager:       'مدير الحوكمة',
  generation_manager:       'مدير التوليد',
  national_grid_manager:    'مدير الشبكة الوطنية',
  distribution_manager:     'مدير التوزيع',
  technical_alerts_manager: 'مدير التنبيهات الفنية',
  employee:                 'موظف'
};

const ROLE_EN = {
  admin:                    'System Admin',
  director:                 'Director',
  governance_manager:       'Governance Manager',
  generation_manager:       'Generation Manager',
  national_grid_manager:    'National Grid Manager',
  distribution_manager:     'Distribution Manager',
  technical_alerts_manager: 'Technical Alerts Manager',
  employee:                 'Employee'
};

const DIVS = {
  governance:       { color: '#7C3AED', icon: '⚖️',  ar: 'الحوكمة',         en: 'Governance' },
  generation:       { color: '#F59E0B', icon: '⚡',  ar: 'التوليد',          en: 'Generation' },
  national_grid:    { color: '#0EA5E9', icon: '🔌',  ar: 'الشبكة الوطنية',  en: 'National Grid' },
  distribution:     { color: '#10B981', icon: '🏙️', ar: 'التوزيع',          en: 'Distribution' },
  technical_alerts: { color: '#EF4444', icon: '🚨',  ar: 'التنبيهات الفنية', en: 'Technical Alerts' }
};

const LOGO = `<span class="logo-mark">SE</span>`;

// ── CLOCK ─────────────────────────────────────────────────────
function startClock(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  function tick() {
    const now = new Date();
    el.textContent = now.toLocaleTimeString('ar-SA', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
  }
  tick();
  setInterval(tick, 1000);
}

// ── SIDEBAR TOGGLE (mobile) ───────────────────────────────────
// Called via onclick="toggleSidebar()" in each portal's HTML
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  if (!sb) return;
  sb.classList.toggle('open');
}

// ── NAV BUILDER ───────────────────────────────────────────────
function buildNav(items, active) {
  const el = document.getElementById('navEl');
  if (!el) return;
  el.innerHTML = items.map(item => `
    <a class="nav-item${item.key === active ? ' active' : ''}"
       onclick="go('${item.key}')" href="#">
      <span class="nav-icon">${item.icon}</span>
      <span class="nav-label">${item.label}</span>
    </a>
  `).join('');
}

// ── PAGE ROUTER ───────────────────────────────────────────────
// Each portal defines its own PAGES object and calls reg/go locally.
// These are the global versions used when portals rely on app.js routing.
const _PAGES = {};
function reg(k, fn) { _PAGES[k] = fn; }
function go(k) {
  const el = document.getElementById('pgContent');
  if (!el) return;
  if (!_PAGES[k]) { el.innerHTML = `<p style="color:#888">صفحة غير موجودة: ${esc(k)}</p>`; return; }
  el.innerHTML = skR(3);
  buildNav(window._NAV || [], k);
  const title = document.getElementById('pgtitle');
  if (title && window._NAV) {
    const found = (window._NAV).find(i => i.key === k);
    if (found) title.textContent = found.label;
  }
  _PAGES[k](el);
}

// ── UI HELPERS ────────────────────────────────────────────────
function t2(ar, en) {
  return App.lang === 'en' ? en : ar;
}

function esc(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function skR(n = 3) {
  return Array.from({ length: n }, () =>
    `<div class="skel" style="height:60px;margin-bottom:12px;border-radius:8px;
      background:linear-gradient(90deg,#1a1a2e 25%,#16213e 50%,#1a1a2e 75%);
      background-size:200% 100%;animation:shimmer 1.4s infinite;"></div>`
  ).join('') + `<style>@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}</style>`;
}

function emptyEl(msg) {
  return `<div class="empty-state" style="text-align:center;padding:60px 20px;opacity:.5;">
    <div style="font-size:2.5rem;margin-bottom:12px;">📭</div>
    <div style="font-size:.95rem;">${esc(msg)}</div>
  </div>`;
}

function toast(msg, type = 'info') {
  const colors = { info: '#0EA5E9', success: '#10B981', error: '#EF4444', warn: '#F59E0B' };
  const t = document.createElement('div');
  t.style.cssText = `
    position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
    background:${colors[type] || colors.info};color:#fff;
    padding:10px 22px;border-radius:8px;font-size:.9rem;
    z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.4);
    animation:fadeInUp .25s ease;
  `;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ── MODAL ─────────────────────────────────────────────────────
function openModal(html, opts = {}) {
  closeModal();
  const overlay = document.createElement('div');
  overlay.id = 'modalOverlay';
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:8000;
    display:flex;align-items:center;justify-content:center;padding:20px;
  `;
  overlay.innerHTML = `
    <div class="modal-box" style="
      background:#0d1117;border:1px solid #30363d;border-radius:12px;
      width:100%;max-width:${opts.width || '560px'};max-height:90vh;
      overflow-y:auto;padding:28px;position:relative;
    ">
      ${opts.title ? `<h2 style="margin:0 0 20px;font-size:1.1rem;color:#e6edf3;">${esc(opts.title)}</h2>` : ''}
      <button onclick="closeModal()" style="
        position:absolute;top:16px;right:16px;background:none;border:none;
        color:#8b949e;font-size:1.3rem;cursor:pointer;line-height:1;
      ">✕</button>
      ${html}
    </div>
  `;
  if (opts.closeOnBackdrop !== false) {
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  }
  document.body.appendChild(overlay);
}

function closeModal() {
  const el = document.getElementById('modalOverlay');
  if (el) el.remove();
}

// ── BADGE / STATUS COMPONENTS ─────────────────────────────────
function priBadge(p) {
  const map = {
    critical: ['#EF4444', 'حرجة'],
    high:     ['#F59E0B', 'عالية'],
    medium:   ['#0EA5E9', 'متوسطة'],
    low:      ['#10B981', 'منخفضة']
  };
  const [color, label] = map[p] || ['#8b949e', p];
  return `<span style="background:${color}22;color:${color};padding:2px 10px;border-radius:20px;font-size:.8rem;">${label}</span>`;
}

function stBadge(s) {
  const map = {
    open:        ['#F59E0B', 'مفتوحة'],
    in_progress: ['#0EA5E9', 'جارية'],
    closed:      ['#10B981', 'مغلقة'],
    resolved:    ['#10B981', 'محلولة'],
    pending:     ['#8b949e', 'معلقة'],
    active:      ['#10B981', 'نشط'],
    inactive:    ['#EF4444', 'غير نشط'],
    completed:   ['#10B981', 'مكتملة'],
    cancelled:   ['#EF4444', 'ملغاة'],
    on_track:    ['#10B981', 'على المسار'],
    at_risk:     ['#F59E0B', 'في خطر'],
    behind:      ['#EF4444', 'متأخرة']
  };
  const [color, label] = map[s] || ['#8b949e', s];
  return `<span style="background:${color}22;color:${color};padding:2px 10px;border-radius:20px;font-size:.8rem;">${label}</span>`;
}

function progBar(pct, color = '#0EA5E9') {
  const p = Math.min(100, Math.max(0, Number(pct) || 0));
  return `
    <div style="background:#21262d;border-radius:4px;height:6px;overflow:hidden;">
      <div style="width:${p}%;height:100%;background:${color};border-radius:4px;
        transition:width .4s ease;"></div>
    </div>
    <div style="font-size:.75rem;color:#8b949e;margin-top:3px;">${p}%</div>
  `;
}

// ── ANIMATED CANVAS ───────────────────────────────────────────
function initCanvas(id, type, color) {
  const canvas = document.getElementById(id);
  if (!canvas || typeof canvas.getContext !== 'function') return;
  const ctx = canvas.getContext('2d');
  let W, H, frame, nodes = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth  || window.innerWidth;
    H = canvas.height = canvas.offsetHeight || window.innerHeight;
  }

  function hexToRgb(hex) {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '255,255,255';
  }

  const rgb = hexToRgb(color || '#0EA5E9');

  // ── NET (neural network nodes) ──
  function initNet() {
    nodes = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4,
      r: Math.random() * 2 + 1
    }));
  }

  function drawNet() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(${rgb},${(1 - dist / 120) * .25})`;
          ctx.lineWidth = .6;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = `rgba(${rgb},.6)`;
      ctx.beginPath();
      ctx.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, Math.PI * 2);
      ctx.fill();
    }
    frame = requestAnimationFrame(drawNet);
  }

  // ── ENERGY (sine wave pulses) ──
  let tick = 0;
  function drawEnergy() {
    ctx.clearRect(0, 0, W, H);
    tick += .02;
    for (let w = 0; w < 3; w++) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${rgb},${.15 - w * .04})`;
      ctx.lineWidth = 1.5 - w * .4;
      for (let x = 0; x <= W; x += 2) {
        const y = H / 2 + Math.sin(x / 80 + tick + w * 1.2) * (40 + w * 20)
                        + Math.sin(x / 40 + tick * 1.5) * 15;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    frame = requestAnimationFrame(drawEnergy);
  }

  // ── GRID (power grid lines) ──
  let gridTick = 0;
  function drawGrid() {
    ctx.clearRect(0, 0, W, H);
    gridTick += .008;
    const step = 60;
    for (let x = 0; x < W; x += step) {
      const alpha = (.05 + .03 * Math.sin(gridTick + x * .01));
      ctx.strokeStyle = `rgba(${rgb},${alpha})`;
      ctx.lineWidth = .5;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += step) {
      const alpha = (.05 + .03 * Math.sin(gridTick + y * .01));
      ctx.strokeStyle = `rgba(${rgb},${alpha})`;
      ctx.lineWidth = .5;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    // pulse nodes at intersections
    for (let x = 0; x < W; x += step) {
      for (let y = 0; y < H; y += step) {
        const a = .3 * Math.abs(Math.sin(gridTick * 2 + (x + y) * .02));
        ctx.fillStyle = `rgba(${rgb},${a})`;
        ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fill();
      }
    }
    frame = requestAnimationFrame(drawGrid);
  }

  // ── CITY (distribution grid) ──
  let cityTick = 0;
  const cityLines = [];
  function initCity() {
    for (let i = 0; i < 20; i++) {
      cityLines.push({
        x1: Math.random() * W, y1: Math.random() * H,
        x2: Math.random() * W, y2: Math.random() * H,
        phase: Math.random() * Math.PI * 2, speed: .01 + Math.random() * .02
      });
    }
  }
  function drawCity() {
    ctx.clearRect(0, 0, W, H);
    cityTick += .01;
    cityLines.forEach(l => {
      l.phase += l.speed;
      const a = .05 + .08 * Math.abs(Math.sin(l.phase));
      ctx.strokeStyle = `rgba(${rgb},${a})`;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(l.x1, l.y1); ctx.lineTo(l.x2, l.y2); ctx.stroke();
    });
    frame = requestAnimationFrame(drawCity);
  }

  // ── RADAR (rotating sweep) ──
  let angle = 0;
  function drawRadar() {
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2, maxR = Math.min(W, H) * .45;
    // rings
    for (let i = 1; i <= 4; i++) {
      ctx.strokeStyle = `rgba(${rgb},.12)`;
      ctx.lineWidth = .8;
      ctx.beginPath(); ctx.arc(cx, cy, maxR * i / 4, 0, Math.PI * 2); ctx.stroke();
    }
    // cross hairs
    ctx.strokeStyle = `rgba(${rgb},.1)`;
    ctx.lineWidth = .6;
    ctx.beginPath(); ctx.moveTo(cx - maxR, cy); ctx.lineTo(cx + maxR, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy - maxR); ctx.lineTo(cx, cy + maxR); ctx.stroke();
    // sweep
    angle += .015;
    const grad = ctx.createConicalGradient
      ? null  // fallback below
      : null;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    const sweep = ctx.createLinearGradient(0, 0, maxR, 0);
    sweep.addColorStop(0, `rgba(${rgb},.0)`);
    sweep.addColorStop(1, `rgba(${rgb},.35)`);
    ctx.fillStyle = sweep;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, maxR, -0.4, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    frame = requestAnimationFrame(drawRadar);
  }

  resize();
  window.addEventListener('resize', () => {
    cancelAnimationFrame(frame);
    resize();
    nodes = []; cityLines.length = 0;
    start();
  });

  function start() {
    if (type === 'net')    { initNet();  drawNet();    }
    else if (type === 'energy')         { drawEnergy(); }
    else if (type === 'grid')           { drawGrid();   }
    else if (type === 'city') { initCity(); drawCity(); }
    else if (type === 'radar')          { drawRadar(); }
    else                     { initNet();  drawNet();    }
  }

  start();
}

// ── SELF-CONTAINED AUTH TEMPLATE ─────────────────────────────
// Each portal calls this pattern in its own (async()=>{})() block.
// Exposed here as a ready-to-use helper.
async function portalAuth(allowedRoles) {
  const sess = getStoredSession();
  if (!sess || !sess.access_token) {
    location.href = 'index.html';
    return null;
  }
  try {
    const res = await fetch(
      `${SUPA_URL}/rest/v1/profiles?id=eq.${sess.user.id}&limit=1`,
      { headers: _headers(sess.access_token) }
    );
    if (!res.ok) throw new Error('profile fetch failed');
    const rows = await res.json();
    const profile = rows[0];
    if (!profile || !allowedRoles.includes(profile.role)) {
      const dest = PORTALS[profile?.role];
      location.href = dest || 'index.html';
      return null;
    }
    App.user    = sess.user;
    App.profile = profile;
    return profile;
  } catch {
    clearSession();
    location.href = 'index.html';
    return null;
  }
}

// ── LOGOUT ────────────────────────────────────────────────────
function logout() {
  const sess = getStoredSession();
  if (sess?.access_token) {
    fetch(`${SUPA_URL}/auth/v1/logout`, {
      method: 'POST',
      headers: _headers(sess.access_token)
    }).catch(() => {});
  }
  clearSession();
  location.href = 'index.html';
}

// ── EXPORTS ───────────────────────────────────────────────────
Object.assign(window, {
  // State
  App,
  SUPA_URL,
  SUPA_KEY,

  // Session
  getStoredSession,
  clearSession,
  portalAuth,
  logout,

  // DB
  dbList, dbGet, dbIns, dbUpd, dbDel, dbCnt,

  // Config
  PORTALS, ROLE_AR, ROLE_EN, DIVS, LOGO,

  // UI
  startClock,
  toggleSidebar,
  buildNav,
  reg, go,
  t2, esc,
  skR, emptyEl,
  toast,
  openModal, closeModal,
  priBadge, stBadge, progBar,
  initCanvas
});
