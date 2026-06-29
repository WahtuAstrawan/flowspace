"use server";

import { z } from "zod";
import { WorkspaceRepository } from "@/src/server/repositories/workspace-repository";
import { Workspace } from "@/src/core/entities/workspace";

const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(1, "Workspace name cannot be empty")
    .max(50, "Name is too long"),
  isDefault: z.boolean().optional().default(false),
});

export type ActionResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

const workspaceRepo = new WorkspaceRepository();

export async function initializeDefaultWorkspace(): Promise<
  ActionResponse<Workspace>
> {
  try {
    console.info("Checking for existing workspaces...");
    const existingWorkspaces = await workspaceRepo.findAll();

    if (existingWorkspaces.length > 0) {
      console.info(
        "Workspaces already exist. Returning the default or first one.",
      );
      const defaultWorkspace = await workspaceRepo.getDefaultWorkspace();
      return { success: true, data: defaultWorkspace || existingWorkspaces[0] };
    }

    console.info(
      "No workspaces found. Initializing the first default workspace.",
    );
    const newWorkspace = await workspaceRepo.create({
      name: "My Workspace",
      isDefault: true,
    });

    return { success: true, data: newWorkspace };
  } catch (error) {
    console.error("Failed to initialize default workspace:", error);
    return {
      success: false,
      error: "Internal server error during workspace initialization.",
    };
  }
}

export async function fetchAllWorkspaces(): Promise<
  ActionResponse<Workspace[]>
> {
  try {
    const workspaces = await workspaceRepo.findAll();
    return { success: true, data: workspaces };
  } catch (error) {
    console.error("Failed to fetch workspaces:", error);
    return { success: false, error: "Could not retrieve workspaces." };
  }
}

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;

export async function createWorkspace(
  payload: unknown,
): Promise<ActionResponse<Workspace>> {
  try {
    console.info("Validating incoming workspace payload...");
    const validatedData = createWorkspaceSchema.safeParse(payload);

    if (!validatedData.success) {
      console.warn("Workspace validation failed.");
      return { success: false, error: validatedData.error.message };
    }

    console.info(
      `Validation successful. Creating new workspace: ${validatedData.data.name}`,
    );
    const newWorkspace = await workspaceRepo.create({
      name: validatedData.data.name,
      isDefault: validatedData.data.isDefault,
    });

    return { success: true, data: newWorkspace };
  } catch (error) {
    console.error("Failed to create workspace:", error);
    return {
      success: false,
      error: "Internal server error while creating workspace.",
    };
  }
}
