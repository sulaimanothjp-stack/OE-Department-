```javascript
/* ═══════════════════════════════════════════════════════════════
   Saudi Energy · OE Command Center
   lang.js — 12-Language Translation Dictionary
   Languages: ar, en, fr, es, it, pt, de, ru, ko, zh, ja, ur
═══════════════════════════════════════════════════════════════ */

const LANGS = {
  ar: { name:'العربية',    dir:'rtl', flag:'🇸🇦' },
  en: { name:'English',    dir:'ltr', flag:'🇬🇧' },
  fr: { name:'Français',   dir:'ltr', flag:'🇫🇷' },
  es: { name:'Español',    dir:'ltr', flag:'🇪🇸' },
  it: { name:'Italiano',   dir:'ltr', flag:'🇮🇹' },
  pt: { name:'Português',  dir:'ltr', flag:'🇧🇷' },
  de: { name:'Deutsch',    dir:'ltr', flag:'🇩🇪' },
  ru: { name:'Русский',    dir:'ltr', flag:'🇷🇺' },
  ko: { name:'한국어',       dir:'ltr', flag:'🇰🇷' },
  zh: { name:'中文',         dir:'ltr', flag:'🇨🇳' },
  ja: { name:'日本語',       dir:'ltr', flag:'🇯🇵' },
  ur: { name:'اردو',        dir:'rtl', flag:'🇵🇰' },
};

const TR = {
  /* ── Navigation ──────────────────────────────────────── */
  nav_dashboard:    { ar:'لوحة التحكم',    en:'Dashboard',       fr:'Tableau de bord', es:'Panel',          it:'Pannello',         pt:'Painel',          de:'Dashboard',        ru:'Панель',           ko:'대시보드',          zh:'仪表板',          ja:'ダッシュボード',   ur:'ڈیش بورڈ' },
  nav_tasks:        { ar:'المهام',         en:'Tasks',           fr:'Tâches',           es:'Tareas',         it:'Attività',         pt:'Tarefas',         de:'Aufgaben',         ru:'Задачи',           ko:'작업',             zh:'任务',            ja:'タスク',          ur:'کام' },
  nav_team:         { ar:'الفريق',         en:'Team',            fr:'Équipe',           es:'Equipo',         it:'Squadra',          pt:'Equipe',          de:'Team',             ru:'Команда',          ko:'팀',               zh:'团队',            ja:'チーム',          ur:'ٹیم' },
  nav_afis:         { ar:'نقاط التحسين',   en:'AFIs',            fr:'AFIs',             es:'AFIs',           it:'AFIs',             pt:'AFIs',            de:'AFIs',             ru:'AFIs',             ko:'AFIs',             zh:'AFIs',            ja:'AFIs',           ur:'AFIs' },
  nav_kpis:         { ar:'مؤشرات الأداء',  en:'KPIs',            fr:'KPIs',             es:'KPIs',           it:'KPIs',             pt:'KPIs',            de:'KPIs',             ru:'КПЭ',              ko:'KPIs',             zh:'KPIs',            ja:'KPI',            ur:'KPIs' },
  nav_alerts:       { ar:'التنبيهات',      en:'Alerts',          fr:'Alertes',          es:'Alertas',        it:'Avvisi',           pt:'Alertas',         de:'Warnungen',        ru:'Оповещения',       ko:'경보',             zh:'警报',            ja:'アラート',        ur:'اطلاعات' },
  nav_assessments:  { ar:'التقييمات',      en:'Assessments',     fr:'Évaluations',      es:'Evaluaciones',   it:'Valutazioni',      pt:'Avaliações',      de:'Bewertungen',      ru:'Оценки',           ko:'평가',             zh:'评估',            ja:'評価',            ur:'تشخیص' },
  nav_tickets:      { ar:'التذاكر',        en:'Tickets',         fr:'Tickets',          es:'Tickets',        it:'Ticket',           pt:'Tickets',         de:'Tickets',          ru:'Тикеты',           ko:'티켓',             zh:'工单',            ja:'チケット',        ur:'ٹکٹ' },
  nav_docs:         { ar:'الوثائق',        en:'Documents',       fr:'Documents',        es:'Documentos',     it:'Documenti',        pt:'Documentos',      de:'Dokumente',        ru:'Документы',        ko:'문서',             zh:'文件',            ja:'書類',            ur:'دستاویزات' },
  nav_meetings:     { ar:'الاجتماعات',     en:'Meetings',        fr:'Réunions',         es:'Reuniones',      it:'Riunioni',         pt:'Reuniões',        de:'Besprechungen',    ru:'Встречи',          ko:'회의',             zh:'会议',            ja:'会議',            ur:'میٹنگز' },
  nav_initiatives:  { ar:'المبادرات',      en:'Initiatives',     fr:'Initiatives',      es:'Iniciativas',    it:'Iniziative',       pt:'Iniciativas',     de:'Initiativen',      ru:'Инициативы',       ko:'이니셔티브',         zh:'计划',            ja:'イニシアチブ',    ur:'اقدامات' },
  nav_settings:     { ar:'الإعدادات',      en:'Settings',        fr:'Paramètres',       es:'Configuración',  it:'Impostazioni',     pt:'Configurações',   de:'Einstellungen',    ru:'Настройки',        ko:'설정',             zh:'设置',            ja:'設定',            ur:'ترتیبات' },
  nav_signals:      { ar:'مؤشر أدائي',     en:'My Performance',  fr:'Ma Performance',   es:'Mi Rendimiento', it:'La Mia Performance',pt:'Meu Desempenho',  de:'Meine Leistung',   ru:'Моя Производительность',ko:'내 성과',           zh:'我的绩效',         ja:'私の成績',        ur:'میری کارکردگی' },
  nav_daily_update: { ar:'تحديث اليوم',    en:'Daily Update',    fr:'Mise à jour',      es:'Actualización',  it:'Aggiornamento',    pt:'Atualização',     de:'Tagesupdate',      ru:'Обновление',       ko:'일일 업데이트',      zh:'日常更新',         ja:'日次更新',        ur:'روزانہ اپ ڈیٹ' },
  nav_reviews:      { ar:'مراجعة الإنجازات',en:'Review Completions',fr:'Révisions',     es:'Revisiones',     it:'Revisioni',        pt:'Revisões',        de:'Überprüfungen',    ru:'Обзоры',           ko:'완료 검토',         zh:'完成审查',         ja:'完了レビュー',    ur:'نظرثانی' },
  nav_users:        { ar:'إدارة المستخدمين',en:'User Management', fr:'Gestion utilisateurs',es:'Gestión de usuarios',it:'Gestione utenti',pt:'Gestão de utilizadores',de:'Benutzerverwaltung',ru:'Управление пользователями',ko:'사용자 관리',        zh:'用户管理',         ja:'ユーザー管理',    ur:'صارف انتظام' },
  nav_divisions:    { ar:'الدوائر',        en:'Divisions',       fr:'Divisions',        es:'Divisiones',     it:'Divisioni',        pt:'Divisões',        de:'Abteilungen',      ru:'Подразделения',    ko:'부서',             zh:'部门',            ja:'部署',            ur:'ڈویژن' },
  nav_health:       { ar:'صحة النظام',     en:'System Health',   fr:'Santé système',    es:'Salud del sistema',it:'Salute sistema',  pt:'Saúde do sistema',de:'Systemgesundheit', ru:'Здоровье системы', ko:'시스템 상태',        zh:'系统健康',         ja:'システム状態',    ur:'نظام کی صحت' },
  nav_warroom:      { ar:'غرفة العمليات',  en:'War Room',        fr:'Salle de commandement',es:'Sala de mando',it:'Sala operativa',  pt:'Sala de controle',de:'Einsatzraum',      ru:'Оперативный центр',ko:'작전실',            zh:'作战室',          ja:'作戦室',          ur:'آپریشن روم' },
  nav_heatmap:      { ar:'خريطة الدوائر',  en:'Division Map',    fr:'Carte des divisions',es:'Mapa de divisiones',it:'Mappa divisioni',pt:'Mapa de divisões',de:'Abteilungskarte',  ru:'Карта подразделений',ko:'부서 지도',         zh:'部门地图',         ja:'部署マップ',      ur:'ڈویژن نقشہ' },
  nav_escalations:  { ar:'صندوق التصعيد',  en:'Escalations',     fr:'Escalades',        es:'Escaladas',      it:'Escalation',       pt:'Escaladas',       de:'Eskalationen',     ru:'Эскалации',        ko:'에스컬레이션',       zh:'升级',            ja:'エスカレーション',ur:'اضافہ' },
  nav_approvals:    { ar:'موافقات معلقة',  en:'Approvals',       fr:'Approbations',     es:'Aprobaciones',   it:'Approvazioni',     pt:'Aprovações',      de:'Genehmigungen',    ru:'Одобрения',        ko:'승인',             zh:'批准',            ja:'承認',            ur:'منظوری' },
  nav_qpi:          { ar:'التقرير الربعي', en:'QPI Report',      fr:'Rapport QPI',      es:'Informe QPI',    it:'Rapporto QPI',     pt:'Relatório QPI',   de:'QPI-Bericht',      ru:'Отчёт QPI',        ko:'QPI 보고서',        zh:'QPI报告',         ja:'QPI報告',         ur:'QPI رپورٹ' },

  /* ── Buttons ──────────────────────────────────────────── */
  btn_save:         { ar:'حفظ',           en:'Save',            fr:'Enregistrer',      es:'Guardar',        it:'Salva',            pt:'Salvar',          de:'Speichern',        ru:'Сохранить',        ko:'저장',             zh:'保存',            ja:'保存',            ur:'محفوظ کریں' },
  btn_cancel:       { ar:'إلغاء',         en:'Cancel',          fr:'Annuler',          es:'Cancelar',       it:'Annulla',          pt:'Cancelar',        de:'Abbrechen',        ru:'Отмена',           ko:'취소',             zh:'取消',            ja:'キャンセル',      ur:'منسوخ کریں' },
  btn_close:        { ar:'إغلاق',         en:'Close',           fr:'Fermer',           es:'Cerrar',         it:'Chiudi',           pt:'Fechar',          de:'Schließen',        ru:'Закрыть',          ko:'닫기',             zh:'关闭',            ja:'閉じる',          ur:'بند کریں' },
  btn_edit:         { ar:'تعديل',         en:'Edit',            fr:'Modifier',         es:'Editar',         it:'Modifica',         pt:'Editar',          de:'Bearbeiten',       ru:'Редактировать',    ko:'편집',             zh:'编辑',            ja:'編集',            ur:'ترمیم' },
  btn_delete:       { ar:'حذف',           en:'Delete',          fr:'Supprimer',        es:'Eliminar',       it:'Elimina',          pt:'Excluir',         de:'Löschen',          ru:'Удалить',          ko:'삭제',             zh:'删除',            ja:'削除',            ur:'حذف کریں' },
  btn_add:          { ar:'إضافة',         en:'Add',             fr:'Ajouter',          es:'Agregar',        it:'Aggiungi',         pt:'Adicionar',       de:'Hinzufügen',       ru:'Добавить',         ko:'추가',             zh:'添加',            ja:'追加',            ur:'شامل کریں' },
  btn_view_all:     { ar:'عرض الكل',      en:'View All',        fr:'Voir tout',        es:'Ver todo',       it:'Vedi tutto',       pt:'Ver tudo',        de:'Alle anzeigen',    ru:'Показать все',     ko:'모두 보기',         zh:'查看全部',         ja:'全て表示',        ur:'سب دیکھیں' },
  btn_details:      { ar:'تفاصيل',        en:'Details',         fr:'Détails',          es:'Detalles',       it:'Dettagli',         pt:'Detalhes',        de:'Details',          ru:'Детали',           ko:'세부사항',          zh:'详情',            ja:'詳細',            ur:'تفصیل' },
  btn_send:         { ar:'إرسال',         en:'Send',            fr:'Envoyer',          es:'Enviar',         it:'Invia',            pt:'Enviar',          de:'Senden',           ru:'Отправить',        ko:'보내기',            zh:'发送',            ja:'送信',            ur:'بھیجیں' },
  btn_new_task:     { ar:'مهمة جديدة',    en:'New Task',        fr:'Nouvelle tâche',   es:'Nueva tarea',    it:'Nuovo compito',    pt:'Nova tarefa',     de:'Neue Aufgabe',     ru:'Новая задача',     ko:'새 작업',           zh:'新任务',          ja:'新しいタスク',    ur:'نیا کام' },
  btn_new_emp:      { ar:'إضافة موظف',    en:'Add Employee',    fr:'Ajouter employé',  es:'Agregar empleado',it:'Aggiungi dipendente',pt:'Adicionar funcionário',de:'Mitarbeiter hinzufügen',ru:'Добавить сотрудника',ko:'직원 추가',         zh:'添加员工',         ja:'従業員追加',      ur:'ملازم شامل کریں' },

  /* ── Status / Priority ────────────────────────────────── */
  st_open:          { ar:'مفتوح',         en:'Open',            fr:'Ouvert',           es:'Abierto',        it:'Aperto',           pt:'Aberto',          de:'Offen',            ru:'Открыт',           ko:'열림',             zh:'开放',            ja:'オープン',        ur:'کھلا' },
  st_closed:        { ar:'مغلق',          en:'Closed',          fr:'Fermé',            es:'Cerrado',        it:'Chiuso',           pt:'Fechado',         de:'Geschlossen',      ru:'Закрыт',           ko:'닫힘',             zh:'关闭',            ja:'クローズ',        ur:'بند' },
  st_in_progress:   { ar:'قيد التنفيذ',   en:'In Progress',     fr:'En cours',         es:'En progreso',    it:'In corso',         pt:'Em progresso',    de:'In Bearbeitung',   ru:'В процессе',       ko:'진행 중',           zh:'进行中',          ja:'進行中',          ur:'جاری' },
  st_overdue:       { ar:'متأخر',         en:'Overdue',         fr:'En retard',        es:'Atrasado',       it:'In ritardo',       pt:'Atrasado',        de:'Überfällig',       ru:'Просрочен',        ko:'기한 초과',         zh:'逾期',            ja:'期限超過',        ur:'تاخیر' },
  st_pending:       { ar:'معلق',          en:'Pending',         fr:'En attente',       es:'Pendiente',      it:'In attesa',        pt:'Pendente',        de:'Ausstehend',       ru:'Ожидает',          ko:'보류 중',           zh:'待处理',          ja:'保留中',          ur:'زیر التواء' },
  st_returned:      { ar:'مُعاد',         en:'Returned',        fr:'Retourné',         es:'Devuelto',       it:'Restituito',       pt:'Devolvido',       de:'Zurückgegeben',    ru:'Возвращён',        ko:'반환됨',            zh:'已退回',          ja:'返却済み',        ur:'واپس کیا' },
  st_new:           { ar:'جديد',          en:'New',             fr:'Nouveau',          es:'Nuevo',          it:'Nuovo',            pt:'Novo',            de:'Neu',              ru:'Новый',            ko:'새로운',            zh:'新建',            ja:'新規',            ur:'نیا' },
  st_resolved:      { ar:'محلول',         en:'Resolved',        fr:'Résolu',           es:'Resuelto',       it:'Risolto',          pt:'Resolvido',       de:'Gelöst',           ru:'Решён',            ko:'해결됨',            zh:'已解决',          ja:'解決済み',        ur:'حل شدہ' },
  st_escalated:     { ar:'مُصعَّد',       en:'Escalated',       fr:'Escaladé',         es:'Escalado',       it:'Escalato',         pt:'Escalado',        de:'Eskaliert',        ru:'Эскалирован',      ko:'에스컬레이션됨',     zh:'已升级',          ja:'エスカレート済',  ur:'بڑھایا گیا' },
  pri_low:          { ar:'منخفضة',        en:'Low',             fr:'Faible',           es:'Bajo',           it:'Bassa',            pt:'Baixo',           de:'Niedrig',          ru:'Низкий',           ko:'낮음',             zh:'低',              ja:'低',              ur:'کم' },
  pri_medium:       { ar:'متوسطة',        en:'Medium',          fr:'Moyen',            es:'Medio',          it:'Media',            pt:'Médio',           de:'Mittel',           ru:'Средний',          ko:'보통',             zh:'中',              ja:'中',              ur:'درمیانہ' },
  pri_high:         { ar:'عالية',         en:'High',            fr:'Élevé',            es:'Alto',           it:'Alta',             pt:'Alto',            de:'Hoch',             ru:'Высокий',          ko:'높음',             zh:'高',              ja:'高',              ur:'زیادہ' },
  pri_critical:     { ar:'حرج',           en:'Critical',        fr:'Critique',         es:'Crítico',        it:'Critico',          pt:'Crítico',         de:'Kritisch',         ru:'Критический',      ko:'위험',             zh:'紧急',            ja:'重大',            ur:'نازک' }
};

/* ── DOM Auto-Translate Map ──────────────────────────────── */
const DOM_MAP = {
  /* Dashboard / Hero */
  'لوحة المتابعة':           { en:'Dashboard', fr:'Tableau de bord', es:'Panel', it:'Pannello', pt:'Painel', de:'Dashboard', ru:'Панель', ko:'대시보드', zh:'仪表板', ja:'ダッシュボード', ur:'ڈیش بورڈ' },
  'يوم العمل':               { en:'My Day', fr:'Mon Jour', es:'Mi Día', it:'La Mia Giornata', pt:'Meu Dia', de:'Mein Tag', ru:'Мой день', ko:'오늘 하루', zh:'今日工作', ja:'今日の仕事', ur:'میرا دن' },
  'دائرة الحوكمة والتقييم': { en:'Governance & Assessment', fr:'Gouvernance',es:'Gobernanza', it:'Governance', pt:'Governança', de:'Governance', ru:'Управление', ko:'거버넌스', zh:'治理', ja:'ガバナンス', ur:'حکمرانی' },
  'دائرة التوليد':           { en:'Generation OE', fr:'Production', es:'Generación', it:'Generazione', pt:'Geração', de:'Erzeugung', ru:'Производство', ko:'발전', zh:'发电', ja:'発電', ur:'پیداوار' },
  'الشبكة الوطنية':          { en:'National Grid', fr:'Réseau National', es:'Red Nacional', it:'Rete Nazionale', pt:'Rede Nacional', de:'Nationales Netz', ru:'Национальная сеть',ko:'국가 전력망', zh:'国家电网', ja:'国家電力網', ur:'قومی گرڈ' },
  'دائرة التوزيع':           { en:'Distribution OE', fr:'Distribution', es:'Distribución', it:'Distribuzione', pt:'Distribuição', de:'Verteilung', ru:'Распределение', ko:'배전', zh:'配电', ja:'配電', ur:'تقسیم' },
  'التنبيهات الفنية':        { en:'Technical Alerts', fr:'Alertes Tech.', es:'Alertas Téc.', it:'Avvisi Tecnici', pt:'Alertas Téc.', de:'Tech. Warnungen', ru:'Тех. оповещения', ko:'기술 경보', zh:'技术警报', ja:'技術アラート', ur:'تکنیکی اطلاعات' },
  
  /* Sections */
  'المهام':                  { en:'Tasks', fr:'Tâches', es:'Tareas', it:'Attività', pt:'Tarefas', de:'Aufgaben', ru:'Задачи', ko:'작업', zh:'任务', ja:'タスク', ur:'کام' },
  'التحسين':                 { en:'Improvement', fr:'Amélioration', es:'Mejora', it:'Miglioramento', pt:'Melhoria', de:'Verbesserung', ru:'Улучшение', ko:'개선', zh:'改进', ja:'改善', ur:'بہتری' },
  'الفريق':                  { en:'Team', fr:'Équipe', es:'Equipo', it:'Squadra', pt:'Equipe', de:'Team', ru:'Команда', ko:'팀', zh:'团队', ja:'チーム', ur:'ٹیم' },
  'متابعة':                  { en:'Tracking', fr:'Suivi', es:'Seguimiento', it:'Monitoraggio', pt:'Rastreamento', de:'Verfolgung', ru:'Отслеживание', ko:'추적', zh:'跟踪', ja:'追跡', ur:'نگرانی' },
  'القرارات':                { en:'Decisions', fr:'Décisions', es:'Decisiones', it:'Decisioni', pt:'Decisões', de:'Entscheidungen', ru:'Решения', ko:'결정', zh:'决定', ja:'決定', ur:'فیصلے' },
  'الاجتماعات':              { en:'Meetings', fr:'Réunions', es:'Reuniones', it:'Riunioni', pt:'Reuniões', de:'Besprechungen', ru:'Встречи', ko:'회의', zh:'会议', ja:'会議', ur:'میٹنگز' },
  
  /* Labels */
  'عرض الكل':               { en:'View All', fr:'Voir tout', es:'Ver todo', it:'Vedi tutto', pt:'Ver tudo', de:'Alle anzeigen', ru:'Показать все', ko:'모두 보기', zh:'查看全部', ja:'全て表示', ur:'سب دیکھیں' },
  '+ مهمة جديدة':           { en:'+ New Task', fr:'+ Nouvelle tâche',es:'+ Nueva tarea', it:'+ Nuovo compito', pt:'+ Nova tarefa', de:'+ Neue Aufgabe', ru:'+ Новая задача', ko:'+ 새 작업', zh:'+ 新任务', ja:'+ 新タスク', ur:'+ نیا کام' },
  '+ تقييم جديد':           { en:'+ New Assessment', fr:'+ Nouvelle évaluation',es:'+ Nueva evaluación',it:'+ Nuova valutazione',pt:'+ Nova avaliação',de:'+ Neue Bewertung',ru:'+ Новая оценка', ko:'+ 새 평가', zh:'+ 新评估', ja:'+ 新評価', ur:'+ نئی تشخیص' },
  '+ AFI جديد':             { en:'+ New AFI', fr:'+ Nouvel AFI', es:'+ Nuevo AFI', it:'+ Nuovo AFI', pt:'+ Novo AFI', de:'+ Neues AFI', ru:'+ Новый AFI', ko:'+ 새 AFI', zh:'+ 新AFI', ja:'+ 新AFI', ur:'+ نیا AFI' },
  '+ إضافة موظف':           { en:'+ Add Employee', fr:'+ Ajouter employé',es:'+ Agregar empleado',it:'+ Aggiungi dipendente',pt:'+ Adicionar funcionário',de:'+ Mitarbeiter hinzufügen',ru:'+ Добавить сотрудника',ko:'+ 직원 추가', zh:'+ 添加员工', ja:'+ 従業員追加', ur:'+ ملازم شامل کریں' },
  'تعديل':                  { en:'Edit', fr:'Modifier', es:'Editar', it:'Modifica', pt:'Editar', de:'Bearbeiten', ru:'Редактировать', ko:'편집', zh:'编辑', ja:'編集', ur:'ترمیم' },
  'حفظ':                    { en:'Save', fr:'Enregistrer', es:'Guardar', it:'Salva', pt:'Salvar', de:'Speichern', ru:'Сохранить', ko:'저장', zh:'保存', ja:'保存', ur:'محفوظ کریں' },
  'إلغاء':                  { en:'Cancel', fr:'Annuler', es:'Cancelar', it:'Annulla', pt:'Cancelar', de:'Abbrechen', ru:'Отмена', ko:'취소', zh:'取消', ja:'キャンセル', ur:'منسوخ کریں' },
  'إغلاق':                  { en:'Close', fr:'Fermer', es:'Cerrar', it:'Chiudi', pt:'Fechar', de:'Schließen', ru:'Закрыть', ko:'닫기', zh:'关闭', ja:'閉じる', ur:'بند کریں' },
  'تفاصيل':                 { en:'Details', fr:'Détails', es:'Detalles', it:'Dettagli', pt:'Detalhes', de:'Details', ru:'Детали', ko:'세부사항', zh:'详情', ja:'詳細', ur:'تفصیل' },
  'تحديث':                  { en:'Update', fr:'Mettre à jour', es:'Actualizar', it:'Aggiorna', pt:'Atualizar', de:'Aktualisieren', ru:'Обновить', ko:'업데이트', zh:'更新', ja:'更新', ur:'اپ ڈیٹ کریں' },
  'خروج':                   { en:'Sign Out', fr:'Déconnexion', es:'Salir', it:'Esci', pt:'Sair', de:'Abmelden', ru:'Выйти', ko:'로그아웃', zh:'退出', ja:'ログアウト', ur:'باہر' },
  
  /* Messages */
  'تم الحفظ ✓':            { en:'Saved ✓', fr:'Enregistré ✓', es:'Guardado ✓', it:'Salvato ✓', pt:'Salvo ✓', de:'Gespeichert ✓', ru:'Сохранено ✓', ko:'저장됨 ✓', zh:'已保存 ✓', ja:'保存済み ✓', ur:'محفوظ ✓' },
  'تم التحديث ✓':          { en:'Updated ✓', fr:'Mis à jour ✓', es:'Actualizado ✓', it:'Aggiornato ✓', pt:'Atualizado ✓', de:'Aktualisiert ✓', ru:'Обновлено ✓', ko:'업데이트됨 ✓', zh:'已更新 ✓', ja:'更新済み ✓', ur:'اپ ڈیٹ ✓' },
  'جارٍ التحميل...':       { en:'Loading...', fr:'Chargement...', es:'Cargando...', it:'Caricamento...', pt:'Carregando...', de:'Laden...', ru:'Загрузка...', ko:'로딩 중...', zh:'加载中...', ja:'読み込み中...', ur:'لوڈ ہو رہا ہے...' },
  'لا مهام':                { en:'No tasks', fr:'Pas de tâches', es:'Sin tareas', it:'Nessun compito', pt:'Sem tarefas', de:'Keine Aufgaben', ru:'Нет задач', ko:'작업 없음', zh:'无任务', ja:'タスクなし', ur:'کوئی کام نہیں' },
  'لا أعضاء':               { en:'No members', fr:'Pas de membres', es:'Sin miembros', it:'Nessun membro', pt:'Sem membros', de:'Keine Mitglieder',ru:'Нет участников', ko:'멤버 없음', zh:'无成员', ja:'メンバーなし', ur:'کوئی رکن نہیں' },
  'لا تنبيهات':             { en:'No alerts', fr:'Pas d\'alertes', es:'Sin alertas', it:'Nessun avviso', pt:'Sem alertas', de:'Keine Warnungen', ru:'Нет оповещений', ko:'경보 없음', zh:'无警报', ja:'アラートなし', ur:'کوئی اطلاع نہیں' },
};

function tl(key) {
  const lang = (typeof App !== 'undefined' ? App.lang : null) || localStorage.getItem('se_lang_v2') || 'en';
  return (TR[key] && TR[key][lang]) || (TR[key] && TR[key]['en']) || key;
}

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
  
  setTimeout(() => {
    if(typeof window._currentPage !== 'undefined' && typeof window.PAGES !== 'undefined') {
      const fn = window.PAGES[window._currentPage];
      const ct = document.getElementById('pgContent') || document.getElementById('pageArea');
      if(fn && ct) {
        ct.innerHTML = '<div class="fade" id="pg"></div>';
        fn(document.getElementById('pg') || ct);
      }
    }
    if(typeof window._currentNav !== 'undefined' && typeof buildNav !== 'undefined') {
      buildNav(window._currentNav, window._currentPage);
    }
    if(window._currentNav && window._currentPage) {
      const item = window._currentNav.find(n => n.k === window._currentPage);
      const ptEl = document.getElementById('pgtitle') || document.getElementById('pgTitle');
      if(item && ptEl) ptEl.textContent = code === 'ar' ? item.ar : item.en;
    }
    
    if(window.renderUsers && window._currentPage === 'users') renderUsers();
    if(window.renderDivs && window._currentPage === 'divs') renderDivs();
    if(window.renderSettings && window._currentPage === 'settings') renderSettings();
    if(window.renderHealth && window._currentPage === 'health') renderHealth();
    if(window.translateAdminNav) translateAdminNav();

  }, 50);
}

if(typeof window !== 'undefined') {
  Object.assign(window, { LANGS, TR, DOM_MAP, tl, openLangPicker, selectLang });
}


```
