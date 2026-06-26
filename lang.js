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
  nav_weekly_upd:   { ar:'التحديث الأسبوعي', en:'Weekly Update',   fr:'Mise à jour hebdo.', es:'Actualización semanal', it:'Aggiornamento settimanale', pt:'Atualização semanal', de:'Wöchentliches Update', ru:'Еженедельное обновление', ko:'주간 업데이트', zh:'每周更新', ja:'週次更新', ur:'ہفتہ وار اپ ڈیٹ' },
  nav_warroom:      { ar:'برج السيطرة',    en:'Control Tower',   fr:'Tour de contrôle',   es:'Torre de control',     it:'Torre di controllo',   pt:'Torre de controle',  de:'Kontrollturm',         ru:'Башня управления',       ko:'관제탑',          zh:'控制塔',         ja:'コントロールタワー', ur:'کنٹرول ٹاور' },
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
  btn_confirm:      { ar:'تأكيد',         en:'Confirm',         fr:'Confirmer',        es:'Confirmar',      it:'Conferma',         pt:'Confirmar',       de:'Bestätigen',       ru:'Подтвердить',      ko:'확인',             zh:'确认',            ja:'確認',            ur:'تصدیق کریں' },
  btn_approve:      { ar:'اعتماد',        en:'Approve',         fr:'Approuver',        es:'Aprobar',        it:'Approva',          pt:'Aprovar',         de:'Genehmigen',       ru:'Одобрить',         ko:'승인',             zh:'批准',            ja:'承認',            ur:'منظور کریں' },
  btn_reject:       { ar:'رفض',           en:'Reject',          fr:'Rejeter',          es:'Rechazar',       it:'Rifiuta',          pt:'Rejeitar',        de:'Ablehnen',         ru:'Отклонить',        ko:'거부',             zh:'拒绝',            ja:'却下',            ur:'مسترد کریں' },
  btn_return:       { ar:'إعادة',         en:'Return',          fr:'Retourner',        es:'Devolver',       it:'Restituisci',      pt:'Devolver',        de:'Zurücksenden',     ru:'Вернуть',          ko:'반환',             zh:'退回',            ja:'返却',            ur:'واپس کریں' },
  btn_new_task:     { ar:'مهمة جديدة',    en:'New Task',        fr:'Nouvelle tâche',   es:'Nueva tarea',    it:'Nuovo compito',    pt:'Nova tarefa',     de:'Neue Aufgabe',     ru:'Новая задача',     ko:'새 작업',           zh:'新任务',          ja:'新しいタスク',    ur:'نیا کام' },
  btn_new_user:     { ar:'إنشاء مستخدم',  en:'Create User',     fr:'Créer un utilisateur',es:'Crear usuario',it:'Crea utente',     pt:'Criar utilizador',de:'Benutzer erstellen',ru:'Создать пользователя',ko:'사용자 생성',       zh:'创建用户',         ja:'ユーザー作成',    ur:'صارف بنائیں' },
  btn_new_emp:      { ar:'إضافة موظف',    en:'Add Employee',    fr:'Ajouter employé',  es:'Agregar empleado',it:'Aggiungi dipendente',pt:'Adicionar funcionário',de:'Mitarbeiter hinzufügen',ru:'Добавить сотрудника',ko:'직원 추가',         zh:'添加员工',         ja:'従業員追加',      ur:'ملازم شامل کریں' },
  btn_logout:       { ar:'خروج',          en:'Sign Out',        fr:'Déconnexion',      es:'Cerrar sesión',  it:'Esci',             pt:'Sair',            de:'Abmelden',         ru:'Выйти',            ko:'로그아웃',          zh:'退出',            ja:'ログアウト',      ur:'باہر نکلیں' },
  btn_update:       { ar:'تحديث',         en:'Update',          fr:'Mettre à jour',    es:'Actualizar',     it:'Aggiorna',         pt:'Atualizar',       de:'Aktualisieren',    ru:'Обновить',         ko:'업데이트',          zh:'更新',            ja:'更新',            ur:'اپ ڈیٹ کریں' },
  btn_generate:     { ar:'توليد',         en:'Generate',        fr:'Générer',          es:'Generar',        it:'Genera',           pt:'Gerar',           de:'Generieren',       ru:'Сгенерировать',    ko:'생성',             zh:'生成',            ja:'生成',            ur:'بنائیں' },
  btn_copy:         { ar:'نسخ',           en:'Copy',            fr:'Copier',           es:'Copiar',         it:'Copia',            pt:'Copiar',          de:'Kopieren',         ru:'Копировать',       ko:'복사',             zh:'复制',            ja:'コピー',          ur:'نقل کریں' },
  btn_print:        { ar:'طباعة',         en:'Print',           fr:'Imprimer',         es:'Imprimir',       it:'Stampa',           pt:'Imprimir',        de:'Drucken',          ru:'Печать',           ko:'인쇄',             zh:'打印',            ja:'印刷',            ur:'پرنٹ کریں' },

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
  pri_critical:     { ar:'حرج',           en:'Critical',        fr:'Critique',         es:'Crítico',        it:'Critico',          pt:'Crítico',         de:'Kritisch',         ru:'Критический',      ko:'위험',             zh:'紧急',            ja:'重大',            ur:'نازک' },

  /* ── Stats / Labels ───────────────────────────────────── */
  lbl_total:        { ar:'الإجمالي',      en:'Total',           fr:'Total',            es:'Total',          it:'Totale',           pt:'Total',           de:'Gesamt',           ru:'Всего',            ko:'합계',             zh:'总计',            ja:'合計',            ur:'کل' },
  lbl_all:          { ar:'الكل',          en:'All',             fr:'Tout',             es:'Todo',           it:'Tutto',            pt:'Tudo',            de:'Alle',             ru:'Все',              ko:'전체',             zh:'全部',            ja:'全て',            ur:'سب' },
  lbl_open_afis:    { ar:'AFIs مفتوحة',   en:'Open AFIs',       fr:'AFIs ouvertes',    es:'AFIs abiertas',  it:'AFIs aperte',      pt:'AFIs abertas',    de:'Offene AFIs',      ru:'Открытые AFIs',    ko:'열린 AFIs',         zh:'开放AFIs',         ja:'オープンAFI',     ur:'کھلے AFIs' },
  lbl_overdue_afis: { ar:'AFIs متأخرة',   en:'Overdue AFIs',    fr:'AFIs en retard',   es:'AFIs atrasadas', it:'AFIs in ritardo',  pt:'AFIs atrasadas',  de:'Überfällige AFIs', ru:'Просроченные AFIs',ko:'기한초과 AFIs',     zh:'逾期AFIs',         ja:'期限超過AFI',     ur:'تاخیری AFIs' },
  lbl_active_tasks: { ar:'مهام نشطة',     en:'Active Tasks',    fr:'Tâches actives',   es:'Tareas activas', it:'Attività attive',  pt:'Tarefas ativas',  de:'Aktive Aufgaben',  ru:'Активные задачи',  ko:'활성 작업',         zh:'活跃任务',         ja:'アクティブタスク',ur:'فعال کام' },
  lbl_open_alerts:  { ar:'تنبيهات مفتوحة',en:'Open Alerts',     fr:'Alertes ouvertes', es:'Alertas abiertas',it:'Avvisi aperti',    pt:'Alertas abertos', de:'Offene Warnungen', ru:'Открытые оповещения',ko:'열린 경보',         zh:'开放警报',         ja:'オープンアラート',ur:'کھلی اطلاعات' },
  lbl_active_assm:  { ar:'تقييمات نشطة',  en:'Active Assessments',fr:'Évaluations actives',es:'Evaluaciones activas',it:'Valutazioni attive',pt:'Avaliações ativas',de:'Aktive Bewertungen',ru:'Активные оценки',  ko:'활성 평가',         zh:'活跃评估',         ja:'アクティブ評価', ur:'فعال تشخیص' },
  lbl_open_kpis:    { ar:'مؤشرات مفتوحة', en:'Active KPIs',     fr:'KPIs actifs',      es:'KPIs activos',   it:'KPIs attivi',      pt:'KPIs ativos',     de:'Aktive KPIs',      ru:'Активные КПЭ',     ko:'활성 KPIs',         zh:'活跃KPIs',         ja:'アクティブKPI',  ur:'فعال KPIs' },
  lbl_completed:    { ar:'مُنجزة',        en:'Completed',       fr:'Terminé',          es:'Completado',     it:'Completato',       pt:'Concluído',       de:'Abgeschlossen',    ru:'Завершено',        ko:'완료됨',            zh:'已完成',          ja:'完了',            ur:'مکمل' },
  lbl_pending_appr: { ar:'بانتظار الاعتماد',en:'Pending Approval',fr:'En attente d\'approbation',es:'Pendiente de aprobación',it:'In attesa di approvazione',pt:'Aguardando aprovação',de:'Ausstehende Genehmigung',ru:'Ожидает одобрения',ko:'승인 대기',         zh:'待批准',          ja:'承認待ち',        ur:'منظوری کا انتظار' },
  lbl_dept_health:  { ar:'صحة الإدارة',   en:'Dept Health',     fr:'Santé dépt.',      es:'Salud depto.',   it:'Salute reparto',   pt:'Saúde depto.',    de:'Abt. Gesundheit',  ru:'Здоровье отдела',  ko:'부서 상태',         zh:'部门健康',         ja:'部署状態',        ur:'محکمہ صحت' },
  lbl_score:        { ar:'النتيجة',       en:'Score',           fr:'Score',            es:'Puntuación',     it:'Punteggio',        pt:'Pontuação',       de:'Punktzahl',        ru:'Оценка',           ko:'점수',             zh:'分数',            ja:'スコア',          ur:'نتیجہ' },
  lbl_target:       { ar:'الهدف',         en:'Target',          fr:'Objectif',         es:'Objetivo',       it:'Obiettivo',        pt:'Meta',            de:'Ziel',             ru:'Цель',             ko:'목표',             zh:'目标',            ja:'目標',            ur:'ہدف' },
  lbl_actual:       { ar:'الفعلي',        en:'Actual',          fr:'Réel',             es:'Real',           it:'Reale',            pt:'Real',            de:'Tatsächlich',      ru:'Фактический',      ko:'실제',             zh:'实际',            ja:'実績',            ur:'حقیقی' },
  lbl_priority:     { ar:'الأولوية',      en:'Priority',        fr:'Priorité',         es:'Prioridad',      it:'Priorità',         pt:'Prioridade',      de:'Priorität',        ru:'Приоритет',        ko:'우선순위',          zh:'优先级',          ja:'優先度',          ur:'ترجیح' },
  lbl_status:       { ar:'الحالة',        en:'Status',          fr:'Statut',           es:'Estado',         it:'Stato',            pt:'Status',          de:'Status',           ru:'Статус',           ko:'상태',             zh:'状态',            ja:'ステータス',      ur:'حیثیت' },
  lbl_due_date:     { ar:'الاستحقاق',     en:'Due Date',        fr:'Date d\'échéance',  es:'Fecha límite',   it:'Scadenza',         pt:'Prazo',           de:'Fälligkeitsdatum', ru:'Срок выполнения',  ko:'마감일',            zh:'截止日期',         ja:'期限',            ur:'آخری تاریخ' },
  lbl_name:         { ar:'الاسم',         en:'Name',            fr:'Nom',              es:'Nombre',         it:'Nome',             pt:'Nome',            de:'Name',             ru:'Имя',              ko:'이름',             zh:'姓名',            ja:'名前',            ur:'نام' },
  lbl_role:         { ar:'الدور',         en:'Role',            fr:'Rôle',             es:'Rol',            it:'Ruolo',            pt:'Função',          de:'Rolle',            ru:'Роль',             ko:'역할',             zh:'角色',            ja:'役割',            ur:'کردار' },
  lbl_division:     { ar:'الدائرة',       en:'Division',        fr:'Division',         es:'División',       it:'Divisione',        pt:'Divisão',         de:'Abteilung',        ru:'Подразделение',    ko:'부서',             zh:'部门',            ja:'部署',            ur:'ڈویژن' },
  lbl_manager:      { ar:'المدير',        en:'Manager',         fr:'Responsable',      es:'Gerente',        it:'Responsabile',     pt:'Gerente',         de:'Manager',          ru:'Менеджер',         ko:'관리자',            zh:'经理',            ja:'マネージャー',    ur:'مینیجر' },
  lbl_employee:     { ar:'الموظف',        en:'Employee',        fr:'Employé',          es:'Empleado',       it:'Dipendente',       pt:'Funcionário',     de:'Mitarbeiter',      ru:'Сотрудник',        ko:'직원',             zh:'员工',            ja:'従業員',          ur:'ملازم' },
  lbl_emp_id:       { ar:'الرقم الوظيفي', en:'Employee ID',     fr:'ID employé',       es:'ID empleado',    it:'ID dipendente',    pt:'ID funcionário',  de:'Mitarbeiter-ID',   ru:'ID сотрудника',    ko:'직원 ID',           zh:'员工ID',          ja:'社員ID',          ur:'ملازم ID' },
  lbl_username:     { ar:'اسم المستخدم',  en:'Username',        fr:'Nom d\'utilisateur',es:'Nombre de usuario',it:'Nome utente',   pt:'Nome de utilizador',de:'Benutzername',    ru:'Имя пользователя', ko:'사용자명',          zh:'用户名',          ja:'ユーザー名',      ur:'صارف نام' },
  lbl_password:     { ar:'كلمة المرور',   en:'Password',        fr:'Mot de passe',     es:'Contraseña',     it:'Password',         pt:'Senha',           de:'Passwort',         ru:'Пароль',           ko:'비밀번호',          zh:'密码',            ja:'パスワード',      ur:'پاس ورڈ' },
  lbl_temp_pass:    { ar:'كلمة مرور مؤقتة',en:'Temp Password',  fr:'Mot de passe temp',es:'Contraseña temp',it:'Password temp',    pt:'Senha temporária',de:'Temp. Passwort',   ru:'Временный пароль', ko:'임시 비밀번호',      zh:'临时密码',         ja:'仮パスワード',    ur:'عارضی پاس ورڈ' },
  lbl_title:        { ar:'العنوان',       en:'Title',           fr:'Titre',            es:'Título',         it:'Titolo',           pt:'Título',          de:'Titel',            ru:'Заголовок',        ko:'제목',             zh:'标题',            ja:'タイトル',        ur:'عنوان' },
  lbl_description:  { ar:'الوصف',         en:'Description',     fr:'Description',      es:'Descripción',    it:'Descrizione',      pt:'Descrição',       de:'Beschreibung',     ru:'Описание',         ko:'설명',             zh:'描述',            ja:'説明',            ur:'تفصیل' },
  lbl_note:         { ar:'ملاحظة',        en:'Note',            fr:'Note',             es:'Nota',           it:'Nota',             pt:'Nota',            de:'Hinweis',          ru:'Примечание',       ko:'메모',             zh:'备注',            ja:'メモ',            ur:'نوٹ' },
  lbl_created:      { ar:'تاريخ الإنشاء', en:'Created',         fr:'Créé le',          es:'Creado',         it:'Creato',           pt:'Criado',          de:'Erstellt',         ru:'Создано',          ko:'생성일',            zh:'创建于',          ja:'作成日',          ur:'بنایا گیا' },
  lbl_updated:      { ar:'آخر تحديث',     en:'Updated',         fr:'Mis à jour',       es:'Actualizado',    it:'Aggiornato',       pt:'Atualizado',      de:'Aktualisiert',     ru:'Обновлено',        ko:'업데이트됨',         zh:'更新于',          ja:'更新日',          ur:'اپ ڈیٹ ہوا' },
  lbl_actions:      { ar:'إجراءات',       en:'Actions',         fr:'Actions',          es:'Acciones',       it:'Azioni',           pt:'Ações',           de:'Aktionen',         ru:'Действия',         ko:'작업',             zh:'操作',            ja:'アクション',      ur:'اقدامات' },

  /* ── Empty States ─────────────────────────────────────── */
  empty_tasks:      { ar:'لا مهام بعد',   en:'No tasks yet',    fr:'Pas de tâches',    es:'Sin tareas',     it:'Nessun compito',   pt:'Sem tarefas',     de:'Keine Aufgaben',   ru:'Нет задач',        ko:'작업 없음',         zh:'暂无任务',         ja:'タスクなし',      ur:'کوئی کام نہیں' },
  empty_afis:       { ar:'لا AFIs',        en:'No AFIs',         fr:'Pas d\'AFIs',       es:'Sin AFIs',       it:'Nessun AFI',       pt:'Sem AFIs',        de:'Keine AFIs',       ru:'Нет AFIs',         ko:'AFI 없음',          zh:'无AFIs',          ja:'AFIなし',         ur:'کوئی AFI نہیں' },
  empty_alerts:     { ar:'لا تنبيهات',    en:'No alerts',       fr:'Pas d\'alertes',    es:'Sin alertas',    it:'Nessun avviso',    pt:'Sem alertas',     de:'Keine Warnungen',  ru:'Нет оповещений',   ko:'경보 없음',         zh:'无警报',          ja:'アラートなし',    ur:'کوئی اطلاع نہیں' },
  empty_kpis:       { ar:'لا مؤشرات',     en:'No KPIs',         fr:'Pas de KPIs',      es:'Sin KPIs',       it:'Nessun KPI',       pt:'Sem KPIs',        de:'Keine KPIs',       ru:'Нет КПЭ',          ko:'KPI 없음',          zh:'无KPIs',          ja:'KPIなし',         ur:'کوئی KPI نہیں' },
  empty_assessments:{ ar:'لا تقييمات',    en:'No assessments',  fr:'Pas d\'évaluations',es:'Sin evaluaciones',it:'Nessuna valutazione',pt:'Sem avaliações', de:'Keine Bewertungen',ru:'Нет оценок',        ko:'평가 없음',         zh:'无评估',          ja:'評価なし',        ur:'کوئی تشخیص نہیں' },
  empty_tickets:    { ar:'لا تذاكر',      en:'No tickets',      fr:'Pas de tickets',   es:'Sin tickets',    it:'Nessun ticket',    pt:'Sem tickets',     de:'Keine Tickets',    ru:'Нет тикетов',      ko:'티켓 없음',         zh:'无工单',          ja:'チケットなし',    ur:'کوئی ٹکٹ نہیں' },
  empty_meetings:   { ar:'لا اجتماعات',   en:'No meetings',     fr:'Pas de réunions',  es:'Sin reuniones',  it:'Nessuna riunione', pt:'Sem reuniões',    de:'Keine Meetings',   ru:'Нет встреч',       ko:'회의 없음',         zh:'无会议',          ja:'会議なし',        ur:'کوئی میٹنگ نہیں' },
  empty_team:       { ar:'لا أعضاء بعد',  en:'No team members', fr:'Pas de membres',   es:'Sin miembros',   it:'Nessun membro',    pt:'Sem membros',     de:'Keine Mitglieder', ru:'Нет участников',   ko:'팀원 없음',         zh:'无成员',          ja:'メンバーなし',    ur:'کوئی رکن نہیں' },
  empty_docs:       { ar:'لا وثائق',      en:'No documents',    fr:'Pas de documents', es:'Sin documentos', it:'Nessun documento', pt:'Sem documentos',  de:'Keine Dokumente',  ru:'Нет документов',   ko:'문서 없음',         zh:'无文件',          ja:'書類なし',        ur:'کوئی دستاویز نہیں' },

  /* ── Messages / Toasts ────────────────────────────────── */
  msg_saved:        { ar:'تم الحفظ ✓',    en:'Saved ✓',         fr:'Enregistré ✓',     es:'Guardado ✓',     it:'Salvato ✓',        pt:'Salvo ✓',         de:'Gespeichert ✓',    ru:'Сохранено ✓',      ko:'저장됨 ✓',          zh:'已保存 ✓',         ja:'保存済み ✓',      ur:'محفوظ ✓' },
  msg_updated:      { ar:'تم التحديث ✓',  en:'Updated ✓',       fr:'Mis à jour ✓',     es:'Actualizado ✓',  it:'Aggiornato ✓',     pt:'Atualizado ✓',    de:'Aktualisiert ✓',   ru:'Обновлено ✓',      ko:'업데이트됨 ✓',      zh:'已更新 ✓',         ja:'更新済み ✓',      ur:'اپ ڈیٹ ✓' },
  msg_deleted:      { ar:'تم الحذف',      en:'Deleted',         fr:'Supprimé',         es:'Eliminado',      it:'Eliminato',        pt:'Excluído',        de:'Gelöscht',         ru:'Удалено',          ko:'삭제됨',            zh:'已删除',          ja:'削除済み',        ur:'حذف ہوا' },
  msg_sent:         { ar:'تم الإرسال ✓',  en:'Sent ✓',          fr:'Envoyé ✓',         es:'Enviado ✓',      it:'Inviato ✓',        pt:'Enviado ✓',       de:'Gesendet ✓',       ru:'Отправлено ✓',     ko:'전송됨 ✓',          zh:'已发送 ✓',         ja:'送信済み ✓',      ur:'بھیجا گیا ✓' },
  msg_approved:     { ar:'تم الاعتماد ✓', en:'Approved ✓',      fr:'Approuvé ✓',       es:'Aprobado ✓',     it:'Approvato ✓',      pt:'Aprovado ✓',      de:'Genehmigt ✓',      ru:'Одобрено ✓',       ko:'승인됨 ✓',          zh:'已批准 ✓',         ja:'承認済み ✓',      ur:'منظور ✓' },
  msg_loading:      { ar:'جارٍ التحميل',  en:'Loading...',      fr:'Chargement...',    es:'Cargando...',    it:'Caricamento...',   pt:'Carregando...',   de:'Laden...',         ru:'Загрузка...',      ko:'로딩 중...',         zh:'加载中...',        ja:'読み込み中...',   ur:'لوڈ ہو رہا ہے...' },
  msg_saving:       { ar:'جارٍ الحفظ',    en:'Saving...',       fr:'Enregistrement...', es:'Guardando...',  it:'Salvataggio...',   pt:'Salvando...',     de:'Speichern...',     ru:'Сохранение...',    ko:'저장 중...',         zh:'保存中...',        ja:'保存中...',       ur:'محفوظ ہو رہا ہے...' },
  msg_no_data:      { ar:'لا بيانات',     en:'No data',         fr:'Pas de données',   es:'Sin datos',      it:'Nessun dato',      pt:'Sem dados',       de:'Keine Daten',      ru:'Нет данных',       ko:'데이터 없음',        zh:'无数据',          ja:'データなし',      ur:'کوئی ڈیٹا نہیں' },
  msg_error:        { ar:'خطأ',           en:'Error',           fr:'Erreur',           es:'Error',          it:'Errore',           pt:'Erro',            de:'Fehler',           ru:'Ошибка',           ko:'오류',             zh:'错误',            ja:'エラー',          ur:'غلطی' },
  msg_wrong_creds:  { ar:'اسم المستخدم أو كلمة المرور غير صحيحة', en:'Invalid username or password',
                      fr:'Identifiants invalides', es:'Credenciales inválidas', it:'Credenziali non valide',
                      pt:'Credenciais inválidas', de:'Ungültige Anmeldedaten', ru:'Неверные учётные данные',
                      ko:'잘못된 사용자명 또는 비밀번호', zh:'用户名或密码错误', ja:'ユーザー名またはパスワードが違います', ur:'غلط صارف نام یا پاس ورڈ' },
  msg_login_success:{ ar:'تم الدخول بنجاح ✓', en:'Signed in successfully ✓',
                      fr:'Connecté avec succès ✓', es:'Sesión iniciada ✓', it:'Accesso riuscito ✓',
                      pt:'Login bem-sucedido ✓', de:'Erfolgreich angemeldet ✓', ru:'Успешный вход ✓',
                      ko:'로그인 성공 ✓', zh:'登录成功 ✓', ja:'ログイン成功 ✓', ur:'کامیابی سے لاگ ان ✓' },

  /* ── Form fields ──────────────────────────────────────── */
  form_full_name:   { ar:'الاسم الكامل',  en:'Full Name',       fr:'Nom complet',      es:'Nombre completo',it:'Nome completo',    pt:'Nome completo',   de:'Vollständiger Name',ru:'Полное имя',        ko:'전체 이름',         zh:'全名',            ja:'フルネーム',      ur:'پورا نام' },
  form_job_title:   { ar:'المسمى الوظيفي',en:'Job Title',       fr:'Intitulé du poste',es:'Cargo',          it:'Titolo professionale',pt:'Cargo',          de:'Berufsbezeichnung',ru:'Должность',        ko:'직책',             zh:'职位',            ja:'役職',            ur:'عہدہ' },
  form_phone:       { ar:'الهاتف',        en:'Phone',           fr:'Téléphone',        es:'Teléfono',       it:'Telefono',         pt:'Telefone',        de:'Telefon',          ru:'Телефон',          ko:'전화',             zh:'电话',            ja:'電話',            ur:'فون' },
  form_email_ref:   { ar:'رقم المرجع',    en:'Reference / Link',fr:'Référence',        es:'Referencia',     it:'Riferimento',      pt:'Referência',      de:'Referenz',         ru:'Ссылка',           ko:'참조 번호',         zh:'参考号',          ja:'参照番号',        ur:'حوالہ نمبر' },

  /* ── Dashboard sections ────────────────────────────────── */
  sec_recent_tasks: { ar:'آخر المهام',    en:'Recent Tasks',    fr:'Tâches récentes',  es:'Tareas recientes',it:'Attività recenti', pt:'Tarefas recentes',de:'Letzte Aufgaben',  ru:'Последние задачи', ko:'최근 작업',         zh:'最近任务',         ja:'最近のタスク',    ur:'حالیہ کام' },
  sec_critical_alr: { ar:'تنبيهات حرجة',  en:'Critical Alerts', fr:'Alertes critiques',es:'Alertas críticas',it:'Avvisi critici',   pt:'Alertas críticos',de:'Kritische Warnungen',ru:'Критические оповещения',ko:'심각한 경보',       zh:'关键警报',         ja:'重大アラート',    ur:'اہم اطلاعات' },
  sec_open_afis:    { ar:'AFIs المفتوحة',  en:'Open AFIs',       fr:'AFIs ouvertes',    es:'AFIs abiertas',  it:'AFIs aperte',      pt:'AFIs abertas',    de:'Offene AFIs',      ru:'Открытые AFIs',    ko:'열린 AFIs',         zh:'开放AFIs',         ja:'オープンAFI',     ur:'کھلے AFIs' },
  sec_kpi_below:    { ar:'مؤشرات دون الهدف',en:'KPIs Below Target',fr:'KPIs sous objectif',es:'KPIs bajo objetivo',it:'KPIs sotto obiettivo',pt:'KPIs abaixo da meta',de:'KPIs unter Ziel', ru:'КПЭ ниже цели',    ko:'목표 미달 KPIs',    zh:'低于目标KPIs',     ja:'目標未達KPI',     ur:'ہدف سے کم KPIs' },
  sec_perf_signals: { ar:'مؤشرات الأداء',  en:'Performance Signals',fr:'Signaux de perf.',es:'Señales de rendimiento',it:'Segnali di performance',pt:'Sinais de desempenho',de:'Leistungssignale',ru:'Сигналы производительности',ko:'성과 지표',         zh:'绩效指标',         ja:'パフォーマンス指標',ur:'کارکردگی کے اشارے' },

  /* ── Login Page ────────────────────────────────────────── */
  login_title:      { ar:'تسجيل الدخول',  en:'Sign In',         fr:'Connexion',        es:'Iniciar sesión', it:'Accedi',           pt:'Entrar',          de:'Anmelden',         ru:'Войти',            ko:'로그인',            zh:'登录',            ja:'ログイン',        ur:'لاگ ان' },
  login_username_lbl:{ ar:'اسم المستخدم / الرقم الوظيفي', en:'Username / Employee ID',
                       fr:'Nom d\'utilisateur / ID', es:'Usuario / ID empleado', it:'Utente / ID',
                       pt:'Utilizador / ID', de:'Benutzername / ID', ru:'Имя / ID сотрудника',
                       ko:'사용자명 / 직원 ID', zh:'用户名 / 员工ID', ja:'ユーザー名 / 社員ID', ur:'صارف نام / ملازم ID' },
  login_pass_lbl:   { ar:'كلمة المرور',   en:'Password',        fr:'Mot de passe',     es:'Contraseña',     it:'Password',         pt:'Senha',           de:'Passwort',         ru:'Пароль',           ko:'비밀번호',          zh:'密码',            ja:'パスワード',      ur:'پاس ورڈ' },
  login_btn:        { ar:'دخول',          en:'Sign In',         fr:'Se connecter',     es:'Entrar',         it:'Accedi',           pt:'Entrar',          de:'Anmelden',         ru:'Войти',            ko:'로그인',            zh:'登录',            ja:'ログイン',        ur:'داخل ہوں' },

  /* ── Misc ──────────────────────────────────────────────── */
  misc_change_pass: { ar:'تغيير كلمة المرور', en:'Change Password',fr:'Changer le mot de passe',es:'Cambiar contraseña',it:'Cambia password', pt:'Alterar senha',   de:'Passwort ändern',  ru:'Изменить пароль',  ko:'비밀번호 변경',     zh:'修改密码',         ja:'パスワード変更',  ur:'پاس ورڈ تبدیل کریں' },
  misc_new_pass:    { ar:'كلمة مرور جديدة', en:'New Password',   fr:'Nouveau mot de passe',es:'Nueva contraseña',it:'Nuova password',   pt:'Nova senha',      de:'Neues Passwort',   ru:'Новый пароль',     ko:'새 비밀번호',        zh:'新密码',          ja:'新しいパスワード',ur:'نیا پاس ورڈ' },
  misc_signout_after:{ ar:'ستُسجَّل خارجاً بعد التغيير', en:'You will be signed out after change',
                       fr:'Vous serez déconnecté après le changement', es:'Cerrarás sesión tras el cambio',
                       it:'Sarai disconnesso dopo il cambiamento', pt:'Você será desconectado após a alteração',
                       de:'Sie werden nach der Änderung abgemeldet', ru:'Вы будете выведены из системы',
                       ko:'변경 후 로그아웃됩니다', zh:'更改后将退出登录', ja:'変更後ログアウトされます', ur:'تبدیلی کے بعد لاگ آؤٹ ہو جائیں گے' },
  misc_excel:       { ar:'ممتاز',         en:'Excellent',       fr:'Excellent',        es:'Excelente',      it:'Eccellente',       pt:'Excelente',       de:'Ausgezeichnet',    ru:'Отлично',          ko:'우수',             zh:'优秀',            ja:'優秀',            ur:'شاندار' },
  misc_good:        { ar:'جيد',           en:'Good',            fr:'Bien',             es:'Bueno',          it:'Buono',            pt:'Bom',             de:'Gut',              ru:'Хорошо',           ko:'좋음',             zh:'良好',            ja:'良い',            ur:'اچھا' },
  misc_watch:       { ar:'مراقبة',        en:'Watch',           fr:'Surveiller',       es:'Vigilar',        it:'Osservare',        pt:'Monitorar',       de:'Beobachten',       ru:'Наблюдение',       ko:'주의',             zh:'观察',            ja:'観察',            ur:'نگرانی' },
  misc_critical2:   { ar:'حرج',           en:'Critical',        fr:'Critique',         es:'Crítico',        it:'Critico',          pt:'Crítico',         de:'Kritisch',         ru:'Критично',         ko:'위험',             zh:'危急',            ja:'重大',            ur:'نازک' },
  /* ── Division Names ──────────────────────────────────── */
  div_governance:    { ar:'دائرة الحوكمة والتقييم',  en:'Governance & Assessment', fr:'Gouvernance et Évaluation', es:'Gobernanza y Evaluación', it:'Governance e Valutazione', pt:'Governança e Avaliação', de:'Governance und Bewertung', ru:'Управление и оценка', ko:'거버넌스 및 평가', zh:'治理与评估', ja:'ガバナンスと評価', ur:'حکمرانی اور تشخیص' },
  div_governance_sub:{ ar:'المايسترو · الإطار · التقييم · المؤشرات', en:'The Maestro · Framework · Assessment · KPIs', fr:'Le Maestro · Cadre · Évaluation · KPIs', es:'El Maestro · Marco · Evaluación · KPIs', it:'Il Maestro · Framework · Valutazione · KPI', pt:'O Maestro · Estrutura · Avaliação · KPIs', de:'Der Maestro · Rahmen · Bewertung · KPIs', ru:'Маэстро · Структура · Оценка · КПЭ', ko:'마에스트로 · 프레임워크 · 평가 · KPIs', zh:'大师·框架·评估·KPIs', ja:'マエストロ·フレームワーク·評価·KPI', ur:'ماسٹرو · فریم ورک · تشخیص · KPIs' },
  div_generation:    { ar:'دائرة التوليد',            en:'Generation OE',           fr:'Production OE',             es:'Generación OE',           it:'Generazione OE',           pt:'Geração OE',             de:'Erzeugung OE',           ru:'Производство OE',          ko:'발전 OE',               zh:'发电OE',          ja:'発電OE',           ur:'پیداوار OE' },
  div_generation_sub:{ ar:'إدارة أداء التوليد · تدفق الطاقة', en:'Generation Performance · Energy Flow', fr:'Performance de production · Flux d\'énergie', es:'Rendimiento · Flujo de energía', it:'Prestazioni · Flusso di energia', pt:'Desempenho · Fluxo de energia', de:'Leistung · Energiefluss', ru:'Производительность · Поток энергии', ko:'성능·에너지 흐름', zh:'发电性能·能量流', ja:'発電性能·エネルギー流', ur:'کارکردگی · توانائی کا بہاو' },
  div_grid:          { ar:'الشبكة الوطنية',           en:'National Grid',           fr:'Réseau National',           es:'Red Nacional',            it:'Rete Nazionale',           pt:'Rede Nacional',          de:'Nationales Netz',         ru:'Национальная сеть',        ko:'국가 전력망',             zh:'国家电网',        ja:'国家電力網',       ur:'قومی گرڈ' },
  div_grid_sub:      { ar:'شريان الطاقة · موثوقية النقل', en:'Energy Artery · Transmission Reliability', fr:'Artère énergétique · Fiabilité', es:'Arteria energética · Fiabilidad', it:'Arteria energetica · Affidabilità', pt:'Artéria energética · Confiabilidade', de:'Energieader · Zuverlässigkeit', ru:'Энергетическая артерия · Надёжность', ko:'에너지 동맥·전송 신뢰성', zh:'能源动脉·输电可靠性', ja:'エネルギー動脈·送電信頼性', ur:'توانائی کی شریان · قابلیت' },
  div_distribution:  { ar:'دائرة التوزيع',            en:'Distribution OE',         fr:'Distribution OE',           es:'Distribución OE',         it:'Distribuzione OE',         pt:'Distribuição OE',        de:'Verteilung OE',           ru:'Распределение OE',         ko:'배전 OE',               zh:'配电OE',          ja:'配電OE',           ur:'تقسیم OE' },
  div_distribution_sub:{ ar:'شبكة التوزيع الحية · SAIDI', en:'Live Distribution Network · SAIDI', fr:'Réseau de distribution · SAIDI', es:'Red de distribución · SAIDI', it:'Rete di distribuzione · SAIDI', pt:'Rede de distribuição · SAIDI', de:'Verteilernetz · SAIDI', ru:'Сеть распределения · SAIDI', ko:'배전망·SAIDI', zh:'配电网络·SAIDI', ja:'配電ネットワーク·SAIDI', ur:'تقسیم نیٹ ورک · SAIDI' },
  div_alerts:        { ar:'التنبيهات الفنية',          en:'Technical Alerts',        fr:'Alertes Techniques',        es:'Alertas Técnicas',        it:'Avvisi Tecnici',           pt:'Alertas Técnicos',       de:'Technische Warnungen',    ru:'Технические оповещения',   ko:'기술 경보',             zh:'技术警报',        ja:'技術アラート',    ur:'تکنیکی اطلاعات' },
  div_alerts_sub:    { ar:'الرادار الفني · رصد المخاطر', en:'Technical Radar · Risk Monitoring', fr:'Radar technique · Surveillance des risques', es:'Radar técnico · Monitoreo de riesgos', it:'Radar tecnico · Monitoraggio rischi', pt:'Radar técnico · Monitoramento de riscos', de:'Technisches Radar · Risikoüberwachung', ru:'Технический радар · Мониторинг рисков', ko:'기술 레이더·위험 모니터링', zh:'技术雷达·风险监控', ja:'技術レーダー·リスク監視', ur:'تکنیکی ریڈار · خطرات کی نگرانی' },

  /* ── Page content ─────────────────────────────────────── */
  page_loading:      { ar:'قيد البناء…',         en:'Coming soon…',       fr:'En construction…',   es:'En construcción…',  it:'In costruzione…',    pt:'Em construção…',    de:'In Entwicklung…',   ru:'В разработке…',     ko:'준비 중…',          zh:'建设中…',         ja:'準備中…',          ur:'تعمیر جاری ہے…' },
  page_my_day:       { ar:'يوم العمل',            en:'My Day',             fr:'Mon Jour',           es:'Mi Día',            it:'La Mia Giornata',   pt:'Meu Dia',           de:'Mein Tag',          ru:'Мой день',          ko:'오늘 하루',         zh:'我的一天',         ja:'今日の仕事',       ur:'میرا دن' },
  page_new_task:     { ar:'مهمة جديدة',           en:'New Task',           fr:'Nouvelle Tâche',     es:'Nueva Tarea',       it:'Nuovo Compito',     pt:'Nova Tarefa',       de:'Neue Aufgabe',      ru:'Новая задача',      ko:'새 작업',          zh:'新任务',           ja:'新しいタスク',     ur:'نیا کام' },
  page_weekly_upd:   { ar:'التحديث الأسبوعي',    en:'Weekly Update',      fr:'Mise à jour hebdo.', es:'Actualización semanal',it:'Aggiornamento settimanale',pt:'Atualização semanal',de:'Wöchentliches Update',ru:'Еженедельное обновление',ko:'주간 업데이트',    zh:'每周更新',         ja:'週次更新',         ur:'ہفتہ وار اپ ڈیٹ' },

  /* ── Task operations ──────────────────────────────────── */
  task_assign_to:    { ar:'مكلّف إليه',          en:'Assigned To',        fr:'Assigné à',          es:'Asignado a',        it:'Assegnato a',       pt:'Atribuído a',       de:'Zugewiesen an',     ru:'Назначено',         ko:'담당자',            zh:'指派给',           ja:'担当者',           ur:'تفویض کردہ' },
  task_assign_by:    { ar:'مكلّف من',            en:'Assigned By',        fr:'Assigné par',        es:'Asignado por',      it:'Assegnato da',      pt:'Atribuído por',     de:'Zugewiesen von',    ru:'Назначено кем',     ko:'담당 배정자',        zh:'由...指派',        ja:'担当配置者',       ur:'تفویض کردہ از' },
  task_progress:     { ar:'التقدم',              en:'Progress',           fr:'Avancement',         es:'Progreso',          it:'Avanzamento',       pt:'Progresso',         de:'Fortschritt',       ru:'Прогресс',          ko:'진행률',            zh:'进度',             ja:'進捗',             ur:'پیش رفت' },
  task_evidence:     { ar:'دليل الإنجاز',        en:'Completion Evidence',fr:'Preuve d\'achèvement',es:'Evidencia de cumplimiento',it:'Evidenza di completamento',pt:'Evidência de conclusão',de:'Abschlussnachweis',ru:'Доказательство завершения',ko:'완료 증거',         zh:'完成证明',         ja:'完了証拠',         ur:'تکمیل ثبوت' },
  task_email_sent:   { ar:'أُرسل الإنجاز بالإيميل', en:'Completion Email Sent', fr:'Email d\'achèvement envoyé', es:'Email de finalización enviado', it:'Email di completamento inviata', pt:'Email de conclusão enviado', de:'Abschluss-E-Mail gesendet', ru:'Письмо о завершении отправлено', ko:'완료 이메일 전송됨', zh:'完成邮件已发送', ja:'完了メール送信済み', ur:'تکمیل ای میل بھیجا' },
  task_close_confirm:{ ar:'تأكيد الإغلاق',      en:'Confirm Closure',    fr:'Confirmer la fermeture', es:'Confirmar cierre', it:'Conferma chiusura', pt:'Confirmar fechamento', de:'Schließung bestätigen', ru:'Подтвердить закрытие', ko:'완료 확인', zh:'确认关闭', ja:'完了確認', ur:'بندش کی تصدیق' },

  /* ── AFI operations ───────────────────────────────────── */
  afi_corrective:    { ar:'الإجراء التصحيحي',   en:'Corrective Action',  fr:'Action corrective',  es:'Acción correctiva', it:'Azione correttiva', pt:'Ação corretiva',    de:'Korrekturmaßnahme', ru:'Корректирующее действие', ko:'시정 조치',         zh:'纠正措施',         ja:'是正措置',         ur:'اصلاحی اقدام' },
  afi_root_cause:    { ar:'السبب الجذري',        en:'Root Cause',         fr:'Cause racine',       es:'Causa raíz',        it:'Causa radice',      pt:'Causa raiz',        de:'Grundursache',      ru:'Первопричина',      ko:'근본 원인',         zh:'根本原因',         ja:'根本原因',         ur:'بنیادی وجہ' },
  afi_source:        { ar:'المصدر',              en:'Source',             fr:'Source',             es:'Fuente',            it:'Fonte',             pt:'Fonte',             de:'Quelle',            ru:'Источник',          ko:'출처',             zh:'来源',             ja:'ソース',           ur:'ماخذ' },
  afi_closure_ev:    { ar:'دليل الإغلاق',        en:'Closure Evidence',   fr:'Preuve de fermeture',es:'Evidencia de cierre',it:'Evidenza di chiusura',pt:'Evidência de fechamento',de:'Schließungsnachweis',ru:'Доказательство закрытия',ko:'완료 증거',         zh:'关闭证明',         ja:'完了証拠',         ur:'بندش ثبوت' },

  /* ── Assessment ───────────────────────────────────────── */
  assm_type:         { ar:'نوع التقييم',         en:'Assessment Type',    fr:'Type d\'évaluation', es:'Tipo de evaluación',it:'Tipo di valutazione',pt:'Tipo de avaliação',de:'Bewertungstyp',     ru:'Тип оценки',        ko:'평가 유형',         zh:'评估类型',         ja:'評価タイプ',       ur:'تشخیص کی قسم' },
  assm_internal:     { ar:'داخلي',               en:'Internal',           fr:'Interne',            es:'Interno',           it:'Interno',           pt:'Interno',           de:'Intern',            ru:'Внутренний',        ko:'내부',             zh:'内部',             ja:'内部',             ur:'اندرونی' },
  assm_external:     { ar:'خارجي',               en:'External',           fr:'Externe',            es:'Externo',           it:'Esterno',           pt:'Externo',           de:'Extern',            ru:'Внешний',           ko:'외부',             zh:'外部',             ja:'外部',             ur:'بیرونی' },
  assm_findings:     { ar:'النتائج',             en:'Findings',           fr:'Résultats',          es:'Hallazgos',         it:'Risultati',         pt:'Achados',           de:'Ergebnisse',        ru:'Результаты',        ko:'결과',             zh:'发现',             ja:'所見',             ur:'نتائج' },
  assm_evidence:     { ar:'الأدلة',              en:'Evidence',           fr:'Preuves',            es:'Evidencias',        it:'Prove',             pt:'Evidências',        de:'Nachweise',         ru:'Доказательства',    ko:'증거',             zh:'证据',             ja:'証拠',             ur:'ثبوت' },
  assm_stage:        { ar:'المرحلة',             en:'Stage',              fr:'Étape',              es:'Etapa',             it:'Fase',              pt:'Etapa',             de:'Stufe',             ru:'Этап',              ko:'단계',             zh:'阶段',             ja:'ステージ',         ur:'مرحلہ' },

  /* ── KPI ──────────────────────────────────────────────── */
  kpi_unit:          { ar:'الوحدة',              en:'Unit',               fr:'Unité',              es:'Unidad',            it:'Unità',             pt:'Unidade',           de:'Einheit',           ru:'Единица',           ko:'단위',             zh:'单位',             ja:'単位',             ur:'اکائی' },
  kpi_frequency:     { ar:'التكرار',             en:'Frequency',          fr:'Fréquence',          es:'Frecuencia',        it:'Frequenza',         pt:'Frequência',        de:'Häufigkeit',        ru:'Частота',           ko:'빈도',             zh:'频率',             ja:'頻度',             ur:'تکرار' },
  kpi_trend_up:      { ar:'صاعد',                en:'Trending Up',        fr:'En hausse',          es:'En alza',           it:'In aumento',        pt:'Em alta',           de:'Steigend',          ru:'Растёт',            ko:'상승 중',          zh:'上升趋势',         ja:'上昇トレンド',     ur:'اوپر کا رجحان' },
  kpi_trend_down:    { ar:'هابط',                en:'Trending Down',      fr:'En baisse',          es:'En baja',           it:'In calo',           pt:'Em queda',          de:'Fallend',           ru:'Снижается',         ko:'하락 중',          zh:'下降趋势',         ja:'下降トレンド',     ur:'نیچے کا رجحان' },
  kpi_trend_stable:  { ar:'مستقر',               en:'Stable',             fr:'Stable',             es:'Estable',           it:'Stabile',           pt:'Estável',           de:'Stabil',            ru:'Стабильный',        ko:'안정',             zh:'稳定',             ja:'安定',             ur:'مستحکم' },

  /* ── Alert ────────────────────────────────────────────── */
  alert_severity:    { ar:'خطورة التنبيه',       en:'Alert Severity',     fr:'Gravité de l\'alerte',es:'Gravedad de alerta',it:'Gravità avviso',    pt:'Gravidade do alerta',de:'Warnschwere',       ru:'Серьёзность оповещения',ko:'경보 심각도',        zh:'警报严重性',       ja:'アラート重要度',   ur:'اطلاع کی شدت' },
  alert_category:    { ar:'الفئة',               en:'Category',           fr:'Catégorie',          es:'Categoría',         it:'Categoria',         pt:'Categoria',         de:'Kategorie',         ru:'Категория',         ko:'카테고리',          zh:'类别',             ja:'カテゴリー',       ur:'زمرہ' },
  alert_operational: { ar:'تشغيلي',              en:'Operational',        fr:'Opérationnel',       es:'Operacional',       it:'Operativo',         pt:'Operacional',       de:'Operativ',          ru:'Операционный',      ko:'운영',             zh:'运营',             ja:'運用',             ur:'آپریشنل' },

  /* ── Ticket ───────────────────────────────────────────── */
  ticket_type:       { ar:'نوع التذكرة',         en:'Ticket Type',        fr:'Type de ticket',     es:'Tipo de ticket',    it:'Tipo di ticket',    pt:'Tipo de ticket',    de:'Ticket-Typ',        ru:'Тип тикета',        ko:'티켓 유형',         zh:'工单类型',         ja:'チケットタイプ',   ur:'ٹکٹ کی قسم' },
  ticket_request:    { ar:'طلب',                 en:'Request',            fr:'Demande',            es:'Solicitud',         it:'Richiesta',         pt:'Solicitação',       de:'Anfrage',           ru:'Запрос',            ko:'요청',             zh:'请求',             ja:'リクエスト',       ur:'درخواست' },
  ticket_issue:      { ar:'مشكلة',               en:'Issue',              fr:'Problème',           es:'Problema',          it:'Problema',          pt:'Problema',          de:'Problem',           ru:'Проблема',          ko:'문제',             zh:'问题',             ja:'問題',             ur:'مسئلہ' },
  ticket_reply:      { ar:'رد',                  en:'Reply',              fr:'Réponse',            es:'Respuesta',         it:'Risposta',          pt:'Resposta',          de:'Antwort',           ru:'Ответ',             ko:'답변',             zh:'回复',             ja:'返信',             ur:'جواب' },

  /* ── Team ─────────────────────────────────────────────── */
  team_members:      { ar:'أعضاء الفريق',        en:'Team Members',       fr:'Membres de l\'équipe',es:'Miembros del equipo',it:'Membri del team',   pt:'Membros da equipe', de:'Teammitglieder',    ru:'Члены команды',     ko:'팀원',             zh:'团队成员',         ja:'チームメンバー',   ur:'ٹیم ارکان' },
  team_create_emp:   { ar:'إنشاء حساب موظف',     en:'Create Employee Account',fr:'Créer compte employé',es:'Crear cuenta empleado',it:'Crea account dipendente',pt:'Criar conta funcionário',de:'Mitarbeiterkonto erstellen',ru:'Создать аккаунт сотрудника',ko:'직원 계정 생성',    zh:'创建员工账户',     ja:'従業員アカウント作成',ur:'ملازم اکاؤنٹ بنائیں' },

  /* ── Admin ────────────────────────────────────────────── */
  admin_sys_admin:   { ar:'مشرف النظام',         en:'System Admin',       fr:'Admin système',      es:'Admin del sistema', it:'Admin di sistema',  pt:'Admin do sistema',  de:'Systemadmin',       ru:'Системный администратор',ko:'시스템 관리자',     zh:'系统管理员',       ja:'システム管理者',   ur:'سسٹم ایڈمن' },
  admin_director:    { ar:'مدير الإدارة',        en:'Director',           fr:'Directeur',          es:'Director',          it:'Direttore',         pt:'Diretor',           de:'Direktor',          ru:'Директор',          ko:'이사',             zh:'总监',             ja:'ディレクター',     ur:'ڈائریکٹر' },
  admin_create:      { ar:'إنشاء مستخدم',        en:'Create User',        fr:'Créer utilisateur',  es:'Crear usuario',     it:'Crea utente',       pt:'Criar utilizador',  de:'Benutzer erstellen',ru:'Создать пользователя',ko:'사용자 생성',       zh:'创建用户',         ja:'ユーザー作成',     ur:'صارف بنائیں' },
  admin_one_mgr:     { ar:'دائرة واحدة = مدير واحد', en:'One division = One manager',fr:'Une division = Un responsable',es:'Una división = Un gerente',it:'Una divisione = Un manager',pt:'Uma divisão = Um gerente',de:'Eine Abteilung = Ein Manager',ru:'Одно подразделение = Один менеджер',ko:'한 부서 = 한 관리자',zh:'一个部门一个经理',ja:'1部署1マネージャー',ur:'ایک ڈویژن ایک مینیجر' },

  /* ── Director Portal ──────────────────────────────────── */
  dir_warroom_title: { ar:'غرفة العمليات التنفيذية', en:'Executive Operations Room', fr:'Salle de commandement exécutif', es:'Sala de mando ejecutivo', it:'Sala operativa esecutiva', pt:'Sala de controle executivo', de:'Exekutiver Einsatzraum', ru:'Исполнительный оперативный центр', ko:'경영 작전실', zh:'高管作战室', ja:'経営作戦室', ur:'ایگزیکٹو آپریشن روم' },
  dir_warroom_sub:   { ar:'نظرة استراتيجية شاملة على منظومة التميز التشغيلي', en:'Comprehensive strategic view on Operational Excellence system', fr:'Vue stratégique globale sur le système d\'excellence opérationnelle', es:'Vista estratégica integral del sistema de excelencia operativa', it:'Visione strategica completa del sistema di eccellenza operativa', pt:'Visão estratégica abrangente do sistema de excelência operacional', de:'Umfassende strategische Sicht auf das Betriebsexzellenz-System', ru:'Комплексный стратегический взгляд на систему операционного совершенства', ko:'운영 우수성 시스템의 포괄적 전략적 보기', zh:'运营卓越系统的全面战略视图', ja:'運用卓越性システムの包括的戦略的ビュー', ur:'آپریشنل ایکسیلنس سسٹم پر جامع اسٹریٹجک نظریہ' },
  dir_qpi_title:     { ar:'التقرير الربعي — QPI',   en:'Quarterly Report — QPI', fr:'Rapport trimestriel — QPI', es:'Informe trimestral — QPI', it:'Rapporto trimestrale — QPI', pt:'Relatório trimestral — QPI', de:'Quartalsbericht — QPI', ru:'Квартальный отчёт — QPI', ko:'분기 보고서 — QPI', zh:'季度报告 — QPI', ja:'四半期報告 — QPI', ur:'سہ ماہی رپورٹ — QPI' },
  dir_escalation_box:{ ar:'صندوق التصعيد التنفيذي', en:'Executive Escalation Inbox', fr:'Boîte d\'escalade exécutive', es:'Bandeja de escalada ejecutiva', it:'Casella di escalation esecutiva', pt:'Caixa de escalada executiva', de:'Executive-Eskalationseingang', ru:'Входящие эскалации руководства', ko:'경영진 에스컬레이션 받은편지함', zh:'高管升级收件箱', ja:'経営エスカレーションボックス', ur:'ایگزیکٹو ایسکلیشن باکس' },

  /* ── Employee Portal ──────────────────────────────────── */
  emp_overdue_action:{ ar:'متأخرة — إجراء فوري', en:'Overdue — Immediate Action', fr:'En retard — Action immédiate', es:'Atrasado — Acción inmediata', it:'In ritardo — Azione immediata', pt:'Atrasado — Ação imediata', de:'Überfällig — Sofortmaßnahme', ru:'Просрочено — Немедленные действия', ko:'기한초과 — 즉각 조치', zh:'逾期 — 立即行动', ja:'期限超過 — 即時対応', ur:'تاخیر — فوری اقدام' },
  emp_today_priority:{ ar:'أولويات اليوم',        en:"Today's Priorities",  fr:'Priorités du jour',  es:'Prioridades del día',it:'Priorità di oggi',  pt:'Prioridades de hoje',de:'Heutige Prioritäten',ru:'Приоритеты на сегодня',ko:'오늘의 우선순위',   zh:'今日优先事项',     ja:'本日の優先事項',   ur:'آج کی ترجیحات' },
  emp_recent_updates:{ ar:'آخر تحديث لمهامي',    en:'Recent Task Updates', fr:'Dernières mises à jour',es:'Últimas actualizaciones',it:'Ultimi aggiornamenti',pt:'Últimas atualizações',de:'Letzte Aktualisierungen',ru:'Последние обновления задач',ko:'최근 작업 업데이트',zh:'最近任务更新',     ja:'最新タスク更新',   ur:'حالیہ ٹاسک اپ ڈیٹس' },
  emp_my_info:       { ar:'معلوماتي',             en:'My Information',      fr:'Mes informations',   es:'Mi información',    it:'Le mie informazioni',pt:'Minhas informações',de:'Meine Informationen',ru:'Моя информация',    ko:'내 정보',          zh:'我的信息',         ja:'私の情報',         ur:'میری معلومات' },
  emp_completed:     { ar:'المُنجزة',             en:'Completed Tasks',     fr:'Tâches terminées',   es:'Tareas completadas',it:'Attività completate',pt:'Tarefas concluídas',de:'Abgeschlossene Aufgaben',ru:'Завершённые задачи',ko:'완료된 작업',       zh:'已完成任务',       ja:'完了タスク',       ur:'مکمل کام' },
  emp_daily_q1:      { ar:'ماذا أنجزت اليوم؟',   en:'What did you accomplish today?', fr:'Qu\'avez-vous accompli aujourd\'hui?', es:'¿Qué lograste hoy?', it:'Cosa hai realizzato oggi?', pt:'O que você realizou hoje?', de:'Was haben Sie heute erreicht?', ru:'Что вы сегодня сделали?', ko:'오늘 무엇을 이루었나요?', zh:'今天完成了什么？', ja:'今日は何を達成しましたか？', ur:'آج آپ نے کیا حاصل کیا؟' },
  emp_daily_q2:      { ar:'هل هناك عوائق أو تأخير؟', en:'Any blockers or delays?', fr:'Des obstacles ou retards?', es:'¿Algún bloqueo o retraso?', it:'Ci sono blocchi o ritardi?', pt:'Algum bloqueio ou atraso?', de:'Gibt es Hindernisse oder Verzögerungen?', ru:'Есть ли препятствия или задержки?', ko:'장애물이나 지연이 있나요?', zh:'有任何障碍或延误吗？', ja:'ブロッカーや遅延はありますか？', ur:'کوئی رکاوٹ یا تاخیر؟' },
  emp_daily_q3:      { ar:'أولويات الغد',         en:"Tomorrow's Priorities",fr:'Priorités de demain',es:'Prioridades de mañana',it:'Priorità di domani',pt:'Prioridades de amanhã',de:'Morgige Prioritäten','ru':'Приоритеты на завтра','ko':'내일 우선순위','zh':'明天的优先事项','ja':'明日の優先事項','ur':'کل کی ترجیحات' },
  emp_daily_rating:  { ar:'تقييمك لإنتاجية يومك', en:'Rate your daily productivity', fr:'Évaluez votre productivité', es:'Califica tu productividad', it:'Valuta la tua produttività', pt:'Avalie sua produtividade', de:'Bewerten Sie Ihre Produktivität', ru:'Оцените вашу продуктивность', ko:'오늘의 생산성 평가', zh:'评估您今天的生产力', ja:'今日の生産性を評価', ur:'اپنی پیداواری صلاحیت کی درجہ بندی' },
  emp_perf_rate:     { ar:'معدل الإنجاز',         en:'Completion Rate',     fr:'Taux de réalisation', es:'Tasa de finalización',it:'Tasso di completamento',pt:'Taxa de conclusão',de:'Abschlussrate',     ru:'Процент выполнения', ko:'완료율',           zh:'完成率',           ja:'完了率',           ur:'تکمیل کی شرح' },
  emp_perf_points:   { ar:'نقاط الأداء',          en:'Performance Points',  fr:'Points de performance',es:'Puntos de rendimiento',it:'Punti di performance',pt:'Pontos de desempenho',de:'Leistungspunkte',   ru:'Очки производительности',ko:'성과 포인트',       zh:'绩效分数',         ja:'パフォーマンスポイント',ur:'کارکردگی کے نقاط' },
};

/* ── Translate function ──────────────────────────────── */
function tl(key) {
  const lang = (typeof App !== 'undefined' ? App.lang : null) || localStorage.getItem('se_lang_v2') || 'en';
  return (TR[key] && TR[key][lang]) || (TR[key] && TR[key]['en']) || key;
}

/* ── Language switcher UI ─────────────────────────────── */
function openLangPicker() {
  const current = (typeof App !== 'undefined' ? App.lang : null) || localStorage.getItem('se_lang_v2') || 'en';
  const items = Object.entries(LANGS).map(([code, info]) =>
    `<button onclick="selectLang('${code}')" style="
      display:flex;align-items:center;gap:10px;width:100%;padding:10px 14px;
      background:${code===current?'rgba(37,99,235,.15)':'transparent'};
      border:1px solid ${code===current?'rgba(37,99,235,.35)':'transparent'};
      border-radius:8px;cursor:pointer;text-align:right;margin-bottom:4px;
      color:${code===current?'#60A5FA':'var(--t1)'};font-family:'IBM Plex Sans Arabic',sans-serif;font-size:13.5px;
      transition:.14s" onmouseover="this.style.background='rgba(37,99,235,.08)'" onmouseout="this.style.background='${code===current?'rgba(37,99,235,.15)':'transparent'}'">
      <span style="font-size:18px">${info.flag}</span>
      <span style="flex:1">${info.name}</span>
      ${code===current?'<span style="color:#60A5FA;font-size:12px">✓</span>':''}
    </button>`
  ).join('');

  if(typeof openModal !== 'undefined') {
    openModal(`
      <div class="mh"><h3 style="font-family:var(--hud)">🌐 ${tl('nav_settings')}</h3><button class="mx" onclick="closeModal()">×</button></div>
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
      const ct = document.getElementById('pgContent');
      if(fn && ct) {
        ct.innerHTML = '<div class="fade" id="pg"></div>';
        fn(document.getElementById('pg'));
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
    // Aggressive translation passes — handles async content
    autoTranslate();
    setTimeout(autoTranslate, 300);
    setTimeout(autoTranslate, 700);
    setTimeout(autoTranslate, 1500);
    setTimeout(autoTranslate, 3000);
  }, 50);
}

function translateWord(ar, lang) {
  if(lang === 'ar') return ar;
  if(DOM_MAP[ar] && DOM_MAP[ar][lang]) return DOM_MAP[ar][lang];
  return ar;
}



/* Export */
if(typeof window !== 'undefined') {
  Object.assign(window, { TR, LANGS, tl, openLangPicker, selectLang });
}

/* ═══════════════════════════════════════════════════════════
   DOM AUTO-TRANSLATOR
   Runs after each page render to translate all visible text
═══════════════════════════════════════════════════════════ */

const DOM_MAP = {
  /* ── Dashboard / Hero ─────────────────────────────────── */
  'لوحة المتابعة':           { en:'Dashboard',        fr:'Tableau de bord', es:'Panel',          it:'Pannello',        pt:'Painel',         de:'Dashboard',       ru:'Панель',          ko:'대시보드',         zh:'仪表板',          ja:'ダッシュボード',   ur:'ڈیش بورڈ' },
  'لوحة التحكم':             { en:'Dashboard',        fr:'Tableau de bord', es:'Panel',          it:'Pannello',        pt:'Painel',         de:'Dashboard',       ru:'Панель',          ko:'대시보드',         zh:'仪表板',          ja:'ダッシュボード',   ur:'ڈیش بورڈ' },
  'يوم العمل':               { en:'My Day',           fr:'Mon Jour',        es:'Mi Día',         it:'La Mia Giornata',pt:'Meu Dia',        de:'Mein Tag',        ru:'Мой день',        ko:'오늘 하루',        zh:'今日工作',        ja:'今日の仕事',       ur:'میرا دن' },
  'دائرة الحوكمة والتقييم': { en:'Governance & Assessment', fr:'Gouvernance',es:'Gobernanza',   it:'Governance',      pt:'Governança',     de:'Governance',      ru:'Управление',      ko:'거버넌스',         zh:'治理',            ja:'ガバナンス',      ur:'حکمرانی' },
  'دائرة التوليد':           { en:'Generation OE',    fr:'Production',      es:'Generación',     it:'Generazione',     pt:'Geração',        de:'Erzeugung',       ru:'Производство',    ko:'발전',             zh:'发电',            ja:'発電',            ur:'پیداوار' },
  'الشبكة الوطنية':          { en:'National Grid',    fr:'Réseau National', es:'Red Nacional',   it:'Rete Nazionale',  pt:'Rede Nacional',  de:'Nationales Netz', ru:'Национальная сеть',ko:'국가 전력망',      zh:'国家电网',        ja:'国家電力網',      ur:'قومی گرڈ' },
  'دائرة التوزيع':           { en:'Distribution OE',  fr:'Distribution',    es:'Distribución',   it:'Distribuzione',   pt:'Distribuição',   de:'Verteilung',      ru:'Распределение',   ko:'배전',             zh:'配电',            ja:'配電',            ur:'تقسیم' },
  'التنبيهات الفنية':        { en:'Technical Alerts', fr:'Alertes Tech.',   es:'Alertas Téc.',   it:'Avvisi Tecnici',  pt:'Alertas Téc.',   de:'Tech. Warnungen', ru:'Тех. оповещения', ko:'기술 경보',        zh:'技术警报',        ja:'技術アラート',    ur:'تکنیکی اطلاعات' },
  'إدارة التميز التشغيلي':  { en:'OE Department',    fr:'Département OE',  es:'Depto. OE',      it:'Reparto OE',      pt:'Depto. OE',      de:'OE-Abteilung',    ru:'Отдел OE',        ko:'OE 부서',          zh:'OE部门',          ja:'OE部署',          ur:'OE ڈیپارٹمنٹ' },
  /* ── Nav sections ─────────────────────────────────────── */
  'المهام':                  { en:'Tasks',            fr:'Tâches',          es:'Tareas',         it:'Attività',        pt:'Tarefas',        de:'Aufgaben',        ru:'Задачи',          ko:'작업',             zh:'任务',            ja:'タスク',          ur:'کام' },
  'التحسين':                 { en:'Improvement',      fr:'Amélioration',    es:'Mejora',         it:'Miglioramento',   pt:'Melhoria',       de:'Verbesserung',    ru:'Улучшение',       ko:'개선',             zh:'改进',            ja:'改善',            ur:'بہتری' },
  'الفريق':                  { en:'Team',             fr:'Équipe',          es:'Equipo',         it:'Squadra',         pt:'Equipe',         de:'Team',            ru:'Команда',         ko:'팀',               zh:'团队',            ja:'チーム',          ur:'ٹیم' },
  'متابعة':                  { en:'Tracking',         fr:'Suivi',           es:'Seguimiento',    it:'Monitoraggio',    pt:'Rastreamento',   de:'Verfolgung',      ru:'Отслеживание',    ko:'추적',             zh:'跟踪',            ja:'追跡',            ur:'نگرانی' },
  /* ── Stat labels ──────────────────────────────────────── */
  'AFIs مفتوحة':             { en:'Open AFIs',        fr:'AFIs ouvertes',   es:'AFIs abiertas',  it:'AFIs aperte',     pt:'AFIs abertas',   de:'Offene AFIs',     ru:'Открытые AFIs',   ko:'열린 AFIs',        zh:'开放AFIs',        ja:'オープンAFI',     ur:'کھلے AFIs' },
  'AFIs متأخرة':             { en:'Overdue AFIs',     fr:'AFIs en retard',  es:'AFIs atrasadas', it:'AFIs in ritardo', pt:'AFIs atrasadas', de:'Überfällige AFIs',ru:'Просроченные AFIs',ko:'기한초과 AFIs',   zh:'逾期AFIs',        ja:'期限超過AFI',     ur:'تاخیری AFIs' },
  'مهام نشطة':               { en:'Active Tasks',     fr:'Tâches actives',  es:'Tareas activas', it:'Attività attive', pt:'Tarefas ativas', de:'Aktive Aufgaben', ru:'Активные задачи', ko:'활성 작업',        zh:'活跃任务',        ja:'アクティブタスク',ur:'فعال کام' },
  'مهام مفتوحة':             { en:'Open Tasks',       fr:'Tâches ouvertes', es:'Tareas abiertas',it:'Attività aperte', pt:'Tarefas abertas',de:'Offene Aufgaben', ru:'Открытые задачи', ko:'열린 작업',        zh:'开放任务',        ja:'オープンタスク',  ur:'کھلے کام' },
  'مهام متأخرة':             { en:'Overdue Tasks',    fr:'Tâches en retard',es:'Tareas atrasadas',it:'Attività in ritardo',pt:'Tarefas atrasadas',de:'Überfällige Aufgaben',ru:'Просроченные задачи',ko:'기한초과 작업',  zh:'逾期任务',        ja:'期限超過タスク',  ur:'تاخیری کام' },
  'تنبيهات مفتوحة':          { en:'Open Alerts',      fr:'Alertes ouvertes',es:'Alertas abiertas',it:'Avvisi aperti',   pt:'Alertas abertos',de:'Offene Warnungen',ru:'Открытые оповещения',ko:'열린 경보',       zh:'开放警报',        ja:'オープンアラート',ur:'کھلی اطلاعات' },
  'تنبيهات حرجة':            { en:'Critical Alerts',  fr:'Alertes critiques',es:'Alertas críticas',it:'Avvisi critici', pt:'Alertas críticos',de:'Kritische Warnungen',ru:'Критические оповещения',ko:'위험 경보',      zh:'严重警报',        ja:'重大アラート',    ur:'اہم اطلاعات' },
  'تقييمات نشطة':            { en:'Active Assessments',fr:'Évaluations actives',es:'Evaluaciones activas',it:'Valutazioni attive',pt:'Avaliações ativas',de:'Aktive Bewertungen',ru:'Активные оценки',ko:'활성 평가',        zh:'活跃评估',        ja:'アクティブ評価',  ur:'فعال تشخیص' },
  'نقاط التحسين المفتوحة':  { en:'Open AFIs',        fr:'AFIs ouvertes',   es:'AFIs abiertas',  it:'AFIs aperte',     pt:'AFIs abertas',   de:'Offene AFIs',     ru:'Открытые AFIs',   ko:'열린 AFIs',        zh:'开放AFIs',        ja:'オープンAFI',     ur:'کھلے AFIs' },
  'صحة الإدارة':             { en:'Dept Health',      fr:'Santé dépt.',     es:'Salud depto.',   it:'Salute reparto',  pt:'Saúde depto.',   de:'Abt. Gesundheit', ru:'Здоровье отдела', ko:'부서 상태',        zh:'部门健康',        ja:'部署状態',        ur:'محکمہ صحت' },
  'معدل الإنجاز':            { en:'Completion Rate',  fr:'Taux de réalisation',es:'Tasa de finalización',it:'Tasso di completamento',pt:'Taxa de conclusão',de:'Abschlussrate',  ru:'Процент выполнения',ko:'완료율',          zh:'完成率',          ja:'完了率',          ur:'تکمیل شرح' },
  'نقاط الأداء':             { en:'Performance Score',fr:'Score de performance',es:'Puntuación de rendimiento',it:'Punteggio di performance',pt:'Pontuação de desempenho',de:'Leistungspunkte',ru:'Очки производительности',ko:'성과 점수',        zh:'绩效分数',        ja:'パフォーマンスポイント',ur:'کارکردگی نقاط' },
  'إجمالي المهام':           { en:'Total Tasks',      fr:'Total des tâches',es:'Total de tareas', it:'Totale attività', pt:'Total de tarefas',de:'Aufgaben gesamt', ru:'Всего задач',      ko:'총 작업',          zh:'总任务',          ja:'総タスク',        ur:'کل کام' },
  'AFIs متأخرة' :            { en:'Overdue AFIs',     fr:'AFIs en retard',  es:'AFIs atrasadas', it:'AFIs in ritardo', pt:'AFIs atrasadas', de:'Überfällige AFIs',ru:'Просроченные AFIs',ko:'기한초과 AFIs',   zh:'逾期AFIs',        ja:'期限超過AFI',     ur:'تاخیری AFIs' },
  /* ── Section titles ───────────────────────────────────── */
  'التنبيهات الحرجة':        { en:'Critical Alerts',  fr:'Alertes critiques',es:'Alertas críticas',it:'Avvisi critici', pt:'Alertas críticos',de:'Kritische Warnungen',ru:'Критические оповещения',ko:'위험 경보',      zh:'严重警报',        ja:'重大アラート',    ur:'اہم اطلاعات' },
  'AFIs المفتوحة':           { en:'Open AFIs',        fr:'AFIs ouvertes',   es:'AFIs abiertas',  it:'AFIs aperte',     pt:'AFIs abertas',   de:'Offene AFIs',     ru:'Открытые AFIs',   ko:'열린 AFIs',        zh:'开放AFIs',        ja:'オープンAFI',     ur:'کھلے AFIs' },
  'مؤشرات تحت الهدف':       { en:'KPIs Below Target',fr:'KPIs sous objectif',es:'KPIs bajo objetivo',it:'KPI sotto obiettivo',pt:'KPIs abaixo da meta',de:'KPIs unter Ziel',ru:'КПЭ ниже цели',  ko:'목표 미달 KPIs',   zh:'低于目标KPIs',    ja:'目標未達KPI',     ur:'ہدف سے کم KPIs' },
  'آخر الإنجازات':          { en:'Recent Completions',fr:'Dernières réalisations',es:'Últimos logros',it:'Ultimi risultati',pt:'Últimas realizações',de:'Letzte Abschlüsse',ru:'Последние достижения',ko:'최근 완료',       zh:'最近完成',        ja:'最近の完了',      ur:'حالیہ کامیابیاں' },
  'آخر المهام':              { en:'Recent Tasks',     fr:'Tâches récentes', es:'Tareas recientes',it:'Attività recenti',pt:'Tarefas recentes',de:'Letzte Aufgaben', ru:'Последние задачи', ko:'최근 작업',       zh:'最近任务',        ja:'最近のタスク',    ur:'حالیہ کام' },
  'مؤشرات الأداء':          { en:'Performance KPIs', fr:'KPIs de performance',es:'KPIs de rendimiento',it:'KPI di performance',pt:'KPIs de desempenho',de:'Leistungs-KPIs',ru:'КПЭ производительности',ko:'성과 KPIs',       zh:'绩效KPIs',        ja:'パフォーマンスKPI',ur:'کارکردگی KPIs' },
  'إدارة المهام':            { en:'Task Management',  fr:'Gestion des tâches',es:'Gestión de tareas',it:'Gestione attività',pt:'Gestão de tarefas',de:'Aufgabenverwaltung',ru:'Управление задачами',ko:'작업 관리',        zh:'任务管理',        ja:'タスク管理',      ur:'کاموں کا انتظام' },
  /* ── Buttons ──────────────────────────────────────────── */
  'عرض الكل':               { en:'View All',         fr:'Voir tout',       es:'Ver todo',        it:'Vedi tutto',      pt:'Ver tudo',        de:'Alle anzeigen',   ru:'Показать все',    ko:'모두 보기',        zh:'查看全部',        ja:'全て表示',        ur:'سب دیکھیں' },
  '+ مهمة جديدة':           { en:'+ New Task',       fr:'+ Nouvelle tâche',es:'+ Nueva tarea',   it:'+ Nuovo compito', pt:'+ Nova tarefa',   de:'+ Neue Aufgabe',  ru:'+ Новая задача',  ko:'+ 새 작업',        zh:'+ 新任务',        ja:'+ 新タスク',      ur:'+ نیا کام' },
  '+ تقييم جديد':           { en:'+ New Assessment', fr:'+ Nouvelle évaluation',es:'+ Nueva evaluación',it:'+ Nuova valutazione',pt:'+ Nova avaliação',de:'+ Neue Bewertung',ru:'+ Новая оценка',  ko:'+ 새 평가',        zh:'+ 新评估',        ja:'+ 新評価',        ur:'+ نئی تشخیص' },
  '+ AFI جديد':             { en:'+ New AFI',        fr:'+ Nouvel AFI',    es:'+ Nuevo AFI',     it:'+ Nuovo AFI',     pt:'+ Novo AFI',      de:'+ Neues AFI',     ru:'+ Новый AFI',     ko:'+ 새 AFI',         zh:'+ 新AFI',         ja:'+ 新AFI',         ur:'+ نیا AFI' },
  '+ تنبيه جديد':           { en:'+ New Alert',      fr:'+ Nouvelle alerte',es:'+ Nueva alerta', it:'+ Nuovo avviso',  pt:'+ Novo alerta',   de:'+ Neue Warnung',  ru:'+ Новое оповещение',ko:'+ 새 경보',       zh:'+ 新警报',        ja:'+ 新アラート',    ur:'+ نئی اطلاع' },
  '+ KPI جديد':             { en:'+ New KPI',        fr:'+ Nouveau KPI',   es:'+ Nuevo KPI',     it:'+ Nuovo KPI',     pt:'+ Novo KPI',      de:'+ Neues KPI',     ru:'+ Новый КПЭ',     ko:'+ 새 KPI',         zh:'+ 新KPI',         ja:'+ 新KPI',         ur:'+ نیا KPI' },
  '+ إضافة موظف':           { en:'+ Add Employee',   fr:'+ Ajouter employé',es:'+ Agregar empleado',it:'+ Aggiungi dipendente',pt:'+ Adicionar funcionário',de:'+ Mitarbeiter hinzufügen',ru:'+ Добавить сотрудника',ko:'+ 직원 추가',      zh:'+ 添加员工',      ja:'+ 従業員追加',    ur:'+ ملازم شامل کریں' },
  '+ إنشاء أول مستخدم':    { en:'+ Create First User',fr:'+ Créer premier utilisateur',es:'+ Crear primer usuario',it:'+ Crea primo utente',pt:'+ Criar primeiro utilizador',de:'+ Ersten Benutzer erstellen',ru:'+ Создать первого пользователя',ko:'+ 첫 사용자 생성',zh:'+ 创建第一个用户',ja:'+ 最初のユーザー作成',ur:'+ پہلا صارف بنائیں' },
  'تعديل':                  { en:'Edit',             fr:'Modifier',        es:'Editar',          it:'Modifica',        pt:'Editar',          de:'Bearbeiten',      ru:'Редактировать',   ko:'편집',             zh:'编辑',            ja:'編集',            ur:'ترمیم' },
  'حفظ':                    { en:'Save',             fr:'Enregistrer',     es:'Guardar',         it:'Salva',           pt:'Salvar',          de:'Speichern',       ru:'Сохранить',       ko:'저장',             zh:'保存',            ja:'保存',            ur:'محفوظ کریں' },
  'إلغاء':                  { en:'Cancel',           fr:'Annuler',         es:'Cancelar',        it:'Annulla',         pt:'Cancelar',        de:'Abbrechen',       ru:'Отмена',          ko:'취소',             zh:'取消',            ja:'キャンセル',      ur:'منسوخ کریں' },
  'إغلاق':                  { en:'Close',            fr:'Fermer',          es:'Cerrar',          it:'Chiudi',          pt:'Fechar',          de:'Schließen',       ru:'Закрыть',         ko:'닫기',             zh:'关闭',            ja:'閉じる',          ur:'بند کریں' },
  'تفاصيل':                 { en:'Details',          fr:'Détails',         es:'Detalles',        it:'Dettagli',        pt:'Detalhes',        de:'Details',         ru:'Детали',          ko:'세부사항',         zh:'详情',            ja:'詳細',            ur:'تفصیل' },
  'تحديث':                  { en:'Update',           fr:'Mettre à jour',   es:'Actualizar',      it:'Aggiorna',        pt:'Atualizar',       de:'Aktualisieren',   ru:'Обновить',        ko:'업데이트',         zh:'更新',            ja:'更新',            ur:'اپ ڈیٹ کریں' },
  'تأكيد':                  { en:'Confirm',          fr:'Confirmer',       es:'Confirmar',       it:'Conferma',        pt:'Confirmar',       de:'Bestätigen',      ru:'Подтвердить',     ko:'확인',             zh:'确认',            ja:'確認',            ur:'تصدیق کریں' },
  'اعتماد':                 { en:'Approve',          fr:'Approuver',       es:'Aprobar',         it:'Approva',         pt:'Aprovar',         de:'Genehmigen',      ru:'Одобрить',        ko:'승인',             zh:'批准',            ja:'承認',            ur:'منظور' },
  'رفض':                    { en:'Reject',           fr:'Rejeter',         es:'Rechazar',        it:'Rifiuta',         pt:'Rejeitar',        de:'Ablehnen',        ru:'Отклонить',       ko:'거부',             zh:'拒绝',            ja:'却下',            ur:'مسترد' },
  'إعادة':                  { en:'Return',           fr:'Retourner',       es:'Devolver',        it:'Restituisci',     pt:'Devolver',        de:'Zurücksenden',    ru:'Вернуть',         ko:'반환',             zh:'退回',            ja:'返却',            ur:'واپس کریں' },
  'إضافة':                  { en:'Add',              fr:'Ajouter',         es:'Agregar',         it:'Aggiungi',        pt:'Adicionar',       de:'Hinzufügen',      ru:'Добавить',        ko:'추가',             zh:'添加',            ja:'追加',            ur:'شامل کریں' },
  'نسخ':                    { en:'Copy',             fr:'Copier',          es:'Copiar',          it:'Copia',           pt:'Copiar',          de:'Kopieren',        ru:'Копировать',      ko:'복사',             zh:'复制',            ja:'コピー',          ur:'نقل کریں' },
  'طباعة':                  { en:'Print',            fr:'Imprimer',        es:'Imprimir',        it:'Stampa',          pt:'Imprimir',        de:'Drucken',         ru:'Печать',          ko:'인쇄',             zh:'打印',            ja:'印刷',            ur:'پرنٹ' },
  'حذف':                    { en:'Delete',           fr:'Supprimer',       es:'Eliminar',        it:'Elimina',         pt:'Excluir',         de:'Löschen',         ru:'Удалить',         ko:'삭제',             zh:'删除',            ja:'削除',            ur:'حذف' },
  'إرسال':                  { en:'Send',             fr:'Envoyer',         es:'Enviar',          it:'Invia',           pt:'Enviar',          de:'Senden',          ru:'Отправить',       ko:'보내기',           zh:'发送',            ja:'送信',            ur:'بھیجیں' },
  'خروج':                   { en:'Sign Out',         fr:'Déconnexion',     es:'Salir',           it:'Esci',            pt:'Sair',            de:'Abmelden',        ru:'Выйти',           ko:'로그아웃',         zh:'退出',            ja:'ログアウト',      ur:'باہر' },
  '🚪 خروج':                { en:'🚪 Sign Out',     fr:'🚪 Déconnexion',  es:'🚪 Salir',       it:'🚪 Esci',         pt:'🚪 Sair',         de:'🚪 Abmelden',     ru:'🚪 Выйти',        ko:'🚪 로그아웃',      zh:'🚪 退出',         ja:'🚪 ログアウト',   ur:'🚪 باہر' },
  '← العودة للبورتال':      { en:'← Back to Portal',fr:'← Retour au portail',es:'← Volver al portal',it:'← Torna al portale',pt:'← Voltar ao portal',de:'← Zurück zum Portal',ru:'← Назад к порталу',ko:'← 포털로 돌아가기',zh:'← 返回门户',      ja:'← ポータルに戻る',ur:'← پورٹل پر واپس' },
  /* ── Empty states ─────────────────────────────────────── */
  'لا تنبيهات':             { en:'No alerts',        fr:'Pas d\'alertes',   es:'Sin alertas',    it:'Nessun avviso',   pt:'Sem alertas',     de:'Keine Warnungen', ru:'Нет оповещений',  ko:'경보 없음',        zh:'无警报',          ja:'アラートなし',    ur:'کوئی اطلاع نہیں' },
  'لا مهام':                { en:'No tasks',         fr:'Pas de tâches',   es:'Sin tareas',      it:'Nessun compito',  pt:'Sem tarefas',     de:'Keine Aufgaben',  ru:'Нет задач',       ko:'작업 없음',        zh:'无任务',          ja:'タスクなし',      ur:'کوئی کام نہیں' },
  'لا مهام نشطة':           { en:'No active tasks',  fr:'Pas de tâches actives',es:'Sin tareas activas',it:'Nessuna attività attiva',pt:'Sem tarefas ativas',de:'Keine aktiven Aufgaben',ru:'Нет активных задач',ko:'활성 작업 없음',  zh:'无活跃任务',      ja:'アクティブタスクなし',ur:'کوئی فعال کام نہیں' },
  'لا AFIs':                { en:'No AFIs',          fr:'Pas d\'AFIs',      es:'Sin AFIs',        it:'Nessun AFI',      pt:'Sem AFIs',        de:'Keine AFIs',      ru:'Нет AFIs',        ko:'AFI 없음',         zh:'无AFIs',          ja:'AFIなし',         ur:'کوئی AFI نہیں' },
  'لا AFIs مفتوحة':        { en:'No open AFIs',     fr:'Pas d\'AFIs ouvertes',es:'Sin AFIs abiertas',it:'Nessun AFI aperto',pt:'Sem AFIs abertas',de:'Keine offenen AFIs',ru:'Нет открытых AFIs',ko:'열린 AFI 없음',   zh:'无开放AFIs',      ja:'オープンAFIなし', ur:'کوئی کھلا AFI نہیں' },
  'لا تقييمات':             { en:'No assessments',   fr:'Pas d\'évaluations',es:'Sin evaluaciones',it:'Nessuna valutazione',pt:'Sem avaliações', de:'Keine Bewertungen',ru:'Нет оценок',       ko:'평가 없음',        zh:'无评估',          ja:'評価なし',        ur:'کوئی تشخیص نہیں' },
  'لا مؤشرات':              { en:'No KPIs',          fr:'Pas de KPIs',     es:'Sin KPIs',        it:'Nessun KPI',      pt:'Sem KPIs',        de:'Keine KPIs',      ru:'Нет КПЭ',         ko:'KPI 없음',         zh:'无KPIs',          ja:'KPIなし',         ur:'کوئی KPI نہیں' },
  'لا أعضاء':               { en:'No members',       fr:'Pas de membres',  es:'Sin miembros',    it:'Nessun membro',   pt:'Sem membros',     de:'Keine Mitglieder',ru:'Нет участников',  ko:'멤버 없음',        zh:'无成员',          ja:'メンバーなし',    ur:'کوئی رکن نہیں' },
  'لا أعضاء في هذه الدائرة':{ en:'No members in this division', fr:'Pas de membres dans cette division',es:'Sin miembros en esta división',it:'Nessun membro in questa divisione',pt:'Sem membros nesta divisão',de:'Keine Mitglieder in dieser Abteilung',ru:'Нет участников в этом подразделении',ko:'이 부서에 멤버 없음',zh:'此部门无成员',ja:'この部署にメンバーなし',ur:'اس ڈویژن میں کوئی رکن نہیں' },
  'لا تذاكر':               { en:'No tickets',       fr:'Pas de tickets',  es:'Sin tickets',     it:'Nessun ticket',   pt:'Sem tickets',     de:'Keine Tickets',   ru:'Нет тикетов',     ko:'티켓 없음',        zh:'无工单',          ja:'チケットなし',    ur:'کوئی ٹکٹ نہیں' },
  'لا بيانات':              { en:'No data',          fr:'Pas de données',  es:'Sin datos',       it:'Nessun dato',     pt:'Sem dados',       de:'Keine Daten',     ru:'Нет данных',      ko:'데이터 없음',      zh:'无数据',          ja:'データなし',      ur:'کوئی ڈیٹا نہیں' },
  'لا إشعارات جديدة':       { en:'No new notifications',fr:'Pas de nouvelles notifications',es:'Sin nuevas notificaciones',it:'Nessuna nuova notifica',pt:'Sem novas notificações',de:'Keine neuen Benachrichtigungen',ru:'Нет новых уведомлений',ko:'새 알림 없음',     zh:'无新通知',        ja:'新しい通知なし',  ur:'کوئی نئی اطلاع نہیں' },
  'لا اجتماعات مسجّلة':    { en:'No meetings recorded',fr:'Pas de réunions enregistrées',es:'Sin reuniones registradas',it:'Nessuna riunione registrata',pt:'Sem reuniões registradas',de:'Keine Meetings aufgezeichnet',ru:'Нет записанных встреч',ko:'기록된 회의 없음',zh:'无会议记录',      ja:'会議記録なし',    ur:'کوئی میٹنگ ریکارڈ نہیں' },
  'لا تصعيدات معلقة':       { en:'No pending escalations',fr:'Pas d\'escalades en attente',es:'Sin escaladas pendientes',it:'Nessuna escalation in attesa',pt:'Sem escaladas pendentes',de:'Keine ausstehenden Eskalationen',ru:'Нет ожидающих эскалаций',ko:'보류 중인 에스컬레이션 없음',zh:'无待处理升级',   ja:'エスカレーションなし',ur:'کوئی معلق اضافہ نہیں' },
  'لا موظفين بعد في هذه الدائرة':{ en:'No employees in this division yet', fr:'Pas encore d\'employés dans cette division',es:'Aún no hay empleados en esta división',it:'Ancora nessun dipendente in questa divisione',pt:'Ainda sem funcionários nesta divisão',de:'Noch keine Mitarbeiter in dieser Abteilung',ru:'Пока нет сотрудников в этом подразделении',ko:'이 부서에 아직 직원 없음',zh:'该部门还没有员工',ja:'この部署にまだ従業員なし',ur:'اس ڈویژن میں ابھی کوئی ملازم نہیں' },
  /* ── Form labels ──────────────────────────────────────── */
  'الاسم الكامل':           { en:'Full Name',        fr:'Nom complet',     es:'Nombre completo', it:'Nome completo',   pt:'Nome completo',   de:'Vollständiger Name',ru:'Полное имя',       ko:'전체 이름',        zh:'全名',            ja:'フルネーム',      ur:'پورا نام' },
  'المسمى الوظيفي':         { en:'Job Title',        fr:'Intitulé du poste',es:'Cargo',          it:'Titolo professionale',pt:'Cargo',          de:'Berufsbezeichnung',ru:'Должность',        ko:'직책',             zh:'职位',            ja:'役職',            ur:'عہدہ' },
  'الرقم الوظيفي':          { en:'Employee ID',      fr:'ID employé',      es:'ID empleado',     it:'ID dipendente',   pt:'ID funcionário',  de:'Mitarbeiter-ID',  ru:'ID сотрудника',   ko:'직원 ID',          zh:'员工ID',          ja:'社員ID',          ur:'ملازم ID' },
  'اسم المستخدم':           { en:'Username',         fr:'Nom d\'utilisateur',es:'Nombre de usuario',it:'Nome utente',   pt:'Nome de utilizador',de:'Benutzername',    ru:'Имя пользователя',ko:'사용자명',         zh:'用户名',          ja:'ユーザー名',      ur:'صارف نام' },
  'كلمة المرور':            { en:'Password',         fr:'Mot de passe',    es:'Contraseña',      it:'Password',        pt:'Senha',           de:'Passwort',        ru:'Пароль',          ko:'비밀번호',         zh:'密码',            ja:'パスワード',      ur:'پاس ورڈ' },
  'كلمة المرور المؤقتة':    { en:'Temporary Password',fr:'Mot de passe temporaire',es:'Contraseña temporal',it:'Password temporanea',pt:'Senha temporária',de:'Temporäres Passwort',ru:'Временный пароль',ko:'임시 비밀번호',    zh:'临时密码',        ja:'仮パスワード',    ur:'عارضی پاس ورڈ' },
  'كلمة المرور الجديدة':    { en:'New Password',     fr:'Nouveau mot de passe',es:'Nueva contraseña',it:'Nuova password',  pt:'Nova senha',      de:'Neues Passwort',  ru:'Новый пароль',    ko:'새 비밀번호',      zh:'新密码',          ja:'新しいパスワード',ur:'نیا پاس ورڈ' },
  'تغيير كلمة المرور':      { en:'Change Password',  fr:'Changer le mot de passe',es:'Cambiar contraseña',it:'Cambia password', pt:'Alterar senha',   de:'Passwort ändern', ru:'Изменить пароль', ko:'비밀번호 변경',    zh:'修改密码',        ja:'パスワード変更',  ur:'پاس ورڈ تبدیل' },
  'الأولوية':               { en:'Priority',         fr:'Priorité',        es:'Prioridad',       it:'Priorità',        pt:'Prioridade',      de:'Priorität',       ru:'Приоритет',       ko:'우선순위',         zh:'优先级',          ja:'優先度',          ur:'ترجیح' },
  'الحالة':                 { en:'Status',           fr:'Statut',          es:'Estado',          it:'Stato',           pt:'Status',          de:'Status',          ru:'Статус',          ko:'상태',             zh:'状态',            ja:'ステータス',      ur:'حیثیت' },
  'الاستحقاق':              { en:'Due Date',         fr:'Échéance',        es:'Fecha límite',    it:'Scadenza',        pt:'Prazo',           de:'Fälligkeitsdatum',ru:'Срок',            ko:'마감일',           zh:'截止日期',        ja:'期限',            ur:'آخری تاریخ' },
  'الوصف':                  { en:'Description',      fr:'Description',     es:'Descripción',     it:'Descrizione',     pt:'Descrição',       de:'Beschreibung',    ru:'Описание',        ko:'설명',             zh:'描述',            ja:'説明',            ur:'تفصیل' },
  'العنوان':                { en:'Title',            fr:'Titre',           es:'Título',          it:'Titolo',          pt:'Título',          de:'Titel',           ru:'Заголовок',       ko:'제목',             zh:'标题',            ja:'タイトル',        ur:'عنوان' },
  'الاسم':                  { en:'Name',             fr:'Nom',             es:'Nombre',          it:'Nome',            pt:'Nome',            de:'Name',            ru:'Имя',             ko:'이름',             zh:'姓名',            ja:'名前',            ur:'نام' },
  'الدور':                  { en:'Role',             fr:'Rôle',            es:'Rol',             it:'Ruolo',           pt:'Função',          de:'Rolle',           ru:'Роль',            ko:'역할',             zh:'角色',            ja:'役割',            ur:'کردار' },
  'الدائرة':                { en:'Division',         fr:'Division',        es:'División',        it:'Divisione',       pt:'Divisão',         de:'Abteilung',       ru:'Подразделение',   ko:'부서',             zh:'部门',            ja:'部署',            ur:'ڈویژن' },
  'المدير':                 { en:'Manager',          fr:'Responsable',     es:'Gerente',         it:'Responsabile',    pt:'Gerente',         de:'Manager',         ru:'Менеджер',        ko:'관리자',           zh:'经理',            ja:'マネージャー',    ur:'مینیجر' },
  'ملاحظة':                 { en:'Note',             fr:'Note',            es:'Nota',            it:'Nota',            pt:'Nota',            de:'Hinweis',         ru:'Примечание',      ko:'메모',             zh:'备注',            ja:'メモ',            ur:'نوٹ' },
  'التعليق':                { en:'Comment',          fr:'Commentaire',     es:'Comentario',      it:'Commento',        pt:'Comentário',      de:'Kommentar',       ru:'Комментарий',     ko:'댓글',             zh:'评论',            ja:'コメント',        ur:'تبصرہ' },
  'الإجمالي':               { en:'Total',            fr:'Total',           es:'Total',           it:'Totale',          pt:'Total',           de:'Gesamt',          ru:'Всего',           ko:'합계',             zh:'总计',            ja:'合計',            ur:'کل' },
  'الهدف':                  { en:'Target',           fr:'Objectif',        es:'Objetivo',        it:'Obiettivo',       pt:'Meta',            de:'Ziel',            ru:'Цель',            ko:'목표',             zh:'目标',            ja:'目標',            ur:'ہدف' },
  'الفعلي':                 { en:'Actual',           fr:'Réel',            es:'Real',            it:'Reale',           pt:'Real',            de:'Tatsächlich',     ru:'Фактический',     ko:'실제',             zh:'实际',            ja:'実績',            ur:'حقیقی' },
  'النتيجة':                { en:'Score',            fr:'Score',           es:'Puntuación',      it:'Punteggio',       pt:'Pontuação',       de:'Punktzahl',       ru:'Оценка',          ko:'점수',             zh:'分数',            ja:'スコア',          ur:'نتیجہ' },
  'التاريخ':                { en:'Date',             fr:'Date',            es:'Fecha',           it:'Data',            pt:'Data',            de:'Datum',           ru:'Дата',            ko:'날짜',             zh:'日期',            ja:'日付',            ur:'تاریخ' },
  'الإجراء':                { en:'Action',           fr:'Action',          es:'Acción',          it:'Azione',          pt:'Ação',            de:'Aktion',          ru:'Действие',        ko:'작업',             zh:'操作',            ja:'アクション',      ur:'اقدام' },
  'المالك':                 { en:'Owner',            fr:'Propriétaire',    es:'Propietario',     it:'Proprietario',    pt:'Proprietário',    de:'Eigentümer',      ru:'Владелец',        ko:'담당자',           zh:'负责人',          ja:'オーナー',        ur:'مالک' },
  'المصدر':                 { en:'Source',           fr:'Source',          es:'Fuente',          it:'Fonte',           pt:'Fonte',           de:'Quelle',          ru:'Источник',        ko:'출처',             zh:'来源',            ja:'ソース',          ur:'ماخذ' },
  /* ── Table headers ────────────────────────────────────── */
  'الرقم':                  { en:'#',                fr:'N°',              es:'N°',              it:'N°',              pt:'N°',              de:'Nr.',             ru:'№',               ko:'번호',             zh:'编号',            ja:'番号',            ur:'نمبر' },
  'الإجراءات':              { en:'Actions',          fr:'Actions',         es:'Acciones',        it:'Azioni',          pt:'Ações',           de:'Aktionen',        ru:'Действия',        ko:'작업',             zh:'操作',            ja:'アクション',      ur:'اقدامات' },
  'المكلّف':                { en:'Assigned To',      fr:'Assigné à',       es:'Asignado a',      it:'Assegnato a',     pt:'Atribuído a',     de:'Zugewiesen an',   ru:'Назначено',       ko:'담당자',           zh:'指派给',          ja:'担当者',          ur:'تفویض' },
  /* ── Toast messages ───────────────────────────────────── */
  'تم الحفظ ✓':            { en:'Saved ✓',          fr:'Enregistré ✓',    es:'Guardado ✓',      it:'Salvato ✓',       pt:'Salvo ✓',         de:'Gespeichert ✓',   ru:'Сохранено ✓',     ko:'저장됨 ✓',         zh:'已保存 ✓',        ja:'保存済み ✓',      ur:'محفوظ ✓' },
  'تم التحديث ✓':          { en:'Updated ✓',        fr:'Mis à jour ✓',    es:'Actualizado ✓',   it:'Aggiornato ✓',    pt:'Atualizado ✓',    de:'Aktualisiert ✓',  ru:'Обновлено ✓',     ko:'업데이트됨 ✓',     zh:'已更新 ✓',        ja:'更新済み ✓',      ur:'اپ ڈیٹ ✓' },
  'تم الإرسال ✓':          { en:'Sent ✓',           fr:'Envoyé ✓',        es:'Enviado ✓',       it:'Inviato ✓',       pt:'Enviado ✓',       de:'Gesendet ✓',      ru:'Отправлено ✓',    ko:'전송됨 ✓',         zh:'已发送 ✓',        ja:'送信済み ✓',      ur:'بھیجا گیا ✓' },
  'تم الاعتماد ✓':         { en:'Approved ✓',       fr:'Approuvé ✓',      es:'Aprobado ✓',      it:'Approvato ✓',     pt:'Aprovado ✓',      de:'Genehmigt ✓',     ru:'Одобрено ✓',      ko:'승인됨 ✓',         zh:'已批准 ✓',        ja:'承認済み ✓',      ur:'منظور ✓' },
  'تم الحذف':              { en:'Deleted',          fr:'Supprimé',        es:'Eliminado',       it:'Eliminato',       pt:'Excluído',        de:'Gelöscht',        ru:'Удалено',         ko:'삭제됨',           zh:'已删除',          ja:'削除済み',        ur:'حذف ہوا' },
  'جارٍ التحميل...':       { en:'Loading...',       fr:'Chargement...',   es:'Cargando...',     it:'Caricamento...',  pt:'Carregando...',   de:'Laden...',        ru:'Загрузка...',     ko:'로딩 중...',       zh:'加载中...',       ja:'読み込み中...',   ur:'لوڈ ہو رہا ہے...' },
  'قيد البناء':            { en:'Coming soon',      fr:'En construction', es:'En construcción', it:'In costruzione',  pt:'Em construção',   de:'In Entwicklung',  ru:'В разработке',    ko:'준비 중',          zh:'建设中',          ja:'準備中',          ur:'تعمیر جاری' },
  /* ── Daily update ─────────────────────────────────────── */
  'ماذا أنجزت اليوم؟':     { en:'What did you accomplish today?',fr:'Qu\'avez-vous accompli aujourd\'hui?',es:'¿Qué lograste hoy?',it:'Cosa hai realizzato oggi?',pt:'O que você realizou hoje?',de:'Was haben Sie heute erreicht?',ru:'Что вы сегодня сделали?',ko:'오늘 무엇을 이루었나요?',zh:'今天完成了什么？',ja:'今日は何を達成しましたか？',ur:'آج کیا حاصل کیا؟' },
  'هل هناك عوائق أو تأخير؟':{ en:'Any blockers or delays?',fr:'Des obstacles ou retards?',es:'¿Algún bloqueo o retraso?',it:'Ci sono blocchi o ritardi?',pt:'Algum bloqueio ou atraso?',de:'Gibt es Hindernisse?',ru:'Есть ли препятствия?',ko:'장애물이나 지연이 있나요?',zh:'有障碍或延误吗？',ja:'ブロッカーや遅延は？',ur:'کوئی رکاوٹ؟' },
  'أولويات الغد':           { en:"Tomorrow's Priorities",fr:'Priorités de demain',es:'Prioridades de mañana',it:'Priorità di domani',pt:'Prioridades de amanhã',de:'Morgige Prioritäten',ru:'Приоритеты на завтра',ko:'내일 우선순위',zh:'明天的优先事项',ja:'明日の優先事項',ur:'کل کی ترجیحات' },
  'تقييمك لإنتاجية يومك':  { en:'Rate your daily productivity',fr:'Évaluez votre productivité',es:'Califica tu productividad',it:'Valuta la tua produttività',pt:'Avalie sua produtividade',de:'Bewerten Sie Ihre Produktivität',ru:'Оцените вашу продуктивность',ko:'오늘의 생산성 평가',zh:'评估您的生产力',ja:'生産性を評価',ur:'پیداواری صلاحیت کا جائزہ' },
  'حفظ التحديث':           { en:'Save Update',      fr:'Enregistrer la mise à jour',es:'Guardar actualización',it:'Salva aggiornamento',pt:'Salvar atualização',de:'Update speichern',ru:'Сохранить обновление',ko:'업데이트 저장',zh:'保存更新',ja:'更新を保存',ur:'اپ ڈیٹ محفوظ' },
  /* ── Admin ────────────────────────────────────────────── */
  'إدارة المستخدمين':       { en:'User Management',  fr:'Gestion utilisateurs',es:'Gestión de usuarios',it:'Gestione utenti',pt:'Gestão de utilizadores',de:'Benutzerverwaltung',ru:'Управление пользователями',ko:'사용자 관리',zh:'用户管理',ja:'ユーザー管理',ur:'صارف انتظام' },
  'إنشاء مستخدم':           { en:'Create User',      fr:'Créer utilisateur',es:'Crear usuario',  it:'Crea utente',     pt:'Criar utilizador',de:'Benutzer erstellen',ru:'Создать пользователя',ko:'사용자 생성',zh:'创建用户',ja:'ユーザー作成',ur:'صارف بنائیں' },
  'الدوائر':                { en:'Divisions',        fr:'Divisions',       es:'Divisiones',      it:'Divisioni',       pt:'Divisões',        de:'Abteilungen',     ru:'Подразделения',   ko:'부서',             zh:'部门',            ja:'部署',            ur:'ڈویژن' },
  'صحة النظام':             { en:'System Health',    fr:'Santé système',   es:'Salud del sistema',it:'Salute sistema',  pt:'Saúde do sistema',de:'Systemgesundheit',ru:'Здоровье системы',ko:'시스템 상태',       zh:'系统健康',        ja:'システム状態',    ur:'نظام صحت' },
  'الإعدادات':              { en:'Settings',         fr:'Paramètres',      es:'Configuración',   it:'Impostazioni',    pt:'Configurações',   de:'Einstellungen',   ru:'Настройки',       ko:'설정',             zh:'设置',            ja:'設定',            ur:'ترتیبات' },
  'نشط':                    { en:'Active',           fr:'Actif',           es:'Activo',          it:'Attivo',          pt:'Ativo',           de:'Aktiv',           ru:'Активный',        ko:'활성',             zh:'活跃',            ja:'アクティブ',      ur:'فعال' },
  'معطّل':                  { en:'Disabled',         fr:'Désactivé',       es:'Desactivado',     it:'Disabilitato',    pt:'Desativado',      de:'Deaktiviert',     ru:'Отключен',        ko:'비활성',           zh:'禁用',            ja:'無効',            ur:'غیر فعال' },
  'تعطيل':                  { en:'Disable',          fr:'Désactiver',      es:'Deshabilitar',    it:'Disabilita',      pt:'Desativar',       de:'Deaktivieren',    ru:'Отключить',       ko:'비활성화',         zh:'禁用',            ja:'無効化',          ur:'غیر فعال کریں' },
  'تفعيل':                  { en:'Enable',           fr:'Activer',         es:'Habilitar',       it:'Abilita',         pt:'Ativar',          de:'Aktivieren',      ru:'Включить',        ko:'활성화',           zh:'启用',            ja:'有効化',          ur:'فعال کریں' },
  'مدراء':                  { en:'Managers',         fr:'Responsables',    es:'Gerentes',        it:'Responsabili',    pt:'Gerentes',        de:'Manager',         ru:'Менеджеры',       ko:'관리자',           zh:'经理',            ja:'マネージャー',    ur:'مینیجرز' },
  'موظفون':                 { en:'Employees',        fr:'Employés',        es:'Empleados',       it:'Dipendenti',      pt:'Funcionários',    de:'Mitarbeiter',     ru:'Сотрудники',      ko:'직원',             zh:'员工',            ja:'従業員',          ur:'ملازمین' },
  'نشطون':                  { en:'Active',           fr:'Actifs',          es:'Activos',         it:'Attivi',          pt:'Ativos',          de:'Aktiv',           ru:'Активные',        ko:'활성',             zh:'活跃',            ja:'アクティブ',      ur:'فعال' },
  /* ── Director / War room ──────────────────────────────── */
  'غرفة العمليات التنفيذية':{ en:'Executive Operations Room',fr:'Salle de commandement exécutif',es:'Sala de mando ejecutivo',it:'Sala operativa esecutiva',pt:'Sala de controle executivo',de:'Exekutiver Einsatzraum',ru:'Исполнительный оперативный центр',ko:'경영 작전실',zh:'高管作战室',ja:'経営作戦室',ur:'ایگزیکٹو آپریشن روم' },
  'صندوق التصعيد التنفيذي': { en:'Executive Escalation Inbox',fr:'Boîte d\'escalade exécutive',es:'Bandeja de escalada ejecutiva',it:'Casella di escalation esecutiva',pt:'Caixa de escalada executiva',de:'Executive-Eskalationseingang',ru:'Входящие эскалации',ko:'에스컬레이션 받은편지함',zh:'升级收件箱',ja:'エスカレーションボックス',ur:'ایسکلیشن باکس' },
  'تصعيدات تنتظر قرارك':   { en:'Escalations Awaiting Decision',fr:'Escalades en attente de décision',es:'Escaladas esperando decisión',it:'Escalation in attesa di decisione',pt:'Escaladas aguardando decisão',de:'Eskalationen warten auf Entscheidung',ru:'Эскалации ожидают решения',ko:'결정 대기 에스컬레이션',zh:'等待决策的升级',ja:'決定待ちエスカレーション',ur:'فیصلے کا انتظار' },
  'الملخص التنفيذي':        { en:'Executive Brief',  fr:'Résumé exécutif', es:'Resumen ejecutivo',it:'Sommario esecutivo',pt:'Resumo executivo',de:'Zusammenfassung',  ru:'Сводка для руководства',ko:'경영 브리핑',zh:'执行摘要',ja:'エグゼクティブブリーフ',ur:'ایگزیکٹو خلاصہ' },
  'آخر اجتماعات OE':       { en:'Latest OE Meetings',fr:'Dernières réunions OE',es:'Últimas reuniones OE',it:'Ultime riunioni OE',pt:'Últimas reuniões OE',de:'Letzte OE-Meetings',ru:'Последние встречи OE',ko:'최근 OE 회의',zh:'最近OE会议',ja:'最新OE会議',ur:'حالیہ OE میٹنگز' },
  'أداء الربع الحالي':      { en:'Current Quarter Performance',fr:'Performance du trimestre actuel',es:'Rendimiento del trimestre actual',it:'Prestazioni del trimestre attuale',pt:'Desempenho do trimestre atual',de:'Leistung des aktuellen Quartals',ru:'Производительность текущего квартала',ko:'현재 분기 성과',zh:'当季绩效',ja:'当期パフォーマンス',ur:'موجودہ سہ ماہی کارکردگی' },
  'مؤشرات تتراجع':          { en:'Declining Indicators',fr:'Indicateurs en baisse',es:'Indicadores en declive',it:'Indicatori in calo',pt:'Indicadores em declínio',de:'Rückläufige Indikatoren',ru:'Снижающиеся показатели',ko:'하락 지표',zh:'下降指标',ja:'低下中の指標',ur:'گھٹتے ہوئے اشارے' },
  /* ── Weekly report ────────────────────────────────────── */
  'التحديث الأسبوعي':       { en:'Weekly Update',    fr:'Mise à jour hebdomadaire',es:'Actualización semanal',it:'Aggiornamento settimanale',pt:'Atualização semanal',de:'Wöchentliches Update',ru:'Еженедельное обновление',ko:'주간 업데이트',zh:'每周更新',ja:'週次更新',ur:'ہفتہ وار اپ ڈیٹ' },
  'الإنجازات هذا الأسبوع':  { en:'This Week\'s Achievements',fr:'Réalisations de cette semaine',es:'Logros de esta semana',it:'Risultati di questa settimana',pt:'Realizações desta semana',de:'Leistungen dieser Woche',ru:'Достижения этой недели',ko:'이번 주 성과',zh:'本周成就',ja:'今週の達成',ur:'اس ہفتے کی کامیابیاں' },
  'التحديات والعوائق':       { en:'Challenges & Blockers',fr:'Défis et obstacles',es:'Desafíos y obstáculos',it:'Sfide e ostacoli',pt:'Desafios e obstáculos',de:'Herausforderungen und Hindernisse',ru:'Вызовы и препятствия',ko:'도전과 장애물',zh:'挑战与障碍',ja:'課題と障壁',ur:'چیلنجز اور رکاوٹیں' },
  'أولويات الأسبوع القادم':  { en:'Next Week\'s Priorities',fr:'Priorités de la semaine prochaine',es:'Prioridades de la próxima semana',it:'Priorità della prossima settimana',pt:'Prioridades da próxima semana',de:'Prioritäten der nächsten Woche',ru:'Приоритеты следующей недели',ko:'다음 주 우선순위',zh:'下周优先事项',ja:'来週の優先事項',ur:'اگلے ہفتے کی ترجیحات' },
  'الدروس المستفادة':        { en:'Lessons Learned',  fr:'Leçons apprises',  es:'Lecciones aprendidas',it:'Lezioni apprese',  pt:'Lições aprendidas',de:'Gelernte Lektionen',ru:'Извлечённые уроки',ko:'교훈',zh:'经验教训',ja:'教訓',ur:'سیکھے گئے سبق' },
  /* ── Review page ──────────────────────────────────────── */
  'مراجعة الإنجازات':       { en:'Review Completions',fr:'Révisions',        es:'Revisiones',      it:'Revisioni',        pt:'Revisões',        de:'Überprüfungen',   ru:'Обзоры',          ko:'완료 검토',        zh:'完成审查',        ja:'完了レビュー',    ur:'تکمیل کا جائزہ' },
  'بانتظار الاعتماد':       { en:'Pending Approval', fr:'En attente d\'approbation',es:'Pendiente de aprobación',it:'In attesa di approvazione',pt:'Aguardando aprovação',de:'Ausstehende Genehmigung',ru:'Ожидает одобрения',ko:'승인 대기',zh:'待批准',ja:'承認待ち',ur:'منظوری کا انتظار' },
  'مُعتمدة':                { en:'Approved',         fr:'Approuvé',         es:'Aprobado',        it:'Approvato',        pt:'Aprovado',        de:'Genehmigt',       ru:'Одобрено',        ko:'승인됨',           zh:'已批准',          ja:'承認済み',        ur:'منظور شدہ' },
  'مُعادة':                 { en:'Returned',         fr:'Retourné',         es:'Devuelto',        it:'Restituito',       pt:'Devolvido',       de:'Zurückgegeben',   ru:'Возвращено',      ko:'반환됨',           zh:'已退回',          ja:'返却済み',        ur:'واپس کردہ' },
  'اعتماد الإنجاز':         { en:'Approve Completion',fr:'Approuver l\'achèvement',es:'Aprobar finalización',it:'Approva completamento',pt:'Aprovar conclusão',de:'Abschluss genehmigen',ru:'Одобрить завершение',ko:'완료 승인',zh:'批准完成',ja:'完了承認',ur:'تکمیل منظور کریں' },
  'إعادة للموظف':           { en:'Return to Employee',fr:'Retourner à l\'employé',es:'Devolver al empleado',it:'Restituire al dipendente',pt:'Devolver ao funcionário',de:'An Mitarbeiter zurückgeben',ru:'Вернуть сотруднику',ko:'직원에게 반환',zh:'退回给员工',ja:'従業員に返却',ur:'ملازم کو واپس کریں' },
  'سبب الإعادة':            { en:'Return Reason',    fr:'Raison du retour', es:'Motivo de devolución',it:'Motivo della restituzione',pt:'Motivo de devolução',de:'Rücksendegrund',   ru:'Причина возврата',ko:'반환 이유',zh:'退回原因',ja:'返却理由',ur:'واپسی کی وجہ' },
  /* ── Task stages ──────────────────────────────────────── */
  'قيد التنفيذ':            { en:'In Progress',      fr:'En cours',         es:'En progreso',     it:'In corso',         pt:'Em progresso',    de:'In Bearbeitung',  ru:'В процессе',      ko:'진행 중',          zh:'进行中',          ja:'進行中',          ur:'جاری' },
  'مفتوحة':                 { en:'Open',             fr:'Ouvert',           es:'Abierto',         it:'Aperto',           pt:'Aberto',          de:'Offen',           ru:'Открыт',          ko:'열림',             zh:'开放',            ja:'オープン',        ur:'کھلا' },
  'معلقة':                  { en:'Pending',          fr:'En attente',       es:'Pendiente',       it:'In attesa',        pt:'Pendente',        de:'Ausstehend',      ru:'Ожидает',         ko:'보류 중',          zh:'待处理',          ja:'保留中',          ur:'زیر التواء' },
  'موقوفة':                 { en:'On Hold',          fr:'En pause',         es:'En espera',       it:'In pausa',         pt:'Em espera',       de:'Pausiert',        ru:'На паузе',        ko:'보류',             zh:'暂停',            ja:'保留',            ur:'رکی ہوئی' },
  'أنجزت':                  { en:'Done',             fr:'Terminé',          es:'Completado',      it:'Completato',       pt:'Concluído',       de:'Erledigt',        ru:'Готово',          ko:'완료',             zh:'完成',            ja:'完了',            ur:'مکمل' },
  'جاري':                   { en:'On-going',         fr:'En cours',         es:'En progreso',     it:'In corso',         pt:'Em andamento',    de:'Laufend',         ru:'Продолжается',    ko:'진행 중',          zh:'进行中',          ja:'進行中',          ur:'جاری' },
  /* ── Employee performance ─────────────────────────────── */
  'أداء ممتاز':             { en:'Excellent performance',fr:'Performance excellente',es:'Rendimiento excelente',it:'Performance eccellente',pt:'Desempenho excelente',de:'Ausgezeichnete Leistung',ru:'Отличная производительность',ko:'우수한 성과',zh:'卓越表现',ja:'優秀な成績',ur:'شاندار کارکردگی' },
  'أداء جيد — استمر في التقدم':{ en:'Good performance — keep going',fr:'Bonne performance — continuez',es:'Buen rendimiento — siga adelante',it:'Buona performance — continua',pt:'Bom desempenho — continue',de:'Gute Leistung — weitermachen',ru:'Хорошая производительность — продолжайте',ko:'좋은 성과 — 계속하세요',zh:'良好表现 — 继续前进',ja:'良い成績 — 続けましょう',ur:'اچھی کارکردگی — جاری رکھیں' },
  /* ── Misc ─────────────────────────────────────────────── */
  'قيد البناء…':            { en:'Coming soon…',     fr:'En construction…', es:'En construcción…',it:'In costruzione…',  pt:'Em construção…',  de:'In Entwicklung…', ru:'В разработке…',   ko:'준비 중…',         zh:'建设中…',         ja:'準備中…',         ur:'تعمیر جاری ہے…' },
  'جميع المهام':            { en:'All Tasks',        fr:'Toutes les tâches',es:'Todas las tareas',it:'Tutte le attività',pt:'Todas as tarefas',de:'Alle Aufgaben',   ru:'Все задачи',      ko:'모든 작업',        zh:'所有任务',        ja:'全タスク',        ur:'تمام کام' },
  'بحث في المهام...':       { en:'Search tasks...', fr:'Rechercher des tâches...',es:'Buscar tareas...',it:'Cerca attività...',pt:'Pesquisar tarefas...',de:'Aufgaben suchen...',ru:'Поиск задач...',ko:'작업 검색...',zh:'搜索任务...',ja:'タスクを検索...',ur:'کام تلاش کریں...' },
  'إرسال الملاحظة':         { en:'Submit Note',      fr:'Soumettre la note', es:'Enviar nota',     it:'Invia nota',       pt:'Enviar nota',      de:'Notiz senden',    ru:'Отправить примечание',ko:'메모 제출',zh:'提交备注',ja:'メモを送信',ur:'نوٹ بھیجیں' },
  'سجل التحديثات':          { en:'Update History',   fr:'Historique des mises à jour',es:'Historial de actualizaciones',it:'Cronologia aggiornamenti',pt:'Histórico de atualizações',de:'Aktualisierungsverlauf',ru:'История обновлений',ko:'업데이트 이력',zh:'更新历史',ja:'更新履歴',ur:'اپ ڈیٹ تاریخ' },
  'ستُسجَّل خارجاً بعد التغيير':{ en:'You will be signed out after the change',fr:'Vous serez déconnecté après le changement',es:'Cerrarás sesión tras el cambio',it:'Sarai disconnesso dopo il cambiamento',pt:'Você será desconectado após a alteração',de:'Sie werden nach der Änderung abgemeldet',ru:'Вы будете выведены из системы',ko:'변경 후 로그아웃됩니다',zh:'更改后将退出登录',ja:'変更後ログアウトされます',ur:'تبدیلی کے بعد لاگ آؤٹ' },

  'المايسترو':               { en:'The Maestro',      fr:'Le Maestro',      es:'El Maestro',      it:'Il Maestro',      pt:'O Maestro',       de:'Der Maestro',     ru:'Маэстро',          ko:'마에스트로',        zh:'大师',            ja:'マエストロ',      ur:'ماسٹرو' },
  'التقييمات':               { en:'Assessments',      fr:'Évaluations',     es:'Evaluaciones',    it:'Valutazioni',     pt:'Avaliações',      de:'Bewertungen',     ru:'Оценки',           ko:'평가',             zh:'评估',            ja:'評価',            ur:'تشخیص' },
  'نقاط التحسين':            { en:'AFIs',             fr:'AFIs',            es:'AFIs',            it:'AFIs',            pt:'AFIs',            de:'AFIs',            ru:'AFIs',             ko:'AFIs',             zh:'AFIs',            ja:'AFIs',            ur:'AFIs' },
  'مهمة جديدة':              { en:'New Task',         fr:'Nouvelle tâche',  es:'Nueva tarea',     it:'Nuovo compito',   pt:'Nova tarefa',     de:'Neue Aufgabe',    ru:'Новая задача',     ko:'새 작업',          zh:'新任务',          ja:'新しいタスク',     ur:'نیا کام' },
  'اختر الدائرة':            { en:'Select Division',  fr:'Sélectionner la division', es:'Seleccionar división', it:'Seleziona divisione', pt:'Selecionar divisão', de:'Abteilung wählen', ru:'Выбрать подразделение', ko:'부서 선택',      zh:'选择部门',        ja:'部署を選択',      ur:'ڈویژن منتخب کریں' },
  'يومي':                    { en:'My Day',           fr:'Mon Jour',        es:'Mi Día',          it:'La Mia Giornata', pt:'Meu Dia',         de:'Mein Tag',        ru:'Мой день',        ko:'오늘 하루',        zh:'我的今天',        ja:'今日',            ur:'میرا دن' },
  'مهامي':                   { en:'My Tasks',         fr:'Mes Tâches',      es:'Mis Tareas',      it:'Le Mie Attività', pt:'Minhas Tarefas',  de:'Meine Aufgaben',  ru:'Мои задачи',      ko:'내 작업',          zh:'我的任务',        ja:'私のタスク',      ur:'میرے کام' },
  'المُنجزة':                { en:'Completed',        fr:'Terminées',       es:'Completadas',     it:'Completate',      pt:'Concluídas',      de:'Abgeschlossen',   ru:'Завершённые',     ko:'완료됨',           zh:'已完成',          ja:'完了済み',        ur:'مکمل' },
  'مؤشر أدائي':              { en:'My Performance',   fr:'Ma Performance',  es:'Mi Rendimiento',  it:'La Mia Performance', pt:'Meu Desempenho', de:'Meine Leistung', ru:'Моя производительность', ko:'내 성과', zh:'我的绩效',        ja:'私の成績',        ur:'میری کارکردگی' },
  'تحديث نهاية اليوم':       { en:'Daily Update',     fr:'Mise à jour',     es:'Actualización',   it:'Aggiornamento',   pt:'Atualização',     de:'Tagesupdate',     ru:'Обновление',      ko:'일일 업데이트',    zh:'日常更新',        ja:'日次更新',        ur:'روزانہ اپ ڈیٹ' },
  'تذاكري':                  { en:'My Tickets',       fr:'Mes Tickets',     es:'Mis Tickets',     it:'I Miei Ticket',   pt:'Meus Tickets',    de:'Meine Tickets',   ru:'Мои тикеты',      ko:'내 티켓',          zh:'我的工单',        ja:'私のチケット',    ur:'میرے ٹکٹ' },
  'AFIs مكلّف بها':          { en:'My AFIs',          fr:'Mes AFIs',        es:'Mis AFIs',        it:'I Miei AFI',      pt:'Meus AFIs',       de:'Meine AFIs',      ru:'Мои AFIs',        ko:'내 AFIs',          zh:'我的AFIs',        ja:'私のAFIs',        ur:'میرے AFIs' },
  'إنشاء حساب موظف':         { en:'Create Employee Account', fr:'Créer compte employé', es:'Crear cuenta empleado', it:'Crea account dipendente', pt:'Criar conta funcionário', de:'Mitarbeiterkonto erstellen', ru:'Создать аккаунт сотрудника', ko:'직원 계정 생성', zh:'创建员工账户', ja:'従業員アカウント作成', ur:'ملازم اکاؤنٹ' },
  'فتح البورتال':            { en:'Open Portal',      fr:'Ouvrir le portail',es:'Abrir portal',    it:'Apri portale',    pt:'Abrir portal',    de:'Portal öffnen',   ru:'Открыть портал',  ko:'포털 열기',        zh:'打开门户',        ja:'ポータルを開く',  ur:'پورٹل کھولیں' },
  'اتصال نشط':               { en:'Active Connection',fr:'Connexion active', es:'Conexión activa', it:'Connessione attiva', pt:'Conexão ativa',  de:'Aktive Verbindung', ru:'Активное соединение', ko:'활성 연결', zh:'活跃连接',        ja:'アクティブな接続', ur:'فعال کنکشن' },
  'مرحباً':                  { en:'Welcome',          fr:'Bienvenue',       es:'Bienvenido',      it:'Benvenuto',       pt:'Bem-vindo',       de:'Willkommen',      ru:'Добро пожаловать', ko:'환영합니다',      zh:'欢迎',            ja:'ようこそ',        ur:'خوش آمدید' },
  'مركز قيادة التميز التشغيلي':{ en:'OE Command Center',fr:'Centre de commandement OE',es:'Centro de mando OE',it:'Centro di comando OE',pt:'Centro de comando OE',de:'OE-Kommandozentrum',ru:'Командный центр OE',ko:'OE 지휘 센터',zh:'OE指挥中心',ja:'OE指揮センター',ur:'OE کمانڈ سینٹر' },
  'بوابة الموظف':            { en:'Employee Portal',  fr:'Portail employé', es:'Portal empleado', it:'Portale dipendente', pt:'Portal do funcionário', de:'Mitarbeiterportal', ru:'Портал сотрудника', ko:'직원 포털', zh:'员工门户',        ja:'従業員ポータル',  ur:'ملازم پورٹل' },
  'لوحة الأدمن':             { en:'Admin Panel',      fr:'Panneau admin',   es:'Panel admin',     it:'Pannello admin',  pt:'Painel admin',    de:'Admin-Panel',     ru:'Панель администратора', ko:'관리자 패널',      zh:'管理面板',        ja:'管理パネル',      ur:'ایڈمن پینل' },
  'مدير الإدارة':            { en:'Director',         fr:'Directeur',       es:'Director',        it:'Direttore',       pt:'Diretor',         de:'Direktor',        ru:'Директор',        ko:'이사',             zh:'总监',            ja:'ディレクター',    ur:'ڈائریکٹر' },
  'تأكيد الإغلاق':           { en:'Confirm Closure',  fr:'Confirmer fermeture',es:'Confirmar cierre',it:'Conferma chiusura',pt:'Confirmar fechamento',de:'Schließung bestätigen',ru:'Подтвердить закрытие',ko:'완료 확인',zh:'确认关闭',ja:'完了確認',ur:'بندش تصدیق' },
  'أُغلقت المهمة':           { en:'Task closed',      fr:'Tâche fermée',    es:'Tarea cerrada',   it:'Attività chiusa', pt:'Tarefa fechada',  de:'Aufgabe geschlossen',ru:'Задача закрыта', ko:'작업 완료',        zh:'任务关闭',        ja:'タスク完了',      ur:'کام بند' },
  'أرسل الموظف الإنجاز بالإيميل':{ en:'Employee sent completion email', fr:'L\'employé a envoyé l\'email de finalisation', es:'El empleado envió el email de finalización', it:'Il dipendente ha inviato l\'email di completamento', pt:'O funcionário enviou o email de conclusão', de:'Mitarbeiter hat Abschluss-E-Mail gesendet', ru:'Сотрудник отправил письмо о завершении', ko:'직원이 완료 이메일을 보냈습니다', zh:'员工发送了完成邮件', ja:'従業員が完了メールを送信', ur:'ملازم نے تکمیل ای میل بھیجی' },
  'لم يرسل بالإيميل بعد':   { en:'Email not sent yet',fr:'Email pas encore envoyé',es:'Email aún no enviado',it:'Email non ancora inviata',pt:'Email ainda não enviado',de:'E-Mail noch nicht gesendet',ru:'Письмо ещё не отправлено',ko:'이메일 아직 미발송',zh:'邮件尚未发送',ja:'メール未送信',ur:'ای میل ابھی نہیں بھیجی' },

  'تصدير': { en:'Export', fr:'Exporter', es:'Exportar', it:'Esporta', pt:'Exportar', de:'Exportieren', ru:'Экспортировать', ko:'내보내기', zh:'导出', ja:'エクスポート', ur:'برآمد' },
  '+ إجراء': { en:'+ Action', fr:'+ Action', es:'+ Acción', it:'+ Azione', pt:'+ Ação', de:'+ Aktion', ru:'+ Действие', ko:'+ 액션', zh:'+ 动作', ja:'+ アクション', ur:'+ اقدام' },
  '+ اجتماع جديد': { en:'+ New Meeting', fr:'+ Nouvelle réunion', es:'+ Nueva reunión', it:'+ Nuova riunione', pt:'+ Nova reunião', de:'+ Neues Meeting', ru:'+ Новая встреча', ko:'+ 새 회의', zh:'+ 新会议', ja:'+ 新会議', ur:'+ نئی میٹنگ' },
  '+ إضافة درس مستفاد': { en:'+ Add Lesson Learned', fr:'+ Ajouter leçon', es:'+ Agregar lección', it:'+ Aggiungi lezione', pt:'+ Adicionar lição', de:'+ Lektion hinzufügen', ru:'+ Добавить урок', ko:'+ 교훈 추가', zh:'+ 添加经验教训', ja:'+ 教訓を追加', ur:'+ سبق شامل کریں' },
  'الاتجاه': { en:'Trend', fr:'Tendance', es:'Tendencia', it:'Tendenza', pt:'Tendência', de:'Trend', ru:'Тенденция', ko:'추세', zh:'趋势', ja:'トレンド', ur:'رجحان' },
  'الأجندة': { en:'Agenda', fr:'Ordre du jour', es:'Agenda', it:'Ordine del giorno', pt:'Pauta', de:'Tagesordnung', ru:'Повестка', ko:'안건', zh:'议程', ja:'議題', ur:'ایجنڈا' },
  'إجراءات الاجتماع': { en:'Meeting Actions', fr:'Actions de réunion', es:'Acciones de reunión', it:'Azioni riunione', pt:'Ações de reunião', de:'Meeting-Aktionen', ru:'Действия встречи', ko:'회의 조치', zh:'会议行动', ja:'会議アクション', ur:'میٹنگ اقدامات' },
  'الدرس المستفاد': { en:'Lesson Learned', fr:'Leçon apprise', es:'Lección aprendida', it:'Lezione appresa', pt:'Lição aprendida', de:'Gelernte Lektion', ru:'Извлечённый урок', ko:'교훈', zh:'经验教训', ja:'教訓', ur:'سیکھا گیا سبق' },
  'اسم المقيّم': { en:'Assessor Name', fr:'Nom de l\'évaluateur', es:'Nombre del evaluador', it:'Nome valutatore', pt:'Nome do avaliador', de:'Name des Bewerters', ru:'Имя оценщика', ko:'평가자 이름', zh:'评估员姓名', ja:'評価者名', ur:'تشخیص کار نام' },
  'اختر العضو': { en:'Select Member', fr:'Sélectionner membre', es:'Seleccionar miembro', it:'Seleziona membro', pt:'Selecionar membro', de:'Mitglied auswählen', ru:'Выбрать участника', ko:'멤버 선택', zh:'选择成员', ja:'メンバーを選択', ur:'رکن منتخب کریں' },
  'إنشاء المهمة': { en:'Create Task', fr:'Créer une tâche', es:'Crear tarea', it:'Crea compito', pt:'Criar tarefa', de:'Aufgabe erstellen', ru:'Создать задачу', ko:'작업 만들기', zh:'创建任务', ja:'タスク作成', ur:'کام بنائیں' },
  'إنشاء الحساب': { en:'Create Account', fr:'Créer un compte', es:'Crear cuenta', it:'Crea account', pt:'Criar conta', de:'Konto erstellen', ru:'Создать аккаунт', ko:'계정 만들기', zh:'创建账户', ja:'アカウント作成', ur:'اکاؤنٹ بنائیں' },
  'الاسم (عربي) *': { en:'Full Name (Arabic) *', fr:'Nom (arabe) *', es:'Nombre (árabe) *', it:'Nome (arabo) *', pt:'Nome (árabe) *', de:'Name (Arabisch) *', ru:'Имя (арабский) *', ko:'이름 (아랍어) *', zh:'姓名 (阿拉伯语) *', ja:'名前 (アラビア語) *', ur:'نام (عربی) *' },
  'الاسم (إنجليزي)': { en:'Full Name (English)', fr:'Nom (anglais)', es:'Nombre (inglés)', it:'Nome (inglese)', pt:'Nome (inglês)', de:'Name (Englisch)', ru:'Имя (английский)', ko:'이름 (영어)', zh:'姓名 (英语)', ja:'名前 (英語)', ur:'نام (انگریزی)' },
  'أسبوعي OE': { en:'Weekly OE', fr:'OE hebdomadaire', es:'OE semanal', it:'OE settimanale', pt:'OE semanal', de:'Wöchentliches OE', ru:'Еженедельный OE', ko:'주간 OE', zh:'每周OE', ja:'週次OE', ur:'ہفتہ وار OE' },
  'إسهام في AFIs': { en:'AFI Contribution', fr:'Contribution aux AFIs', es:'Contribución AFIs', it:'Contributo AFIs', pt:'Contribuição AFIs', de:'AFI-Beitrag', ru:'Вклад в AFIs', ko:'AFI 기여', zh:'AFI贡献', ja:'AFI貢献', ur:'AFI میں حصہ' },
  'KPIs ضمن الهدف': { en:'KPIs On Target', fr:'KPIs dans les objectifs', es:'KPIs en objetivo', it:'KPI a obiettivo', pt:'KPIs no objetivo', de:'KPIs auf Zielkurs', ru:'КПЭ в цели', ko:'목표 내 KPIs', zh:'KPIs达标', ja:'KPI目標内', ur:'KPIs ہدف کے اندر' },
  'أنشئ المهام وتابعها وراجع تحديثات الفريق': { en:'Create tasks, track them and review team updates', fr:'Créer des tâches, les suivre et réviser les mises à jour', es:'Crear tareas, rastrearlas y revisar actualizaciones', it:'Crea attività, monitorale e rivedi gli aggiornamenti', pt:'Crie tarefas, rastreie e revise atualizações', de:'Aufgaben erstellen, verfolgen und Team-Updates prüfen', ru:'Создавайте задачи, отслеживайте их и проверяйте обновления', ko:'작업을 만들고 추적하며 팀 업데이트를 검토하세요', zh:'创建任务、跟踪并审查团队更新', ja:'タスクを作成し追跡してチーム更新を確認', ur:'کام بنائیں، ٹریک کریں اور ٹیم اپ ڈیٹ دیکھیں' },
  'أنشئ مهمة وكلّفها لأحد أعضاء الفريق': { en:'Create a task and assign it to a team member', fr:'Créer une tâche et l\'assigner à un membre', es:'Crea una tarea y asígnala a un miembro', it:'Crea un\'attività e assegnala a un membro', pt:'Crie uma tarefa e atribua-a a um membro', de:'Aufgabe erstellen und Teammitglied zuweisen', ru:'Создайте задачу и назначьте члену команды', ko:'작업을 만들고 팀원에게 할당하세요', zh:'创建任务并分配给团队成员', ja:'タスクを作成してチームメンバーに割り当て', ur:'کام بنائیں اور ٹیم رکن کو دیں' },
  'أعطِ هذه البيانات للموظف': { en:'Give these credentials to the employee', fr:'Donner ces données à l\'employé', es:'Dar estas credenciales al empleado', it:'Fornire questi dati al dipendente', pt:'Forneça estes dados ao funcionário', de:'Diese Daten dem Mitarbeiter geben', ru:'Передайте эти данные сотруднику', ko:'직원에게 이 정보를 제공하세요', zh:'将这些凭据提供给员工', ja:'従業員にこの情報を渡してください', ur:'یہ معلومات ملازم کو دیں' },
  'الإيميل التلقائي:': { en:'Auto-generated email:', fr:'Email automatique:', es:'Email automático:', it:'Email automatica:', pt:'Email automático:', de:'Automatische E-Mail:', ru:'Авто-email:', ko:'자동 생성 이메일:', zh:'自动生成邮件:', ja:'自動生成メール:', ur:'خودکار ای میل:' },
  'إنجازات الأسبوع': { en:'Weekly Achievements', fr:'Réalisations de la semaine', es:'Logros de la semana', it:'Risultati della settimana', pt:'Realizações da semana', de:'Wöchentliche Leistungen', ru:'Достижения недели', ko:'주간 성과', zh:'本周成就', ja:'今週の成果', ur:'ہفتے کی کامیابیاں' },
  'آخر التعليقات': { en:'Latest Comments', fr:'Derniers commentaires', es:'Últimos comentarios', it:'Ultimi commenti', pt:'Últimos comentários', de:'Letzte Kommentare', ru:'Последние комментарии', ko:'최근 댓글', zh:'最新评论', ja:'最新コメント', ur:'تازہ ترین تبصرے' },
  'نظرة استراتيجية شاملة — فقط ما يحتاج قرارك': { en:'Strategic overview — Only what needs your decision', fr:'Vue stratégique — Ce qui nécessite votre décision', es:'Vista estratégica — Solo lo que necesita tu decisión', it:'Panoramica strategica — Solo ciò che richiede la tua decisione', pt:'Visão estratégica — Apenas o que precisa da sua decisão', de:'Strategischer Überblick — Nur was Ihre Entscheidung braucht', ru:'Стратегический обзор — Только то, что требует вашего решения', ko:'전략적 개요 — 결정이 필요한 것만', zh:'战略概述 — 只需您决策的内容', ja:'戦略的概要 — 決定が必要なもののみ', ur:'اسٹریٹجک جائزہ — صرف جو فیصلہ چاہتا ہے' },

  'الإجراء التصحيحي': { en:'Corrective Action', fr:'Action corrective', es:'Acción correctiva', it:'Azione correttiva', pt:'Ação corretiva', de:'Korrekturmaßnahme', ru:'Корректирующее действие', ko:'시정 조치', zh:'纠正措施', ja:'是正措置', ur:'اصلاحی اقدام' },
  'الاسم الكامل *': { en:'Full Name *', fr:'Nom complet *', es:'Nombre completo *', it:'Nome completo *', pt:'Nome completo *', de:'Vollständiger Name *', ru:'Полное имя *', ko:'전체 이름 *', zh:'全名 *', ja:'フルネーム *', ur:'پورا نام *' },
  'التفاصيل': { en:'Details', fr:'Détails', es:'Detalles', it:'Dettagli', pt:'Detalhes', de:'Details', ru:'Детали', ko:'세부사항', zh:'详情', ja:'詳細', ur:'تفصیل' },
  'التقرير الكامل': { en:'Full Report', fr:'Rapport complet', es:'Informe completo', it:'Rapporto completo', pt:'Relatório completo', de:'Vollständiger Bericht', ru:'Полный отчёт', ko:'전체 보고서', zh:'完整报告', ja:'完全レポート', ur:'مکمل رپورٹ' },
  'التقييم المبدئي': { en:'Initial Assessment', fr:'Évaluation initiale', es:'Evaluación inicial', it:'Valutazione iniziale', pt:'Avaliação inicial', de:'Erstbewertung', ru:'Первичная оценка', ko:'초기 평가', zh:'初步评估', ja:'初期評価', ur:'ابتدائی تشخیص' },
  'الرقم الوظيفي (للدخول)': { en:'Employee ID (for login)', fr:'ID employé (connexion)', es:'ID empleado (acceso)', it:'ID dipendente (accesso)', pt:'ID funcionário (login)', de:'Mitarbeiter-ID (Login)', ru:'ID сотрудника (вход)', ko:'직원 ID (로그인)', zh:'员工ID (登录)', ja:'社員ID (ログイン)', ur:'ملازم ID (لاگ ان)' },
  'الرقم الوظيفي *': { en:'Employee ID *', fr:'ID employé *', es:'ID empleado *', it:'ID dipendente *', pt:'ID funcionário *', de:'Mitarbeiter-ID *', ru:'ID сотрудника *', ko:'직원 ID *', zh:'员工ID *', ja:'社員ID *', ur:'ملازم ID *' },
  'السبب الجذري': { en:'Root Cause', fr:'Cause racine', es:'Causa raíz', it:'Causa radice', pt:'Causa raiz', de:'Grundursache', ru:'Первопричина', ko:'근본 원인', zh:'根本原因', ja:'根本原因', ur:'بنیادی وجہ' },
  'العنوان *': { en:'Title *', fr:'Titre *', es:'Título *', it:'Titolo *', pt:'Título *', de:'Titel *', ru:'Заголовок *', ko:'제목 *', zh:'标题 *', ja:'タイトル *', ur:'عنوان *' },
  'القرارات': { en:'Decisions', fr:'Décisions', es:'Decisiones', it:'Decisioni', pt:'Decisões', de:'Entscheidungen', ru:'Решения', ko:'결정사항', zh:'决定', ja:'決定', ur:'فیصلے' },
  'القيمة الفعلية': { en:'Actual Value', fr:'Valeur réelle', es:'Valor real', it:'Valore reale', pt:'Valor real', de:'Tatsächlicher Wert', ru:'Фактическое значение', ko:'실제값', zh:'实际值', ja:'実績値', ur:'حقیقی قدر' },
  'المؤشر': { en:'Indicator', fr:'Indicateur', es:'Indicador', it:'Indicatore', pt:'Indicador', de:'Indikator', ru:'Индикатор', ko:'지표', zh:'指标', ja:'指標', ur:'اشاریہ' },
  'المحضر': { en:'Minutes', fr:'Procès-verbal', es:'Acta', it:'Verbale', pt:'Ata', de:'Protokoll', ru:'Протокол', ko:'회의록', zh:'会议记录', ja:'議事録', ur:'کارروائی' },
  'المرحلة': { en:'Stage', fr:'Étape', es:'Etapa', it:'Fase', pt:'Etapa', de:'Phase', ru:'Этап', ko:'단계', zh:'阶段', ja:'段階', ur:'مرحلہ' },
  'الموديول المرتبط': { en:'Related Module', fr:'Module lié', es:'Módulo relacionado', it:'Modulo correlato', pt:'Módulo relacionado', de:'Zugehöriges Modul', ru:'Связанный модуль', ko:'관련 모듈', zh:'相关模块', ja:'関連モジュール', ur:'متعلقہ ماڈیول' },
  'النوع': { en:'Type', fr:'Type', es:'Tipo', it:'Tipo', pt:'Tipo', de:'Typ', ru:'Тип', ko:'유형', zh:'类型', ja:'タイプ', ur:'قسم' },
  'الوحدة': { en:'Unit', fr:'Unité', es:'Unidad', it:'Unità', pt:'Unidade', de:'Einheit', ru:'Единица', ko:'단위', zh:'单位', ja:'単位', ur:'اکائی' },
  'الوصف التفصيلي': { en:'Detailed Description', fr:'Description détaillée', es:'Descripción detallada', it:'Descrizione dettagliata', pt:'Descrição detalhada', de:'Detaillierte Beschreibung', ru:'Подробное описание', ko:'상세 설명', zh:'详细描述', ja:'詳細説明', ur:'تفصیلی وضاحت' },
  'بانتظار المراجعة': { en:'Pending Review', fr:'En attente de révision', es:'Pendiente de revisión', it:'In attesa di revisione', pt:'Aguardando revisão', de:'Ausstehende Überprüfung', ru:'Ожидает проверки', ko:'검토 대기', zh:'待审查', ja:'レビュー待ち', ur:'جائزہ کا انتظار' },
  'تاريخ الإنجاز': { en:'Completion Date', fr:'Date d\'achèvement', es:'Fecha de finalización', it:'Data di completamento', pt:'Data de conclusão', de:'Abschlussdatum', ru:'Дата завершения', ko:'완료일', zh:'完成日期', ja:'完了日', ur:'تکمیل کی تاریخ' },
  'تاريخ البداية': { en:'Start Date', fr:'Date de début', es:'Fecha de inicio', it:'Data di inizio', pt:'Data de início', de:'Startdatum', ru:'Дата начала', ko:'시작일', zh:'开始日期', ja:'開始日', ur:'شروعات کی تاریخ' },
  'تاريخ النهاية': { en:'End Date', fr:'Date de fin', es:'Fecha de fin', it:'Data di fine', pt:'Data de término', de:'Enddatum', ru:'Дата окончания', ko:'종료일', zh:'结束日期', ja:'終了日', ur:'اختتام کی تاریخ' },
  'تحديث الحالة': { en:'Update Status', fr:'Mettre à jour le statut', es:'Actualizar estado', it:'Aggiorna stato', pt:'Atualizar status', de:'Status aktualisieren', ru:'Обновить статус', ko:'상태 업데이트', zh:'更新状态', ja:'ステータス更新', ur:'حیثیت اپ ڈیٹ' },
  'تحديث المهمة': { en:'Update Task', fr:'Mettre à jour la tâche', es:'Actualizar tarea', it:'Aggiorna attività', pt:'Atualizar tarefa', de:'Aufgabe aktualisieren', ru:'Обновить задачу', ko:'작업 업데이트', zh:'更新任务', ja:'タスク更新', ur:'کام اپ ڈیٹ' },
  'تعديل المهمة': { en:'Edit Task', fr:'Modifier la tâche', es:'Editar tarea', it:'Modifica attività', pt:'Editar tarefa', de:'Aufgabe bearbeiten', ru:'Редактировать задачу', ko:'작업 편집', zh:'编辑任务', ja:'タスク編集', ur:'کام ترمیم' },
  'تعليق أو تحديث': { en:'Comment or Update', fr:'Commentaire ou mise à jour', es:'Comentario o actualización', it:'Commento o aggiornamento', pt:'Comentário ou atualização', de:'Kommentar oder Update', ru:'Комментарий или обновление', ko:'댓글 또는 업데이트', zh:'评论或更新', ja:'コメントまたは更新', ur:'تبصرہ یا اپ ڈیٹ' },
  'تقدير مبدئي من النظام': { en:'Initial System Estimate', fr:'Estimation initiale du système', es:'Estimación inicial del sistema', it:'Stima iniziale del sistema', pt:'Estimativa inicial do sistema', de:'Erste Systemschätzung', ru:'Первоначальная оценка системы', ko:'시스템 초기 추정', zh:'系统初步估算', ja:'システム初期推定', ur:'سسٹم کا ابتدائی اندازہ' },
  'تقييمات تنتظر اعتمادك النهائي': { en:'Assessments awaiting your final approval', fr:'Évaluations en attente de votre approbation finale', es:'Evaluaciones esperando su aprobación final', it:'Valutazioni in attesa della tua approvazione finale', pt:'Avaliações aguardando sua aprovação final', de:'Bewertungen warten auf Ihre endgültige Genehmigung', ru:'Оценки ожидают вашего окончательного одобрения', ko:'최종 승인을 기다리는 평가', zh:'等待您最终批准的评估', ja:'最終承認待ちの評価', ur:'آپ کی حتمی منظوری کا انتظار کرنے والی تشخیصات' },
  'جاهزة للمراجعة': { en:'Ready for Review', fr:'Prêt pour révision', es:'Listo para revisión', it:'Pronto per la revisione', pt:'Pronto para revisão', de:'Bereit zur Überprüfung', ru:'Готово к проверке', ko:'검토 준비됨', zh:'准备好审查', ja:'レビュー準備完了', ur:'جائزے کے لیے تیار' },
  'غير نشط': { en:'Inactive', fr:'Inactif', es:'Inactivo', it:'Inattivo', pt:'Inativo', de:'Inaktiv', ru:'Неактивный', ko:'비활성', zh:'不活跃', ja:'非アクティブ', ur:'غیر فعال' },
  'بانتظار التحقق': { en:'Pending Verification', fr:'En attente de vérification', es:'Pendiente de verificación', it:'In attesa di verifica', pt:'Aguardando verificação', de:'Ausstehende Überprüfung', ru:'Ожидает проверки', ko:'검증 대기', zh:'待验证', ja:'検証待ち', ur:'تصدیق کا انتظار' },
  /* ── Audit fixes ──────────────────────────────────────── */
  'نقاط التحسين المفتوحة':  { en:'Open AFIs',        fr:'AFIs ouvertes',    es:'AFIs abiertas',   it:'AFIs aperte',      pt:'AFIs abertas',    de:'Offene AFIs',     ru:'Открытые AFIs',    ko:'열린 AFIs',         zh:'开放改进项',       ja:'オープンAFI',      ur:'کھلے بہتری نکات' },
  'نقاط التحسين المتأخرة':  { en:'Overdue AFIs',     fr:'AFIs en retard',   es:'AFIs atrasadas',  it:'AFIs in ritardo',   pt:'AFIs atrasadas',  de:'Überfällige AFIs', ru:'Просроченные AFIs', ko:'기한초과 AFIs',    zh:'逾期改进项',       ja:'期限超過AFI',      ur:'تاخیری بہتری نکات' },
  'المهام النشطة':           { en:'Active Tasks',     fr:'Tâches actives',   es:'Tareas activas',  it:'Attività attive',   pt:'Tarefas ativas',  de:'Aktive Aufgaben',  ru:'Активные задачи',   ko:'활성 작업',        zh:'活跃任务',         ja:'アクティブタスク', ur:'فعال کام' },
  'نقطة تحسين جديدة':       { en:'New AFI',          fr:'Nouvel AFI',       es:'Nuevo AFI',       it:'Nuovo AFI',         pt:'Novo AFI',        de:'Neues AFI',        ru:'Новый AFI',         ko:'새 AFI',           zh:'新改进项',         ja:'新しいAFI',        ur:'نیا بہتری نکتہ' },
  'مهمة جديدة':             { en:'New Task',         fr:'Nouvelle tâche',   es:'Nueva tarea',     it:'Nuovo compito',     pt:'Nova tarefa',     de:'Neue Aufgabe',     ru:'Новая задача',      ko:'새 작업',          zh:'新任务',           ja:'新しいタスク',     ur:'نیا کام' },
  'تحديثات الفريق':          { en:'Team Update',      fr:'Mise à jour équipe',es:'Update del equipo',it:'Aggiornamento team',pt:'Atualização da equipe',de:'Team-Update',    ru:'Обновление команды',ko:'팀 업데이트',       zh:'团队更新',         ja:'チーム更新',       ur:'ٹیم اپ ڈیٹ' },
  'لا توجد نقاط تحسين':     { en:'No AFIs',          fr:'Pas d\'AFIs',       es:'Sin AFIs',        it:'Nessun AFI',        pt:'Sem AFIs',        de:'Keine AFIs',       ru:'Нет AFIs',          ko:'AFI 없음',         zh:'无改进项',         ja:'AFIなし',          ur:'کوئی بہتری نکتہ نہیں' },
  'لا توجد مهام':            { en:'No tasks',         fr:'Pas de tâches',    es:'Sin tareas',      it:'Nessun compito',    pt:'Sem tarefas',     de:'Keine Aufgaben',   ru:'Нет задач',         ko:'작업 없음',        zh:'无任务',           ja:'タスクなし',       ur:'کوئی کام نہیں' },
  'لا توجد تنبيهات':         { en:'No alerts',        fr:'Pas d\'alertes',    es:'Sin alertas',     it:'Nessun avviso',     pt:'Sem alertas',     de:'Keine Warnungen',  ru:'Нет оповещений',    ko:'경보 없음',        zh:'无警报',           ja:'アラートなし',     ur:'کوئی اطلاع نہیں' },
  'لا توجد نقاط تحسين مفتوحة':{ en:'No Open AFIs',   fr:'Pas d\'AFIs ouvertes',es:'Sin AFIs abiertas',it:'Nessun AFI aperto',pt:'Sem AFIs abertas',de:'Keine offenen AFIs',ru:'Нет открытых AFIs',ko:'열린 AFI 없음',    zh:'无开放改进项',     ja:'オープンAFIなし',  ur:'کوئی کھلا بہتری نکتہ نہیں' },
  'مهام الموظفين المغلقة':  { en:'Closed Employee Tasks',fr:'Tâches fermées des employés',es:'Tareas cerradas de empleados',it:'Attività chiuse dei dipendenti',pt:'Tarefas fechadas dos funcionários',de:'Geschlossene Mitarbeiteraufgaben',ru:'Закрытые задачи сотрудников',ko:'닫힌 직원 작업',zh:'已关闭员工任务',ja:'クローズ済み従業員タスク',ur:'بند ملازم کام' },
  'إعادة مهام الموظفين':     { en:'Return Employee Tasks',fr:'Retourner tâches employés',es:'Devolver tareas empleados',it:'Restituire attività dipendenti',pt:'Devolver tarefas funcionários',de:'Mitarbeiteraufgaben zurückgeben',ru:'Вернуть задачи сотрудников',ko:'직원 작업 반환',zh:'退回员工任务',ja:'従業員タスク返却',ur:'ملازم کام واپس' },
  'الأولوية':                { en:'Priority',         fr:'Priorité',         es:'Prioridad',       it:'Priorità',          pt:'Prioridade',      de:'Priorität',        ru:'Приоритет',         ko:'우선순위',         zh:'优先级',           ja:'優先度',           ur:'ترجیح' },
  'تاريخ الاستحقاق':         { en:'Due Date',         fr:'Date d\'échéance',  es:'Fecha límite',    it:'Scadenza',          pt:'Prazo',           de:'Fälligkeitsdatum', ru:'Срок выполнения',   ko:'마감일',           zh:'截止日期',         ja:'期限',             ur:'آخری تاریخ' },
  'تفاصيل المهمة':           { en:'Task Details',     fr:'Détails de la tâche',es:'Detalles de la tarea',it:'Dettagli attività',pt:'Detalhes da tarefa',de:'Aufgabendetails',  ru:'Детали задачи',     ko:'작업 세부사항',    zh:'任务详情',         ja:'タスク詳細',       ur:'کام کی تفصیل' },
  'لا يوجد أعضاء في الفريق':{ en:'No team members',  fr:'Pas de membres',   es:'Sin miembros',    it:'Nessun membro',     pt:'Sem membros',     de:'Keine Mitglieder', ru:'Нет участников',    ko:'팀원 없음',        zh:'无团队成员',       ja:'チームメンバーなし',ur:'کوئی ٹیم رکن نہیں' },
  'أرسل التحديث للحوكمة':   { en:'Send Update to Governance',fr:'Envoyer la mise à jour à la gouvernance',es:'Enviar actualización a gobernanza',it:'Invia aggiornamento alla governance',pt:'Enviar atualização para governança',de:'Update an Governance senden',ru:'Отправить обновление в Управление',ko:'거버넌스에 업데이트 보내기',zh:'发送更新给治理',ja:'ガバナンスに更新を送信',ur:'گورننس کو اپ ڈیٹ بھیجیں' },
  'إرسال للحوكمة':           { en:'Send to Governance',fr:'Envoyer à la gouvernance',es:'Enviar a gobernanza',it:'Invia alla governance',pt:'Enviar para governança',de:'An Governance senden',ru:'Отправить в Управление',ko:'거버넌스로 보내기',zh:'发送至治理',ja:'ガバナンスに送信',ur:'گورننس کو بھیجیں' },
  'سيتم عرض التنبيهات الفنية الخاصة بالدائرة هنا':{ en:'Technical alerts for this division will appear here',fr:'Les alertes techniques de cette division apparaîtront ici',es:'Las alertas técnicas de esta división aparecerán aquí',it:'Gli avvisi tecnici di questa divisione appariranno qui',pt:'Os alertas técnicos desta divisão aparecerão aqui',de:'Technische Warnungen für diese Abteilung erscheinen hier',ru:'Технические оповещения для этого подразделения появятся здесь',ko:'이 부서의 기술 경보가 여기에 표시됩니다',zh:'此部门的技术警报将在此处显示',ja:'この部署の技術アラートがここに表示されます',ur:'اس ڈویژن کی تکنیکی اطلاعات یہاں ظاہر ہوں گی' },
  'سيتم عرض التذاكر بعد ربط Supabase':{ en:'Tickets will appear after Supabase connection',fr:'Les tickets apparaîtront après la connexion Supabase',es:'Los tickets aparecerán después de la conexión Supabase',it:'I ticket appariranno dopo la connessione Supabase',pt:'Os tickets aparecerão após a conexão Supabase',de:'Tickets erscheinen nach der Supabase-Verbindung',ru:'Тикеты появятся после подключения Supabase',ko:'Supabase 연결 후 티켓이 표시됩니다',zh:'Supabase连接后将显示工单',ja:'Supabase接続後にチケットが表示されます',ur:'Supabase کنکشن کے بعد ٹکٹ ظاہر ہوں گے' },
  'أنشئ مهمة وكلفها لأحد أعضاء الفريق':{ en:'Create a task and assign it to a team member',fr:'Créez une tâche et assignez-la à un membre de l\'équipe',es:'Crea una tarea y asígnala a un miembro del equipo',it:'Crea un\'attività e assegnala a un membro del team',pt:'Crie uma tarefa e atribua-a a um membro da equipe',de:'Erstellen Sie eine Aufgabe und weisen Sie sie einem Teammitglied zu',ru:'Создайте задачу и назначьте её члену команды',ko:'작업을 만들고 팀원에게 할당하세요',zh:'创建任务并分配给团队成员',ja:'タスクを作成してチームメンバーに割り当ててください',ur:'ایک کام بنائیں اور ٹیم کے کسی رکن کو دیں' },
  'اعتماد أو إعادة مهام الموظفين المغلقة للمراجعة':{ en:'Approve or return closed employee tasks for review',fr:'Approuver ou retourner les tâches fermées des employés pour révision',es:'Aprobar o devolver tareas cerradas de empleados para revisión',it:'Approvare o restituire le attività chiuse dei dipendenti per la revisione',pt:'Aprovar ou devolver tarefas fechadas dos funcionários para revisão',de:'Abgeschlossene Mitarbeiteraufgaben genehmigen oder zur Überprüfung zurückgeben',ru:'Одобрить или вернуть закрытые задачи сотрудников на проверку',ko:'닫힌 직원 작업을 승인하거나 검토를 위해 반환하세요',zh:'批准或退回已关闭的员工任务以供审查',ja:'クローズ済みの従業員タスクを承認または返却してレビューへ',ur:'بند ملازم کاموں کو منظور کریں یا نظرثانی کے لیے واپس کریں' },
  'مراجعة المهام المتأخرة':  { en:'Review overdue tasks',fr:'Réviser les tâches en retard',es:'Revisar tareas atrasadas',it:'Rivedere le attività in ritardo',pt:'Revisar tarefas atrasadas',de:'Überfällige Aufgaben überprüfen',ru:'Проверить просроченные задачи',ko:'기한초과 작업 검토',zh:'审查逾期任务',ja:'期限超過タスクを確認',ur:'تاخیری کاموں کا جائزہ لیں' },
  'تابع خطط المعالجة والإغلاق':{ en:'Track remediation plans and closure',fr:'Suivre les plans de remédiation et fermeture',es:'Seguir planes de remediación y cierre',it:'Monitorare i piani di rimedio e chiusura',pt:'Acompanhar planos de remediação e fechamento',de:'Behebungspläne und Abschluss verfolgen',ru:'Отслеживать планы устранения и закрытие',ko:'개선 계획 및 종료 추적',zh:'跟踪整改计划和关闭',ja:'是正計画とクロージャーを追跡',ur:'علاج کے منصوبے اور بندش کی پیروی کریں' },
  'راجع مؤشرات الأداء الأسبوعية':{ en:'Review weekly KPIs',fr:'Réviser les KPIs hebdomadaires',es:'Revisar KPIs semanales',it:'Rivedere i KPI settimanali',pt:'Revisar KPIs semanais',de:'Wöchentliche KPIs überprüfen',ru:'Проверить еженедельные КПЭ',ko:'주간 KPI 검토',zh:'审查每周KPIs',ja:'週次KPIを確認',ur:'ہفتہ وار KPIs کا جائزہ لیں' },
  'هل توجد عقبات تحتاج متابعة؟':{ en:'Any blockers that need tracking?',fr:'Des obstacles nécessitant un suivi?',es:'¿Obstáculos que necesitan seguimiento?',it:'Ci sono ostacoli che necessitano di monitoraggio?',pt:'Algum bloqueio que precisa de acompanhamento?',de:'Hindernisse, die Nachverfolgung benötigen?',ru:'Есть ли препятствия, требующие отслеживания?',ko:'추적이 필요한 장애물이 있나요?',zh:'有需要跟踪的障碍吗？',ja:'追跡が必要なブロッカーはありますか？',ur:'کیا کوئی رکاوٹ ہے جس کی نگرانی درکار ہے؟' },
  'بحث':                     { en:'Search',           fr:'Rechercher',       es:'Buscar',          it:'Cerca',             pt:'Pesquisar',       de:'Suchen',           ru:'Поиск',             ko:'검색',             zh:'搜索',             ja:'検索',             ur:'تلاش' },
  'بحث...':                  { en:'Search...',        fr:'Rechercher...',    es:'Buscar...',       it:'Cerca...',          pt:'Pesquisar...',    de:'Suchen...',        ru:'Поиск...',          ko:'검색...',           zh:'搜索...',          ja:'検索...',          ur:'تلاش...' },
  'تم إغلاق المهمة وإرسالها للمدير ✓':{ en:'Task closed and sent to manager ✓',fr:'Tâche fermée et envoyée au responsable ✓',es:'Tarea cerrada y enviada al gerente ✓',it:'Attività chiusa e inviata al responsabile ✓',pt:'Tarefa fechada e enviada ao gerente ✓',de:'Aufgabe geschlossen und an Manager gesendet ✓',ru:'Задача закрыта и отправлена менеджеру ✓',ko:'작업 완료 및 관리자에게 전송됨 ✓',zh:'任务关闭并发送给经理 ✓',ja:'タスク完了・マネージャーに送信 ✓',ur:'ٹاسک بند اور مینیجر کو بھیجا ✓' },
};

/* ── DOM Auto-Translate Function ─────────────────────── */
function translateDOM(container) {
  const lang = (typeof App !== 'undefined' ? App.lang : null) || localStorage.getItem('se_lang_v2') || 'en';
  if(lang === 'ar') return; // Already Arabic — no translation needed
  
  if(!container) container = document.body;
  
  // Translate text nodes
  const walker = document.createTreeWalker(
    container, 
    NodeFilter.SHOW_TEXT,
    { acceptNode: n => n.parentNode.tagName !== 'SCRIPT' && n.parentNode.tagName !== 'STYLE' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT }
  );
  
  const nodes = [];
  while(walker.nextNode()) nodes.push(walker.currentNode);
  
  nodes.forEach(node => {
    let text = node.textContent;
    if(!text.trim()) return;
    let changed = false;
    for(const [ar, translations] of Object.entries(DOM_MAP)) {
      if(text.includes(ar) && translations[lang]) {
        text = text.split(ar).join(translations[lang]);
        changed = true;
      }
    }
    if(changed) node.textContent = text;
  });
  
  // Translate placeholder attributes
  container.querySelectorAll('[placeholder]').forEach(el => {
    let ph = el.placeholder;
    for(const [ar, translations] of Object.entries(DOM_MAP)) {
      if(ph.includes(ar) && translations[lang]) {
        ph = ph.split(ar).join(translations[lang]);
      }
    }
    el.placeholder = ph;
  });
  
  // Translate title attributes  
  container.querySelectorAll('[title]').forEach(el => {
    let title = el.title;
    for(const [ar, translations] of Object.entries(DOM_MAP)) {
      if(title.includes(ar) && translations[lang]) {
        title = title.split(ar).join(translations[lang]);
      }
    }
    el.title = title;
  });
}

// Make available globally
if(typeof window !== 'undefined') {
  window.translateDOM = translateDOM;
  window.DOM_MAP = DOM_MAP;
}

/* ═══════════════════════════════════════════════════════════
   AUTO-TRANSLATE OBSERVER
   Watches for DOM changes and translates automatically
   Works for ALL portals without modifying them
═══════════════════════════════════════════════════════════ */

let _translateTimer = null;

function autoTranslate() {
  const lang = (typeof App !== 'undefined' ? App.lang : null) 
               || localStorage.getItem('se_lang_v2') || 'en';
  if(lang === 'ar') return; // Arabic is source — no translation needed
  
  clearTimeout(_translateTimer);
  _translateTimer = setTimeout(() => {
    // Translate everything visible
    const main = document.querySelector('.main') || document.body;
    if(main) translateDOM(main);
    // Also translate modals
    const modal = document.getElementById('tc');
    if(modal) translateDOM(modal);
  }, 120);
}

// Watch for DOM changes
if(typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    // Observe the main content area
    const observer = new MutationObserver((mutations) => {
      const relevant = mutations.some(m => 
        m.addedNodes.length > 0 || m.type === 'characterData'
      );
      if(relevant) autoTranslate();
    });
    
    const config = { childList: true, subtree: true };
    
    // Start observing when pgContent exists
    const startObserving = () => {
      const pg = document.getElementById('pgContent');
      const tc = document.getElementById('tc');
      if(pg) observer.observe(pg, config);
      if(tc) observer.observe(tc, config);
    };
    
    startObserving();
    // Retry if not found yet
    setTimeout(startObserving, 500);
    setTimeout(startObserving, 1500);
    
    // Also translate on page load - multiple passes for async content
    setTimeout(autoTranslate, 200);
    setTimeout(autoTranslate, 500);
    setTimeout(autoTranslate, 1000);
    setTimeout(autoTranslate, 2000);
  });
  
  window.autoTranslate = autoTranslate;
}

/* ═══════════════════════════════════════════════════════
   GLOBAL innerHTML INTERCEPTOR
   Translates content AT THE POINT OF DOM INSERTION
   This guarantees 100% translation regardless of source
═══════════════════════════════════════════════════════ */

(function patchInnerHTML() {
  if(typeof window === 'undefined') return;
  
  const desc = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
  if(!desc || !desc.set) return;
  
  const originalSet = desc.set;
  
  Object.defineProperty(Element.prototype, 'innerHTML', {
    ...desc,
    set(value) {
      // Only translate content in main areas, not scripts or style tags
      const tagName = this.tagName?.toUpperCase();
      if(tagName === 'SCRIPT' || tagName === 'STYLE' || tagName === 'TEXTAREA') {
        return originalSet.call(this, value);
      }
      
      // Only translate if we have a lang set and it's not Arabic
      const lang = (typeof App !== 'undefined' ? App.lang : null)
                   || localStorage.getItem('se_lang_v2') || 'en';
      
      if(lang === 'ar' || !value || typeof value !== 'string') {
        return originalSet.call(this, value);
      }
      
      // Only translate if content contains Arabic
      if(typeof DOM_MAP !== 'undefined' && /[؀-ۿ]/.test(value)) {
        let translated = value;
        // Sort longer strings first to avoid partial replacements
        for(const [ar, tr] of _sortedDOMEntries) {
          if(tr[lang] && translated.includes(ar)) {
            translated = translated.split(ar).join(tr[lang]);
          }
        }
        return originalSet.call(this, translated);
      }
      
      return originalSet.call(this, value);
    },
    configurable: true
  });
})();

// Pre-sort DOM_MAP entries by length (longest first) for efficiency
let _sortedDOMEntries = [];
if(typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    if(typeof DOM_MAP !== 'undefined') {
      _sortedDOMEntries = Object.entries(DOM_MAP)
        .sort((a, b) => b[0].length - a[0].length);
    }
  });
  // Also build immediately if DOM already loaded
  setTimeout(() => {
    if(typeof DOM_MAP !== 'undefined' && _sortedDOMEntries.length === 0) {
      _sortedDOMEntries = Object.entries(DOM_MAP)
        .sort((a, b) => b[0].length - a[0].length);
    }
  }, 100);
}
