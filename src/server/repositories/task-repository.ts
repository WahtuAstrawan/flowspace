import {
  Task,
  CreateTaskPayload,
  UpdateTaskPayload,
} from "../../core/entities/task";

export interface ITaskRepository {
  findById(id: string): Promise<Task | null>;
  findActiveTasks(): Promise<Task[]>;
  findCompletedTasksByDate(date: Date): Promise<Task[]>;
  create(payload: CreateTaskPayload): Promise<Task>;
  update(id: string, payload: UpdateTaskPayload): Promise<Task>;
  delete(id: string): Promise<void>;
  updateSortOrders(tasks: { id: string; sortOrder: number }[]): Promise<void>;
}

import { prisma } from "../db/prisma-client";

export class TaskRepository implements ITaskRepository {
  async findById(id: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      console.warn(`Task with ID ${id} not found in the database.`);
      return null;
    }

    return {
      ...task,
      priority: task.priority as Task["priority"],
      status: task.status as Task["status"],
    };
  }

  async findActiveTasks(): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: { status: "active" },
      orderBy: { sortOrder: "asc" },
    });

    return tasks.map((task) => ({
      ...task,
      priority: task.priority as Task["priority"],
      status: task.status as Task["status"],
    }));
  }

  async findCompletedTasksByDate(date: Date): Promise<Task[]> {
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const tasks = await prisma.task.findMany({
      where: {
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
    console.info(`Inserting new task into database: ${payload.title}`);

    const newTask = await prisma.task.create({
      data: {
        title: payload.title,
        description: payload.description,
        priority: payload.priority,
        status: payload.status,
        dueDate: payload.dueDate,
        sortOrder: payload.sortOrder,
      },
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
