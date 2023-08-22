import { useAtomValue } from "jotai";
import { VideoControlsAtom, VideoStateAtom } from "@/atoms/video.ts";
import { PlayPauseButton } from "@/components/controls/PlayPauseButton.tsx";
import { SeekBar } from "@/components/controls/SeekBar";
import Styles from "./controls.module.scss";

const Controls = () => {
  const state = useAtomValue(VideoStateAtom);
  const videoControls = useAtomValue(VideoControlsAtom);

  if (!state || !videoControls) return <></>;
  return (
    <div className={Styles.wrapper}>
      <PlayPauseButton paused={state.paused} />
      <SeekBar
        max={state.duration}
        value={state.currentTime}
        onMouseUp={(val) => videoControls.seek(val)}
      />
    </div>
  );
};

export { Controls };
