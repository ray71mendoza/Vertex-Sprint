import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ArrowRight, Flag, Layers } from 'lucide-react';
import { ProjectPhase, Project } from '../../types';

export const ProjectPhaseTimeline: React.FC = () => {
  const { currentProject, setProjects } = useApp();

  if (!currentProject.phases || currentProject.phases.length === 0) return null;

  const handleAdvancePhase = (phaseId: string) => {
    const updatedPhases = currentProject.phases?.map(p => {
      if (p.id === phaseId) return { ...p, status: 'active' as const };
      const currentIdx = currentProject.phases?.findIndex(ph => ph.id === phaseId) || 0;
      const thisIdx = currentProject.phases?.findIndex(ph => ph.id === p.id) || 0;
      if (thisIdx < currentIdx) return { ...p, status: 'completed' as const };
      return { ...p, status: 'future' as const };
    });

    setProjects((prev: Project[]) => prev.map((prj: Project) => {
      if (prj.id === currentProject.id) {
        return {
          ...prj,
          phases: updatedPhases,
          currentPhaseId: phaseId
        };
      }
      return prj;
    }));
  };

  return (
    <div className="bg-vertex-lightSurface/80 dark:bg-vertex-darkSurface/80 backdrop-blur-xs border-b border-vertex-quartzGrey/50 dark:border-vertex-facetIce/15 px-4 py-2 flex items-center justify-between text-xs transition-colors">
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-6 h-6 rounded-lg bg-vertex-apexTeal/15 dark:bg-vertex-prismBlue/20 text-vertex-apexTeal dark:text-vertex-prismBlue flex items-center justify-center">
          <Flag className="w-3.5 h-3.5" />
        </div>
        <span className="font-bold text-vertex-ink dark:text-vertex-polarWhite text-[11px] uppercase tracking-wider">
          Fases del Proyecto:
        </span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto flex-1 mx-4 py-0.5 no-scrollbar">
        {currentProject.phases.map((phase, idx) => {
          const isCompleted = phase.status === 'completed';
          const isActive = phase.status === 'active';

          return (
            <div key={phase.id} className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => handleAdvancePhase(phase.id)}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all duration-150 border cursor-pointer
                  ${isCompleted 
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30' 
                    : isActive 
                    ? 'bg-vertex-apexTeal text-white dark:bg-vertex-prismBlue dark:text-vertex-ink border-transparent font-bold shadow-xs' 
                    : 'bg-vertex-lightSurfaceSubtle dark:bg-vertex-darkSurfaceElevated text-vertex-facetMedium dark:text-vertex-facetIce/70 border-vertex-quartzGrey/40 dark:border-vertex-facetIce/20 hover:text-vertex-ink dark:hover:text-white'
                  }
                `}
              >
                {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                {isActive && <span className="w-2 h-2 rounded-full bg-white dark:bg-vertex-ink animate-pulse" />}
                <span>{phase.name}</span>
              </button>

              {idx < currentProject.phases!.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 text-vertex-facetMedium dark:text-vertex-facetIce/40 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
