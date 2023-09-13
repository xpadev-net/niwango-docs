import { useEffect, useRef, useState } from "react";
import {
  IsYoutubeReadyAtom,
  VideoControlsAtom,
  VideoStateAtom,
} from "@/atoms/video.ts";
import { useAtomValue, useSetAtom } from "jotai";
import Styles from "./video.module.scss";

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
    const tag = document.createElement("div");
    tag.id = `__yt_player`;
    tag.className = Styles.playerIframe;
    wrapperRef.current.append(tag);
    const player = new YT.Player("__yt_player", {
      videoId: url,
      events: {
        onReady: (e) => {
          setVideoControls({
            play: () => {
              e.target.playVideo();
            },
            pause: () => {
              e.target.pauseVideo();
            },
            seek: (time: number) => {
              e.target.seekTo(time / 1000, true);
            },
          });
        },
        onStateChange: (e) => {
          console.log(e);
          setCurrentTime({
            currentTime: Math.floor((player.getCurrentTime() ?? 0) * 1000),
            duration: Math.floor((player.getDuration() ?? 0) * 1000),
            paused: e.data !== 1,
            timestamp: Date.now(),
          });
        },
      },
    });
    return () => {
      player.destroy();
    };
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
  return <div className={className} ref={wrapperRef} />;
};
