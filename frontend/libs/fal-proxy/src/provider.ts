import { invoke } from "@tauri-apps/api/core";
import { create } from "zustand";

export const enabled = import.meta.env.VITE_FAL_PROXY === "true";
export const proxyCall = <T,>(operation: string, input: unknown = {}): Promise<T> =>
  invoke<T>("fal_proxy_command", { operation, input });
export interface ProxySession { logged_in: boolean; user?: { display_name: string; username: string; user_token: string } }
export const useProxySession = create<{ session?: ProxySession; refresh: () => Promise<void> }>((set) => ({
  refresh: async () => {
    if (!enabled) return;
    try { set({ session: await proxyCall<ProxySession>("session") }); }
    catch { set({ session: { logged_in: false } }); }
  },
}));
