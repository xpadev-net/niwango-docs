import { useAtom } from "jotai";
import { VideoUrlAtom } from "@/atoms/video.ts";
import Styles from "./video-input.module.scss";
import { getVideoId } from "@/utils/video.ts";

const VideoInput = () => {
  const [url, setUrl] = useAtom(VideoUrlAtom);
  const invalid = !getVideoId(url);
  return (
    <label className={Styles.wrapper}>
      <span>URL: </span>
      <input
        className={`${Styles.input} ${invalid && Styles.invalid}`}
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
    </label>
  );
};

export { VideoInput };
