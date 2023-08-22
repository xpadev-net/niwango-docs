import { useEffect, useRef, useState } from "react";
import {
  IsYoutubeReadyAtom,
  VideoControlsAtom,
  VideoStateAtom,
} from "@/atoms/video.ts";
import { useAtomValue, useSetAtom } from "jotai";

type props = {
  url: string;
  className?: string;
};

export const YoutubePlayer = ({ url, className }: props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isYoutubeReady = useAtomValue(IsYoutubeReadyAtom);
  const setState = useSetAtom(VideoStateAtom);
  const [currentTime, setCurrentTime] = useState<{
    paused: boolean;
    currentTime: number;
    timestamp: number;
    duration: number;
  }>({ paused: true, currentTime: 0, timestamp: 0, duration: 1 });
  useEffect(() => {
    if (!wrapperRef.current) return;
    const player = new YT.Player(wrapperRef.current.id, {
      videoId: url,
      events: {
        onStateChange: (e) => {
          setCurrentTime({
            currentTime: Math.floor((player.getCurrentTime() ?? 0) * 1000),
            duration: Math.floor((player.getDuration() ?? 0) * 1000),
            paused: e.data !== 1,
            timestamp: Date.now(),
          });
        },
      },
    });
    setVideoControls({
      play: () => {
        player.playVideo();
      },
      pause: () => {
        player.pauseVideo();
      },
      seek: (time: number) => {
        player.seekTo(time / 1000, true);
      },
    });
  }, [url, isYoutubeReady]);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = Math.floor(
        currentTime.paused
          ? currentTime.currentTime
          : currentTime.currentTime + Date.now() - currentTime.timestamp
      );
      setState({
        ...currentTime,
        currentTime: time,
      });
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, [currentTime]);
  const setVideoControls = useSetAtom(VideoControlsAtom);
  if (!isYoutubeReady) return <></>;
  return <div className={className} ref={wrapperRef} id={"__yt_player"} />;
};
