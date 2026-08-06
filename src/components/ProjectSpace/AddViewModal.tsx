import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { 
  Link, Archive, Clock, Code, GitPullRequest, Cloud, 
  PieChart, List, Target, Rocket, Shield, Check, Plus, Sparkles
} from 'lucide-react';

export interface ViewOption {
  id: string;
  label: string;
  badge?: string;
  icon: any;
  description: string;
}

interface AddViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectView: (viewId: string) => void;
  pinnedViewIds: string[];
  onTogglePinView: (viewId: string) => void;
}

export const VIEW_OPTIONS: ViewOption[] = [
  { id: 'accesos_rapidos', label: 'Accesos rápidos', icon: Link, description: 'Crea accesos directos a documentación, repositorios y páginas importantes.' },
  { id: 'archivadas', label: 'Actividades archivadas', icon: Archive, description: 'Consulta e inspecciona tareas archivadas o completadas históricamente.' },
  { id: 'capacidad', label: 'Capacidad', icon: Clock, description: 'Planifica la capacidad en horas y story points de cada miembro del equipo por sprint.' },
  { id: 'codigo', label: 'Código', badge: 'Movido', icon: Code, description: 'Vincula commits de Git, ramas y repositorios con tus historias de usuario.' },
  { id: 'desarrollo', label: 'Desarrollo', icon: GitPullRequest, description: 'Gestión de Pull Requests, revisiones de código y pipeline CI/CD.' },
  { id: 'implementaciones', label: 'Implementaciones', badge: 'Movido', icon: Cloud, description: 'Supervisa los despliegues en entornos de Staging, QA y Producción.' },
  { id: 'informes', label: 'Informes', icon: PieChart, description: 'Analíticas avanzadas de Burndown, Velocidad y Flujo Acumulado.' },
  { id: 'lista', label: 'Lista', icon: List, description: 'Vista en tabla interactiva configurable con ordenamiento y edición masiva.' },
  { id: 'metas', label: 'Metas', icon: Target, description: 'Define y rastrea Objetivos y Resultados Clave (OKRs) estratégicos.' },
  { id: 'publicaciones', label: 'Publicaciones', icon: Rocket, description: 'Gestión de releases, versiones de software y notas de lanzamiento.' },
  { id: 'seguridad', label: 'Seguridad', icon: Shield, description: 'Las funciones de seguridad permiten gestionar permisos y vulnerabilidades en un solo lugar.' },
];

export const AddViewModal: React.FC<AddViewModalProps> = ({
  isOpen,
  onClose,
  onSelectView,
  pinnedViewIds,
  onTogglePinView
}) => {
  const [selectedOption, setSelectedOption] = useState<ViewOption>(VIEW_OPTIONS[10]); // Default Seguridad

  if (!isOpen) return null;

  const isPinned = pinnedViewIds.includes(selectedOption.id);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="xl"
      title="Añadir vistas al espacio de trabajo"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Scrollable Options List (Matching Reference Screenshot 4) */}
        <div className="space-y-1 max-h-[420px] overflow-y-auto pr-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#536A70] dark:text-[#B6D1D8] block mb-2 px-3">
            Vistas disponibles
          </span>

          {VIEW_OPTIONS.map(opt => {
            const Icon = opt.icon;
            const isSelected = selectedOption.id === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedOption(opt)}
                className={`
                  w-full h-[44px] px-3.5 rounded-xl flex items-center justify-between text-xs font-bold transition-all cursor-pointer
                  ${isSelected 
                    ? 'bg-[#0B4551]/15 text-[#0B4551] dark:bg-[#72C6E8]/20 dark:text-[#72C6E8] border border-[#72C6E8]/30 shadow-xs' 
                    : 'text-[#536A70] dark:text-[#B6D1D8] hover:bg-[#EDF4F5] dark:hover:bg-[#174A55] hover:text-[#03252D] dark:hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0 text-[#72C6E8]" />
                  <span>{opt.label}</span>
                </div>

                {opt.badge && (
                  <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
                    {opt.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Preview Card Box (Matching Reference Screenshot 4) */}
        <div className="bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] rounded-2xl p-6 space-y-6 flex flex-col justify-between h-full shadow-md">
          
          <div className="space-y-4">
            {/* Graphic Illustration Header */}
            <div className="h-32 rounded-xl bg-gradient-to-br from-[#0B4551] via-[#123B45] to-[#071A1F] border border-[#72C6E8]/30 p-4 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between text-white font-extrabold text-xs">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {selectedOption.label}
                </span>
                <span className="text-[10px] font-mono text-[#72C6E8]">Vertex Sprint</span>
              </div>
              <div className="flex gap-2">
                <div className="h-2 w-full bg-[#72C6E8]/40 rounded" />
                <div className="h-2 w-2/3 bg-amber-400/40 rounded" />
              </div>
            </div>

            <div>
              <h4 className="font-extrabold text-base text-[#03252D] dark:text-white">
                {selectedOption.label}
              </h4>
              <p className="text-xs text-[#536A70] dark:text-[#B6D1D8] leading-relaxed mt-1">
                {selectedOption.description}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#D4D3D1] dark:border-[#174A55] flex flex-col gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                onTogglePinView(selectedOption.id);
                onSelectView(selectedOption.id);
                onClose();
              }}
              className="w-full justify-center font-bold"
            >
              {isPinned ? 'Quitar de la navegación' : 'Añadir a la navegación'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                onSelectView(selectedOption.id);
                onClose();
              }}
              className="w-full justify-center"
            >
              Abrir vista ahora
            </Button>
          </div>

        </div>

      </div>
    </Modal>
  );
};
