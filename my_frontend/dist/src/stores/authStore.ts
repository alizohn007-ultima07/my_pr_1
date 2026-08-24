import { create } from "zustand";
import type {
  CreateUser,
  User,
  UserLoginRequest,
  UserLoginResponse,
} from "../types/user";
import { api } from "../api/ax";
import { AxiosError } from "axios";

export interface RegisterResult {
  success: boolean;
  error: string | null;
}

interface AuthState {
  user: User | null;
  error: string | null;

  register: (data: CreateUser) => Promise<RegisterResult>;
  login: (data: UserLoginRequest) => Promise<RegisterResult>;
  getAccessToken: () => string | null;
  setAccessToken: (token: string | null) => void;
  loadUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  error: null,

  register: async (data: CreateUser) => {
    try {
      await api.post("/auth/register", data);
      return { success: true, error: null };
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const details = error.response?.data?.detail;

        if (status === 422 && Array.isArray(details)) {
          const messages = details.map((entry: any) => entry.msg);
          return { success: false, error: messages.join("\n") };
        }

        if (status === 400) {
          return { success: false, error: "Такой пользователь уже существует" };
        }

        return { success: false, error: "Ошибка при выполнении запроса" };
      }

      return { success: false, error: "Ошибка при выполнении запроса" };
    }
  },

  login: async (data: UserLoginRequest) => {
    try {
      const resp = await api.post<UserLoginResponse>("/auth/login", data);
      get().setAccessToken(resp.data.access_token);
      return { success: true, error: null };
    } catch {
      return { success: false, error: "Не удалось войти" };
    }
  },

  getAccessToken: () => {
    return localStorage.getItem("access_token");
  },

  setAccessToken: (token) => {
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  },

  loadUser: async () => {},

  logout: async () => {
    get().setAccessToken(null);
    set({ user: null });
  },
}));
