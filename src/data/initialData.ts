import { User, Organization, Project, Sprint, Epic, WorkItem, StatusColumn, ActivityLog, AppNotification } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Laura',
    lastName: 'Rodríguez',
    email: 'laura.rodriguez@vertexsprint.io',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    role: 'owner',
    jobTitle: 'Lead Product Manager',
    timezone: 'America/Mexico_City',
    language: 'es',
    status: 'active',
    organizationIds: ['org-1', 'org-2']
  },
  {
    id: 'usr-2',
    name: 'Carlos',
    lastName: 'Mendoza',
    email: 'carlos.mendoza@vertexsprint.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'scrum_master',
    jobTitle: 'Senior Scrum Master',
    timezone: 'America/Bogota',
    language: 'es',
    status: 'active',
    organizationIds: ['org-1']
  },
  {
    id: 'usr-3',
    name: 'María',
    lastName: 'Fernández',
    email: 'maria.fernandez@vertexsprint.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    role: 'member',
    jobTitle: 'Senior Full Stack Engineer',
    timezone: 'America/Santiago',
    language: 'es',
    status: 'active',
    organizationIds: ['org-1']
  },
  {
    id: 'usr-4',
    name: 'Andrés',
    lastName: 'Silva',
    email: 'andres.silva@vertexsprint.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    role: 'member',
    jobTitle: 'Data Architect & Designer',
    timezone: 'America/Buenos_Aires',
    language: 'es',
    status: 'busy',
    organizationIds: ['org-1']
  },
  {
    id: 'usr-5',
    name: 'Elena',
    lastName: 'Gómez',
    email: 'elena.gomez@vertexsprint.io',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    role: 'observer',
    jobTitle: 'QA Automation Lead',
    timezone: 'America/Lima',
    language: 'es',
    status: 'active',
    organizationIds: ['org-1']
  }
];

export const INITIAL_ORGS: Organization[] = [
  {
    id: 'org-1',
    name: 'Vertex Innovations Corp',
    slug: 'vertex-innovations',
    logoUrl: '/logo.png',
    workType: 'Desarrollo de software',
    templateType: 'scrum',
    ownerId: 'usr-1',
    createdAt: '2026-01-10T08:00:00Z'
  },
  {
    id: 'org-2',
    name: 'Acme Global Labs',
    slug: 'acme-labs',
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
    workType: 'Gestión de productos',
    templateType: 'kanban',
    ownerId: 'usr-1',
    createdAt: '2026-02-01T10:00:00Z'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'prj-1',
    organizationId: 'org-1',
    key: 'VTX',
    name: 'Vertex Core Platform',
    description: 'Sistema principal colaborativo Scrum con soporte de Cronograma de actividades y tableros ágiles.',
    template: 'scrum',
    leadId: 'usr-1',
    avatarColor: 'from-blue-600 to-indigo-600',
    createdAt: '2026-01-15T09:00:00Z',
    currentPhaseId: 'ph-2',
    phases: [
      { id: 'ph-1', name: 'Etapa 1: Descubrimiento & Arquitectura', description: 'Definición de modelo de datos, seguridad RBAC y mockups UX', status: 'completed', targetDate: '2026-07-15' },
      { id: 'ph-2', name: 'Etapa 2: Desarrollo & Sprints Activos', description: 'Ejecución del motor Cronograma (Gantt), tableros y concurrencia', status: 'active', targetDate: '2026-08-30' },
      { id: 'ph-3', name: 'Etapa 3: Control de Calidad & Auditoría', description: 'Pruebas de aislamiento multiempresa y resistencia de carga', status: 'future', targetDate: '2026-09-15' },
      { id: 'ph-4', name: 'Etapa 4: Despliegue Empresarial & Launch', description: 'Puesta en producción y migración de datos de clientes', status: 'future', targetDate: '2026-10-01' }
    ]
  },
  {
    id: 'prj-2',
    organizationId: 'org-1',
    key: 'API',
    name: 'Servicios de Datos & Tiempo Real',
    description: 'Backend distribuido para sincronización por WebSockets y control de concurrencia.',
    template: 'kanban',
    leadId: 'usr-2',
    avatarColor: 'from-violet-600 to-purple-600',
    createdAt: '2026-01-20T11:00:00Z',
    currentPhaseId: 'ph-2b',
    phases: [
      { id: 'ph-1b', name: 'Fase 1: Especificación OpenAPI', description: 'Diseño de contratos de API e idempotencia', status: 'completed', targetDate: '2026-06-30' },
      { id: 'ph-2b', name: 'Fase 2: Motor WebSockets & Concurrencia', description: 'Canales en tiempo real y pub/sub', status: 'active', targetDate: '2026-08-20' },
      { id: 'ph-3b', name: 'Fase 3: Optimización & Caching Redis', description: 'Reducción de latencia a menos de 100ms', status: 'future', targetDate: '2026-09-30' }
    ]
  },
  {
    id: 'prj-3',
    organizationId: 'org-1',
    key: 'SAF',
    name: 'Transformación Ágil SAFe Enterprise',
    description: 'Marco ágil escalado para coordinación de múltiples trenes de entrega (ARTs) y portafolio.',
    template: 'safe',
    leadId: 'usr-3',
    avatarColor: 'from-emerald-600 to-teal-600',
    createdAt: '2026-02-01T10:00:00Z',
    currentPhaseId: 'ph-1c',
    phases: [
      { id: 'ph-1c', name: 'PI Planning Q3', description: 'Planificación de Incremento de Programa y alineación de equipos', status: 'active', targetDate: '2026-08-31' },
      { id: 'ph-2c', name: 'Ejecución de Trenes de Valor', description: 'Entregas coordinadas a través de 4 equipos Scrum', status: 'future', targetDate: '2026-11-30' }
    ]
  }
];

export const INITIAL_COLUMNS: StatusColumn[] = [
  { id: 'col-todo', name: 'Por Hacer', category: 'todo', color: '#64748b', order: 1 },
  { id: 'col-inprogress', name: 'En Progreso', category: 'in_progress', color: '#3b82f6', order: 2, wipLimit: 5 },
  { id: 'col-review', name: 'En Revisión', category: 'review', color: '#8b5cf6', order: 3 },
  { id: 'col-done', name: 'Finalizado', category: 'done', color: '#10b981', order: 4 }
];

export const INITIAL_SPRINTS: Sprint[] = [
  {
    id: 'sp-14',
    projectId: 'prj-1',
    name: 'Sprint 14 - Motor Cronograma & Concurrencia',
    goal: 'Entregar la vista interactiva de Cronograma (Gantt), control de bloqueos optimistas y reportes Scrum.',
    startDate: '2026-08-01',
    endDate: '2026-08-15',
    status: 'active',
    initialCommitmentPoints: 24,
    completedPoints: 11
  },
  {
    id: 'sp-15',
    projectId: 'prj-1',
    name: 'Sprint 15 - SSO & Automatización Empresarial',
    goal: 'Integración SSO SAML, reglas de automatización personalizadas y auditoría exportable.',
    startDate: '2026-08-16',
    endDate: '2026-08-30',
    status: 'future',
    initialCommitmentPoints: 18,
    completedPoints: 0
  }
];

export const INITIAL_EPICS: Epic[] = [
  {
    id: 'ep-1',
    projectId: 'prj-1',
    key: 'VTX-E1',
    title: 'Visualización de Cronograma de Actividades (Gantt)',
    color: '#3b82f6',
    status: 'in_progress',
    startDate: '2026-08-01',
    targetDate: '2026-08-20'
  },
  {
    id: 'ep-2',
    projectId: 'prj-1',
    key: 'VTX-E2',
    title: 'Colaboración Simultánea y Prevención de Conflictos',
    color: '#8b5cf6',
    status: 'in_progress',
    startDate: '2026-08-03',
    targetDate: '2026-08-25'
  },
  {
    id: 'ep-3',
    projectId: 'prj-1',
    key: 'VTX-E3',
    title: 'Seguridad Multiempresa y Permisos RBAC',
    color: '#10b981',
    status: 'to_do',
    startDate: '2026-08-10',
    targetDate: '2026-09-05'
  }
];

export const INITIAL_WORK_ITEMS: WorkItem[] = [
  {
    id: 'wi-101',
    organizationId: 'org-1',
    projectId: 'prj-1',
    key: 'VTX-101',
    title: 'Diseñar e implementar componente interactivo de Cronograma (Gantt Chart)',
    description: 'Construir la vista visual de cronograma de actividades con barras de tiempo drag-and-drop, indicador de sprints y líneas de dependencias entre tareas.',
    type: 'story',
    statusId: 'col-inprogress',
    priority: 'highest',
    storyPoints: 8,
    estimatedHours: 16,
    loggedHours: 10,
    assigneeId: 'usr-3',
    reporterId: 'usr-1',
    epicId: 'ep-1',
    sprintId: 'sp-14',
    acceptanceCriteria: [
      { id: 'ac-1', text: 'Visualizar tareas distribuidas en escala temporal de días y semanas', met: true },
      { id: 'ac-2', text: 'Permitir arrastrar bordes para ajustar la fecha de inicio y entrega', met: true },
      { id: 'ac-3', text: 'Reflejar cambios en tiempo real en el tablero Scrum', met: false }
    ],
    subtasks: [
      { id: 'st-1', title: 'Diseñar grilla CSS de calendario cronograma', completed: true },
      { id: 'st-2', title: 'Conectar eventos de cambio de fechas con la API de estado', completed: true },
      { id: 'st-3', title: 'Añadir leyendas de prioridad y sprint activo', completed: false }
    ],
    tags: ['Frontend', 'Cronograma', 'UX'],
    watchers: ['usr-1', 'usr-2', 'usr-3'],
    startDate: '2026-08-01',
    dueDate: '2026-08-08',
    version: 1,
    createdAt: '2026-08-01T09:30:00Z',
    updatedAt: '2026-08-05T10:15:00Z'
  },
  {
    id: 'wi-102',
    organizationId: 'org-1',
    projectId: 'prj-1',
    key: 'VTX-102',
    title: 'Motor de Concurrencia Optimista y Detección de Conflictos de Edición',
    description: 'Prevenir sobrescrituras silenciosas cuando dos usuarios modifican la misma tarjeta al mismo tiempo mediante un campo de versión incremental.',
    type: 'task',
    statusId: 'col-inprogress',
    priority: 'high',
    storyPoints: 5,
    estimatedHours: 12,
    loggedHours: 6,
    assigneeId: 'usr-4',
    reporterId: 'usr-2',
    epicId: 'ep-2',
    sprintId: 'sp-14',
    acceptanceCriteria: [
      { id: 'ac-4', text: 'Detectar choque de version en el servidor / cliente', met: true },
      { id: 'ac-5', text: 'Mostrar modal interactivo para comparar cambios y resolver conflictos', met: false }
    ],
    subtasks: [
      { id: 'st-4', title: 'Incluir timestamp y versionId en payload', completed: true },
      { id: 'st-5', title: 'Crear componente UI ConflictResolverModal', completed: false }
    ],
    tags: ['Arquitectura', 'Seguridad', 'Backend'],
    watchers: ['usr-1', 'usr-4'],
    startDate: '2026-08-02',
    dueDate: '2026-08-10',
    version: 2,
    createdAt: '2026-08-02T11:00:00Z',
    updatedAt: '2026-08-05T11:45:00Z'
  },
  {
    id: 'wi-103',
    organizationId: 'org-1',
    projectId: 'prj-1',
    key: 'VTX-103',
    title: 'Generar reportes ágiles: Burndown Chart, Velocidad y CFD',
    description: 'Implementar gráficos dinámicos que permitan a los equipos visualizar el progreso del sprint y detectar cuellos de botella en tiempo real.',
    type: 'story',
    statusId: 'col-done',
    priority: 'medium',
    storyPoints: 3,
    estimatedHours: 8,
    loggedHours: 8,
    assigneeId: 'usr-3',
    reporterId: 'usr-2',
    epicId: 'ep-1',
    sprintId: 'sp-14',
    acceptanceCriteria: [
      { id: 'ac-6', text: 'Calcular velocidad promedio de los últimos sprints', met: true },
      { id: 'ac-7', text: 'Exportar informe en formato PDF / JSON', met: true }
    ],
    subtasks: [
      { id: 'st-6', title: 'Algoritmo de burndown diario', completed: true },
      { id: 'st-7', title: 'Renderizado SVG responsive', completed: true }
    ],
    tags: ['Analytics', 'Scrum'],
    watchers: ['usr-2'],
    startDate: '2026-08-01',
    dueDate: '2026-08-05',
    version: 1,
    createdAt: '2026-08-01T14:00:00Z',
    updatedAt: '2026-08-05T09:00:00Z'
  },
  {
    id: 'wi-104',
    organizationId: 'org-1',
    projectId: 'prj-1',
    key: 'VTX-104',
    title: 'Wizard de Onboarding para la creación acelerada de Espacios de Trabajo',
    description: 'GUI guiada en 5 pasos para configurar tipo de trabajo, plantilla (Scrum/Kanban), tipos de actividades y estados personalizados.',
    type: 'story',
    statusId: 'col-done',
    priority: 'high',
    storyPoints: 5,
    estimatedHours: 10,
    loggedHours: 10,
    assigneeId: 'usr-4',
    reporterId: 'usr-1',
    epicId: 'ep-1',
    sprintId: 'sp-14',
    acceptanceCriteria: [
      { id: 'ac-8', text: 'Diseño fiel al flujo intuitivo de alta experiencia de usuario', met: true }
    ],
    subtasks: [],
    tags: ['Onboarding', 'UX'],
    watchers: ['usr-1'],
    startDate: '2026-08-01',
    dueDate: '2026-08-04',
    version: 1,
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-04T18:00:00Z'
  },
  {
    id: 'wi-105',
    organizationId: 'org-1',
    projectId: 'prj-1',
    key: 'VTX-105',
    title: 'Corregir error en cálculo de puntos al mover subtareas entre sprints',
    description: 'Cuando una subtarea se mueve de sprint independientemente del padre, el reporte de capacidad del sprint no contabilizaba la fracción estimada.',
    type: 'bug',
    statusId: 'col-todo',
    priority: 'high',
    storyPoints: 2,
    estimatedHours: 4,
    loggedHours: 0,
    assigneeId: 'usr-3',
    reporterId: 'usr-5',
    sprintId: 'sp-14',
    acceptanceCriteria: [
      { id: 'ac-9', text: 'Las subtareas deben mantener su alineación de sprint con el elemento padre', met: false }
    ],
    subtasks: [],
    tags: ['Bug', 'Scrum-Rules'],
    watchers: ['usr-5', 'usr-2'],
    startDate: '2026-08-06',
    dueDate: '2026-08-12',
    version: 1,
    createdAt: '2026-08-04T16:20:00Z',
    updatedAt: '2026-08-04T16:20:00Z'
  },
  {
    id: 'wi-106',
    organizationId: 'org-1',
    projectId: 'prj-1',
    key: 'VTX-106',
    title: 'Aislamiento estricto Multi-Tenant y matriz de permisos por Rol (RBAC)',
    description: 'Garantizar que ninguna consulta de API ni interfaz exponga datos de otra organización. Validar permisos en servidor y UI.',
    type: 'task',
    statusId: 'col-review',
    priority: 'highest',
    storyPoints: 8,
    estimatedHours: 16,
    loggedHours: 14,
    assigneeId: 'usr-1',
    reporterId: 'usr-1',
    epicId: 'ep-3',
    sprintId: 'sp-14',
    acceptanceCriteria: [
      { id: 'ac-10', text: 'Filtro obligatorio tenant_id en todas las consultas', met: true },
      { id: 'ac-11', text: 'Validar rol Owner/Admin para acciones de auditoría y respaldo', met: true }
    ],
    subtasks: [
      { id: 'st-8', title: 'Revisión de endpoints de exportación JSON', completed: true },
      { id: 'st-9', title: 'Pruebas de intento de salto de organización', completed: true }
    ],
    tags: ['Security', 'Multi-tenant'],
    watchers: ['usr-1', 'usr-2', 'usr-5'],
    startDate: '2026-08-02',
    dueDate: '2026-08-07',
    version: 1,
    createdAt: '2026-08-02T08:00:00Z',
    updatedAt: '2026-08-05T08:30:00Z'
  },
  {
    id: 'wi-107',
    organizationId: 'org-1',
    projectId: 'prj-1',
    key: 'VTX-107',
    title: 'Módulo de Backup, Restauración en caliente y exportación de Auditoría',
    description: 'Permitir a los administradores descargar una copia completa en JSON del estado de la empresa y restaurarla con verificación de integridad.',
    type: 'story',
    statusId: 'col-todo',
    priority: 'medium',
    storyPoints: 5,
    estimatedHours: 10,
    loggedHours: 0,
    assigneeId: undefined, // unassigned
    reporterId: 'usr-1',
    epicId: 'ep-3',
    sprintId: undefined, // backlog
    acceptanceCriteria: [
      { id: 'ac-12', text: 'Validación de esquema JSON al importar', met: false }
    ],
    subtasks: [],
    tags: ['DevOps', 'Backup'],
    watchers: ['usr-1'],
    startDate: '2026-08-16',
    dueDate: '2026-08-25',
    version: 1,
    createdAt: '2026-08-03T15:00:00Z',
    updatedAt: '2026-08-03T15:00:00Z'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    organizationId: 'org-1',
    projectId: 'prj-1',
    issueId: 'wi-101',
    issueKey: 'VTX-101',
    actorId: 'usr-3',
    actorName: 'María Fernández',
    action: 'Cambio de Estado',
    details: 'Cambió el estado de "Por Hacer" a "En Progreso"',
    timestamp: '2026-08-05T10:15:00Z'
  },
  {
    id: 'act-2',
    organizationId: 'org-1',
    projectId: 'prj-1',
    issueId: 'wi-102',
    issueKey: 'VTX-102',
    actorId: 'usr-4',
    actorName: 'Andrés Silva',
    action: 'Actualización de Concurrencia',
    details: 'Incrementó la versión del ítem a v2 tras editar criterios de aceptación',
    timestamp: '2026-08-05T11:45:00Z'
  },
  {
    id: 'act-3',
    organizationId: 'org-1',
    projectId: 'prj-1',
    actorId: 'usr-2',
    actorName: 'Carlos Mendoza',
    action: 'Inicio de Sprint',
    details: 'Inició el "Sprint 14 - Motor Cronograma & Concurrencia"',
    timestamp: '2026-08-01T09:00:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    userId: 'usr-1',
    title: 'Nueva asignación',
    message: 'Carlos Mendoza te asignó la tarea VTX-106 (Aislamiento Multi-tenant).',
    type: 'assignment',
    read: false,
    createdAt: '2026-08-05T08:30:00Z',
    issueId: 'wi-106'
  },
  {
    id: 'notif-2',
    userId: 'usr-1',
    title: 'Mención en comentario',
    message: 'María Fernández te mencionó en VTX-101: "@Laura revisa la grilla del cronograma de actividades".',
    type: 'mention',
    read: false,
    createdAt: '2026-08-05T10:16:00Z',
    issueId: 'wi-101'
  },
  {
    id: 'notif-3',
    userId: 'usr-1',
    title: 'Progreso de Sprint',
    message: 'El Sprint 14 ha alcanzado el 45% del trabajo completado.',
    type: 'sprint',
    read: true,
    createdAt: '2026-08-04T18:00:00Z'
  }
];
