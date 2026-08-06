import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { TypeBadge, PriorityBadge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { 
  X, CheckSquare, Clock, User, Tag, Layers, AlertTriangle, 
  Send, Trash2, MessageSquare, History, Shield, RefreshCw
} from 'lucide-react';
import { WorkItem, WorkItemPriority, AcceptanceCriterion, Subtask } from '../../types';

export const WorkItemDetailModal: React.FC = () => {
  const { 
    selectedItem, setSelectedItem, 
    updateWorkItem, deleteWorkItem,
    columns, users, epics, sprints,
    activityLogs, addComment, currentUser,
    conflictInfo, setConflictInfo
  } = useApp();

  const [commentText, setCommentText] = useState('');
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [newAcText, setNewAcText] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'subtasks' | 'comments' | 'history'>('details');

  if (!selectedItem) return null;

  const itemLogs = activityLogs.filter(l => l.issueId === selectedItem.id);

  const handleFieldChange = (changes: Partial<WorkItem>) => {
    updateWorkItem(selectedItem.id, changes, selectedItem.version);
  };

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;

    const newSub: Subtask = {
      id: `st-${Date.now()}`,
      title: newSubtaskTitle,
      completed: false
    };

    handleFieldChange({
      subtasks: [...selectedItem.subtasks, newSub]
    });
    setNewSubtaskTitle('');
  };

  const handleToggleSubtask = (subId: string) => {
    const updated = selectedItem.subtasks.map(s => s.id === subId ? { ...s, completed: !s.completed } : s);
    handleFieldChange({ subtasks: updated });
  };

  const handleAddAC = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAcText.trim()) return;

    const newAc: AcceptanceCriterion = {
      id: `ac-${Date.now()}`,
      text: newAcText,
      met: false
    };

    handleFieldChange({
      acceptanceCriteria: [...selectedItem.acceptanceCriteria, newAc]
    });
    setNewAcText('');
  };

  const handleToggleAC = (acId: string) => {
    const updated = selectedItem.acceptanceCriteria.map(ac => ac.id === acId ? { ...ac, met: !ac.met } : ac);
    handleFieldChange({ acceptanceCriteria: updated });
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(selectedItem.id, commentText);
    setCommentText('');
  };

  return (
    <Modal
      isOpen={!!selectedItem}
      onClose={() => setSelectedItem(null)}
      maxWidth="full"
      showCloseButton={false}
      title={
        <div className="flex items-center justify-between w-full pr-8">
          <div className="flex items-center gap-3">
            <TypeBadge type={selectedItem.type} />
            <span className="font-mono text-sm font-extrabold text-[#72C6E8] px-3 py-1 bg-[#72C6E8]/10 border border-[#72C6E8]/20 rounded-xl">
              {selectedItem.key}
            </span>
            <span className="text-xs font-bold text-[#536A70] dark:text-[#B6D1D8]">
              v{selectedItem.version} (Versión)
            </span>
          </div>

          <button
            onClick={() => {
              deleteWorkItem(selectedItem.id);
              setSelectedItem(null);
            }}
            className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer"
            title="Eliminar elemento"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Left Section (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <input
            type="text"
            value={selectedItem.title}
            onChange={(e) => handleFieldChange({ title: e.target.value })}
            className="w-full h-[52px] rounded-xl text-xl font-extrabold px-4 outline-none bg-transparent hover:bg-[#EDF4F5] dark:hover:bg-[#123B45] border border-transparent focus:border-[#72C6E8] text-[#03252D] dark:text-white transition-all"
          />

          {/* Tabs Navigation */}
          <div className="flex border-b border-[#D4D3D1] dark:border-[#123B45] text-xs font-extrabold gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-3 px-4 border-b-2 transition-all cursor-pointer ${
                activeTab === 'details' ? 'border-[#72C6E8] text-[#72C6E8]' : 'border-transparent text-[#536A70] dark:text-[#B6D1D8] hover:text-[#03252D] dark:hover:text-white'
              }`}
            >
              Descripción & Criterios
            </button>
            <button
              onClick={() => setActiveTab('subtasks')}
              className={`pb-3 px-4 border-b-2 transition-all cursor-pointer ${
                activeTab === 'subtasks' ? 'border-[#72C6E8] text-[#72C6E8]' : 'border-transparent text-[#536A70] dark:text-[#B6D1D8] hover:text-[#03252D] dark:hover:text-white'
              }`}
            >
              Subtareas ({selectedItem.subtasks.length})
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`pb-3 px-4 border-b-2 transition-all cursor-pointer ${
                activeTab === 'comments' ? 'border-[#72C6E8] text-[#72C6E8]' : 'border-transparent text-[#536A70] dark:text-[#B6D1D8] hover:text-[#03252D] dark:hover:text-white'
              }`}
            >
              Comentarios
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`pb-3 px-4 border-b-2 transition-all cursor-pointer ${
                activeTab === 'history' ? 'border-[#72C6E8] text-[#72C6E8]' : 'border-transparent text-[#536A70] dark:text-[#B6D1D8] hover:text-[#03252D] dark:hover:text-white'
              }`}
            >
              Historial
            </button>
          </div>

          {/* TAB 1: Details */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#03252D] dark:text-[#B6D1D8]">
                  Descripción
                </label>
                <textarea
                  value={selectedItem.description}
                  onChange={(e) => handleFieldChange({ description: e.target.value })}
                  className="w-full rounded-xl text-sm p-4 outline-none bg-[#F7FAFB] dark:bg-[#071A1F] border border-[#D4D3D1] dark:border-[#123B45] focus:border-[#72C6E8] text-[#03252D] dark:text-white h-32 leading-relaxed"
                />
              </div>

              {/* Acceptance Criteria */}
              <div className="p-6 rounded-2xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-[#03252D] dark:text-white uppercase tracking-wider">
                    Criterios de Aceptación
                  </h4>
                  <span className="text-xs font-bold text-[#72C6E8]">
                    {selectedItem.acceptanceCriteria.filter(a => a.met).length}/{selectedItem.acceptanceCriteria.length} Cumplidos
                  </span>
                </div>

                <div className="space-y-3">
                  {selectedItem.acceptanceCriteria.map(ac => (
                    <div key={ac.id} className="flex items-center gap-3 text-xs">
                      <input
                        type="checkbox"
                        checked={ac.met}
                        onChange={() => handleToggleAC(ac.id)}
                        className="rounded text-[#72C6E8] cursor-pointer"
                      />
                      <span className={ac.met ? 'line-through text-[#536A70] dark:text-[#B6D1D8]/50' : 'text-[#03252D] dark:text-white font-bold'}>
                        {ac.text}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddAC} className="flex gap-3 pt-2">
                  <Input
                    placeholder="Añadir criterio de aceptación..."
                    value={newAcText}
                    onChange={(e) => setNewAcText(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" variant="secondary" size="md">Añadir</Button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: Subtasks */}
          {activeTab === 'subtasks' && (
            <div className="space-y-4">
              <div className="space-y-3">
                {selectedItem.subtasks.map(st => (
                  <div key={st.id} className="p-4 rounded-xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] flex items-center justify-between text-xs font-bold">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={st.completed}
                        onChange={() => handleToggleSubtask(st.id)}
                        className="rounded text-[#72C6E8] cursor-pointer"
                      />
                      <span className={st.completed ? 'line-through text-[#536A70] dark:text-[#B6D1D8]/50' : 'text-[#03252D] dark:text-white'}>
                        {st.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddSubtask} className="flex gap-3 pt-2">
                <Input
                  placeholder="Título de la nueva subtarea..."
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" variant="primary" size="md">Añadir Subtarea</Button>
              </form>
            </div>
          )}

          {/* TAB 3: Comments */}
          {activeTab === 'comments' && (
            <div className="space-y-4">
              <form onSubmit={handlePostComment} className="space-y-3">
                <textarea
                  placeholder="Escribe un comentario..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full rounded-xl text-xs p-4 outline-none bg-[#F7FAFB] dark:bg-[#071A1F] border border-[#D4D3D1] dark:border-[#123B45] focus:border-[#72C6E8] text-[#03252D] dark:text-white h-28"
                />
                <div className="flex justify-end">
                  <Button type="submit" variant="primary" size="md" rightIcon={<Send className="w-4 h-4" />}>
                    Publicar
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: History */}
          {activeTab === 'history' && (
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {itemLogs.map(l => (
                <div key={l.id} className="p-4 rounded-xl bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] text-xs space-y-1">
                  <div className="flex items-center justify-between text-[#536A70] dark:text-[#B6D1D8] font-bold">
                    <span className="text-[#72C6E8]">{l.actorName}</span>
                    <span className="text-[10px] font-mono">{new Date(l.timestamp).toLocaleString('es-ES')}</span>
                  </div>
                  <div className="text-[#03252D] dark:text-white font-medium">{l.action}: {l.details}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Properties Panel (1/3) */}
        <div className="bg-[#F7FAFB] dark:bg-[#123B45] border border-[#D4D3D1] dark:border-[#174A55] rounded-2xl p-6 space-y-6 text-xs h-fit shadow-md">
          <h4 className="font-extrabold text-[#03252D] dark:text-white uppercase tracking-wider text-xs pb-3 border-b border-[#D4D3D1] dark:border-[#174A55]">
            Propiedades del Elemento
          </h4>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#536A70] dark:text-[#B6D1D8]">Estado</label>
            <select
              value={selectedItem.statusId}
              onChange={(e) => handleFieldChange({ statusId: e.target.value })}
              className="w-full h-[48px] rounded-xl text-xs px-4 bg-white dark:bg-[#071A1F] border border-[#D4D3D1] dark:border-[#123B45] outline-none text-[#03252D] dark:text-white font-bold"
            >
              {columns.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#536A70] dark:text-[#B6D1D8]">Responsable</label>
            <select
              value={selectedItem.assigneeId || ''}
              onChange={(e) => handleFieldChange({ assigneeId: e.target.value || undefined })}
              className="w-full h-[48px] rounded-xl text-xs px-4 bg-white dark:bg-[#071A1F] border border-[#D4D3D1] dark:border-[#123B45] outline-none text-[#03252D] dark:text-white font-medium"
            >
              <option value="">Sin asignar</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.name} {u.lastName}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#536A70] dark:text-[#B6D1D8]">Prioridad</label>
            <select
              value={selectedItem.priority}
              onChange={(e) => handleFieldChange({ priority: e.target.value as WorkItemPriority })}
              className="w-full h-[48px] rounded-xl text-xs px-4 bg-white dark:bg-[#071A1F] border border-[#D4D3D1] dark:border-[#123B45] outline-none text-[#03252D] dark:text-white font-medium"
            >
              <option value="highest">Muy Alta (Urgente)</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#536A70] dark:text-[#B6D1D8]">Sprint</label>
            <select
              value={selectedItem.sprintId || ''}
              onChange={(e) => handleFieldChange({ sprintId: e.target.value || undefined })}
              className="w-full h-[48px] rounded-xl text-xs px-4 bg-white dark:bg-[#071A1F] border border-[#D4D3D1] dark:border-[#123B45] outline-none text-[#03252D] dark:text-white font-medium"
            >
              <option value="">📦 Backlog (Sin Sprint)</option>
              {sprints.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Story Points"
              type="number"
              value={selectedItem.storyPoints || 0}
              onChange={(e) => handleFieldChange({ storyPoints: parseInt(e.target.value) || 0 })}
            />
            <Input
              label="Horas"
              type="number"
              value={selectedItem.loggedHours || 0}
              onChange={(e) => handleFieldChange({ loggedHours: parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>

      </div>

      {/* CONFLICT RESOLUTION MODAL */}
      {conflictInfo && (
        <Modal
          isOpen={!!conflictInfo}
          onClose={() => setConflictInfo(null)}
          title="¡Conflicto Concurrente Detectado!"
        >
          <div className="space-y-6">
            <p className="text-sm text-[#536A70] dark:text-[#B6D1D8]">
              Otro miembro del equipo modificó <strong className="text-[#72C6E8]">{conflictInfo.existingItem.key}</strong> mientras realizabas tus cambios.
            </p>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#D4D3D1] dark:border-[#123B45]">
              <Button variant="ghost" onClick={() => setConflictInfo(null)}>
                Cargar Versión Reciente
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  updateWorkItem(conflictInfo.existingItem.id, conflictInfo.attemptedChanges, conflictInfo.existingItem.version);
                  setConflictInfo(null);
                }}
              >
                Forzar Guardado
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </Modal>
  );
};
