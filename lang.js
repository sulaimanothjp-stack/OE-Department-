```javascript
/* ═══════════════════════════════════════════════════════════════
   Saudi Energy · OE Command Center
   lang.js — Translation Dictionary & Safe Localization
═══════════════════════════════════════════════════════════════ */

const LANGS = {
  ar: { name:'العربية',    dir:'rtl', flag:'🇸🇦' },
  en: { name:'English',    dir:'ltr', flag:'🇬🇧' },
};

/* تم إزالة سكربت الاستبدال العشوائي (Auto-Translator) الذي كان يسبب تداخل اللغات (مثل: إدارة Tasks) 
   الآن يتم الاعتماد كلياً على دالة t2() الموجودة في app.js لترجمة النصوص بشكل آمن ودقيق */

function openLangPicker() {
  const current = (typeof App !== 'undefined' ? App.lang : null) || localStorage.getItem('se_lang_v2') || 'en';
  const items = Object.entries(LANGS).map(([code, info]) =>
    `<button onclick="selectLang('${code}')" style="
      display:flex;align-items:center;gap:10px;width:100%;padding:10px 14px;
      background:${code===current?'rgba(37,99,235,.15)':'transparent'};
      border:1px solid ${code===current?'rgba(37,99,235,.35)':'transparent'};
      border-radius:8px;cursor:pointer;text-align:right;margin-bottom:4px;
      color:${code===current?'#60A5FA':'var(--t1, #E8F0FF)'};font-family:'IBM Plex Sans Arabic',sans-serif;font-size:13.5px;
      transition:.14s" onmouseover="this.style.background='rgba(37,99,235,.08)'" onmouseout="this.style.background='${code===current?'rgba(37,99,235,.15)':'transparent'}'">
      <span style="font-size:18px">${info.flag}</span>
      <span style="flex:1">${info.name}</span>
      ${code===current?'<span style="color:#60A5FA;font-size:12px">✓</span>':''}
    </button>`
  ).join('');

  if(typeof openModal !== 'undefined') {
    openModal(`
      <div class="mh"><h3 style="font-family:var(--hud)">🌐 ${current === 'ar' ? 'اللغة' : 'Language'}</h3><button class="mx" onclick="closeModal()">×</button></div>
      <div class="mbd" style="max-height:70vh;overflow-y:auto">${items}</div>
    `);
  }
}

function selectLang(code) {
  if(typeof App !== 'undefined') App.lang = code;
  localStorage.setItem('se_lang_v2', code);
  localStorage.setItem('se_lang_ver', '3');
  const info = LANGS[code];
  document.documentElement.lang = code;
  document.documentElement.dir = info.dir;
  if(typeof closeModal !== 'undefined') closeModal();
  
  // Re-render current page with new language
  setTimeout(() => {
    // Re-run current page function
    if(typeof window._currentPage !== 'undefined' && typeof window.PAGES !== 'undefined') {
      const fn = window.PAGES[window._currentPage];
      const ct = document.getElementById('pgContent') || document.getElementById('pageArea');
      if(fn && ct) {
        ct.innerHTML = '<div class="fade" id="pg"></div>';
        fn(document.getElementById('pg') || ct);
      }
    }
    // Re-render nav
    if(typeof window._currentNav !== 'undefined' && typeof buildNav !== 'undefined') {
      buildNav(window._currentNav, window._currentPage);
    }
    // Update page title
    if(window._currentNav && window._currentPage) {
      const item = window._currentNav.find(n => n.k === window._currentPage);
      const ptEl = document.getElementById('pgtitle');
      if(item && ptEl) ptEl.textContent = code === 'ar' ? item.ar : item.en;
    }
    
    // For Admin page reload if needed
    if(window.renderUsers && window._currentPage === 'users') renderUsers();
    if(window.renderDivs && window._currentPage === 'divs') renderDivs();
    if(window.renderSettings && window._currentPage === 'settings') renderSettings();
    if(window.renderHealth && window._currentPage === 'health') renderHealth();

  }, 50);
}

if(typeof window !== 'undefined') {
  Object.assign(window, { LANGS, openLangPicker, selectLang });
}

```
