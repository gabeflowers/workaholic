import { useEffect, useState } from 'react';
import { useAppStore } from './stores/useAppStore';
import { Clock } from './components/Clock';
import { Alarm } from './components/Alarm';
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
      <div className="w-full max-w-none mx-auto">
        {/* Header redesenhado - mais minimalista */}
        <header className="mb-4 fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-xl">⚡</span>
                </div>
                <div>
                  <h1 className="heading-primary text-3xl mb-0">
                    Workaholic
                  </h1>
                  <p className="text-large opacity-75">
                    Produtividade com foco
                  </p>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center gap-3 relative">
                  <Clock />
                  <Alarm />
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Toggle de tema redesenhado */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="glass-card p-3 hover:scale-105 transition-all duration-200 group"
                title={`Alternar para tema ${isDarkMode ? 'claro' : 'escuro'} (Ctrl+Shift+T)`}
              >
                <span className="text-xl group-hover:scale-110 transition-transform">
                  {isDarkMode ? '☀️' : '🌙'}
                </span>
              </button>
              
              {/* Botão de ajuda redesenhado */}
              <button
                onClick={() => setShowHelp(true)}
                className="glass-card p-3 hover:scale-105 transition-all duration-200 group"
                title="Ajuda (pressione ?)"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">❓</span>
              </button>
            </div>
          </div>
        </header>

        {/* Layout principal otimizado - ocupando toda a tela */}
        <main className="grid grid-cols-12 gap-4 h-[calc(100vh-120px)]">
          {/* Coluna esquerda - Kanban (75% da tela) */}
          <section className="col-span-12 xl:col-span-9 flex flex-col slide-up">
            <AddTaskForm />
            <div className="flex-1 min-h-0">
              <KanbanBoard />
            </div>
          </section>

          {/* Coluna direita - Notas e Music Player (25% da tela) */}
          <aside className="col-span-12 xl:col-span-3 flex flex-col gap-4 slide-up" style={{ animationDelay: '0.1s' }}>
            {/* Music Player - posição prioritária */}
            <div className="h-[350px] min-h-[350px]">
              <MusicPlayer />
            </div>
            
            {/* Notas - altura flexível */}
            <div className="flex-1 min-h-[300px]">
              <NotesPanel />
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