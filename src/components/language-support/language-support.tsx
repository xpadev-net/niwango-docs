import { useMonaco } from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import { setupNiwango } from "./niwango.ts";

const LanguageSupport = () => {
  const monaco = useMonaco();
  const isInited = useRef(false);
  useEffect(() => {
    if (!monaco || isInited.current) return;
    isInited.current = true;
    setupNiwango(monaco);
  }, [monaco]);
  return <></>;
};

export { LanguageSupport };
