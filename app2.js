'use strict';

// 1. قاعدة بيانات وهمية (Mock DB) للتبسيط حالياً بديل عن Supabase
// الأرقام الوظيفية للتجربة: 1000 (مدير إدارة), 2000 (مدير توزيع), 3000 (موظف توزيع)
const MOCK_USERS = {
    '1000': { name: 'Abdullah Al-Dosari', role: 'oe_director', dept: 'OE Center', deptKey: 'dept', pass: '123' },
    '2000': { name: 'Khalid Al-Ghamdi', role: 'dept_manager', dept: 'Distribution', deptKey: 'dist', pass: '123' },
    '3000': { name: 'Faisal Mohammed', role: 'employee', dept: 'Distribution', deptKey: 'dist', pass: '123' }
};

// 2. إعدادات الأقسام (الألوان والثيمات كما كانت سابقاً)
const DEPT_CONFIG = {
    dept: { color: '#D4AF37', cv: 'net', ar: 'إدارة التميز التشغيلي' },
    dist: { color: '#10B981', cv: 'city', ar: 'التوزيع' },
    gen:  { color: '#F59E0B', cv: 'energy', ar: 'التوليد' },
    grid: { color: '#0EA5E9', cv: 'grid', ar: 'الشبكة' }
};

let CURRENT_USER = null;
let LANG = 'en';

// ==========================================
// وظائف تسجيل الدخول والتحكم بالواجهات
// ==========================================

function handleLogin() {
    const id = document.getElementById('userid').value;
    const pass = document.getElementById('password').value;
    const err = document.getElementById('login-error');
    
    // التحقق من قاعدة البيانات (لاحقاً سيتم استبدالها باستعلام Supabase)
    const user = MOCK_USERS[id];
    
    if (user && user.pass === pass) {
        err.style.display = 'none';
        CURRENT_USER = user;
        startAppSession(user);
    } else {
        err.style.display = 'block';
        err.innerText = LANG === 'ar' ? 'الرقم الوظيفي أو كلمة المرور غير صحيحة' : 'Invalid ID or Password';
    }
}

function startAppSession(user) {
    // 1. إخفاء شاشة الدخول وإظهار الداشبورد
    document.getElementById('login-view').style.display = 'none';
    document.getElementById('app-view').style.display = 'flex';
    document.getElementById('langBtn').style.display = 'none'; // نخفي زر اللغة الخارجي
    
    // 2. تطبيق هوية المستخدم
    const deptInfo = DEPT_CONFIG[user.deptKey] || DEPT_CONFIG['dept'];
    
    document.getElementById('prof-name').innerText = user.name;
    document.getElementById('prof-role').innerText = formatRole(user.role);
    document.getElementById('prof-dept').innerText = LANG === 'ar' ? deptInfo.ar : user.dept;
    
    // 3. تغيير ثيم النظام (اللون الخلفي والمؤثرات) حسب دائرته
    document.documentElement.style.setProperty('--primary', deptInfo.color);
    
    // 4. بناء القائمة الجانبية (Routing) حسب الصلاحية
    buildSidebar(user.role);
    
    // 5. تحميل الصفحة الرئيسية للداشبورد
    loadDashboardData(user);
}

function logout() {
    CURRENT_USER = null;
    document.getElementById('app-view').style.display = 'none';
    document.getElementById('login-view').style.display = 'flex';
    document.getElementById('langBtn').style.display = 'block';
    document.getElementById('userid').value = '';
    document.getElementById('password').value = '';
}

// ==========================================
// بناء القوائم والداشبورد (Routing)
// ==========================================

function buildSidebar(role) {
    const menu = document.getElementById('nav-menu');
    menu.innerHTML = ''; // تفريغ القائمة
    
    // عناصر مشتركة للجميع
    addMenuItem(menu, '🏠 Dashboard', 'dashboard', true);
    addMenuItem(menu, '✅ Daily Routine', 'routine');
    addMenuItem(menu, '📋 My Tasks', 'tasks');
    addMenuItem(menu, '🎫 Tickets & Requests', 'tickets');

    // ميزات خاصة بمدراء الدوائر ومدير التميز
    if (role === 'dept_manager' || role === 'oe_director') {
        addMenuItem(menu, '👥 Team Management', 'team');
        addMenuItem(menu, '📊 Analytics Tracking', 'tracking');
    }
    
    // ميزات خاصة بمدير التميز فقط
    if (role === 'oe_director') {
        addMenuItem(menu, '🏢 All Departments', 'all_depts');
    }
    
    // غرفة الاجتماعات (مشتركة للمدراء فقط)
    if (role === 'dept_manager' || role === 'oe_director') {
        const li = document.createElement('li');
        li.innerHTML = '🤝 Managers Meeting Room';
        li.onclick = () => document.getElementById('meeting-modal').style.display = 'flex';
        menu.appendChild(li);
    }
}

function addMenuItem(parent, text, actionKey, isActive = false) {
    const li = document.createElement('li');
    li.innerHTML = text;
    if(isActive) li.className = 'active';
    li.onclick = (e) => {
        // إزالة التفعيل من البقية
        document.querySelectorAll('.nav-menu li').forEach(el => el.classList.remove('active'));
        e.target.classList.add('active');
        // هنا يتم تبديل المحتوى في المستقبل بناء على actionKey
        document.getElementById('page-title').innerText = text.substring(2); // إزالة الإيموجي
    };
    parent.appendChild(li);
}

function loadDashboardData(user) {
    const cards = document.getElementById('dashboard-cards');
    
    if (user.role === 'oe_director') {
        cards.innerHTML = `
            <div class="card"><h4>Total Tasks (All Depts)</h4><div class="value">1,240</div></div>
            <div class="card"><h4>Delayed Tasks</h4><div class="value" style="color:#EF4444">18</div></div>
            <div class="card"><h4>Active Meetings</h4><div class="value">2</div></div>
        `;
    } else if (user.role === 'dept_manager') {
        cards.innerHTML = `
            <div class="card"><h4>Department Tasks</h4><div class="value">345</div></div>
            <div class="card"><h4>Team Members</h4><div class="value">12</div></div>
            <div class="card"><h4>Help Requests (Internal)</h4><div class="value" style="color:#F59E0B">4</div></div>
        `;
    } else {
        // Employee
        cards.innerHTML = `
            <div class="card"><h4>My Pending Tasks</h4><div class="value">5</div></div>
            <div class="card"><h4>Completed This Week</h4><div class="value" style="color:#10B981">12</div></div>
            <div class="card"><h4>My Active Tickets</h4><div class="value">1</div></div>
        `;
    }
}

// ==========================================
// وظائف مساعدة
// ==========================================

function formatRole(role) {
    if(role === 'oe_director') return LANG === 'ar' ? 'مدير إدارة التميز' : 'OE Director';
    if(role === 'dept_manager') return LANG === 'ar' ? 'مدير دائرة' : 'Department Manager';
    return LANG === 'ar' ? 'موظف' : 'Employee';
}

function toggleLang() {
    LANG = LANG === 'en' ? 'ar' : 'en';
    const isAr = LANG === 'ar';
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    
    document.getElementById('langBtn').innerText = isAr ? '🌐 English' : '🌐 العربية';
    document.getElementById('lbl-title').innerText = isAr ? 'بوابة التميز التشغيلي' : 'OE COMMAND CENTER';
    document.getElementById('lbl-user').innerText = isAr ? 'الرقم الوظيفي' : 'Employee ID / Username';
    document.getElementById('lbl-pass').innerText = isAr ? 'كلمة المرور' : 'Password';
    document.getElementById('lbl-btn').innerText = isAr ? 'دخول' : 'Sign In';
}

function checkMeetingPin() {
    const pin = document.getElementById('meeting-pin').value;
    if(pin === '0000') { // رمز افتراضي
        document.getElementById('meeting-modal').style.display = 'none';
        alert("Welcome to the Meeting Room Dashboard! (Action Items & Deadlines will be here)");
        // سيتم برمجة واجهة الاجتماعات هنا لاحقاً
    } else {
        alert("Incorrect PIN");
    }
}

// تشغيل الخلفية البسيطة (نفس خلفية دخولك القديمة)
function drawBg(){
    const c = document.getElementById('bgcv'), cx = c.getContext('2d');
    let W = c.width = window.innerWidth, H = c.height = window.innerHeight;
    let pts = [];
    for(let i=0; i<40; i++) pts.push({x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-.5)*.5, vy: (Math.random()-.5)*.5, r: Math.random()*2});
    function draw() {
        cx.clearRect(0,0,W,H);
        pts.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1;
            cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.28); cx.fillStyle='rgba(37,99,235,0.2)'; cx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
}
drawBg();
