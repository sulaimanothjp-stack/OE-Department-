'use strict';
/* ═══════════════════════════════════════════════════════════════
   Saudi Energy · OE Command Center · app.js (unified, v6 — custom auth)
   Single canonical engine for ALL portals. No app2.js needed anymore.
   Auth: custom username/password via Postgres RPC functions.
   No Supabase Auth, no fake @se.local emails, no JWT.
═══════════════════════════════════════════════════════════════ */

const SB_URL = 'https://ekywcrlcjgbjtwnjozov.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVreXdjcmxjamdianR3bmpvem92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4OTg5MzcsImV4cCI6MjA5NzQ3NDkzN30.TQxP2SUjaxSjdsBadmgHIBSVQ5B-YOLkvnl1JwyhISI';
const SB_SESS_KEY = 'se_session_v1';

/* ── Session helpers (custom — not Supabase Auth) ─────────────── */
// Session shape: { id, username, full_name, full_name_en, role, division, job_title, password }
// We keep `password` in the session so admin actions can re-verify via RPC (app_is_admin checks).
// This is a small internal ops tool; if this ever handles sensitive data, move admin auth to a
// server-side session/token instead of storing password client-side.
function getStoredSession() {
  try { return JSON.parse(localStorage.getItem(SB_SESS_KEY) || 'null'); } catch (e) { return null; }
}
function storeSession(s) { try { localStorage.setItem(SB_SESS_KEY, JSON.stringify(s)); } catch (e) {} }
function clearSession() { try { localStorage.removeItem(SB_SESS_KEY); } catch (e) {} }

/* ── App State ────────────────────────────────────────────────── */
const LANG_VER = '3';
if (localStorage.getItem('se_lang_ver') !== LANG_VER) {
  localStorage.removeItem('se_lang_v2');
  localStorage.setItem('se_lang_ver', LANG_VER);
}
const App = { user: null, profile: null, lang: localStorage.getItem('se_lang_v2') || 'ar' };

/* ── Config (unchanged) ───────────────────────────────────────── */
const DIVS = {
  governance:       { ar:'الحوكمة والتقييم',  en:'Governance',     color:'#7C3AED', icon:'⚖️' },
  generation:       { ar:'التوليد',            en:'Generation',     color:'#F59E0B', icon:'⚡' },
  national_grid:    { ar:'الشبكة الوطنية',     en:'National Grid',  color:'#0EA5E9', icon:'🔌' },
  distribution:     { ar:'التوزيع',            en:'Distribution',   color:'#10B981', icon:'🏘️' },
  technical_alerts: { ar:'التنبيهات الفنية',   en:'Tech Alerts',    color:'#EF4444', icon:'⚠️' },
};
const PORTALS = {
  admin:'admin.html', director:'department.html',
  governance_manager:'governance.html', generation_manager:'generation.html',
  national_grid_manager:'national-grid.html', distribution_manager:'distribution.html',
  technical_alerts_manager:'technical-alerts.html', employee:'employee.html'
};
const ROLE_AR = {
  admin:'مشرف النظام', director:'مدير الإدارة',
  governance_manager:'مدير الحوكمة', generation_manager:'مدير التوليد',
  national_grid_manager:'مدير النقل', distribution_manager:'مدير التوزيع',
  technical_alerts_manager:'مدير التنبيهات', employee:'موظف'
};
const ROLE_EN = {
  admin:'System Admin', director:'Director',
  governance_manager:'Governance Manager', generation_manager:'Generation Manager',
  national_grid_manager:'Grid Manager', distribution_manager:'Distribution Manager',
  technical_alerts_manager:'Alerts Manager', employee:'Employee'
};
const LOCALE_MAP = { ar:'ar-SA', en:'en-GB' };

/* ── i18n Helpers (unchanged) ─────────────────────────────────── */
const t2 = (ar, en) => App.lang === 'ar' ? ar : en;
const tl = (key) => {
  if (typeof TR !== 'undefined' && TR[key] && TR[key][App.lang]) return TR[key][App.lang];
  if (typeof TR !== 'undefined' && TR[key]) return TR[key].en || key;
  return key;
};
function setLang(l) {
  App.lang = l;
  localStorage.setItem('se_lang_v2', l);
  localStorage.setItem('se_lang_ver', LANG_VER);
  document.documentElement.lang = l;
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-ar][data-en]').forEach(el => {
    el.textContent = l === 'ar' ? el.dataset.ar : el.dataset.en;
  });
}
function toggleLang() {
  setLang(App.lang === 'ar' ? 'en' : 'ar');
  if (window._currentNav && window._currentPage) buildNav(window._currentNav, window._currentPage);
  const ptEl = document.getElementById('pgtitle') || document.getElementById('pgTitle');
  if (ptEl && window._currentNav) {
    const item = window._currentNav.find(n => n.k === window._currentPage);
    if (item) ptEl.textContent = App.lang === 'ar' ? item.ar : item.en;
  }
  if (window._currentPage && window.PAGES && window.PAGES[window._currentPage]) {
    const ct = document.getElementById('pgContent');
    if (ct) { ct.innerHTML = '<div class="fade" id="pg"></div>'; window.PAGES[window._currentPage](document.getElementById('pg')); }
  }
}

/* ── RPC helper — calls a Postgres function via PostgREST ───────── */
async function rpc(fn, args = {}) {
  const res = await fetch(`${SB_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { 'apikey': SB_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(args)
  });
  const text = await res.text();
  let data; try { data = JSON.parse(text); } catch (e) { data = text; }
  if (!res.ok) throw new Error((data && data.message) || `HTTP ${res.status}`);
  return data;
}

/* ── AUTH — custom username/password (no Supabase Auth) ─────────── */
async function appLogin(username, password) {
  const rows = await rpc('app_login', { p_username: username, p_password: password });
  const row = Array.isArray(rows) ? rows[0] : rows;
  if (!row || !row.id) throw new Error('اسم المستخدم أو كلمة المرور غير صحيحة');
  const session = { ...row, username: username.toLowerCase().trim(), password };
  storeSession(session);
  return session;
}
function doLogout() { clearSession(); location.href = 'index.html'; }

// Admin-only actions — re-send the logged-in admin's own username/password each time
// (the RPC function verifies server-side that this account really is role='admin').
function _adminCreds() {
  const s = getStoredSession();
  if (!s) throw new Error('غير مسجّل دخول');
  return { p_admin_username: s.username, p_admin_password: s.password };
}
async function appListUsers() {
  return rpc('app_list_users', _adminCreds());
}
async function appCreateUser({ username, password, full_name, role, division, job_title }) {
  return rpc('app_create_user', {
    ..._adminCreds(),
    p_new_username: username, p_new_password: password,
    p_full_name: full_name, p_role: role,
    p_division: division || null, p_job_title: job_title || null
  });
}
async function appResetPassword(targetUserId, newPassword) {
  return rpc('app_reset_password', { ..._adminCreds(), p_target_user_id: targetUserId, p_new_password: newPassword });
}
async function appUpdateUser(targetUserId, fields) {
  return rpc('app_update_user', {
    ..._adminCreds(), p_target_user_id: targetUserId,
    p_full_name: fields.full_name, p_full_name_en: fields.full_name_en || null,
    p_role: fields.role, p_division: fields.division || null,
    p_job_title: fields.job_title || null, p_job_title_en: fields.job_title_en || null
  });
}
async function appToggleActive(targetUserId, active) {
  return rpc('app_toggle_active', { ..._adminCreds(), p_target_user_id: targetUserId, p_active: active });
}
async function appListByDivision(division) {
  return rpc('app_list_by_division', { p_division: division });
}

/* ── PAGE GUARD — replaces old Supabase-Auth IIFE in every portal ──
   Usage at bottom of each portal file:
   requireAuth(['director','admin']).then(profile => { if(profile) initPortal(profile); });
*/
async function requireAuth(allowedRoles) {
  const s = getStoredSession();
  if (!s || !s.id) { location.href = 'index.html'; return null; }
  if (allowedRoles && !allowedRoles.includes(s.role)) {
    location.href = PORTALS[s.role] || 'index.html';
    return null;
  }
  App.user = { id: s.id, username: s.username };
  App.profile = s;
  _renderBadge();
  setLang(App.lang);
  startClock();
  const lg = document.getElementById('lgEl'); if (lg) lg.innerHTML = LOGO;
  return s;
}

function _renderBadge() {
  const el = document.getElementById('ubEl'); if (!el) return;
  const p = App.profile;
  const init = (p.full_name || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const dc = DIVS[p.division]?.color || '#2563EB';
  const roleName = App.lang === 'ar' ? (ROLE_AR[p.role] || p.role) : (ROLE_EN[p.role] || p.role);
  el.innerHTML = `<div class="ub-av" style="background:${dc}22;color:${dc}">${init}</div>
    <div style="flex:1;min-width:0">
      <div class="ub-nm">${esc(p.full_name || '')}</div>
      <div class="ub-rl">${roleName}</div>
    </div>`;
}

function startClock() {
  const ct = document.getElementById('ct'), cd = document.getElementById('cd');
  if (!ct && !cd) return;
  function tick() {
    const n = new Date(), h = n.getHours(), l = App.lang;
    const locale = LOCALE_MAP[l] || 'ar-SA';
    const hh = String(h % 12 || 12).padStart(2, '0'), mm = String(n.getMinutes()).padStart(2, '0'), ss = String(n.getSeconds()).padStart(2, '0');
    const ampm = h < 12 ? (l === 'ar' ? 'ص' : 'AM') : (l === 'ar' ? 'م' : 'PM');
    if (ct) ct.textContent = `${hh}:${mm}:${ss} ${ampm}`;
    if (cd) { try { cd.textContent = n.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); } catch (e) {} }
  }
  tick(); setInterval(tick, 1000);
}

/* ── UI Helpers (unchanged from before) ──────────────────────── */
function toast(msg, type = 'i') {
  let c = document.getElementById('tc');
  if (!c) { c = document.createElement('div'); c.id = 'tc'; document.body.appendChild(c); }
  const el = document.createElement('div'); el.className = `toast ${type}`;
  el.innerHTML = `<span>${{ s: '✓', e: '✕', i: 'ℹ', w: '⚠' }[type] || '•'}</span><span style="flex:1">${msg}</span><button style="opacity:.5;cursor:pointer" onclick="this.parentElement.remove()">×</button>`;
  c.appendChild(el); setTimeout(() => el.remove(), 3500);
}
function openModal(html, cls = '') {
  closeModal();
  const bd = document.createElement('div'); bd.className = 'mbg'; bd.id = 'M';
  bd.innerHTML = `<div class="modal ${cls}">${html}</div>`;
  bd.addEventListener('click', e => { if (e.target === bd) closeModal(); });
  document.body.appendChild(bd);
}
function closeModal() { document.getElementById('M')?.remove(); }
const mv = id => document.getElementById(id)?.value?.trim() || '';
const ms = (id, v) => { const el = document.getElementById(id); if (el) el.value = v ?? ''; };

/* ── Database helpers (still Supabase REST — RLS now open via migration) ─ */
function _hdrs() { return { 'apikey': SB_KEY, 'Content-Type': 'application/json' }; }
async function dbList(tbl, opts = {}) {
  const url = new URL(`${SB_URL}/rest/v1/${tbl}`);
  url.searchParams.set('select', opts.sel || '*');
  if (opts.eq) Object.entries(opts.eq).forEach(([k, v]) => url.searchParams.set(k, `eq.${v}`));
  if (opts.neq) Object.entries(opts.neq).forEach(([k, v]) => url.searchParams.set(k, `neq.${v}`));
  if (opts.in) Object.entries(opts.in).forEach(([k, v]) => url.searchParams.set(k, `in.(${v.join(',')})`));
  if (opts.ilike) url.searchParams.set(opts.ilike[0], `ilike.*${opts.ilike[1]}*`);
  url.searchParams.set('order', `${opts.ord || 'created_at'}.${opts.asc ? 'asc' : 'desc'}`);
  if (opts.lim) url.searchParams.set('limit', opts.lim);
  const res = await fetch(url.toString(), { headers: _hdrs() });
  const data = await res.json().catch(() => []);
  if (!res.ok) throw new Error((data && data.message) || 'query failed');
  return { data: Array.isArray(data) ? data : [] };
}
async function dbGet(tbl, id) {
  const res = await fetch(`${SB_URL}/rest/v1/${tbl}?id=eq.${id}&limit=1`, { headers: _hdrs() });
  const rows = await res.json();
  return Array.isArray(rows) ? rows[0] : null;
}
async function dbIns(tbl, row) {
  const res = await fetch(`${SB_URL}/rest/v1/${tbl}`, { method: 'POST', headers: { ..._hdrs(), 'Prefer': 'return=representation' }, body: JSON.stringify(row) });
  const rows = await res.json();
  if (!res.ok) throw new Error((rows && rows.message) || 'insert failed');
  return Array.isArray(rows) ? rows[0] : rows;
}
async function dbUpd(tbl, id, patch) {
  const res = await fetch(`${SB_URL}/rest/v1/${tbl}?id=eq.${id}`, { method: 'PATCH', headers: { ..._hdrs(), 'Prefer': 'return=representation' }, body: JSON.stringify(patch) });
  const rows = await res.json();
  if (!res.ok) throw new Error((rows && rows.message) || 'update failed');
  return Array.isArray(rows) ? rows[0] : rows;
}
async function dbDel(tbl, id) {
  const res = await fetch(`${SB_URL}/rest/v1/${tbl}?id=eq.${id}`, { method: 'DELETE', headers: _hdrs() });
  if (!res.ok) throw new Error('delete failed');
}
async function dbCnt(tbl, opts = {}) {
  const url = new URL(`${SB_URL}/rest/v1/${tbl}`);
  url.searchParams.set('select', 'id');
  if (opts.eq) Object.entries(opts.eq).forEach(([k, v]) => url.searchParams.set(k, `eq.${v}`));
  if (opts.neq) Object.entries(opts.neq).forEach(([k, v]) => url.searchParams.set(k, `neq.${v}`));
  const res = await fetch(url.toString(), { headers: { ..._hdrs(), 'Prefer': 'count=exact' } });
  const cr = res.headers.get('content-range');
  if (cr) { const m = cr.match(/\/(\d+)$/); if (m) return parseInt(m[1], 10); }
  const rows = await res.json().catch(() => []);
  return Array.isArray(rows) ? rows.length : 0;
}

/* ── Formatters ───────────────────────────────────────────────── */
const fmtD = d => d ? new Date(d).toLocaleDateString(LOCALE_MAP[App.lang] || 'ar-SA', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';
const fmtN = n => n != null ? Number(n).toLocaleString(LOCALE_MAP[App.lang] || 'ar-SA') : '—';
const esc = s => String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const isOD = (d, s) => d && !['closed', 'done', 'resolved'].includes(s) && new Date(d) < new Date();

/* ── Badges ───────────────────────────────────────────────────── */
function priBadge(p) {
  const label = t2({ low: 'منخفضة', medium: 'متوسطة', high: 'عالية', critical: 'حرج' }[p] || p, { low: 'Low', medium: 'Medium', high: 'High', critical: 'Critical' }[p] || p);
  return `<span class="badge ${{ low: 'bg', medium: 'bb', high: 'by', critical: 'br' }[p] || 'bg'}">${label}</span>`;
}
function stBadge(s) {
  const label = t2(
    { open: 'مفتوح', new: 'جديد', in_progress: 'قيد التنفيذ', closed: 'مغلق', resolved: 'محلول', done: 'منجز', overdue: 'متأخر', returned: 'معاد', escalated: 'مصعد', pending_review: 'بانتظار المراجعة', assigned: 'مكلّف', pending_verification: 'بانتظار التحقق', planning: 'تخطيط', evidence_collection: 'جمع أدلة', assessment: 'تقييم', review: 'مراجعة', approval: 'اعتماد', scheduled: 'مجدول', completed: 'منتهى', cancelled: 'ملغي' }[s] || s,
    { open: 'Open', new: 'New', in_progress: 'In Progress', closed: 'Closed', resolved: 'Resolved', done: 'Done', overdue: 'Overdue', returned: 'Returned', escalated: 'Escalated', pending_review: 'Pending Review', assigned: 'Assigned', pending_verification: 'Pending Verification', planning: 'Planning', evidence_collection: 'Evidence Collection', assessment: 'Assessment', review: 'Review', approval: 'Approval', scheduled: 'Scheduled', completed: 'Completed', cancelled: 'Cancelled' }[s] || s
  );
  return `<span class="badge ${{ open: 'bg', new: 'bg', in_progress: 'bb', closed: 'bgn', resolved: 'bgn', done: 'bgn', overdue: 'br', returned: 'br', escalated: 'br', pending_review: 'by' }[s] || 'bg'}">${label}</span>`;
}
function progBar(pct, cl = '') { return `<div class="prog"><div class="pf ${cl || (pct >= 80 ? 'grn' : pct >= 50 ? '' : 'red')}" style="width:${pct}%"></div></div>`; }
const skR = (n = 4) => Array.from({ length: n }, () => '<div class="sk skr"></div>').join('');
const emptyEl = (msg, btn = '') => `<div class="empty"><div class="ei">📭</div><p>${msg || t2('لا بيانات', 'No data')}</p>${btn}</div>`;

/* ── Nav Builder ──────────────────────────────────────────────── */
function buildNav(items, active) {
  window._currentNav = items; window._currentPage = active;
  const el = document.getElementById('navEl'); if (!el) return;
  el.innerHTML = items.map(item => {
    if (item.g) return `<div class="ng">${t2(item.g, item.ge || item.g)}</div>`;
    const label = (item.tlKey && typeof tl === 'function') ? tl(item.tlKey) : t2(item.ar, item.en);
    return `<button class="ni ${item.k === active ? 'on' : ''}" onclick="document.querySelector('.sb')?.classList.remove('show');${item.fn || `go('${item.k}')`}">
      <span class="ic">${item.ic}</span><span>${label}</span>${item.badge ? `<span class="badge">${item.badge}</span>` : ''}
    </button>`;
  }).join('');
}

/* ── Misc ─────────────────────────────────────────────────────── */
function confirm2(msg, fn) {
  openModal(`<div class="mh"><h3>⚠ ${t2('تأكيد', 'Confirm')}</h3><button class="mx" onclick="closeModal()">×</button></div>
    <div class="mbd"><p style="font-size:14px">${msg}</p></div>
    <div class="mf"><button class="btn" onclick="closeModal()">${t2('إلغاء', 'Cancel')}</button>
    <button class="btn d" onclick="closeModal();(${fn.toString()})()">${t2('نعم', 'Yes')}</button></div>`);
}
async function logAct(action, etype, eid, details = {}) {
  try { if (App.profile) await dbIns('activity_log', { user_id: App.profile.id, action, entity_type: etype, entity_id: eid, details }); } catch (e) {}
}
async function loadHealth() {
  const divCodes = Object.keys(DIVS);
  try {
    const results = await Promise.all(divCodes.map(async code => {
      const [openAfis, overdueAfis, openAlerts, activeAssm] = await Promise.all([
        dbCnt('afis', { eq: { business_line: code }, neq: { status: 'closed' } }),
        dbCnt('afis', { eq: { business_line: code, status: 'overdue' } }),
        dbCnt('technical_alerts', { eq: { source_division: code }, neq: { status: 'resolved' } }),
        dbCnt('assessments', { eq: { business_line: code }, neq: { stage: 'closed' } }),
      ]).catch(() => [0, 0, 0, 0]);
      return { code, name_ar: DIVS[code].ar, name_en: DIVS[code].en, open_afis: openAfis, overdue_afis: overdueAfis, open_alerts: openAlerts, active_assessments: activeAssm };
    }));
    return results;
  } catch (e) { return []; }
}

/* ── Canvas (unchanged visuals) ──────────────────────────────────── */
function initCanvas(id, type, color) {
  const cv = document.getElementById(id); if (!cv) return;
  const cx = cv.getContext('2d'); let W, H, nodes = [], pts = [], t = 0;
  function resize() { const r = cv.parentElement.getBoundingClientRect(); W = cv.width = r.width; H = cv.height = r.height; build(); }
  function build() {
    nodes = []; pts = [];
    if (type === 'net') { const n = Math.floor(W * H / 4500); for (let i = 0; i < n; i++) nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 2.5 + 1, p: Math.random() * 6.28, hub: Math.random() > .8 }); }
    if (type === 'grid') { const cols = Math.floor(W / 88) + 1, rows = Math.floor(H / 58) + 1; for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) nodes.push({ x: c * 88 + 44, y: r * 58 + 29, hub: Math.random() > .72 }); }
    if (type === 'city') { for (let i = 0; i < 18; i++) pts.push({ x1: Math.random() * W, y1: Math.random() * H, x2: Math.random() * W, y2: Math.random() * H, ph: Math.random() * Math.PI * 2, sp: .01 + Math.random() * .02 }); }
    if (type === 'radar') nodes = [{ cx: W / 2, cy: H / 2, R: Math.min(W, H) * .44, angle: 0 }];
  }
  const h2 = v => Math.floor(Math.max(0, Math.min(1, v)) * 255).toString(16).padStart(2, '0');
  function draw() {
    t += .008; cx.clearRect(0, 0, W, H);
    if (type === 'net') {
      nodes.forEach(n => { n.x += n.vx; n.y += n.vy; n.p += .018; if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1; });
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) { const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y); if (d > 130) continue; const al = (1 - d / 130) * .22; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.strokeStyle = color + h2(al); cx.lineWidth = .6; cx.stroke(); }
      nodes.forEach(n => { const g = Math.sin(n.p) * .4 + .6; if (n.hub) { cx.beginPath(); cx.arc(n.x, n.y, n.r * 3, 0, 6.28); cx.strokeStyle = color + h2(.15 * g); cx.lineWidth = 1; cx.stroke(); } cx.beginPath(); cx.arc(n.x, n.y, n.r, 0, 6.28); cx.fillStyle = color + h2(n.hub ? .85 : .6 * g); cx.fill(); });
    }
    if (type === 'grid') {
      for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) { const a = nodes[i], b = nodes[j]; if (Math.abs(a.x - b.x) > 90 || Math.abs(a.y - b.y) > 60) continue; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.strokeStyle = color + h2(.18); cx.lineWidth = .6; cx.stroke(); }
      nodes.forEach(n => { const g = Math.sin(t + n.x * .02) * .5 + .5; if (n.hub) { cx.beginPath(); cx.arc(n.x, n.y, 7, 0, 6.28); cx.fillStyle = color + h2(.1 * g); cx.fill(); } cx.beginPath(); cx.arc(n.x, n.y, n.hub ? 3 : 1.5, 0, 6.28); cx.fillStyle = color + (n.hub ? 'cc' : '66'); cx.fill(); });
    }
    if (type === 'city') { pts.forEach(l => { l.ph += l.sp; const a = .04 + .07 * Math.abs(Math.sin(l.ph)); cx.strokeStyle = color + h2(a); cx.lineWidth = .9; cx.beginPath(); cx.moveTo(l.x1, l.y1); cx.lineTo(l.x2, l.y2); cx.stroke(); }); }
    if (type === 'radar') {
      const nd = nodes[0]; nd.angle += .013;
      for (let i = 1; i <= 4; i++) { cx.strokeStyle = color + h2(.1); cx.lineWidth = .7; cx.beginPath(); cx.arc(nd.cx, nd.cy, nd.R * i / 4, 0, 6.28); cx.stroke(); }
      cx.save(); cx.translate(nd.cx, nd.cy); cx.rotate(nd.angle);
      const sw = cx.createLinearGradient(0, 0, nd.R, 0); sw.addColorStop(0, color + '00'); sw.addColorStop(1, color + h2(.32));
      cx.fillStyle = sw; cx.beginPath(); cx.moveTo(0, 0); cx.arc(0, 0, nd.R, -.35, 0); cx.closePath(); cx.fill(); cx.restore();
    }
    requestAnimationFrame(draw);
  }
  resize(); window.addEventListener('resize', resize); draw();
}

/* ── Mobile Sidebar ───────────────────────────────────────────── */
function openSidebar() { document.querySelector('.sb')?.classList.add('show'); document.getElementById('sbOverlay')?.classList.add('show'); document.body.style.overflow = 'hidden'; }
function closeSidebar() { document.querySelector('.sb')?.classList.remove('show'); document.getElementById('sbOverlay')?.classList.remove('show'); document.body.style.overflow = ''; }
function toggleSidebar() { document.querySelector('.sb')?.classList.contains('show') ? closeSidebar() : openSidebar(); }
(function () {
  if (document.getElementById('_sbMobileCSS')) return;
  const s = document.createElement('style'); s.id = '_sbMobileCSS';
  s.textContent = `@media (max-width:768px){.sb{position:fixed!important;top:0;right:0;height:100vh;width:240px!important;z-index:1000;transform:translateX(110%);transition:transform .25s ease;overflow-y:auto}.sb.show{transform:translateX(0)!important}.menu-btn{display:flex!important}.sb-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:999}.sb-overlay.show{display:block}}@media(min-width:769px){.sb{transform:none!important}.menu-btn{display:none!important}}`;
  document.head.appendChild(s);
  document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('sbOverlay')) {
      const ov = document.createElement('div'); ov.id = 'sbOverlay'; ov.className = 'sb-overlay'; ov.onclick = closeSidebar;
      document.body.appendChild(ov);
    }
  });
})();

/* ── Router (used by portals) ─────────────────────────────────── */
const PAGES = {};
function reg(k, fn) { PAGES[k] = fn; window.PAGES = PAGES; }
function go(k) {
  const item = window._currentNav?.find(n => n.k === k);
  const ptEl = document.getElementById('pgtitle') || document.getElementById('pgTitle');
  if (ptEl && item) ptEl.textContent = t2(item.ar, item.en);
  buildNav(window._currentNav || [], k);
  const ct = document.getElementById('pgContent');
  if (ct) ct.innerHTML = '<div class="fade" id="pg"></div>';
  const fn = PAGES[k];
  if (fn) fn(document.getElementById('pg'));
  else { const pg = document.getElementById('pg'); if (pg) pg.innerHTML = `<p style="padding:40px;color:var(--t3)">${t2('قيد البناء…', 'Coming soon…')}</p>`; }
  window.scrollTo(0, 0);
}

/* ── Attendance (simplified — no auth token needed) ─────────────── */
async function trackAttendance() {
  try {
    if (!App.profile) return;
    const today = new Date().toISOString().split('T')[0], now = new Date().toISOString();
    await fetch(`${SB_URL}/rest/v1/attendance_log`, {
      method: 'POST',
      headers: { ..._hdrs(), 'Prefer': 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify({ user_id: App.profile.id, date: today, first_seen: now, last_seen: now })
    });
  } catch (e) {}
}

/* ── Employee creation helper (shared by all division portals) ──
   Replaces old signup-based createEmployee — now uses app_create_user RPC.
*/
async function createEmployeeShared(division) {
  const name = mv('ce_n'), empId = mv('ce_id'), pass = mv('ce_pw');
  if (!name || !empId || !pass) { toast(t2('يرجى تعبئة جميع الحقول', 'Please fill all fields'), 'e'); return; }
  const username = empId.toLowerCase().replace(/\s+/g, '');
  const btn = document.getElementById('ceBtn');
  if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spin"></span>'; }
  try {
    await appCreateUser({ username, password: pass, full_name: name, role: 'employee', division, job_title: null });
    closeModal();
    toast(t2('تم إنشاء الحساب ✓', 'Account created ✓'), 's');
    setTimeout(() => openModal(`<div class="mh"><h3 style="color:var(--success)">✓</h3><button class="mx" onclick="closeModal()">×</button></div>
      <div class="mbd"><div style="background:#060F1E;border-radius:8px;padding:14px;font-family:var(--mono)">
        <div style="font-size:10px;color:var(--t3)">${t2('اسم المستخدم', 'Username')}</div>
        <div style="font-size:15px;color:#60A5FA;margin-bottom:8px">${esc(username)}</div>
        <div style="font-size:10px;color:var(--t3)">${t2('كلمة المرور', 'Password')}</div>
        <div style="font-size:15px;color:#FCD34D">${esc(pass)}</div>
      </div></div>
      <div class="mf"><button class="btn p" onclick="closeModal()">${t2('تم', 'Done')}</button></div>`), 100);
  } catch (e) { toast('Error: ' + e.message, 'e'); if (btn) { btn.disabled = false; btn.innerHTML = t2('إنشاء', 'Create'); } }
}
function genEmpPW() {
  const ch = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#!';
  let p = ''; for (let i = 0; i < 10; i++) p += ch[Math.floor(Math.random() * ch.length)];
  const el = document.getElementById('ce_pw'); if (el) { el.value = p; navigator.clipboard?.writeText(p).catch(() => {}); }
}

/* ── Constants ────────────────────────────────────────────────── */
const LOGO = '<img src="se-logo.png.PNG" alt="Saudi Energy" style="height:32px;width:auto;object-fit:contain;display:block" onerror="this.style.display=\'none\'">';

/* ── Export ───────────────────────────────────────────────────── */
Object.assign(window, {
  t2, tl, App, DIVS, PORTALS, ROLE_AR, ROLE_EN, LOCALE_MAP, LOGO,
  setLang, toggleLang, doLogout, requireAuth, _renderBadge, startClock,
  toast, openModal, closeModal, mv, ms,
  dbList, dbGet, dbIns, dbUpd, dbDel, dbCnt,
  fmtD, fmtN, esc, isOD, priBadge, stBadge, progBar, skR, emptyEl,
  initCanvas, loadHealth, buildNav, confirm2, logAct, go, reg, PAGES,
  getStoredSession, storeSession, clearSession,
  openSidebar, closeSidebar, toggleSidebar, trackAttendance,
  rpc, appLogin, appListUsers, appCreateUser, appResetPassword, appUpdateUser, appToggleActive, appListByDivision,
  createEmployeeShared, genEmpPW,
});
