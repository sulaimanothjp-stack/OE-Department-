/* ═══════════════════════════════════════════════════════════════════
   Saudi Energy · OE Digital Twin Command Center
   app.js — Shared Application Logic
   ═══════════════════════════════════════════════════════════════════ */

'use strict';

// ── CONFIGURATION ─────────────────────────────────────────────────
const SE_CONFIG = {
  supabaseUrl:  'YOUR_SUPABASE_URL',   // ← replace this
  supabaseKey:  'YOUR_SUPABASE_ANON_KEY', // ← replace this
  appName:      'SE OE Command Center',
  appNameAr:    'مركز قيادة التميز التشغيلي',
  version:      '2.0',
};

// ── SUPABASE CLIENT ────────────────────────────────────────────────
const { createClient } = supabase;
const sb = createClient(SE_CONFIG.supabaseUrl, SE_CONFIG.supabaseKey);

// ── APPLICATION STATE ──────────────────────────────────────────────
const App = {
  user:    null,
  profile: null,
  lang:    localStorage.getItem('se_lang') || 'ar',
  route:   null,
  cache:   {},
};

// ── ROLE → PORTAL MAP ──────────────────────────────────────────────
const ROLE_PORTALS = {
  admin:                    'admin.html',
  director:                 'director.html',
  governance_manager:       'governance.html',
  generation_manager:       'generation.html',
  national_grid_manager:    'national-grid.html',
  distribution_manager:     'distribution.html',
  technical_alerts_manager: 'technical-alerts.html',
  employee:                 'employee.html',
};

// ── ROLE LABELS ────────────────────────────────────────────────────
const ROLE_LABELS = {
  ar: {
    admin:                    'مشرف النظام',
    director:                 'مدير الإدارة',
    governance_manager:       'مدير دائرة الحوكمة',
    generation_manager:       'مدير دائرة التوليد',
    national_grid_manager:    'مدير دائرة النقل',
    distribution_manager:     'مدير دائرة التوزيع',
    technical_alerts_manager: 'مدير دائرة التنبيهات',
    employee:                 'موظف',
  },
  en: {
    admin:                    'System Admin',
    director:                 'OE Director',
    governance_manager:       'Governance Manager',
    generation_manager:       'Generation Manager',
    national_grid_manager:    'National Grid Manager',
    distribution_manager:     'Distribution Manager',
    technical_alerts_manager: 'Technical Alerts Manager',
    employee:                 'Employee',
  },
};

// ── DIVISION CONFIG ────────────────────────────────────────────────
const DIVISIONS = {
  governance:       { ar: 'الحوكمة والتقييم',        en: 'Governance & Assessment',      color: '#7C3AED', icon: '⚖️'  },
  generation:       { ar: 'التوليد',                  en: 'Generation OE',                color: '#F59E0B', icon: '⚡'  },
  national_grid:    { ar: 'النقل / الشبكة الوطنية',   en: 'National Grid / Transmission', color: '#0EA5E9', icon: '🔌'  },
  distribution:     { ar: 'التوزيع',                  en: 'Distribution OE',              color: '#10B981', icon: '🏘️' },
  technical_alerts: { ar: 'التنبيهات الفنية',          en: 'Corporate Technical Alerts',   color: '#EF4444', icon: '⚠️' },
};

// ── i18n ───────────────────────────────────────────────────────────
const I18N = {
  ar: {
    dashboard: 'لوحة المتابعة', tasks: 'المهام', tickets: 'التذاكر',
    assessments: 'التقييمات', afis: 'نقاط التحسين (AFIs)', kpis: 'مؤشرات الأداء',
    alerts: 'التنبيهات الفنية', initiatives: 'المبادرات', meetings: 'الاجتماعات',
    knowledge: 'قاعدة المعرفة', evaluation: 'تقييم الموظفين',
    save: 'حفظ', cancel: 'إلغاء', add: '+ إضافة', edit: 'تعديل', delete: 'حذف',
    search: 'بحث...', loading: 'جارٍ التحميل...', no_data: 'لا توجد بيانات',
    confirm_delete: 'هل أنت متأكد من الحذف؟', saved: 'تم الحفظ',
    error: 'حدث خطأ', logout: 'تسجيل الخروج',
    morning: 'صباح الخير', afternoon: 'مساء الخير', evening: 'مساء النور',
    priority_low: 'منخفضة', priority_medium: 'متوسطة', priority_high: 'عالية', priority_critical: 'حرجة',
    status_open: 'مفتوح', status_closed: 'مغلق', status_in_progress: 'قيد التنفيذ',
    status_overdue: 'متأخر', status_pending: 'معلّق', status_resolved: 'محلول',
    days: ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],
    months: ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
  },
  en: {
    dashboard: 'Dashboard', tasks: 'Tasks', tickets: 'Tickets',
    assessments: 'Assessments', afis: 'AFIs', kpis: 'KPIs',
    alerts: 'Technical Alerts', initiatives: 'Initiatives', meetings: 'Meetings',
    knowledge: 'Knowledge Center', evaluation: 'Employee Evaluation',
    save: 'Save', cancel: 'Cancel', add: '+ Add', edit: 'Edit', delete: 'Delete',
    search: 'Search...', loading: 'Loading...', no_data: 'No data found',
    confirm_delete: 'Are you sure you want to delete?', saved: 'Saved successfully',
    error: 'An error occurred', logout: 'Logout',
    morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening',
    priority_low: 'Low', priority_medium: 'Medium', priority_high: 'High', priority_critical: 'Critical',
    status_open: 'Open', status_closed: 'Closed', status_in_progress: 'In Progress',
    status_overdue: 'Overdue', status_pending: 'Pending', status_resolved: 'Resolved',
    days: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
  },
};
const t = k => (I18N[App.lang] || I18N.ar)[k] || k;

// ── LANGUAGE ───────────────────────────────────────────────────────
function setLang(lang) {
  App.lang = lang;
  localStorage.setItem('se_lang', lang);
  const root = document.documentElement;
  root.lang = lang;
  root.dir  = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-ar]').forEach(el => {
    el.textContent = lang === 'ar' ? el.dataset.ar : el.dataset.en;
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function toggleLang() {
  setLang(App.lang === 'ar' ? 'en' : 'ar');
  location.reload();
}

// ── AUTH ───────────────────────────────────────────────────────────
async function initAuth(requiredRole) {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) {
    window.location.href = 'index.html';
    return null;
  }
  const { data: profile } = await sb.from('profiles').select('*').eq('id', session.user.id).single();
  if (!profile) { window.location.href = 'index.html'; return null; }

  App.user    = session.user;
  App.profile = profile;

  if (requiredRole && !checkRoleAccess(profile.role, requiredRole)) {
    window.location.href = ROLE_PORTALS[profile.role] || 'index.html';
    return null;
  }

  await sb.from('profiles').update({ last_login: new Date().toISOString() }).eq('id', profile.id);
  renderUserBadge();
  setLang(profile.preferences?.lang || App.lang);
  return profile;
}

function checkRoleAccess(userRole, requiredRole) {
  if (userRole === 'admin') return true;
  if (Array.isArray(requiredRole)) return requiredRole.includes(userRole);
  return userRole === requiredRole;
}

async function doLogout() {
  await sb.auth.signOut();
  window.location.href = 'index.html';
}

function renderUserBadge() {
  const p = App.profile;
  if (!p) return;
  const el = document.getElementById('userBadge');
  if (!el) return;
  const initials = (p.full_name || 'U').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const roleLabel = (ROLE_LABELS[App.lang] || ROLE_LABELS.ar)[p.role] || p.role;
  el.innerHTML = `
    <div class="avatar">${initials}</div>
    <div class="user-info">
      <div class="user-name">${App.lang === 'ar' ? (p.full_name || '') : (p.full_name_en || p.full_name || '')}</div>
      <div class="user-role">${roleLabel}</div>
    </div>
    <div class="online-dot"></div>`;
}

// ── CLOCK ──────────────────────────────────────────────────────────
function startClock() {
  const timeEl     = document.getElementById('clockTime');
  const dateEl     = document.getElementById('clockDate');
  const greetEl    = document.getElementById('clockGreet');
  if (!timeEl && !dateEl) return;

  function tick() {
    const now  = new Date();
    const h    = now.getHours();
    const lang = App.lang;
    const T    = I18N[lang];

    if (timeEl) {
      const hh = String(h).padStart(2,'0');
      const mm = String(now.getMinutes()).padStart(2,'0');
      const ss = String(now.getSeconds()).padStart(2,'0');
      const ampm = lang === 'ar' ? (h < 12 ? 'ص' : 'م') : (h < 12 ? 'AM' : 'PM');
      const h12 = String(h % 12 || 12).padStart(2,'0');
      timeEl.textContent = `${h12}:${mm}:${ss} ${ampm}`;
    }
    if (dateEl) {
      const d   = now.getDay();
      const day = now.getDate();
      const mon = T.months[now.getMonth()];
      const yr  = now.getFullYear();
      dateEl.textContent = lang === 'ar'
        ? `${T.days[d]}، ${day} ${mon} ${yr}`
        : `${T.days[d]}, ${day} ${mon} ${yr}`;
    }
    if (greetEl) {
      const msg = h < 12 ? T.morning : h < 17 ? T.afternoon : T.evening;
      greetEl.textContent = msg + (h >= 16 ? (lang === 'ar' ? ' — تذكر إغلاق مهامك اليوم' : ' — remember to close today\'s tasks') : '');
    }
  }
  tick();
  setInterval(tick, 1000);
}

// ── TOAST ──────────────────────────────────────────────────────────
function toast(msg, type = 'info', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${icons[type] || '•'}</span><span style="flex:1">${msg}</span><button class="toast-close" onclick="this.parentElement.remove()">×</button>`;
  container.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .4s'; }, duration - 400);
  setTimeout(() => el.remove(), duration);
}

// ── MODAL ──────────────────────────────────────────────────────────
function openModal(html, cls = '') {
  closeModal();
  const bd = document.createElement('div');
  bd.className = 'modal-backdrop';
  bd.id = 'seModal';
  bd.innerHTML = `<div class="modal ${cls}">${html}</div>`;
  bd.addEventListener('click', e => { if (e.target === bd) closeModal(); });
  document.body.appendChild(bd);
  document.addEventListener('keydown', _escHandler);
}
function closeModal() {
  document.getElementById('seModal')?.remove();
  document.removeEventListener('keydown', _escHandler);
}
function _escHandler(e) { if (e.key === 'Escape') closeModal(); }
const mval = id => document.getElementById(id)?.value?.trim() || '';
const mset = (id, v) => { const el = document.getElementById(id); if (el) el.value = v || ''; };

// ── DATABASE HELPERS ───────────────────────────────────────────────
async function dbList(table, opts = {}) {
  let q = sb.from(table).select(opts.select || '*', opts.count ? { count: 'exact' } : undefined);
  if (opts.eq)    Object.entries(opts.eq).forEach(([k, v]) => { q = q.eq(k, v); });
  if (opts.neq)   Object.entries(opts.neq).forEach(([k, v]) => { q = q.neq(k, v); });
  if (opts.in)    Object.entries(opts.in).forEach(([k, v]) => { q = q.in(k, v); });
  if (opts.ilike) q = q.ilike(opts.ilike[0], `%${opts.ilike[1]}%`);
  if (opts.order) q = q.order(opts.order, { ascending: opts.asc ?? false });
  else            q = q.order('created_at', { ascending: false });
  if (opts.limit) q = q.limit(opts.limit);
  const { data, error, count } = await q;
  if (error) throw error;
  return { data: data || [], count };
}
async function dbGet(table, id)        { const { data, error } = await sb.from(table).select('*').eq('id', id).single(); if (error) throw error; return data; }
async function dbInsert(table, row)    { const { data, error } = await sb.from(table).insert(row).select().single(); if (error) throw error; return data; }
async function dbUpdate(table, id, p)  { const { data, error } = await sb.from(table).update(p).eq('id', id).select().single(); if (error) throw error; return data; }
async function dbDelete(table, id)     { const { error } = await sb.from(table).delete().eq('id', id); if (error) throw error; }
async function dbCount(table, opts={}) { const { count } = await dbList(table, {...opts, count:true, limit:1}); return count || 0; }

// ── FORMATTING ─────────────────────────────────────────────────────
const fmtDate  = d => d ? new Date(d).toLocaleDateString(App.lang === 'ar' ? 'ar-SA' : 'en-GB', { year:'numeric', month:'short', day:'numeric' }) : '—';
const fmtNum   = n => n != null ? Number(n).toLocaleString(App.lang === 'ar' ? 'ar-SA' : 'en-GB') : '—';
const esc      = s => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const isOverdue = (d, s) => d && !['closed','done','resolved'].includes(s) && new Date(d) < new Date();

function priBadge(p) {
  const cls  = { low:'badge-grey', medium:'badge-blue', high:'badge-yellow', critical:'badge-red' };
  const lblA = { low:'منخفضة', medium:'متوسطة', high:'عالية', critical:'حرجة' };
  const lblE = { low:'Low', medium:'Medium', high:'High', critical:'Critical' };
  const lbl  = (App.lang === 'ar' ? lblA : lblE)[p] || p;
  return `<span class="badge ${cls[p] || 'badge-grey'}">${lbl}</span>`;
}

function stBadge(s) {
  const cls = {
    open:'badge-grey', new:'badge-grey', planning:'badge-grey', draft:'badge-grey',
    in_progress:'badge-blue', assigned:'badge-blue', evidence_collection:'badge-blue',
    pending_review:'badge-yellow', pending_verification:'badge-yellow', scheduled:'badge-yellow',
    closed:'badge-green', resolved:'badge-green', done:'badge-green', completed:'badge-green',
    overdue:'badge-red', returned:'badge-red', escalated:'badge-red',
  };
  const lblA = {
    open:'مفتوح', new:'جديد', planning:'تخطيط', draft:'مسودة',
    in_progress:'قيد التنفيذ', assigned:'مكلّف', evidence_collection:'جمع أدلة',
    pending_review:'بانتظار المراجعة', pending_verification:'بانتظار التحقق', scheduled:'مجدول',
    closed:'مغلق', resolved:'محلول', done:'منجز', completed:'مكتمل',
    overdue:'متأخر', returned:'مُعاد', escalated:'مُصعَّد',
  };
  const lblE = {
    open:'Open', new:'New', planning:'Planning', draft:'Draft',
    in_progress:'In Progress', assigned:'Assigned', evidence_collection:'Evidence Collection',
    pending_review:'Pending Review', pending_verification:'Pending Verification', scheduled:'Scheduled',
    closed:'Closed', resolved:'Resolved', done:'Done', completed:'Completed',
    overdue:'Overdue', returned:'Returned', escalated:'Escalated',
  };
  const label = (App.lang === 'ar' ? lblA : lblE)[s] || s;
  return `<span class="badge ${cls[s] || 'badge-grey'}">${label}</span>`;
}

function progBar(pct, type = '') {
  const fillClass = pct >= 80 ? 'success' : pct >= 50 ? '' : 'danger';
  return `<div class="prog" style="min-width:80px"><div class="prog-fill ${fillClass}" style="width:${pct}%"></div></div>`;
}

// ── SKELETON LOADER ────────────────────────────────────────────────
function skeletonRows(n = 4) {
  return Array.from({ length: n }, () => `<div class="skeleton sk-row"></div>`).join('');
}

function emptyState(msg, action = '') {
  return `<div class="empty"><div class="empty-icon">📭</div><p>${msg}</p>${action}</div>`;
}

// ── NOTIFICATIONS ──────────────────────────────────────────────────
async function loadNotifCount() {
  try {
    if (!App.profile) return;
    const { count } = await sb.from('notifications').select('id', { count: 'exact', head: true }).eq('user_id', App.profile.id).eq('is_read', false);
    const dot = document.getElementById('notifDot');
    if (dot) dot.style.display = (count || 0) > 0 ? 'block' : 'none';
  } catch (_) {}
}

async function sendNotif(userId, title, body, type = 'info', linkType = null, linkId = null) {
  try {
    await dbInsert('notifications', { user_id: userId, title, body, type, link_type: linkType, link_id: linkId });
  } catch (_) {}
}

// ── ACTIVITY LOG ───────────────────────────────────────────────────
async function logActivity(action, entityType = null, entityId = null, details = {}) {
  try {
    if (!App.profile) return;
    await dbInsert('activity_log', { user_id: App.profile.id, action, entity_type: entityType, entity_id: entityId, details });
  } catch (_) {}
}

// ── CANVAS BACKGROUND (grid network) ──────────────────────────────
function initNetworkBg(canvasId, color = '#2563EB') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], animId;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = canvas.width  = rect.width;
    H = canvas.height = rect.height;
    initNodes();
  }

  function initNodes() {
    nodes = [];
    const n = Math.floor(W * H / 18000);
    for (let i = 0; i < n; i++) {
      nodes.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
        r: Math.random() * 2 + 1.2, p: Math.random() * Math.PI * 2,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy; n.p += .018;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist > 140) continue;
        const alpha = (1 - dist / 140) * .15;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = color + Math.floor(alpha * 255).toString(16).padStart(2,'0');
        ctx.lineWidth = .6; ctx.stroke();
      }
    }
    nodes.forEach(n => {
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = color + '88'; ctx.fill();
    });
    animId = requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
  return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
}

// ── REALTIME SUBSCRIPTIONS ─────────────────────────────────────────
function subscribeToTable(table, filters, callback) {
  let channel = sb.channel(`rt_${table}_${Date.now()}`).on(
    'postgres_changes',
    { event: '*', schema: 'public', table, ...filters },
    payload => callback(payload)
  ).subscribe();
  return () => sb.removeChannel(channel);
}

// ── CONFIRM DIALOG ─────────────────────────────────────────────────
function confirmAction(msg, onConfirm) {
  openModal(`
    <div class="modal-head"><h3>⚠ ${App.lang === 'ar' ? 'تأكيد' : 'Confirm'}</h3><button class="modal-close" onclick="closeModal()">×</button></div>
    <div class="modal-body"><p style="font-size:14.5px">${msg}</p></div>
    <div class="modal-foot">
      <button class="btn" onclick="closeModal()">${t('cancel')}</button>
      <button class="btn danger" onclick="closeModal();(${onConfirm.toString()})()">${App.lang === 'ar' ? 'نعم، متأكد' : 'Yes, confirm'}</button>
    </div>`);
}

// ── GENERIC CRUD TABLE BUILDER ─────────────────────────────────────
async function buildCrudTable({
  containerId, table, title, titleAr,
  cols, renderRow, onAdd, onEdit, onDelete,
  filters = {}, searchCol = 'title',
}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let search = '';
  let filterState = { ...filters };

  async function render() {
    container.innerHTML = `
      <div class="panel">
        <div class="panel-head">
          <h3>${App.lang === 'ar' ? titleAr : title}</h3>
          ${onAdd ? `<button class="btn primary sm" onclick="window._crudAdd()">${t('add')}</button>` : ''}
        </div>
        <div class="filters">
          <input class="filter-input" id="${containerId}_search" placeholder="${t('search')}" value="${search}">
        </div>
        <div id="${containerId}_list">${skeletonRows()}</div>
      </div>`;

    document.getElementById(`${containerId}_search`)?.addEventListener('input', e => {
      search = e.target.value.trim();
      debounce(() => loadData(), 350)();
    });

    loadData();
  }

  async function loadData() {
    const listEl = document.getElementById(`${containerId}_list`);
    if (!listEl) return;
    try {
      const opts = { ...filterState };
      if (search && searchCol) opts.ilike = [searchCol, search];
      const { data } = await dbList(table, opts);
      if (!data.length) { listEl.innerHTML = emptyState(t('no_data'), onAdd ? `<button class="btn primary sm" onclick="window._crudAdd()">${t('add')}</button>` : ''); return; }
      listEl.innerHTML = `<div class="tbl-wrap"><table>
        <thead><tr>${cols.map(c => `<th>${App.lang === 'ar' ? c.ar : c.en}</th>`).join('')}<th></th></tr></thead>
        <tbody>${data.map(row => `<tr>
          ${cols.map(c => `<td>${renderRow(c.key, row)}</td>`).join('')}
          <td><div class="tbl-actions">
            ${onEdit ? `<button class="btn sm" onclick="window._crudEdit('${row.id}')">${t('edit')}</button>` : ''}
            ${onDelete ? `<button class="btn sm danger" onclick="window._crudDel('${row.id}')">${t('delete')}</button>` : ''}
          </div></td>
        </tr>`).join('')}</tbody>
      </table></div>`;
    } catch (e) { listEl.innerHTML = `<div style="padding:20px;color:var(--danger)">${e.message}</div>`; }
  }

  window._crudAdd  = () => onAdd?.(loadData);
  window._crudEdit = id => onEdit?.(id, loadData);
  window._crudDel  = id => confirmAction(t('confirm_delete'), async () => {
    try { await dbDelete(table, id); toast(t('deleted') || 'Deleted', 'success'); loadData(); } catch (e) { toast(e.message, 'error'); }
  });

  render();
}

// ── DEBOUNCE ───────────────────────────────────────────────────────
function debounce(fn, delay) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}

// ── DASHBOARD STATS LOADER ─────────────────────────────────────────
async function loadDivisionHealth() {
  try {
    const { data } = await sb.from('v_division_health').select('*');
    return data || [];
  } catch (_) { return []; }
}

// ── PAGE INIT HELPER ───────────────────────────────────────────────
async function initPage(opts = {}) {
  const profile = await initAuth(opts.role);
  if (!profile) return null;
  setLang(App.lang);
  startClock();
  loadNotifCount();
  if (opts.bgCanvas) initNetworkBg(opts.bgCanvas, opts.bgColor || '#2563EB');
  return profile;
}

// ── SE LOGO SVG ────────────────────────────────────────────────────
const SE_LOGO_SVG = `<svg viewBox="0 0 120 86" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:44px;height:32px">
  <defs>
    <linearGradient id="seG1" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#2563EB"/><stop offset="1" stop-color="#0EA5E9"/></linearGradient>
    <linearGradient id="seG2" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0EA5E9"/><stop offset="1" stop-color="#10B981"/></linearGradient>
  </defs>
  <path d="M4,28 C16,28 21,54 38,54 C55,54 60,28 76,28 L76,42 C60,42 55,68 38,68 C21,68 16,42 4,42 Z" fill="url(#seG1)"/>
  <path d="M40,10 C52,10 57,36 74,36 C91,36 96,10 110,10 L110,24 C96,24 91,50 74,50 C57,50 52,24 40,24 Z" fill="url(#seG2)"/>
</svg>`;

// ── GLOBAL SIDEBAR BUILDER ─────────────────────────────────────────
function buildSidebar(items, activeKey) {
  const nav = document.getElementById('navSection');
  if (!nav) return;
  nav.innerHTML = items.map(item => {
    if (item.group) return `<div class="nav-group-label">${App.lang === 'ar' ? item.group : item.groupEn}</div>`;
    const badge = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
    return `<button class="nav-item ${item.key === activeKey ? 'active' : ''}" onclick="${item.onclick || `go('${item.key}')`}">
      <span class="nav-ic">${item.icon}</span>
      <span>${App.lang === 'ar' ? item.ar : item.en}</span>
      ${badge}
    </button>`;
  }).join('');
}

// ── DIVISION SUMMARY CARDS ─────────────────────────────────────────
function divisionSummaryCard(div, data) {
  const cfg   = DIVISIONS[div] || {};
  const score = data?.health_score ?? 85;
  const sc    = score >= 80 ? 'success' : score >= 60 ? 'warning' : 'danger';
  return `
    <div class="div-node" onclick="window.location.href='${div}.html'">
      <span class="node-icon">${cfg.icon || '◧'}</span>
      <span class="node-name" style="color:${cfg.color}">${App.lang === 'ar' ? cfg.ar : cfg.en}</span>
      <span class="node-score text-${sc}">${score}%</span>
      ${progBar(score, sc)}
      <div class="text-xs text-muted">${data?.open_afis || 0} AFIs · ${data?.open_alerts || 0} Alerts</div>
    </div>`;
}

// ── EXPOSE GLOBALS ─────────────────────────────────────────────────
window.App = App;
window.sb  = sb;
window.t   = t;
window.setLang    = setLang;
window.toggleLang = toggleLang;
window.doLogout   = doLogout;
window.toast      = toast;
window.openModal  = openModal;
window.closeModal = closeModal;
window.mval       = mval;
window.mset       = mset;
window.fmtDate    = fmtDate;
window.fmtNum     = fmtNum;
window.esc        = esc;
window.isOverdue  = isOverdue;
window.priBadge   = priBadge;
window.stBadge    = stBadge;
window.progBar    = progBar;
window.skeletonRows     = skeletonRows;
window.emptyState       = emptyState;
window.dbList    = dbList;
window.dbGet     = dbGet;
window.dbInsert  = dbInsert;
window.dbUpdate  = dbUpdate;
window.dbDelete  = dbDelete;
window.dbCount   = dbCount;
window.initPage  = initPage;
window.buildSidebar = buildSidebar;
window.buildCrudTable = buildCrudTable;
window.confirmAction  = confirmAction;
window.logActivity    = logActivity;
window.sendNotif      = sendNotif;
window.initNetworkBg  = initNetworkBg;
window.loadDivisionHealth = loadDivisionHealth;
window.divisionSummaryCard = divisionSummaryCard;
window.DIVISIONS    = DIVISIONS;
window.ROLE_PORTALS = ROLE_PORTALS;
window.SE_LOGO_SVG  = SE_LOGO_SVG;
window.progBar      = progBar;
