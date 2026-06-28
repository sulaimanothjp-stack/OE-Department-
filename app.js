'use strict';
/* ═══════════════════════════════════════════════════════════════
   Saudi Energy · OE Command Center · app.js v5.0
   Pure Fetch — Full 12-Language i18n + Mobile UI
═══════════════════════════════════════════════════════════════ */

const SB_URL = 'https://ekywcrlcjgbjtwnjozov.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVreXdjcmxjamdianR3bmpvem92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4OTg5MzcsImV4cCI6MjA5NzQ3NDkzN30.TQxP2SUjaxSjdsBadmgHIBSVQ5B-YOLkvnl1JwyhISI';
const SB_SESS_KEY = 'sb-ekywcrlcjgbjtwnjozov-auth-token';

/* ── Session helpers ──────────────────────────────────────────── */
function getStoredSession() {
  try {
    const direct = localStorage.getItem(SB_SESS_KEY);
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
function storeSession(s) { try { localStorage.setItem(SB_SESS_KEY, JSON.stringify(s)); } catch (e) {} }
function clearSession() { Object.keys(localStorage).filter(k => k.includes('supabase') || k.includes('sb-')).forEach(k => localStorage.removeItem(k)); }
function isSessionValid(sess) {
  if (!sess?.access_token) return false;
  try { const p = JSON.parse(atob(sess.access_token.split('.')[1])); return !p.exp || p.exp * 1000 > Date.now(); } catch (e) { return true; }
}

/* ── Language Version Reset ───────────────────────────────────── */
const LANG_VER = '3';
if(localStorage.getItem('se_lang_ver') !== LANG_VER) {
  localStorage.removeItem('se_lang_v2');
  localStorage.setItem('se_lang_ver', LANG_VER);
}

/* ── App State ────────────────────────────────────────────────── */
const App = { user: null, profile: null, lang: localStorage.getItem('se_lang_v2') || 'en' };

/* ── Config ───────────────────────────────────────────────────── */
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

/* ── 12-Language Locale Map ───────────────────────────────────── */
const LOCALE_MAP = {
  ar:'ar-SA', en:'en-GB', fr:'fr-FR', es:'es-ES', it:'it-IT',
  pt:'pt-BR', de:'de-DE', ru:'ru-RU', ko:'ko-KR', zh:'zh-CN',
  ja:'ja-JP', ur:'ur-PK'
};

/* ── i18n Helpers ─────────────────────────────────────────────── */
// t2: bilingual with DOM_MAP fallback for 12 languages
const t2 = (ar, en) => {
  if(App.lang === 'ar') return ar;
  if(App.lang === 'en') return en;
  if(typeof DOM_MAP !== 'undefined' && DOM_MAP[ar] && DOM_MAP[ar][App.lang])
    return DOM_MAP[ar][App.lang];
  return en;
};

// tl: key-based lookup from TR dictionary
const tl = (key) => {
  if(typeof TR !== 'undefined' && TR[key] && TR[key][App.lang])
    return TR[key][App.lang];
  if(typeof TR !== 'undefined' && TR[key]) return TR[key].en || key;
  return key;
};

function setLang(l) {
  App.lang = l;
  localStorage.setItem('se_lang_v2', l);
  localStorage.setItem('se_lang_ver', LANG_VER);
  document.documentElement.lang = l;
  document.documentElement.dir = (l === 'ar' || l === 'ur') ? 'rtl' : 'ltr';
  // Translate static DOM elements with data-ar/data-en
  document.querySelectorAll('[data-ar][data-en]').forEach(el => {
    el.textContent = l === 'ar' ? el.dataset.ar : el.dataset.en;
  });
}

function toggleLang() {
  const nl = App.lang === 'ar' ? 'en' : 'ar';
  setLang(nl);
  if(typeof buildNav === 'function' && window._currentNav && window._currentPage)
    buildNav(window._currentNav, window._currentPage);
  const ptEl = document.getElementById('pgtitle') || document.getElementById('pgTitle');
  if(ptEl && window._currentNav && window._currentPage) {
    const item = window._currentNav.find(n => n.k === window._currentPage);
    if(item) ptEl.textContent = nl === 'ar' ? item.ar : item.en;
  }
  if(window._currentPage && window.PAGES && window.PAGES[window._currentPage]) {
    const ct = document.getElementById('pgContent');
    if(ct) { ct.innerHTML = '<div class="fade" id="pg"></div>'; window.PAGES[window._currentPage](document.getElementById('pg')); }
  }
  if(window.renderUsers  && window._currentPage === 'users')    renderUsers();
  if(window.renderDivs   && window._currentPage === 'divs')     renderDivs();
  if(window.renderSettings && window._currentPage === 'settings') renderSettings();
  if(window.renderHealth && window._currentPage === 'health')   renderHealth();
  if(typeof openLangPicker !== 'undefined') {} // no-op when using globe picker
}

/* ── Query Builder ────────────────────────────────────────────── */
class QB {
  constructor(table) { this._t=table; this._ps=[]; this._m='GET'; this._body=null; this._sel='*'; this._single=false; this._countOnly=false; this._head=false; this._prefer=null; }
  select(s='*',opts={}){ this._sel=s; if(opts.count)this._countOnly=true; if(opts.head){this._head=true;this._countOnly=true;} return this; }
  eq(c,v)    { this._ps.push(`${c}=eq.${encodeURIComponent(String(v))}`); return this; }
  neq(c,v)   { this._ps.push(`${c}=neq.${encodeURIComponent(String(v))}`); return this; }
  in(c,vals) { this._ps.push(`${c}=in.(${vals.map(v=>encodeURIComponent(String(v))).join(',')})`); return this; }
  ilike(c,p) { this._ps.push(`${c}=ilike.${encodeURIComponent(p)}`); return this; }
  order(c,opts={}) { this._ps.push(`order=${c}.${opts.ascending?'asc':'desc'}`); return this; }
  limit(n)   { this._ps.push(`limit=${n}`); return this; }
  single()   { this._single=true; if(!this._ps.some(p=>p.startsWith('limit')))this._ps.push('limit=1'); return this._run(); }
  insert(row){ this._m='POST'; this._body=Array.isArray(row)?row:[row]; this._prefer='return=representation'; return this._run(); }
  update(p)  { this._m='PATCH'; this._body=p; this._prefer='return=representation'; return this; }
  delete()   { this._m='DELETE'; this._prefer='return=minimal'; return this; }
  async _run(){
    const sess=getStoredSession(); const token=sess?.access_token||'';
    const params=[`select=${this._sel}`,...this._ps];
    const headers={'apikey':SB_KEY,'Authorization':`Bearer ${token}`,'Content-Type':'application/json'};
    if(this._prefer) headers['Prefer']=this._prefer;
    if(this._countOnly) headers['Prefer']=(headers['Prefer']?headers['Prefer']+',':'')+'count=exact';
    try {
      const res=await fetch(`${SB_URL}/rest/v1/${this._t}?${params.join('&')}`,{method:this._m,headers,body:this._body?JSON.stringify(this._body):undefined});
      let count=null;
      if(this._countOnly){const cr=res.headers.get('content-range');count=cr?(parseInt(cr.split('/')[1])||0):0;if(this._head)return{data:null,error:null,count};}
      const text=await res.text(); let data; try{data=JSON.parse(text);}catch(e){data=text;}
      if(!res.ok)return{data:null,error:{message:data.message||data.error||`HTTP ${res.status}`},count};
      const arr=Array.isArray(data)?data:(data?[data]:[]);
      if(this._single)return{data:arr[0]||null,error:null,count};
      return{data:arr,error:null,count};
    }catch(e){return{data:null,error:{message:e.message},count:null};}
  }
  then(ok,err){ return this._run().then(ok,err); }
  catch(fn)   { return this._run().catch(fn); }
}
const sb = {
  from: t => new QB(t),
  auth: {
    signInWithPassword: async ({ email, password }) => {
      try {
        const res = await fetch(`${SB_URL}/auth/v1/token?grant_type=password`, {
          method: 'POST', headers: { 'apikey': SB_KEY, 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (!res.ok || data.error) return { data: null, error: { message: data.error_description || data.error || 'Login failed' } };
        storeSession(data);
        return { data: { session: data, user: data.user }, error: null };
      } catch(e) { return { data: null, error: { message: e.message } }; }
    },
    signOut: async () => {
      const sess = getStoredSession();
      try { await fetch(`${SB_URL}/auth/v1/logout`, { method: 'POST', headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${sess?.access_token||''}` } }); } catch(e) {}
      clearSession();
      return { error: null };
    },
    getSession: async () => {
      const sess = getStoredSession();
      if (!sess || !isSessionValid(sess)) return { data: { session: null }, error: null };
      return { data: { session: sess }, error: null };
    },
    updateUser: async (updates) => {
      const sess = getStoredSession();
      try {
        const res = await fetch(`${SB_URL}/auth/v1/user`, {
          method: 'PUT', headers: { 'apikey': SB_KEY, 'Authorization': `Bearer ${sess?.access_token||''}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
        });
        const data = await res.json();
        if (!res.ok) return { data: null, error: data };
        return { data: { user: data }, error: null };
      } catch(e) { return { data: null, error: { message: e.message } }; }
    }
  }
};

/* ── Auth & Init ──────────────────────────────────────────────── */
async function initAuth(roles) {
  const sess = getStoredSession();
  if(!sess || !isSessionValid(sess)) { location.href='index.html'; return null; }
  let uid = sess.user?.id;
  if(!uid) { try { uid=JSON.parse(atob(sess.access_token.split('.')[1])).sub; } catch(e){} }
  if(!uid) { location.href='index.html'; return null; }
  try {
    const res = await fetch(`${SB_URL}/rest/v1/profiles?id=eq.${uid}&select=*&limit=1`,
      { headers:{'apikey':SB_KEY,'Authorization':`Bearer ${sess.access_token}`} });
    const data = await res.json();
    const p = Array.isArray(data) ? data[0] : null;
    if(!p) return null;
    App.user = sess.user || { id:uid }; App.profile = p;
    if(roles) {
      const ok = Array.isArray(roles) ? roles.includes(p.role) : p.role===roles;
      if(!ok && p.role!=='admin') { location.href=PORTALS[p.role]||'index.html'; return null; }
    }
    _renderBadge(); setLang(App.lang); return p;
  } catch(e) { return null; }
}

async function doLogout() { clearSession(); location.href='index.html'; }

function _renderBadge() {
  const el=document.getElementById('ubEl'); if(!el) return;
  const p=App.profile;
  const init=(p.full_name||'U').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  const dc=DIVS[p.division]?.color||'#2563EB';
  const roleName = App.lang==='ar' ? (ROLE_AR[p.role]||p.role) : (ROLE_EN[p.role]||p.role);
  el.innerHTML=`<div class="ub-av" style="background:${dc}22;color:${dc}">${init}</div>
    <div style="flex:1;min-width:0">
      <div class="ub-nm">${esc(p.full_name||'')}</div>
      <div class="ub-rl">${roleName}</div>
    </div>`;
}

function startClock() {
  const ct=document.getElementById('ct'), cd=document.getElementById('cd');
  if(!ct&&!cd) return;
  function tick() {
    const n=new Date(), h=n.getHours(), l=App.lang;
    const locale=LOCALE_MAP[l]||'en-GB';
    const hh=String(h%12||12).padStart(2,'0'), mm=String(n.getMinutes()).padStart(2,'0'), ss=String(n.getSeconds()).padStart(2,'0');
    const ampm = h<12 ? (l==='ar'||l==='ur'?'ص':'AM') : (l==='ar'||l==='ur'?'م':'PM');
    if(ct) ct.textContent=`${hh}:${mm}:${ss} ${ampm}`;
    if(cd) { try { cd.textContent=n.toLocaleDateString(locale,{weekday:'long',year:'numeric',month:'long',day:'numeric'}); } catch(e) {} }
  }
  tick(); setInterval(tick, 1000);
}

/* ── UI Helpers ───────────────────────────────────────────────── */
function toast(msg, type='i') {
  let c=document.getElementById('tc');
  if(!c){c=document.createElement('div');c.id='tc';document.body.appendChild(c);}
  const el=document.createElement('div'); el.className=`toast ${type}`;
  el.innerHTML=`<span>${{s:'✓',e:'✕',i:'ℹ',w:'⚠'}[type]||'•'}</span><span style="flex:1">${msg}</span><button style="opacity:.5;cursor:pointer" onclick="this.parentElement.remove()">×</button>`;
  c.appendChild(el); setTimeout(()=>el.remove(),3500);
}

function openModal(html, cls='') {
  closeModal();
  const bd=document.createElement('div'); bd.className='mbg'; bd.id='M';
  bd.innerHTML=`<div class="modal ${cls}">${html}</div>`;
  bd.addEventListener('click', e=>{ if(e.target===bd) closeModal(); });
  document.body.appendChild(bd);
  // Auto-translate modal content
  setTimeout(()=>{ if(typeof translateDOM==='function'&&App.lang!=='ar') translateDOM(bd); },30);
}
function closeModal() { document.getElementById('M')?.remove(); }

const mv  = id => document.getElementById(id)?.value?.trim()||'';
const ms  = (id,v) => { const el=document.getElementById(id); if(el) el.value=v??''; };

/* ── Database helpers ─────────────────────────────────────────── */
async function dbList(tbl, opts={}) {
  let q=sb.from(tbl).select(opts.sel||'*');
  if(opts.eq)    Object.entries(opts.eq).forEach(([k,v])=>q=q.eq(k,v));
  if(opts.neq)   Object.entries(opts.neq).forEach(([k,v])=>q=q.neq(k,v));
  if(opts.in)    Object.entries(opts.in).forEach(([k,v])=>q=q.in(k,v));
  if(opts.ilike) q=q.ilike(opts.ilike[0],`%${opts.ilike[1]}%`);
  q=q.order(opts.ord||'created_at',{ascending:opts.asc??false});
  if(opts.lim) q=q.limit(opts.lim);
  const{data,error}=await q; if(error) throw error; return{data:data||[]};
}
async function dbGet(tbl,id)   { const{data,error}=await sb.from(tbl).select('*').eq('id',id).single(); if(error) throw error; return data; }
async function dbIns(tbl,row)  { const{data,error}=await sb.from(tbl).insert(row).select('*'); if(error) throw error; return Array.isArray(data)?data[0]:data; }
async function dbUpd(tbl,id,p) { const{data,error}=await sb.from(tbl).update(p).eq('id',id); if(error) throw error; return Array.isArray(data)?data[0]:data; }
async function dbDel(tbl,id)   { const{error}=await sb.from(tbl).delete().eq('id',id); if(error) throw error; }
async function dbCnt(tbl, opts={}) {
  let q=sb.from(tbl).select('id',{count:'exact',head:true});
  if(opts.eq)  Object.entries(opts.eq).forEach(([k,v])=>q=q.eq(k,v));
  if(opts.neq) Object.entries(opts.neq).forEach(([k,v])=>q=q.neq(k,v));
  if(opts.in)  Object.entries(opts.in).forEach(([k,v])=>q=q.in(k,v));
  if(opts.lim) q=q.limit(1);
  const{count}=await q; return count||0;
}

/* ── Formatters ───────────────────────────────────────────────── */
const fmtD = d => d ? new Date(d).toLocaleDateString(LOCALE_MAP[App.lang]||'en-GB',{year:'numeric',month:'short',day:'numeric'}) : '—';
const fmtN = n => n!=null ? Number(n).toLocaleString(LOCALE_MAP[App.lang]||'en') : '—';
const esc  = s => String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const isOD = (d,s) => d && !['closed','done','resolved'].includes(s) && new Date(d)<new Date();

/* ── Badges — full 12-language via DOM_MAP ────────────────────── */
function priBadge(p) {
  const keyMap={low:'pri_low',medium:'pri_medium',high:'pri_high',critical:'pri_critical'};
  const label = (typeof tl==='function'&&keyMap[p]) ? tl(keyMap[p]) : t2(
    {low:'منخفضة',medium:'متوسطة',high:'عالية',critical:'حرج'}[p]||p,
    {low:'Low',medium:'Medium',high:'High',critical:'Critical'}[p]||p
  );
  return `<span class="badge ${{low:'bg',medium:'bb',high:'by',critical:'br'}[p]||'bg'}">${label}</span>`;
}
function stBadge(s) {
  const keyMap={open:'st_open',new:'st_new',in_progress:'st_in_progress',closed:'st_closed',resolved:'st_resolved',done:'st_closed',overdue:'st_overdue',returned:'st_returned',escalated:'st_escalated',pending_review:'st_pending'};
  const label = (typeof tl==='function'&&keyMap[s]) ? tl(keyMap[s]) : t2(
    {open:'مفتوح',new:'جديد',in_progress:'قيد التنفيذ',closed:'مغلق',resolved:'محلول',done:'منجز',overdue:'متأخر',returned:'معاد',escalated:'مصعد',pending_review:'بانتظار المراجعة'}[s]||s,
    {open:'Open',new:'New',in_progress:'In Progress',closed:'Closed',resolved:'Resolved',done:'Done',overdue:'Overdue',returned:'Returned',escalated:'Escalated',pending_review:'Pending Review'}[s]||s
  );
  return `<span class="badge ${{open:'bg',new:'bg',in_progress:'bb',closed:'bgn',resolved:'bgn',done:'bgn',overdue:'br',returned:'br',escalated:'br',pending_review:'by'}[s]||'bg'}">${label}</span>`;
}

function progBar(pct,cl='') {
  return `<div class="prog"><div class="pf ${cl||(pct>=80?'grn':pct>=50?'':'red')}" style="width:${pct}%"></div></div>`;
}
const skR    = (n=4) => Array.from({length:n},()=>'<div class="sk skr"></div>').join('');
const emptyEl = (msg,btn='') => `<div class="empty"><div class="ei">📭</div><p>${msg||t2('لا بيانات','No data')}</p>${btn}</div>`;

/* ── Nav Builder ──────────────────────────────────────────────── */
function buildNav(items, active) {
  window._currentNav=items; window._currentPage=active;
  const el=document.getElementById('navEl'); if(!el) return;
  el.innerHTML=items.map(item=>{
    if(item.g) return `<div class="ng">${t2(item.g, item.ge||item.g)}</div>`;
    // Use tlKey if available for 12-language nav labels
    const label = (item.tlKey && typeof tl==='function') ? tl(item.tlKey) : t2(item.ar, item.en);
    return `<button class="ni ${item.k===active?'on':''}" onclick="document.querySelector('.sb')?.classList.remove('show');${item.fn||`go('${item.k}')`}">
      <span class="ic">${item.ic}</span><span>${label}</span>${item.badge?`<span class="badge">${item.badge}</span>`:''}
    </button>`;
  }).join('');
}

/* ── Misc ─────────────────────────────────────────────────────── */
function confirm2(msg, fn) {
  openModal(`<div class="mh"><h3>⚠ ${t2('تأكيد','Confirm')}</h3><button class="mx" onclick="closeModal()">×</button></div>
    <div class="mbd"><p style="font-size:14px">${msg}</p></div>
    <div class="mf"><button class="btn" onclick="closeModal()">${t2('إلغاء','Cancel')}</button>
    <button class="btn d" onclick="closeModal();(${fn.toString()})()">${t2('نعم','Yes')}</button></div>`);
}

async function logAct(action, etype, eid, details={}) {
  try { if(App.profile) await dbIns('activity_log',{user_id:App.profile.id,action,entity_type:etype,entity_id:eid,details}); } catch(e) {}
}

async function loadHealth() {
  try {
    const sess=getStoredSession();
    const res=await fetch(`${SB_URL}/rest/v1/v_division_health?select=*`,{headers:{'apikey':SB_KEY,'Authorization':`Bearer ${sess?.access_token||''}`}});
    const data=await res.json(); return Array.isArray(data)?data:[];
  } catch(e) { return []; }
}

/* ── Canvas ───────────────────────────────────────────────────── */
function initCanvas(id, type, color) {
  const cv=document.getElementById(id); if(!cv) return;
  const cx=cv.getContext('2d'); let W,H,nodes=[],pts=[],t=0;
  function resize(){const r=cv.parentElement.getBoundingClientRect();W=cv.width=r.width;H=cv.height=r.height;build();}
  function build(){
    nodes=[];pts=[];
    if(type==='net'){const n=Math.floor(W*H/4500);for(let i=0;i<n;i++)nodes.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*2.5+1,p:Math.random()*6.28,hub:Math.random()>.8});}
    if(type==='grid'){const cols=Math.floor(W/88)+1,rows=Math.floor(H/58)+1;for(let c=0;c<cols;c++)for(let r=0;r<rows;r++)nodes.push({x:c*88+44,y:r*58+29,hub:Math.random()>.72});}
  }
  const h2=v=>Math.floor(v*255).toString(16).padStart(2,'0');
  function draw(){
    t+=.008;cx.clearRect(0,0,W,H);
    if(type==='net'){
      cx.fillStyle='rgba(0,0,0,.05)';cx.fillRect(0,0,W,H);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;n.p+=.018;if(n.x<0||n.x>W)n.vx*=-1;if(n.y<0||n.y>H)n.vy*=-1;});
      for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d>130)continue;const al=(1-d/130)*.22;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.strokeStyle=color+h2(al);cx.lineWidth=.6;cx.stroke();const fp=((t*.9)%1);cx.beginPath();cx.arc(a.x+(b.x-a.x)*fp,a.y+(b.y-a.y)*fp,1.8,0,6.28);cx.fillStyle=color+h2(al*2);cx.fill();}
      nodes.forEach(n=>{const g=Math.sin(n.p)*.4+.6;if(n.hub){cx.beginPath();cx.arc(n.x,n.y,n.r*3,0,6.28);cx.strokeStyle=color+h2(.15*g);cx.lineWidth=1;cx.stroke();}cx.beginPath();cx.arc(n.x,n.y,n.r,0,6.28);cx.fillStyle=color+h2(n.hub?.85:.6*g);cx.fill();});
    }
    if(type==='grid'){
      cx.fillStyle='rgba(0,0,0,.06)';cx.fillRect(0,0,W,H);
      for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j];if(Math.abs(a.x-b.x)>90||Math.abs(a.y-b.y)>60)continue;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.strokeStyle=color+h2(.18);cx.lineWidth=.6;cx.stroke();}
      nodes.forEach(n=>{const g=Math.sin(t+n.x*.02)*.5+.5;if(n.hub){cx.beginPath();cx.arc(n.x,n.y,7,0,6.28);cx.fillStyle=color+h2(.1*g);cx.fill();}cx.beginPath();cx.arc(n.x,n.y,n.hub?3:1.5,0,6.28);cx.fillStyle=color+(n.hub?'cc':'66');cx.fill();});
    }
    requestAnimationFrame(draw);
  }
  resize(); window.addEventListener('resize',resize); draw();
}


/* ── Mobile Hamburger Sidebar ─────────────────────────── */
function initMobileSidebar() {
  const _sbEl = document.querySelector('.sb');
  const topbar = document.querySelector('.topbar');
  if(!_sbEl || !topbar) return;
  
  // Create overlay
  let overlay = document.getElementById('sbOverlay');
  if(!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'sbOverlay';
    overlay.className = 'sb-overlay';
    overlay.onclick = closeSidebar;
    document.body.appendChild(overlay);
  }
  
  // Close sidebar on nav item click (mobile)
  _sbEl.querySelectorAll('.ni').forEach(ni => {
    ni.addEventListener('click', () => {
      if(window.matchMedia('(max-width:768px)').matches) closeSidebar();
    });
  });
}

function openSidebar() {
  const _s=document.querySelector('.sb');if(_s)_s.classList.add('show');
  document.getElementById('sbOverlay')?.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  const _s=document.querySelector('.sb');if(_s)_s.classList.remove('show');
  document.getElementById('sbOverlay')?.classList.remove('show');
  document.body.style.overflow = '';
}
function toggleSidebar() {
  const _s = document.querySelector('.sb');
  if(_s?.classList.contains('show')) closeSidebar(); else openSidebar();
}

/* ── Pages ────────────────────────────────────────────────────── */

/* ── Null-safe DOM helpers ────────────────────────────── */
const setHTML = (id, html) => { const el = document.getElementById(id); if(el) el.innerHTML = html; return !!el; };
const setText = (id, txt)  => { const el = document.getElementById(id); if(el) el.textContent = txt; return !!el; };
const showEl  = (id, show=true) => { const el = document.getElementById(id); if(el) el.style.display = show ? '' : 'none'; };

const PAGES = {};
function reg(k, fn) { PAGES[k] = fn; }
function go(k) {
  const item = window._currentNav?.find(n=>n.k===k);
  const ptEl = document.getElementById('pgtitle') || document.getElementById('pgTitle');
  if(ptEl && item) ptEl.textContent = (item.tlKey && typeof tl==='function') ? tl(item.tlKey) : t2(item.ar, item.en);
  buildNav(window._currentNav||[], k);
  const ct = document.getElementById('pgContent');
  if(ct) { ct.innerHTML='<div class="fade" id="pg"></div>'; }
  const fn = PAGES[k];
  if(fn) {
    fn(document.getElementById('pg'));
    // Auto-translate after render (multiple passes for async)
    const doTranslate = () => {
      if(typeof translateDOM === 'function' && App.lang !== 'ar') {
        translateDOM(document.querySelector('.main') || document.body);
      }
    };
    setTimeout(doTranslate, 150);
    setTimeout(doTranslate, 500);
    setTimeout(doTranslate, 1200);
  } else {
    const pg = document.getElementById('pg');
    if(pg) pg.innerHTML = `<p style="padding:40px;color:var(--t3)">${t2('قيد البناء…','Coming soon…')}</p>`;
  }
  window.scrollTo(0,0);
}


/* ── Attendance Tracking ──────────────────────────────── */
async function trackAttendance() {
  try {
    if(!App.profile) return;
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toISOString();
    // Upsert: if record exists update last_seen, else create with first_seen
    const sess = getStoredSession();
    const res = await fetch(`${SB_URL}/rest/v1/attendance_log`, {
      method: 'POST',
      headers: {
        'apikey': SB_KEY,
        'Authorization': `Bearer ${sess?.access_token || ''}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates,return=minimal'
      },
      body: JSON.stringify({
        user_id: App.profile.id,
        date: today,
        first_seen: now,
        last_seen: now,
        login_count: 1
      })
    });
    // Update last_seen every 5 minutes
    setInterval(async () => {
      const s = getStoredSession();
      if(!s) return;
      await fetch(`${SB_URL}/rest/v1/attendance_log?user_id=eq.${App.profile.id}&date=eq.${today}`, {
        method: 'PATCH',
        headers: {'apikey':SB_KEY,'Authorization':`Bearer ${s.access_token}`,'Content-Type':'application/json','Prefer':'return=minimal'},
        body: JSON.stringify({ last_seen: new Date().toISOString() })
      });
    }, 5 * 60 * 1000);
  } catch(e) { /* silent */ }
}

async function getTeamAttendance(division, date) {
  try {
    const sess = getStoredSession();
    const d = date || new Date().toISOString().split('T')[0];
    const res = await fetch(
      `${SB_URL}/rest/v1/attendance_log?date=eq.${d}&select=*,profiles!attendance_log_user_id_fkey(full_name,full_name_en,role,division)&profiles.division=eq.${division}`,
      { headers: {'apikey':SB_KEY,'Authorization':`Bearer ${sess?.access_token||''}`} }
    );
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch(e) { return []; }
}

async function getAllAttendanceToday() {
  try {
    const sess = getStoredSession();
    const today = new Date().toISOString().split('T')[0];
    const res = await fetch(
      `${SB_URL}/rest/v1/attendance_log?date=eq.${today}&select=*,profiles!inner(full_name,full_name_en,role,division,is_active)&order=last_seen.desc`,
      { headers: {'apikey':SB_KEY,'Authorization':`Bearer ${sess?.access_token||''}`} }
    );
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch(e) { return []; }
}

function fmtTime(ts) {
  if(!ts) return '—';
  const d = new Date(ts);
  const h = String(d.getHours()).padStart(2,'0');
  const m = String(d.getMinutes()).padStart(2,'0');
  return `${h}:${m}`;
}

function attendanceWidget(records, title) {
  if(!records.length) return `<div class="empty"><div class="ei">📅</div><p>${t2('لم يسجّل أحد دخوله بعد','No check-ins yet')}</p></div>`;
  const now = Date.now();
  return records.map(r => {
    const p = r.profiles || {};
    const name = App.lang === 'ar' ? p.full_name : (p.full_name_en || p.full_name || '—');
    const init = (p.full_name || 'U').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
    const lastMs = new Date(r.last_seen).getTime();
    const minsAgo = Math.floor((now - lastMs) / 60000);
    const isOnline = minsAgo < 10;
    const isToday = minsAgo < 480;
    const dc = DIVS[p.division]?.color || '#2563EB';
    return `<div class="att-row">
      <div class="att-av" style="background:${dc}20;color:${dc}">${init}</div>
      <div class="att-info">
        <div class="att-name">${esc(name)}</div>
        <div class="att-time">⏎ ${fmtTime(r.first_seen)} &nbsp;|&nbsp; ⏏ ${fmtTime(r.last_seen)}</div>
      </div>
      <div class="att-dot ${isOnline?'online':isToday?'today':'offline'}" title="${isOnline?t2('متصل','Online'):t2('آخر ظهور','Last seen')+' '+fmtTime(r.last_seen)}"></div>
    </div>`;
  }).join('');
}

/* ── initPage ─────────────────────────────────────────────────── */
async function initPage(opts={}) {
  const p = await initAuth(opts.roles); if(!p) return null;
  setLang(App.lang);
  startClock();
  // Init hamburger sidebar
  setTimeout(initMobileSidebar, 100);
  // Track attendance
  setTimeout(trackAttendance, 500);
  // Translate sidebar
  setTimeout(()=>{
    if(typeof translateDOM==='function'&&App.lang!=='ar') translateDOM(document.querySelector('.sb'));
  },200);
  return p;
}

/* ── Constants ────────────────────────────────────────────────── */
const LOGO = '<img src="se-logo.png.PNG" alt="Saudi Energy" style="height:32px;width:auto;object-fit:contain;display:block" onerror="this.style.display=\'none\'">';
const T = {
  ar:{save:'حفظ',cancel:'إلغاء',del:'حذف',search:'بحث...',nodata:'لا بيانات',logout:'خروج',days:['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],months:['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']},
  en:{save:'Save',cancel:'Cancel',del:'Delete',search:'Search...',nodata:'No data',logout:'Sign Out',days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],months:['January','February','March','April','May','June','July','August','September','October','November','December']},
};

/* ── Export ───────────────────────────────────────────────────── */
// Export SB constants so portal inline scripts can access them
window.SB_URL = SB_URL;
window.SB_KEY = SB_KEY;

Object.assign(window, {
  setHTML, setText, showEl,
  initMobileSidebar, openSidebar, closeSidebar, toggleSidebar,
  trackAttendance, getTeamAttendance, getAllAttendanceToday, attendanceWidget, fmtTime,

  t2, tl, App, sb, DIVS, PORTALS, ROLE_AR, ROLE_EN, LOCALE_MAP, T,
  setLang, toggleLang, doLogout, initAuth, initPage, _renderBadge, startClock,
  toast, openModal, closeModal, mv, ms,
  dbList, dbGet, dbIns, dbUpd, dbDel, dbCnt,
  fmtD, fmtN, esc, isOD, priBadge, stBadge, progBar, skR, emptyEl,
  initCanvas, loadHealth, buildNav, confirm2, logAct, LOGO, go, reg, PAGES,
  getStoredSession, storeSession, clearSession, isSessionValid,
});
