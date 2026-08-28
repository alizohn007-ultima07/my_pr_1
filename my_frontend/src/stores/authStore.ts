import { create } from "zustand";
import { api } from "../api/ax";

type AuthState = {
  username: string;
  userId: string;
  isAuth: boolean;
  login: (username: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  register: (username: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  username: "",
  userId: "",
  isAuth: false,

  login: async (username, password) => {
    try {
      const resp = await api.post("/auth/login", { username, password });

      localStorage.setItem("token", resp.data.access_token);

      set({
        username: resp.data.username,
        userId: resp.data.user_id,   // ← ВАЖНО только для меня
        isAuth: true,
      });

      return { ok: true };
    } catch (err: any) {
      const msg = err.response?.data?.detail || "Ошибка входа";
      return { ok: false, error: msg };
    }
  },

  register: async (username, password) => {
    try {
      await api.post("/auth/register", { username, password });
      return { ok: true };
    } catch (err: any) {
      const msg = err.response?.data?.detail || "Ошибка регистрации";
      return { ok: false, error: msg };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ username: "", userId: "", isAuth: false });
  },
}));
