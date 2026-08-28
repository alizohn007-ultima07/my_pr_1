import { create } from "zustand";
import { api } from "../api/ax";

export type Note = {
  id: string;
  title: string;
  content: string;
};

type NoteState = {
  notes: Note[];
  loadNotes: () => Promise<void>;
  createNote: (note: Omit<Note, "id">) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
};

export const useNoteStore = create<NoteState>((set) => ({
  notes: [],

  loadNotes: async () => {
    const resp = await api.get("/notes");
    set({ notes: resp.data });
  },

  createNote: async (note) => {
    const resp = await api.post("/notes", note);
    set((state) => ({
      notes: [...state.notes, resp.data],
    }));
  },

  deleteNote: async (id) => {
    await api.delete(`/notes/${id}`);
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
    }));
  },
}));
