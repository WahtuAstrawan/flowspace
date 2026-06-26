import { prisma } from "../db/prisma-client";

import {
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
  ITaskRepository,
} from "@/src/core/entities/task";

export class TaskRepository implements ITaskRepository {
  async findById(id: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return null;

    return {
      ...task,
      priority: task.priority as Task["priority"],
      status: task.status as Task["status"],
    };
  }

  async findActiveTasksByWorkspace(workspaceId: string): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: {
        workspaceId: workspaceId,
        status: "active",
      },
      orderBy: { sortOrder: "asc" },
    });

    return tasks.map((task) => ({
      ...task,
      priority: task.priority as Task["priority"],
      status: task.status as Task["status"],
    }));
  }

  async findCompletedTasksByDateAndWorkspace(
    date: Date,
    workspaceId: string,
  ): Promise<Task[]> {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const tasks = await prisma.task.findMany({
      where: {
        workspaceId: workspaceId,
        status: "completed",
        completedAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: { completedAt: "desc" },
    });

    return tasks.map((task) => ({
      ...task,
      priority: task.priority as Task["priority"],
      status: task.status as Task["status"],
    }));
  }

  async create(payload: CreateTaskPayload): Promise<Task> {
    console.info(
      `Inserting new task into workspace ${payload.workspaceId}: ${payload.title}`,
    );

    const newTask = await prisma.task.create({
      data: payload,
    });

    return {
      ...newTask,
      priority: newTask.priority as Task["priority"],
      status: newTask.status as Task["status"],
    };
  }

  async update(id: string, payload: UpdateTaskPayload): Promise<Task> {
    console.info(`Updating task ${id} in database.`);

    const updateData = { ...payload };
    if (payload.status === "completed") {
      updateData.completedAt = new Date();
    } else if (payload.status === "active") {
      updateData.completedAt = null;
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: updateData,
    });

    return {
      ...updatedTask,
      priority: updatedTask.priority as Task["priority"],
      status: updatedTask.status as Task["status"],
    };
  }

  async delete(id: string): Promise<void> {
    console.info(`Deleting task ${id} from database.`);
    await prisma.task.delete({
      where: { id },
    });
  }

  async updateSortOrders(
    tasks: { id: string; sortOrder: number }[],
  ): Promise<void> {
    console.info(`Updating sort orders for ${tasks.length} tasks.`);

    await prisma.$transaction(
      tasks.map((task) =>
        prisma.task.update({
          where: { id: task.id },
          data: { sortOrder: task.sortOrder },
        }),
      ),
    );
  }
}
