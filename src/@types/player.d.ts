export type PlayerEvent = StatusChange;

export type StatusChange = {
  type: "StatusChange";
  paused: boolean;
};

export type VideoPlayerMethods = {
  play(): void;
  pause(): void;
  seek(time: number): void;
  getCurrentTime(): number;
};
