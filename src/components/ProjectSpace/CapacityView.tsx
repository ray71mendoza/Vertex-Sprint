import React from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../ui/Avatar';
import { Clock, UserCheck, AlertCircle } from 'lucide-react';

export const CapacityView: React.FC = () => {
  const { users, workItems, sprints } = useApp();

  const activeSprint = sprints.find(s => s.status === 'active') || sprints[0];
  const currentSprint = activeSprint;
  const sprintItems = workItems.filter(i => currentSprint && i.sprintId === currentSprint.id);

  return (
    <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl space-y-8 animate-in fade-in duration-200">
      
      <div className="flex items-center justify-between pb-6 border-b border-[#D4D3D1] dark:border-[#123B45]">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#0B4551] dark:bg-[#72C6E8] text-white dark:text-[#03252D]">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-xl text-[#03252D] dark:text-white">Planificación de Capacidad del Equipo</h3>
            <p className="text-xs text-[#536A70] dark:text-[#B6D1D8]">Supervisa las horas y puntos asignados vs capacidad por desarrollador.</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {users.map(user => {
          const userItems = sprintItems.filter(i => i.assigneeId === user.id);
          const totalPoints = userItems.reduce((acc, i) => acc + (i.storyPoints || 0), 0);
          const maxCapacityPoints = 15; // Demo max capacity 15 pts
          const pct = Math.min(100, Math.round((totalPoints / maxCapacityPoints) * 100));

          return (
            <div key={user.id} className="p-6 rounded-2xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar user={user} size="sm" />
                  <div>
                    <div className="font-extrabold text-sm text-[#03252D] dark:text-white">{user.name} {user.lastName}</div>
                    <div className="text-xs text-[#536A70] dark:text-[#B6D1D8]">{user.jobTitle || user.role}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-extrabold text-sm text-[#72C6E8]">{totalPoints} / {maxCapacityPoints} Puntos</div>
                  <div className="text-[10px] font-bold text-[#536A70] dark:text-[#B6D1D8]">{userItems.length} tareas asignadas</div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="h-3 w-full bg-[#EDF4F5] dark:bg-[#071A1F] rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${pct > 90 ? 'bg-rose-500' : 'bg-gradient-to-r from-[#0B4551] to-[#72C6E8]'}`} 
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
