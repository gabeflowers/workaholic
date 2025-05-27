export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'done';
  createdAt: Date;
  completedAt?: Date;
}

export interface Note {
  id: string;
  title?: string;
  content: string;
  color: 'yellow' | 'blue' | 'green';
  createdAt: Date;
  updatedAt: Date;
}

export interface SpotifyConfig {
  embedUrl: string;
  lastUsed: Date;
}

export interface AppState {
  tasks: Task[];
  notes: Note[];
  spotifyConfig: SpotifyConfig | null;
}

export type KeyboardShortcut = {
  key: string;
  description: string;
  action: () => void;
}; 