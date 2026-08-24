import type { NoteCreate, NoteResponse } from "../types/note";
import { api } from "../api/ax";
import { create } from "zustand";

export interface NoteCreateResult {
  success: boolean;
  error: string;
}

interface NoteStore {
  notes: NoteResponse[];

  create: (data: NoteCreate) => Promise<NoteCreateResult>;
  getAll: () => Promise<NoteCreateResult>;
}

export const useNoteStore = create<NoteStore>((set, get) => ({
  notes: [],
  create: async (data: NoteCreate) => {
    try {
      const resp = await api.post("/notes", data);
      return { success: true, error: "" };
    } catch (err) {
      return { success: false, error: "" };
    }
  },
  getAll: async () => {
    try {
      const resp = await api.get<NoteResponse[]>("/notes");
      set({ notes: resp.data });
      return { success: true, error: "" };
    } catch (err) {
      return { success: false, error: "" };
    }
  },
}));