import { useAtom } from "jotai";
import { VideoUrlAtom } from "@/atoms/video.ts";

const VideoInput = () => {
  const [url, setUrl] = useAtom(VideoUrlAtom);
  return (
    <div>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
    </div>
  );
};

export { VideoInput };
