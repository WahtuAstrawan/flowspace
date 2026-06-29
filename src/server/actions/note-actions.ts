"use server";

import { z } from "zod";
import { NoteRepository } from "../repositories/note-repository";
import { Note } from "@/src/core/entities/note";
import { ActionResponse } from "./workspace-actions";
import { revalidatePath } from "next/cache";

const noteRepo = new NoteRepository();

const noteSchema = z.object({
  workspaceId: z.uuid("Invalid workspace ID"),
  title: z.string().max(255).nullable().optional(),
  content: z.string().min(1, "Note content cannot be empty"),
  isPinned: z.boolean().default(false),
});

export async function fetchNotes(
  workspaceId: string,
): Promise<ActionResponse<Note[]>> {
  try {
    if (!workspaceId) throw new Error("Workspace ID is missing");
    const notes = await noteRepo.findAllByWorkspace(workspaceId);
    return { success: true, data: notes };
  } catch (error) {
    console.error(`Failed to fetch notes for workspace ${workspaceId}:`, error);
    return { success: false, error: "Failed to retrive notes." };
  }
}

export async function createNote(
  payload: unknown,
): Promise<ActionResponse<Note>> {
  try {
    const validated = noteSchema.safeParse(payload);
    if (!validated.success)
      return { success: false, error: validated.error.message };

    const newNote = await noteRepo.create({
      workspaceId: validated.data.workspaceId,
      title: validated.data.title || null,
      content: validated.data.content,
      isPinned: validated.data.isPinned,
    });

    revalidatePath("/dashboard");
    return { success: true, data: newNote };
  } catch (error) {
    console.error("Error creating note:", error);
    return { success: false, error: "Failed to create note." };
  }
}

export async function deleteNote(
  id: string,
  workspaceId: string,
): Promise<ActionResponse<void>> {
  try {
    if (!id || !workspaceId) throw new Error("Missing parameters");
    await noteRepo.delete(id, workspaceId);
    revalidatePath("/dashboard");
    return { success: true, data: undefined };
  } catch (error) {
    console.error(`Error deleting note ${id}:`, error);
    return { success: false, error: "Failed to delete note." };
  }
}
