import { forwardRef, useImperativeHandle, useState } from "react";
import { PlayerEvent, VideoPlayerMethods } from "@/@types/player";
import YouTube from "react-youtube";

type props = {
  url: string;
  className?: string;
  onEvent: (ev: PlayerEvent) => void;
};

export const YoutubePlayer = forwardRef<VideoPlayerMethods, props>(
  ({ url, onEvent, className }: props, ref) => {
    const [YTPlayer, setYTPlayer] = useState<YT.Player>();
    const makeYTPlayer = (e: { target: YT.Player }) => {
      setYTPlayer(e.target);
    };
    useImperativeHandle(ref, () => ({
      play: () => {
        YTPlayer?.playVideo();
      },
      pause: () => {
        YTPlayer?.pauseVideo();
      },
      seek: (time: number) => {
        YTPlayer?.seekTo(time, true);
      },
      getCurrentTime: () => {
        return YTPlayer?.getCurrentTime() ?? 0;
      },
    }));

    const opts = {
      width: "100%",
      height: "100%",
      playerVars: {
        iv_load_policy: 3,
        modestbranding: 1,
      },
    };
    return (
      <YouTube
        className={className}
        videoId={url}
        opts={opts}
        onReady={makeYTPlayer}
        onPlay={() => onEvent({ type: "StatusChange", paused: false })}
        onPause={() => onEvent({ type: "StatusChange", paused: true })}
      />
    );
  }
);
