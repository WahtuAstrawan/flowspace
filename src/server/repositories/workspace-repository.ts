import { prisma } from "../db/prisma-client";
import {
  Workspace,
  CreateWorkspacePayload,
  UpdateWorkspacePayload,
  IWorkspaceRepository,
} from "@/src/core/entities/workspace";

export class WorkspaceRepository implements IWorkspaceRepository {
  async findById(id: string): Promise<Workspace | null> {
    return prisma.workspace.findUnique({ where: { id } });
  }

  async findAll(): Promise<Workspace[]> {
    return prisma.workspace.findMany({
      orderBy: { createdAt: "asc" },
    });
  }

  async getDefaultWorkspace(): Promise<Workspace | null> {
    return prisma.workspace.findFirst({
      where: { isDefault: true },
    });
  }

  async create(payload: CreateWorkspacePayload): Promise<Workspace> {
    console.info(`Creating new workspace: ${payload.name}`);

    if (payload.isDefault) {
      await prisma.workspace.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      });
    }

    return prisma.workspace.create({
      data: {
        name: payload.name,
        isDefault: payload.isDefault ?? false,
      },
    });
  }

  async update(
    id: string,
    payload: UpdateWorkspacePayload,
  ): Promise<Workspace> {
    console.info(`Updating workspace ID: ${id}`);

    if (payload.isDefault) {
      await prisma.workspace.updateMany({
        where: { id: { not: id }, isDefault: true },
        data: { isDefault: false },
      });
    }

    return prisma.workspace.update({
      where: { id },
      data: payload,
    });
  }

  async delete(id: string): Promise<void> {
    console.warn(
      `Deleting workspace ID: ${id}. This action cascades to all related data.`,
    );
    await prisma.workspace.delete({ where: { id } });
  }
}
