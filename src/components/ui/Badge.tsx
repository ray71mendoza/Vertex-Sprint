import React from 'react';
import { WorkItemType, WorkItemPriority } from '../../types';
import { 
  Bookmark, 
  CheckSquare, 
  CheckCircle2, 
  Bug, 
  GitCommit, 
  ChevronUp, 
  ChevronDown, 
  AlertOctagon, 
  Minus 
} from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium rounded',
    md: 'text-xs px-2.5 py-1 font-semibold rounded-md',
  };

  const variantStyles = {
    default: 'bg-vertex-quartzGrey/30 text-vertex-ink dark:bg-vertex-darkSurfaceElevated dark:text-vertex-facetIce border border-vertex-quartzGrey/40 dark:border-vertex-facetIce/20',
    primary: 'bg-vertex-apexTeal/15 text-vertex-apexTeal dark:bg-vertex-prismBlue/20 dark:text-vertex-prismBlue border border-vertex-apexTeal/30 dark:border-vertex-prismBlue/30',
    success: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30',
    danger: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30',
    info: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-500/30',
    outline: 'bg-transparent text-vertex-ink dark:text-vertex-polarWhite border border-vertex-quartzGrey dark:border-vertex-facetIce/30',
  };

  return (
    <span className={`inline-flex items-center gap-1 leading-none select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const TypeBadge: React.FC<{ type: WorkItemType; showLabel?: boolean; className?: string }> = ({
  type,
  showLabel = true,
  className = '',
}) => {
  const config = {
    epic: { label: 'Épica', icon: Bookmark, class: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30' },
    story: { label: 'Historia', icon: CheckSquare, class: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30' },
    task: { label: 'Tarea', icon: CheckCircle2, class: 'bg-sky-500/15 text-sky-600 dark:text-sky-300 border-sky-500/30' },
    bug: { label: 'Error', icon: Bug, class: 'bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30' },
    subtask: { label: 'Subtarea', icon: GitCommit, class: 'bg-slate-500/15 text-slate-600 dark:text-slate-300 border-slate-500/30' },
  };

  const current = config[type] || config.task;
  const Icon = current.icon;

  return (
    <span 
      title={current.label}
      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border select-none ${current.class} ${className}`}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      {showLabel && <span>{current.label}</span>}
    </span>
  );
};

export const PriorityBadge: React.FC<{ priority: WorkItemPriority; showLabel?: boolean; className?: string }> = ({
  priority,
  showLabel = true,
  className = '',
}) => {
  const config = {
    highest: { label: 'Muy Alta', icon: AlertOctagon, class: 'text-rose-500 bg-rose-500/10 border-rose-500/30' },
    high: { label: 'Alta', icon: ChevronUp, class: 'text-orange-500 bg-orange-500/10 border-orange-500/30' },
    medium: { label: 'Media', icon: Minus, class: 'text-amber-500 bg-amber-500/10 border-amber-500/30' },
    low: { label: 'Baja', icon: ChevronDown, class: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' },
    lowest: { label: 'Muy Baja', icon: ChevronDown, class: 'text-slate-400 bg-slate-500/10 border-slate-500/30' },
  };

  const current = config[priority] || config.medium;
  const Icon = current.icon;

  return (
    <span 
      title={`Prioridad: ${current.label}`}
      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border select-none ${current.class} ${className}`}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      {showLabel && <span>{current.label}</span>}
    </span>
  );
};
