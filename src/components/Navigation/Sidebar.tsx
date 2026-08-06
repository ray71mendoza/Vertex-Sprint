import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, Clock, Star, Grid, BarChart, ChevronRight, Plus, 
  Layers, Filter, PieChart, Users, Target, Rocket, Settings,
  ChevronLeft, LayoutDashboard, Kanban, ChevronDown, Building2,
  FileText, Shield, Gem, SlidersHorizontal, Eye
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView, currentOrg, currentProject, projects, setCurrentProject, setProjects } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showRecents, setShowRecents] = useState(true);
  const [showFavorites, setShowFavorites] = useState(true);
  const [showSpaces, setShowSpaces] = useState(true);

  // Starred / Favorite Projects state
  const [starredIds, setStarredIds] = useState<string[]>([currentProject.id]);

  const toggleStar = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (starredIds.includes(id)) {
      setStarredIds(starredIds.filter(s => s !== id));
    } else {
      setStarredIds([...starredIds, id]);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Para ti', icon: User },
    { id: 'mywork', label: 'Recientes', icon: Clock },
    { id: 'board', label: 'Tablero Scrum', icon: Kanban },
    { id: 'backlog', label: 'Filtros & Backlog', icon: Filter },
    { id: 'timeline', label: 'Cronograma', icon: Rocket },
    { id: 'reports', label: 'Reportes & Métricas', icon: PieChart },
    { id: 'teams', label: 'Equipos & Roles', icon: Users },
    { id: 'admin', label: 'Configuración', icon: Settings },
  ];

  return (
    <aside 
      className={`
        border-r border-[#D4D3D1] dark:border-[#123B45] 
        bg-[#EDF4F5] dark:bg-[#071A1F] 
        flex flex-col justify-between p-4 shrink-0 hidden md:flex text-xs transition-all duration-200 shadow-xs
        ${isCollapsed ? 'w-20' : 'w-[280px]'}
      `}
    >
      <div className="space-y-6 overflow-y-auto pr-0.5">
        
        {/* Header Toggle */}
        <div className="flex items-center justify-between px-2">
          {!isCollapsed && (
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#536A70] dark:text-[#B6D1D8]/80">
              NAVEGACIÓN DE ESPACIOS
            </span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-xl text-[#536A70] dark:text-[#B6D1D8] hover:bg-[#D4D3D1]/40 dark:hover:bg-[#174A55] transition-colors ml-auto cursor-pointer"
            title={isCollapsed ? 'Expandir barra lateral' : 'Colapsar barra lateral'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* SECTION 1: Para ti */}
        <div className="space-y-1">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`
              w-full h-[44px] flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-4'} rounded-xl font-extrabold transition-all cursor-pointer text-xs
              ${activeView === 'dashboard' ? 'bg-[#0B4551]/15 text-[#0B4551] dark:bg-[#72C6E8]/20 dark:text-[#72C6E8] border border-[#72C6E8]/30 shadow-xs' : 'text-[#536A70] dark:text-[#B6D1D8] hover:bg-[#D4D3D1]/30 dark:hover:bg-[#174A55]'}
            `}
          >
            <User className="w-4 h-4 shrink-0 text-[#72C6E8]" />
            {!isCollapsed && <span className="ml-3 truncate">Para ti</span>}
          </button>
        </div>

        {/* SECTION 2: Recientes Dropdown (Matching Reference Image 1) */}
        {!isCollapsed && (
          <div className="space-y-2">
            <button
              onClick={() => setShowRecents(!showRecents)}
              className="w-full flex items-center justify-between text-[11px] font-extrabold text-[#536A70] dark:text-[#B6D1D8] uppercase tracking-wider px-2 hover:text-[#03252D] dark:hover:text-white cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Recientes</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showRecents ? '' : '-rotate-90'}`} />
            </button>

            {showRecents && (
              <div className="space-y-1 pl-2">
                {projects.slice(0, 3).map(p => (
                  <button
                    key={p.id}
                    onClick={() => setCurrentProject(p)}
                    className={`
                      w-full h-[40px] px-3 rounded-xl flex items-center justify-between transition-colors text-xs cursor-pointer
                      ${p.id === currentProject.id ? 'bg-[#0B4551]/10 dark:bg-[#72C6E8]/15 text-[#0B4551] dark:text-[#72C6E8] font-extrabold' : 'text-[#536A70] dark:text-[#B6D1D8] hover:bg-[#D4D3D1]/30 dark:hover:bg-[#174A55]'}
                    `}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-5 h-5 rounded bg-gradient-to-br from-[#0B4551] to-[#367480] text-white font-extrabold flex items-center justify-center text-[10px] shrink-0">
                        {p.key}
                      </div>
                      <span className="truncate">{p.name}</span>
                    </div>

                    <button onClick={(e) => toggleStar(e, p.id)} className="p-1 text-amber-400 hover:scale-110 transition-transform">
                      <Star className={`w-3.5 h-3.5 ${starredIds.includes(p.id) ? 'fill-amber-400' : ''}`} />
                    </button>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 3: Marcados como Favoritos (Matching Reference Image 1) */}
        {!isCollapsed && (
          <div className="space-y-2">
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className="w-full flex items-center justify-between text-[11px] font-extrabold text-[#536A70] dark:text-[#B6D1D8] uppercase tracking-wider px-2 hover:text-[#03252D] dark:hover:text-white cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Marcados como favoritos</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showFavorites ? '' : '-rotate-90'}`} />
            </button>

            {showFavorites && (
              <div className="space-y-1 pl-2">
                {projects.filter(p => starredIds.includes(p.id)).map(p => (
                  <button
                    key={p.id}
                    onClick={() => setCurrentProject(p)}
                    className="w-full h-[38px] px-3 rounded-xl flex items-center gap-2 text-xs font-bold text-[#03252D] dark:text-white hover:bg-[#D4D3D1]/30 dark:hover:bg-[#174A55] cursor-pointer"
                  >
                    <div className="w-4 h-4 rounded bg-[#72C6E8] text-[#03252D] font-extrabold text-[9px] flex items-center justify-center">
                      {p.key.substring(0, 2)}
                    </div>
                    <span className="truncate">{p.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="border-t border-[#D4D3D1] dark:border-[#123B45] my-2" />

        {/* SECTION 4: Espacio / Proyectos (Matching Reference Image 1) */}
        {!isCollapsed && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-2 text-[11px] font-extrabold text-[#536A70] dark:text-[#B6D1D8] uppercase tracking-wider">
              <span>Espacios de Trabajo</span>
              <button 
                onClick={() => setActiveView('admin')}
                className="p-1 rounded hover:bg-[#D4D3D1]/40 dark:hover:bg-[#174A55] text-[#72C6E8] cursor-pointer"
                title="Crear Espacio"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Standalone Active Workspace Card */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] flex items-center gap-3 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0B4551] to-[#367480] text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-sm">
                {currentProject.key}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-extrabold text-[#03252D] dark:text-white truncate text-xs">
                  {currentProject.name}
                </div>
                <div className="text-[10px] text-[#536A70] dark:text-[#B6D1D8]/80 truncate">
                  {currentOrg.name}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: Main App Nav Items */}
        <nav className="space-y-2 pt-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as any)}
                title={isCollapsed ? item.label : undefined}
                className={`
                  w-full h-[44px] flex items-center ${isCollapsed ? 'justify-center px-2' : 'px-4'} rounded-xl font-bold transition-all duration-150 cursor-pointer text-xs
                  ${isActive 
                    ? 'bg-[#0B4551]/15 text-[#0B4551] dark:bg-[#72C6E8]/20 dark:text-[#72C6E8] border border-[#72C6E8]/30 shadow-xs' 
                    : 'text-[#536A70] dark:text-[#B6D1D8]/80 hover:bg-[#D4D3D1]/30 dark:hover:bg-[#174A55] hover:text-[#03252D] dark:hover:text-white'
                  }
                `}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0B4551] dark:text-[#72C6E8]' : ''}`} />
                {!isCollapsed && <span className="ml-3 truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Settings Item */}
      {!isCollapsed && (
        <div className="pt-4 border-t border-[#D4D3D1] dark:border-[#123B45]">
          <button
            onClick={() => setActiveView('admin')}
            className="w-full h-[44px] flex items-center gap-3 px-4 rounded-xl text-[#536A70] dark:text-[#B6D1D8]/80 hover:text-[#03252D] dark:hover:text-white hover:bg-[#D4D3D1]/30 dark:hover:bg-[#174A55] text-xs font-bold transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Personalizar barra lateral</span>
          </button>
        </div>
      )}
    </aside>
  );
};
