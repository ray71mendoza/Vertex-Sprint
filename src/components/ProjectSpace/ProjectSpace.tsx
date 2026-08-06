import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProjectSummary } from './ProjectSummary';
import { ProjectCalendar } from './ProjectCalendar';
import { ListView } from './ListView';
import { CapacityView } from './CapacityView';
import { ExtraViews } from './ExtraViews';
import { AddViewModal, VIEW_OPTIONS } from './AddViewModal';
import { ScrumBoard } from '../Board/ScrumBoard';
import { BacklogView } from '../Backlog/BacklogView';
import { TimelineView } from '../Timeline/TimelineView';
import { AgileReports } from '../Reports/AgileReports';
import { OrganizationSettings } from '../Admin/OrganizationSettings';
import { Button } from '../ui/Button';
import { AvatarGroup } from '../ui/Avatar';
import { 
  LayoutDashboard, Layers, Kanban, Calendar as CalendarIcon, 
  Rocket, Users, PieChart, Settings, Plus, Share2, Zap, Search, FileText, FormInput
} from 'lucide-react';

export const ProjectSpace: React.FC = () => {
  const { currentProject, currentOrg, users, activeView, setActiveView } = useApp();
  
  // Active selected view tab
  const [projectTab, setProjectTab] = useState<string>('resumen');
  
  // Pinned tab IDs in the top navigation bar
  const [pinnedViewIds, setPinnedViewIds] = useState<string[]>([
    'resumen', 'backlog', 'tablero', 'calendario', 'cronograma', 'documentos', 'formularios'
  ]);
  
  // Modal state for + button
  const [showAddViewModal, setShowAddViewModal] = useState(false);

  const togglePinView = (viewId: string) => {
    if (pinnedViewIds.includes(viewId)) {
      setPinnedViewIds(pinnedViewIds.filter(id => id !== viewId));
    } else {
      setPinnedViewIds([...pinnedViewIds, viewId]);
    }
  };

  const getTabLabelAndIcon = (id: string) => {
    const defaultMap: Record<string, { label: string; icon: any }> = {
      resumen: { label: 'Resumen', icon: LayoutDashboard },
      backlog: { label: 'Backlog', icon: Layers },
      tablero: { label: 'Tablero', icon: Kanban },
      calendario: { label: 'Calendario', icon: CalendarIcon },
      cronograma: { label: 'Cronograma', icon: Rocket },
      documentos: { label: 'Documentos', icon: FileText },
      formularios: { label: 'Formularios', icon: FormInput },
    };

    if (defaultMap[id]) return defaultMap[id];
    const match = VIEW_OPTIONS.find(v => v.id === id);
    if (match) return { label: match.label, icon: match.icon };
    return { label: id, icon: LayoutDashboard };
  };

  return (
    <div className="vertex-container p-8 md:p-10 space-y-8 animate-in fade-in duration-200">
      
      {/* Project Workspace Header */}
      <div className="space-y-4">
        
        {/* Workspace Path Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#536A70] dark:text-[#B6D1D8]">
          <span>Espacio</span>
          <span>/</span>
          <span className="text-[#03252D] dark:text-white">{currentOrg.name}</span>
        </div>

        {/* Project Title Bar & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0B4551] to-[#367480] text-white font-extrabold flex items-center justify-center text-sm shadow-md shrink-0">
              {currentProject.key}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#03252D] dark:text-white tracking-tight">
                  {currentProject.name}
                </h1>
                <AvatarGroup users={users} max={3} size="xs" />
              </div>
              <p className="text-xs text-[#536A70] dark:text-[#B6D1D8] mt-0.5">
                {currentProject.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button variant="secondary" size="sm" leftIcon={<Share2 className="w-4 h-4" />}>
              Compartir
            </Button>
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setProjectTab('backlog')}>
              Crear Actividad
            </Button>
          </div>
        </div>

        {/* Project Sub-Navigation Tabs Bar + Add View (+) Button (Matching Reference Screenshots 1-5 & Image 4) */}
        <div className="flex items-center border-b border-[#D4D3D1] dark:border-[#123B45] text-xs font-extrabold gap-2 overflow-x-auto pt-2">
          {pinnedViewIds.map(tabId => {
            const { label, icon: Icon } = getTabLabelAndIcon(tabId);
            const isActive = projectTab === tabId;
            return (
              <button
                key={tabId}
                onClick={() => setProjectTab(tabId)}
                className={`pb-3 px-5 border-b-2 flex items-center gap-2.5 transition-all cursor-pointer shrink-0 ${
                  isActive 
                    ? 'border-[#72C6E8] text-[#72C6E8] font-extrabold' 
                    : 'border-transparent text-[#536A70] dark:text-[#B6D1D8] hover:text-[#03252D] dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            );
          })}

          {/* THE "+" ADD VIEW BUTTON (Matching Reference Image 4) */}
          <button
            onClick={() => setShowAddViewModal(true)}
            className="pb-3 px-3 border-b-2 border-transparent text-[#72C6E8] hover:bg-[#72C6E8]/10 rounded-t-xl transition-colors cursor-pointer flex items-center gap-1 shrink-0 font-extrabold"
            title="Añadir vistas al espacio de trabajo"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Dynamic Tab Content Renderer */}
      <div>
        {projectTab === 'resumen' && <ProjectSummary />}
        {projectTab === 'backlog' && <BacklogView />}
        {projectTab === 'tablero' && <ScrumBoard />}
        {projectTab === 'calendario' && <ProjectCalendar />}
        {projectTab === 'cronograma' && <TimelineView />}
        {projectTab === 'lista' && <ListView />}
        {projectTab === 'capacidad' && <CapacityView />}
        {projectTab === 'documentos' && <ExtraViews viewId="documentos" />}
        {projectTab === 'formularios' && <ExtraViews viewId="formularios" />}
        {!['resumen', 'backlog', 'tablero', 'calendario', 'cronograma', 'lista', 'capacidad', 'documentos', 'formularios'].includes(projectTab) && (
          <ExtraViews viewId={projectTab} />
        )}
      </div>

      {/* ADD VIEW MODAL POPOVER (Matching Reference Image 4) */}
      <AddViewModal
        isOpen={showAddViewModal}
        onClose={() => setShowAddViewModal(false)}
        onSelectView={(viewId) => setProjectTab(viewId)}
        pinnedViewIds={pinnedViewIds}
        onTogglePinView={togglePinView}
      />

    </div>
  );
};
