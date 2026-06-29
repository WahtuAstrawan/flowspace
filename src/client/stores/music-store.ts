import { create } from "zustand";
import { Track } from "@/src/core/entities/music";

interface MusicState {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  volume: number; // 0.0 to 1.0
  isShuffled: boolean;
  repeatMode: "off" | "track" | "playlist";

  playTrack: (track: Track, queue?: Track[]) => void;
  pause: () => void;
  resume: () => void;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  resetForNewWorkspace: () => void;
}

export const useMusicStore = create<MusicState>((set, get) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,
  volume: 0.8,
  isShuffled: false,
  repeatMode: "off",

  playTrack: (track, queue) => {
    set((state) => ({
      currentTrack: track,
      queue: queue || state.queue,
      isPlaying: true,
    }));
  },

  pause: () => set({ isPlaying: false }),

  resume: () => {
    if (get().currentTrack) set({ isPlaying: true });
  },

  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),

  nextTrack: () => {
    const { queue, currentTrack, repeatMode } = get();
    if (!currentTrack || queue.length === 0) return;

    if (repeatMode === "track") {
      return;
    }

    const currentIndex = queue.findIndex((t) => t.id === currentTrack.id);
    const hasNext = currentIndex !== -1 && currentIndex < queue.length - 1;

    if (hasNext) {
      set({ currentTrack: queue[currentIndex + 1], isPlaying: true });
    } else if (repeatMode === "playlist" && queue.length > 0) {
      set({ currentTrack: queue[0], isPlaying: true });
    } else {
      set({ isPlaying: false, currentTrack: null });
    }
  },

  resetForNewWorkspace: () => {
    console.info(
      "Workspace changed. Halting music playback and clearing queue.",
    );
    set({
      currentTrack: null,
      queue: [],
      isPlaying: false,
    });
  },
}));
