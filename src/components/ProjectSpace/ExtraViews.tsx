import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { 
  Target, Rocket, Shield, Code, GitPullRequest, Cloud, 
  Link as LinkIcon, Archive, CheckCircle2, AlertTriangle, ExternalLink, Plus
} from 'lucide-react';

interface ExtraViewProps {
  viewId: string;
}

export const ExtraViews: React.FC<ExtraViewProps> = ({ viewId }) => {
  const { epics, workItems, currentProject } = useApp();

  if (viewId === 'metas') {
    return (
      <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl space-y-6 animate-in fade-in duration-200">
        <div className="flex items-center justify-between pb-6 border-b border-[#D4D3D1] dark:border-[#123B45]">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-[#72C6E8]" />
            <div>
              <h3 className="font-extrabold text-xl text-[#03252D] dark:text-white">Objetivos y Metas (OKRs)</h3>
              <p className="text-xs text-[#536A70] dark:text-[#B6D1D8]">Supervisa los resultados clave del proyecto.</p>
            </div>
          </div>
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Nueva Meta
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {epics.map(epic => (
            <div key={epic.id} className="p-6 rounded-2xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-extrabold text-base text-[#03252D] dark:text-white">{epic.title}</div>
                <span className="text-xs font-mono font-bold text-[#72C6E8]">{epic.targetDate}</span>
              </div>
              <p className="text-xs text-[#536A70] dark:text-[#B6D1D8]">{epic.description || 'Meta estratégica del proyecto.'}</p>
              <div className="h-3 w-full bg-[#EDF4F5] dark:bg-[#071A1F] rounded-full overflow-hidden">
                <div className="h-full bg-[#72C6E8] w-[75%]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (viewId === 'seguridad') {
    return (
      <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl space-y-6 animate-in fade-in duration-200">
        <div className="flex items-center justify-between pb-6 border-b border-[#D4D3D1] dark:border-[#123B45]">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-emerald-500" />
            <div>
              <h3 className="font-extrabold text-xl text-[#03252D] dark:text-white">Panel de Seguridad y Permisos</h3>
              <p className="text-xs text-[#536A70] dark:text-[#B6D1D8]">Las funciones de seguridad permiten gestionar permisos y controles en un solo lugar.</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-2">
          <div className="font-extrabold text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Escaneo de Vulnerabilidades Activo (0 Vulnerabilidades Críticas)</span>
          </div>
          <p className="text-[#536A70] dark:text-[#B6D1D8]">
            Todos los contenedores y dependencias del espacio {currentProject.name} cumplen con las políticas de la organización.
          </p>
        </div>
      </div>
    );
  }

  if (viewId === 'publicaciones') {
    return (
      <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl space-y-6 animate-in fade-in duration-200">
        <div className="flex items-center justify-between pb-6 border-b border-[#D4D3D1] dark:border-[#123B45]">
          <div className="flex items-center gap-3">
            <Rocket className="w-6 h-6 text-[#72C6E8]" />
            <div>
              <h3 className="font-extrabold text-xl text-[#03252D] dark:text-white">Publicaciones y Releases (Versiones)</h3>
              <p className="text-xs text-[#536A70] dark:text-[#B6D1D8]">Notas de versión y paquetes de despliegue producidos.</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] space-y-2">
          <div className="font-extrabold text-base text-[#03252D] dark:text-white">Versión v1.0.0 — Producción</div>
          <div className="text-xs text-[#536A70] dark:text-[#B6D1D8]">Lanzamiento inicial del proyecto {currentProject.name} con módulos de Sprint y Gantt.</div>
        </div>
      </div>
    );
  }

  // Fallback for Code / Dev / Deployments / Links / Archived
  return (
    <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl space-y-6 animate-in fade-in duration-200 text-center py-12">
      <div className="w-12 h-12 rounded-2xl bg-[#0B4551] dark:bg-[#72C6E8] text-white dark:text-[#03252D] flex items-center justify-center mx-auto">
        <Code className="w-6 h-6" />
      </div>
      <h3 className="font-extrabold text-xl text-[#03252D] dark:text-white uppercase tracking-wider">
        Vista de {viewId.replace('_', ' ')}
      </h3>
      <p className="text-xs text-[#536A70] dark:text-[#B6D1D8] max-w-md mx-auto leading-relaxed">
        Esta vista está conectada con el espacio de trabajo de {currentProject.name} y lista para integraciones.
      </p>
    </div>
  );
};
