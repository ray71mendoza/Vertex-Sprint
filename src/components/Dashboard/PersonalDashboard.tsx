import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { TypeBadge, PriorityBadge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { 
  CheckSquare, Clock, AlertTriangle, TrendingUp, 
  ArrowRight, Activity, Calendar, Zap, Layers
} from 'lucide-react';

export const PersonalDashboard: React.FC = () => {
  const { 
    currentUser, workItems, sprints, 
    activityLogs, setSelectedItem, setActiveView 
  } = useApp();

  const activeSprint = sprints.find(s => s.status === 'active') || sprints[0];

  const myAssignedItems = workItems.filter(item => item.assigneeId === currentUser.id);
  const myPendingItems = myAssignedItems.filter(item => item.statusId !== 'done');
  const myCompletedItems = myAssignedItems.filter(item => item.statusId === 'done');

  const highPriorityItems = myPendingItems.filter(i => i.priority === 'highest' || i.priority === 'high');

  return (
    <div className="vertex-container p-8 md:p-10 space-y-10 animate-in fade-in duration-200">
      
      {/* Welcome Banner Card - 44px Title, 32px Padding */}
      <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 md:p-10 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
        <div className="space-y-3 max-w-3xl z-10">
          <div className="flex items-center gap-2 text-[#536A70] dark:text-[#B6D1D8]">
            <Zap className="w-4 h-4 text-[#72C6E8]" />
            <span className="text-xs font-extrabold uppercase tracking-wider">Espacio Personal de Trabajo</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#03252D] dark:text-white leading-tight">
            ¡Hola de nuevo, {currentUser.name}!
          </h1>
          <p className="text-base text-[#536A70] dark:text-[#B6D1D8] leading-relaxed">
            Tienes <strong className="text-[#72C6E8]">{myPendingItems.length} tareas pendientes</strong> asignadas en el sprint activo.
          </p>
        </div>

        <div className="flex items-center gap-4 z-10 shrink-0">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setActiveView('board')}
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="font-bold shadow-lg"
          >
            Ir al Tablero Scrum
          </Button>
        </div>
      </div>

      {/* Metric KPI Cards Grid - 32px Padding, 24px Gap */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-lg space-y-4">
          <div className="flex items-center justify-between text-[#536A70] dark:text-[#B6D1D8]">
            <span className="text-xs font-extrabold uppercase tracking-wider">Tareas Pendientes</span>
            <Clock className="w-5 h-5 text-[#72C6E8]" />
          </div>
          <div className="text-4xl font-extrabold text-[#03252D] dark:text-white tabular-nums">
            {myPendingItems.length}
          </div>
          <div className="text-xs text-[#536A70] dark:text-[#B6D1D8]">Asignadas a tu usuario</div>
        </div>

        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-lg space-y-4">
          <div className="flex items-center justify-between text-[#536A70] dark:text-[#B6D1D8]">
            <span className="text-xs font-extrabold uppercase tracking-wider">Alta Prioridad</span>
            <AlertTriangle className="w-5 h-5 text-rose-500" />
          </div>
          <div className="text-4xl font-extrabold text-rose-500 tabular-nums">
            {highPriorityItems.length}
          </div>
          <div className="text-xs text-[#536A70] dark:text-[#B6D1D8]">Requieren atención inmediata</div>
        </div>

        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-lg space-y-4">
          <div className="flex items-center justify-between text-[#536A70] dark:text-[#B6D1D8]">
            <span className="text-xs font-extrabold uppercase tracking-wider">Completadas</span>
            <CheckSquare className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-4xl font-extrabold text-emerald-500 tabular-nums">
            {myCompletedItems.length}
          </div>
          <div className="text-xs text-[#536A70] dark:text-[#B6D1D8]">En el ciclo actual</div>
        </div>

        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-lg space-y-4">
          <div className="flex items-center justify-between text-[#536A70] dark:text-[#B6D1D8]">
            <span className="text-xs font-extrabold uppercase tracking-wider">Sprint Activo</span>
            <Calendar className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-[#03252D] dark:text-white truncate">
            {activeSprint ? activeSprint.name : 'Sin Sprint'}
          </div>
          <div className="text-xs text-[#536A70] dark:text-[#B6D1D8]">En ejecución</div>
        </div>

      </div>

      {/* Main Two-Column Content Grid - 32px Gap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: High Priority Pending Work Items (2/3) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#D4D3D1] dark:border-[#123B45]">
            <h3 className="font-extrabold text-xl text-[#03252D] dark:text-white">
              Mis Tareas Prioritarias Pendientes
            </h3>
            <span className="text-xs font-bold text-[#72C6E8]">{myPendingItems.length} Elementos</span>
          </div>

          <div className="space-y-4">
            {myPendingItems.length === 0 ? (
              <div className="text-center py-12 text-sm text-[#536A70] dark:text-[#B6D1D8]">
                ¡No tienes tareas pendientes! Todo el trabajo está completado.
              </div>
            ) : (
              myPendingItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="min-h-[60px] p-5 rounded-xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] hover:border-[#72C6E8] flex items-center justify-between gap-4 cursor-pointer transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <TypeBadge type={item.type} />
                    <span className="font-mono font-bold text-xs text-[#72C6E8] shrink-0">{item.key}</span>
                    <span className="font-bold text-sm text-[#03252D] dark:text-white truncate">{item.title}</span>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <PriorityBadge priority={item.priority} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Activity Stream (1/3) */}
        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#D4D3D1] dark:border-[#123B45]">
            <h3 className="font-extrabold text-xl text-[#03252D] dark:text-white">
              Actividad Reciente
            </h3>
            <Activity className="w-5 h-5 text-[#72C6E8]" />
          </div>

          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            {activityLogs.slice(0, 8).map(log => (
              <div key={log.id} className="p-4 rounded-xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] text-xs space-y-1">
                <div className="flex items-center justify-between text-[#536A70] dark:text-[#B6D1D8] font-bold">
                  <span className="text-[#72C6E8]">{log.actorName}</span>
                  <span className="text-[10px] font-mono">{new Date(log.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="text-[#03252D] dark:text-white font-medium">{log.action}: {log.details}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
