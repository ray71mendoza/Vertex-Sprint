import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { TypeBadge, PriorityBadge } from '../ui/Badge';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, 
  Search, Filter, Plus, X, Layers, Clock
} from 'lucide-react';
import { WorkItem } from '../../types';

export const ProjectCalendar: React.FC = () => {
  const { workItems, sprints, updateWorkItem, setSelectedItem } = useApp();
  
  const [currentMonth, setCurrentMonth] = useState('Agosto 2026');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUnscheduledDrawer, setShowUnscheduledDrawer] = useState(true);
  const [draggedItem, setDraggedItem] = useState<WorkItem | null>(null);

  // Unscheduled items (no dueDate set)
  const unscheduledItems = workItems.filter(i => !i.dueDate);

  // Scheduled items
  const scheduledItems = workItems.filter(i => !!i.dueDate);

  // Days matrix representation for August 2026 demo
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleDragStart = (e: React.DragEvent, item: WorkItem) => {
    e.dataTransfer.setData('text/plain', item.id);
    setDraggedItem(item);
  };

  const handleDropOnDay = (e: React.DragEvent, dayNum: number) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain') || draggedItem?.id;
    if (itemId) {
      const assignedDate = `2026-08-${dayNum < 10 ? '0' + dayNum : dayNum}`;
      updateWorkItem(itemId, { dueDate: assignedDate });
      setDraggedItem(null);
    }
  };

  const handleDragOverDay = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-200">
      
      {/* MAIN CALENDAR GRID AREA (Left 3/4) */}
      <div className="flex-1 space-y-6">
        
        {/* Calendar Navigation Header Controls */}
        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#0B4551] dark:bg-[#72C6E8] text-white dark:text-[#03252D]">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-[#03252D] dark:text-white">Calendario de Entregas</h3>
              <p className="text-xs text-[#536A70] dark:text-[#B6D1D8]">Visualiza sprints, versiones y tareas agendadas.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl bg-[#EDF4F5] dark:bg-[#123B45] text-[#03252D] dark:text-white hover:bg-[#D4D3D1]/40 cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-extrabold text-sm text-[#03252D] dark:text-white px-3">{currentMonth}</span>
              <button className="p-2 rounded-xl bg-[#EDF4F5] dark:bg-[#123B45] text-[#03252D] dark:text-white hover:bg-[#D4D3D1]/40 cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowUnscheduledDrawer(!showUnscheduledDrawer)}
              leftIcon={<Clock className="w-4 h-4 text-[#72C6E8]" />}
            >
              {showUnscheduledDrawer ? 'Ocultar Sin Programar' : 'Ver Sin Programar'}
            </Button>
          </div>
        </div>

        {/* Days Header */}
        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-6 shadow-xl space-y-4">
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-extrabold text-[#536A70] dark:text-[#B6D1D8] uppercase tracking-wider pb-3 border-b border-[#D4D3D1] dark:border-[#123B45]">
            <span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span>
          </div>

          {/* Month Days Grid */}
          <div className="grid grid-cols-7 gap-2 text-xs">
            {daysInMonth.map(day => {
              const dayString = `2026-08-${day < 10 ? '0' + day : day}`;
              const dayItems = scheduledItems.filter(i => i.dueDate === dayString);
              const activeSprintBar = sprints.find(s => s.status === 'active');

              return (
                <div
                  key={day}
                  onDragOver={handleDragOverDay}
                  onDrop={(e) => handleDropOnDay(e, day)}
                  className="min-h-[100px] p-2 rounded-xl bg-[#F7FAFB] dark:bg-[#123B45]/50 border border-[#D4D3D1]/60 dark:border-[#174A55] flex flex-col justify-between hover:border-[#72C6E8] transition-all"
                >
                  <div className="flex justify-between items-center text-[10px] font-bold text-[#536A70] dark:text-[#B6D1D8]">
                    <span className={day === 6 ? 'w-5 h-5 rounded-full bg-[#72C6E8] text-[#03252D] font-extrabold flex items-center justify-center' : ''}>
                      {day}
                    </span>
                  </div>

                  {/* Multi-day Sprint Bar Demo */}
                  {day >= 5 && day <= 19 && activeSprintBar && (
                    <div className="my-1 px-2 py-1 rounded bg-[#0B4551]/20 dark:bg-[#72C6E8]/20 border border-[#72C6E8]/40 text-[#72C6E8] font-bold text-[9px] truncate">
                      {day === 5 ? `🚩 ${activeSprintBar.name}` : ''}
                    </div>
                  )}

                  {/* Scheduled Items Tags */}
                  <div className="space-y-1 mt-1">
                    {dayItems.map(item => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className="p-1.5 rounded bg-white dark:bg-[#071A1F] border border-[#D4D3D1] dark:border-[#123B45] text-[10px] font-bold text-[#03252D] dark:text-white truncate cursor-pointer hover:border-[#72C6E8]"
                      >
                        <span className="text-[#72C6E8] font-mono mr-1">{item.key}</span>
                        {item.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* UNSCHEDULED ITEMS SIDE DRAWER (Matching Reference Screenshot 5 - Right 1/4) */}
      {showUnscheduledDrawer && (
        <div className="w-full lg:w-80 bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-6 shadow-xl space-y-6 shrink-0 h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-[#D4D3D1] dark:border-[#123B45]">
            <h4 className="font-extrabold text-sm text-[#03252D] dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#72C6E8]" />
              <span>Actividad no programada</span>
            </h4>
            <button 
              onClick={() => setShowUnscheduledDrawer(false)}
              className="p-1 text-[#536A70] hover:text-[#03252D] dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#536A70] dark:text-[#B6D1D8] leading-relaxed">
            Arrastra cada actividad al calendario para establecer una fecha de vencimiento.
          </p>

          <Input
            placeholder="Buscar elementos sin planificar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
            {unscheduledItems.map(item => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onClick={() => setSelectedItem(item)}
                className="p-4 rounded-xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] hover:border-[#72C6E8] space-y-2 cursor-grab active:cursor-grabbing shadow-xs transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-[#72C6E8]">{item.key}</span>
                  <PriorityBadge priority={item.priority} />
                </div>
                <div className="font-bold text-xs text-[#03252D] dark:text-white line-clamp-2">{item.title}</div>
                <div className="flex items-center justify-between text-[10px] pt-1">
                  <TypeBadge type={item.type} />
                  <span className="text-[#536A70] dark:text-[#B6D1D8] font-bold">Sin fecha</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
