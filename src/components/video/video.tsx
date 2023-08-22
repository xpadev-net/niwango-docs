import { NicovideoPlayer } from "@/components/video/nicovideoPlayer.tsx";
import { YoutubePlayer } from "@/components/video/youtubePlayer.tsx";

type props = {
  url: string;
  className?: string;
};

const Video = ({ url, className }: props) => {
  const video = getVideoId(url);
  if (!video) return <></>;
  if (video.type === "youtube") {
    return <YoutubePlayer className={className} url={video.id} />;
  }
  return <NicovideoPlayer className={className} url={video.id} />;
};

export { Video };

const getVideoId = (input: string) => {
  const yt = getYoutubeId(input);
  if (yt) {
    return {
      id: yt[1],
      type: "youtube",
    };
  }
  const nico = getNicovideoId(input);
  if (nico) {
    return {
      id: nico[1],
      type: "nicovideo",
    };
  }
  return undefined;
};

const getYoutubeId = (input: string) => {
  return input.match(/yout(?:.*)?\/(?:embed\/|watch.*?v=)?([a-z_A-Z0-9-]{11})/);
};

const getNicovideoId = (input: string) => {
  return input.match(
    /(?:nico\.ms|www\.nicovideo\.jp\/watch)\/((?:sm|nm|so)[1-9][0-9]*)/
  );
};
