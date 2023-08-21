import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { PlayerEvent, VideoPlayerMethods } from "@/@types/player";

import Styles from "./video.module.scss";

type props = {
  url: string;
  className?: string;
  onEvent: (ev: PlayerEvent) => void;
};

export const NicovideoPlayer = forwardRef<VideoPlayerMethods, props>(
  ({ url, onEvent, className }: props, ref) => {
    const iframe = useRef<HTMLIFrameElement>(null);
    const [currentTime, setCurrentTime] = useState<{
      paused: boolean;
      currentTime: number;
      timestamp: number;
    }>({ paused: true, currentTime: 0, timestamp: 0 });
    useImperativeHandle(ref, () => ({
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
      getCurrentTime: () => {
        return Math.round(
          (currentTime.paused
            ? currentTime.currentTime
            : currentTime.currentTime + (Date.now() - currentTime.timestamp)) /
            10
        );
      },
    }));
    const nicoApiHandler = (e: MessageEvent) => {
      if (e.origin === "https://embed.nicovideo.jp") {
        if (e.data.eventName === "playerMetadataChange") {
          setCurrentTime({
            ...currentTime,
            currentTime: e.data.data.currentTime as number,
            timestamp: new Date().getTime(),
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
          onEvent({
            type: "StatusChange",
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
        }
      }
    };

    useEffect(() => {
      window.addEventListener("message", nicoApiHandler);
      return () => {
        window.removeEventListener("message", nicoApiHandler);
      };
    }, [currentTime]);
    return (
      <iframe
        src={`https://embed.nicovideo.jp/watch/${url}?jsapi=1&playerId=1`}
        width={1920}
        height={1080}
        className={`${className} ${Styles.iframe}`}
      ></iframe>
    );
  }
);
