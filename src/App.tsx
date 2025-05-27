import React, { useEffect, useState } from 'react';
import { useAppStore } from './stores/useAppStore';
import { Clock } from './components/Clock';
import { KanbanBoard } from './components/KanbanBoard';
import { AddTaskForm } from './components/AddTaskForm';
import { NotesPanel } from './components/NotesPanel';
import { MusicPlayer } from './components/MusicPlayer';
import { HelpModal } from './components/HelpModal';

function App() {
  const { loadData } = useAppStore();
  const [showHelp, setShowHelp] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // Default dark
  });

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Atalho para ajuda (?)
      if (e.key === '?' && !e.ctrlKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
        setShowHelp(!showHelp);
      }
      
      // Atalho para alternar tema (Ctrl + Shift + T)
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        setIsDarkMode(!isDarkMode);
      }
      
      // Atalho para nova tarefa (Ctrl + T)
      if (e.ctrlKey && e.key === 't' && !e.shiftKey) {
        e.preventDefault();
        // Implementar foco no formulário de nova tarefa
      }
      
      // Atalho para nova nota (Ctrl + N)
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        // Implementar criação de nova nota
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showHelp, isDarkMode]);

  return (
    <div className={`min-h-screen p-4 transition-colors duration-300 ${isDarkMode ? 'theme-dark' : 'theme-light'}`}>
      <div className="max-w-[1900px] mx-auto">
        {/* Header compacto com título, relógio e controles */}
        <header className="mb-4 fade-in">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="heading-primary text-3xl mb-1">
                  Painel de Produtividade
                </h1>
                <p className="heading-secondary text-sm opacity-80">
                  Workspace inteligente para máxima produtividade
                </p>
              </div>
              <Clock />
            </div>
            
            <div className="flex items-center gap-3">
              {/* Toggle de tema */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="glass-card p-2.5 hover:scale-105 transition-all duration-200"
                title={`Alternar para tema ${isDarkMode ? 'claro' : 'escuro'} (Ctrl+Shift+T)`}
              >
                <span className="text-lg">
                  {isDarkMode ? '☀️' : '🌙'}
                </span>
              </button>
              
              {/* Botão de ajuda */}
              <button
                onClick={() => setShowHelp(true)}
                className="glass-card p-2.5 hover:scale-105 transition-all duration-200"
                title="Ajuda (pressione ?)"
              >
                <span className="text-lg">❓</span>
              </button>
            </div>
          </div>
        </header>

        {/* Layout principal otimizado - altura reduzida */}
        <main className="grid grid-cols-12 gap-4 h-[calc(100vh-140px)]">
          {/* Coluna esquerda - Kanban (65% da tela) */}
          <section className="col-span-8 space-y-4 slide-up">
            <AddTaskForm />
            <KanbanBoard />
          </section>

          {/* Coluna direita - Notas e Music Player (35% da tela) */}
          <aside className="col-span-4 flex flex-col gap-4 slide-up" style={{ animationDelay: '0.1s' }}>
            {/* Notas - altura fixa menor */}
            <div className="h-[45%] min-h-[300px]">
              <NotesPanel />
            </div>
            
            {/* Music Player - altura fixa menor */}
            <div className="h-[55%] min-h-[320px]">
              <MusicPlayer />
            </div>
          </aside>
        </main>
      </div>
      
      <HelpModal 
        isOpen={showHelp} 
        onClose={() => setShowHelp(false)} 
      />
    </div>
  );
}

export default App; 