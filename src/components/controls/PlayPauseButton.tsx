import { useAtomValue } from "jotai";
import { VideoControlsAtom } from "@/atoms/video.ts";
import { PlayArrowFilledIcon } from "@xpadev-net/material-icons/play-arrow-filled";
import { PauseFilledIcon } from "@xpadev-net/material-icons/pause-filled";

type props = {
  paused: boolean;
  className?: string;
};

const PlayPauseButton = ({ paused, className }: props) => {
  const videoControls = useAtomValue(VideoControlsAtom);
  if (!videoControls) return <></>;
  if (paused) {
    return (
      <button className={className}>
        <PlayArrowFilledIcon onClick={() => videoControls.play()} />
      </button>
    );
  }
  return (
    <button className={className}>
      <PauseFilledIcon onClick={() => videoControls.pause()} />
    </button>
  );
};

export { PlayPauseButton };
