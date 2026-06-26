export interface PomodoroSession {
  id: string;
  workspaceId: string;
  type: "focus" | "short_break" | "long_break";
  duration: number;
  elapsed: number;
  completed: boolean;
  startedAt: Date;
  endedAt: Date | null;
  createdAt: Date;
}

export interface DailyStats {
  id: string;
  workspaceId: string;
  date: string;
  focusMinutes: number;
  pomodoroSessions: number;
  tasksCompleted: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateSessionPayload = Omit<PomodoroSession, "id" | "createdAt">;

export interface IPomodoroRepository {
  saveSession(payload: CreateSessionPayload): Promise<PomodoroSession>;
  getDailyStats(
    dateISO: string,
    workspaceId: string,
  ): Promise<DailyStats | null>;
  incrementDailyStats(
    dateISO: string,
    workspaceId: string,
    focusMinutesToAdd: number,
    sessionsToAdd: number,
    tasksToAdd: number,
  ): Promise<DailyStats>;
}
