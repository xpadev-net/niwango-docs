import Styles from "./render.module.scss";
import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { ScriptValueAtom } from "@/atoms/script";
import Niwango from "@xpadev-net/niwango";
import { convertToCommentFormat } from "@/utils/tm";
import { Video } from "@/components/video/video.tsx";
import { VideoUrlAtom } from "@/atoms/video.ts";

type props = {
  width: number;
};

const Render = ({ width }: props) => {
  const ref = useRef<HTMLDivElement>(null);
  const script = useAtomValue(ScriptValueAtom);
  const niwango = useRef<Niwango>();
  const url = useAtomValue(VideoUrlAtom);

  useEffect(() => {
    if (!ref.current) return;
    niwango.current = new Niwango(ref.current, convertToCommentFormat(script));
    const interval = setInterval(() => {
      niwango.current?.draw(0);
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
      <Video className={Styles.video} url={url} />
    </div>
  );
};

export { Render };
