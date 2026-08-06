import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VertexLogo } from '../ui/VertexLogo';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { 
  Code, Package, Megaphone, Palette, CheckSquare, Settings, 
  HelpCircle, Users, Headphones, Scale, DollarSign, TrendingUp, 
  Database, MoreHorizontal, ArrowRight, ArrowLeft, Check, Plus, X
} from 'lucide-react';
import { Organization, Project } from '../../types';

export const OnboardingWizard: React.FC = () => {
  const { currentUser, finishOnboarding } = useApp();

  const [step, setStep] = useState(1);
  const [workType, setWorkType] = useState('Desarrollo de software');
  const [templateType, setTemplateType] = useState<'scrum' | 'kanban' | 'project_mgmt'>('scrum');
  const [spaceName, setSpaceName] = useState('Mi equipo de gestión de proyectos');
  const [selectedActivities, setSelectedActivities] = useState<string[]>(['Función', 'Tarea', 'Historia', 'Error']);
  const [statuses, setStatuses] = useState<string[]>(['Idea', 'Por hacer', 'En curso', 'En revisión', 'Finalizado']);

  const workTypes = [
    { id: 'software', name: 'Desarrollo de software', icon: Code },
    { id: 'product', name: 'Gestión de productos', icon: Package },
    { id: 'marketing', name: 'Marketing', icon: Megaphone },
    { id: 'design', name: 'Diseño', icon: Palette },
    { id: 'project', name: 'Gestión de proyectos', icon: CheckSquare },
    { id: 'ops', name: 'Operaciones', icon: Settings },
    { id: 'it', name: 'Soporte de TI', icon: HelpCircle },
    { id: 'hr', name: 'Recursos humanos', icon: Users },
    { id: 'customer', name: 'Atención al cliente', icon: Headphones },
    { id: 'legal', name: 'Jurídico', icon: Scale },
    { id: 'finance', name: 'Finanzas', icon: DollarSign },
    { id: 'sales', name: 'Ventas', icon: TrendingUp },
    { id: 'data', name: 'Ciencia de datos', icon: Database },
    { id: 'other', name: 'Otros', icon: MoreHorizontal }
  ];

  const presets = [
    'Mi equipo de gestión de proyectos',
    'Equipo Lyra',
    'Centro de hitos',
    'Planificación de iniciativas',
    'Proyectos entre equipos'
  ];

  const handleComplete = () => {
    const slug = spaceName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newOrg: Organization = {
      id: `org-${Date.now()}`,
      name: spaceName,
      slug,
      logoUrl: '/logo.png',
      workType,
      templateType,
      ownerId: currentUser.id,
      createdAt: new Date().toISOString()
    };

    const newProject: Project = {
      id: `prj-${Date.now()}`,
      organizationId: newOrg.id,
      key: spaceName.substring(0, 3).toUpperCase() || 'SPX',
      name: `${spaceName} Project`,
      description: `Proyecto inicial creado durante el onboarding de ${spaceName}.`,
      template: templateType,
      leadId: currentUser.id,
      avatarColor: 'from-vertex-apexTeal to-vertex-facetMedium',
      createdAt: new Date().toISOString()
    };

    finishOnboarding(newOrg, newProject);
  };

  return (
    <div className="fixed inset-0 z-50 bg-vertex-darkBg/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto vertex-grid-pattern">
      <div className="w-full max-w-4xl bg-vertex-darkSurface border border-vertex-facetIce/20 rounded-3xl p-6 md:p-8 animate-in zoom-in-95 duration-200 shadow-2xl relative overflow-hidden">
        
        {/* Top Header Progress */}
        <div className="flex items-center justify-between border-b border-vertex-facetIce/15 pb-4 mb-6">
          <VertexLogo size="sm" />
          <div className="flex items-center gap-2 text-xs font-semibold text-vertex-facetIce/80">
            Paso <span className="text-vertex-prismBlue font-bold tabular-nums">{step}</span> de 5
          </div>
        </div>

        {/* STEP 1: Trabajo */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-extrabold text-vertex-polarWhite tracking-tight">
                ¿Qué tipo de trabajo realizas?
              </h2>
              <p className="text-xs text-vertex-facetIce/80">
                Selecciona tu área principal para personalizar las plantillas y metodologías sugeridas.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
              {workTypes.map(w => {
                const Icon = w.icon;
                const isSelected = workType === w.name;
                return (
                  <button
                    key={w.id}
                    onClick={() => setWorkType(w.name)}
                    className={`p-4 rounded-xl text-left border flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-vertex-apexTeal/20 border-vertex-prismBlue text-vertex-polarWhite shadow-md'
                        : 'bg-vertex-darkBg/60 border-vertex-facetIce/15 text-vertex-facetIce/80 hover:border-vertex-prismBlue/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-vertex-prismBlue text-vertex-ink' : 'bg-vertex-darkSurfaceElevated text-vertex-facetIce'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-xs">{w.name}</span>
                    </div>
                    {isSelected && <ArrowRight className="w-4 h-4 text-vertex-prismBlue" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Plantilla */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-extrabold text-vertex-polarWhite tracking-tight">
                Selecciona una plantilla para comenzar
              </h2>
              <p className="text-xs text-vertex-facetIce/80">
                Puedes cambiar de plantilla en cualquier momento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Kanban */}
              <div 
                onClick={() => setTemplateType('kanban')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  templateType === 'kanban' 
                    ? 'bg-vertex-apexTeal/20 border-vertex-prismBlue text-vertex-polarWhite shadow-lg ring-1 ring-vertex-prismBlue' 
                    : 'bg-vertex-darkBg/60 border-vertex-facetIce/15 text-vertex-facetIce/80 hover:border-vertex-prismBlue/40'
                }`}
              >
                <h3 className="font-bold text-base mb-1">Kanban</h3>
                <p className="text-xs text-vertex-facetIce/70 leading-relaxed">Supervisa el trabajo continuo mediante flujo de estado constante.</p>
              </div>

              {/* Gestión de proyectos */}
              <div 
                onClick={() => setTemplateType('project_mgmt')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  templateType === 'project_mgmt' 
                    ? 'bg-vertex-apexTeal/20 border-vertex-prismBlue text-vertex-polarWhite shadow-lg ring-1 ring-vertex-prismBlue' 
                    : 'bg-vertex-darkBg/60 border-vertex-facetIce/15 text-vertex-facetIce/80 hover:border-vertex-prismBlue/40'
                }`}
              >
                <h3 className="font-bold text-base mb-1">Gestión de proyectos</h3>
                <p className="text-xs text-vertex-facetIce/70 leading-relaxed">Ideal para listas, cronogramas Gantt y tableros interactivos.</p>
              </div>

              {/* Scrum */}
              <div 
                onClick={() => setTemplateType('scrum')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  templateType === 'scrum' 
                    ? 'bg-vertex-apexTeal/20 border-vertex-prismBlue text-vertex-polarWhite shadow-lg ring-1 ring-vertex-prismBlue' 
                    : 'bg-vertex-darkBg/60 border-vertex-facetIce/15 text-vertex-facetIce/80 hover:border-vertex-prismBlue/40'
                }`}
              >
                <h3 className="font-bold text-base mb-1">Scrum</h3>
                <p className="text-xs text-vertex-facetIce/70 leading-relaxed">Planifica sprints iterativos, estimaciones y metas ágiles.</p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Nombre */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-extrabold text-vertex-polarWhite tracking-tight">
                Nombre de la Organización / Espacio
              </h2>
              <p className="text-xs text-vertex-facetIce/80">
                Define la entidad principal donde colaborará tu equipo.
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <Input
                label="Nombre del Espacio"
                value={spaceName}
                onChange={(e) => setSpaceName(e.target.value)}
                placeholder="Ej. Mi equipo de gestión de proyectos"
              />

              <div className="space-y-2">
                <span className="text-xs font-semibold text-vertex-facetIce/70 block">Ejemplos sugeridos:</span>
                <div className="flex flex-wrap gap-2">
                  {presets.map(p => (
                    <button
                      key={p}
                      onClick={() => setSpaceName(p)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        spaceName === p
                          ? 'bg-vertex-prismBlue text-vertex-ink border-transparent font-bold'
                          : 'bg-vertex-darkBg text-vertex-facetIce border-vertex-facetIce/20 hover:border-vertex-prismBlue'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Componentes */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-extrabold text-vertex-polarWhite tracking-tight">
                Tipos de actividad requeridos
              </h2>
              <p className="text-xs text-vertex-facetIce/80">
                Componentes de trabajo habilitados para este espacio.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Función', desc: 'Una amplia funcionalidad o Épica mayor.' },
                { name: 'Tarea', desc: 'Una actividad pequeña de trabajo.' },
                { name: 'Historia', desc: 'Un requisito desde la perspectiva del usuario.' },
                { name: 'Error', desc: 'Un problema o bug a resolver.' },
              ].map(act => {
                const isSelected = selectedActivities.includes(act.name);
                return (
                  <button
                    key={act.name}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedActivities(selectedActivities.filter(a => a !== act.name));
                      } else {
                        setSelectedActivities([...selectedActivities, act.name]);
                      }
                    }}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-vertex-apexTeal/20 border-vertex-prismBlue text-vertex-polarWhite'
                        : 'bg-vertex-darkBg/60 border-vertex-facetIce/15 text-vertex-facetIce/70'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center ${
                      isSelected ? 'bg-vertex-prismBlue border-vertex-prismBlue text-vertex-ink font-bold' : 'border-vertex-facetIce/30'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-vertex-polarWhite">{act.name}</div>
                      <div className="text-[11px] text-vertex-facetIce/70">{act.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: Estados */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-extrabold text-vertex-polarWhite tracking-tight">
                Flujo de trabajo inicial
              </h2>
              <p className="text-xs text-vertex-facetIce/80">
                Define las columnas y etapas por las que pasará el trabajo.
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-2">
              {statuses.map((st, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    value={st}
                    onChange={(e) => {
                      const updated = [...statuses];
                      updated[idx] = e.target.value;
                      setStatuses(updated);
                    }}
                  />
                  <button
                    onClick={() => setStatuses(statuses.filter((_, i) => i !== idx))}
                    className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setStatuses([...statuses, 'Nuevo Estado'])}
                leftIcon={<Plus className="w-4 h-4" />}
                className="w-full justify-center"
              >
                Añadir Estado
              </Button>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between border-t border-vertex-facetIce/15 pt-4 mt-6">
          {step > 1 ? (
            <Button variant="secondary" size="sm" onClick={() => setStep(step - 1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Atrás
            </Button>
          ) : <div />}

          {step < 5 ? (
            <Button variant="primary" size="sm" onClick={() => setStep(step + 1)} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Continuar
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={handleComplete} rightIcon={<Check className="w-4 h-4" />} className="font-bold bg-emerald-600 hover:bg-emerald-700 text-white">
              ¡Empezar en Vertex Sprint!
            </Button>
          )}
        </div>

      </div>
    </div>
  );
};
