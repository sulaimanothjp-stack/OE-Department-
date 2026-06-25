'use strict';
/* ═══════════════════════════════════════════════════════════════
   Saudi Energy · OE Command Center · app.js v4
   Pure Fetch — No Supabase JS Client (fixes Safari/iOS hang)
═══════════════════════════════════════════════════════════════ */

const SB_URL = 'https://ekywcrlcjgbjtwnjozov.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVreXdjcmxjamdianR3bmpvem92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4OTg5MzcsImV4cCI6MjA5NzQ3NDkzN30.TQxP2SUjaxSjdsBadmgHIBSVQ5B-YOLkvnl1JwyhISI';
const SB_SESS_KEY = 'sb-ekywcrlcjgbjtwnjozov-auth-token';

/* ── Session helpers ──────────────────────────────────────────── */
function getStoredSession() {
  try {
    // Try the known key first
    const direct = localStorage.getItem(SB_SESS_KEY);
    if (direct) { const v = JSON.parse(direct); if (v?.access_token) return v; }
    // Fallback: scan all keys
    for (const k of Object.keys(localStorage)) {
      if (!k.includes('auth-token') && !k.includes('supabase')) continue;
      try {
        const v = JSON.parse(localStorage.getItem(k));
        if (v?.access_token) return v;
        if (v?.session?.access_token) return v.session;
      } catch (e) {}
    }
  } catch (e) {}
  return null;
}

function storeSession(s) {
  try { localStorage.setItem(SB_SESS_KEY, JSON.stringify(s)); } catch (e) {}
}

function clearSession() {
  Object.keys(localStorage)
    .filter(k => k.includes('supabase') || k.includes('sb-'))
    .forEach(k => localStorage.removeItem(k));
}

function isSessionValid(sess) {
  if (!sess?.access_token) return false;
  try {
    const p = JSON.parse(atob(sess.access_token.split('.')[1]));
    return !p.exp || p.exp * 1000 > Date.now();
  } catch (e) { return true; } // assume valid if can't parse
}

/* ── Query Builder ────────────────────────────────────────────── */
class QB {
  constructor(table) {
    this._t = table;
    this._ps = [];
    this._m = 'GET';
    this._body = null;
    this._sel = '*';
    this._single = false;
    this._countOnly = false;
    this._head = false;
    this._prefer = null;
  }

  select(s = '*', opts = {}) {
    this._sel = s;
    if (opts.count) this._countOnly = true;
    if (opts.head) { this._head = true; this._countOnly = true; }
    return this;
  }

  eq(c, v)    { this._ps.push(`${c}=eq.${encodeURIComponent(String(v))}`); return this; }
  neq(c, v)   { this._ps.push(`${c}=neq.${encodeURIComponent(String(v))}`); return this; }
  in(c, vals) { this._ps.push(`${c}=in.(${vals.map(v => encodeURIComponent(String(v))).join(',')})`); return this; }
  ilike(c, p) { this._ps.push(`${c}=ilike.${encodeURIComponent(p)}`); return this; }
  gte(c, v)   { this._ps.push(`${c}=gte.${encodeURIComponent(String(v))}`); return this; }
  lte(c, v)   { this._ps.push(`${c}=lte.${encodeURIComponent(String(v))}`); return this; }
  order(c, opts = {}) { this._ps.push(`order=${c}.${opts.ascending ? 'asc' : 'desc'}`); return this; }
  limit(n)    { this._ps.push(`limit=${n}`); return this; }

  single()    { this._single = true; if (!this._ps.some(p => p.startsWith('limit'))) this._ps.push('limit=1'); return this._run(); }

  insert(row) {
    this._m = 'POST';
    this._body = Array.isArray(row) ? row : [row];
    this._prefer = 'return=representation';
    return this._run();
  }

  upsert(row) {
    this._m = 'POST';
    this._body = Array.isArray(row) ? row : [row];
    this._prefer = 'resolution=merge-duplicates,return=representation';
    return this._run();
  }

  update(p) { this._m = 'PATCH'; this._body = p; this._prefer = 'return=representation'; return this; }
  delete()   { this._m = 'DELETE'; this._prefer = 'return=minimal'; return this; }

  async _run() {
    const sess = getStoredSession();
    const token = sess?.access_token || '';
    const params = [`select=${this._sel}`, ...this._ps];
    const url = `${SB_URL}/rest/v1/${this._t}?${params.join('&')}`;
    const headers = {
      'apikey': SB_KEY,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    if (this._prefer)    headers['Prefer'] = this._prefer;
    if (this._countOnly) headers['Prefer'] = (headers['Prefer'] ? headers['Prefer'] + ',' : '') + 'count=exact';
    try {
      const res = await fetch(url, {
        method: this._m,
        headers,
        body: this._body ? JSON.stringify(this._body) : undefined
      });
      // Parse count
      let count = null;
      if (this._countOnly) {
        const cr = res.headers.get('content-range');
        count = cr ? (parseInt(cr.split('/')[1]) || 0) : 0;
        if (this._head) return { data: null, error: null, count };
      }
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch (e) { data = text; }
      if (!res.ok) {
        const msg = (typeof data === 'object' ? (data.message || data.hint || data.error || JSON.stringify(data)) : String(data)) || `HTTP ${res.status}`;
        return { data: null, error: { message: msg, code: String(res.status) }, count };
      }
      const arr = Array.isArray(data) ? data : (data ? [data] : []);
      if (this._single) return { data: arr[0] || null, error: null, count };
      return { data: arr, error: null, count };
    } catch (e) {
      return { data: null, error: { message: e.message, code: 'NETWORK' }, count: null };
    }
  }

  then(ok, err) { return this._run().then(ok, err); }
  catch(fn)     { return this._run().catch(fn); }
  finally(fn)   { return this._run().finally(fn); }
}

/* ── Supabase Auth Emulator ───────────────────────────────────── */
const sb = {
  from: (table) => new QB(table),
  auth: {
    getSession: async () => {
      const s = getStoredSession();
      if (!s || !isSessionValid(s)) return { data: { session: null }, error: null };
      return { data: { session: s }, error: null };
    },
    getUser: async () => {
      const s = getStoredSession();
      return { data: { user: s?.user || null }, error: null };
    },
    signInWithPassword: async ({ email, password }) => {
      try {
        const res = await fetch(`${SB_URL}/auth/v1/token?grant_type=password`, {
          method: 'POST',
          headers: { 'apikey': SB_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const d = await res.json();
        if (d.error || d.error_description || d.msg) {
          return { data: null, error: { message: d.error_description || d.msg || d.error || 'Invalid credentials' } };
        }
        storeSession(d);
        return { data: { user: d.user, session: d }, error: null };
      } catch (e) { return { data: null, error: { message: e.message } }; }
    },
    signOut: async () => {
      try {
        const s = getStoredSession();
        if (s?.access_token) {
          await fetch(`${SB_URL}/auth/v1/logout`, {
            method: 'POST',
            headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${s.access_token}` }
          });
        }
      } catch (e) {}
      clearSession();
      return { error: null };
    },
    signUp: async ({ email, password, options }) => {
      try {
        const res = await fetch(`${SB_URL}/auth/v1/signup`, {
          method: 'POST',
          headers: { 'apikey': SB_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, data: options?.data })
        });
        const d = await res.json();
        if (d.error) return { data: null, error: { message: d.error_description || d.error } };
        return { data: { user: d }, error: null };
      } catch (e) { return { data: null, error: { message: e.message } }; }
    },
    updateUser: async (upd) => {
      try {
        const s = getStoredSession();
        const res = await fetch(`${SB_URL}/auth/v1/user`, {
          method: 'PUT',
          headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${s?.access_token || ''}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(upd)
        });
        const d = await res.json();
        if (d.error) return { data: null, error: { message: d.error_description || d.error } };
        return { data: { user: d }, error: null };
      } catch (e) { return { data: null, error: { message: e.message } }; }
    }
  }
};

/* ── App State ────────────────────────────────────────────────── */
// Language version reset — bump LANG_VER to force English reset for all users
const LANG_VER = '3';
if(localStorage.getItem('se_lang_ver') !== LANG_VER) {
  localStorage.removeItem('se_lang_v2');
  localStorage.setItem('se_lang_ver', LANG_VER);
}
const App = { user: null, profile: null, lang: localStorage.getItem('se_lang_v2') || 'en' };

/* ── Config ───────────────────────────────────────────────────── */
const DIVS = {
  governance:       { ar:'الحوكمة والتقييم',   en:'Governance',        color:'#7C3AED', rgb:'124,58,237', icon:'⚖️',  file:'governance.html' },
  generation:       { ar:'التوليد',             en:'Generation',        color:'#F59E0B', rgb:'245,158,11', icon:'⚡',  file:'generation.html' },
  national_grid:    { ar:'الشبكة الوطنية',      en:'National Grid',     color:'#0EA5E9', rgb:'14,165,233', icon:'🔌', file:'national-grid.html' },
  distribution:     { ar:'التوزيع',             en:'Distribution',      color:'#10B981', rgb:'16,185,129', icon:'🏘️',file:'distribution.html' },
  technical_alerts: { ar:'التنبيهات الفنية',    en:'Tech Alerts',       color:'#EF4444', rgb:'239,68,68',  icon:'⚠️',file:'technical-alerts.html' },
};
const PORTALS = {
  admin:'admin.html', director:'department.html',
  governance_manager:'governance.html', generation_manager:'generation.html',
  national_grid_manager:'national-grid.html', distribution_manager:'distribution.html',
  technical_alerts_manager:'technical-alerts.html', employee:'employee.html',
};
const ROLE_AR = { admin:'مشرف النظام', director:'مدير الإدارة', governance_manager:'مدير الحوكمة', generation_manager:'مدير التوليد', national_grid_manager:'مدير النقل', distribution_manager:'مدير التوزيع', technical_alerts_manager:'مدير التنبيهات', employee:'موظف' };

/* ── i18n ─────────────────────────────────────────────────────── */
const T = {
  ar:{
    save:'حفظ', cancel:'إلغاء', del:'حذف', search:'بحث...', nodata:'لا بيانات', logout:'خروج',
    add:'إضافة', edit:'تعديل', close:'إغلاق', back:'رجوع', confirm:'تأكيد', send:'إرسال',
    viewAll:'عرض الكل', newTask:'مهمة جديدة', refresh:'تحديث', details:'تفاصيل',
    dashboard:'لوحة التحكم', tasks:'المهام', alerts:'التنبيهات', afis:'نقاط التحسين',
    kpis:'مؤشرات الأداء', assessments:'التقييمات', team:'الفريق', tickets:'التذاكر',
    initiatives:'المبادرات', documents:'الوثائق', meetings:'الاجتماعات',
    openAFIs:'AFIs مفتوحة', overdueAFIs:'AFIs متأخرة', activeTasks:'مهام نشطة',
    openAlerts:'تنبيهات مفتوحة', criticalAlerts:'تنبيهات حرجة', activeAssessments:'تقييمات نشطة',
    noAlerts:'لا تنبيهات', noTasks:'لا مهام', noAFIs:'لا نقاط تحسين', noData:'لا بيانات',
    noAssessments:'لا تقييمات', noTickets:'لا تذاكر', noTeam:'لا أعضاء',
    priority:'الأولوية', status:'الحالة', dueDate:'الاستحقاق', title:'العنوان',
    division:'الدائرة', owner:'المالك', action:'الإجراء', note:'ملاحظة',
    total:'الإجمالي', open:'مفتوح', closed:'مغلق', overdue:'متأخر', inProgress:'قيد التنفيذ',
    low:'منخفضة', medium:'متوسطة', high:'عالية', critical:'حرج',
    health:'الصحة', score:'النتيجة', trend:'الاتجاه', target:'الهدف', actual:'الفعلي',
    createdAt:'تاريخ الإنشاء', updatedAt:'آخر تحديث', all:'الكل',
    loading:'جارٍ التحميل...', saving:'جارٍ الحفظ...', noItems:'لا عناصر',
    activate:'تفعيل', deactivate:'تعطيل', approve:'اعتماد', reject:'رفض', return:'إعادة',
    manager:'المدير', employee:'الموظف', role:'الدور', name:'الاسم', phone:'الهاتف',
    days:['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],
    months:['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']
  },
  en:{
    save:'Save', cancel:'Cancel', del:'Delete', search:'Search...', nodata:'No data', logout:'Logout',
    add:'Add', edit:'Edit', close:'Close', back:'Back', confirm:'Confirm', send:'Send',
    viewAll:'View All', newTask:'New Task', refresh:'Refresh', details:'Details',
    dashboard:'Dashboard', tasks:'Tasks', alerts:'Alerts', afis:'AFIs',
    kpis:'KPIs', assessments:'Assessments', team:'Team', tickets:'Tickets',
    initiatives:'Initiatives', documents:'Documents', meetings:'Meetings',
    openAFIs:'Open AFIs', overdueAFIs:'Overdue AFIs', activeTasks:'Active Tasks',
    openAlerts:'Open Alerts', criticalAlerts:'Critical Alerts', activeAssessments:'Active Assessments',
    noAlerts:'No alerts', noTasks:'No tasks', noAFIs:'No AFIs', noData:'No data',
    noAssessments:'No assessments', noTickets:'No tickets', noTeam:'No members',
    priority:'Priority', status:'Status', dueDate:'Due Date', title:'Title',
    division:'Division', owner:'Owner', action:'Action', note:'Note',
    total:'Total', open:'Open', closed:'Closed', overdue:'Overdue', inProgress:'In Progress',
    low:'Low', medium:'Medium', high:'High', critical:'Critical',
    health:'Health', score:'Score', trend:'Trend', target:'Target', actual:'Actual',
    createdAt:'Created', updatedAt:'Updated', all:'All',
    loading:'Loading...', saving:'Saving...', noItems:'No items',
    activate:'Activate', deactivate:'Deactivate', approve:'Approve', reject:'Reject', return:'Return',
    manager:'Manager', employee:'Employee', role:'Role', name:'Name', phone:'Phone',
    days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    months:['January','February','March','April','May','June','July','August','September','October','November','December']
  },
};
const t = k => T[App.lang]?.[k] ?? k;
// Inline bilingual helper: t2('عربي', 'English')
const t2 = (ar, en) => {
  if(App.lang === 'ar') return ar;
  if(App.lang === 'en') return en;
  // Use DOM_MAP for other languages
  if(typeof DOM_MAP !== 'undefined' && DOM_MAP[ar] && DOM_MAP[ar][App.lang])
    return DOM_MAP[ar][App.lang];
  // Try TR dictionary
  if(typeof TR !== 'undefined') {
    for(const key of Object.keys(TR)) {
      if(TR[key] && TR[key].ar === ar && TR[key][App.lang])
        return TR[key][App.lang];
    }
  }
  return en; // fallback English
};

/* ── Language ─────────────────────────────────────────────────── */
function setLang(l) {
  App.lang = l; localStorage.setItem('se_lang_v2', l);
  document.documentElement.lang = l;
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  // Translate any elements with data-ar / data-en attributes
  document.querySelectorAll('[data-ar][data-en]').forEach(el => {
    el.textContent = l === 'ar' ? el.dataset.ar : el.dataset.en;
  });
  // Translate placeholder attributes
  document.querySelectorAll('[data-ar-placeholder]').forEach(el => {
    el.placeholder = l === 'ar' ? el.dataset.arPlaceholder : el.dataset.enPlaceholder;
  });
}
function toggleLang() {
  const newLang = App.lang === 'ar' ? 'en' : 'ar';
  setLang(newLang);
  // Update nav
  const navEl = document.getElementById('navEl');
  if(navEl && window._currentNav && window._currentPage) {
    buildNav(window._currentNav, window._currentPage);
  }
  // Update user badge
  if(App.profile) _renderBadge();
  // Update page title
  if(window._currentNav && window._currentPage) {
    const item = window._currentNav.find(n=>n.k===window._currentPage);
    const ptEl = document.getElementById('pgtitle');
    if(item && ptEl) ptEl.textContent = newLang==='ar' ? item.ar : item.en;
  }
  // Update sidebar footer buttons text
  const btnLg = document.querySelector('.btn-lg[onclick="toggleLang()"]');
  if(btnLg) btnLg.textContent = newLang==='ar' ? 'EN/ع' : 'ع/EN';
  // Reload page content to update all rendered text
  if(window._currentPage && window.PAGES && window.PAGES[window._currentPage]) {
    const ct = document.getElementById('pgContent');
    if(ct) {
      ct.innerHTML = '<div class="fade" id="pg"></div>';
      window.PAGES[window._currentPage](document.getElementById('pg'));
    }
  }
}

/* ── Auth ─────────────────────────────────────────────────────── */
async function initAuth(roles) {
  // Show loading
  const pg = document.getElementById('pgContent');
  if (pg) pg.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:60vh;flex-direction:column;gap:12px"><div style="width:36px;height:36px;border:3px solid var(--bd,#152840);border-top-color:var(--DC,#2563EB);border-radius:50%;animation:sp .7s linear infinite"></div><div style="color:var(--t2,#8098BC);font-size:13px">جارٍ التحميل...</div></div>';

  // Read session from localStorage
  const sess = getStoredSession();
  if (!sess || !isSessionValid(sess)) {
    location.href = 'index.html';
    return null;
  }

  // Get user ID from JWT sub claim (more reliable than sess.user.id)
  let userId = sess.user?.id;
  if (!userId) {
    try {
      const payload = JSON.parse(atob(sess.access_token.split('.')[1]));
      userId = payload.sub;
    } catch (e) {}
  }
  if (!userId) { location.href = 'index.html'; return null; }

  // Fetch profile via REST API
  try {
    const res = await fetch(`${SB_URL}/rest/v1/profiles?id=eq.${userId}&select=*&limit=1`, {
      headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${sess.access_token}` }
    });
    const data = await res.json();
    const p = Array.isArray(data) ? data[0] : null;

    if (!p) {
      if (pg) pg.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:70vh"><div style="text-align:center;padding:20px"><div style="font-size:40px;margin-bottom:10px">🗄️</div><h2 style="color:#fff;margin-bottom:8px">يجب تشغيل SQL Schema</h2><p style="color:#8098BC;font-size:13px;margin-bottom:14px">روح Supabase → SQL Editor → شغّل الـ schema</p><a href="https://supabase.com/dashboard/project/ekywcrlcjgbjtwnjozov/sql/new" target="_blank" style="display:inline-block;padding:10px 20px;background:#2563EB;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px">فتح SQL Editor</a></div></div>`;
      return null;
    }

    App.user = sess.user || { id: userId };
    App.profile = p;

    if (roles) {
      const ok = Array.isArray(roles) ? roles.includes(p.role) : p.role === roles;
      if (!ok && p.role !== 'admin') { location.href = PORTALS[p.role] || 'index.html'; return null; }
    }

    // Update last login (fire and forget)
    fetch(`${SB_URL}/rest/v1/profiles?id=eq.${p.id}`, {
      method: 'PATCH',
      headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${sess.access_token}`, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
      body: JSON.stringify({ last_login: new Date().toISOString() })
    }).catch(() => {});

    _renderBadge();
    // User's browser choice takes priority over profile preferences
    // Always use localStorage preference (defaults to 'en')
    // Profile preferences are IGNORED for language
    setLang(App.lang); // App.lang is already 'en' by default
    return p;
  } catch (e) {
    if (pg) pg.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:70vh"><div style="text-align:center;padding:20px"><div style="font-size:40px;margin-bottom:10px">⚠️</div><div style="color:#EF4444;font-size:14px;margin-bottom:10px">${esc(e.message)}</div><button onclick="location.reload()" style="padding:10px 20px;background:#2563EB;border:none;border-radius:8px;color:#fff;cursor:pointer;font-size:13px">إعادة المحاولة</button></div></div>`;
    return null;
  }
}

async function doLogout() {
  try {
    const s = getStoredSession();
    if (s?.access_token) {
      await fetch(`${SB_URL}/auth/v1/logout`, {
        method: 'POST',
        headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${s.access_token}` }
      });
    }
  } catch (e) {}
  clearSession();
  location.href = 'index.html';
}

function _renderBadge() {
  const el = document.getElementById('ubEl'); if (!el) return;
  const p = App.profile;
  const init = (p.full_name || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const d = DIVS[p.division]; const dc = d?.color || '#2563EB';
  el.innerHTML = `<div class="ub-av" style="background:${dc}22;color:${dc}">${init}</div>
    <div style="flex:1;min-width:0"><div class="ub-nm">${esc(App.lang==='ar'?p.full_name||'':p.full_name_en||p.full_name||'')}</div>
    <div class="ub-rl">${ROLE_AR[p.role]||p.role}</div></div>
    <div class="on-dot"></div>`;
}

/* ── Clock ────────────────────────────────────────────────────── */
function startClock() {
  const ct = document.getElementById('ct'), cd = document.getElementById('cd');
  if (!ct && !cd) return;
  function tick() {
    const n = new Date(), h = n.getHours(), l = App.lang;
    const hh = String(h % 12 || 12).padStart(2, '0'), mm = String(n.getMinutes()).padStart(2, '0'), ss = String(n.getSeconds()).padStart(2, '0');
    const ampm = h < 12 ? (l==='ar'||l==='ur'?'ص':'AM') : (l==='ar'||l==='ur'?'م':'PM');
    if (ct) ct.textContent = `${hh}:${mm}:${ss} ${ampm}`;
    if (cd) {
      try {
        const loc = LOCALE_MAP[l] || 'en-GB';
        cd.textContent = n.toLocaleDateString(loc, {weekday:'long',year:'numeric',month:'long',day:'numeric'});
      } catch(e) {
        const ti = T[l] || T.en;
        cd.textContent = `${ti.days[n.getDay()]}, ${n.getDate()} ${ti.months[n.getMonth()]} ${n.getFullYear()}`;
      }
    }
  }
  tick(); setInterval(tick, 1000);
}

/* ── Toast ────────────────────────────────────────────────────── */
function toast(msg, type = 'i', dur = 3500) {
  let c = document.getElementById('tc');
  if (!c) { c = document.createElement('div'); c.id = 'tc'; document.body.appendChild(c); }
  const icons = { s: '✓', e: '✕', i: 'ℹ', w: '⚠' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${icons[type]||'•'}</span><span style="flex:1">${msg}</span><button style="opacity:.55;cursor:pointer" onclick="this.parentElement.remove()">×</button>`;
  c.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .35s'; }, dur - 350);
  setTimeout(() => el.remove(), dur);
}

/* ── Modal ────────────────────────────────────────────────────── */
function openModal(html, cls = '') {
  closeModal();
  const bd = document.createElement('div');
  bd.className = 'mbg'; bd.id = 'M';
  bd.innerHTML = `<div class="modal ${cls}">${html}</div>`;
  bd.addEventListener('click', e => { if (e.target === bd) closeModal(); });
  document.body.appendChild(bd);
  document.addEventListener('keydown', _escK);
}
function closeModal() { document.getElementById('M')?.remove(); document.removeEventListener('keydown', _escK); }
const _escK = e => { if (e.key === 'Escape') closeModal(); };
const mv = id => document.getElementById(id)?.value?.trim() || '';
const ms = (id, v) => { const el = document.getElementById(id); if (el) el.value = v ?? ''; };

/* ── DB Helpers ───────────────────────────────────────────────── */
async function dbList(tbl, opts = {}) {
  let q = sb.from(tbl).select(opts.sel || '*', opts.cnt ? { count: 'exact' } : undefined);
  if (opts.eq)    Object.entries(opts.eq).forEach(([k, v]) => { q = q.eq(k, v); });
  if (opts.neq)   Object.entries(opts.neq).forEach(([k, v]) => { q = q.neq(k, v); });
  if (opts.in)    Object.entries(opts.in).forEach(([k, v]) => { q = q.in(k, v); });
  if (opts.ilike) q = q.ilike(opts.ilike[0], `%${opts.ilike[1]}%`);
  q = q.order(opts.ord || 'created_at', { ascending: opts.asc ?? false });
  if (opts.lim)   q = q.limit(opts.lim);
  const { data, error, count } = await q;
  if (error) throw error;
  return { data: data || [], count };
}
async function dbGet(tbl, id) { const { data, error } = await sb.from(tbl).select('*').eq('id', id).single(); if (error) throw error; return data; }
async function dbIns(tbl, row) { const { data, error } = await sb.from(tbl).insert(row).select('*'); if (error) throw error; return Array.isArray(data) ? data[0] : data; }
async function dbUpd(tbl, id, p) { const { data, error } = await sb.from(tbl).update(p).eq('id', id); if (error) throw error; return Array.isArray(data) ? data[0] : data; }
async function dbDel(tbl, id) { const { error } = await sb.from(tbl).delete().eq('id', id); if (error) throw error; }
async function dbCnt(tbl, opts = {}) {
  let q = sb.from(tbl).select('id', { count: 'exact', head: true });
  if (opts.eq)  Object.entries(opts.eq).forEach(([k, v]) => { q = q.eq(k, v); });
  if (opts.neq) Object.entries(opts.neq).forEach(([k, v]) => { q = q.neq(k, v); });
  if (opts.lim) q = q.limit(1);
  const { count } = await q;
  return count || 0;
}

/* ── Formatters ───────────────────────────────────────────────── */
const LOCALE_MAP = {ar:'ar-SA',en:'en-GB',fr:'fr-FR',es:'es-ES',it:'it-IT',pt:'pt-BR',de:'de-DE',ru:'ru-RU',ko:'ko-KR',zh:'zh-CN',ja:'ja-JP',ur:'ur-PK'};
const fmtD = d => d ? new Date(d).toLocaleDateString(LOCALE_MAP[App.lang]||'en-GB', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';
const fmtN = n => n != null ? Number(n).toLocaleString(LOCALE_MAP[App.lang]||'en') : '—';
const esc = s => String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const isOD = (d, s) => d && !['closed', 'done', 'resolved'].includes(s) && new Date(d) < new Date();

function priBadge(p) {
  const cls = { low: 'bg', medium: 'bb', high: 'by', critical: 'br' };
  const keyMap = { low:'pri_low', medium:'pri_medium', high:'pri_high', critical:'pri_critical' };
  const label = (typeof tl==='function' && keyMap[p]) ? tl(keyMap[p]) : p;
  return `<span class="badge ${cls[p]||'bg'}">${label}</span>`;
}
function stBadge(s) {
  const cls = { open:'bg', new:'bg', planning:'bg', in_progress:'bb', assigned:'bb', pending_review:'by', pending_verification:'by', closed:'bgn', resolved:'bgn', done:'bgn', overdue:'br', returned:'br', escalated:'br', assessment:'bb', review:'by', evidence_collection:'bb', approval:'by' };
  const keyMap = { open:'st_open', new:'st_new', in_progress:'st_in_progress', closed:'st_closed', resolved:'st_resolved', done:'st_closed', overdue:'st_overdue', returned:'st_returned', escalated:'st_escalated', pending_review:'st_pending', pending_verification:'st_pending', assigned:'st_pending' };
  const label = (typeof tl==='function' && keyMap[s]) ? tl(keyMap[s]) : s;
  return `<span class="badge ${cls[s]||'bg'}">${label}</span>`;
}
function progBar(pct, cl = '') {
  const c = cl || (pct >= 80 ? 'grn' : pct >= 50 ? '' : 'red');
  return `<div class="prog"><div class="pf ${c}" style="width:${pct}%"></div></div>`;
}
const skR = (n = 4) => Array.from({ length: n }, () => '<div class="sk skr"></div>').join('');
const emptyEl = (msg, btn = '') => `<div class="empty"><div class="ei">📭</div><p>${msg||(typeof tl==='function'?tl('msg_no_data'):'No data')}</p>${btn}</div>`;

/* ── Canvas Animations ────────────────────────────────────────── */
function initCanvas(id, type, color) {
  const cv = document.getElementById(id); if (!cv) return;
  const cx = cv.getContext('2d');
  let W, H, nodes = [], pts = [], t = 0;
  function resize() { const r = cv.parentElement.getBoundingClientRect(); W = cv.width = r.width; H = cv.height = r.height; build(); }
  function build() {
    nodes = []; pts = [];
    if (type === 'net') { const n = Math.floor(W*H/4500); for (let i=0;i<n;i++) nodes.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*2.5+1,p:Math.random()*6.28,hub:Math.random()>.8}); }
    if (type === 'energy') { for (let i=0;i<50;i++) pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()>.5?1:-1)*(Math.random()*1.5+.5),vy:(Math.random()-.5)*.3,r:Math.random()*2+1,trail:[],mt:14}); }
    if (type === 'grid') { const cols=Math.floor(W/88)+1,rows=Math.floor(H/58)+1; for(let c=0;c<cols;c++) for(let r=0;r<rows;r++) nodes.push({x:c*88+44,y:r*58+29,hub:Math.random()>.72}); }
    if (type === 'city') { const n=Math.floor(W*H/6500); for(let i=0;i<n;i++) nodes.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*.9+.5,p:Math.random()*6.28,hub:Math.random()>.82}); }
    if (type === 'radar') { nodes = [{cx:W/2,cy:H/2,R:Math.min(W,H)*.42,angle:0}]; }
  }
  const h2 = v => Math.floor(v*255).toString(16).padStart(2,'0');
  function draw() {
    t += .008; cx.clearRect(0,0,W,H);
    if (type==='net') {
      cx.fillStyle='rgba(0,0,0,.05)';cx.fillRect(0,0,W,H);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;n.p+=.018;if(n.x<0||n.x>W)n.vx*=-1;if(n.y<0||n.y>H)n.vy*=-1;});
      for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d>130)continue;const al=(1-d/130)*.22;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.strokeStyle=color+h2(al);cx.lineWidth=.6;cx.stroke();const fp=((t*.9)%1);cx.beginPath();cx.arc(a.x+(b.x-a.x)*fp,a.y+(b.y-a.y)*fp,1.8,0,6.28);cx.fillStyle=color+h2(al*2);cx.fill();}
      nodes.forEach(n=>{const g=Math.sin(n.p)*.4+.6;if(n.hub){cx.beginPath();cx.arc(n.x,n.y,n.r*3,0,6.28);cx.strokeStyle=color+h2(.15*g);cx.lineWidth=1;cx.stroke();}cx.beginPath();cx.arc(n.x,n.y,n.r,0,6.28);cx.fillStyle=color+h2(n.hub?.85:.6*g);cx.fill();});
    }
    if (type==='energy') {
      cx.fillStyle='rgba(0,0,0,.07)';cx.fillRect(0,0,W,H);
      pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy+Math.sin(t+p.x*.01)*.45;if(p.x<-10)p.x=W+10;if(p.x>W+10)p.x=-10;if(p.y<0||p.y>H)p.vy*=-1;p.trail.unshift({x:p.x,y:p.y});if(p.trail.length>p.mt)p.trail.pop();p.trail.forEach((pt,i)=>{const al=(1-i/p.mt)*.5;cx.beginPath();cx.arc(pt.x,pt.y,p.r*(1-i/p.mt*.65),0,6.28);cx.fillStyle=color+h2(al);cx.fill();});cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.28);cx.fillStyle=color+'bb';cx.fill();});
    }
    if (type==='grid') {
      cx.fillStyle='rgba(0,0,0,.06)';cx.fillRect(0,0,W,H);
      for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j];if(Math.abs(a.x-b.x)>90||Math.abs(a.y-b.y)>60)continue;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.strokeStyle=color+h2(.18);cx.lineWidth=.6;cx.stroke();if(Math.random()<.002)pts.push({ax:a.x,ay:a.y,bx:b.x,by:b.y,p:0});}
      pts=pts.filter(p=>{p.p+=.04;return p.p<1;});
      pts.forEach(p=>{const x=p.ax+(p.bx-p.ax)*p.p,y=p.ay+(p.by-p.ay)*p.p;cx.beginPath();cx.arc(x,y,3,0,6.28);cx.fillStyle=color+h2(1-p.p);cx.fill();});
      nodes.forEach(n=>{const g=Math.sin(t+n.x*.02)*.5+.5;if(n.hub){cx.beginPath();cx.arc(n.x,n.y,7,0,6.28);cx.fillStyle=color+h2(.1*g);cx.fill();}cx.beginPath();cx.arc(n.x,n.y,n.hub?3:1.5,0,6.28);cx.fillStyle=color+(n.hub?'cc':'66');cx.fill();});
    }
    if (type==='city') {
      cx.fillStyle='rgba(0,0,0,.06)';cx.fillRect(0,0,W,H);
      nodes.forEach(n=>{n.p+=.014;});
      for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d>105)continue;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.strokeStyle=color+h2((1-d/105)*.11);cx.lineWidth=.5;cx.stroke();}
      if(Math.random()<.04){const n=nodes[Math.floor(Math.random()*nodes.length)];const adj=nodes.filter(m=>Math.hypot(m.x-n.x,m.y-n.y)<105&&m!==n);if(adj.length)pts.push({ax:n.x,ay:n.y,bx:adj[0].x,by:adj[0].y,p:0});}
      pts=pts.filter(p=>{p.p+=.025;return p.p<1;});
      pts.forEach(p=>{const x=p.ax+(p.bx-p.ax)*p.p,y=p.ay+(p.by-p.ay)*p.p;cx.beginPath();cx.arc(x,y,2.5,0,6.28);cx.fillStyle=color+h2(.9-p.p*.7);cx.fill();});
      nodes.forEach(n=>{const g=Math.sin(n.p)*.4+.6;if(n.hub){cx.beginPath();cx.arc(n.x,n.y,8,0,6.28);cx.strokeStyle=color+h2(.1*g);cx.lineWidth=1;cx.stroke();}cx.beginPath();cx.arc(n.x,n.y,n.r*(n.hub?2.5:1),0,6.28);cx.fillStyle=color+(n.hub?'cc':'66');cx.fill();});
    }
    if (type==='radar') {
      const nd=nodes[0];nd.angle+=.024;
      for(let r=.33;r<=1;r+=.33){cx.beginPath();cx.arc(nd.cx,nd.cy,nd.R*r,0,6.28);cx.strokeStyle=color+h2(.18);cx.lineWidth=.7;cx.stroke();}
      cx.strokeStyle=color+h2(.12);cx.lineWidth=.5;cx.beginPath();cx.moveTo(nd.cx-nd.R,nd.cy);cx.lineTo(nd.cx+nd.R,nd.cy);cx.stroke();cx.beginPath();cx.moveTo(nd.cx,nd.cy-nd.R);cx.lineTo(nd.cx,nd.cy+nd.R);cx.stroke();
      for(let i=0;i<60;i++){const a=nd.angle-i*.05,al=Math.max(0,(60-i)/60)*.42;cx.beginPath();cx.moveTo(nd.cx,nd.cy);cx.arc(nd.cx,nd.cy,nd.R,a,a+.06);cx.closePath();cx.fillStyle=color+h2(al);cx.fill();}
      cx.beginPath();cx.moveTo(nd.cx,nd.cy);cx.lineTo(nd.cx+Math.cos(nd.angle)*nd.R,nd.cy+Math.sin(nd.angle)*nd.R);cx.strokeStyle=color+'dd';cx.lineWidth=1.5;cx.stroke();
      cx.beginPath();cx.arc(nd.cx,nd.cy,4,0,6.28);cx.fillStyle=color;cx.fill();
    }
    requestAnimationFrame(draw);
  }
  resize(); window.addEventListener('resize', resize); draw();
}

/* ── Division health ──────────────────────────────────────────── */
async function loadHealth() {
  try {
    const sess = getStoredSession();
    const res = await fetch(`${SB_URL}/rest/v1/v_division_health?select=*`, {
      headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${sess?.access_token || ''}` }
    });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (e) { return []; }
}

/* ── Nav builder ──────────────────────────────────────────────── */
function buildNav(items, active) {
  window._currentNav = items;
  window._currentPage = active;
  const el = document.getElementById('navEl'); if (!el) return;
  el.innerHTML = items.map(item => {
    if (item.g) return `<div class="ng">${App.lang==='ar'?item.g:(item.ge||item.g)}</div>`;
    const badge = item.badge ? `<span class="badge">${item.badge}</span>` : '';
    // Use tl() if tlKey provided, else fall back to ar/en
    const label = (item.tlKey && typeof tl==='function') ? tl(item.tlKey) : (App.lang==='ar'?item.ar:item.en);
    return `<button class="ni ${item.k===active?'on':''}" onclick="${item.fn||`go('${item.k}')`}">
      <span class="ic">${item.ic}</span><span>${label}</span>${badge}
    </button>`;
  }).join('');
}

/* ── Confirm ──────────────────────────────────────────────────── */
function confirm2(msg, fn) {
  openModal(`<div class="mh"><h3>⚠ تأكيد</h3><button class="mx" onclick="closeModal()">×</button></div>
    <div class="mbd"><p style="font-size:14px">${msg}</p></div>
    <div class="mf"><button class="btn" onclick="closeModal()">إلغاء</button>
    <button class="btn d" onclick="closeModal();(${fn.toString()})()">نعم</button></div>`);
}

/* ── Log ──────────────────────────────────────────────────────── */
async function logAct(action, etype, eid, details = {}) {
  try {
    if (App.profile) {
      const sess = getStoredSession();
      await fetch(`${SB_URL}/rest/v1/activity_log`, {
        method: 'POST',
        headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${sess?.access_token||''}`, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
        body: JSON.stringify({ user_id: App.profile.id, action, entity_type: etype, entity_id: eid, details })
      });
    }
  } catch (e) {}
}

/* ── Page init ────────────────────────────────────────────────── */
async function initPage(opts = {}) {
  const p = await initAuth(opts.roles); if (!p) return null;
  // App.lang is already set correctly by initAuth
  setLang(App.lang);
  startClock();
  // Translate sidebar static text
  setTimeout(() => {
    if(typeof translateDOM === 'function' && App.lang !== 'ar') {
      translateDOM(document.querySelector('.sb'));
    }
  }, 100);
  return p;
}

/* ── SE Logo ──────────────────────────────────────────────────── */
const LOGO = '<img src="se-logo.png.PNG" alt="Saudi Energy" style="height:32px;width:auto;object-fit:contain;display:block">';

/* ── Export ───────────────────────────────────────────────────── */
Object.assign(window, { t2,
  App, sb, DIVS, PORTALS, T, t,
  setLang, toggleLang, doLogout,
  initAuth, initPage, _renderBadge, startClock,
  toast, openModal, closeModal, mv, ms,
  dbList, dbGet, dbIns, dbUpd, dbDel, dbCnt,
  fmtD, fmtN, esc, isOD, priBadge, stBadge, progBar, skR, emptyEl,
  initCanvas, loadHealth, buildNav, confirm2, logAct, LOGO,
  getStoredSession, storeSession, clearSession
});
