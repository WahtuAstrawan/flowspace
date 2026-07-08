export interface AppSetting {
  id: string;
  workspaceId: string;
  key: string;
  value: string;
  updatedAt: Date;
}

export type SaveSettingPayload = Pick<
  AppSetting,
  "key" | "value" | "workspaceId"
>;

export interface ISettingRepository {
  findAllByWorkspace(workspaceId: string): Promise<AppSetting[]>;

  findByKeyAndWorkspace(
    key: string,
    workspaceId: string,
  ): Promise<AppSetting | null>;

  save(payload: SaveSettingPayload): Promise<AppSetting>;
}
