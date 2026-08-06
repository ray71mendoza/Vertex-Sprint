export type UserRole = 
  | 'owner' 
  | 'admin' 
  | 'scrum_master' 
  | 'member' 
  | 'limited_collaborator' 
  | 'observer';

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  avatar: string;
  role: UserRole;
  jobTitle?: string;
  timezone: string;
  language: string;
  status?: 'active' | 'busy' | 'offline';
  organizationIds: string[];
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  workType?: string;
  templateType?: 'scrum' | 'kanban' | 'project_mgmt';
  ownerId: string;
  createdAt: string;
}

export interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'active' | 'future';
  targetDate?: string;
}

export interface Project {
  id: string;
  organizationId: string;
  key: string; // e.g. "VTX"
  name: string;
  description: string;
  template: 'scrum' | 'kanban' | 'safe' | 'scrumban' | 'project_mgmt';
  leadId: string;
  avatarColor: string;
  createdAt: string;
  phases?: ProjectPhase[];
  currentPhaseId?: string;
}

export interface Sprint {
  id: string;
  projectId: string;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  status: 'future' | 'active' | 'completed';
  initialCommitmentPoints?: number;
  completedPoints?: number;
}

export interface Epic {
  id: string;
  projectId: string;
  key: string;
  title: string;
  description?: string;
  color: string;
  status: 'to_do' | 'in_progress' | 'done';
  startDate?: string;
  targetDate?: string;
}

export type WorkItemType = 'epic' | 'story' | 'task' | 'bug' | 'subtask';
export type WorkItemPriority = 'highest' | 'high' | 'medium' | 'low' | 'lowest';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface AcceptanceCriterion {
  id: string;
  text: string;
  met: boolean;
}

export interface Comment {
  id: string;
  issueId: string;
  authorId: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
  reactions?: Record<string, string[]>; // emoji -> array of userIds
}

export interface WorkItem {
  id: string;
  organizationId: string;
  projectId: string;
  key: string; // e.g. "VTX-101"
  title: string;
  description: string;
  type: WorkItemType;
  statusId: string; // references Status.id
  priority: WorkItemPriority;
  storyPoints?: number;
  estimatedHours?: number;
  loggedHours?: number;
  assigneeId?: string;
  reporterId: string;
  epicId?: string;
  sprintId?: string; // null means backlog
  parentId?: string; // for subtasks
  acceptanceCriteria: AcceptanceCriterion[];
  subtasks: Subtask[];
  tags: string[];
  watchers: string[];
  startDate?: string;
  dueDate?: string;
  version: number; // for optimistic concurrency locking
  createdAt: string;
  updatedAt: string;
}

export interface StatusColumn {
  id: string;
  name: string;
  category: 'todo' | 'in_progress' | 'review' | 'done';
  color: string;
  wipLimit?: number;
  order: number;
}

export interface ActivityLog {
  id: string;
  organizationId: string;
  projectId?: string;
  issueId?: string;
  issueKey?: string;
  actorId: string;
  actorName: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'mention' | 'assignment' | 'status_change' | 'sprint' | 'system';
  read: boolean;
  createdAt: string;
  issueId?: string;
}

export interface OnboardingState {
  step: number; // 1 to 5
  workType: string;
  templateType: 'scrum' | 'kanban' | 'project_mgmt';
  spaceName: string;
  selectedActivityTypes: string[];
  customStatuses: { id: string; name: string; category: 'todo' | 'in_progress' | 'review' | 'done' }[];
  isCompleted: boolean;
}
