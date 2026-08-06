import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { TypeBadge, PriorityBadge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { 
  Plus, Filter, Search, Sparkles, CheckCircle2, 
  Clock, AlertCircle, ArrowRight, Play, Check
} from 'lucide-react';
import { WorkItem } from '../../types';

export const ScrumBoard: React.FC = () => {
  const { 
    columns, workItems, moveWorkItemStatus, 
    setSelectedItem, sprints,
    users, epics
  } = useApp();

  const activeSprint = sprints.find(s => s.status === 'active') || sprints[0];

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOverColId, setDragOverColId] = useState<string | null>(null);
  const [showCompleteSprintModal, setShowCompleteSprintModal] = useState(false);

  // Filter items by active sprint and search/filter controls
  const sprintItems = workItems.filter(item => {
    if (activeSprint && item.sprintId !== activeSprint.id) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && !item.key.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (filterPriority !== 'all' && item.priority !== filterPriority) return false;
    return true;
  });

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggedItemId(id);
  };

  const handleDragOver = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    if (dragOverColId !== colId) {
      setDragOverColId(colId);
    }
  };

  const handleDrop = (e: React.DragEvent, targetStatusId: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain') || draggedItemId;
    if (itemId) {
      moveWorkItemStatus(itemId, targetStatusId);
    }
    setDraggedItemId(null);
    setDragOverColId(null);
  };

  return (
    <div className="vertex-container p-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner - Active Sprint & Actions */}
      <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#72C6E8]/20 text-[#72C6E8] border border-[#72C6E8]/40 uppercase tracking-wider">
              {activeSprint ? activeSprint.name : 'Sprint Activo'}
            </span>
            {activeSprint && (
              <span className="text-xs font-bold text-[#536A70] dark:text-[#B6D1D8]">
                {activeSprint.startDate} — {activeSprint.endDate}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#03252D] dark:text-white">
            Tablero Scrum de Ejecución
          </h1>
          {activeSprint?.goal && (
            <p className="text-sm text-[#536A70] dark:text-[#B6D1D8] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Meta del Sprint:</strong> {activeSprint.goal}</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <Button
            variant="secondary"
            size="md"
            onClick={() => setShowCompleteSprintModal(true)}
            leftIcon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          >
            Completar Sprint
          </Button>
        </div>
      </div>

      {/* Filter Controls Bar - 48px Height Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#536A70] dark:text-[#B6D1D8]/60 pointer-events-none" />
          <input
            type="text"
            placeholder="Filtrar por título o clave (ej. VTX-101)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[48px] rounded-xl text-sm pl-11 pr-4 bg-white dark:bg-[#0D272C] text-[#03252D] dark:text-[#F8FBFC] border border-[#D4D3D1] dark:border-[#123B45] focus:border-[#72C6E8] outline-none transition-all shadow-xs font-medium"
          />
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="h-[48px] rounded-xl text-xs font-bold px-4 bg-white dark:bg-[#0D272C] text-[#03252D] dark:text-white border border-[#D4D3D1] dark:border-[#123B45] outline-none"
          >
            <option value="all">Todos los Tipos</option>
            <option value="story">Historias</option>
            <option value="task">Tareas</option>
            <option value="bug">Errores</option>
            <option value="epic">Épicas</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="h-[48px] rounded-xl text-xs font-bold px-4 bg-white dark:bg-[#0D272C] text-[#03252D] dark:text-white border border-[#D4D3D1] dark:border-[#123B45] outline-none"
          >
            <option value="all">Todas las Prioridades</option>
            <option value="highest">Muy Alta</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
        </div>
      </div>

      {/* KANBAN BOARD GRID - 24px Gap Between Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {columns.map(col => {
          const colItems = sprintItems.filter(item => item.statusId === col.id);
          const isOverWip = col.wipLimit ? colItems.length > col.wipLimit : false;
          const isOver = dragOverColId === col.id;

          return (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDrop={(e) => handleDrop(e, col.id)}
              className={`
                bg-white dark:bg-[#0D272C] border rounded-2xl p-5 space-y-5 transition-all min-h-[500px] flex flex-col justify-between shadow-lg
                ${isOver ? 'column-drag-over' : 'border-[#D4D3D1] dark:border-[#123B45]'}
              `}
            >
              {/* Column Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#D4D3D1] dark:border-[#123B45]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#72C6E8]" />
                    <h3 className="font-extrabold text-sm text-[#03252D] dark:text-white uppercase tracking-wider">
                      {col.name}
                    </h3>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                    isOverWip ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30' : 'bg-[#EDF4F5] dark:bg-[#123B45] text-[#536A70] dark:text-[#B6D1D8]'
                  }`}>
                    {colItems.length} {col.wipLimit ? `/ ${col.wipLimit}` : ''}
                  </span>
                </div>

                {/* Column Work Item Cards List */}
                <div className="space-y-4 min-h-[400px]">
                  {colItems.map(item => {
                    const assignee = users.find(u => u.id === item.assigneeId);
                    const epic = epics.find(e => e.id === item.epicId);

                    return (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item.id)}
                        onClick={() => setSelectedItem(item)}
                        className="bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] hover:border-[#72C6E8] rounded-xl p-5 space-y-4 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-all group"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono font-bold text-[#72C6E8]">{item.key}</span>
                          <PriorityBadge priority={item.priority} />
                        </div>

                        <h4 className="font-bold text-sm text-[#03252D] dark:text-white group-hover:text-[#72C6E8] transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </h4>

                        {epic && (
                          <div className="inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {epic.title}
                          </div>
                        )}

                        <div className="pt-3 border-t border-[#D4D3D1]/60 dark:border-[#174A55] flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <TypeBadge type={item.type} />
                            {item.storyPoints !== undefined && (
                              <span className="px-2 py-0.5 rounded bg-[#03252D] dark:bg-[#071A1F] text-[#72C6E8] font-mono font-bold text-[11px]">
                                {item.storyPoints} pts
                              </span>
                            )}
                          </div>

                          <Avatar user={assignee} size="xs" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* COMPLETE SPRINT MODAL */}
      <Modal
        isOpen={showCompleteSprintModal}
        onClose={() => setShowCompleteSprintModal(false)}
        title="Completar y Cerrar Sprint"
      >
        <div className="space-y-6">
          <p className="text-sm text-[#536A70] dark:text-[#B6D1D8]">
            Estás a punto de finalizar el sprint activo. Las tareas no terminadas se moverán automáticamente al Backlog del producto.
          </p>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#D4D3D1] dark:border-[#123B45]">
            <Button variant="ghost" onClick={() => setShowCompleteSprintModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => setShowCompleteSprintModal(false)}>
              Finalizar Sprint
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
