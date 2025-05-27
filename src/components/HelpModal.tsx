import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + Shift + T', description: 'Alternar tema (Dark/Light)' },
    { key: 'Ctrl + T', description: 'Nova tarefa' },
    { key: 'Ctrl + N', description: 'Nova nota' },
    { key: 'Ctrl + Enter', description: 'Salvar (em formulários)' },
    { key: 'Esc', description: 'Cancelar edição' },
    { key: 'Duplo clique', description: 'Editar item' },
    { key: '?', description: 'Mostrar/ocultar ajuda' },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 fade-in">
      <div className="glass-card p-6 max-w-lg w-full mx-4 slide-up">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">⌨️</span>
            <div>
              <h2 className="text-xl font-bold mb-0.5">Atalhos de Teclado</h2>
              <p className="text-sm opacity-80">Acelere seu fluxo de trabalho</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            title="Fechar (Esc)"
          >
            <span className="text-lg opacity-70">✕</span>
          </button>
        </div>
        
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200"
            >
              <kbd className="font-mono text-xs bg-black/30 px-2.5 py-1.5 rounded-lg shadow-sm backdrop-blur-sm border border-white/20">
                {shortcut.key}
              </kbd>
              <span className="font-medium text-sm">{shortcut.description}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="text-center">
            <div className="text-xl mb-2">💡</div>
            <p className="text-xs opacity-80 leading-relaxed">
              Pressione <kbd className="font-mono bg-black/30 px-1.5 py-0.5 rounded text-xs border border-white/20">?</kbd> a qualquer momento para ver esta ajuda
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 