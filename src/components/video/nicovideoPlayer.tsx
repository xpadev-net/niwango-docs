import { useEffect, useRef, useState } from "react";

import Styles from "./video.module.scss";
import { useSetAtom } from "jotai";
import { VideoControlsAtom, VideoStateAtom } from "@/atoms/video.ts";

type props = {
  url: string;
  className?: string;
};

export const NicovideoPlayer = ({ url, className }: props) => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const setState = useSetAtom(VideoStateAtom);
  const [currentTime, setCurrentTime] = useState<{
    paused: boolean;
    currentTime: number;
    timestamp: number;
    duration: number;
  }>({ paused: true, currentTime: 0, timestamp: 0, duration: 1 });
  const setVideoControls = useSetAtom(VideoControlsAtom);
  useEffect(() => {
    setVideoControls({
      play: () => {
        iframe.current?.contentWindow?.postMessage(
          {
            eventName: "play",
            sourceConnectorType: 1,
            playerId: "1",
          },
          "https://embed.nicovideo.jp"
        );
      },
      pause: () => {
        iframe.current?.contentWindow?.postMessage(
          {
            eventName: "pause",
            sourceConnectorType: 1,
            playerId: "1",
          },
          "https://embed.nicovideo.jp"
        );
      },
      seek: (time: number) => {
        iframe.current?.contentWindow?.postMessage(
          {
            eventName: "seek",
            data: {
              time,
            },
            sourceConnectorType: 1,
            playerId: "1",
          },
          "https://embed.nicovideo.jp"
        );
      },
    });
  }, []);
  const nicoApiHandler = (e: MessageEvent) => {
    if (e.origin === "https://embed.nicovideo.jp") {
      if (e.data.eventName === "playerMetadataChange") {
        setCurrentTime({
          ...currentTime,
          currentTime: e.data.data.currentTime as number,
          timestamp: new Date().getTime(),
          duration: e.data.data.duration ?? (1 as number),
        });
        if (e.data.data.showComment) {
          const param = {
            eventName: "commentVisibilityChange",
            data: {
              commentVisibility: false,
            },
            sourceConnectorType: 1,
            playerId: "1",
          };
          iframe.current?.contentWindow?.postMessage(
            param,
            "https://embed.nicovideo.jp"
          );
        }
      } else if (e.data.eventName === "playerStatusChange") {
        setCurrentTime({
          ...currentTime,
          timestamp: Date.now(),
          paused: e.data.data.playerStatus != 2,
        });
      } else if (e.data.eventName === "loadComplete") {
        const param = {
          eventName: "commentVisibilityChange",
          data: {
            commentVisibility: false,
          },
          sourceConnectorType: 1,
          playerId: "1",
        };
        iframe.current?.contentWindow?.postMessage(
          param,
          "https://embed.nicovideo.jp"
        );
        iframe.current?.contentWindow?.postMessage(
          {
            eventName: "play",
            sourceConnectorType: 1,
            playerId: "1",
          },
          "https://embed.nicovideo.jp"
        );
        iframe.current?.contentWindow?.postMessage(
          {
            eventName: "pause",
            sourceConnectorType: 1,
            playerId: "1",
          },
          "https://embed.nicovideo.jp"
        );
        iframe.current?.contentWindow?.postMessage(
          {
            eventName: "seek",
            data: {
              time: 0,
            },
            sourceConnectorType: 1,
            playerId: "1",
          },
          "https://embed.nicovideo.jp"
        );
      }
    }
  };

  useEffect(() => {
    window.addEventListener("message", nicoApiHandler);
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
      window.removeEventListener("message", nicoApiHandler);
      clearInterval(interval);
    };
  }, [currentTime]);
  return (
    <iframe
      ref={iframe}
      src={`https://embed.nicovideo.jp/watch/${url}?jsapi=1&playerId=1`}
      width={1920}
      height={1080}
      className={`${className} ${Styles.iframe}`}
    />
  );
};
