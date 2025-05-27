import { AppState } from '../types';

const STORAGE_KEY = 'productivity-panel-data';

export const saveToStorage = (data: AppState): void => {
  try {
    const serializedData = JSON.stringify(data, (_key, value) => {
      if (value instanceof Date) {
        return { __type: 'Date', value: value.toISOString() };
      }
      return value;
    });
    localStorage.setItem(STORAGE_KEY, serializedData);
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
  }
};

export const loadFromStorage = (): AppState | null => {
  try {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    if (!serializedData) return null;
    
    const data = JSON.parse(serializedData, (_key, value) => {
      if (value && typeof value === 'object' && value.__type === 'Date') {
        return new Date(value.value);
      }
      return value;
    });
    
    // Garantir que todas as datas sejam objetos Date válidos
    if (data.tasks) {
      data.tasks = data.tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
      }));
    }
    
    if (data.notes) {
      data.notes = data.notes.map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
    }
    
    if (data.spotifyConfig && data.spotifyConfig.lastUsed) {
      data.spotifyConfig.lastUsed = new Date(data.spotifyConfig.lastUsed);
    }
    
    return data;
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    return null;
  }
};

export const clearStorage = (): void => {
  localStorage.removeItem(STORAGE_KEY);
}; 