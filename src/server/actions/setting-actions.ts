"use server";

import { z } from "zod";
import { SettingRepository } from "../repositories/setting-repository";
import { ActionResponse } from "./workspace-actions";

const settingRepo = new SettingRepository();

const updateSettingSchema = z.object({
  workspaceId: z.uuid(),
  key: z.string().min(1),
  value: z.string(),
});

export async function fetchSettings(
  workspaceId: string,
): Promise<ActionResponse<Record<string, string>>> {
  try {
    if (!workspaceId) throw new Error("Workspace ID is missing");

    const settingsEntities = await settingRepo.findAllByWorkspace(workspaceId);

    const settingsMap: Record<string, string> = {};
    settingsEntities.forEach((setting) => {
      settingsMap[setting.key] = setting.value;
    });

    return { success: true, data: settingsMap };
  } catch (error) {
    console.error(
      `Failed to fetch settings for workspace ${workspaceId}:`,
      error,
    );
    return { success: false, error: "Failed to retrieve settings." };
  }
}

export async function updateSetting(
  payload: unknown,
): Promise<ActionResponse<void>> {
  try {
    const validated = updateSettingSchema.safeParse(payload);
    if (!validated.success)
      return { success: false, error: validated.error.message };

    await settingRepo.save({
      workspaceId: validated.data.workspaceId,
      key: validated.data.key,
      value: validated.data.value,
    });

    return { success: true, data: undefined };
  } catch (error) {
    console.error("Error updating setting:", error);
    return { success: false, error: "Failed to update setting." };
  }
}
