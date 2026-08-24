import { create } from "zustand";
import { api } from "../api/ax";

export const useNoteStore = create((set) => ({
  notes: [],

  loadNotes: async () => {
    const resp = await api.get("/notes");
    set({ notes: resp.data });
  },
}));
