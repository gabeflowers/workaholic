import React, { useState } from 'react';
import { Task } from '../types';
import { formatDateSafe } from '../utils/helpers';

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  dragHandleProps?: any;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete, dragHandleProps }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="task-card p-4 fade-in">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input-field mb-3 text-base font-medium"
          placeholder="📝 Título da tarefa"
          autoFocus
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input-field mb-3 text-sm resize-none"
          placeholder="💭 Descrição (opcional)"
          rows={2}
        />
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <span>💾</span>
            <span>Ctrl+Enter para salvar</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="btn-secondary text-xs px-3 py-1.5"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="btn-primary text-xs px-3 py-1.5"
              disabled={!editTitle.trim()}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="task-card p-4 group cursor-pointer"
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-start gap-3 flex-1">
          {dragHandleProps && (
            <div
              {...dragHandleProps}
              className="drag-handle mt-1"
              title="Arrastar tarefa"
            >
              ⋮⋮
            </div>
          )}
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 text-base mb-1 leading-tight">
              {task.title}
            </h4>
            {task.description && (
              <p className="text-gray-600 text-sm leading-relaxed">{task.description}</p>
            )}
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-1 ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            title="Editar (duplo clique)"
          >
            <span className="text-base">✏️</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('🗑️ Tem certeza que deseja excluir esta tarefa?')) {
                onDelete(task.id);
              }
            }}
            className="p-2 hover:bg-red-100 rounded-lg transition-colors duration-200"
            title="Excluir"
          >
            <span className="text-base text-red-600">🗑️</span>
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
        <div className="text-xs text-gray-500 flex items-center gap-1">
          {task.status === 'done' ? (
            <>
              <span>✅</span>
                             <span>Concluída em {formatDateSafe(task.completedAt || task.createdAt)}</span>
            </>
          ) : (
            <>
              <span>📅</span>
              <span>Criada em {formatDateSafe(task.createdAt)}</span>
            </>
          )}
        </div>
        {task.status === 'todo' && (
          <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            Pendente
          </div>
        )}
        {task.status === 'done' && (
          <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
            Concluída
          </div>
        )}
      </div>
    </div>
  );
}; 