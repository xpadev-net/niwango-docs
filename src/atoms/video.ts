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
  "https://www.youtube.com/watch?v=QvWsAIc5mO8&list=RDQvWsAIc5mO8&start_radio=1"
);
export const IsYoutubeReadyAtom = atom(false);
