import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { TypeBadge, PriorityBadge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { 
  CheckCircle2, Clock, Calendar, AlertTriangle, Layers, 
  Activity, ArrowRight, Zap, TrendingUp, ChevronRight, Sparkles, Filter
} from 'lucide-react';

export const ProjectSummary: React.FC = () => {
  const { currentProject, workItems, sprints, activityLogs, users, epics, setSelectedItem, setActiveView } = useApp();

  const projectItems = workItems.filter(i => i.projectId === currentProject.id || !i.projectId);

  // Metrics
  const completedItems = projectItems.filter(i => i.statusId === 'done' || i.statusId === 'finalizado');
  const updatedItems = projectItems.filter(i => {
    const updated = new Date(i.updatedAt);
    const diffDays = (Date.now() - updated.getTime()) / (1000 * 3600 * 24);
    return diffDays <= 7;
  });
  const createdItems = projectItems.filter(i => {
    const created = new Date(i.createdAt);
    const diffDays = (Date.now() - created.getTime()) / (1000 * 3600 * 24);
    return diffDays <= 7;
  });
  const dueSoonItems = projectItems.filter(i => {
    if (!i.dueDate || i.statusId === 'done') return false;
    const due = new Date(i.dueDate);
    const diffDays = (due.getTime() - Date.now()) / (1000 * 3600 * 24);
    return diffDays >= 0 && diffDays <= 7;
  });

  // Priority Breakdown
  const prioritiesCount = {
    highest: projectItems.filter(i => i.priority === 'highest').length,
    high: projectItems.filter(i => i.priority === 'high').length,
    medium: projectItems.filter(i => i.priority === 'medium').length,
    low: projectItems.filter(i => i.priority === 'low').length,
  };

  // Work Types Distribution
  const totalItemsCount = projectItems.length || 1;
  const workTypesCount = {
    epic: projectItems.filter(i => i.type === 'epic').length,
    story: projectItems.filter(i => i.type === 'story').length,
    task: projectItems.filter(i => i.type === 'task').length,
    bug: projectItems.filter(i => i.type === 'bug').length,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner Notice (Matching Reference Image 2) */}
      <div className="bg-[#0B4551]/10 dark:bg-[#72C6E8]/10 border border-[#0B4551]/30 dark:border-[#72C6E8]/30 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#0B4551] dark:bg-[#72C6E8] text-white dark:text-[#03252D] shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-[#03252D] dark:text-white">
              Personaliza tu vista Informes para adaptarla a tu espacio.
            </h4>
            <p className="text-xs text-[#536A70] dark:text-[#B6D1D8] mt-0.5">
              Ve a la pestaña Informes para personalizar fácilmente los gráficos y widgets.
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => setActiveView('reports')}>
          Ir a Informes
        </Button>
      </div>

      {/* 4 Metric KPI Cards (Matching Reference Images 2 & 3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-6 shadow-md flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#03252D] dark:text-white tabular-nums">
              {completedItems.length} finalizadas
            </div>
            <div className="text-xs text-[#536A70] dark:text-[#B6D1D8]">en los últimos 7 días</div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-6 shadow-md flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#03252D] dark:text-white tabular-nums">
              {updatedItems.length} actualizadas
            </div>
            <div className="text-xs text-[#536A70] dark:text-[#B6D1D8]">en los últimos 7 días</div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-6 shadow-md flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-[#72C6E8]/10 text-[#72C6E8] shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#03252D] dark:text-white tabular-nums">
              {createdItems.length} creadas
            </div>
            <div className="text-xs text-[#536A70] dark:text-[#B6D1D8]">en los últimos 7 días</div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-6 shadow-md flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#03252D] dark:text-white tabular-nums">
              {dueSoonItems.length} vencen pronto
            </div>
            <div className="text-xs text-[#536A70] dark:text-[#B6D1D8]">en los próximos 7 días</div>
          </div>
        </div>

      </div>

      {/* Main Dashboard Grid - Row 1 (Matching Reference Image 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Resumen de estado (Doughnut Chart) */}
        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#D4D3D1] dark:border-[#123B45]">
            <div>
              <h3 className="font-extrabold text-lg text-[#03252D] dark:text-white">Resumen de estado</h3>
              <p className="text-xs text-[#536A70] dark:text-[#B6D1D8]">Obtén una instantánea del estado de tus actividades.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-700"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#72C6E8]"
                  strokeDasharray={`${(completedItems.length / totalItemsCount) * 100}, 100`}
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center text-center">
                <span className="text-3xl font-extrabold text-[#03252D] dark:text-white tabular-nums">{projectItems.length}</span>
                <span className="text-[10px] font-bold text-[#536A70] dark:text-[#B6D1D8]">Actividades</span>
              </div>
            </div>

            <div className="space-y-3 text-xs font-bold">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#72C6E8]" />
                <span className="text-[#03252D] dark:text-white">Por hacer: {projectItems.filter(i => i.statusId === 'todo').length}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-[#03252D] dark:text-white">En curso: {projectItems.filter(i => i.statusId === 'inprogress').length}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-[#03252D] dark:text-white">Finalizado: {completedItems.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actividad reciente Feed (Matching Reference Image 3) */}
        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#D4D3D1] dark:border-[#123B45]">
            <div>
              <h3 className="font-extrabold text-lg text-[#03252D] dark:text-white">Actividad reciente</h3>
              <p className="text-xs text-[#536A70] dark:text-[#B6D1D8]">Mantente al día de lo que sucede en todo el espacio.</p>
            </div>
            <Activity className="w-5 h-5 text-[#72C6E8]" />
          </div>

          <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
            {activityLogs.slice(0, 5).map(log => (
              <div key={log.id} className="p-4 rounded-xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] text-xs flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-bold text-[#03252D] dark:text-white flex items-center gap-2">
                    <span className="text-[#72C6E8]">{log.actorName}</span>
                    <span className="text-[#536A70] dark:text-[#B6D1D8]">{log.action}</span>
                  </div>
                  <div className="text-[11px] text-[#536A70] dark:text-[#B6D1D8]">{log.details}</div>
                </div>
                <span className="text-[10px] font-mono text-[#72C6E8] shrink-0">
                  {new Date(log.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Main Dashboard Grid - Row 2 (Matching Reference Image 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Desglose de prioridad (Bar Chart) */}
        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#D4D3D1] dark:border-[#123B45]">
            <div>
              <h3 className="font-extrabold text-lg text-[#03252D] dark:text-white">Desglose de prioridad</h3>
              <p className="text-xs text-[#536A70] dark:text-[#B6D1D8]">Obtén una visión global de cómo se priorizan las actividades.</p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { label: 'Muy alta (Highest)', count: prioritiesCount.highest, color: 'bg-rose-500' },
              { label: 'Alta (High)', count: prioritiesCount.high, color: 'bg-amber-500' },
              { label: 'Media (Medium)', count: prioritiesCount.medium, color: 'bg-[#72C6E8]' },
              { label: 'Baja (Low)', count: prioritiesCount.low, color: 'bg-slate-400' },
            ].map(p => (
              <div key={p.label} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-bold text-[#03252D] dark:text-white">
                  <span>{p.label}</span>
                  <span className="font-mono">{p.count}</span>
                </div>
                <div className="h-3 w-full bg-[#EDF4F5] dark:bg-[#123B45] rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${p.color} transition-all duration-300`} 
                    style={{ width: `${(p.count / totalItemsCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tipos de trabajo */}
        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#D4D3D1] dark:border-[#123B45]">
            <div>
              <h3 className="font-extrabold text-lg text-[#03252D] dark:text-white">Tipos de trabajo</h3>
              <p className="text-xs text-[#536A70] dark:text-[#B6D1D8]">Distribución de actividades según su categoría.</p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { type: 'epic', label: 'Épicas', count: workTypesCount.epic },
              { type: 'story', label: 'Historias de Usuario', count: workTypesCount.story },
              { type: 'task', label: 'Tareas Técnicas', count: workTypesCount.task },
              { type: 'bug', label: 'Errores (Bugs)', count: workTypesCount.bug },
            ].map(t => {
              const pct = Math.round((t.count / totalItemsCount) * 100);
              return (
                <div key={t.type} className="p-4 rounded-xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <TypeBadge type={t.type as any} />
                    <span className="font-bold text-[#03252D] dark:text-white">{t.label}</span>
                  </div>
                  <span className="font-mono font-bold text-[#72C6E8]">{pct}% ({t.count})</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Progreso de Epic Container (Matching Reference Image 3) */}
      <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#D4D3D1] dark:border-[#123B45]">
          <div>
            <h3 className="font-extrabold text-lg text-[#03252D] dark:text-white">Progreso de Épicas</h3>
            <p className="text-xs text-[#536A70] dark:text-[#B6D1D8]">Seguimiento de las iniciativas estratégicas del espacio.</p>
          </div>
          <Layers className="w-5 h-5 text-[#72C6E8]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {epics.map(epic => (
            <div key={epic.id} className="p-6 rounded-xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-extrabold text-sm text-[#03252D] dark:text-white">{epic.title}</div>
                <span className="text-xs font-mono font-bold text-[#72C6E8]">{epic.targetDate}</span>
              </div>
              <p className="text-xs text-[#536A70] dark:text-[#B6D1D8] line-clamp-2">{epic.description}</p>
              
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between font-bold text-[#536A70] dark:text-[#B6D1D8]">
                  <span>Progreso de completado</span>
                  <span className="text-[#72C6E8]">65%</span>
                </div>
                <div className="h-2.5 w-full bg-[#EDF4F5] dark:bg-[#071A1F] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#0B4551] to-[#72C6E8] w-[65%]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
