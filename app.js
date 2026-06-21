'use strict';
/* ═══════════════════════════════════════════════════════
   Saudi Energy · OE Command Center · app.js
═══════════════════════════════════════════════════════ */
const _SU = 'https://ekywcrlcjgbjtwnjozov.supabase.co';
const _SK = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVreXdjcmxjamdianR3bmpvem92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4OTg5MzcsImV4cCI6MjA5NzQ3NDkzN30.TQxP2SUjaxSjdsBadmgHIBSVQ5B-YOLkvnl1JwyhISI';
const sb = supabase.createClient(_SU, _SK);

/* State */
const App = { user:null, profile:null, lang: localStorage.getItem('se_lang')||'ar' };

/* Config */
const DIVS = {
  governance:       {ar:'الحوكمة والتقييم',     en:'Governance',        color:'#7C3AED',rgb:'124,58,237', icon:'⚖️', file:'governance.html'},
  generation:       {ar:'التوليد',               en:'Generation',        color:'#F59E0B',rgb:'245,158,11',icon:'⚡', file:'generation.html'},
  national_grid:    {ar:'الشبكة الوطنية',        en:'National Grid',     color:'#0EA5E9',rgb:'14,165,233', icon:'🔌', file:'national-grid.html'},
  distribution:     {ar:'التوزيع',               en:'Distribution',      color:'#10B981',rgb:'16,185,129',icon:'🏘️',file:'distribution.html'},
  technical_alerts: {ar:'التنبيهات الفنية',      en:'Tech Alerts',       color:'#EF4444',rgb:'239,68,68',  icon:'⚠️',file:'technical-alerts.html'},
};
const PORTALS = {
  admin:'admin.html', director:'department.html',
  governance_manager:'governance.html', generation_manager:'generation.html',
  national_grid_manager:'national-grid.html', distribution_manager:'distribution.html',
  technical_alerts_manager:'technical-alerts.html', employee:'employee.html',
};
const ROLE_AR = {admin:'مشرف النظام',director:'مدير الإدارة',governance_manager:'مدير الحوكمة',generation_manager:'مدير التوليد',national_grid_manager:'مدير النقل',distribution_manager:'مدير التوزيع',technical_alerts_manager:'مدير التنبيهات',employee:'موظف'};

/* i18n */
const T = {
  ar:{save:'حفظ',cancel:'إلغاء',del:'حذف',search:'بحث...',nodata:'لا بيانات',confirm:'تأكيد الحذف؟',logout:'خروج',days:['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],months:['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']},
  en:{save:'Save',cancel:'Cancel',del:'Delete',search:'Search...',nodata:'No data',confirm:'Confirm delete?',logout:'Logout',days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],months:['January','February','March','April','May','June','July','August','September','October','November','December']},
};
const t = k => T[App.lang]?.[k] ?? k;

/* Language */
function setLang(l) {
  App.lang=l; localStorage.setItem('se_lang',l);
  document.documentElement.lang=l;
  document.documentElement.dir=l==='ar'?'rtl':'ltr';
}
function toggleLang(){ setLang(App.lang==='ar'?'en':'ar'); location.reload(); }

/* Auth */
async function initAuth(roles) {
  const {data:{session}} = await sb.auth.getSession();
  if(!session){ location.href='index.html'; return null; }
  const {data:p} = await sb.from('profiles').select('*').eq('id',session.user.id).single();
  if(!p){ await sb.auth.signOut(); location.href='index.html'; return null; }
  App.user=session.user; App.profile=p;
  if(roles){
    const ok=Array.isArray(roles)?roles.includes(p.role):p.role===roles;
    if(!ok && p.role!=='admin'){ location.href=PORTALS[p.role]||'index.html'; return null; }
  }
  sb.from('profiles').update({last_login:new Date().toISOString()}).eq('id',p.id).catch(()=>{});
  _renderBadge(); setLang(p.preferences?.lang||App.lang);
  return p;
}
async function doLogout(){ await sb.auth.signOut(); location.href='index.html'; }

function _renderBadge(){
  const el=document.getElementById('ubEl'); if(!el) return;
  const p=App.profile;
  const init=(p.full_name||'U').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  const d=DIVS[p.division]; const dc=d?.color||'#2563EB';
  el.innerHTML=`<div class="ub-av" style="background:${dc}22;color:${dc}">${init}</div>
    <div style="flex:1;min-width:0"><div class="ub-nm">${esc(App.lang==='ar'?p.full_name||'':p.full_name_en||p.full_name||'')}</div>
    <div class="ub-rl">${ROLE_AR[p.role]||p.role}</div></div>
    <div class="on-dot"></div>`;
}

/* Clock */
function startClock(){
  const ct=document.getElementById('ct'), cd=document.getElementById('cd');
  if(!ct&&!cd) return;
  function tick(){
    const n=new Date(),h=n.getHours(),l=App.lang;
    const hh=String(h%12||12).padStart(2,'0'),mm=String(n.getMinutes()).padStart(2,'0'),ss=String(n.getSeconds()).padStart(2,'0');
    if(ct) ct.textContent=`${hh}:${mm}:${ss} ${h<12?(l==='ar'?'ص':'AM'):(l==='ar'?'م':'PM')}`;
    if(cd){const ti=T[l];cd.textContent=`${ti.days[n.getDay()]}، ${n.getDate()} ${ti.months[n.getMonth()]} ${n.getFullYear()}`;}
  }
  tick(); setInterval(tick,1000);
}

/* Toast */
function toast(msg,type='i',dur=3500){
  let c=document.getElementById('tc');
  if(!c){c=document.createElement('div');c.id='tc';document.body.appendChild(c);}
  const icons={s:'✓',e:'✕',i:'ℹ',w:'⚠'};
  const el=document.createElement('div');
  el.className=`toast ${type}`;
  el.innerHTML=`<span>${icons[type]||'•'}</span><span style="flex:1">${msg}</span><button style="opacity:.55" onclick="this.parentElement.remove()">×</button>`;
  c.appendChild(el);
  setTimeout(()=>{el.style.opacity='0';el.style.transition='opacity .35s';},dur-350);
  setTimeout(()=>el.remove(),dur);
}

/* Modal */
function openModal(html,cls=''){
  closeModal();
  const bd=document.createElement('div');
  bd.className='mbg';bd.id='M';
  bd.innerHTML=`<div class="modal ${cls}">${html}</div>`;
  bd.addEventListener('click',e=>{if(e.target===bd)closeModal();});
  document.body.appendChild(bd);
  document.addEventListener('keydown',_escK);
}
function closeModal(){ document.getElementById('M')?.remove(); document.removeEventListener('keydown',_escK); }
const _escK=e=>{if(e.key==='Escape')closeModal();};
const mv=id=>document.getElementById(id)?.value?.trim()||'';
const ms=(id,v)=>{const el=document.getElementById(id);if(el)el.value=v??'';};

/* DB */
async function dbList(tbl,opts={}){
  let q=sb.from(tbl).select(opts.sel||'*',opts.cnt?{count:'exact'}:undefined);
  if(opts.eq) Object.entries(opts.eq).forEach(([k,v])=>{q=q.eq(k,v);});
  if(opts.neq) Object.entries(opts.neq).forEach(([k,v])=>{q=q.neq(k,v);});
  if(opts.in) Object.entries(opts.in).forEach(([k,v])=>{q=q.in(k,v);});
  if(opts.ilike) q=q.ilike(opts.ilike[0],`%${opts.ilike[1]}%`);
  q=q.order(opts.ord||'created_at',{ascending:opts.asc??false});
  if(opts.lim) q=q.limit(opts.lim);
  const {data,error,count}=await q;
  if(error) throw error;
  return {data:data||[],count};
}
async function dbGet(tbl,id){const{data,error}=await sb.from(tbl).select('*').eq('id',id).single();if(error)throw error;return data;}
async function dbIns(tbl,row){const{data,error}=await sb.from(tbl).insert(row).select().single();if(error)throw error;return data;}
async function dbUpd(tbl,id,p){const{data,error}=await sb.from(tbl).update(p).eq('id',id).select().single();if(error)throw error;return data;}
async function dbDel(tbl,id){const{error}=await sb.from(tbl).delete().eq('id',id);if(error)throw error;}
async function dbCnt(tbl,opts={}){const{count}=await dbList(tbl,{...opts,cnt:true,lim:1});return count||0;}

/* Formatters */
const fmtD=d=>d?new Date(d).toLocaleDateString(App.lang==='ar'?'ar-SA':'en-GB',{year:'numeric',month:'short',day:'numeric'}):'—';
const fmtN=n=>n!=null?Number(n).toLocaleString(App.lang==='ar'?'ar-SA':'en'):'—';
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const isOD=(d,s)=>d&&!['closed','done','resolved'].includes(s)&&new Date(d)<new Date();

function priBadge(p){
  const cls={low:'bg',medium:'bb',high:'by',critical:'br'};
  const lA={low:'منخفضة',medium:'متوسطة',high:'عالية',critical:'حرجة'};
  const lE={low:'Low',medium:'Medium',high:'High',critical:'Critical'};
  return `<span class="badge ${cls[p]||'bg'}">${(App.lang==='ar'?lA:lE)[p]||p}</span>`;
}
function stBadge(s){
  const cls={open:'bg',new:'bg',planning:'bg',in_progress:'bb',assigned:'bb',pending_review:'by',pending_verification:'by',closed:'bgn',resolved:'bgn',done:'bgn',overdue:'br',returned:'br',escalated:'br',assessment:'bb',review:'by',approval:'by',evidence_collection:'bb'};
  const lA={open:'مفتوح',new:'جديد',planning:'تخطيط',in_progress:'قيد التنفيذ',assigned:'مكلّف',pending_review:'بانتظار المراجعة',pending_verification:'بانتظار التحقق',closed:'مغلق',resolved:'محلول',done:'منجز',overdue:'متأخر',returned:'مُعاد',escalated:'مُصعَّد',assessment:'تقييم',review:'مراجعة',approval:'اعتماد',evidence_collection:'جمع أدلة'};
  const lE={open:'Open',new:'New',planning:'Planning',in_progress:'In Progress',assigned:'Assigned',pending_review:'Pending Review',pending_verification:'Pending Verify',closed:'Closed',resolved:'Resolved',done:'Done',overdue:'Overdue',returned:'Returned',escalated:'Escalated',assessment:'Assessment',review:'Review',approval:'Approval',evidence_collection:'Evidence'};
  return `<span class="badge ${cls[s]||'bg'}">${(App.lang==='ar'?lA:lE)[s]||s}</span>`;
}
function progBar(pct,cl=''){
  const c=cl||(pct>=80?'grn':pct>=50?'':'red');
  return `<div class="prog"><div class="pf ${c}" style="width:${pct}%"></div></div>`;
}

const skR=(n=4)=>Array.from({length:n},()=>'<div class="sk skr"></div>').join('');
const emptyEl=(msg,btn='')=>`<div class="empty"><div class="ei">📭</div><p>${msg}</p>${btn}</div>`;

/* Canvas animations */
function initCanvas(id,type,color){
  const cv=document.getElementById(id); if(!cv) return;
  const cx=cv.getContext('2d'); let W,H,nodes=[],particles=[],t=0;

  function resize(){
    const r=cv.parentElement.getBoundingClientRect();
    W=cv.width=r.width; H=cv.height=r.height; build();
  }
  function build(){
    nodes=[];particles=[];
    if(type==='net'){const n=Math.floor(W*H/4800);for(let i=0;i<n;i++)nodes.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*2.5+1,p:Math.random()*6.28,hub:Math.random()>.8});}
    if(type==='energy'){for(let i=0;i<50;i++)particles.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()>.5?1:-1)*(Math.random()*1.5+.5),vy:(Math.random()-.5)*.3,r:Math.random()*2+1,trail:[],mt:14});}
    if(type==='grid'){const cols=Math.floor(W/88)+1,rows=Math.floor(H/58)+1;for(let c=0;c<cols;c++)for(let r=0;r<rows;r++)nodes.push({x:c*88+44,y:r*58+29,hub:Math.random()>.72});}
    if(type==='city'){const n=Math.floor(W*H/6500);for(let i=0;i<n;i++)nodes.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*.9+.5,p:Math.random()*6.28,hub:Math.random()>.82});}
    if(type==='radar'){nodes=[{cx:W/2,cy:H/2,R:Math.min(W,H)*.42,angle:0}];}
  }

  const hex=v=>Math.floor(v*255).toString(16).padStart(2,'0');

  function draw(){
    t+=.008; cx.clearRect(0,0,W,H);
    if(type==='net'){
      cx.fillStyle='rgba(0,0,0,.05)';cx.fillRect(0,0,W,H);
      nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;n.p+=.018;if(n.x<0||n.x>W)n.vx*=-1;if(n.y<0||n.y>H)n.vy*=-1;});
      for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
        const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d>130)continue;
        const al=(1-d/130)*.22;
        cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.strokeStyle=color+hex(al);cx.lineWidth=.6;cx.stroke();
        const fp=((t*.9+i*.25)%1);
        cx.beginPath();cx.arc(a.x+(b.x-a.x)*fp,a.y+(b.y-a.y)*fp,1.8,0,6.28);cx.fillStyle=color+hex(al*2);cx.fill();
      }
      nodes.forEach(n=>{
        const g=Math.sin(n.p)*.4+.6;
        if(n.hub){cx.beginPath();cx.arc(n.x,n.y,n.r*3,0,6.28);cx.strokeStyle=color+hex(.15*g);cx.lineWidth=1;cx.stroke();}
        cx.beginPath();cx.arc(n.x,n.y,n.r,0,6.28);cx.fillStyle=color+hex(n.hub?.85:.6*g);cx.fill();
      });
    }
    if(type==='energy'){
      cx.fillStyle='rgba(0,0,0,.07)';cx.fillRect(0,0,W,H);
      for(let y=H*.15;y<H;y+=H*.15){cx.beginPath();cx.moveTo(0,y);cx.lineTo(W,y);cx.strokeStyle=color+hex(.04);cx.lineWidth=.5;cx.stroke();}
      particles.forEach(p=>{
        p.x+=p.vx;p.y+=p.vy+Math.sin(t+p.x*.01)*.45;
        if(p.x<-10)p.x=W+10;if(p.x>W+10)p.x=-10;if(p.y<0||p.y>H)p.vy*=-1;
        p.trail.unshift({x:p.x,y:p.y});if(p.trail.length>p.mt)p.trail.pop();
        p.trail.forEach((pt,i)=>{const al=(1-i/p.mt)*.5;cx.beginPath();cx.arc(pt.x,pt.y,p.r*(1-i/p.mt*.65),0,6.28);cx.fillStyle=color+hex(al);cx.fill();});
        cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.28);cx.fillStyle=color+'bb';cx.fill();
      });
    }
    if(type==='grid'){
      cx.fillStyle='rgba(0,0,0,.06)';cx.fillRect(0,0,W,H);
      for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
        const a=nodes[i],b=nodes[j];
        if(Math.abs(a.x-b.x)>90||Math.abs(a.y-b.y)>60)continue;
        cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.strokeStyle=color+hex(.18);cx.lineWidth=.6;cx.stroke();
        if(Math.random()<.002)particles.push({ax:a.x,ay:a.y,bx:b.x,by:b.y,p:0});
      }
      particles=particles.filter(p=>{p.p+=.04;return p.p<1;});
      particles.forEach(p=>{const x=p.ax+(p.bx-p.ax)*p.p,y=p.ay+(p.by-p.ay)*p.p;cx.beginPath();cx.arc(x,y,3,0,6.28);cx.fillStyle=color+hex(1-p.p);cx.fill();});
      nodes.forEach(n=>{const g=Math.sin(t+n.x*.02)*.5+.5;if(n.hub){cx.beginPath();cx.arc(n.x,n.y,7,0,6.28);cx.fillStyle=color+hex(.1*g);cx.fill();}cx.beginPath();cx.arc(n.x,n.y,n.hub?3:1.5,0,6.28);cx.fillStyle=color+(n.hub?'cc':'66');cx.fill();});
    }
    if(type==='city'){
      cx.fillStyle='rgba(0,0,0,.06)';cx.fillRect(0,0,W,H);
      nodes.forEach(n=>{n.p+=.014;});
      for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
        const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d>105)continue;
        cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.strokeStyle=color+hex((1-d/105)*.11);cx.lineWidth=.5;cx.stroke();
      }
      if(Math.random()<.04){const n=nodes[Math.floor(Math.random()*nodes.length)];const adj=nodes.filter(m=>Math.hypot(m.x-n.x,m.y-n.y)<105&&m!==n);if(adj.length)particles.push({ax:n.x,ay:n.y,bx:adj[0].x,by:adj[0].y,p:0});}
      particles=particles.filter(p=>{p.p+=.025;return p.p<1;});
      particles.forEach(p=>{const x=p.ax+(p.bx-p.ax)*p.p,y=p.ay+(p.by-p.ay)*p.p;cx.beginPath();cx.arc(x,y,2.5,0,6.28);cx.fillStyle=color+hex(.9-p.p*.7);cx.fill();});
      nodes.forEach(n=>{const g=Math.sin(n.p)*.4+.6;if(n.hub){cx.beginPath();cx.arc(n.x,n.y,8,0,6.28);cx.strokeStyle=color+hex(.1*g);cx.lineWidth=1;cx.stroke();}cx.beginPath();cx.arc(n.x,n.y,n.r*(n.hub?2.5:1),0,6.28);cx.fillStyle=color+(n.hub?'cc':'66');cx.fill();});
    }
    if(type==='radar'){
      const nd=nodes[0]; nd.angle+=.024;
      for(let r=.33;r<=1;r+=.33){cx.beginPath();cx.arc(nd.cx,nd.cy,nd.R*r,0,6.28);cx.strokeStyle=color+hex(.18);cx.lineWidth=.7;cx.stroke();}
      cx.strokeStyle=color+hex(.12);cx.lineWidth=.5;
      cx.beginPath();cx.moveTo(nd.cx-nd.R,nd.cy);cx.lineTo(nd.cx+nd.R,nd.cy);cx.stroke();
      cx.beginPath();cx.moveTo(nd.cx,nd.cy-nd.R);cx.lineTo(nd.cx,nd.cy+nd.R);cx.stroke();
      for(let i=0;i<60;i++){const a=nd.angle-i*.05,al=Math.max(0,(60-i)/60)*.42;cx.beginPath();cx.moveTo(nd.cx,nd.cy);cx.arc(nd.cx,nd.cy,nd.R,a,a+.06);cx.closePath();cx.fillStyle=color+hex(al);cx.fill();}
      cx.beginPath();cx.moveTo(nd.cx,nd.cy);cx.lineTo(nd.cx+Math.cos(nd.angle)*nd.R,nd.cy+Math.sin(nd.angle)*nd.R);cx.strokeStyle=color+'dd';cx.lineWidth=1.5;cx.stroke();
      cx.beginPath();cx.arc(nd.cx,nd.cy,4,0,6.28);cx.fillStyle=color;cx.fill();
    }
    requestAnimationFrame(draw);
  }
  resize(); window.addEventListener('resize',resize); draw();
}

/* Build sidebar nav */
function buildNav(items,active){
  const el=document.getElementById('navEl'); if(!el) return;
  el.innerHTML=items.map(item=>{
    if(item.g) return `<div class="ng">${App.lang==='ar'?item.g:item.ge}</div>`;
    const badge=item.badge?`<span class="badge">${item.badge}</span>`:'';
    return `<button class="ni ${item.k===active?'on':''}" onclick="${item.fn||`go('${item.k}')`}">
      <span class="ic">${item.ic}</span><span>${App.lang==='ar'?item.ar:item.en}</span>${badge}
    </button>`;
  }).join('');
}

/* Division health */
async function loadHealth(){
  try{const{data}=await sb.from('v_division_health').select('*');return data||[];}catch{return[];}
}

/* Page init */
async function initPage(opts={}){
  const p=await initAuth(opts.roles); if(!p) return null;
  setLang(App.lang); startClock(); return p;
}

/* Confirm */
function confirm2(msg,fn){
  openModal(`<div class="mh"><h3>⚠ تأكيد</h3><button class="mx" onclick="closeModal()">×</button></div>
    <div class="mbd"><p style="font-size:14px">${msg}</p></div>
    <div class="mf"><button class="btn" onclick="closeModal()">${t('cancel')}</button>
    <button class="btn d" onclick="closeModal();(${fn.toString()})()">${App.lang==='ar'?'نعم':'Yes'}</button></div>`);
}

/* Log */
async function logAct(action,etype,eid,details={}){
  try{if(App.profile)await dbIns('activity_log',{user_id:App.profile.id,action,entity_type:etype,entity_id:eid,details});}catch{}
}

/* SE Logo — image file (se-logo.png.PNG in same folder) */
const LOGO='<img src="se-logo.png.PNG" alt="Saudi Energy" style="height:32px;width:auto;object-fit:contain;display:block">';

Object.assign(window,{App,sb,DIVS,PORTALS,T,t,setLang,toggleLang,doLogout,initAuth,initPage,_renderBadge,startClock,toast,openModal,closeModal,mv,ms,dbList,dbGet,dbIns,dbUpd,dbDel,dbCnt,fmtD,fmtN,esc,isOD,priBadge,stBadge,progBar,skR,emptyEl,initCanvas,buildNav,loadHealth,confirm2,logAct,LOGO});
