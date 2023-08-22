export type VideoPlayerMethods = {
  play(): void;
  pause(): void;
  seek(time: number): void;
};

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}
