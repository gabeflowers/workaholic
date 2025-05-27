import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";

export interface Note {
  id: string;
  body: string;
  color: string;
}

interface NoteState {
  notes: Note[];
  add(body: string, color: string): void;
  update(id: string, body: string): void;
  remove(id: string): void;
}

export const useNotes = create<NoteState>()(
  persist(
    (set) => ({
      notes: [],
      add: (body, color) =>
        set((s) => ({
          notes: [...s.notes, { id: uuid(), body, color }]
        })),
      update: (id, body) =>
        set((s) => ({
          notes: s.notes.map((n) => (n.id === id ? { ...n, body } : n))
        })),
      remove: (id) =>
        set((s) => ({ notes: s.notes.filter((n) => n.id !== id) }))
    }),
    { name: "dashboard-notes" }
  )
);
