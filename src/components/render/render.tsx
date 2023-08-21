import Styles from "./render.module.scss";
import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { ScriptValueAtom } from "@/atoms/script";
import Niwango from "@xpadev-net/niwango";
import { convertToCommentFormat } from "@/utils/tm";
import { Video } from "@/components/video/video.tsx";
import { VideoPlayerMethods } from "@/@types/player";

type props = {
  width: number;
};

const Render = ({ width }: props) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<VideoPlayerMethods>(null);
  const script = useAtomValue(ScriptValueAtom);
  const niwango = useRef<Niwango>();

  useEffect(() => {
    if (!ref.current) return;
    niwango.current = new Niwango(ref.current, convertToCommentFormat(script));
    const interval = setInterval(() => {
      niwango.current?.draw(videoRef.current?.getCurrentTime() ?? 0);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, [script]);
  return (
    <div style={{ height: (width / 16) * 9 }} className={Styles.wrapper}>
      <div
        className={Styles.container}
        style={{ transform: `scale(${width / 1920})`, transformOrigin: "0 0" }}
        ref={ref}
      />
      <Video
        ref={videoRef}
        onEvent={(e) => console.log(e)}
        className={Styles.video}
        url={"https://www.nicovideo.jp/watch/nm10561034"}
      />
    </div>
  );
};

export { Render };
