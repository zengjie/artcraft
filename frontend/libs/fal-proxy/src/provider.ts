import { invoke } from "@tauri-apps/api/core";
import { create } from "zustand";

export type ServiceMode = "fal" | "artcraft";

const MODE_STORAGE_KEY = "artcraft.generationService";

/** The fal extension is compiled into this build. */
export const extensionAvailable = import.meta.env.VITE_FAL_PROXY === "true";

export function readServiceMode(): ServiceMode | undefined {
  try {
    const value = localStorage.getItem(MODE_STORAGE_KEY);
    return value === "fal" || value === "artcraft" ? value : undefined;
  } catch {
    return undefined;
  }
}

/**
 * fal surfaces exist only when the extension is built in AND the person chose
 * the team fal account as their generation service. One service at a time:
 * read once at module init; switching reloads the window so every module
 * re-reads it and the official UI stays byte-for-byte upstream in ArtCraft mode.
 */
export const enabled = extensionAvailable && readServiceMode() === "fal";

/** The service the app is currently running as. */
export const activeServiceMode: ServiceMode = enabled ? "fal" : "artcraft";

interface ServiceModeState {
  mode?: ServiceMode;
  choose: (mode: ServiceMode) => void;
}

export const useServiceMode = create<ServiceModeState>((set) => ({
  mode: readServiceMode(),
  choose: (mode) => {
    try { localStorage.setItem(MODE_STORAGE_KEY, mode); } catch { /* storage unavailable: the choice lasts this session */ }
    set({ mode });
    if (mode !== activeServiceMode) window.location.reload();
  },
}));

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
