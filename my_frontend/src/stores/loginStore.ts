import { create } from "zustand";
import { api } from "../api/ax";

export const useLoginStore = create((set) => ({
  username: "",
  userId: "",

  login: async (username, password) => {
    const resp = await api.post("/auth/login", { username, password });
    localStorage.setItem("token", resp.data.access_token);
    set({ username: resp.data.username, userId: resp.data.user_id });
  },
}));
