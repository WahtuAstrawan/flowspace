export interface Task {
  id: string;
  workspaceId: string;
  title: string;
  description: string | null;
  priority: "low" | "medium" | "high";
  status: "active" | "completed";
  dueDate: Date | null;
  startTime: Date | null;
  endTime: Date | null;
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
  Omit<Task, "id" | "workspaceId" | "createdAt" | "updatedAt">
>;

export interface ITaskRepository {
  findById(id: string): Promise<Task | null>;
  findActiveTasksByWorkspace(workspaceId: string): Promise<Task[]>;
  findCompletedTasksByDateAndWorkspace(
    date: Date,
    workspaceId: string,
  ): Promise<Task[]>;
  create(payload: CreateTaskPayload): Promise<Task>;
  update(id: string, payload: UpdateTaskPayload): Promise<Task>;
  delete(id: string): Promise<void>;
  updateSortOrders(tasks: { id: string; sortOrder: number }[]): Promise<void>;
}
