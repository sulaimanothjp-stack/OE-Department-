/* ═══════════════════════════════════════════════════════════════
   Saudi Energy · OE Command Center
   lang.js v6.0 — 12-Language Translation
═══════════════════════════════════════════════════════════════ */

function lsGet(k, def) { try { return localStorage.getItem(k) || def; } catch (e) { return def; } }
function lsSet(k, v)   { try { localStorage.setItem(k, v); } catch (e) {} }

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
  nav_dashboard:    { ar:'لوحة التحكم',      en:'Dashboard',          fr:'Tableau de bord',    es:'Panel',               it:'Pannello',            pt:'Painel',             de:'Dashboard',           ru:'Панель',              ko:'대시보드',            zh:'仪表板',            ja:'ダッシュボード',     ur:'ڈیش بورڈ' },
  nav_tasks:        { ar:'المهام',            en:'Tasks',              fr:'Tâches',              es:'Tareas',              it:'Attività',            pt:'Tarefas',            de:'Aufgaben',            ru:'Задачи',              ko:'작업',               zh:'任务',              ja:'タスク',             ur:'کام' },
  nav_team:         { ar:'الفريق',            en:'Team',               fr:'Équipe',              es:'Equipo',              it:'Squadra',             pt:'Equipe',             de:'Team',                ru:'Команда',             ko:'팀',                 zh:'团队',              ja:'チーム',             ur:'ٹیم' },
  nav_afis:         { ar:'نقاط التحسين',      en:'AFIs',               fr:'AFIs',                es:'AFIs',                it:'AFIs',                pt:'AFIs',               de:'AFIs',                ru:'AFIs',                ko:'AFIs',               zh:'AFIs',              ja:'AFIs',              ur:'AFIs' },
  nav_kpis:         { ar:'مؤشرات الأداء',     en:'KPIs',               fr:'KPIs',                es:'KPIs',                it:'KPIs',                pt:'KPIs',               de:'KPIs',                ru:'КПЭ',                 ko:'KPIs',               zh:'KPIs',              ja:'KPI',               ur:'KPIs' },
  nav_alerts:       { ar:'التنبيهات',         en:'Alerts',             fr:'Alertes',             es:'Alertas',             it:'Avvisi',              pt:'Alertas',            de:'Warnungen',           ru:'Оповещения',          ko:'경보',               zh:'警报',              ja:'アラート',           ur:'اطلاعات' },
  nav_assessments:  { ar:'التقييمات',         en:'Assessments',        fr:'Évaluations',         es:'Evaluaciones',        it:'Valutazioni',         pt:'Avaliações',         de:'Bewertungen',         ru:'Оценки',              ko:'평가',               zh:'评估',              ja:'評価',               ur:'تشخیص' },
  nav_tickets:      { ar:'التذاكر',           en:'Tickets',            fr:'Tickets',             es:'Tickets',             it:'Ticket',              pt:'Tickets',            de:'Tickets',             ru:'Тикеты',              ko:'티켓',               zh:'工单',              ja:'チケット',           ur:'ٹکٹ' },
  nav_meetings:     { ar:'الاجتماعات',        en:'Meetings',           fr:'Réunions',            es:'Reuniones',           it:'Riunioni',            pt:'Reuniões',           de:'Besprechungen',       ru:'Встречи',             ko:'회의',               zh:'会议',              ja:'会議',               ur:'میٹنگز' },
  nav_settings:     { ar:'الإعدادات',         en:'Settings',           fr:'Paramètres',          es:'Configuración',       it:'Impostazioni',        pt:'Configurações',      de:'Einstellungen',       ru:'Настройки',           ko:'설정',               zh:'设置',              ja:'設定',               ur:'ترتیبات' },
  nav_daily_update: { ar:'تحديث اليوم',       en:'Daily Update',       fr:'Mise à jour',         es:'Actualización',       it:'Aggiornamento',       pt:'Atualização',        de:'Tagesupdate',         ru:'Обновление',          ko:'일일 업데이트',        zh:'日常更新',          ja:'日次更新',           ur:'روزانہ اپ ڈیٹ' },
  nav_weekly_upd:   { ar:'التحديث الأسبوعي', en:'Weekly Update',      fr:'Mise à jour hebdo.',  es:'Actualización semanal',it:'Aggiornamento sett.', pt:'Atualização semanal',de:'Wöchentliches Update', ru:'Еженедельное обновление',ko:'주간 업데이트',       zh:'每周更新',          ja:'週次更新',           ur:'ہفتہ وار اپ ڈیٹ' },
  nav_reviews:      { ar:'مراجعة الإنجازات', en:'Review Completions', fr:'Révisions',           es:'Revisiones',          it:'Revisioni',           pt:'Revisões',           de:'Überprüfungen',       ru:'Обзоры',              ko:'완료 검토',           zh:'完成审查',          ja:'完了レビュー',       ur:'نظرثانی' },
  nav_users:        { ar:'إدارة المستخدمين', en:'User Management',    fr:'Gestion utilisateurs',es:'Gestión de usuarios', it:'Gestione utenti',     pt:'Gestão de utilizadores',de:'Benutzerverwaltung', ru:'Управление пользователями',ko:'사용자 관리',       zh:'用户管理',          ja:'ユーザー管理',       ur:'صارف انتظام' },
  nav_divisions:    { ar:'الدوائر',           en:'Divisions',          fr:'Divisions',           es:'Divisiones',          it:'Divisioni',           pt:'Divisões',           de:'Abteilungen',         ru:'Подразделения',       ko:'부서',               zh:'部门',              ja:'部署',               ur:'ڈویژن' },
  nav_health:       { ar:'صحة النظام',        en:'System Health',      fr:'Santé système',       es:'Salud del sistema',   it:'Salute sistema',      pt:'Saúde do sistema',   de:'Systemgesundheit',    ru:'Здоровье системы',    ko:'시스템 상태',         zh:'系统健康',          ja:'システム状態',       ur:'نظام کی صحت' },
  nav_warroom:      { ar:'برج السيطرة',       en:'Control Tower',      fr:'Tour de contrôle',    es:'Torre de control',    it:'Torre di controllo',  pt:'Torre de controle',  de:'Kontrollturm',        ru:'Башня управления',    ko:'관제탑',             zh:'控制塔',            ja:'コントロールタワー', ur:'کنٹرول ٹاور' },
  nav_signals:      { ar:'مؤشر أدائي',        en:'My Performance',     fr:'Ma Performance',      es:'Mi Rendimiento',      it:'La Mia Performance',  pt:'Meu Desempenho',     de:'Meine Leistung',      ru:'Моя производительность',ko:'내 성과',            zh:'我的绩效',          ja:'私の成績',           ur:'میری کارکردگی' },
  nav_heatmap:      { ar:'خريطة الدوائر',     en:'Division Map',       fr:'Carte des divisions', es:'Mapa de divisiones',  it:'Mappa divisioni',     pt:'Mapa de divisões',   de:'Abteilungskarte',     ru:'Карта подразделений', ko:'부서 지도',           zh:'部门地图',          ja:'部署マップ',         ur:'ڈویژن نقشہ' },
  nav_escalations:  { ar:'صندوق التصعيد',     en:'Escalations',        fr:'Escalades',           es:'Escaladas',           it:'Escalation',          pt:'Escaladas',          de:'Eskalationen',        ru:'Эскалации',           ko:'에스컬레이션',        zh:'升级',              ja:'エスカレーション',   ur:'اضافہ' },
  nav_approvals:    { ar:'موافقات معلقة',     en:'Approvals',          fr:'Approbations',        es:'Aprobaciones',        it:'Approvazioni',        pt:'Aprovações',         de:'Genehmigungen',       ru:'Одобрения',           ko:'승인',               zh:'批准',              ja:'承認',               ur:'منظوری' },
  nav_qpi:          { ar:'التقرير الربعي',    en:'QPI Report',         fr:'Rapport QPI',         es:'Informe QPI',         it:'Rapporto QPI',        pt:'Relatório QPI',      de:'QPI-Bericht',         ru:'Отчёт QPI',           ko:'QPI 보고서',          zh:'QPI报告',           ja:'QPI報告',            ur:'QPI رپورٹ' },
  page_my_day:      { ar:'يوم العمل',         en:'My Day',             fr:'Mon Jour',            es:'Mi Día',              it:'La Mia Giornata',     pt:'Meu Dia',            de:'Mein Tag',            ru:'Мой день',            ko:'오늘 하루',           zh:'今日工作',          ja:'今日の仕事',         ur:'میرا دن' },
  page_new_task:    { ar:'مهمة جديدة',        en:'New Task',           fr:'Nouvelle Tâche',      es:'Nueva Tarea',         it:'Nuovo Compito',       pt:'Nova Tarefa',        de:'Neue Aufgabe',        ru:'Новая задача',        ko:'새 작업',            zh:'新任务',            ja:'新しいタスク',       ur:'نیا کام' },
  lbl_completed:    { ar:'المُنجزة',          en:'Completed',          fr:'Terminées',           es:'Completadas',         it:'Completate',          pt:'Concluídas',         de:'Abgeschlossen',       ru:'Завершённые',         ko:'완료됨',             zh:'已完成',            ja:'完了済み',           ur:'مکمل' },
  /* ── Status / Priority ────────────────────────────────── */
  st_open:          { ar:'مفتوح',   en:'Open',       fr:'Ouvert',      es:'Abierto',   it:'Aperto',    pt:'Aberto',     de:'Offen',          ru:'Открыт',          ko:'열림',    zh:'开放',  ja:'オープン',   ur:'کھلا' },
  st_closed:        { ar:'مغلق',    en:'Closed',     fr:'Fermé',       es:'Cerrado',   it:'Chiuso',    pt:'Fechado',    de:'Geschlossen',    ru:'Закрыт',          ko:'닫힘',    zh:'关闭',  ja:'クローズ',   ur:'بند' },
  st_in_progress:   { ar:'قيد التنفيذ',en:'In Progress',fr:'En cours',  es:'En progreso',it:'In corso', pt:'Em progresso',de:'In Bearbeitung', ru:'В процессе',      ko:'진행 중', zh:'进行中',ja:'進行中',     ur:'جاری' },
  st_overdue:       { ar:'متأخر',   en:'Overdue',    fr:'En retard',   es:'Atrasado',  it:'In ritardo',pt:'Atrasado',   de:'Überfällig',     ru:'Просрочен',       ko:'기한 초과',zh:'逾期', ja:'期限超過',   ur:'تاخیر' },
  st_pending:       { ar:'معلق',    en:'Pending',    fr:'En attente',  es:'Pendiente', it:'In attesa', pt:'Pendente',   de:'Ausstehend',     ru:'Ожидает',         ko:'보류 중', zh:'待处理',ja:'保留中',     ur:'زیر التواء' },
  st_returned:      { ar:'مُعاد',   en:'Returned',   fr:'Retourné',    es:'Devuelto',  it:'Restituito',pt:'Devolvido',  de:'Zurückgegeben',  ru:'Возвращён',       ko:'반환됨',  zh:'已退回',ja:'返却済み',   ur:'واپس کیا' },
  st_new:           { ar:'جديد',    en:'New',        fr:'Nouveau',     es:'Nuevo',     it:'Nuovo',     pt:'Novo',       de:'Neu',            ru:'Новый',           ko:'새로운',  zh:'新建',  ja:'新規',       ur:'نیا' },
  st_resolved:      { ar:'محلول',   en:'Resolved',   fr:'Résolu',      es:'Resuelto',  it:'Risolto',   pt:'Resolvido',  de:'Gelöst',         ru:'Решён',           ko:'해결됨',  zh:'已解决',ja:'解決済み',   ur:'حل شدہ' },
  st_escalated:     { ar:'مُصعَّد', en:'Escalated',  fr:'Escaladé',    es:'Escalado',  it:'Escalato',  pt:'Escalado',   de:'Eskaliert',      ru:'Эскалирован',     ko:'에스컬레이션됨',zh:'已升级',ja:'エスカレート済',ur:'بڑھایا گیا' },
  pri_low:          { ar:'منخفضة',  en:'Low',        fr:'Faible',      es:'Bajo',      it:'Bassa',     pt:'Baixo',      de:'Niedrig',        ru:'Низкий',          ko:'낮음',    zh:'低',    ja:'低',         ur:'کم' },
  pri_medium:       { ar:'متوسطة',  en:'Medium',     fr:'Moyen',       es:'Medio',     it:'Media',     pt:'Médio',      de:'Mittel',         ru:'Средний',         ko:'보통',    zh:'中',    ja:'中',         ur:'درمیانہ' },
  pri_high:         { ar:'عالية',   en:'High',       fr:'Élevé',       es:'Alto',      it:'Alta',      pt:'Alto',       de:'Hoch',           ru:'Высокий',         ko:'높음',    zh:'高',    ja:'高',         ur:'زیادہ' },
  pri_critical:     { ar:'حرج',     en:'Critical',   fr:'Critique',    es:'Crítico',   it:'Critico',   pt:'Crítico',    de:'Kritisch',       ru:'Критический',     ko:'위험',    zh:'紧急',  ja:'重大',       ur:'نازک' },
};

const DOM_MAP = {
  /* ── Division names ───────────────────────────────────── */
  'لوحة المتابعة':           { en:'Dashboard',           fr:'Tableau de bord',  es:'Panel',           it:'Pannello',         pt:'Painel',          de:'Dashboard',         ru:'Панель',           ko:'대시보드',    zh:'仪表板',    ja:'ダッシュボード',   ur:'ڈیش بورڈ' },
  'يوم العمل':               { en:'My Day',               fr:'Mon Jour',         es:'Mi Día',          it:'La Mia Giornata',  pt:'Meu Dia',         de:'Mein Tag',          ru:'Мой день',         ko:'오늘 하루',   zh:'今日工作',  ja:'今日の仕事',       ur:'میرا دن' },
  'دائرة الحوكمة والتقييم': { en:'Governance & Assessment',fr:'Gouvernance',     es:'Gobernanza',      it:'Governance',       pt:'Governança',      de:'Governance',        ru:'Управление',       ko:'거버넌스',    zh:'治理',      ja:'ガバナンス',       ur:'حکمرانی' },
  'دائرة التوليد':           { en:'Generation OE',        fr:'Production',       es:'Generación',      it:'Generazione',      pt:'Geração',         de:'Erzeugung',         ru:'Производство',     ko:'발전',        zh:'发电',      ja:'発電',             ur:'پیداوار' },
  'الشبكة الوطنية':          { en:'National Grid',        fr:'Réseau National',  es:'Red Nacional',    it:'Rete Nazionale',   pt:'Rede Nacional',   de:'Nationales Netz',   ru:'Национальная сеть',ko:'국가 전력망', zh:'国家电网',  ja:'国家電力網',       ur:'قومی گرڈ' },
  'دائرة التوزيع':           { en:'Distribution OE',      fr:'Distribution',     es:'Distribución',    it:'Distribuzione',    pt:'Distribuição',    de:'Verteilung',        ru:'Распределение',    ko:'배전',        zh:'配电',      ja:'配電',             ur:'تقسیم' },
  'التنبيهات الفنية':        { en:'Technical Alerts',     fr:'Alertes Tech.',    es:'Alertas Téc.',    it:'Avvisi Tecnici',   pt:'Alertas Téc.',    de:'Tech. Warnungen',   ru:'Тех. оповещения',  ko:'기술 경보',   zh:'技术警报',  ja:'技術アラート',     ur:'تکنیکی اطلاعات' },
  'إدارة التميز التشغيلي':  { en:'OE Department',        fr:'Département OE',   es:'Depto. OE',       it:'Reparto OE',       pt:'Depto. OE',       de:'OE-Abteilung',      ru:'Отдел OE',         ko:'OE 부서',     zh:'OE部门',    ja:'OE部署',           ur:'OE ڈیپارٹمنٹ' },
  /* ── Nav groups ───────────────────────────────────────── */
  'المهام':                  { en:'Tasks',        fr:'Tâches',        es:'Tareas',       it:'Attività',      pt:'Tarefas',      de:'Aufgaben',       ru:'Задачи',       ko:'작업',   zh:'任务',  ja:'タスク',  ur:'کام' },
  'التحسين':                 { en:'Improvement',  fr:'Amélioration',  es:'Mejora',       it:'Miglioramento', pt:'Melhoria',     de:'Verbesserung',   ru:'Улучшение',    ko:'개선',   zh:'改进',  ja:'改善',    ur:'بہتری' },
  'الفريق':                  { en:'Team',         fr:'Équipe',        es:'Equipo',       it:'Squadra',       pt:'Equipe',       de:'Team',           ru:'Команда',      ko:'팀',     zh:'团队',  ja:'チーム',  ur:'ٹیم' },
  'متابعة':                  { en:'Tracking',     fr:'Suivi',         es:'Seguimiento',  it:'Monitoraggio',  pt:'Rastreamento', de:'Verfolgung',     ru:'Отслеживание', ko:'추적',   zh:'跟踪',  ja:'追跡',    ur:'نگرانی' },
  'الاجتماعات':              { en:'Meetings',     fr:'Réunions',      es:'Reuniones',    it:'Riunioni',      pt:'Reuniões',     de:'Besprechungen',  ru:'Встречи',      ko:'회의',   zh:'会议',  ja:'会議',    ur:'میٹنگز' },
  /* ── Buttons ──────────────────────────────────────────── */
  'عرض الكل':                { en:'View All',      fr:'Voir tout',      es:'Ver todo',      it:'Vedi tutto',    pt:'Ver tudo',     de:'Alle anzeigen',  ru:'Показать все', ko:'모두 보기',zh:'查看全部',ja:'全て表示',ur:'سب دیکھیں' },
  'حفظ':                     { en:'Save',          fr:'Enregistrer',    es:'Guardar',       it:'Salva',         pt:'Salvar',       de:'Speichern',      ru:'Сохранить',    ko:'저장',   zh:'保存',  ja:'保存',    ur:'محفوظ' },
  'إلغاء':                   { en:'Cancel',        fr:'Annuler',        es:'Cancelar',      it:'Annulla',       pt:'Cancelar',     de:'Abbrechen',      ru:'Отмена',       ko:'취소',   zh:'取消',  ja:'キャンセル',ur:'منسوخ' },
  'إغلاق':                   { en:'Close',         fr:'Fermer',         es:'Cerrar',        it:'Chiudi',        pt:'Fechar',       de:'Schließen',      ru:'Закрыть',      ko:'닫기',   zh:'关闭',  ja:'閉じる',  ur:'بند' },
  'تعديل':                   { en:'Edit',          fr:'Modifier',       es:'Editar',        it:'Modifica',      pt:'Editar',       de:'Bearbeiten',     ru:'Редактировать',ko:'편집',   zh:'编辑',  ja:'編集',    ur:'ترمیم' },
  'تحديث':                   { en:'Update',        fr:'Mettre à jour',  es:'Actualizar',    it:'Aggiorna',      pt:'Atualizar',    de:'Aktualisieren',  ru:'Обновить',     ko:'업데이트',zh:'更新',  ja:'更新',    ur:'اپ ڈیٹ' },
  'تفاصيل':                  { en:'Details',       fr:'Détails',        es:'Detalles',      it:'Dettagli',      pt:'Detalhes',     de:'Details',        ru:'Детали',       ko:'세부사항',zh:'详情', ja:'詳細',    ur:'تفصیل' },
  'تأكيد':                   { en:'Confirm',       fr:'Confirmer',      es:'Confirmar',     it:'Conferma',      pt:'Confirmar',    de:'Bestätigen',     ru:'Подтвердить',  ko:'확인',   zh:'确认',  ja:'確認',    ur:'تصدیق' },
  'إضافة':                   { en:'Add',           fr:'Ajouter',        es:'Agregar',       it:'Aggiungi',      pt:'Adicionar',    de:'Hinzufügen',     ru:'Добавить',     ko:'추가',   zh:'添加',  ja:'追加',    ur:'شامل' },
  'حذف':                     { en:'Delete',        fr:'Supprimer',      es:'Eliminar',      it:'Elimina',       pt:'Excluir',      de:'Löschen',        ru:'Удалить',      ko:'삭제',   zh:'删除',  ja:'削除',    ur:'حذف' },
  'إرسال':                   { en:'Send',          fr:'Envoyer',        es:'Enviar',        it:'Invia',         pt:'Enviar',       de:'Senden',         ru:'Отправить',    ko:'보내기', zh:'发送',  ja:'送信',    ur:'بھیجیں' },
  'اعتماد':                  { en:'Approve',       fr:'Approuver',      es:'Aprobar',       it:'Approva',       pt:'Aprovar',      de:'Genehmigen',     ru:'Одобрить',     ko:'승인',   zh:'批准',  ja:'承認',    ur:'منظور' },
  'رفض':                     { en:'Reject',        fr:'Rejeter',        es:'Rechazar',      it:'Rifiuta',       pt:'Rejeitar',     de:'Ablehnen',       ru:'Отклонить',    ko:'거부',   zh:'拒绝',  ja:'却下',    ur:'مسترد' },
  'إعادة':                   { en:'Return',        fr:'Retourner',      es:'Devolver',      it:'Restituisci',   pt:'Devolver',     de:'Zurückgeben',    ru:'Вернуть',      ko:'반환',   zh:'退回',  ja:'返却',    ur:'واپس' },
  'نسخ':                     { en:'Copy',          fr:'Copier',         es:'Copiar',        it:'Copia',         pt:'Copiar',       de:'Kopieren',       ru:'Копировать',   ko:'복사',   zh:'复制',  ja:'コピー',  ur:'نقل' },
  'طباعة':                   { en:'Print',         fr:'Imprimer',       es:'Imprimir',      it:'Stampa',        pt:'Imprimir',     de:'Drucken',        ru:'Печать',       ko:'인쇄',   zh:'打印',  ja:'印刷',    ur:'پرنٹ' },
  'خروج':                    { en:'Sign Out',      fr:'Déconnexion',    es:'Salir',         it:'Esci',          pt:'Sair',         de:'Abmelden',       ru:'Выйти',        ko:'로그아웃',zh:'退出',  ja:'ログアウト',ur:'باہر' },
  '🚪 خروج':                 { en:'🚪 Sign Out',   fr:'🚪 Déconnexion', es:'🚪 Salir',      it:'🚪 Esci',       pt:'🚪 Sair',      de:'🚪 Abmelden',    ru:'🚪 Выйти',     ko:'🚪 로그아웃',zh:'🚪 退出',ja:'🚪 ログアウト',ur:'🚪 باہر' },
  /* ── New items ────────────────────────────────────────── */
  '+ مهمة جديدة':            { en:'+ New Task',       fr:'+ Nouvelle tâche',     es:'+ Nueva tarea',      it:'+ Nuovo compito',    pt:'+ Nova tarefa',     de:'+ Neue Aufgabe',      ru:'+ Новая задача',    ko:'+ 새 작업', zh:'+ 新任务', ja:'+ 新タスク',    ur:'+ نیا کام' },
  '+ AFI جديد':              { en:'+ New AFI',        fr:'+ Nouvel AFI',          es:'+ Nuevo AFI',        it:'+ Nuovo AFI',        pt:'+ Novo AFI',        de:'+ Neues AFI',          ru:'+ Новый AFI',       ko:'+ 새 AFI',  zh:'+ 新AFI',  ja:'+ 新AFI',       ur:'+ نیا AFI' },
  '+ KPI جديد':              { en:'+ New KPI',        fr:'+ Nouveau KPI',         es:'+ Nuevo KPI',        it:'+ Nuovo KPI',        pt:'+ Novo KPI',        de:'+ Neues KPI',          ru:'+ Новый КПЭ',       ko:'+ 새 KPI',  zh:'+ 新KPI',  ja:'+ 新KPI',       ur:'+ نیا KPI' },
  '+ تقييم جديد':            { en:'+ New Assessment', fr:'+ Nouvelle évaluation', es:'+ Nueva evaluación', it:'+ Nuova valutazione', pt:'+ Nova avaliação',  de:'+ Neue Bewertung',     ru:'+ Новая оценка',    ko:'+ 새 평가', zh:'+ 新评估', ja:'+ 新評価',      ur:'+ نئی تشخیص' },
  '+ إضافة موظف':            { en:'+ Add Employee',   fr:'+ Ajouter employé',     es:'+ Agregar empleado', it:'+ Aggiungi dipendente',pt:'+ Adicionar funcionário',de:'+ Mitarbeiter hinzufügen',ru:'+ Добавить сотрудника',ko:'+ 직원 추가',zh:'+ 添加员工',ja:'+ 従業員追加',ur:'+ ملازم شامل' },
  /* ── Labels ───────────────────────────────────────────── */
  'الأولوية':                { en:'Priority',     fr:'Priorité',        es:'Prioridad',   it:'Priorità',     pt:'Prioridade',   de:'Priorität',      ru:'Приоритет',    ko:'우선순위', zh:'优先级', ja:'優先度',  ur:'ترجیح' },
  'الحالة':                  { en:'Status',       fr:'Statut',          es:'Estado',      it:'Stato',        pt:'Status',       de:'Status',         ru:'Статус',       ko:'상태',     zh:'状态',   ja:'ステータス',ur:'حیثیت' },
  'الاستحقاق':               { en:'Due Date',     fr:'Échéance',        es:'Fecha límite',it:'Scadenza',     pt:'Prazo',        de:'Fälligkeitsdatum',ru:'Срок',        ko:'마감일',   zh:'截止日期',ja:'期限',   ur:'آخری تاریخ' },
  'الوصف':                   { en:'Description',  fr:'Description',     es:'Descripción', it:'Descrizione',  pt:'Descrição',    de:'Beschreibung',   ru:'Описание',     ko:'설명',     zh:'描述',   ja:'説明',    ur:'تفصیل' },
  'العنوان':                 { en:'Title',        fr:'Titre',           es:'Título',      it:'Titolo',       pt:'Título',       de:'Titel',          ru:'Заголовок',    ko:'제목',     zh:'标题',   ja:'タイトル',ur:'عنوان' },
  'الاسم':                   { en:'Name',         fr:'Nom',             es:'Nombre',      it:'Nome',         pt:'Nome',         de:'Name',           ru:'Имя',          ko:'이름',     zh:'姓名',   ja:'名前',    ur:'نام' },
  'الدور':                   { en:'Role',         fr:'Rôle',            es:'Rol',         it:'Ruolo',        pt:'Função',       de:'Rolle',          ru:'Роль',         ko:'역할',     zh:'角色',   ja:'役割',    ur:'کردار' },
  'الدائرة':                 { en:'Division',     fr:'Division',        es:'División',    it:'Divisione',    pt:'Divisão',      de:'Abteilung',      ru:'Подразделение',ko:'부서',     zh:'部门',   ja:'部署',    ur:'ڈویژن' },
  'ملاحظة':                  { en:'Note',         fr:'Note',            es:'Nota',        it:'Nota',         pt:'Nota',         de:'Hinweis',        ru:'Примечание',   ko:'메모',     zh:'备注',   ja:'メモ',    ur:'نوٹ' },
  'بحث...':                  { en:'Search...',    fr:'Rechercher...',   es:'Buscar...',   it:'Cerca...',     pt:'Pesquisar...',  de:'Suchen...',      ru:'Поиск...',     ko:'검색...', zh:'搜索...',ja:'検索...',  ur:'تلاش...' },
  'اسم المستخدم':            { en:'Username',     fr:'Nom d\'utilisateur',es:'Usuario',  it:'Nome utente',  pt:'Utilizador',   de:'Benutzername',   ru:'Имя пользователя',ko:'사용자명',zh:'用户名', ja:'ユーザー名',ur:'صارف نام' },
  'كلمة المرور':             { en:'Password',     fr:'Mot de passe',    es:'Contraseña',  it:'Password',     pt:'Senha',        de:'Passwort',       ru:'Пароль',       ko:'비밀번호', zh:'密码',   ja:'パスワード',ur:'پاس ورڈ' },
  'الرقم الوظيفي':           { en:'Employee ID',  fr:'ID employé',      es:'ID empleado', it:'ID dipendente',pt:'ID funcionário',de:'Mitarbeiter-ID', ru:'ID сотрудника',ko:'직원 ID',  zh:'员工ID', ja:'社員ID',   ur:'ملازم ID' },
  /* ── Empty states ─────────────────────────────────────── */
  'لا مهام':                 { en:'No tasks',        fr:'Pas de tâches',     es:'Sin tareas',       it:'Nessun compito',    pt:'Sem tarefas',      de:'Keine Aufgaben',    ru:'Нет задач',         ko:'작업 없음', zh:'无任务', ja:'タスクなし',  ur:'کوئی کام نہیں' },
  'لا مهام نشطة':            { en:'No active tasks', fr:'Pas de tâches actives',es:'Sin tareas activas',it:'Nessuna attività attiva',pt:'Sem tarefas ativas',de:'Keine aktiven Aufgaben',ru:'Нет активных задач',ko:'활성 작업 없음',zh:'无活跃任务',ja:'アクティブタスクなし',ur:'کوئی فعال کام نہیں' },
  'لا AFIs':                 { en:'No AFIs',          fr:'Pas d\'AFIs',        es:'Sin AFIs',         it:'Nessun AFI',        pt:'Sem AFIs',         de:'Keine AFIs',        ru:'Нет AFIs',          ko:'AFI 없음',  zh:'无AFIs', ja:'AFIなし',     ur:'کوئی AFI نہیں' },
  'لا تقييمات':              { en:'No assessments',   fr:'Pas d\'évaluations', es:'Sin evaluaciones', it:'Nessuna valutazione',pt:'Sem avaliações',   de:'Keine Bewertungen', ru:'Нет оценок',        ko:'평가 없음', zh:'无评估', ja:'評価なし',    ur:'کوئی تشخیص نہیں' },
  'لا مؤشرات':               { en:'No KPIs',          fr:'Pas de KPIs',        es:'Sin KPIs',         it:'Nessun KPI',        pt:'Sem KPIs',         de:'Keine KPIs',        ru:'Нет КПЭ',           ko:'KPI 없음',  zh:'无KPIs', ja:'KPIなし',     ur:'کوئی KPI نہیں' },
  'لا تنبيهات':              { en:'No alerts',        fr:'Pas d\'alertes',     es:'Sin alertas',      it:'Nessun avviso',     pt:'Sem alertas',      de:'Keine Warnungen',   ru:'Нет оповещений',    ko:'경보 없음', zh:'无警报', ja:'アラートなし', ur:'کوئی اطلاع نہیں' },
  'لا أعضاء':                { en:'No members',       fr:'Pas de membres',     es:'Sin miembros',     it:'Nessun membro',     pt:'Sem membros',      de:'Keine Mitglieder',  ru:'Нет участников',    ko:'멤버 없음', zh:'无成员', ja:'メンバーなし', ur:'کوئی رکن نہیں' },
  'لا تذاكر':                { en:'No tickets',       fr:'Pas de tickets',     es:'Sin tickets',      it:'Nessun ticket',     pt:'Sem tickets',      de:'Keine Tickets',     ru:'Нет тикетов',       ko:'티켓 없음', zh:'无工单', ja:'チケットなし', ur:'کوئی ٹکٹ نہیں' },
  'لا بيانات':               { en:'No data',          fr:'Pas de données',     es:'Sin datos',        it:'Nessun dato',       pt:'Sem dados',        de:'Keine Daten',       ru:'Нет данных',        ko:'데이터 없음',zh:'无数据',ja:'データなし',  ur:'کوئی ڈیٹا نہیں' },
  /* ── Toasts ───────────────────────────────────────────── */
  'تم الحفظ ✓':              { en:'Saved ✓',      fr:'Enregistré ✓',   es:'Guardado ✓',  it:'Salvato ✓',    pt:'Salvo ✓',      de:'Gespeichert ✓',  ru:'Сохранено ✓',  ko:'저장됨 ✓',   zh:'已保存 ✓',ja:'保存済み ✓',ur:'محفوظ ✓' },
  'تم التحديث ✓':            { en:'Updated ✓',    fr:'Mis à jour ✓',   es:'Actualizado ✓',it:'Aggiornato ✓',pt:'Atualizado ✓', de:'Aktualisiert ✓', ru:'Обновлено ✓',  ko:'업데이트됨 ✓',zh:'已更新 ✓',ja:'更新済み ✓',ur:'اپ ڈیٹ ✓' },
  'تم الإرسال ✓':            { en:'Sent ✓',       fr:'Envoyé ✓',       es:'Enviado ✓',   it:'Inviato ✓',    pt:'Enviado ✓',    de:'Gesendet ✓',     ru:'Отправлено ✓', ko:'전송됨 ✓',   zh:'已发送 ✓',ja:'送信済み ✓',ur:'بھیجا گیا ✓' },
  'تم الاعتماد ✓':           { en:'Approved ✓',   fr:'Approuvé ✓',     es:'Aprobado ✓',  it:'Approvato ✓',  pt:'Aprovado ✓',   de:'Genehmigt ✓',    ru:'Одобрено ✓',   ko:'승인됨 ✓',   zh:'已批准 ✓',ja:'承認済み ✓',ur:'منظور ✓' },
  'جارٍ التحميل...':         { en:'Loading...',   fr:'Chargement...',  es:'Cargando...',  it:'Caricamento...', pt:'Carregando...',de:'Laden...',       ru:'Загрузка...',  ko:'로딩 중...',  zh:'加载中...',ja:'読み込み中...',ur:'لوڈ ہو رہا ہے...' },
  /* ── Status & Flow ────────────────────────────────────── */
  'قيد التنفيذ':             { en:'In Progress',  fr:'En cours',       es:'En progreso',  it:'In corso',     pt:'Em progresso', de:'In Bearbeitung', ru:'В процессе',   ko:'진행 중',    zh:'进行中', ja:'進行中',   ur:'جاری' },
  'مفتوح':                   { en:'Open',         fr:'Ouvert',         es:'Abierto',      it:'Aperto',       pt:'Aberto',       de:'Offen',          ru:'Открыт',       ko:'열림',       zh:'开放',   ja:'オープン',  ur:'کھلا' },
  'مغلق':                    { en:'Closed',       fr:'Fermé',          es:'Cerrado',      it:'Chiuso',       pt:'Fechado',      de:'Geschlossen',    ru:'Закрыт',       ko:'닫힘',       zh:'关闭',   ja:'クローズ',  ur:'بند' },
  'متأخر':                   { en:'Overdue',      fr:'En retard',      es:'Atrasado',     it:'In ritardo',   pt:'Atrasado',     de:'Überfällig',     ru:'Просрочен',    ko:'기한초과',   zh:'逾期',   ja:'期限超過',  ur:'تاخیر' },
  'معلق':                    { en:'Pending',      fr:'En attente',     es:'Pendiente',    it:'In attesa',    pt:'Pendente',     de:'Ausstehend',     ru:'Ожидает',      ko:'보류 중',    zh:'待处理', ja:'保留中',   ur:'زیر التواء' },
  'مُعاد':                   { en:'Returned',     fr:'Retourné',       es:'Devuelto',     it:'Restituito',   pt:'Devolvido',    de:'Zurückgegeben',  ru:'Возвращён',    ko:'반환됨',     zh:'已退回', ja:'返却済み',  ur:'واپس' },
  'بانتظار المراجعة':        { en:'Pending Review',fr:'En attente de révision',es:'Pendiente de revisión',it:'In attesa di revisione',pt:'Aguardando revisão',de:'Ausstehende Überprüfung',ru:'Ожидает проверки',ko:'검토 대기',zh:'待审查',ja:'レビュー待ち',ur:'جائزہ کا انتظار' },
  'بانتظار الاعتماد':        { en:'Pending Approval',fr:'En attente d\'approbation',es:'Pendiente de aprobación',it:'In attesa di approvazione',pt:'Aguardando aprovação',de:'Ausstehende Genehmigung',ru:'Ожидает одобрения',ko:'승인 대기',zh:'待批准',ja:'承認待ち',ur:'منظوری کا انتظار' },
  /* ── Sections ─────────────────────────────────────────── */
  'آخر المهام':              { en:'Recent Tasks',       fr:'Tâches récentes',      es:'Tareas recientes',    it:'Attività recenti',    pt:'Tarefas recentes',   de:'Letzte Aufgaben',     ru:'Последние задачи',   ko:'최근 작업',   zh:'最近任务',   ja:'最近のタスク',  ur:'حالیہ کام' },
  'التنبيهات الحرجة':        { en:'Critical Alerts',    fr:'Alertes critiques',    es:'Alertas críticas',    it:'Avvisi critici',      pt:'Alertas críticos',   de:'Kritische Warnungen', ru:'Критические оповещения',ko:'위험 경보', zh:'严重警报',   ja:'重大アラート',  ur:'اہم اطلاعات' },
  'AFIs المفتوحة':           { en:'Open AFIs',           fr:'AFIs ouvertes',        es:'AFIs abiertas',       it:'AFIs aperte',         pt:'AFIs abertas',       de:'Offene AFIs',         ru:'Открытые AFIs',      ko:'열린 AFIs',   zh:'开放AFIs',   ja:'オープンAFI',   ur:'کھلے AFIs' },
  'مؤشرات تحت الهدف':       { en:'KPIs Below Target',   fr:'KPIs sous objectif',   es:'KPIs bajo objetivo',  it:'KPI sotto obiettivo', pt:'KPIs abaixo da meta',de:'KPIs unter Ziel',     ru:'КПЭ ниже цели',      ko:'목표 미달 KPIs',zh:'低于目标KPIs',ja:'目標未達KPI',   ur:'ہدف سے کم KPIs' },
  'مهام نشطة':               { en:'Active Tasks',        fr:'Tâches actives',       es:'Tareas activas',      it:'Attività attive',     pt:'Tarefas ativas',     de:'Aktive Aufgaben',     ru:'Активные задачи',    ko:'활성 작업',   zh:'活跃任务',   ja:'アクティブタスク',ur:'فعال کام' },
  'تنبيهات مفتوحة':          { en:'Open Alerts',         fr:'Alertes ouvertes',     es:'Alertas abiertas',    it:'Avvisi aperti',       pt:'Alertas abertos',    de:'Offene Warnungen',    ru:'Открытые оповещения',ko:'열린 경보',   zh:'开放警报',   ja:'オープンアラート',ur:'کھلی اطلاعات' },
  'تقييمات نشطة':            { en:'Active Assessments',  fr:'Évaluations actives',  es:'Evaluaciones activas',it:'Valutazioni attive',  pt:'Avaliações ativas',  de:'Aktive Bewertungen',  ru:'Активные оценки',    ko:'활성 평가',   zh:'活跃评估',   ja:'アクティブ評価', ur:'فعال تشخیص' },
  'نقاط التحسين المفتوحة':  { en:'Open AFIs',           fr:'AFIs ouvertes',        es:'AFIs abiertas',       it:'AFIs aperte',         pt:'AFIs abertas',       de:'Offene AFIs',         ru:'Открытые AFIs',      ko:'열린 AFIs',   zh:'开放AFIs',   ja:'オープンAFI',   ur:'کھلے AFIs' },
  'نقاط التحسين المتأخرة':  { en:'Overdue AFIs',        fr:'AFIs en retard',       es:'AFIs atrasadas',      it:'AFIs in ritardo',     pt:'AFIs atrasadas',     de:'Überfällige AFIs',    ru:'Просроченные AFIs',  ko:'기한초과 AFIs',zh:'逾期AFIs',   ja:'期限超過AFI',   ur:'تاخیری AFIs' },
  'مراجعة الإنجازات':       { en:'Review Completions',  fr:'Révisions',            es:'Revisiones',          it:'Revisioni',           pt:'Revisões',           de:'Überprüfungen',       ru:'Обзоры',             ko:'완료 검토',   zh:'完成审查',   ja:'完了レビュー',  ur:'تکمیل کا جائزہ' },
  'التحديث الأسبوعي':       { en:'Weekly Update',       fr:'Mise à jour hebdomadaire',es:'Actualización semanal',it:'Aggiornamento settimanale',pt:'Atualização semanal',de:'Wöchentliches Update',ru:'Еженедельное обновление',ko:'주간 업데이트',zh:'每周更新',  ja:'週次更新',      ur:'ہفتہ وار اپ ڈیٹ' },
  'إدارة المهام':            { en:'Task Management',     fr:'Gestion des tâches',   es:'Gestión de tareas',   it:'Gestione attività',   pt:'Gestão de tarefas',  de:'Aufgabenverwaltung',  ru:'Управление задачами',ko:'작업 관리',   zh:'任务管理',   ja:'タスク管理',    ur:'کاموں کا انتظام' },
  'إدارة المستخدمين':       { en:'User Management',     fr:'Gestion utilisateurs', es:'Gestión de usuarios', it:'Gestione utenti',     pt:'Gestão de utilizadores',de:'Benutzerverwaltung', ru:'Управление пользователями',ko:'사용자 관리',zh:'用户管理',  ja:'ユーザー管理',  ur:'صارف انتظام' },
  /* ── Misc ─────────────────────────────────────────────── */
  'قيد البناء…':             { en:'Coming soon…',  fr:'En construction…', es:'En construcción…',it:'In costruzione…',  pt:'Em construção…',  de:'In Entwicklung…', ru:'В разработке…',  ko:'준비 중…',  zh:'建设中…',  ja:'準備中…',   ur:'تعمیر جاری ہے…' },
  'مرحباً':                  { en:'Welcome',       fr:'Bienvenue',        es:'Bienvenido',      it:'Benvenuto',        pt:'Bem-vindo',        de:'Willkommen',      ru:'Добро пожаловать',ko:'환영합니다',zh:'欢迎',     ja:'ようこそ',  ur:'خوش آمدید' },
  'نشط':                     { en:'Active',        fr:'Actif',            es:'Activo',          it:'Attivo',           pt:'Ativo',            de:'Aktiv',           ru:'Активный',       ko:'활성',      zh:'活跃',     ja:'アクティブ',ur:'فعال' },
  'تأكيد الإغلاق':           { en:'Confirm Closure',fr:'Confirmer fermeture',es:'Confirmar cierre',it:'Conferma chiusura',pt:'Confirmar fechamento',de:'Schließung bestätigen',ru:'Подтвердить закрытие',ko:'완료 확인',zh:'确认关闭',ja:'完了確認',ur:'بندش تصدیق' },
  'سبب الإعادة':             { en:'Return Reason', fr:'Raison du retour', es:'Motivo de devolución',it:'Motivo della restituzione',pt:'Motivo de devolução',de:'Rücksendegrund',ru:'Причина возврата',ko:'반환 이유',zh:'退回原因',ja:'返却理由',ur:'واپسی کی وجہ' },
  'اعتماد الإنجاز':          { en:'Approve Completion',fr:'Approuver l\'achèvement',es:'Aprobar finalización',it:'Approva completamento',pt:'Aprovar conclusão',de:'Abschluss genehmigen',ru:'Одобрить завершение',ko:'완료 승인',zh:'批准完成',ja:'完了承認',ur:'تکمیل منظور' },
  'تغيير كلمة المرور':       { en:'Change Password',fr:'Changer le mot de passe',es:'Cambiar contraseña',it:'Cambia password',pt:'Alterar senha',de:'Passwort ändern',ru:'Изменить пароль',ko:'비밀번호 변경',zh:'修改密码',ja:'パスワード変更',ur:'پاس ورڈ تبدیل' },
};

/* ── tl: key-based lookup ─────────────────────────────── */
function tl(key) {
  const lang = (typeof App !== 'undefined' ? App.lang : null) || lsGet('se_lang_v2', 'en');
  return (TR[key] && TR[key][lang]) || (TR[key] && TR[key].en) || key;
}

/* ── t2: inline bilingual with 12-lang fallback ───────── */
function t2(ar, en) {
  const lang = (typeof App !== 'undefined' ? App.lang : null) || lsGet('se_lang_v2', 'en');
  if(lang === 'ar') return ar;
  if(lang === 'en') return en;
  return (DOM_MAP[ar] && DOM_MAP[ar][lang]) || en;
}

/* ── translateDOM: post-render translation ────────────── */
function translateDOM(container) {
  const lang = (typeof App !== 'undefined' ? App.lang : null) || lsGet('se_lang_v2', 'en');
  if(lang === 'ar' || !container) return;
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode: n => (n.parentNode.tagName !== 'SCRIPT' && n.parentNode.tagName !== 'STYLE') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
  });
  const nodes = [];
  while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    if(!node.textContent.trim()) return;
    let text = node.textContent, changed = false;
    for(const [ar, tr] of Object.entries(DOM_MAP)) {
      if(tr[lang] && text.includes(ar)) { text = text.split(ar).join(tr[lang]); changed = true; }
    }
    if(changed) node.textContent = text;
  });
  container.querySelectorAll('[placeholder]').forEach(el => {
    let ph = el.placeholder;
    for(const [ar, tr] of Object.entries(DOM_MAP)) {
      if(tr[lang] && ph.includes(ar)) ph = ph.split(ar).join(tr[lang]);
    }
    el.placeholder = ph;
  });
}

/* ── openLangPicker ───────────────────────────────────── */
function openLangPicker() {
  const current = (typeof App !== 'undefined' ? App.lang : null) || lsGet('se_lang_v2', 'en');
  const items = Object.entries(LANGS).map(([code, info]) =>
    `<button onclick="selectLang('${code}')" style="display:flex;align-items:center;gap:10px;width:100%;padding:10px 14px;background:${code===current?'rgba(37,99,235,.15)':'transparent'};border:1px solid ${code===current?'rgba(37,99,235,.35)':'transparent'};border-radius:8px;cursor:pointer;margin-bottom:4px;color:${code===current?'#60A5FA':'var(--t1,#E8F0FF)'};font-family:'IBM Plex Sans Arabic',sans-serif;font-size:13.5px;transition:.14s" onmouseover="this.style.background='rgba(37,99,235,.08)'" onmouseout="this.style.background='${code===current?'rgba(37,99,235,.15)':'transparent'}'">
      <span style="font-size:18px">${info.flag}</span><span style="flex:1">${info.name}</span>${code===current?'<span style="color:#60A5FA;font-size:12px">✓</span>':''}
    </button>`
  ).join('');
  if(typeof openModal !== 'undefined') {
    openModal(`<div class="mh"><h3 style="font-family:var(--hud)">🌐 Language / اللغة</h3><button class="mx" onclick="closeModal()">×</button></div><div class="mbd" style="max-height:70vh;overflow-y:auto">${items}</div>`);
  }
}

/* ── selectLang ───────────────────────────────────────── */
function selectLang(code) {
  if(typeof App !== 'undefined') App.lang = code;
  lsSet('se_lang_v2', code);
  lsSet('se_lang_ver', '3');
  const info = LANGS[code];
  document.documentElement.lang = code;
  document.documentElement.dir = info.dir;
  if(typeof closeModal !== 'undefined') closeModal();

  setTimeout(() => {
    // Re-render current page
    if(typeof window.PAGES !== 'undefined' && window._currentPage) {
      const fn = window.PAGES[window._currentPage];
      const ct = document.getElementById('pgContent');
      if(fn && ct) { ct.innerHTML = '<div class="fade" id="pg"></div>'; fn(document.getElementById('pg')); }
    }
    // Re-render nav
    if(typeof buildNav !== 'undefined' && window._currentNav)
      buildNav(window._currentNav, window._currentPage);
    // Update page title
    const item = window._currentNav?.find(n => n.k === window._currentPage);
    const ptEl = document.getElementById('pgtitle') || document.getElementById('pgTitle');
    if(item && ptEl) ptEl.textContent = (item.tlKey) ? tl(item.tlKey) : (code==='ar' ? item.ar : item.en);
    // Admin-specific re-renders
    if(window.renderUsers    && window._currentPage === 'users')    renderUsers();
    if(window.renderDivs     && window._currentPage === 'divs')     renderDivs();
    if(window.renderSettings && window._currentPage === 'settings') renderSettings();
    if(window.renderHealth   && window._currentPage === 'health')   renderHealth();
    // Multiple translation passes for async content
    if(code !== 'ar') {
      const doT = () => translateDOM(document.querySelector('.main') || document.body);
      doT();
      setTimeout(doT, 400);
      setTimeout(doT, 1200);
    }
  }, 50);
}

/* ── Export ───────────────────────────────────────────── */
if(typeof window !== 'undefined') {
  Object.assign(window, { LANGS, TR, DOM_MAP, tl, t2, translateDOM, openLangPicker, selectLang, lsGet, lsSet });
}
