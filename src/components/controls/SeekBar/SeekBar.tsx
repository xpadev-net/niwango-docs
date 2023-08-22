import { MouseEvent, useEffect, useRef, useState } from "react";

import Styles from "./SeekBar.module.scss";
import { time2str } from "@/utils/time.ts";

type props = {
  className?: string;
  max: number;
  value: number;
  onMouseUp: (val: number) => void;
};

const SeekBar = ({ className, onMouseUp, max, value }: props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isDrugging, setIsDrugging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeDisplayPos, setTimeDisplayPos] = useState(0);

  useEffect(() => {
    const onMouseMove = (e: globalThis.MouseEvent) => {
      if (!isDrugging || !wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      setProgress(
        Math.max(Math.min(((e.clientX - rect.left) / rect.width) * 100, 100), 0)
      );
      return ((e.clientX - rect.left) / rect.width) * 100;
    };
    const onMouseUpHandler = (e: globalThis.MouseEvent) => {
      const progress = onMouseMove(e);
      setIsDrugging(false);
      if (progress === undefined) return;
      const val = (max * progress) / 100;
      console.log(val);
      onMouseUp(val);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUpHandler);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUpHandler);
    };
  }, [isDrugging]);

  useEffect(() => {
    if (isDrugging) return;
    setProgress((value / max) * 100);
  }, [isDrugging, value, max]);
  const onMouseDown = () => {
    setIsDrugging(true);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    setTimeDisplayPos((e.clientX - rect.left) / rect.width);
  };

  return (
    <div
      className={`${Styles.wrapper} ${className}`}
      ref={wrapperRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
    >
      <div className={Styles.background} />
      <div
        className={Styles.watched}
        style={{
          left: `0`,
          width: `${progress}%`,
        }}
      />
      <div
        className={Styles.grubber}
        style={{
          left: `${progress}%`,
        }}
      />
      <div
        className={Styles.timeDisplay}
        style={{
          left: `max(min(${timeDisplayPos * 100}%, 100% - 15px), 15px)`,
        }}
      >
        {time2str((timeDisplayPos * max) / 1000)}
      </div>
    </div>
  );
};

export { SeekBar };
