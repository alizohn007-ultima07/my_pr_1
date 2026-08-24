import { create } from "zustand";
import { api } from "../api/ax";

export type Comment = {
  id: string;
  content: string;
  author_id: string;
  author_username: string;
  note_id: string;
};

type CommentState = {
  comments: Record<string, Comment[]>; // noteId -> comments[]
  loadComments: (noteId: string) => Promise<void>;
  addComment: (noteId: string, content: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  editComment: (commentId: string, content: string) => Promise<void>;
  getComments: (noteId: string) => Comment[];
};

export const useCommentStore = create<CommentState>((set, get) => ({
  comments: {},

  loadComments: async (noteId) => {
    const resp = await api.get(`/notes/${noteId}/comments`);
    set({
      comments: {
        ...get().comments,
        [noteId]: resp.data,
      },
    });
  },

  addComment: async (noteId, content) => {
    const resp = await api.post(`/notes/${noteId}/comments`, { content });
    set({
      comments: {
        ...get().comments,
        [noteId]: [...(get().comments[noteId] || []), resp.data],
      },
    });
  },

  deleteComment: async (commentId) => {
    await api.delete(`/comments/${commentId}`);

    const all = get().comments;
    const updated: Record<string, Comment[]> = {};

    for (const noteId in all) {
      updated[noteId] = all[noteId].filter((c) => c.id !== commentId);
    }

    set({ comments: updated });
  },

  editComment: async (commentId, content) => {
    const resp = await api.put(`/comments/${commentId}`, { content });

    const all = get().comments;
    const updated: Record<string, Comment[]> = {};

    for (const noteId in all) {
      updated[noteId] = all[noteId].map((c) =>
        c.id === commentId ? resp.data : c
      );
    }

    set({ comments: updated });
  },

  getComments: (noteId) => {
    return get().comments[noteId] || [];
  },
}));
