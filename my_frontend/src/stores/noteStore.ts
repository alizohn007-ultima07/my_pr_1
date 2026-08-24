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
};

export const useNoteStore = create<NoteState>((set) => ({
  notes: [],

  loadNotes: async () => {
    const resp = await api.get("/notes");
    set({ notes: resp.data });
  },
}));
