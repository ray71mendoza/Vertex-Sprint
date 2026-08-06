import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { TypeBadge, PriorityBadge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { 
  Plus, Search, Play, CheckCircle2, ChevronDown, ChevronRight, 
  Layers, Sparkles, Filter, MoreHorizontal, MoveRight
} from 'lucide-react';
import { WorkItem, WorkItemType, WorkItemPriority } from '../../types';

export const BacklogView: React.FC = () => {
  const { 
    workItems, sprints,
    setSelectedItem, addWorkItem, users, currentProject
  } = useApp();

  const activeSprint = sprints.find(s => s.status === 'active') || sprints[0];
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewItemModal, setShowNewItemModal] = useState(false);

  // New Item State
  const [itemTitle, setItemTitle] = useState('');
  const [itemType, setItemType] = useState<WorkItemType>('story');
  const [itemPriority, setItemPriority] = useState<WorkItemPriority>('medium');
  const [itemPoints, setItemPoints] = useState<number>(3);
  const [targetSprintId, setTargetSprintId] = useState<string | undefined>(activeSprint?.id);

  const backlogItems = workItems.filter(item => {
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) && !item.key.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const activeSprintItems = backlogItems.filter(i => activeSprint && i.sprintId === activeSprint.id);
  const unassignedItems = backlogItems.filter(i => !i.sprintId);

  const totalActivePoints = activeSprintItems.reduce((acc, i) => acc + (i.storyPoints || 0), 0);

  const handleCreateItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemTitle.trim()) return;

    addWorkItem({
      title: itemTitle,
      type: itemType,
      priority: itemPriority,
      storyPoints: itemPoints,
      sprintId: targetSprintId,
      statusId: 'todo',
      description: itemTitle,
      subtasks: [],
      acceptanceCriteria: [],
      reporterId: users[0]?.id || 'u-1',
      tags: [],
      watchers: [],
      projectId: currentProject.id
    });

    setItemTitle('');
    setShowNewItemModal(false);
  };

  return (
    <div className="vertex-container p-8 space-y-10 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#72C6E8]/20 text-[#72C6E8] border border-[#72C6E8]/40 uppercase tracking-wider">
              Product Backlog & Planificación
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#03252D] dark:text-white">
            Planificación de Sprints & Historias
          </h1>
          <p className="text-sm text-[#536A70] dark:text-[#B6D1D8]">
            Organiza el trabajo en sprints iterativos y asigna puntos de historia.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setShowNewItemModal(true)}
          leftIcon={<Plus className="w-5 h-5" />}
          className="shrink-0 font-bold"
        >
          Crear Elemento
        </Button>
      </div>

      {/* Search & Action Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#536A70] dark:text-[#B6D1D8]/60 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar por título o clave..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[48px] rounded-xl text-sm pl-11 pr-4 bg-white dark:bg-[#0D272C] text-[#03252D] dark:text-[#F8FBFC] border border-[#D4D3D1] dark:border-[#123B45] focus:border-[#72C6E8] outline-none transition-all shadow-xs font-medium"
          />
        </div>
      </div>

      {/* SPRINTS CONTAINERS - 32px Separation Between Sprints */}
      <div className="space-y-8">
        
        {/* ACTIVE SPRINT CONTAINER CARD */}
        {activeSprint && (
          <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#D4D3D1] dark:border-[#123B45]">
              <div className="flex items-center gap-4">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-extrabold text-lg text-[#03252D] dark:text-white">
                  {activeSprint.name}
                </h3>
                <span className="text-xs font-bold text-[#536A70] dark:text-[#B6D1D8]">
                  ({activeSprintItems.length} elementos • {totalActivePoints} Story Points)
                </span>
              </div>
            </div>

            {/* Active Sprint Items List */}
            <div className="space-y-3">
              {activeSprintItems.map(item => {
                const assignee = users.find(u => u.id === item.assigneeId);
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="min-h-[60px] p-4 rounded-xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] hover:border-[#72C6E8] flex items-center justify-between gap-4 cursor-pointer transition-all hover:shadow-md"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <TypeBadge type={item.type} />
                      <span className="font-mono font-bold text-xs text-[#72C6E8] shrink-0">{item.key}</span>
                      <span className="font-bold text-sm text-[#03252D] dark:text-white truncate">{item.title}</span>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <PriorityBadge priority={item.priority} />
                      {item.storyPoints !== undefined && (
                        <span className="px-2.5 py-1 rounded-lg bg-[#03252D] dark:bg-[#071A1F] text-[#72C6E8] font-mono font-bold text-xs">
                          {item.storyPoints} pts
                        </span>
                      )}
                      <Avatar user={assignee} size="xs" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* UNASSIGNED PRODUCT BACKLOG CONTAINER CARD */}
        <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#D4D3D1] dark:border-[#123B45]">
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-[#72C6E8]" />
              <h3 className="font-extrabold text-lg text-[#03252D] dark:text-white">
                Backlog Sin Asignar ({unassignedItems.length})
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {unassignedItems.map(item => {
              const assignee = users.find(u => u.id === item.assigneeId);
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="min-h-[60px] p-4 rounded-xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] hover:border-[#72C6E8] flex items-center justify-between gap-4 cursor-pointer transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <TypeBadge type={item.type} />
                    <span className="font-mono font-bold text-xs text-[#72C6E8] shrink-0">{item.key}</span>
                    <span className="font-bold text-sm text-[#03252D] dark:text-white truncate">{item.title}</span>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <PriorityBadge priority={item.priority} />
                    {item.storyPoints !== undefined && (
                      <span className="px-2.5 py-1 rounded-lg bg-[#03252D] dark:bg-[#071A1F] text-[#72C6E8] font-mono font-bold text-xs">
                        {item.storyPoints} pts
                      </span>
                    )}
                    <Avatar user={assignee} size="xs" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* CREATE WORK ITEM MODAL */}
      <Modal
        isOpen={showNewItemModal}
        onClose={() => setShowNewItemModal(false)}
        title="Crear Elemento de Trabajo"
      >
        <form onSubmit={handleCreateItemSubmit} className="space-y-6">
          <Input
            label="Título de la Historia / Tarea"
            placeholder="Ej. Implementar autenticación OAuth 2.0"
            value={itemTitle}
            onChange={(e) => setItemTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#03252D] dark:text-[#B6D1D8]">
                Tipo
              </label>
              <select
                value={itemType}
                onChange={(e) => setItemType(e.target.value as WorkItemType)}
                className="w-full h-[48px] rounded-xl text-sm px-4 outline-none bg-white dark:bg-[#071A1F] text-[#03252D] dark:text-white border border-[#D4D3D1] dark:border-[#123B45]"
              >
                <option value="story">Historia de Usuario</option>
                <option value="task">Tarea Técnica</option>
                <option value="bug">Error / Bug</option>
                <option value="epic">Épica</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#03252D] dark:text-[#B6D1D8]">
                Prioridad
              </label>
              <select
                value={itemPriority}
                onChange={(e) => setItemPriority(e.target.value as WorkItemPriority)}
                className="w-full h-[48px] rounded-xl text-sm px-4 outline-none bg-white dark:bg-[#071A1F] text-[#03252D] dark:text-white border border-[#D4D3D1] dark:border-[#123B45]"
              >
                <option value="highest">Muy Alta (Urgente)</option>
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Story Points (Estimación)"
              type="number"
              value={itemPoints}
              onChange={(e) => setItemPoints(parseInt(e.target.value) || 1)}
            />

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#03252D] dark:text-[#B6D1D8]">
                Sprint Asignado
              </label>
              <select
                value={targetSprintId || ''}
                onChange={(e) => setTargetSprintId(e.target.value || undefined)}
                className="w-full h-[48px] rounded-xl text-sm px-4 outline-none bg-white dark:bg-[#071A1F] text-[#03252D] dark:text-white border border-[#D4D3D1] dark:border-[#123B45]"
              >
                <option value="">📦 Backlog (Sin Sprint)</option>
                {sprints.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#D4D3D1] dark:border-[#123B45]">
            <Button type="button" variant="ghost" onClick={() => setShowNewItemModal(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" className="font-bold">
              Crear Elemento
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
