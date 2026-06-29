import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Workspace } from "@/src/core/entities/workspace";

interface WorkspaceState {
  activeWorkspaceId: string | null;
  workspaces: Workspace[];

  setActiveWorkspaceId: (id: string) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
  initialize: (workspaces: Workspace[], defaultId: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      activeWorkspaceId: null,
      workspaces: [],

      setActiveWorkspaceId: (id: string) => {
        console.info(`Switching active workspace to: ${id}`);
        set({ activeWorkspaceId: id });
      },

      setWorkspaces: (workspaces: Workspace[]) => {
        set({ workspaces });
      },

      initialize: (workspaces: Workspace[], defaultId: string) => {
        console.info("Initializing workspace store state.");
        set((state) => ({
          workspaces,
          activeWorkspaceId: state.activeWorkspaceId || defaultId,
        }));
      },
    }),
    {
      name: "flowspace-workspace-storage",
      partialize: (state) => ({ activeWorkspaceId: state.activeWorkspaceId }),
    },
  ),
);
