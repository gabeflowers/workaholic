import React, { useState } from 'react';
import { useAppStore } from '../stores/useAppStore';

export const AddTaskForm: React.FC = () => {
  const { addTask } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title.trim(), description.trim() || undefined);
      setTitle('');
      setDescription('');
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setTitle('');
      setDescription('');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="glass-card p-6 w-full hover:scale-[1.02] transition-transform duration-200 group"
      >
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl group-hover:scale-110 transition-transform duration-200">➕</span>
          <div className="text-left">
            <h3 className="heading-secondary text-xl mb-1">Adicionar Nova Tarefa</h3>
            <p className="text-white/70 text-sm">Clique para criar uma nova tarefa</p>
          </div>
        </div>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 fade-in">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">📝</span>
        <div>
          <h3 className="heading-secondary text-xl mb-1">Nova Tarefa</h3>
          <p className="text-white/70 text-sm">Preencha os detalhes da sua tarefa</p>
        </div>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input-field text-base font-medium"
          placeholder="📋 Título da tarefa"
          autoFocus
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input-field resize-none text-sm"
          placeholder="💭 Descrição (opcional)"
          rows={3}
        />
        
        <div className="flex justify-between items-center pt-2">
          <div className="text-xs text-white/60 flex items-center gap-1">
            <span>⚡</span>
            <span>Enter para adicionar, Esc para cancelar</span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setTitle('');
                setDescription('');
              }}
              className="btn-secondary"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-primary flex items-center gap-2"
              disabled={!title.trim()}
            >
              <span>✨</span>
              <span>Adicionar</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}; 