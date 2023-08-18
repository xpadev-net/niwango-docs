import { useMonaco } from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import { setupNiwango } from "./niwango.ts";
import { useSetAtom } from "jotai";
import { IsMonacoReadyAtom } from "@/atoms/monaco.ts";

const LanguageSupport = () => {
  const setIsReady = useSetAtom(IsMonacoReadyAtom);
  const monaco = useMonaco();
  const isInited = useRef(false);
  useEffect(() => {
    if (!monaco || isInited.current) return;
    isInited.current = true;
    setupNiwango(monaco);
    setIsReady(true);
  }, [monaco]);
  return <></>;
};

export { LanguageSupport };
