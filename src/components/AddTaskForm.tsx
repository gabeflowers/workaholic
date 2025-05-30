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
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (!isOpen) {
    return (
      <div className="mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-400/50 transition-all duration-200 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-lg">➕</span>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-white mb-1">Adicionar Nova Tarefa</h3>
              <p className="text-white/60 text-sm">Clique aqui para criar uma nova tarefa</p>
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-5 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-base">📝</span>
          </div>
          <h3 className="text-lg font-semibold text-white">Nova Tarefa</h3>
        </div>

        <div className="grid gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            placeholder="📋 Título da tarefa..."
            autoFocus
          />
          
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
            placeholder="💭 Descrição (opcional)..."
            rows={2}
          />
          
          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-white/50 flex items-center gap-1.5">
              <span>⚡</span>
              <span>Ctrl+Enter para salvar</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setTitle('');
                  setDescription('');
                }}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all text-sm"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white hover:from-purple-600 hover:to-pink-600 transition-all text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!title.trim()}
              >
                <span>✨</span>
                <span>Adicionar</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}; 