export interface Note {
  id: string;
  workspaceId: string;
  title: string | null;
  content: string;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateNotePayload = Omit<Note, "id" | "createdAt" | "updatedAt">;
export type UpdateNotePayload = Partial<
  Omit<Note, "id" | "workspaceId" | "createdAt" | "updatedAt">
>;

export interface INoteRepository {
  findByIdAndWorkspace(id: string, workspaceId: string): Promise<Note | null>;
  findAllByWorkspace(workspaceId: string): Promise<Note[]>;
  create(payload: CreateNotePayload): Promise<Note>;
  update(
    id: string,
    workspaceId: string,
    payload: UpdateNotePayload,
  ): Promise<Note>;
  delete(id: string, workspaceId: string): Promise<void>;
}
