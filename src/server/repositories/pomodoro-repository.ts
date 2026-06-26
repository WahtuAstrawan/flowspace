import { prisma } from "../db/prisma-client";
import {
  PomodoroSession,
  DailyStats,
  CreateSessionPayload,
  IPomodoroRepository,
} from "@/src/core/entities/pomodoro";

export class PomodoroRepository implements IPomodoroRepository {
  async saveSession(payload: CreateSessionPayload): Promise<PomodoroSession> {
    console.info(
      `Recording new pomodoro session for workspace ${payload.workspaceId}.`,
    );
    const session = await prisma.pomodoroSession.create({
      data: payload,
    });

    return {
      ...session,
      type: session.type as PomodoroSession["type"],
    };
  }

  async getDailyStats(
    dateISO: string,
    workspaceId: string,
  ): Promise<DailyStats | null> {
    return prisma.dailyStats.findUnique({
      where: {
        date_workspaceId: { date: dateISO, workspaceId },
      },
    });
  }

  async incrementDailyStats(
    dateISO: string,
    workspaceId: string,
    focusMinutesToAdd: number,
    sessionsToAdd: number,
    tasksToAdd: number,
  ): Promise<DailyStats> {
    console.info(
      `Incrementing stats for ${dateISO} in workspace ${workspaceId}.`,
    );

    return prisma.dailyStats.upsert({
      where: {
        date_workspaceId: { date: dateISO, workspaceId },
      },
      update: {
        focusMinutes: { increment: focusMinutesToAdd },
        pomodoroSessions: { increment: sessionsToAdd },
        tasksCompleted: { increment: tasksToAdd },
      },
      create: {
        date: dateISO,
        workspaceId: workspaceId,
        focusMinutes: focusMinutesToAdd,
        pomodoroSessions: sessionsToAdd,
        tasksCompleted: tasksToAdd,
      },
    });
  }
}
