import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { TypeBadge, PriorityBadge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { Search, Filter, Plus, List, ArrowUpDown } from 'lucide-react';

export const ListView: React.FC = () => {
  const { workItems, setSelectedItem, users } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = workItems.filter(i => {
    if (searchQuery && !i.title.toLowerCase().includes(searchQuery.toLowerCase()) && !i.key.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="bg-white dark:bg-[#0D272C] border border-[#D4D3D1] dark:border-[#123B45] rounded-2xl p-8 shadow-xl space-y-6 animate-in fade-in duration-200">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#D4D3D1] dark:border-[#123B45]">
        <div>
          <h3 className="font-extrabold text-xl text-[#03252D] dark:text-white flex items-center gap-2">
            <List className="w-5 h-5 text-[#72C6E8]" />
            <span>Vista de Lista Interactiva</span>
          </h3>
          <p className="text-xs text-[#536A70] dark:text-[#B6D1D8]">Tabla configurable con ordenamiento y filtros.</p>
        </div>

        <Input
          placeholder="Filtrar por título o clave..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-72"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#D4D3D1] dark:border-[#123B45] text-[#536A70] dark:text-[#B6D1D8] font-extrabold uppercase tracking-wider">
              <th className="px-5 py-4">Clave</th>
              <th className="px-5 py-4">Tipo</th>
              <th className="px-5 py-4">Título</th>
              <th className="px-5 py-4">Estado</th>
              <th className="px-5 py-4">Prioridad</th>
              <th className="px-5 py-4">Responsable</th>
              <th className="px-5 py-4 text-right">Puntos</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D4D3D1]/60 dark:divide-[#123B45]">
            {filteredItems.map(item => {
              const assignee = users.find(u => u.id === item.assigneeId);
              return (
                <tr 
                  key={item.id} 
                  onClick={() => setSelectedItem(item)}
                  className="min-h-[60px] hover:bg-[#F7FAFB] dark:hover:bg-[#123B45]/50 transition-colors cursor-pointer"
                >
                  <td className="px-5 py-4 font-mono font-bold text-[#72C6E8]">{item.key}</td>
                  <td className="px-5 py-4"><TypeBadge type={item.type} /></td>
                  <td className="px-5 py-4 font-bold text-[#03252D] dark:text-white max-w-xs truncate">{item.title}</td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded bg-[#EDF4F5] dark:bg-[#071A1F] font-bold text-[10px] uppercase text-[#72C6E8]">
                      {item.statusId}
                    </span>
                  </td>
                  <td className="px-5 py-4"><PriorityBadge priority={item.priority} /></td>
                  <td className="px-5 py-4"><Avatar user={assignee} size="xs" /></td>
                  <td className="px-5 py-4 text-right font-mono font-bold text-[#72C6E8]">{item.storyPoints || 0} pts</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
