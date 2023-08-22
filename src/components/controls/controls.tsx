import { useAtomValue } from "jotai";
import { VideoControlsAtom, VideoStateAtom } from "@/atoms/video.ts";

import { PlayArrowFilledIcon } from "@xpadev-net/material-icons/play-arrow-filled";
import { PauseFilledIcon } from "@xpadev-net/material-icons/pause-filled";

const Controls = () => {
  const state = useAtomValue(VideoStateAtom);
  const videoControls = useAtomValue(VideoControlsAtom);
  if (!state || !videoControls) return <></>;
  return (
    <div>
      {state.paused ? (
        <PlayArrowFilledIcon onClick={() => videoControls.play()} />
      ) : (
        <PauseFilledIcon onClick={() => videoControls.pause()} />
      )}
      <input
        type="range"
        min={0}
        max={state.duration}
        value={state.currentTime}
        onChange={(e) => videoControls.seek(Number(e.target.value))}
        step={1}
      />
    </div>
  );
};

export { Controls };
