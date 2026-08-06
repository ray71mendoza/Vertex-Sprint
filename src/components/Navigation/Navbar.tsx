import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VertexLogo } from '../ui/VertexLogo';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { 
  Grid, Search, Bell, HelpCircle, Settings, Plus, Gem, 
  Sun, Moon, ChevronDown, Building2, Check, Download, Upload, LogOut, UserCheck, RefreshCw, Command
} from 'lucide-react';

interface NavbarProps {
  onOpenProjectHub?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenProjectHub, onLogout }) => {
  const { 
    currentOrg, setCurrentOrg, 
    organizations, currentUser, setCurrentUser, users,
    activeView, setActiveView,
    searchQuery, setSearchQuery,
    themeMode, toggleThemeMode,
    isLiveSyncEnabled, setIsLiveSyncEnabled,
    notifications,
    exportDataJSON, importDataJSON, resetToSampleData,
    setOnboarding
  } = useApp();

  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read);

  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const content = evt.target?.result as string;
          if (content && importDataJSON(content)) {
            alert('¡Copia de seguridad en JSON restaurada con éxito!');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleExportClick = () => {
    const json = exportDataJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vertex_sprint_backup_${currentOrg.slug}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <header className="h-[72px] border-b border-[#D4D3D1] dark:border-[#123B45] bg-[#FEFEFE] dark:bg-[#0D272C] px-8 flex items-center justify-between sticky top-0 z-50 transition-colors shadow-xs">
      
      {/* GROUP 1 (LEFT - 24px Gap): Logo, Organization, Workspace Selector */}
      <div className="flex items-center gap-6">
        <button 
          onClick={onOpenProjectHub}
          className="p-2 text-[#536A70] dark:text-[#B6D1D8] hover:text-[#03252D] dark:hover:text-white hover:bg-[#EDF4F5] dark:hover:bg-[#174A55] rounded-xl transition-colors flex items-center gap-2 text-xs font-semibold cursor-pointer"
          title="Centro de Proyectos & Launcher"
        >
          <Grid className="w-5 h-5 text-[#72C6E8]" />
          <span className="hidden sm:inline font-bold">Proyectos</span>
        </button>

        <div className="h-6 w-px bg-[#D4D3D1] dark:bg-[#123B45]" />

        {/* Brand Logo Lockup */}
        <div 
          className="flex items-center cursor-pointer transition-transform hover:scale-105" 
          onClick={onOpenProjectHub || (() => setActiveView('dashboard'))}
        >
          <VertexLogo size="md" />
        </div>

        {/* Organization Switcher */}
        <div className="relative">
          <button 
            onClick={() => setShowOrgDropdown(!showOrgDropdown)}
            className="flex items-center gap-2.5 px-4 h-[40px] rounded-xl bg-[#EDF4F5] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] hover:border-[#72C6E8] text-xs font-bold text-[#03252D] dark:text-[#F8FBFC] transition-all cursor-pointer shadow-xs"
          >
            <Building2 className="w-4 h-4 text-[#72C6E8]" />
            <span className="max-w-[140px] truncate">{currentOrg.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#536A70] dark:text-[#B6D1D8]" />
          </button>

          {showOrgDropdown && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-[#0D272C] text-[#03252D] dark:text-[#F8FBFC] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-3 z-50 shadow-2xl animate-in fade-in duration-150">
              <div className="text-[10px] font-bold text-[#536A70] dark:text-[#B6D1D8] px-3 py-2 uppercase tracking-wider">
                Espacios de Trabajo
              </div>
              <div className="space-y-1 my-1">
                {organizations.map(org => (
                  <button
                    key={org.id}
                    onClick={() => {
                      setCurrentOrg(org);
                      setShowOrgDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      org.id === currentOrg.id 
                        ? 'bg-[#0B4551]/10 text-[#0B4551] dark:bg-[#72C6E8]/20 dark:text-[#72C6E8] font-bold border border-[#72C6E8]/30' 
                        : 'hover:bg-[#EDF4F5] dark:hover:bg-[#174A55]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4" />
                      <span className="truncate">{org.name}</span>
                    </div>
                    {org.id === currentOrg.id && <Check className="w-4 h-4 text-[#72C6E8]" />}
                  </button>
                ))}
              </div>
              <div className="border-t border-[#D4D3D1] dark:border-[#123B45] pt-2 mt-2">
                <button
                  onClick={() => {
                    setShowOrgDropdown(false);
                    setOnboarding(prev => ({ ...prev, step: 1, isCompleted: false }));
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#72C6E8] hover:bg-[#72C6E8]/10 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Crear nueva Organización
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* GROUP 2 (CENTER - 24px Gap): Wide Centered Search Bar */}
      <div className="flex-1 max-w-xl mx-8 flex items-center">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#536A70] dark:text-[#B6D1D8]/60 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar en Vertex Sprint..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[44px] rounded-xl text-xs pl-11 pr-12 bg-[#EDF4F5] dark:bg-[#071A1F] border border-[#D4D3D1] dark:border-[#123B45] focus:border-[#72C6E8] outline-none text-[#03252D] dark:text-[#F8FBFC] transition-all font-medium"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#536A70] dark:text-[#B6D1D8]/70 bg-[#D4D3D1]/40 dark:bg-[#123B45] px-2 py-1 rounded-md border border-[#D4D3D1] dark:border-[#174A55] flex items-center gap-1">
            <Command className="w-3 h-3" /> K
          </span>
        </div>
      </div>

      {/* GROUP 3 (RIGHT - 24px Gap): Actions, Sync, Notifications, Profile */}
      <div className="flex items-center gap-4">
        
        <Button
          variant="primary"
          size="sm"
          onClick={() => setActiveView('backlog')}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shrink-0 font-bold"
        >
          Crear
        </Button>

        <button
          onClick={() => setActiveView('admin')}
          className="hidden md:flex items-center gap-2 px-4 h-[40px] rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-xs font-bold hover:bg-purple-500/20 transition-all shrink-0 cursor-pointer"
        >
          <Gem className="w-4 h-4" />
          <span>Planes</span>
        </button>

        <button
          onClick={() => setIsLiveSyncEnabled(!isLiveSyncEnabled)}
          title={isLiveSyncEnabled ? 'Sincronización colaborativa activa' : 'Sincronización pausada'}
          className={`hidden lg:flex items-center gap-2 px-3.5 h-[40px] rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            isLiveSyncEnabled 
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/30' 
              : 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/30'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isLiveSyncEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          <span>Live Sync</span>
        </button>

        <button
          onClick={toggleThemeMode}
          title={themeMode === 'dark' ? 'Cambiar a Modo Claro (Blanco)' : 'Cambiar a Modo Oscuro'}
          className="p-2.5 text-[#536A70] dark:text-[#B6D1D8] hover:text-[#03252D] dark:hover:text-white hover:bg-[#EDF4F5] dark:hover:bg-[#174A55] rounded-xl transition-colors flex items-center cursor-pointer"
        >
          {themeMode === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-[#0B4551]" />
          )}
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className="p-2.5 text-[#536A70] dark:text-[#B6D1D8] hover:text-[#03252D] dark:hover:text-white hover:bg-[#EDF4F5] dark:hover:bg-[#174A55] rounded-xl transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#72C6E8] text-[9px] font-extrabold text-[#03252D] flex items-center justify-center">
                {unreadNotifs.length}
              </span>
            )}
          </button>

          {showNotifDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0D272C] text-[#03252D] dark:text-[#F8FBFC] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-4 z-50 shadow-2xl animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#D4D3D1] dark:border-[#123B45]">
                <span className="font-bold text-xs">Notificaciones</span>
                <span className="text-[10px] text-[#72C6E8] font-bold">{unreadNotifs.length} nuevas</span>
              </div>
              <div className="space-y-2 my-2 max-h-60 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="p-3 rounded-xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] text-xs">
                    <div className="font-bold text-[#03252D] dark:text-[#F8FBFC]">{n.title}</div>
                    <div className="text-[#536A70] dark:text-[#B6D1D8] mt-0.5">{n.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={() => setActiveView('admin')}
          className="p-2.5 text-[#536A70] dark:text-[#B6D1D8] hover:text-[#03252D] dark:hover:text-white hover:bg-[#EDF4F5] dark:hover:bg-[#174A55] rounded-xl transition-colors cursor-pointer"
          title="Configuración"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Profile Menu Dropdown */}
        <div className="relative ml-2">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-1.5 p-0.5 rounded-full hover:ring-2 hover:ring-[#72C6E8]/50 transition-all cursor-pointer"
          >
            <Avatar user={currentUser} size="md" />
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-[#0D272C] text-[#03252D] dark:text-[#F8FBFC] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-4 z-50 shadow-2xl animate-in fade-in duration-150 text-xs space-y-3">
              <div className="pb-3 border-b border-[#D4D3D1] dark:border-[#123B45]">
                <div className="font-extrabold text-[#03252D] dark:text-white text-sm">{currentUser.name} {currentUser.lastName}</div>
                <div className="text-[11px] text-[#536A70] dark:text-[#B6D1D8] truncate">{currentUser.email}</div>
                <div className="mt-2 inline-block px-2.5 py-0.5 rounded-md bg-[#0B4551]/10 dark:bg-[#72C6E8]/20 text-[#0B4551] dark:text-[#72C6E8] font-bold text-[10px] uppercase">
                  {currentUser.role}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase font-bold text-[#536A70] dark:text-[#B6D1D8] px-1 py-1">Cambiar Usuario (Demo)</div>
                <div className="space-y-1 mt-1">
                  {users.map(u => (
                    <button
                      key={u.id}
                      onClick={() => {
                        setCurrentUser(u);
                        setShowProfileDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${
                        u.id === currentUser.id ? 'bg-[#0B4551]/15 text-[#0B4551] dark:bg-[#72C6E8]/20 dark:text-[#72C6E8] font-bold' : 'hover:bg-[#EDF4F5] dark:hover:bg-[#174A55]'
                      }`}
                    >
                      <span>{u.name} ({u.role})</span>
                      {u.id === currentUser.id && <UserCheck className="w-4 h-4 text-[#72C6E8]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#D4D3D1] dark:border-[#123B45] pt-2 space-y-1">
                <button
                  onClick={() => {
                    resetToSampleData();
                    setShowProfileDropdown(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-rose-500 hover:bg-rose-500/10 flex items-center gap-2 font-bold transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" /> Restablecer Datos de Ejemplo
                </button>
                {onLogout && (
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      onLogout();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-rose-500 hover:bg-rose-500/10 flex items-center gap-2 font-bold transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> Cerrar Sesión
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
