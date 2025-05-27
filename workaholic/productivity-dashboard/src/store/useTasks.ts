import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";

export interface Task {
  id: string;
  title: string;
  desc?: string;
  done: boolean;
}

interface TaskState {
  tasks: Task[];
  add(title: string, desc?: string): void;
  toggle(id: string): void;
  remove(id: string): void;
}

export const useTasks = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      add: (title, desc) =>
        set((s) => ({
          tasks: [...s.tasks, { id: uuid(), title, desc, done: false }]
        })),
      toggle: (id) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
          )
        })),
      remove: (id) =>
        set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) }))
    }),
    { name: "dashboard-tasks" }
  )
);
