import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { AvatarGroup } from '../ui/Avatar';
import { 
  FolderPlus, Layers, ArrowRight, Plus, 
  Search, Users, Rocket, Building2, Sparkles, LayoutGrid
} from 'lucide-react';
import { Project, ProjectPhase } from '../../types';

interface ProjectHubProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectHub: React.FC<ProjectHubProps> = ({ onSelectProject }) => {
  const { projects, setProjects, currentOrg, currentUser, users } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Project Form State
  const [projectName, setProjectName] = useState('');
  const [projectKey, setProjectKey] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [methodology, setMethodology] = useState<'scrum' | 'kanban' | 'safe' | 'scrumban'>('scrum');

  const filteredProjects = projects.filter(p => {
    if (p.organizationId !== currentOrg.id) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.key.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    const key = projectKey.trim().toUpperCase() || projectName.substring(0, 3).toUpperCase();
    
    const defaultPhases: ProjectPhase[] = [
      { id: `ph-${Date.now()}-1`, name: 'Fase 1: Iniciación & Arquitectura', description: 'Requisitos y setup inicial', status: 'active', targetDate: '2026-08-30' },
      { id: `ph-${Date.now()}-2`, name: 'Fase 2: Ejecución de Sprints', description: 'Desarrollo de funcionalidades principales', status: 'future', targetDate: '2026-09-30' },
      { id: `ph-${Date.now()}-3`, name: 'Fase 3: QA & Despliegue', description: 'Pruebas e instalación en producción', status: 'future', targetDate: '2026-10-15' }
    ];

    const newPrj: Project = {
      id: `prj-${Date.now()}`,
      organizationId: currentOrg.id,
      key,
      name: projectName,
      description: projectDesc || `Proyecto administrado bajo la metodología ${methodology.toUpperCase()}.`,
      template: methodology,
      leadId: currentUser.id,
      avatarColor: 'from-[#0B4551] to-[#367480]',
      createdAt: new Date().toISOString(),
      phases: defaultPhases,
      currentPhaseId: defaultPhases[0].id
    };

    setProjects((prev: Project[]) => [...prev, newPrj]);
    setShowCreateModal(false);
    onSelectProject(newPrj);
  };

  const getMethodologyBadge = (tmpl: Project['template']) => {
    const config: Record<string, { label: string; class: string }> = {
      scrum: { label: 'SCRUM', class: 'bg-[#72C6E8]/20 text-[#72C6E8] border-[#72C6E8]/40' },
      kanban: { label: 'KANBAN', class: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
      safe: { label: 'SAFe ENTERPRISE', class: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
      scrumban: { label: 'SCRUMBAN', class: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
      project_mgmt: { label: 'GESTIÓN', class: 'bg-sky-500/20 text-sky-300 border-sky-500/40' },
    };

    const current = config[tmpl] || { label: 'ÁGIL', class: 'bg-slate-500/20 text-slate-300 border-slate-500/40' };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wider border uppercase select-none ${current.class}`}>
        {current.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F7FAFB] dark:bg-[#071A1F] text-[#03252D] dark:text-[#F8FBFC] p-8 md:p-12 transition-colors vertex-grid-pattern">
      <div className="vertex-container space-y-10 animate-in fade-in duration-200">
        
        {/* Header Title Section - 44px Title, 32px Padding */}
        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 md:p-10 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 relative overflow-hidden">
          <div className="space-y-3 z-10 max-w-3xl">
            <div className="flex items-center gap-2 text-[#536A70] dark:text-[#B6D1D8]">
              <Building2 className="w-4 h-4 text-[#72C6E8]" />
              <span className="text-xs font-extrabold uppercase tracking-wider">{currentOrg.name}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#03252D] dark:text-white leading-tight">
              Centro de Proyectos Ágiles
            </h1>
            <p className="text-base text-[#536A70] dark:text-[#B6D1D8] leading-relaxed">
              Selecciona un espacio estratégico o inicializa un nuevo proyecto ágil con fases configuradas.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowCreateModal(true)}
            leftIcon={<Plus className="w-5 h-5" />}
            className="shrink-0 font-bold shadow-lg"
          >
            Crear Proyecto
          </Button>
        </div>

        {/* Search Bar & Stats */}
        <div className="flex items-center justify-between gap-6 pt-2">
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#536A70] dark:text-[#B6D1D8]/60 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar proyecto por nombre o clave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[48px] rounded-xl text-sm pl-11 pr-4 bg-white dark:bg-[#0D272C] text-[#03252D] dark:text-[#F8FBFC] border border-[#D4D3D1] dark:border-[#123B45] focus:border-[#72C6E8] outline-none transition-all shadow-xs font-medium"
            />
          </div>

          <div className="text-sm font-bold text-[#536A70] dark:text-[#B6D1D8]">
            {filteredProjects.length} proyectos activos
          </div>
        </div>

        {/* Existing Projects Grid - 32px Card Padding, 32px Grid Gap */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-wider text-[#536A70] dark:text-[#B6D1D8]">
            <LayoutGrid className="w-4 h-4 text-[#72C6E8]" />
            <span>Proyectos de la Organización</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(prj => {
              const activePhase = prj.phases?.find(p => p.status === 'active') || prj.phases?.[0];

              return (
                <div
                  key={prj.id}
                  onClick={() => onSelectProject(prj)}
                  className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] hover:border-[#72C6E8] rounded-2xl p-8 flex flex-col justify-between space-y-6 cursor-pointer group shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4551] to-[#367480] text-white font-extrabold flex items-center justify-center text-sm shadow-md flex-shrink-0">
                          {prj.key}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-lg text-[#03252D] dark:text-white group-hover:text-[#72C6E8] transition-colors">
                            {prj.name}
                          </h3>
                          <div className="text-xs text-[#536A70] dark:text-[#B6D1D8] font-mono font-bold mt-0.5">
                            CLAVE: {prj.key}
                          </div>
                        </div>
                      </div>
                      {getMethodologyBadge(prj.template)}
                    </div>

                    <p className="text-sm text-[#536A70] dark:text-[#B6D1D8] line-clamp-2 leading-relaxed">
                      {prj.description}
                    </p>

                    {/* Active Phase Component */}
                    {activePhase && (
                      <div className="p-4 rounded-xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] text-xs space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-extrabold text-[#536A70] dark:text-[#B6D1D8] uppercase">
                          <span>FASE ACTIVA</span>
                          <span className="text-[#72C6E8] font-mono">{activePhase.targetDate}</span>
                        </div>
                        <div className="font-bold text-[#03252D] dark:text-white text-xs">{activePhase.name}</div>
                        <div className="text-xs text-[#536A70] dark:text-[#B6D1D8] line-clamp-1">{activePhase.description}</div>
                      </div>
                    )}
                  </div>

                  <div className="pt-5 border-t border-[#D4D3D1] dark:border-[#123B45] flex items-center justify-between">
                    <AvatarGroup users={users} max={3} size="sm" />

                    <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Entrar
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CREATE NEW PROJECT MODAL */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title={
          <div className="flex items-center gap-3 text-xl font-extrabold text-[#03252D] dark:text-white">
            <Rocket className="w-6 h-6 text-[#72C6E8]" />
            <span>Crear Nuevo Proyecto</span>
          </div>
        }
        subtitle="Configura los datos del espacio de trabajo y su metodología ágil."
      >
        <form onSubmit={handleCreateProjectSubmit} className="space-y-6">
          <Input
            label="Nombre del Proyecto"
            placeholder="Ej. Sistema de Pagos Core"
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
              if (!projectKey) setProjectKey(e.target.value.substring(0, 3).toUpperCase());
            }}
            required
          />

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Clave de Prefijo"
              placeholder="PAY"
              value={projectKey}
              onChange={(e) => setProjectKey(e.target.value.toUpperCase())}
              maxLength={5}
              required
            />

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#03252D] dark:text-[#B6D1D8]">
                Metodología Ágil
              </label>
              <select
                value={methodology}
                onChange={(e) => setMethodology(e.target.value as any)}
                className="w-full h-[48px] rounded-xl text-sm px-4 outline-none bg-white dark:bg-[#071A1F] text-[#03252D] dark:text-white border border-[#D4D3D1] dark:border-[#123B45] focus:border-[#72C6E8] font-medium"
              >
                <option value="scrum">Scrum (Sprints de 2 semanas)</option>
                <option value="kanban">Kanban (Flujo Continuo)</option>
                <option value="safe">SAFe Enterprise (Escalado)</option>
                <option value="scrumban">Scrumban Híbrido</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#03252D] dark:text-[#B6D1D8]">
              Descripción del Objetivo
            </label>
            <textarea
              placeholder="Describe el alcance y objetivo empresarial del proyecto..."
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
              className="w-full rounded-xl text-sm p-4 outline-none bg-white dark:bg-[#071A1F] text-[#03252D] dark:text-white border border-[#D4D3D1] dark:border-[#123B45] focus:border-[#72C6E8] h-28 leading-relaxed"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] text-xs space-y-2">
            <div className="font-bold text-[#03252D] dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Fases Generadas Automáticamente:
            </div>
            <ul className="list-disc list-inside text-[#536A70] dark:text-[#B6D1D8] text-xs space-y-1 pl-1">
              <li>Fase 1: Descubrimiento & Arquitectura Inicial</li>
              <li>Fase 2: Ejecución de Sprints de Desarrollo</li>
              <li>Fase 3: Control de Calidad (QA) & Despliegue</li>
            </ul>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#D4D3D1] dark:border-[#123B45]">
            <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" className="font-bold">
              Crear e Iniciar Proyecto
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
