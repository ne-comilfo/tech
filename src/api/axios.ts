import axios from "axios";
import { useStore } from "../store/useStore";

export const api = axios.create({
  baseURL: "https://gorest.co.in/public/v2",
});

api.interceptors.request.use((config) => {
  const token = useStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
