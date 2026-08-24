import { create } from "zustand";
import { api } from "../api/ax";

export const useCommentStore = create((set, get) => ({
  comments: [],

  loadComments: async (noteId) => {
    const resp = await api.get(`/notes/${noteId}/comments`);
    set({ comments: resp.data });
  },

  addComment: async (noteId, content) => {
    const resp = await api.post(`/notes/${noteId}/comments`, { content });
    set({ comments: [...get().comments, resp.data] });
  },

  deleteComment: async (commentId) => {
    await api.delete(`/comments/${commentId}`);
    set({ comments: get().comments.filter((c) => c.id !== commentId) });
  },

  editComment: async (commentId, content) => {
    const resp = await api.put(`/comments/${commentId}`, { content });
    set({
      comments: get().comments.map((c) =>
        c.id === commentId ? resp.data : c
      ),
    });
  },

  getComments: (noteId) => {
    return get().comments.filter((c) => c.note_id === noteId);
  },
}));
