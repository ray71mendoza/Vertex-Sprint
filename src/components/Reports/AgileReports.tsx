import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { BarChart3, TrendingDown, Flame, PieChart, Download } from 'lucide-react';

export const AgileReports: React.FC = () => {
  const { sprints, workItems, users, columns, currentProject } = useApp();

  const projectItems = workItems.filter(i => i.projectId === currentProject.id);
  const projectSprints = sprints.filter(s => s.projectId === currentProject.id);

  // Burndown Data Mock for Active Sprint
  const activeSprint = projectSprints.find(s => s.status === 'active') || projectSprints[0];
  const totalCommitment = activeSprint?.initialCommitmentPoints || 24;

  const burndownDays = [
    { day: 'Día 1', remaining: 24, ideal: 24 },
    { day: 'Día 3', remaining: 21, ideal: 19 },
    { day: 'Día 5', remaining: 18, ideal: 15 },
    { day: 'Día 7', remaining: 14, ideal: 11 },
    { day: 'Día 9', remaining: 13, ideal: 7 },
    { day: 'Día 11', remaining: 8, ideal: 4 },
    { day: 'Día 14', remaining: 0, ideal: 0 }
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="vertex-facet-card p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-vertex-apexTeal/15 dark:bg-vertex-prismBlue/20 text-vertex-apexTeal dark:text-vertex-prismBlue flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-vertex-ink dark:text-vertex-polarWhite tracking-tight">
              Reportes Ágiles & Analítica Empresarial
            </h1>
          </div>
          <p className="text-xs text-vertex-facetMedium dark:text-vertex-facetIce/80">
            Análisis de velocidad del equipo, gráfico de Burndown y flujo acumulado en tiempo real.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => alert('Generando informe ejecutivo en PDF/JSON...')}
          leftIcon={<Download className="w-4 h-4" />}
        >
          Exportar Informe
        </Button>
      </div>

      {/* Grid of Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* REPORT 1: Burndown Chart */}
        <div className="vertex-facet-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-emerald-500" />
              <h3 className="font-bold text-vertex-ink dark:text-vertex-polarWhite text-sm">
                Burndown Chart ({activeSprint?.name})
              </h3>
            </div>
            <span className="text-xs text-emerald-500 font-semibold tabular-nums">
              {activeSprint?.completedPoints || 11} / {totalCommitment} Puntos Resueltos
            </span>
          </div>

          <div className="h-64 bg-vertex-lightSurfaceSubtle dark:bg-vertex-darkSurface rounded-xl p-4 border border-vertex-quartzGrey/50 dark:border-vertex-facetIce/15 relative flex items-end justify-between px-6">
            <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20">
              <div className="border-b border-vertex-quartzGrey dark:border-vertex-facetIce w-full" />
              <div className="border-b border-vertex-quartzGrey dark:border-vertex-facetIce w-full" />
              <div className="border-b border-vertex-quartzGrey dark:border-vertex-facetIce w-full" />
            </div>

            {burndownDays.map((d, idx) => {
              const realHeight = (d.remaining / totalCommitment) * 100;
              const idealHeight = (d.ideal / totalCommitment) * 100;

              return (
                <div key={idx} className="flex flex-col items-center gap-2 z-10">
                  <div className="flex items-end gap-1.5 h-44">
                    <div
                      style={{ height: `${idealHeight}%` }}
                      className="w-3 bg-vertex-quartzGrey dark:bg-vertex-facetDeep rounded-t"
                      title={`Ideal: ${d.ideal} pts`}
                    />
                    <div
                      style={{ height: `${realHeight}%` }}
                      className="w-3 bg-vertex-prismBlue rounded-t shadow-xs"
                      title={`Real: ${d.remaining} pts`}
                    />
                  </div>
                  <span className="text-[10px] text-vertex-facetMedium dark:text-vertex-facetIce/70 font-medium">{d.day}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-6 text-xs text-vertex-facetMedium dark:text-vertex-facetIce/70">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-vertex-quartzGrey dark:bg-vertex-facetDeep" /> Línea Ideal
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-vertex-prismBlue" /> Línea Real de Avance
            </div>
          </div>
        </div>

        {/* REPORT 2: Team Velocity */}
        <div className="vertex-facet-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-vertex-ink dark:text-vertex-polarWhite text-sm">
                Velocidad del Equipo por Sprint
              </h3>
            </div>
            <span className="text-xs text-amber-500 dark:text-amber-400 font-semibold tabular-nums">
              Promedio: 21 Story Points
            </span>
          </div>

          <div className="h-64 bg-vertex-lightSurfaceSubtle dark:bg-vertex-darkSurface rounded-xl p-4 border border-vertex-quartzGrey/50 dark:border-vertex-facetIce/15 flex items-end justify-around">
            {[
              { sprint: 'Sprint 11', committed: 22, completed: 20 },
              { sprint: 'Sprint 12', committed: 25, completed: 24 },
              { sprint: 'Sprint 13', committed: 20, completed: 18 },
              { sprint: 'Sprint 14', committed: 24, completed: 11 }
            ].map((s, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="flex items-end gap-1.5 h-44">
                  <div style={{ height: `${(s.committed / 30) * 100}%` }} className="w-4 bg-purple-500/50 border border-purple-400 rounded-t" title={`Comprometido: ${s.committed} pts`} />
                  <div style={{ height: `${(s.completed / 30) * 100}%` }} className="w-4 bg-emerald-500 rounded-t shadow-xs" title={`Completado: ${s.completed} pts`} />
                </div>
                <span className="text-[10px] text-vertex-facetMedium dark:text-vertex-facetIce/70 font-medium">{s.sprint}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-6 text-xs text-vertex-facetMedium dark:text-vertex-facetIce/70">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-purple-500/50" /> Comprometido
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-500" /> Completado
            </div>
          </div>
        </div>

        {/* REPORT 3: Cumulative Flow */}
        <div className="vertex-facet-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-vertex-ink dark:text-vertex-polarWhite text-sm">
              Distribución de Trabajo por Estado
            </h3>
          </div>

          <div className="space-y-3.5">
            {columns.map(col => {
              const count = projectItems.filter(i => i.statusId === col.id).length;
              const percentage = projectItems.length > 0 ? Math.round((count / projectItems.length) * 100) : 0;

              return (
                <div key={col.id} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-vertex-ink dark:text-vertex-polarWhite">
                    <span>{col.name}</span>
                    <span className="tabular-nums">{count} tareas ({percentage}%)</span>
                  </div>
                  <div className="w-full h-3 bg-vertex-quartzGrey/30 dark:bg-vertex-darkSurfaceElevated rounded-full overflow-hidden border border-vertex-quartzGrey/40 dark:border-vertex-facetIce/15">
                    <div
                      style={{ width: `${percentage}%`, backgroundColor: col.color }}
                      className="h-full rounded-full transition-all duration-300"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* REPORT 4: Workload by Assignee */}
        <div className="vertex-facet-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-vertex-prismBlue" />
            <h3 className="font-bold text-vertex-ink dark:text-vertex-polarWhite text-sm">
              Carga de Trabajo por Miembro
            </h3>
          </div>

          <div className="space-y-3.5">
            {users.map(u => {
              const userPoints = projectItems
                .filter(i => i.assigneeId === u.id)
                .reduce((acc, i) => acc + (i.storyPoints || 0), 0);
              const percentage = Math.min(100, Math.round((userPoints / 20) * 100));

              return (
                <div key={u.id} className="flex items-center gap-3">
                  <Avatar user={u} size="sm" />
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-vertex-ink dark:text-vertex-polarWhite">
                      <span>{u.name} {u.lastName}</span>
                      <span className="font-mono text-vertex-prismBlue tabular-nums">{userPoints} pts</span>
                    </div>
                    <div className="w-full h-2.5 bg-vertex-quartzGrey/30 dark:bg-vertex-darkSurfaceElevated rounded-full overflow-hidden">
                      <div style={{ width: `${percentage}%` }} className="h-full bg-gradient-to-r from-vertex-apexTeal to-vertex-prismBlue rounded-full" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
