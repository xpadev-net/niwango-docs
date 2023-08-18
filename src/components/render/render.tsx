import Styles from "./render.module.scss";
import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { ScriptValueAtom } from "@/atoms/script.ts";
import Niwango from "@xpadev-net/niwango";
import { convertToCommentFormat } from "@/utils/tm.ts";

type props = {
  width: number;
};

const Render = ({ width }: props) => {
  const ref = useRef<HTMLDivElement>(null);
  const script = useAtomValue(ScriptValueAtom);
  const niwango = useRef<Niwango>();
  useEffect(() => {
    if (!ref.current) return;
    niwango.current = new Niwango(ref.current, convertToCommentFormat(script));
    niwango.current.draw(0);
  }, [script]);
  return (
    <div style={{ height: (width / 16) * 9 }} className={Styles.wrapper}>
      <div
        className={Styles.container}
        style={{ transform: `scale(${width / 1920})`, transformOrigin: "0 0" }}
        ref={ref}
      ></div>
    </div>
  );
};

export { Render };
