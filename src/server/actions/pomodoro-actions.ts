"use server";

import { z } from "zod";
import { PomodoroRepository } from "../repositories/pomodoro-repository";
import { DailyStats } from "@/src/core/entities/pomodoro";
import { ActionResponse } from "./workspace-actions";
import { revalidatePath } from "next/cache";

const pomodoroRepo = new PomodoroRepository();

const recordSessionSchema = z.object({
  workspaceId: z.uuid(),
  type: z.enum(["focus", "short_break", "long_break"]),
  duration: z.number().positive(),
  elapsed: z.number().nonnegative(),
  completed: z.boolean(),
  startedAt: z.coerce.date(),
  endedAt: z.coerce.date().nullable(),
});

export async function recordPomodoroSession(
  payload: unknown,
): Promise<ActionResponse<void>> {
  try {
    const validated = recordSessionSchema.safeParse(payload);
    if (!validated.success)
      return { success: false, error: validated.error.message };

    const data = validated.data;

    await pomodoroRepo.saveSession(data);

    if (data.type === "focus" && data.completed) {
      const todayISO = new Date().toISOString().split("T")[0];
      const focusMinutes = Math.floor(data.elapsed / 60);

      await pomodoroRepo.incrementDailyStats(
        todayISO,
        data.workspaceId,
        focusMinutes,
        1,
        0,
      );
    }

    revalidatePath("/dashboard");
    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error recording pomodoro session:", error);
    return { success: false, error: "Failed to record session." };
  }
}

export async function fetchTodayStats(
  workspaceId: string,
): Promise<ActionResponse<DailyStats | null>> {
  try {
    const todayISO = new Date().toISOString().split("T")[0];
    const stats = await pomodoroRepo.getDailyStats(todayISO, workspaceId);
    return { success: true, data: stats };
  } catch (error) {
    console.error("Error fetching daily stats:", error);
    return { success: false, error: "Failed to fetch statistics." };
  }
}
