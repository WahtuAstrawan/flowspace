"use server";

import { z } from "zod";
import { MusicRepository } from "../repositories/music-repository";
import { Playlist, Track } from "@/src/core/entities/music";
import { ActionResponse } from "./workspace-actions";
import { revalidatePath } from "next/cache";

const musicRepo = new MusicRepository();

const createPlaylistSchema = z.object({
  workspaceId: z.uuid(),
  name: z.string().min(1, "Playlist name is required").max(100),
});

export async function fetchPlaylists(
  workspaceId: string,
): Promise<ActionResponse<Playlist[]>> {
  try {
    const playlists = await musicRepo.findAllPlaylists(workspaceId);
    return { success: true, data: playlists };
  } catch (error) {
    console.error("Failed to fetch playlists:", error);
    return { success: false, error: "Failed to retrieve playlists." };
  }
}

export async function createPlaylist(
  payload: unknown,
): Promise<ActionResponse<Playlist>> {
  try {
    const validated = createPlaylistSchema.safeParse(payload);
    if (!validated.success)
      return { success: false, error: validated.error.message };

    const newPlaylist = await musicRepo.createPlaylist(
      validated.data.name,
      validated.data.workspaceId,
    );

    revalidatePath("/music");
    return { success: true, data: newPlaylist };
  } catch (error) {
    console.error("Error creating playlist:", error);
    return { success: false, error: "Failed to create playlist." };
  }
}
