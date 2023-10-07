import { atom } from "jotai";
import { VideoPlayerMethods } from "@/@types/player";
import { atomWithStorage } from "jotai/utils";

export const VideoControlsAtom = atom<VideoPlayerMethods | undefined>(
  undefined
);
export const VideoStateAtom = atom<{
  paused: boolean;
  currentTime: number;
  timestamp: number;
  duration: number;
}>({ currentTime: 0, paused: true, timestamp: 0, duration: 1 });
export const VideoUrlAtom = atomWithStorage(
  "video_url",
  "https://youtu.be/m2M2piEMWAE"
);
export const IsYoutubeReadyAtom = atom(false);
