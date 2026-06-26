export interface Workspace {
  id: string;
  name: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateWorkspacePayload = Pick<Workspace, "name"> &
  Partial<Pick<Workspace, "isDefault">>;
export type UpdateWorkspacePayload = Partial<
  Pick<Workspace, "name" | "isDefault">
>;

export interface IWorkspaceRepository {
  findById(id: string): Promise<Workspace | null>;
  findAll(): Promise<Workspace[]>;
  getDefaultWorkspace(): Promise<Workspace | null>;
  create(payload: CreateWorkspacePayload): Promise<Workspace>;
  update(id: string, payload: UpdateWorkspacePayload): Promise<Workspace>;
  delete(id: string): Promise<void>;
}
