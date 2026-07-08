import { prisma } from "../db/prisma-client";
import {
  Track,
  Playlist,
  CreateTrackPayload,
  IMusicRepository,
} from "@/src/core/entities/music";

export class MusicRepository implements IMusicRepository {
  async findAllTracks(workspaceId: string): Promise<Track[]> {
    return prisma.track.findMany({
      where: { workspaceId },
      orderBy: { uploadedAt: "desc" },
    });
  }

  async saveTrack(payload: CreateTrackPayload): Promise<Track> {
    console.info(
      `Saving track metadata: ${payload.filename} for workspace ${payload.workspaceId}.`,
    );
    return prisma.track.create({ data: payload });
  }

  async deleteTrack(id: string, workspaceId: string): Promise<void> {
    console.warn(`Deleting track ID: ${id} from workspace ${workspaceId}.`);
    await prisma.track.deleteMany({ where: { id, workspaceId } });
  }

  async findAllPlaylists(workspaceId: string): Promise<Playlist[]> {
    const rawPlaylists = await prisma.playlist.findMany({
      where: { workspaceId },
      include: {
        tracks: {
          orderBy: { sortOrder: "asc" },
          include: { track: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return rawPlaylists.map((playlist) => ({
      id: playlist.id,
      workspaceId: playlist.workspaceId,
      name: playlist.name,
      createdAt: playlist.createdAt,
      updatedAt: playlist.updatedAt,
      tracks: playlist.tracks.map((pt) => pt.track),
    }));
  }

  async getPlaylistById(
    id: string,
    workspaceId: string,
  ): Promise<Playlist | null> {
    const rawPlaylist = await prisma.playlist.findFirst({
      where: { id, workspaceId },
      include: {
        tracks: {
          orderBy: { sortOrder: "asc" },
          include: { track: true },
        },
      },
    });

    if (!rawPlaylist) return null;

    return {
      id: rawPlaylist.id,
      workspaceId: rawPlaylist.workspaceId,
      name: rawPlaylist.name,
      createdAt: rawPlaylist.createdAt,
      updatedAt: rawPlaylist.updatedAt,
      tracks: rawPlaylist.tracks.map((pt) => pt.track),
    };
  }

  async createPlaylist(name: string, workspaceId: string): Promise<Playlist> {
    console.info(`Creating playlist: ${name} in workspace ${workspaceId}.`);
    const playlist = await prisma.playlist.create({
      data: { name, workspaceId },
    });
    return { ...playlist, tracks: [] };
  }

  async deletePlaylist(id: string, workspaceId: string): Promise<void> {
    console.warn(`Deleting playlist ID: ${id}.`);
    await prisma.playlist.deleteMany({ where: { id, workspaceId } });
  }

  async addTrackToPlaylist(
    playlistId: string,
    trackId: string,
    sortOrder: number,
  ): Promise<void> {
    console.info(`Adding track ${trackId} to playlist ${playlistId}.`);
    await prisma.playlistTrack.create({
      data: { playlistId, trackId, sortOrder },
    });
  }

  async removeTrackFromPlaylist(
    playlistId: string,
    trackId: string,
  ): Promise<void> {
    console.info(`Removing track ${trackId} from playlist ${playlistId}.`);
    await prisma.playlistTrack.delete({
      where: {
        playlistId_trackId: { playlistId, trackId },
      },
    });
  }
}
