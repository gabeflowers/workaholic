import React, { useState } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { StickyNote } from './StickyNote';

export const NotesPanel: React.FC = () => {
  const { notes, addNote, updateNote, deleteNote } = useAppStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const handleAddNote = () => {
    if (newContent.trim()) {
      addNote(newContent.trim(), newTitle.trim() || undefined);
      setNewContent('');
      setNewTitle('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleAddNote();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewContent('');
      setNewTitle('');
    }
  };

  const startNewNote = () => {
    setIsAdding(true);
    setTimeout(() => {
      const titleInput = document.querySelector('#new-note-title') as HTMLInputElement;
      titleInput?.focus();
    }, 100);
  };

  return (
    <div className="glass-card compact-card h-full flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="heading-secondary text-lg mb-0">📝 Notas Rápidas</h2>
          <p className="text-xs opacity-70">
            {notes.length} {notes.length === 1 ? 'nota' : 'notas'}
          </p>
        </div>
        <button
          onClick={startNewNote}
          className="btn-primary flex items-center gap-1.5 text-sm px-3 py-1.5"
          title="Nova nota (Ctrl+N)"
        >
          <span>✨</span>
          <span>Nova</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-hidden min-h-0">
        <div className="space-y-3 max-h-full overflow-y-auto pr-1">
          {isAdding && (
            <div className="note-card note-yellow p-4 min-h-[160px] fade-in">
              <input
                id="new-note-title"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none font-semibold text-base mb-2 placeholder-gray-600 text-gray-800"
                placeholder="✨ Título da nota..."
              />
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-none outline-none resize-none text-sm placeholder-gray-600 text-gray-700 leading-relaxed"
                placeholder="💭 Escreva sua nota aqui..."
                rows={4}
              />
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/30">
                <div className="text-xs text-gray-600 flex items-center gap-1">
                  <span>💾</span>
                  <span>Ctrl+Enter</span>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => {
                      setIsAdding(false);
                      setNewContent('');
                      setNewTitle('');
                    }}
                    className="btn-secondary text-xs px-2 py-1"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddNote}
                    className="btn-primary text-xs px-2 py-1"
                    disabled={!newContent.trim()}
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          )}

          {notes.length === 0 && !isAdding ? (
            <div className="text-center py-8 opacity-60">
              <div className="text-4xl mb-3">📝</div>
              <p className="text-sm mb-2">Nenhuma nota ainda</p>
              <p className="text-xs opacity-75">
                Pressione <kbd className="bg-white/20 px-1.5 py-0.5 rounded text-xs">Ctrl+N</kbd> para criar
              </p>
            </div>
          ) : (
            notes.map((note, index) => (
              <div 
                key={note.id} 
                className="slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <StickyNote
                  note={note}
                  onUpdate={updateNote}
                  onDelete={deleteNote}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}; 