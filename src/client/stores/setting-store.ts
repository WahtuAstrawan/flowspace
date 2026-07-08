import { create } from "zustand";
import {
  fetchSettings,
  updateSetting,
} from "@/src/server/actions/setting-actions";

export type SettingKey =
  | "theme"
  | "pomodoro_focus_duration"
  | "pomodoro_short_break"
  | "pomodoro_long_break"
  | "music_volume";

interface SettingsState {
  settings: Record<string, string>;
  isLoading: boolean;
  error: string | null;

  loadSettings: (workspaceId: string) => Promise<void>;
  setOptimisticSetting: (
    workspaceId: string,
    key: SettingKey,
    value: string,
  ) => Promise<void>;
  getParsedSetting: <T>(
    key: SettingKey,
    fallback: T,
    parser: (val: string) => T,
  ) => T;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: {},
  isLoading: true,
  error: null,

  loadSettings: async (workspaceId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchSettings(workspaceId);
      if (response.success) {
        set({ settings: response.data, isLoading: false });
      } else {
        set({ error: response.error, isLoading: false });
      }
    } catch (err) {
      console.error("Exception while fetching settings:", err);
      set({ error: "Failed to load settings from server", isLoading: false });
    }
  },

  setOptimisticSetting: async (
    workspaceId: string,
    key: SettingKey,
    value: string,
  ) => {
    const previousSettings = get().settings;

    set((state) => ({
      settings: { ...state.settings, [key]: value },
    }));

    try {
      const response = await updateSetting({ workspaceId, key, value });
      if (!response.success) {
        console.warn(
          `Server rejected setting update for [${key}]. Rolling back.`,
        );
        set({ settings: previousSettings, error: response.error });
      }
    } catch (err) {
      console.error(
        `Exception during setting sync for [${key}]. Rolling back.`,
      );
      set({ settings: previousSettings, error: "Network error during save." });
    }
  },

  getParsedSetting: <T>(
    key: SettingKey,
    fallback: T,
    parser: (val: string) => T,
  ): T => {
    const rawValue = get().settings[key];
    if (rawValue === undefined || rawValue === null) return fallback;
    try {
      return parser(rawValue);
    } catch {
      return fallback;
    }
  },
}));
