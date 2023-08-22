import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { IsYoutubeReadyAtom } from "@/atoms/video.ts";

const YoutubeSupport = () => {
  const setIsReady = useSetAtom(IsYoutubeReadyAtom);
  useEffect(() => {
    if (document.getElementById("__yt_script")) return;
    const tag = document.createElement("script");
    tag.id = "__yt_script";
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = () => {
      setIsReady(true);
    };
  }, []);
  return <></>;
};

export { YoutubeSupport };
