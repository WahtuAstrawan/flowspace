import {
  Note,
  CreateNotePayload,
  UpdateNotePayload,
  INoteRepository,
} from "@/src/core/entities/note";
import { prisma } from "../db/prisma-client";

export class NoteRepository implements INoteRepository {
  async findByIdAndWorkspace(
    id: string,
    workspaceId: string,
  ): Promise<Note | null> {
    const note = await prisma.note.findFirst({
      where: { id, workspaceId },
    });

    if (!note) {
      console.warn(`Note ID ${id} not found in workspace ${workspaceId}.`);
    }
    return note;
  }

  async findAllByWorkspace(workspaceId: string): Promise<Note[]> {
    return prisma.note.findMany({
      where: { workspaceId },
      orderBy: [{ isPinned: "desc" }, { updatedAt: "desc" }],
    });
  }

  async create(payload: CreateNotePayload): Promise<Note> {
    console.info(`Creating a new note in workspace ${payload.workspaceId}.`);
    return prisma.note.create({ data: payload });
  }

  async update(
    id: string,
    workspaceId: string,
    payload: UpdateNotePayload,
  ): Promise<Note> {
    console.info(`Updating note ID: ${id} in workspace ${workspaceId}.`);

    await prisma.note.updateMany({
      where: { id, workspaceId },
      data: payload,
    });

    return prisma.note.findFirstOrThrow({ where: { id, workspaceId } });
  }

  async delete(id: string, workspaceId: string): Promise<void> {
    console.warn(`Deleting note ID: ${id} from workspace ${workspaceId}.`);
    await prisma.note.deleteMany({
      where: { id, workspaceId },
    });
  }
}
