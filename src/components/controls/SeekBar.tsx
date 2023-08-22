import { useEffect, useState } from "react";
import Styles from "./SeekBar.module.scss";

type props = {
  className?: string;
  min: number;
  max: number;
  value: number;
  onMouseUp: (val: number) => void;
};

const SeekBar = ({ className, value, min, max, onMouseUp }: props) => {
  const [current, setCurrent] = useState(value);
  const [isMouseDown, setIsMouseDown] = useState(false);
  useEffect(() => {
    if (isMouseDown) return;
    setCurrent(value);
  }, [isMouseDown, value]);
  return (
    <div className={`${className} ${Styles.wrapper}`}>
      <input
        className={Styles.input}
        type="range"
        min={min}
        max={max}
        value={current}
        onChange={(e) => setCurrent(Number(e.target.value))}
        onMouseDown={() => {
          setIsMouseDown(true);
        }}
        onMouseUp={() => {
          onMouseUp(current);
          setIsMouseDown(false);
        }}
        step={1}
      />
    </div>
  );
};
export { SeekBar };
