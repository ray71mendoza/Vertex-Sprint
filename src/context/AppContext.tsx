import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, Organization, Project, Sprint, Epic, WorkItem, 
  StatusColumn, ActivityLog, AppNotification, OnboardingState, WorkItemPriority, WorkItemType 
} from '../types';
import { 
  INITIAL_USERS, INITIAL_ORGS, INITIAL_PROJECTS, 
  INITIAL_COLUMNS, INITIAL_SPRINTS, INITIAL_EPICS, 
  INITIAL_WORK_ITEMS, INITIAL_ACTIVITY_LOGS, INITIAL_NOTIFICATIONS 
} from '../data/initialData';

interface ConflictInfo {
  existingItem: WorkItem;
  attemptedChanges: Partial<WorkItem>;
}

interface AppContextType {
  // Current session context
  currentUser: User;
  setCurrentUser: (user: User) => void;
  currentOrg: Organization;
  setCurrentOrg: (org: Organization) => void;
  currentProject: Project;
  setCurrentProject: (project: Project) => void;

  // Domain state
  users: User[];
  organizations: Organization[];
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  sprints: Sprint[];
  epics: Epic[];
  workItems: WorkItem[];
  columns: StatusColumn[];
  activityLogs: ActivityLog[];
  notifications: AppNotification[];

  // Onboarding
  onboarding: OnboardingState;
  setOnboarding: React.Dispatch<React.SetStateAction<OnboardingState>>;
  finishOnboarding: (newOrg: Organization, newProject: Project) => void;

  // Active view
  activeView: 'dashboard' | 'board' | 'backlog' | 'timeline' | 'mywork' | 'reports' | 'teams' | 'admin';
  setActiveView: (view: 'dashboard' | 'board' | 'backlog' | 'timeline' | 'mywork' | 'reports' | 'teams' | 'admin') => void;

  // Selected work item for detail modal
  selectedItem: WorkItem | null;
  setSelectedItem: (item: WorkItem | null) => void;

  // Conflict modal state
  conflictInfo: ConflictInfo | null;
  setConflictInfo: (info: ConflictInfo | null) => void;

  // Theme Mode
  themeMode: 'dark' | 'light';
  toggleThemeMode: () => void;

  // Real-time collaborative simulation mode
  isLiveSyncEnabled: boolean;
  setIsLiveSyncEnabled: (enabled: boolean) => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterAssignee: string;
  setFilterAssignee: (assignee: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  filterPriority: string;
  setFilterPriority: (priority: string) => void;

  // Operations
  addWorkItem: (item: Omit<WorkItem, 'id' | 'key' | 'version' | 'createdAt' | 'updatedAt' | 'organizationId'>) => WorkItem;
  updateWorkItem: (id: string, changes: Partial<WorkItem>, expectedVersion?: number) => boolean;
  deleteWorkItem: (id: string) => void;
  moveWorkItemStatus: (id: string, newStatusId: string) => void;
  
  createSprint: (name: string, goal: string, startDate: string, endDate: string) => Sprint;
  startSprint: (sprintId: string) => void;
  completeSprint: (sprintId: string, moveRemainingTo: 'backlog' | string) => void;

  addComment: (issueId: string, text: string) => void;
  inviteUser: (email: string, role: User['role']) => void;

  // Backup & Restore
  exportDataJSON: () => string;
  importDataJSON: (jsonString: string) => boolean;
  resetToSampleData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'vertex_sprint_data_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state or local storage
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [organizations, setOrganizations] = useState<Organization[]>(INITIAL_ORGS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [columns, setColumns] = useState<StatusColumn[]>(INITIAL_COLUMNS);
  const [sprints, setSprints] = useState<Sprint[]>(INITIAL_SPRINTS);
  const [epics, setEpics] = useState<Epic[]>(INITIAL_EPICS);
  const [workItems, setWorkItems] = useState<WorkItem[]>(INITIAL_WORK_ITEMS);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(INITIAL_ACTIVITY_LOGS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // Active Session
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]);
  const [currentOrg, setCurrentOrg] = useState<Organization>(INITIAL_ORGS[0]);
  const [currentProject, setCurrentProject] = useState<Project>(INITIAL_PROJECTS[0]);

  // Theme State
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('vertex_sprint_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setThemeMode(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('vertex_sprint_theme', themeMode);
  }, [themeMode]);

  const toggleThemeMode = () => {
    setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Views & Modals
  const [activeView, setActiveView] = useState<'dashboard' | 'board' | 'backlog' | 'timeline' | 'mywork' | 'reports' | 'teams' | 'admin'>('dashboard');
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const [conflictInfo, setConflictInfo] = useState<ConflictInfo | null>(null);
  const [isLiveSyncEnabled, setIsLiveSyncEnabled] = useState<boolean>(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAssignee, setFilterAssignee] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  // Onboarding Wizard State
  const [onboarding, setOnboarding] = useState<OnboardingState>({
    step: 1,
    workType: 'Desarrollo de software',
    templateType: 'scrum',
    spaceName: 'Mi equipo de gestión de proyectos',
    selectedActivityTypes: ['epic', 'story', 'task', 'bug'],
    customStatuses: [
      { id: 'col-todo', name: 'Por hacer', category: 'todo' },
      { id: 'col-inprogress', name: 'En curso', category: 'in_progress' },
      { id: 'col-review', name: 'En revisión', category: 'review' },
      { id: 'col-done', name: 'Finalizado', category: 'done' }
    ],
    isCompleted: true // Set to false to trigger wizard flow, or toggle from UI
  });

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.workItems) setWorkItems(parsed.workItems);
        if (parsed.sprints) setSprints(parsed.sprints);
        if (parsed.epics) setEpics(parsed.epics);
        if (parsed.organizations) setOrganizations(parsed.organizations);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.activityLogs) setActivityLogs(parsed.activityLogs);
      }
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    try {
      const dataToSave = {
        workItems,
        sprints,
        epics,
        organizations,
        projects,
        activityLogs
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('Error saving state to localStorage:', e);
    }
  }, [workItems, sprints, epics, organizations, projects, activityLogs]);

  // Collaborative Real-Time Live Sync Simulation Effect
  useEffect(() => {
    if (!isLiveSyncEnabled) return;

    const interval = setInterval(() => {
      // Simulate random background team activity every 25 seconds
      const randomItem = workItems[Math.floor(Math.random() * workItems.length)];
      if (!randomItem) return;

      const mockActors = users.filter(u => u.id !== currentUser.id);
      const randomActor = mockActors[Math.floor(Math.random() * mockActors.length)];
      if (!randomActor) return;

      const randomMessages = [
        `actualizó la estimación a ${Math.floor(Math.random() * 8) + 1} story points`,
        `añadió un comentario técnico en la tarea`,
        `revisó los criterios de aceptación`
      ];
      const randomMsg = randomMessages[Math.floor(Math.random() * randomMessages.length)];

      const newLog: ActivityLog = {
        id: `act-${Date.now()}`,
        organizationId: currentOrg.id,
        projectId: currentProject.id,
        issueId: randomItem.id,
        issueKey: randomItem.key,
        actorId: randomActor.id,
        actorName: `${randomActor.name} ${randomActor.lastName}`,
        action: 'Sincronización en vivo',
        details: randomMsg,
        timestamp: new Date().toISOString()
      };

      setActivityLogs(prev => [newLog, ...prev]);

      // If selected item matches, update version silently to simulate incoming live edit
      if (selectedItem && selectedItem.id === randomItem.id) {
        setWorkItems(prev => prev.map(item => {
          if (item.id === randomItem.id) {
            return {
              ...item,
              version: item.version + 1,
              updatedAt: new Date().toISOString()
            };
          }
          return item;
        }));
      }
    }, 25000);

    return () => clearInterval(interval);
  }, [isLiveSyncEnabled, workItems, users, currentUser, currentOrg, currentProject, selectedItem]);

  // Log activity helper
  const logActivity = (action: string, details: string, issueId?: string, issueKey?: string) => {
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      organizationId: currentOrg.id,
      projectId: currentProject.id,
      issueId,
      issueKey,
      actorId: currentUser.id,
      actorName: `${currentUser.name} ${currentUser.lastName}`,
      action,
      details,
      timestamp: new Date().toISOString()
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Add work item
  const addWorkItem = (itemData: Omit<WorkItem, 'id' | 'key' | 'version' | 'createdAt' | 'updatedAt' | 'organizationId'>): WorkItem => {
    const projectItems = workItems.filter(i => i.projectId === currentProject.id);
    const itemNum = projectItems.length + 101;
    const key = `${currentProject.key}-${itemNum}`;

    const newItem: WorkItem = {
      ...itemData,
      id: `wi-${Date.now()}`,
      organizationId: currentOrg.id,
      key,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setWorkItems(prev => [newItem, ...prev]);
    logActivity('Creación de elemento', `Creó la tarea ${newItem.key}: "${newItem.title}"`, newItem.id, newItem.key);

    return newItem;
  };

  // Update work item with Optimistic Concurrency Control!
  const updateWorkItem = (id: string, changes: Partial<WorkItem>, expectedVersion?: number): boolean => {
    const existing = workItems.find(i => i.id === id);
    if (!existing) return false;

    // Check version conflict if expectedVersion is provided
    if (expectedVersion !== undefined && existing.version !== expectedVersion) {
      // Version Conflict Detected!
      setConflictInfo({
        existingItem: existing,
        attemptedChanges: changes
      });
      return false;
    }

    const updatedItem: WorkItem = {
      ...existing,
      ...changes,
      version: existing.version + 1,
      updatedAt: new Date().toISOString()
    };

    setWorkItems(prev => prev.map(item => item.id === id ? updatedItem : item));
    if (selectedItem?.id === id) {
      setSelectedItem(updatedItem);
    }

    logActivity('Edición de elemento', `Actualizó campos en ${updatedItem.key} (v${updatedItem.version})`, updatedItem.id, updatedItem.key);

    // Notify assignee if assignee changed
    if (changes.assigneeId && changes.assigneeId !== currentUser.id) {
      const newNotif: AppNotification = {
        id: `notif-${Date.now()}`,
        userId: changes.assigneeId,
        title: 'Tarea asignada',
        message: `${currentUser.name} ${currentUser.lastName} te ha asignado la tarea ${updatedItem.key}.`,
        type: 'assignment',
        read: false,
        createdAt: new Date().toISOString(),
        issueId: updatedItem.id
      };
      setNotifications(prev => [newNotif, ...prev]);
    }

    return true;
  };

  // Move work item status
  const moveWorkItemStatus = (id: string, newStatusId: string) => {
    const item = workItems.find(i => i.id === id);
    if (!item) return;
    const oldCol = columns.find(c => c.id === item.statusId)?.name || item.statusId;
    const newCol = columns.find(c => c.id === newStatusId)?.name || newStatusId;

    updateWorkItem(id, { statusId: newStatusId });
    logActivity('Movimiento en Tablero', `Movió ${item.key} de "${oldCol}" a "${newCol}"`, item.id, item.key);
  };

  // Delete work item
  const deleteWorkItem = (id: string) => {
    const item = workItems.find(i => i.id === id);
    if (!item) return;
    setWorkItems(prev => prev.filter(i => i.id !== id));
    if (selectedItem?.id === id) setSelectedItem(null);
    logActivity('Eliminación', `Eliminó el elemento ${item.key}`, item.id, item.key);
  };

  // Sprint actions
  const createSprint = (name: string, goal: string, startDate: string, endDate: string): Sprint => {
    const newSprint: Sprint = {
      id: `sp-${Date.now()}`,
      projectId: currentProject.id,
      name,
      goal,
      startDate,
      endDate,
      status: 'future',
      initialCommitmentPoints: 0,
      completedPoints: 0
    };
    setSprints(prev => [...prev, newSprint]);
    logActivity('Creación de Sprint', `Creó el sprint "${name}"`);
    return newSprint;
  };

  const startSprint = (sprintId: string) => {
    const sprintItems = workItems.filter(i => i.sprintId === sprintId);
    const totalPoints = sprintItems.reduce((acc, i) => acc + (i.storyPoints || 0), 0);

    setSprints(prev => prev.map(s => {
      if (s.id === sprintId) {
        return {
          ...s,
          status: 'active',
          initialCommitmentPoints: totalPoints
        };
      }
      return s;
    }));

    const sprint = sprints.find(s => s.id === sprintId);
    logActivity('Inicio de Sprint', `Inició el ${sprint?.name || sprintId} con un compromiso de ${totalPoints} puntos de historia.`);
  };

  const completeSprint = (sprintId: string, moveRemainingTo: 'backlog' | string) => {
    const doneColId = columns.find(c => c.category === 'done')?.id || 'col-done';
    const sprintItems = workItems.filter(i => i.sprintId === sprintId);
    const completedItems = sprintItems.filter(i => i.statusId === doneColId);
    const incompleteItems = sprintItems.filter(i => i.statusId !== doneColId);

    const completedPts = completedItems.reduce((acc, i) => acc + (i.storyPoints || 0), 0);

    // Update incomplete items target sprint/backlog
    setWorkItems(prev => prev.map(item => {
      if (item.sprintId === sprintId && item.statusId !== doneColId) {
        return {
          ...item,
          sprintId: moveRemainingTo === 'backlog' ? undefined : moveRemainingTo
        };
      }
      return item;
    }));

    // Update sprint status
    setSprints(prev => prev.map(s => {
      if (s.id === sprintId) {
        return {
          ...s,
          status: 'completed',
          completedPoints: completedPts
        };
      }
      return s;
    }));

    const sprint = sprints.find(s => s.id === sprintId);
    logActivity('Cierre de Sprint', `Completó el ${sprint?.name}. Se completaron ${completedPts} puntos. ${incompleteItems.length} elementos incompletos transferidos.`);
  };

  // Add Comment
  const addComment = (issueId: string, text: string) => {
    const item = workItems.find(i => i.id === issueId);
    if (!item) return;

    // Check for @mentions in comment text
    const mentions = text.match(/@(\w+)/g);
    if (mentions) {
      mentions.forEach(m => {
        const username = m.substring(1).toLowerCase();
        const targetUser = users.find(u => u.name.toLowerCase().includes(username) || u.lastName.toLowerCase().includes(username));
        if (targetUser && targetUser.id !== currentUser.id) {
          setNotifications(prev => [
            {
              id: `notif-${Date.now()}`,
              userId: targetUser.id,
              title: 'Mención en comentario',
              message: `${currentUser.name} te ha mencionado en ${item.key}: "${text.substring(0, 40)}..."`,
              type: 'mention',
              read: false,
              createdAt: new Date().toISOString(),
              issueId
            },
            ...prev
          ]);
        }
      });
    }

    logActivity('Comentario', `Añadió un comentario en ${item.key}`, item.id, item.key);
  };

  // Invite User
  const inviteUser = (email: string, role: User['role']) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      lastName: '',
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      role,
      jobTitle: 'Miembro invitado',
      timezone: 'America/Mexico_City',
      language: 'es',
      status: 'active',
      organizationIds: [currentOrg.id]
    };

    setUsers(prev => [...prev, newUser]);
    logActivity('Invitación de Usuario', `Invitó a ${email} con el rol de ${role}.`);
  };

  // Backup & Restore
  const exportDataJSON = (): string => {
    return JSON.stringify({
      version: '1.0',
      timestamp: new Date().toISOString(),
      organization: currentOrg,
      project: currentProject,
      users,
      workItems,
      sprints,
      epics,
      activityLogs
    }, null, 2);
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.workItems) setWorkItems(parsed.workItems);
      if (parsed.sprints) setSprints(parsed.sprints);
      if (parsed.epics) setEpics(parsed.epics);
      logActivity('Restauración de Copia', 'Se importó correctamente una copia de seguridad en JSON.');
      return true;
    } catch (e) {
      console.error('Error importing JSON backup:', e);
      return false;
    }
  };

  const resetToSampleData = () => {
    setWorkItems(INITIAL_WORK_ITEMS);
    setSprints(INITIAL_SPRINTS);
    setEpics(INITIAL_EPICS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    logActivity('Reinicio de Datos', 'Se restablecieron los datos de ejemplo iniciales.');
  };

  // Finish Onboarding
  const finishOnboarding = (newOrg: Organization, newProject: Project) => {
    setOrganizations(prev => [...prev, newOrg]);
    setProjects(prev => [...prev, newProject]);
    setCurrentOrg(newOrg);
    setCurrentProject(newProject);
    setOnboarding(prev => ({ ...prev, isCompleted: true }));
    setActiveView('board');
  };

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      currentOrg, setCurrentOrg,
      currentProject, setCurrentProject,
      users, organizations, projects, setProjects, sprints, epics, workItems, columns, activityLogs, notifications,
      onboarding, setOnboarding, finishOnboarding,
      activeView, setActiveView,
      selectedItem, setSelectedItem,
      conflictInfo, setConflictInfo,
      themeMode, toggleThemeMode,
      isLiveSyncEnabled, setIsLiveSyncEnabled,
      searchQuery, setSearchQuery,
      filterAssignee, setFilterAssignee,
      filterType, setFilterType,
      filterPriority, setFilterPriority,
      addWorkItem, updateWorkItem, deleteWorkItem, moveWorkItemStatus,
      createSprint, startSprint, completeSprint,
      addComment, inviteUser,
      exportDataJSON, importDataJSON, resetToSampleData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
