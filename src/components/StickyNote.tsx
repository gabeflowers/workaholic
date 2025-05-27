import React, { useState, useRef, useEffect } from 'react';
import { Note } from '../types';
import { formatDateSafe } from '../utils/helpers';

interface StickyNoteProps {
  note: Note;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  onDelete: (id: string) => void;
}

const colorClasses = {
  yellow: 'note-card note-yellow',
  blue: 'note-card note-blue',
  green: 'note-card note-green',
};

export const StickyNote: React.FC<StickyNoteProps> = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);
  const [title, setTitle] = useState(note.title || '');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(content.length, content.length);
    }
  }, [isEditing, content]);

  const handleSave = () => {
    onUpdate(note.id, {
      content: content.trim(),
      title: title.trim() || undefined,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setContent(note.content);
    setTitle(note.title || '');
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const changeColor = () => {
    const colors: ('yellow' | 'blue' | 'green')[] = ['yellow', 'blue', 'green'];
    const currentIndex = colors.indexOf(note.color);
    const nextColor = colors[(currentIndex + 1) % colors.length];
    onUpdate(note.id, { color: nextColor });
  };

  if (isEditing) {
    return (
      <div className={`${colorClasses[note.color]} p-4 min-h-[140px] fade-in`}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-none outline-none font-semibold text-base mb-2 placeholder-gray-600 text-gray-800"
          placeholder="✨ Título da nota..."
        />
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-none outline-none resize-none text-sm placeholder-gray-600 text-gray-700 leading-relaxed"
          placeholder="💭 Escreva sua nota aqui..."
          rows={3}
        />
        <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/30">
          <div className="text-xs text-gray-600 flex items-center gap-1">
            <span>💾</span>
            <span>Ctrl+Enter</span>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={handleCancel}
              className="btn-secondary text-xs px-2 py-1"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="btn-primary text-xs px-2 py-1"
              disabled={!content.trim()}
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
      className={`${colorClasses[note.color]} p-4 min-h-[140px] cursor-pointer group fade-in`}
      onDoubleClick={() => setIsEditing(true)}
    >
      {note.title && (
        <h4 className="font-semibold text-base mb-2 text-gray-800 flex items-center gap-1.5">
          <span>📝</span>
          {note.title}
        </h4>
      )}
      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed mb-3">
        {note.content}
      </p>
      
      <div className="flex justify-between items-center mt-auto pt-2 border-t border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="text-xs text-gray-600 flex items-center gap-1">
          <span>🕒</span>
          <span>{formatDateSafe(note.updatedAt)}</span>
        </div>
        <div className="flex gap-0.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              changeColor();
            }}
            className="p-1.5 hover:bg-white/50 rounded-lg transition-colors duration-200"
            title="Mudar cor"
          >
            <span className="text-sm">🎨</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-1.5 hover:bg-white/50 rounded-lg transition-colors duration-200"
            title="Editar (duplo clique)"
          >
            <span className="text-sm">✏️</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('🗑️ Tem certeza que deseja excluir esta nota?')) {
                onDelete(note.id);
              }
            }}
            className="p-1.5 hover:bg-red-100 rounded-lg transition-colors duration-200"
            title="Excluir"
          >
            <span className="text-sm text-red-600">🗑️</span>
          </button>
        </div>
      </div>
    </div>
  );
}; 