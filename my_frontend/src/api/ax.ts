import axios from "axios";

export const api = axios.create({
  baseURL: "https://learnapi-v2.kpn3o.ru",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
