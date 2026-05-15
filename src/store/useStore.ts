import { create } from "zustand";

interface AppState {
  token: string;
  activeTab: "users" | "posts";
  setToken: (token: string) => void;
  setActiveTab: (tab: "users" | "posts") => void;
  logout: () => void;
}

export const useStore = create<AppState>((set) => ({
  token: "",
  activeTab: "users",
  setToken: (newToken) => set({ token: newToken }),
  setActiveTab: (newTab) => set({ activeTab: newTab }),
  logout: () => set({ token: "", activeTab: "users" }),
}));
