import { create } from 'zustand';
import { Task, Note, SpotifyConfig, AppState } from '../types';
import { generateId } from '../utils/helpers';
import { saveToStorage, loadFromStorage } from '../utils/storage';

interface AppStore extends AppState {
  // Task actions
  addTask: (title: string, description?: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: 'todo' | 'done') => void;
  
  // Note actions
  addNote: (content: string, title?: string, color?: 'yellow' | 'blue' | 'green') => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  
  // Spotify actions
  setSpotifyConfig: (embedUrl: string) => void;
  clearSpotifyConfig: () => void;
  
  // General actions
  loadData: () => void;
  saveData: () => void;
  clearAllData: () => void;
}

const initialState: AppState = {
  tasks: [],
  notes: [],
  spotifyConfig: null,
};

export const useAppStore = create<AppStore>((set, get) => ({
  ...initialState,
  
  // Task actions
  addTask: (title: string, description?: string) => {
    const newTask: Task = {
      id: generateId(),
      title,
      description,
      status: 'todo',
      createdAt: new Date(),
    };
    
    set((state) => ({
      tasks: [...state.tasks, newTask],
    }));
    
    get().saveData();
  },
  
  updateTask: (id: string, updates: Partial<Task>) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    }));
    
    get().saveData();
  },
  
  deleteTask: (id: string) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
    
    get().saveData();
  },
  
  moveTask: (id: string, status: 'todo' | 'done') => {
    const updates: Partial<Task> = { status };
    if (status === 'done') {
      updates.completedAt = new Date();
    } else {
      updates.completedAt = undefined;
    }
    
    get().updateTask(id, updates);
  },
  
  // Note actions
  addNote: (content: string, title?: string, color: 'yellow' | 'blue' | 'green' = 'yellow') => {
    const newNote: Note = {
      id: generateId(),
      title,
      content,
      color,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set((state) => ({
      notes: [...state.notes, newNote],
    }));
    
    get().saveData();
  },
  
  updateNote: (id: string, updates: Partial<Note>) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id 
          ? { ...note, ...updates, updatedAt: new Date() }
          : note
      ),
    }));
    
    get().saveData();
  },
  
  deleteNote: (id: string) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    }));
    
    get().saveData();
  },
  
  // Spotify actions
  setSpotifyConfig: (embedUrl: string) => {
    set({
      spotifyConfig: {
        embedUrl,
        lastUsed: new Date(),
      },
    });
    
    get().saveData();
  },
  
  clearSpotifyConfig: () => {
    set({ spotifyConfig: null });
    get().saveData();
  },
  
  // General actions
  loadData: () => {
    try {
      const savedData = loadFromStorage();
      if (savedData) {
        set(savedData);
      } else {
        // Adicionar dados de exemplo na primeira execução
        const exampleTasks: Task[] = [
          {
            id: 'example-1',
            title: 'Tarefa de exemplo',
            description: 'Esta é uma tarefa de exemplo. Duplo clique para editar!',
            status: 'todo',
            createdAt: new Date(),
          },
          {
            id: 'example-2',
            title: 'Tarefa concluída',
            description: 'Esta tarefa já foi concluída',
            status: 'done',
            createdAt: new Date(Date.now() - 86400000), // 1 dia atrás
            completedAt: new Date(),
          },
        ];
        
        set({ tasks: exampleTasks });
        get().saveData();
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Em caso de erro, limpar dados corrompidos e começar do zero
      localStorage.removeItem('productivity-panel-data');
      set(initialState);
    }
  },
  
  saveData: () => {
    const state = get();
    saveToStorage({
      tasks: state.tasks,
      notes: state.notes,
      spotifyConfig: state.spotifyConfig,
    });
  },
  
  clearAllData: () => {
    set(initialState);
    get().saveData();
  },
  
  // Função para resetar dados corrompidos
  resetCorruptedData: () => {
    localStorage.removeItem('productivity-panel-data');
    set(initialState);
    // Recriar dados de exemplo
    const exampleTasks: Task[] = [
      {
        id: 'example-1',
        title: 'Tarefa de exemplo',
        description: 'Esta é uma tarefa de exemplo. Duplo clique para editar!',
        status: 'todo',
        createdAt: new Date(),
      },
    ];
    set({ tasks: exampleTasks });
    get().saveData();
  },
})); 