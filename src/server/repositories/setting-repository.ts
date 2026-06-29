import { prisma } from "../db/prisma-client";
import {
  AppSetting,
  ISettingRepository,
  SaveSettingPayload,
} from "@/src/core/entities/setting";

export class SettingRepository implements ISettingRepository {
  async findAllByWorkspace(workspaceId: string): Promise<AppSetting[]> {
    return prisma.setting.findMany({
      where: { workspaceId },
    });
  }

  async findByKeyAndWorkspace(
    key: string,
    workspaceId: string,
  ): Promise<AppSetting | null> {
    const setting = await prisma.setting.findUnique({
      where: {
        key_workspaceId: { key, workspaceId },
      },
    });

    if (!setting) {
      console.info(`Setting [${key}] not found in workspace ${workspaceId}.`);
    }

    return setting;
  }

  async save(payload: SaveSettingPayload): Promise<AppSetting> {
    console.info(
      `Saving application setting: [${payload.key}] for workspace ${payload.workspaceId}.`,
    );

    return prisma.setting.upsert({
      where: {
        key_workspaceId: { key: payload.key, workspaceId: payload.workspaceId },
      },
      update: {
        value: payload.value,
      },
      create: {
        key: payload.key,
        value: payload.value,
        workspaceId: payload.workspaceId,
      },
    });
  }
}
