'use strict';
/* ═══════════════════════════════════════════════════════════════
   Saudi Energy · OE Command Center · app.js v6
   Pure Fetch — Fully Restored 12-Language Support & Safe Storage
═══════════════════════════════════════════════════════════════ */

const SB_URL = 'https://ekywcrlcjgbjtwnjozov.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVreXdjcmxjamdianR3bmpvem92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4OTg5MzcsImV4cCI6MjA5NzQ3NDkzN30.TQxP2SUjaxSjdsBadmgHIBSVQ5B-YOLkvnl1JwyhISI';
const SB_SESS_KEY = 'sb-ekywcrlcjgbjtwnjozov-auth-token';

/* ── Safe Storage helpers ─────────────────────────────────────── */
function lsGet(k, def) { try { return localStorage.getItem(k) || def; } catch (e) { return def; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
function lsRem(k) { try { localStorage.removeItem(k); } catch (e) {} }

function getStoredSession() {
  try {
    const direct = lsGet(SB_SESS_KEY);
    if (direct) { const v = JSON.parse(direct); if (v?.access_token) return v; }
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
function storeSession(s) { lsSet(SB_SESS_KEY, JSON.stringify(s)); }
function clearSession() {
  try {
    Object.keys(localStorage).filter(k => k.includes('supabase') || k.includes('sb-')).forEach(k => localStorage.removeItem(k));
  } catch(e) {}
}
function isSessionValid(sess) {
  if (!sess?.access_token) return false;
  try { const p = JSON.parse(atob(sess.access_token.split('.')[1])); return !p.exp || p.exp * 1000 > Date.now(); } catch (e) { return true; }
}

/* ── Query Builder ────────────────────────────────────────────── */
class QB {
  constructor(table) { this._t = table; this._ps = []; this._m = 'GET'; this._body = null; this._sel = '*'; this._single = false; this._countOnly = false; this._head = false; this._prefer = null; }
  select(s = '*', opts = {}) { this._sel = s; if (opts.count) this._countOnly = true; if (opts.head) { this._head = true; this._countOnly = true; } return this; }
  eq(c, v)    { this._ps.push(`${c}=eq.${encodeURIComponent(String(v))}`); return this; }
  neq(c, v)   { this._ps.push(`${c}=neq.${encodeURIComponent(String(v))}`); return this; }
  in(c, vals) { this._ps.push(`${c}=in.(${vals.map(v => encodeURIComponent(String(v))).join(',')})`); return this; }
  ilike(c, p) { this._ps.push(`${c}=ilike.${encodeURIComponent(p)}`); return this; }
  order(c, opts = {}) { this._ps.push(`order=${c}.${opts.ascending ? 'asc' : 'desc'}`); return this; }
  limit(n)    { this._ps.push(`limit=${n}`); return this; }
  single()    { this._single = true; if (!this._ps.some(p => p.startsWith('limit'))) this._ps.push('limit=1'); return this._run(); }
  insert(row) { this._m = 'POST'; this._body = Array.isArray(row) ? row : [row]; this._prefer = 'return=representation'; return this._run(); }
  update(p)   { this._m = 'PATCH'; this._body = p; this._prefer = 'return=representation'; return this; }
  delete()    { this._m = 'DELETE'; this._prefer = 'return=minimal'; return this; }
  async _run() {
    const sess = getStoredSession(); const token = sess?.access_token || '';
    const params = [`select=${this._sel}`, ...this._ps];
    const headers = { 'apikey': SB_KEY, 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
    if (this._prefer) headers['Prefer'] = this._prefer;
    if (this._countOnly) headers['Prefer'] = (headers['Prefer'] ? headers['Prefer'] + ',' : '') + 'count=exact';
    try {
      const res = await fetch(`${SB_URL}/rest/v1/${this._t}?${params.join('&')}`, { method: this._m, headers, body: this._body ? JSON.stringify(this._body) : undefined });
      let count = null;
      if (this._countOnly) { const cr = res.headers.get('content-range'); count = cr ? (parseInt(cr.split('/')[1]) || 0) : 0; if (this._head) return { data: null, error: null, count }; }
      const text = await res.text(); let data; try { data = JSON.parse(text); } catch (e) { data = text; }
      if (!res.ok) return { data: null, error: { message: data.message || data.error || `HTTP ${res.status}` }, count };
      const arr = Array.isArray(data) ? data : (data ? [data] : []);
      if (this._single) return { data: arr[0] || null, error: null, count };
      return { data: arr, error: null, count };
    } catch (e) { return { data: null, error: { message: e.message }, count: null }; }
  }
  then(ok, err) { return this._run().then(ok, err); }
  catch(fn)     { return this._run().catch(fn); }
}

const sb = { 
  from: (t) => new QB(t),
  auth: {
    getSession: async () => { const s = getStoredSession(); return { data: { session: isSessionValid(s)?s:null }, error: null }; },
    signInWithPassword: async ({ email, password }) => {
      try {
        const res = await fetch(`${SB_URL}/auth/v1/token?grant_type=password`, { method: 'POST', headers: { 'apikey': SB_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
        const d = await res.json();
        if (d.error || d.error_description || d.msg) return { data: null, error: { message: d.error_description || d.msg || d.error || 'Invalid credentials' } };
        storeSession(d); return { data: { user: d.user, session: d }, error: null };
      } catch (e) { return { data: null, error: { message: e.message } }; }
    },
    signOut: async () => {
      try { const s = getStoredSession(); if (s?.access_token) await fetch(`${SB_URL}/auth/v1/logout`, { method: 'POST', headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${s.access_token}` } }); } catch (e) {}
      clearSession(); return { error: null };
    }
  }
};
if(typeof window !== 'undefined') window.sb = sb; // Expose instantly for index.html

/* ── App State & i18n ─────────────────────────────────────────── */
const LANG_VER = '3';
if(lsGet('se_lang_ver') !== LANG_VER) { lsRem('se_lang_v2'); lsSet('se_lang_ver', LANG_VER); }

// DEFAULT to 'en'
const App = { user: null, profile: null, lang: lsGet('se_lang_v2', 'en') };

const LOCALE_MAP = { ar:'ar-SA', en:'en-GB', fr:'fr-FR', es:'es-ES', it:'it-IT', pt:'pt-BR', de:'de-DE', ru:'ru-RU', ko:'ko-KR', zh:'zh-CN', ja:'ja-JP', ur:'ur-PK' };

// Universal dynamic translation mapping 12 languages via DOM_MAP and TR
const t2 = (ar, en) => {
  if (App.lang === 'ar') return ar;
  if (App.lang === 'en') return en;
  if (typeof DOM_MAP !== 'undefined' && DOM_MAP[ar] && DOM_MAP[ar][App.lang]) return DOM_MAP[ar][App.lang];
  if (typeof TR !== 'undefined') {
    for (const key of Object.keys(TR)) {
      if (TR[key] && TR[key].ar === ar && TR[key][App.lang]) return TR[key][App.lang];
    }
  }
  return en; // Fallback
};

const tl = k => (typeof TR !== 'undefined' && TR[k]) ? (TR[k][App.lang] || TR[k]['en'] || k) : k;

function setLang(l) {
  App.lang = l; lsSet('se_lang_v2', l);
  document.documentElement.lang = l;
  document.documentElement.dir = (typeof LANGS !== 'undefined' && LANGS[l]) ? LANGS[l].dir : (l==='ar'||l==='ur'?'rtl':'ltr');
}

function toggleLang() {
  const newLang = App.lang === 'ar' ? 'en' : 'ar';
  setLang(newLang);
  if(typeof window.buildNav === 'function' && window._currentNav && window._currentPage) {
    buildNav(window._currentNav, window._currentPage);
  }
  const ptEl = document.getElementById('pgtitle') || document.getElementById('pgTitle');
  if(ptEl && window._currentNav && window._currentPage) {
    const item = window._currentNav.find(n=>n.k===window._currentPage);
    if(item) ptEl.textContent = newLang==='ar' ? item.ar : item.en;
  }
  if(window._currentPage && window.PAGES && window.PAGES[window._currentPage]) {
    const ct = document.getElementById('pgContent');
    if(ct) { ct.innerHTML = '<div class="fade" id="pg"></div>'; window.PAGES[window._currentPage](document.getElementById('pg')); }
  }
  if(window.renderUsers && window._currentPage === 'users') renderUsers();
  if(window.renderDivs && window._currentPage === 'divs') renderDivs();
  if(window.renderSettings && window._currentPage === 'settings') renderSettings();
  if(window.renderHealth && window._currentPage === 'health') renderHealth();
  if(window.translateAdminNav) translateAdminNav();
}

/* ── Config ───────────────────────────────────────────────────── */
const DIVS = {
  governance:       { ar:'الحوكمة والتقييم',   en:'Governance',        color:'#7C3AED', icon:'⚖️' },
  generation:       { ar:'التوليد',             en:'Generation',        color:'#F59E0B', icon:'⚡' },
  national_grid:    { ar:'الشبكة الوطنية',      en:'National Grid',     color:'#0EA5E9', icon:'🔌' },
  distribution:     { ar:'التوزيع',             en:'Distribution',      color:'#10B981', icon:'🏘️' },
  technical_alerts: { ar:'التنبيهات الفنية',    en:'Tech Alerts',       color:'#EF4444', icon:'⚠️' },
};
const PORTALS = { admin:'admin.html', director:'department.html', governance_manager:'governance.html', generation_manager:'generation.html', national_grid_manager:'national-grid.html', distribution_manager:'distribution.html', technical_alerts_manager:'technical-alerts.html', employee:'employee.html' };
const ROLE_AR = { admin:'مشرف النظام', director:'مدير الإدارة', governance_manager:'مدير الحوكمة', generation_manager:'مدير التوليد', national_grid_manager:'مدير النقل', distribution_manager:'مدير التوزيع', technical_alerts_manager:'مدير التنبيهات', employee:'موظف' };

/* ── PreRender & UI Builders ──────────────────────────────────── */
function preRender() {
  document.documentElement.lang = App.lang;
  document.documentElement.dir = (App.lang === 'ar' || App.lang === 'ur') ? 'rtl' : 'ltr';
}
preRender();

async function initAuth(roles) {
  const sess = getStoredSession();
  if (!sess || !isSessionValid(sess)) { location.href = 'index.html'; return null; }
  let userId = sess.user?.id;
  if (!userId) { try { userId = JSON.parse(atob(sess.access_token.split('.')[1])).sub; } catch(e){} }
  if (!userId) { location.href = 'index.html'; return null; }

  try {
    const res = await fetch(`${SB_URL}/rest/v1/profiles?id=eq.${userId}&select=*&limit=1`, { headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${sess.access_token}` } });
    const data = await res.json();
    const p = Array.isArray(data) ? data[0] : null;
    if (!p) return null;
    App.user = sess.user || { id: userId }; App.profile = p;
    if (roles) {
      const ok = Array.isArray(roles) ? roles.includes(p.role) : p.role === roles;
      if (!ok && p.role !== 'admin') { location.href = PORTALS[p.role] || 'index.html'; return null; }
    }
    _renderBadge(); setLang(App.lang); return p;
  } catch (e) { return null; }
}

async function doLogout() { clearSession(); location.href = 'index.html'; }

function _renderBadge() {
  const el = document.getElementById('ubEl'); if (!el) return;
  const p = App.profile; const init = (p.full_name || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const dc = DIVS[p.division]?.color || '#2563EB';
  el.innerHTML = `<div class="ub-av" style="background:${dc}22;color:${dc}">${init}</div>
    <div style="flex:1;min-width:0"><div class="ub-nm">${esc(App.lang==='ar'?p.full_name||'':p.full_name_en||p.full_name||'')}</div>
    <div class="ub-rl">${t2(ROLE_AR[p.role]||p.role, p.role)}</div></div>`;
}

function startClock() {
  const ct = document.getElementById('ct'), cd = document.getElementById('cd');
  if (!ct && !cd) return;
  setInterval(() => {
    const n = new Date(), h = n.getHours(), l = App.lang;
    const ampm = h < 12 ? (l==='ar'||l==='ur'?'ص':'AM') : (l==='ar'||l==='ur'?'م':'PM');
    if (ct) ct.textContent = `${String(h%12||12).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')} ${ampm}`;
    if (cd) {
      try { cd.textContent = n.toLocaleDateString(LOCALE_MAP[l] || 'en-GB', {weekday:'long',year:'numeric',month:'long',day:'numeric'}); }
      catch(e) { cd.textContent = n.toDateString(); }
    }
  }, 1000);
}

function toast(msg, type = 'i') {
  let c = document.getElementById('tc'); if (!c) { c = document.createElement('div'); c.id = 'tc'; document.body.appendChild(c); }
  const el = document.createElement('div'); el.className = `toast ${type}`;
  el.innerHTML = `<span>${{s:'✓',e:'✕',i:'ℹ',w:'⚠'}[type]||'•'}</span><span style="flex:1">${msg}</span><button style="opacity:.5;cursor:pointer;border:none;background:none;color:inherit;font-size:16px;" onclick="this.parentElement.remove()">×</button>`;
  c.appendChild(el); setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .35s'; }, 3150);
  setTimeout(() => el.remove(), 3500);
}

function openModal(html, cls = '') {
  closeModal(); const bd = document.createElement('div'); bd.className = 'mbg'; bd.id = 'M';
  bd.innerHTML = `<div class="modal ${cls}">${html}</div>`;
  bd.addEventListener('click', e => { if (e.target === bd) closeModal(); }); document.body.appendChild(bd);
}
function closeModal() { document.getElementById('M')?.remove(); }

const mv = id => document.getElementById(id)?.value?.trim() || '';
const ms = (id, v) => { const el = document.getElementById(id); if (el) el.value = v ?? ''; };

const fmtD = d => d ? new Date(d).toLocaleDateString(LOCALE_MAP[App.lang]||'en-GB', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';
const fmtN = n => n != null ? Number(n).toLocaleString(LOCALE_MAP[App.lang]||'en') : '—';
const esc = s => String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const isOD = (d, s) => d && !['closed', 'done', 'resolved'].includes(s) && new Date(d) < new Date();

function priBadge(p) {
  const keyMap = { low:'pri_low', medium:'pri_medium', high:'pri_high', critical:'pri_critical' };
  const lbl = (typeof tl==='function' && keyMap[p]) ? tl(keyMap[p]) : (t2(p, p));
  return `<span class="badge ${{low:'bg',medium:'bb',high:'by',critical:'br'}[p]||'bg'}">${lbl}</span>`;
}
function stBadge(s) {
  const keyMap = { open:'st_open', new:'st_new', in_progress:'st_in_progress', closed:'st_closed', resolved:'st_resolved', done:'st_closed', overdue:'st_overdue', returned:'st_returned', escalated:'st_escalated', pending_review:'st_pending', pending_verification:'st_pending', assigned:'st_pending' };
  const lbl = (typeof tl==='function' && keyMap[s]) ? tl(keyMap[s]) : (t2(s, s));
  return `<span class="badge ${{open:'bg',new:'bg',in_progress:'bb',closed:'bgn',resolved:'bgn',done:'bgn',overdue:'br',returned:'br',escalated:'br',pending_review:'by',pending_verification:'by'}[s]||'bg'}">${lbl}</span>`;
}
function progBar(pct, cl = '') { return `<div class="prog"><div class="pf ${cl || (pct >= 80 ? 'grn' : pct >= 50 ? '' : 'red')}" style="width:${pct}%"></div></div>`; }
const skR = (n = 4) => Array.from({ length: n }, () => '<div class="sk skr"></div>').join('');
const emptyEl = (msg, btn = '') => `<div class="empty"><div class="ei">📭</div><p>${msg||t2('لا بيانات','No data')}</p>${btn}</div>`;

function buildNav(items, active) {
  window._currentNav = items; window._currentPage = active;
  const el = document.getElementById('navEl'); if (!el) return;
  el.innerHTML = items.map(item => {
    if (item.g) return `<div class="ng">${t2(item.g, item.ge||item.g)}</div>`;
    return `<button class="ni ${item.k===active?'on':''}" onclick="document.querySelector('.sb')?.classList.remove('show');${item.fn||`go('${item.k}')`}">
      <span class="ic">${item.ic}</span><span>${t2(item.ar, item.en)}</span>${item.badge?`<span class="badge">${item.badge}</span>`:''}
    </button>`;
  }).join('');
}

function confirm2(msg, fn) {
  openModal(`<div class="mh"><h3>⚠ ${t2('تأكيد','Confirm')}</h3><button class="mx" onclick="closeModal()">×</button></div>
    <div class="mbd"><p style="font-size:14px">${msg}</p></div>
    <div class="mf"><button class="btn" onclick="closeModal()">${t2('إلغاء','Cancel')}</button>
    <button class="btn d" onclick="closeModal();(${fn.toString()})()">${t2('نعم','Yes')}</button></div>`);
}

async function logAct(action, etype, eid, details = {}) {
  try { if (App.profile) await sb.from('activity_log').insert({ user_id: App.profile.id, action, entity_type: etype, entity_id: eid, details }); } catch (e) {}
}

async function loadHealth() {
  try { const sess = getStoredSession(); const res = await fetch(`${SB_URL}/rest/v1/v_division_health?select=*`, { headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${sess?.access_token || ''}` } }); const data = await res.json(); return Array.isArray(data) ? data : []; } catch (e) { return []; }
}

function initCanvas(id, type, color) {
  const cv = document.getElementById(id); if (!cv) return;
  const cx = cv.getContext('2d'); let W, H, nodes = [], pts = [], t = 0;
  function resize() { const r = cv.parentElement.getBoundingClientRect(); W = cv.width = r.width; H = cv.height = r.height; build(); }
  function build() {
    nodes = []; pts = [];
    if (type === 'net') { const n = Math.floor(W*H/4500); for (let i=0;i<n;i++) nodes.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*2.5+1,p:Math.random()*6.28,hub:Math.random()>.8}); }
    if (type === 'grid') { const cols=Math.floor(W/88)+1,rows=Math.floor(H/58)+1; for(let c=0;c<cols;c++) for(let r=0;r<rows;r++) nodes.push({x:c*88+44,y:r*58+29,hub:Math.random()>.72}); }
    if (type === 'energy') { for (let i=0;i<46;i++) pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()>.5?1:-1)*(Math.random()*1.5+.5),vy:(Math.random()-.5)*.3,r:Math.random()*2+1,trail:[],mt:14}); }
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
      nodes.forEach(n=>{const g=Math.sin(n.p)*.4+.6;if(n.hub){cx.beginPath();cx.arc(n.x,n.y,n.r*3,0,6.28);cx.strokeStyle=color+h2(.15*g);cx.stroke();}cx.beginPath();cx.arc(n.x,n.y,n.r,0,6.28);cx.fillStyle=color+h2(n.hub?.85:.6*g);cx.fill();});
    }
    if (type==='grid') {
      cx.fillStyle='rgba(0,0,0,.06)';cx.fillRect(0,0,W,H);
      for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j];if(Math.abs(a.x-b.x)>90||Math.abs(a.y-b.y)>60)continue;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.strokeStyle=color+h2(.18);cx.lineWidth=.6;cx.stroke();}
      nodes.forEach(n=>{const g=Math.sin(t+n.x*.02)*.5+.5;if(n.hub){cx.beginPath();cx.arc(n.x,n.y,7,0,6.28);cx.fillStyle=color+h2(.1*g);cx.fill();}cx.beginPath();cx.arc(n.x,n.y,n.hub?3:1.5,0,6.28);cx.fillStyle=color+(n.hub?'cc':'66');cx.fill();});
    }
    if (type==='energy') {
      cx.fillStyle='rgba(0,0,0,.07)';cx.fillRect(0,0,W,H);
      pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy+Math.sin(t+p.x*.01)*.45;if(p.x<-10)p.x=W+10;if(p.x>W+10)p.x=-10;if(p.y<0||p.y>H)p.vy*=-1;p.trail.unshift({x:p.x,y:p.y});if(p.trail.length>p.mt)p.trail.pop();p.trail.forEach((pt,i)=>{const al=(1-i/p.mt)*.5;cx.beginPath();cx.arc(pt.x,pt.y,p.r*(1-i/p.mt*.65),0,6.28);cx.fillStyle=color+h2(al);cx.fill();});cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.28);cx.fillStyle=color+'bb';cx.fill();});
    }
    if (type==='city') {
      cx.fillStyle='rgba(0,0,0,.06)';cx.fillRect(0,0,W,H);
      nodes.forEach(n=>{n.p+=.014;});
      for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d>105)continue;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.strokeStyle=color+h2((1-d/105)*.11);cx.lineWidth=.5;cx.stroke();}
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

async function initPage(opts = {}) {
  const p = await initAuth(opts.roles); if (!p) return null;
  setLang(App.lang); startClock(); return p;
}

const LOGO = '<img src="se-logo.png.PNG" alt="Saudi Energy" style="height:32px;width:auto;object-fit:contain;display:block" onerror="this.style.display=\'none\'">';

// Expose QB helpers too
const dbList = async (t, o) => await sb.from(t).select(o.sel||'*', o.cnt?{count:true}:{}).then(r=>r);
const dbGet = async (t, id) => { const r=await sb.from(t).select('*').eq('id',id).single(); return r.data; };
const dbIns = async (t, row) => { const r=await sb.from(t).insert(row); return Array.isArray(r.data)?r.data[0]:r.data; };
const dbUpd = async (t, id, p) => { const r=await sb.from(t).update(p).eq('id',id); return Array.isArray(r.data)?r.data[0]:r.data; };
const dbDel = async (t, id) => { await sb.from(t).delete().eq('id',id); };
const dbCnt = async (t, o) => { let q=sb.from(t).select('id',{count:true,head:true}); if(o.eq)Object.entries(o.eq).forEach(([k,v])=>q=q.eq(k,v)); if(o.neq)Object.entries(o.neq).forEach(([k,v])=>q=q.neq(k,v)); const r=await q; return r.count||0; };

Object.assign(window, { t2, App, sb, DIVS, PORTALS, setLang, toggleLang, doLogout, initAuth, initPage, _renderBadge, startClock, toast, openModal, closeModal, mv, ms, dbList, dbGet, dbIns, dbUpd, dbDel, dbCnt, fmtD, fmtN, esc, isOD, priBadge, stBadge, progBar, skR, emptyEl, initCanvas, loadHealth, buildNav, confirm2, logAct, LOGO, getStoredSession, storeSession, clearSession, LOCALE_MAP, tl });


```
