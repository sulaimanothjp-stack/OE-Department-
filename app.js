/* ============================================================
   app.js — Saudi Energy OE Digital Twin Command Center V3
   Shared engine — NO initPage / NO initAuth / NO translateDOM
   ============================================================ */
'use strict';

// ── CONFIG ────────────────────────────────────────────────────
const SUPA_URL = 'https://ekywcrlcjgbjtwnjozov.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVreXdjcmxjamdianR3bmpvem92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4OTg5MzcsImV4cCI6MjA5NzQ3NDkzN30.TQxP2SUjaxSjdsBadmgHIBSVQ5B-YOLkvnl1JwyhISI';
// Legacy aliases used by some portals
const SB_URL = SUPA_URL;
const SB_KEY = SUPA_KEY;

// ── GLOBAL STATE ──────────────────────────────────────────────
const App = { user: null, profile: null, lang: 'ar' };

// ── SESSION ───────────────────────────────────────────────────
function getStoredSession() {
  try {
    // Try se_session first (new pattern)
    const raw = localStorage.getItem('se_session');
    if (raw) return JSON.parse(raw);
    // Fallback: scan all keys (old pattern)
    const ks = Object.keys(localStorage).filter(k => k.includes('auth-token') || k.includes('supabase'));
    for (const k of ks) {
      const v = JSON.parse(localStorage.getItem(k) || 'null');
      if (v && v.access_token) return v;
      if (v && v.session && v.session.access_token) return v.session;
    }
  } catch {}
  return null;
}
function clearSession() { localStorage.removeItem('se_session'); }

// ── SUPABASE HELPERS ──────────────────────────────────────────
function _hdrs(token) {
  return {
    'Content-Type': 'application/json',
    'apikey': SUPA_KEY,
    'Authorization': `Bearer ${token || SUPA_KEY}`
  };
}

// opts: { select, eq, neq, in, ilike, order, lim, offset }
async function dbList(table, opts = {}, token) {
  const sess = getStoredSession();
  const tok = token || sess?.access_token || SUPA_KEY;
  const url = new URL(`${SUPA_URL}/rest/v1/${table}`);
  url.searchParams.set('select', opts.select || '*');
  if (opts.eq)   Object.entries(opts.eq).forEach(([k,v]) => url.searchParams.set(k, `eq.${v}`));
  if (opts.neq)  Object.entries(opts.neq).forEach(([k,v]) => url.searchParams.set(k, `neq.${v}`));
  if (opts.in && Array.isArray(opts.in)) {
    // opts.in = {field: [v1,v2]} OR [field, [v1,v2]]
    if (Array.isArray(opts.in)) {
      const [field, vals] = opts.in;
      if (field && vals) url.searchParams.set(field, `in.(${vals.join(',')})`);
    } else {
      Object.entries(opts.in).forEach(([k,v]) => url.searchParams.set(k, `in.(${v.join(',')})`));
    }
  }
  if (opts.ilike && Array.isArray(opts.ilike)) {
    url.searchParams.set(opts.ilike[0], `ilike.*${opts.ilike[1]}*`);
  }
  if (opts.order || opts.ord) url.searchParams.set('order', `${opts.order || opts.ord}.${opts.asc ? 'asc' : 'desc'}`);
  if (opts.lim || opts.limit) url.searchParams.set('limit', String(opts.lim || opts.limit));
  if (opts.offset) url.searchParams.set('offset', String(opts.offset));
  const res = await fetch(url.toString(), { headers: _hdrs(tok) });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  // Return both array AND {data:array} to satisfy old+new patterns
  const arr = Array.isArray(data) ? data : [];
  arr.data = arr; // self-reference so .data.length works
  return arr;
}

async function dbGet(table, id, token) {
  const sess = getStoredSession();
  const tok = token || sess?.access_token || SUPA_KEY;
  const res = await fetch(`${SUPA_URL}/rest/v1/${table}?id=eq.${id}&limit=1`, { headers: _hdrs(tok) });
  if (!res.ok) throw new Error(await res.text());
  const rows = await res.json();
  return rows[0] || null;
}

async function dbIns(table, data, token) {
  const sess = getStoredSession();
  const tok = token || sess?.access_token || SUPA_KEY;
  const res = await fetch(`${SUPA_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: { ..._hdrs(tok), 'Prefer': 'return=representation' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
  const rows = await res.json();
  return Array.isArray(rows) ? rows[0] : rows;
}

async function dbUpd(table, id, data, token) {
  const sess = getStoredSession();
  const tok = token || sess?.access_token || SUPA_KEY;
  const res = await fetch(`${SUPA_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'PATCH',
    headers: { ..._hdrs(tok), 'Prefer': 'return=representation' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error(await res.text());
  const rows = await res.json();
  return Array.isArray(rows) ? rows[0] : rows;
}

async function dbDel(table, id, token) {
  const sess = getStoredSession();
  const tok = token || sess?.access_token || SUPA_KEY;
  const res = await fetch(`${SUPA_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'DELETE',
    headers: _hdrs(tok)
  });
  if (!res.ok) throw new Error(await res.text());
  return true;
}

async function dbCnt(table, opts = {}, token) {
  const sess = getStoredSession();
  const tok = token || sess?.access_token || SUPA_KEY;
  const url = new URL(`${SUPA_URL}/rest/v1/${table}`);
  url.searchParams.set('select', 'id');
  if (opts.eq)  Object.entries(opts.eq).forEach(([k,v]) => url.searchParams.set(k, `eq.${v}`));
  if (opts.neq) Object.entries(opts.neq).forEach(([k,v]) => url.searchParams.set(k, `neq.${v}`));
  const res = await fetch(url.toString(), { headers: { ..._hdrs(tok), 'Prefer': 'count=exact' } });
  if (!res.ok) throw new Error(await res.text());
  const cr = res.headers.get('content-range');
  if (cr) { const m = cr.match(/\/(\d+)$/); if (m) return parseInt(m[1], 10); }
  const rows = await res.json();
  return Array.isArray(rows) ? rows.length : 0;
}

// ── ACTIVITY LOG ──────────────────────────────────────────────
async function logAct(type, entityType, entityId, meta) {
  try {
    const sess = getStoredSession();
    if (!sess) return;
    await dbIns('attendance_log', {
      user_id: App.profile?.id || sess.user?.id,
      date: new Date().toISOString().slice(0, 10),
      activity_type: type,
      entity_type: entityType,
      entity_id: entityId,
      meta: meta ? JSON.stringify(meta) : null,
      first_seen: new Date().toISOString(),
      last_seen: new Date().toISOString()
    }, sess.access_token);
  } catch {}
}

// Track attendance (called on portal load)
async function trackAttendance() {
  try {
    const sess = getStoredSession();
    if (!sess || !App.profile) return;
    const today = new Date().toISOString().slice(0, 10);
    const uid = App.profile.id;
    const existing = await dbList('attendance_log', { eq: { user_id: uid, date: today }, lim: 1 }, sess.access_token);
    if (existing.length) {
      await fetch(`${SUPA_URL}/rest/v1/attendance_log?user_id=eq.${uid}&date=eq.${today}`, {
        method: 'PATCH',
        headers: { ..._hdrs(sess.access_token), 'Prefer': 'return=minimal' },
        body: JSON.stringify({ last_seen: new Date().toISOString() })
      });
    } else {
      await dbIns('attendance_log', { user_id: uid, date: today, first_seen: new Date().toISOString(), last_seen: new Date().toISOString() }, sess.access_token);
    }
  } catch {}
}

// ── PORTAL / ROLE CONFIG ──────────────────────────────────────
const PORTALS = {
  admin: 'admin.html', director: 'department.html',
  governance_manager: 'governance.html', generation_manager: 'generation.html',
  national_grid_manager: 'national-grid.html', distribution_manager: 'distribution.html',
  technical_alerts_manager: 'technical-alerts.html', employee: 'employee.html'
};
const ROLE_AR = {
  admin: 'مدير النظام', director: 'مدير الإدارة',
  governance_manager: 'مدير الحوكمة', generation_manager: 'مدير التوليد',
  national_grid_manager: 'مدير الشبكة الوطنية', distribution_manager: 'مدير التوزيع',
  technical_alerts_manager: 'مدير التنبيهات الفنية', employee: 'موظف'
};
const ROLE_EN = {
  admin: 'System Admin', director: 'Director',
  governance_manager: 'Governance Manager', generation_manager: 'Generation Manager',
  national_grid_manager: 'National Grid Manager', distribution_manager: 'Distribution Manager',
  technical_alerts_manager: 'Technical Alerts Manager', employee: 'Employee'
};
const DIVS = {
  governance:       { color: '#7C3AED', icon: '⚖️',  ar: 'الحوكمة',          en: 'Governance' },
  generation:       { color: '#F59E0B', icon: '⚡',  ar: 'التوليد',           en: 'Generation' },
  national_grid:    { color: '#0EA5E9', icon: '🔌',  ar: 'الشبكة الوطنية',   en: 'National Grid' },
  distribution:     { color: '#10B981', icon: '🏙️', ar: 'التوزيع',           en: 'Distribution' },
  technical_alerts: { color: '#EF4444', icon: '🚨',  ar: 'التنبيهات الفنية', en: 'Technical Alerts' }
};
const LOGO = `<span class="logo-mark" style="font-family:var(--hud);font-weight:700;color:var(--DC,#0EA5E9);font-size:18px">se</span>`;

// ── LOAD HEALTH (used by department.html) ─────────────────────
async function loadHealth() {
  const sess = getStoredSession();
  const divCodes = Object.keys(DIVS);
  const results = await Promise.all(divCodes.map(async code => {
    const [openAfis, overdueAfis, openAlerts, activeAssm] = await Promise.all([
      dbCnt('afis', { eq: { business_line: code }, neq: { status: 'closed' } }, sess?.access_token),
      dbCnt('afis', { eq: { business_line: code, status: 'overdue' } }, sess?.access_token),
      dbCnt('technical_alerts', { eq: { source_division: code }, neq: { status: 'resolved' } }, sess?.access_token),
      dbCnt('assessments', { eq: { business_line: code }, neq: { stage: 'closed' } }, sess?.access_token),
    ]).catch(() => [0, 0, 0, 0]);
    return {
      code,
      name_ar: DIVS[code].ar,
      name_en: DIVS[code].en,
      open_afis: openAfis,
      overdue_afis: overdueAfis,
      open_alerts: openAlerts,
      active_assessments: activeAssm
    };
  }));
  return results;
}

// ── CLOCK ─────────────────────────────────────────────────────
function startClock(elId) {
  // If no element id given, try common ids
  const id = elId || 'ct';
  const el = document.getElementById(id);
  if (!el) return;
  function tick() {
    const n = new Date();
    el.textContent = n.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    // also update date element if present
    const cd = document.getElementById('cd');
    if (cd) cd.textContent = n.toLocaleDateString('ar-SA', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  }
  tick(); setInterval(tick, 1000);
}

// ── SIDEBAR TOGGLE ────────────────────────────────────────────
function toggleSidebar() {
  const sb = document.getElementById('sidebar') || document.querySelector('.sb');
  if (!sb) return;
  const show = sb.classList.toggle('show');
  let ov = document.getElementById('sbOv');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'sbOv'; ov.className = 'sb-overlay';
    ov.onclick = toggleSidebar;
    document.body.appendChild(ov);
  }
  ov.classList.toggle('show', show);
}

// ── LANG TOGGLE ───────────────────────────────────────────────
function toggleLang() {
  App.lang = App.lang === 'ar' ? 'en' : 'ar';
  document.documentElement.lang = App.lang;
  document.documentElement.dir = App.lang === 'ar' ? 'rtl' : 'ltr';
}

// ── LOGOUT ────────────────────────────────────────────────────
function doLogout() {
  const sess = getStoredSession();
  if (sess?.access_token) {
    fetch(`${SUPA_URL}/auth/v1/logout`, { method: 'POST', headers: _hdrs(sess.access_token) }).catch(() => {});
  }
  clearSession();
  location.href = 'index.html';
}
// Alias
function logout() { doLogout(); }

// ── NAV BUILDER ───────────────────────────────────────────────
// Supports NAV items with {k, ar, en, ic} AND group items {g, ge}
function buildNav(items, active) {
  const el = document.getElementById('navEl');
  if (!el) return;
  el.innerHTML = items.map(item => {
    if (item.g) {
      return `<div class="nav-group"><span class="ng-ar">${item.g}</span><span class="ng-en">${item.ge || ''}</span></div>`;
    }
    const label = App.lang === 'en' ? (item.en || item.ar || '') : (item.ar || item.en || '');
    const isActive = item.k === active;
    return `<a class="ni${isActive ? ' on' : ''}" onclick="${item.fn || `go('${item.k}')`}" href="#">
      <span class="ni-ic">${item.ic || ''}</span>
      <span class="ni-lb">${label}</span>
    </a>`;
  }).join('');
}

// ── GLOBAL PAGE ROUTER (fallback) ────────────────────────────
const _PAGES = {};
function reg(k, fn) { _PAGES[k] = fn; }
function go(k) {
  const el = document.getElementById('pgContent');
  if (!el) return;
  el.innerHTML = '<div class="fade" id="pg"></div>';
  const pg = document.getElementById('pg');
  if (!pg) return;
  const fn = _PAGES[k];
  if (fn) fn(pg);
  else pg.innerHTML = `<p style="padding:40px;color:var(--t3)">قيد البناء…</p>`;
}

// ── UTILITY HELPERS ───────────────────────────────────────────
function t2(ar, en) { return App.lang === 'en' ? en : ar; }

function esc(str) {
  if (str == null) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Get form field value by id
function mv(id) {
  const el = document.getElementById(id);
  if (!el) return '';
  return el.value?.trim() || '';
}

// Format date
function fmtD(d) {
  if (!d) return '—';
  try { return new Date(d).toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' }); }
  catch { return d; }
}

// Format number
function fmtN(n) {
  if (n == null || n === '') return '—';
  return Number(n).toLocaleString('ar-SA');
}

// Is task overdue?
function isOD(dueDate, status) {
  if (!dueDate || ['closed', 'done', 'resolved'].includes(status)) return false;
  return new Date(dueDate) < new Date();
}

// Confirm then run
function confirm2(msg, fn) {
  if (confirm(msg)) fn();
}

// ── SKELETON / EMPTY ──────────────────────────────────────────
function skR(n = 3) {
  return Array.from({ length: n }, () =>
    `<div style="height:54px;margin-bottom:10px;border-radius:8px;background:linear-gradient(90deg,#0d1117 25%,#161b22 50%,#0d1117 75%);background-size:200%;animation:_sk 1.4s infinite"></div>`
  ).join('') + `<style>@keyframes _sk{0%{background-position:200% 0}100%{background-position:-200% 0}}</style>`;
}

function emptyEl(msg, extra = '') {
  return `<div style="text-align:center;padding:48px 20px;opacity:.5">
    <div style="font-size:2.5rem;margin-bottom:10px">📭</div>
    <div style="font-size:.9rem;margin-bottom:10px">${esc(msg)}</div>
    ${extra}
  </div>`;
}

// ── TOAST ─────────────────────────────────────────────────────
function toast(msg, type = 'i') {
  const colors = { i: '#0EA5E9', s: '#10B981', e: '#EF4444', w: '#F59E0B',
                   info: '#0EA5E9', success: '#10B981', error: '#EF4444', warn: '#F59E0B' };
  const t = document.createElement('div');
  t.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
    background:${colors[type]||colors.i};color:#fff;padding:10px 22px;border-radius:8px;
    font-size:.9rem;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.5);
    animation:_tf .25s ease;pointer-events:none`;
  t.textContent = msg;
  document.head.insertAdjacentHTML('beforeend', '<style>@keyframes _tf{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}</style>');
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

// ── MODAL ─────────────────────────────────────────────────────
function openModal(html, size) {
  closeModal();
  const maxW = size === 'w' ? '680px' : '560px';
  const overlay = document.createElement('div');
  overlay.id = 'modalOverlay';
  overlay.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:8000;
    display:flex;align-items:center;justify-content:center;padding:16px`;
  overlay.innerHTML = `<div style="background:#0d1117;border:1px solid #30363d;border-radius:12px;
    width:100%;max-width:${maxW};max-height:92vh;overflow-y:auto;padding:24px;position:relative">
    ${html}
  </div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.body.appendChild(overlay);
}
function closeModal() {
  const el = document.getElementById('modalOverlay');
  if (el) el.remove();
}

// ── BADGE / STATUS COMPONENTS ─────────────────────────────────
function priBadge(p) {
  const m = { critical:['#EF4444','حرجة'], high:['#F59E0B','عالية'], medium:['#0EA5E9','متوسطة'], low:['#10B981','منخفضة'] };
  const [c, l] = m[p] || ['#8b949e', p || '—'];
  return `<span style="background:${c}22;color:${c};padding:2px 9px;border-radius:20px;font-size:.78rem;white-space:nowrap">${l}</span>`;
}

function stBadge(s) {
  const m = {
    open:['#F59E0B','مفتوحة'], in_progress:['#0EA5E9','جارية'], closed:['#10B981','مغلقة'],
    resolved:['#10B981','محلولة'], pending:['#8b949e','معلقة'], active:['#10B981','نشط'],
    inactive:['#EF4444','غير نشط'], completed:['#10B981','مكتملة'], cancelled:['#EF4444','ملغاة'],
    on_track:['#10B981','على المسار'], at_risk:['#F59E0B','في خطر'], behind:['#EF4444','متأخرة'],
    new:['#6366F1','جديد'], overdue:['#EF4444','متأخر'], returned:['#F59E0B','مُعاد'],
    pending_review:['#0EA5E9','بانتظار المراجعة'], done:['#10B981','منجز'],
    assigned:['#0EA5E9','مكلّف'], pending_verification:['#F59E0B','بانتظار التحقق'],
    planning:['#6366F1','تخطيط'], evidence_collection:['#0EA5E9','جمع أدلة'],
    assessment:['#F59E0B','تقييم'], review:['#7C3AED','مراجعة'], approval:['#F59E0B','اعتماد'],
    escalated:['#EF4444','مصعّد'], scheduled:['#0EA5E9','مجدول'], red:['#EF4444','أحمر'],
    green:['#10B981','أخضر'], yellow:['#F59E0B','أصفر']
  };
  const [c, l] = m[s] || ['#8b949e', s || '—'];
  return `<span style="background:${c}22;color:${c};padding:2px 9px;border-radius:20px;font-size:.78rem;white-space:nowrap">${l}</span>`;
}

function progBar(pct, color) {
  const p = Math.min(100, Math.max(0, Number(pct) || 0));
  const c = color || 'var(--DC,#0EA5E9)';
  return `<div style="background:#21262d;border-radius:4px;height:5px;overflow:hidden">
    <div style="width:${p}%;height:100%;background:${c};border-radius:4px;transition:width .4s"></div>
  </div>
  <div style="font-size:.72rem;color:#8b949e;margin-top:2px">${p}%</div>`;
}

// ── RENDER TICKETS (shared for division portals) ──────────────
async function renderTickets(el, BL, DC, DR) {
  el.innerHTML = `<div style="margin-bottom:14px"><h1 style="font-family:var(--hud);font-size:19px;color:${DC}">🎫 ${t2('التذاكر','Tickets')}</h1>
    <div style="font-size:12.5px;color:var(--t2)">${t2('تذاكر الدعم الفني والمشاكل التشغيلية','Technical support & operational tickets')}</div></div>
    <div class="panel" style="border-color:rgba(${DR},.15)"><div id="tktList">${skR()}</div></div>`;
  const data = await dbList('tickets', { eq: { source_division: BL } }).catch(() => []);
  const el2 = document.getElementById('tktList');
  if (!el2) return;
  el2.innerHTML = data.length ? `<div class="tw"><table>
    <thead><tr><th>العنوان</th><th>الأولوية</th><th>الحالة</th><th>التاريخ</th></tr></thead>
    <tbody>${data.map(tk => `<tr>
      <td style="font-weight:600">${esc(tk.title)}</td>
      <td>${priBadge(tk.priority)}</td>
      <td>${stBadge(tk.status)}</td>
      <td class="fmono" style="font-size:11px;color:var(--t2)">${fmtD(tk.created_at)}</td>
    </tr>`).join('')}</tbody>
  </table></div>` : emptyEl(t2('لا تذاكر','No tickets'));
}

// ── RENDER ALERTS (shared for division portals) ───────────────
async function renderAlerts(el, BL, DC, DR) {
  el.innerHTML = `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px">
    <div><h1 style="font-family:var(--hud);font-size:19px;color:${DC}">⚠️ ${t2('التنبيهات الفنية','Technical Alerts')}</h1></div>
    <button class="btn p" onclick="openAddAlert()" style="background:linear-gradient(135deg,${DC},${DC}99);border:none">+ ${t2('تنبيه جديد','New Alert')}</button>
  </div>
  <div class="panel" style="border-color:rgba(${DR},.15)">
    <div class="filters">
      <select class="fi" id="alrSev"><option value="">كل الخطورة</option>
        <option value="critical">🔴 حرج</option><option value="high">🟠 عالٍ</option>
        <option value="medium">🟡 متوسط</option></select>
      <select class="fi" id="alrSt"><option value="">كل الحالات</option>
        <option value="open">مفتوح</option><option value="in_progress">جاري</option>
        <option value="escalated">مصعّد</option><option value="resolved">محلول</option></select>
    </div>
    <div id="alrList">${skR()}</div>
  </div>`;

  window._loadAlerts = async () => {
    const el2 = document.getElementById('alrList'); if (!el2) return;
    el2.innerHTML = skR();
    const sv = document.getElementById('alrSev')?.value || '';
    const st = document.getElementById('alrSt')?.value || '';
    const opts = { eq: { source_division: BL } };
    if (sv) opts.eq = { ...opts.eq, severity: sv };
    if (st) opts.eq = { ...opts.eq, status: st };
    const data = await dbList('technical_alerts', opts).catch(() => []);
    el2.innerHTML = data.length ? `<div class="tw"><table>
      <thead><tr><th>العنوان</th><th>الخطورة</th><th>الحالة</th><th>التاريخ</th><th></th></tr></thead>
      <tbody>${data.map(a => `<tr>
        <td style="font-weight:600">${esc(a.title)}</td>
        <td>${priBadge(a.severity)}</td><td>${stBadge(a.status)}</td>
        <td class="fmono" style="font-size:11px">${fmtD(a.reported_date || a.created_at)}</td>
        <td><button class="btn sm" onclick="openEditAlert('${a.id}')">تعديل</button></td>
      </tr>`).join('')}</tbody></table></div>` : emptyEl(t2('لا تنبيهات', 'No alerts'));
  };
  ['alrSev', 'alrSt'].forEach(id => document.getElementById(id)?.addEventListener('change', window._loadAlerts));
  window._loadAlerts();

  window.openAddAlert = () => _alertModal({}, BL, DC);
  window.openEditAlert = async id => {
    const r = await dbGet('technical_alerts', id).catch(() => null);
    if (r) _alertModal(r, BL, DC);
  };
}

function _alertModal(r = {}, BL, DC) {
  openModal(`<div class="mh"><h3 style="color:${DC}">${r.id ? 'تعديل تنبيه' : 'تنبيه جديد'}</h3>
    <button class="mx" onclick="closeModal()">×</button></div>
    <div class="mbd"><div class="fg">
      <div class="field ff"><label>العنوان *</label><input id="al_t" value="${esc(r.title || '')}"></div>
      <div class="field ff"><label>الوصف</label><textarea id="al_d">${esc(r.description || '')}</textarea></div>
      <div class="field"><label>الخطورة</label><select id="al_sv">
        ${['critical','high','medium','low'].map(v => `<option value="${v}" ${r.severity===v?'selected':''}>${priBadge(v).replace(/<[^>]+>/g,'')}</option>`).join('')}
      </select></div>
      <div class="field"><label>الحالة</label><select id="al_st">
        ${['open','in_progress','escalated','resolved'].map(v => `<option value="${v}" ${r.status===v?'selected':''}>${stBadge(v).replace(/<[^>]+>/g,'')}</option>`).join('')}
      </select></div>
      <div class="field"><label>تاريخ الرصد</label><input type="date" id="al_dt" value="${r.reported_date || new Date().toISOString().slice(0,10)}"></div>
    </div></div>
    <div class="mf"><button class="btn" onclick="closeModal()">إلغاء</button>
    <button class="btn p" onclick="_saveAlert('${r.id || ''}','${BL}')" style="background:${DC};border-color:${DC}">حفظ</button></div>`, 'w');
}
window._saveAlert = async (id, BL) => {
  const title = mv('al_t'); if (!title) { toast('العنوان مطلوب', 'e'); return; }
  const row = { title, description: mv('al_d') || null, source_division: BL,
    severity: mv('al_sv'), status: mv('al_st'), reported_date: mv('al_dt') || null };
  try {
    if (id) await dbUpd('technical_alerts', id, row);
    else await dbIns('technical_alerts', row);
    toast('تم ✓', 's'); closeModal(); window._loadAlerts?.();
  } catch (e) { toast(e.message, 'e'); }
};

// ── ANIMATED CANVAS ───────────────────────────────────────────
function initCanvas(id, type, color) {
  const canvas = document.getElementById(id);
  if (!canvas || typeof canvas.getContext !== 'function') return;
  const ctx = canvas.getContext('2d');
  let W, H, raf, nodes = [], lines = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth  || window.innerWidth;
    H = canvas.height = canvas.offsetHeight || window.innerHeight;
  }

  function hexRgb(hex) {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '14,165,233';
  }
  const rgb = hexRgb(color || '#0EA5E9');
  let tick = 0;

  const drawFns = {
    net() {
      if (!nodes.length) nodes = Array.from({length:55},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.8+.6}));
      ctx.clearRect(0,0,W,H);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>W)n.vx*=-1;if(n.y<0||n.y>H)n.vy*=-1;});
      for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){
        const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<110){ctx.strokeStyle=`rgba(${rgb},${(1-d/110)*.22})`;ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);ctx.stroke();}
      }
      nodes.forEach(n=>{ctx.fillStyle=`rgba(${rgb},.55)`;ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fill();});
    },
    energy() {
      ctx.clearRect(0,0,W,H); tick+=.018;
      for(let w=0;w<3;w++){ctx.beginPath();ctx.strokeStyle=`rgba(${rgb},${.13-w*.04})`;ctx.lineWidth=1.4-w*.4;
        for(let x=0;x<=W;x+=2){const y=H/2+Math.sin(x/75+tick+w*1.1)*(38+w*18)+Math.sin(x/38+tick*1.4)*13;x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.stroke();}
    },
    grid() {
      ctx.clearRect(0,0,W,H); tick+=.007; const step=58;
      for(let x=0;x<W;x+=step){const a=.04+.025*Math.sin(tick+x*.01);ctx.strokeStyle=`rgba(${rgb},${a})`;ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for(let y=0;y<H;y+=step){const a=.04+.025*Math.sin(tick+y*.01);ctx.strokeStyle=`rgba(${rgb},${a})`;ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
      for(let x=0;x<W;x+=step)for(let y=0;y<H;y+=step){const a=.28*Math.abs(Math.sin(tick*2+(x+y)*.018));ctx.fillStyle=`rgba(${rgb},${a})`;ctx.beginPath();ctx.arc(x,y,1.4,0,Math.PI*2);ctx.fill();}
    },
    city() {
      if(!lines.length)for(let i=0;i<18;i++)lines.push({x1:Math.random()*W,y1:Math.random()*H,x2:Math.random()*W,y2:Math.random()*H,ph:Math.random()*Math.PI*2,sp:.01+Math.random()*.02});
      ctx.clearRect(0,0,W,H);
      lines.forEach(l=>{l.ph+=l.sp;const a=.04+.07*Math.abs(Math.sin(l.ph));ctx.strokeStyle=`rgba(${rgb},${a})`;ctx.lineWidth=.9;ctx.beginPath();ctx.moveTo(l.x1,l.y1);ctx.lineTo(l.x2,l.y2);ctx.stroke();});
    },
    radar() {
      ctx.clearRect(0,0,W,H); tick+=.013;
      const cx=W/2,cy=H/2,mr=Math.min(W,H)*.44;
      for(let i=1;i<=4;i++){ctx.strokeStyle=`rgba(${rgb},.1)`;ctx.lineWidth=.7;ctx.beginPath();ctx.arc(cx,cy,mr*i/4,0,Math.PI*2);ctx.stroke();}
      ctx.strokeStyle=`rgba(${rgb},.08)`;ctx.lineWidth=.6;
      ctx.beginPath();ctx.moveTo(cx-mr,cy);ctx.lineTo(cx+mr,cy);ctx.stroke();
      ctx.beginPath();ctx.moveTo(cx,cy-mr);ctx.lineTo(cx,cy+mr);ctx.stroke();
      ctx.save();ctx.translate(cx,cy);ctx.rotate(tick);
      const sw=ctx.createLinearGradient(0,0,mr,0);sw.addColorStop(0,`rgba(${rgb},0)`);sw.addColorStop(1,`rgba(${rgb},.32)`);
      ctx.fillStyle=sw;ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,mr,-.35,0);ctx.closePath();ctx.fill();ctx.restore();
    }
  };

  resize();
  window.addEventListener('resize', () => { cancelAnimationFrame(raf); nodes=[]; lines=[]; resize(); loop(); });

  function loop() {
    (drawFns[type] || drawFns.net)();
    raf = requestAnimationFrame(loop);
  }
  loop();
}

// ── EXPORTS ───────────────────────────────────────────────────
Object.assign(window, {
  // State
  App, SUPA_URL, SUPA_KEY, SB_URL, SB_KEY,
  // Session
  getStoredSession, clearSession, logout, doLogout,
  // DB
  dbList, dbGet, dbIns, dbUpd, dbDel, dbCnt,
  // Config
  PORTALS, ROLE_AR, ROLE_EN, DIVS, LOGO,
  // Helpers
  loadHealth, trackAttendance, logAct,
  // UI
  startClock, toggleSidebar, toggleLang,
  buildNav, reg, go,
  t2, esc, mv, fmtD, fmtN, isOD, confirm2,
  skR, emptyEl, toast,
  openModal, closeModal,
  priBadge, stBadge, progBar,
  renderTickets, renderAlerts,
  initCanvas
});
