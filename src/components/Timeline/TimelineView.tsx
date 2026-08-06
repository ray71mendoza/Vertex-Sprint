import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Avatar } from '../ui/Avatar';
import { 
  Users, MoreHorizontal, Share2, Zap, MessageSquare, Maximize2, 
  Search, SlidersHorizontal, Plus, Calendar, CheckSquare, 
  ChevronRight, Info, HelpCircle, X, Layers, Flame, Command
} from 'lucide-react';
import { WorkItem } from '../../types';

export const TimelineView: React.FC = () => {
  const { 
    workItems, epics, sprints, users, currentUser,
    addWorkItem, setSelectedItem, setActiveView,
    searchQuery, setSearchQuery,
    currentProject, currentOrg
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'cronograma' | 'resumen' | 'backlog' | 'tablero' | 'calendario'>('cronograma');
  const [timeMode, setTimeMode] = useState<'hoy' | 'semanas' | 'meses' | 'trimestres'>('meses');
  const [inlineTitle, setInlineTitle] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const projectItems = workItems.filter(item => {
    if (item.projectId !== currentProject.id) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && !item.key.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const activeSprint = sprints.find(s => s.projectId === currentProject.id && s.status === 'active') || sprints[0];

  const handleInlineCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineTitle.trim()) return;

    addWorkItem({
      projectId: currentProject.id,
      title: inlineTitle,
      description: 'Creado rápidamente desde el Cronograma.',
      type: 'story',
      statusId: 'col-inprogress',
      priority: 'medium',
      storyPoints: 3,
      assigneeId: currentUser.id,
      reporterId: currentUser.id,
      sprintId: activeSprint?.id,
      acceptanceCriteria: [],
      subtasks: [],
      tags: ['Cronograma'],
      watchers: [currentUser.id],
      startDate: '2026-08-01',
      dueDate: '2026-08-15'
    });

    setInlineTitle('');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-vertex-lightBg dark:bg-vertex-darkBg text-vertex-ink dark:text-vertex-polarWhite text-xs transition-colors relative">
      
      {/* Top Space Header */}
      <div className="p-4 md:p-6 border-b border-vertex-quartzGrey/50 dark:border-vertex-facetIce/15 bg-vertex-lightSurface dark:bg-vertex-darkSurface">
        <div className="text-[11px] text-vertex-facetMedium dark:text-vertex-facetIce/70 font-semibold uppercase tracking-wider mb-1">
          Espacio de Trabajo
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-vertex-apexTeal to-vertex-facetMedium text-white font-extrabold flex items-center justify-center text-xs shadow-xs">
              {currentProject.key}
            </div>
            <h1 className="text-xl font-bold text-vertex-ink dark:text-vertex-polarWhite">{currentOrg.name}</h1>
          </div>

          <div className="flex items-center gap-2 text-vertex-facetMedium dark:text-vertex-facetIce">
            <Button variant="ghost" size="sm" leftIcon={<Share2 className="w-4 h-4" />}>Compartir</Button>
            <Button variant="ghost" size="sm" leftIcon={<Zap className="w-4 h-4 text-amber-400" />}>Automatizar</Button>
          </div>
        </div>

        {/* Space Navigation Sub-Tabs */}
        <div className="flex items-center gap-6 mt-4 border-b border-vertex-quartzGrey/40 dark:border-vertex-facetIce/15 text-xs font-semibold overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setActiveView('dashboard')}
            className="pb-2.5 text-vertex-facetMedium dark:text-vertex-facetIce/70 hover:text-vertex-ink dark:hover:text-white transition-colors cursor-pointer"
          >
            Resumen
          </button>
          <button 
            onClick={() => setActiveView('backlog')}
            className="pb-2.5 text-vertex-facetMedium dark:text-vertex-facetIce/70 hover:text-vertex-ink dark:hover:text-white transition-colors cursor-pointer"
          >
            Backlog
          </button>
          <button 
            onClick={() => setActiveView('board')}
            className="pb-2.5 text-vertex-facetMedium dark:text-vertex-facetIce/70 hover:text-vertex-ink dark:hover:text-white transition-colors cursor-pointer"
          >
            Tablero
          </button>
          <button 
            onClick={() => setActiveSubTab('cronograma')}
            className="pb-2.5 border-b-2 border-vertex-prismBlue text-vertex-prismBlue font-bold transition-colors cursor-pointer"
          >
            Cronograma (Gantt)
          </button>
          <button 
            onClick={() => setActiveView('reports')}
            className="pb-2.5 text-vertex-facetMedium dark:text-vertex-facetIce/70 hover:text-vertex-ink dark:hover:text-white transition-colors cursor-pointer"
          >
            Reportes
          </button>
        </div>
      </div>

      {/* Filter Sub-Bar */}
      <div className="p-3.5 bg-vertex-lightSurfaceSubtle dark:bg-vertex-darkSurfaceElevated border-b border-vertex-quartzGrey/40 dark:border-vertex-facetIce/15 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-vertex-facetMedium dark:text-vertex-facetIce/50 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar en el cronograma..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-lg text-xs pl-8 pr-3 py-1.5 bg-vertex-lightSurface dark:bg-vertex-darkSurface border border-vertex-quartzGrey/60 dark:border-vertex-facetIce/20 outline-none text-vertex-ink dark:text-vertex-polarWhite w-52"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg text-xs px-3 py-1.5 bg-vertex-lightSurface dark:bg-vertex-darkSurface border border-vertex-quartzGrey/60 dark:border-vertex-facetIce/20 outline-none text-vertex-ink dark:text-vertex-polarWhite"
          >
            <option value="">Todas las Categorías</option>
            <option value="todo">Por hacer</option>
            <option value="in_progress">En curso</option>
            <option value="done">Finalizado</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-vertex-facetMedium dark:text-vertex-facetIce/70">Visualización por Meses</span>
        </div>
      </div>

      {/* Main Timeline Grid Canvas */}
      <div className="flex-1 overflow-x-auto overflow-y-auto relative">
        <div className="min-w-[950px] h-full flex flex-col">
          
          {/* Header Row */}
          <div className="flex border-b border-vertex-quartzGrey/40 dark:border-vertex-facetIce/15 bg-vertex-lightSurfaceSubtle dark:bg-vertex-darkBg sticky top-0 z-20 font-semibold text-vertex-facetMedium dark:text-vertex-facetIce">
            <div className="w-80 p-3 border-r border-vertex-quartzGrey/40 dark:border-vertex-facetIce/15 shrink-0">
              Actividad
            </div>
            <div className="flex-1 flex text-center">
              <div className="flex-1 p-3 border-r border-vertex-quartzGrey/40 dark:border-vertex-facetIce/15">Agosto 2026</div>
              <div className="flex-1 p-3 border-r border-vertex-quartzGrey/40 dark:border-vertex-facetIce/15">Septiembre 2026</div>
              <div className="flex-1 p-3">Octubre 2026</div>
            </div>
          </div>

          {/* Sprints Header Banner */}
          <div className="flex border-b border-vertex-quartzGrey/40 dark:border-vertex-facetIce/15 bg-vertex-apexTeal/10 dark:bg-vertex-darkSurfaceElevated font-bold text-vertex-ink dark:text-vertex-polarWhite">
            <div className="w-80 p-3 border-r border-vertex-quartzGrey/40 dark:border-vertex-facetIce/15 shrink-0 flex items-center justify-between">
              <span>Sprints Activos</span>
            </div>
            <div className="flex-1 relative flex items-center px-4">
              <span className="px-3 py-1 rounded-lg bg-vertex-apexTeal text-white dark:bg-vertex-prismBlue dark:text-vertex-ink font-semibold text-[11px] shadow-xs">
                {activeSprint?.name || 'SCRUM Sprint 0'}
              </span>
            </div>
          </div>

          {/* Inline Quick Creation Row */}
          <div className="flex border-b border-vertex-quartzGrey/40 dark:border-vertex-facetIce/15 bg-vertex-lightSurface dark:bg-vertex-darkSurface">
            <div className="w-80 p-2.5 border-r border-vertex-quartzGrey/40 dark:border-vertex-facetIce/15 shrink-0">
              <form onSubmit={handleInlineCreate} className="relative flex items-center">
                <span className="absolute left-3 text-amber-400 font-bold text-sm">⚡</span>
                <input
                  type="text"
                  placeholder="¿Qué se debe hacer?"
                  value={inlineTitle}
                  onChange={(e) => setInlineTitle(e.target.value)}
                  className="w-full rounded-lg text-xs pl-8 pr-8 py-1.5 bg-vertex-lightSurfaceSubtle dark:bg-vertex-darkSurfaceElevated border border-vertex-quartzGrey/60 dark:border-vertex-facetIce/20 outline-none text-vertex-ink dark:text-vertex-polarWhite"
                />
              </form>
            </div>
            <div className="flex-1 relative">
              {/* Sky Prism Blue Date Marker Line */}
              <div className="absolute top-0 bottom-0 left-[35%] w-0.5 bg-vertex-prismBlue shadow-md z-10" />
            </div>
          </div>

          {/* Work Items Rows */}
          <div className="divide-y divide-vertex-quartzGrey/40 dark:divide-vertex-facetIce/15 flex-1 bg-vertex-lightSurface dark:bg-vertex-darkSurface">
            {projectItems.map((item, idx) => {
              const assignee = users.find(u => u.id === item.assigneeId);
              return (
                <div key={item.id} className="flex hover:bg-vertex-quartzGrey/10 dark:hover:bg-vertex-darkSurfaceHover transition-colors group">
                  <div className="w-80 p-3 border-r border-vertex-quartzGrey/40 dark:border-vertex-facetIce/15 shrink-0 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-mono text-[10px] text-vertex-prismBlue font-bold shrink-0">{item.key}</span>
                      <span 
                        onClick={() => setSelectedItem(item)}
                        className="font-semibold text-vertex-ink dark:text-vertex-polarWhite hover:text-vertex-prismBlue cursor-pointer truncate"
                      >
                        {item.title}
                      </span>
                    </div>
                    <Avatar user={assignee} size="xs" />
                  </div>

                  <div className="flex-1 relative h-10 flex items-center px-4">
                    <div className="absolute top-0 bottom-0 left-[35%] w-0.5 bg-vertex-prismBlue/30 pointer-events-none" />

                    <div
                      onClick={() => setSelectedItem(item)}
                      style={{
                        left: `${(idx * 15) % 60 + 10}%`,
                        width: `${Math.max(25, 40 - idx * 3)}%`
                      }}
                      className="absolute h-6 rounded-lg bg-vertex-apexTeal hover:bg-vertex-facetDeep text-white dark:bg-vertex-prismBlue dark:hover:bg-vertex-facetLight dark:text-vertex-ink text-[10px] font-bold px-2.5 flex items-center justify-between cursor-pointer shadow-xs border border-transparent transition-all"
                    >
                      <span className="truncate">{item.title}</span>
                      <span className="font-mono ml-1 opacity-90">{item.storyPoints || 3}pt</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Floating Zoom Control Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        <div className="bg-vertex-lightSurface dark:bg-vertex-darkSurface border border-vertex-quartzGrey/60 dark:border-vertex-facetIce/20 shadow-2xl rounded-xl p-1.5 flex items-center gap-1 text-xs font-semibold">
          {['hoy', 'semanas', 'meses', 'trimestres'].map(m => (
            <button
              key={m}
              onClick={() => setTimeMode(m as any)}
              className={`px-3 py-1 rounded-lg capitalize transition-all cursor-pointer ${
                timeMode === m 
                  ? 'bg-vertex-apexTeal text-white dark:bg-vertex-prismBlue dark:text-vertex-ink font-bold shadow-xs' 
                  : 'text-vertex-facetMedium dark:text-vertex-facetIce/70 hover:text-vertex-ink dark:hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
