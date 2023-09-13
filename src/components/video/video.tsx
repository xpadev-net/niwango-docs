import { NicovideoPlayer } from "@/components/video/nicovideoPlayer.tsx";
import { YoutubePlayer } from "@/components/video/youtubePlayer.tsx";
import { getVideoId } from "@/utils/video.ts";
import Styles from "./video.module.scss";

type props = {
  url: string;
  className?: string;
};

const Video = ({ url, className }: props) => {
  const video = getVideoId(url);
  if (!video)
    return (
      <div className={`${className} ${Styles.text}`}>
        正しいURLを入力してください
      </div>
    );
  if (video.type === "youtube") {
    return <YoutubePlayer className={className} url={video.id} />;
  }
  return <NicovideoPlayer className={className} url={video.id} />;
};

export { Video };
