"use server";

import { z } from "zod";
import { TaskRepository } from "@/src/server/repositories/task-repository";
import { Task } from "@/src/core/entities/task";
import { ActionResponse } from "./workspace-actions";
import { revalidatePath } from "next/cache";

const taskRepo = new TaskRepository();

const createTaskSchema = z.object({
  workspaceId: z.uuid("Invalid workspace ID"),
  title: z.string().min(1, "Task title is required").max(255),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

export async function fetchActiveTasks(
  workspaceId: string,
): Promise<ActionResponse<Task[]>> {
  try {
    if (!workspaceId) throw new Error("Workspace ID is missing");

    const tasks = await taskRepo.findActiveTasksByWorkspace(workspaceId);
    return { success: true, data: tasks };
  } catch (error) {
    console.error(`Failed to fetch tasks for workspace ${workspaceId}:`, error);
    return { success: false, error: "Failed to retrieve active tasks." };
  }
}

export async function createTask(
  payload: unknown,
): Promise<ActionResponse<Task>> {
  try {
    const validatedData = createTaskSchema.safeParse(payload);

    if (!validatedData.success) {
      console.warn("Task creation validation failed.");
      return { success: false, error: validatedData.error.message };
    }

    const newTask = await taskRepo.create({
      ...validatedData.data,
      description: null,
      status: "active",
      dueDate: null,
      startTime: null,
      endTime: null,
      sortOrder: 0,
    });

    revalidatePath("/dashboard");
    return { success: true, data: newTask };
  } catch (error) {
    console.error("Error creating task:", error);
    return { success: false, error: "Failed to create task in the database." };
  }
}
