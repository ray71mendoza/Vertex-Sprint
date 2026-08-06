import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Avatar } from '../ui/Avatar';
import { 
  Building2, Users, Shield, Download, Upload, 
  RefreshCw, CheckCircle2, History, AlertTriangle, Plus
} from 'lucide-react';
import { UserRole } from '../../types';

export const OrganizationSettings: React.FC = () => {
  const { 
    currentOrg, users, currentUser, 
    activityLogs, exportDataJSON, importDataJSON, resetToSampleData 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'members' | 'rbac' | 'backup' | 'audit'>('members');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('member');

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content && importDataJSON(content)) {
        alert('¡Copia de seguridad en JSON restaurada con éxito!');
      }
    };
    reader.readAsText(file);
  };

  const handleExportFile = () => {
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
    <div className="vertex-container p-8 md:p-10 space-y-10 animate-in fade-in duration-200">
      
      {/* Header Banner - 44px Title */}
      <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 md:p-10 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#536A70] dark:text-[#B6D1D8]">
            <Building2 className="w-4 h-4 text-[#72C6E8]" />
            <span className="text-xs font-extrabold uppercase tracking-wider">{currentOrg.name}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#03252D] dark:text-white leading-tight">
            Administración & Configuración
          </h1>
          <p className="text-base text-[#536A70] dark:text-[#B6D1D8]">
            Gestión de miembros, matriz de permisos RBAC y copias de seguridad de datos.
          </p>
        </div>
      </div>

      {/* Tabs Navigation Header */}
      <div className="flex border-b border-[#D4D3D1] dark:border-[#123B45] gap-4 overflow-x-auto">
        {[
          { id: 'members', label: 'Miembros & Invitaciones', icon: Users },
          { id: 'rbac', label: 'Matriz RBAC', icon: Shield },
          { id: 'backup', label: 'Respaldos JSON', icon: Download },
          { id: 'audit', label: 'Auditoría', icon: History }
        ].map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`pb-4 px-6 font-bold text-sm border-b-2 flex items-center gap-3 transition-all cursor-pointer ${
                isActive ? 'border-[#72C6E8] text-[#72C6E8]' : 'border-transparent text-[#536A70] dark:text-[#B6D1D8]/80 hover:text-[#03252D] dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: MEMBERS TABLE - 60px Row Height, 20px Horizontal Padding */}
      {activeTab === 'members' && (
        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#D4D3D1] dark:border-[#123B45]">
            <div>
              <h3 className="font-extrabold text-xl text-[#03252D] dark:text-white">Miembros del Equipo</h3>
              <p className="text-xs text-[#536A70] dark:text-[#B6D1D8]">{users.length} usuarios registrados en la organización</p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Input
                placeholder="correo@empresa.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="w-full sm:w-64"
              />
              <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
                Invitar
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#D4D3D1] dark:border-[#123B45] text-[#536A70] dark:text-[#B6D1D8] font-extrabold uppercase tracking-wider">
                  <th className="px-5 py-4">Usuario</th>
                  <th className="px-5 py-4">Correo</th>
                  <th className="px-5 py-4">Rol en la Organización</th>
                  <th className="px-5 py-4">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4D3D1]/60 dark:divide-[#123B45]">
                {users.map(u => (
                  <tr key={u.id} className="min-h-[60px] hover:bg-[#F7FAFB] dark:hover:bg-[#123B45]/50 transition-colors">
                    <td className="px-5 py-4 font-bold text-[#03252D] dark:text-white flex items-center gap-3">
                      <Avatar user={u} size="sm" />
                      <span>{u.name} {u.lastName}</span>
                    </td>
                    <td className="px-5 py-4 text-[#536A70] dark:text-[#B6D1D8]">{u.email}</td>
                    <td className="px-5 py-4">
                      <span className="px-3 py-1 rounded-md bg-[#0B4551]/10 dark:bg-[#72C6E8]/20 text-[#0B4551] dark:text-[#72C6E8] font-extrabold uppercase text-[10px]">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 font-bold text-[10px]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Activo
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: RBAC MATRIX */}
      {activeTab === 'rbac' && (
        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl space-y-6">
          <h3 className="font-extrabold text-xl text-[#03252D] dark:text-white pb-4 border-b border-[#D4D3D1] dark:border-[#123B45]">
            Matriz de Control de Acceso Basada en Roles (RBAC)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#D4D3D1] dark:border-[#123B45] text-[#536A70] dark:text-[#B6D1D8] font-extrabold uppercase tracking-wider">
                  <th className="px-5 py-4">Permiso</th>
                  <th className="px-5 py-4 text-center">Propietario (Owner)</th>
                  <th className="px-5 py-4 text-center">Scrum Master</th>
                  <th className="px-5 py-4 text-center">Miembro (Member)</th>
                  <th className="px-5 py-4 text-center">Observador (Observer)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4D3D1]/60 dark:divide-[#123B45]">
                {[
                  'Crear y Configurar Proyectos',
                  'Mover Estados en Tablero Scrum',
                  'Completar y Cerrar Sprints',
                  'Exportar/Importar Backups JSON',
                  'Invitar Nuevos Miembros'
                ].map((perm, idx) => (
                  <tr key={idx} className="min-h-[60px] hover:bg-[#F7FAFB] dark:hover:bg-[#123B45]/50 transition-colors">
                    <td className="px-5 py-4 font-bold text-[#03252D] dark:text-white">{perm}</td>
                    <td className="px-5 py-4 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="px-5 py-4 text-center"><CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="px-5 py-4 text-center">{idx < 2 ? <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" /> : <span className="text-[#536A70]">—</span>}</td>
                    <td className="px-5 py-4 text-center"><span className="text-[#536A70]">—</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: BACKUP */}
      {activeTab === 'backup' && (
        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl space-y-8 max-w-3xl">
          <h3 className="font-extrabold text-xl text-[#03252D] dark:text-white pb-4 border-b border-[#D4D3D1] dark:border-[#123B45]">
            Respaldo y Gestión de Datos JSON
          </h3>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] space-y-4">
              <h4 className="font-bold text-sm text-[#03252D] dark:text-white">Exportar Copia Completa</h4>
              <p className="text-xs text-[#536A70] dark:text-[#B6D1D8]">Descarga un archivo JSON con todos los proyectos, sprints y tareas.</p>
              <Button variant="primary" onClick={handleExportFile} leftIcon={<Download className="w-4 h-4" />}>
                Descargar Respaldo JSON
              </Button>
            </div>

            <div className="p-6 rounded-xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] space-y-4">
              <h4 className="font-bold text-sm text-[#03252D] dark:text-white">Restaurar desde JSON</h4>
              <p className="text-xs text-[#536A70] dark:text-[#B6D1D8]">Carga un respaldo guardado previamente para sobrescribir los datos actuales.</p>
              <input type="file" accept="application/json" onChange={handleImportFile} className="text-xs" />
            </div>

            <div className="pt-4 border-t border-[#D4D3D1] dark:border-[#123B45]">
              <Button variant="danger" onClick={resetToSampleData} leftIcon={<RefreshCw className="w-4 h-4" />}>
                Restablecer Datos de Ejemplo Iniciales
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT */}
      {activeTab === 'audit' && (
        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl space-y-6">
          <h3 className="font-extrabold text-xl text-[#03252D] dark:text-white pb-4 border-b border-[#D4D3D1] dark:border-[#123B45]">
            Historial de Auditoría Global
          </h3>

          <div className="space-y-3">
            {activityLogs.map(log => (
              <div key={log.id} className="min-h-[60px] p-4 rounded-xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] text-xs flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-bold text-[#03252D] dark:text-white">{log.actorName}: {log.action}</div>
                  <div className="text-[#536A70] dark:text-[#B6D1D8]">{log.details}</div>
                </div>
                <div className="text-[10px] font-mono text-[#72C6E8] shrink-0">
                  {new Date(log.timestamp).toLocaleString('es-ES')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
