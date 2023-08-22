import Styles from "./render.module.scss";
import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { ScriptValueAtom } from "@/atoms/script";
import Niwango from "@xpadev-net/niwango";
import { convertToCommentFormat } from "@/utils/tm";
import { Video } from "@/components/video/video.tsx";
import { VideoStateAtom, VideoUrlAtom } from "@/atoms/video.ts";

type props = {
  width: number;
};

const Render = ({ width }: props) => {
  const ref = useRef<HTMLDivElement>(null);
  const script = useAtomValue(ScriptValueAtom);
  const niwango = useRef<Niwango>();
  const state = useAtomValue(VideoStateAtom);
  const url = useAtomValue(VideoUrlAtom);

  useEffect(() => {
    if (!ref.current) return;
    niwango.current = new Niwango(ref.current, convertToCommentFormat(script));
  }, [script]);
  useEffect(() => {
    const interval = setInterval(() => {
      niwango.current?.draw(Math.floor(state.currentTime / 10));
    }, 1);
    return () => {
      clearInterval(interval);
    };
  }, [state]);
  return (
    <div style={{ height: (width / 16) * 9 }} className={Styles.wrapper}>
      <div
        className={Styles.container}
        style={{ transform: `scale(${width / 1920})`, transformOrigin: "0 0" }}
        ref={ref}
      />
      <Video className={Styles.video} url={url} />
    </div>
  );
};

export { Render };
