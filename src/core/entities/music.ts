export interface Track {
  id: string;
  workspaceId: string;
  filename: string;
  title: string;
  artist: string | null;
  duration: number;
  fileSize: number;
  uploadedAt: Date;
}

export interface Playlist {
  id: string;
  workspaceId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  tracks: Track[];
}

export type CreateTrackPayload = Omit<Track, "id" | "uploadedAt">;

export interface IMusicRepository {
  findAllTracks(workspaceId: string): Promise<Track[]>;
  saveTrack(payload: CreateTrackPayload): Promise<Track>;
  deleteTrack(id: string, workspaceId: string): Promise<void>;

  findAllPlaylists(workspaceId: string): Promise<Playlist[]>;
  getPlaylistById(id: string, workspaceId: string): Promise<Playlist | null>;
  createPlaylist(name: string, workspaceId: string): Promise<Playlist>;
  deletePlaylist(id: string, workspaceId: string): Promise<void>;

  addTrackToPlaylist(
    playlistId: string,
    trackId: string,
    sortOrder: number,
  ): Promise<void>;
  removeTrackFromPlaylist(playlistId: string, trackId: string): Promise<void>;
}
