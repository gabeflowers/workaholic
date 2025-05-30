import React, { useState, useRef, useEffect } from 'react';
import { Note } from '../types';
import { formatDateSafe } from '../utils/helpers';

interface StickyNoteProps {
  note: Note;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  onDelete: (id: string) => void;
}

const colorClasses: Record<Note['color'], string> = {
  yellow: 'note-card note-yellow',
  blue: 'note-card note-blue',
  green: 'note-card note-green',
  purple: 'note-card note-purple',
  pink: 'note-card note-pink',
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
    const colors: ('yellow' | 'blue' | 'green' | 'purple' | 'pink')[] = ['yellow', 'blue', 'green', 'purple', 'pink'];
    const currentIndex = colors.indexOf(note.color);
    const nextColor = colors[(currentIndex + 1) % colors.length];
    onUpdate(note.id, { color: nextColor });
  };

  if (isEditing) {
    return (
      <div className={`${colorClasses[note.color]} p-6 min-h-[200px] fade-in`}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`w-full bg-transparent border-none outline-none font-semibold text-lg mb-3 ${
            note.color === 'yellow' ? 'placeholder-gray-600 text-gray-800' : 'placeholder-white/60 text-white'
          }`}
          placeholder="✨ Título da nota..."
        />
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`w-full bg-transparent border-none outline-none resize-none text-base leading-relaxed ${
            note.color === 'yellow' ? 'placeholder-gray-600 text-gray-700' : 'placeholder-white/60 text-white/90'
          }`}
          placeholder="💭 Escreva sua nota aqui..."
          rows={4}
        />
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-black/20">
          <div className={`text-sm flex items-center gap-2 ${
            note.color === 'yellow' ? 'text-gray-600' : 'text-white/70'
          }`}>
            <span>💾</span>
            <span>Ctrl+Enter</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="btn-secondary text-sm px-3 py-2"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="btn-primary text-sm px-3 py-2"
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
      className={`${colorClasses[note.color]} p-6 min-h-[200px] cursor-pointer group fade-in`}
      onDoubleClick={() => setIsEditing(true)}
    >
      {note.title && (
        <h4 className={`font-semibold text-lg mb-3 flex items-center gap-2 ${
          note.color === 'yellow' ? 'text-gray-800' : 'text-white'
        }`}>
          <span>📝</span>
          {note.title}
        </h4>
      )}
      <p className={`text-base whitespace-pre-wrap leading-relaxed mb-4 ${
        note.color === 'yellow' ? 'text-gray-700' : 'text-white/90'
      }`}>
        {note.content}
      </p>
      
      <div className="flex justify-between items-center mt-auto pt-3 border-t border-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className={`text-sm flex items-center gap-2 ${
          note.color === 'yellow' ? 'text-gray-600' : 'text-white/70'
        }`}>
          <span>🕒</span>
          <span>{formatDateSafe(note.updatedAt)}</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              changeColor();
            }}
            className="p-2 hover:bg-black/10 rounded-lg transition-colors duration-200"
            title="Mudar cor"
          >
            <span className="text-base">🎨</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-2 hover:bg-black/10 rounded-lg transition-colors duration-200"
            title="Editar (duplo clique)"
          >
            <span className="text-base">✏️</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('🗑️ Tem certeza que deseja excluir esta nota?')) {
                onDelete(note.id);
              }
            }}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors duration-200"
            title="Excluir"
          >
            <span className="text-base text-red-500">🗑️</span>
          </button>
        </div>
      </div>
    </div>
  );
}; 