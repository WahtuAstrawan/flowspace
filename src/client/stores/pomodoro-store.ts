import { create } from "zustand";
import { recordPomodoroSession } from "@/src/server/actions/pomodoro-actions";

export type SessionType = "focus" | "short_break" | "long_break";
export type TimerStatus = "idle" | "running" | "paused";

interface PomodoroState {
  status: TimerStatus;
  sessionType: SessionType;
  timeLeft: number; // in seconds
  sessionsCompletedToday: number;
  sessionStartTime: Date | null;

  startTimer: () => void;
  pauseTimer: () => void;
  tick: () => void;
  completeSession: (
    workspaceId: string,
    configuredDurations: Record<SessionType, number>,
  ) => Promise<void>;
  resetForNewWorkspace: (defaultFocusDuration: number) => void;
}

export const usePomodoroStore = create<PomodoroState>((set, get) => ({
  status: "idle",
  sessionType: "focus",
  timeLeft: 25 * 60,
  sessionsCompletedToday: 0,
  sessionStartTime: null,

  startTimer: () => {
    set((state) => ({
      status: "running",
      sessionStartTime: state.sessionStartTime || new Date(),
    }));
  },

  pauseTimer: () => {
    set({ status: "paused" });
  },

  tick: () => {
    const { status, timeLeft } = get();
    if (status === "running" && timeLeft > 0) {
      set({ timeLeft: Math.max(0, timeLeft - 1) });
    }
  },

  completeSession: async (workspaceId: string, configuredDurations) => {
    const { sessionType, sessionStartTime, sessionsCompletedToday } = get();
    const now = new Date();

    const expectedDuration = configuredDurations[sessionType];

    recordPomodoroSession({
      workspaceId,
      type: sessionType,
      duration: expectedDuration,
      elapsed: expectedDuration,
      completed: true,
      startedAt:
        sessionStartTime || new Date(now.getTime() - expectedDuration * 1000),
      endedAt: now,
    }).catch((err) =>
      console.error("Failed to sync pomodoro session to DB:", err),
    );

    let nextSessionType: SessionType = "focus";
    let updatedSessionsCompleted = sessionsCompletedToday;

    if (sessionType === "focus") {
      updatedSessionsCompleted += 1;
      nextSessionType =
        updatedSessionsCompleted % 4 === 0 ? "long_break" : "short_break";
    }

    set({
      status: "idle",
      sessionType: nextSessionType,
      timeLeft: configuredDurations[nextSessionType],
      sessionsCompletedToday: updatedSessionsCompleted,
      sessionStartTime: null,
    });
  },

  resetForNewWorkspace: (defaultFocusDuration: number) => {
    console.info(
      "Workspace changed. Resetting Pomodoro state to prevent data leakage.",
    );
    set({
      status: "idle",
      sessionType: "focus",
      timeLeft: defaultFocusDuration,
      sessionsCompletedToday: 0,
      sessionStartTime: null,
    });
  },
}));
