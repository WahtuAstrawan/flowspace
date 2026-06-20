export interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: "low" | "medium" | "high";
  status: "active" | "completed";
  dueDate: Date | null;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
}

export type CreateTaskPayload = Omit<
  Task,
  "id" | "createdAt" | "updatedAt" | "completedAt"
>;

export type UpdateTaskPayload = Partial<
  Omit<Task, "id" | "createdAt" | "updatedAt">
>;
