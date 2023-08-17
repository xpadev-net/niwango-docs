import {useEffect, useRef, useState} from "react";
import {Editor, useMonaco} from "@monaco-editor/react";
import {niwangoLanguageId, setupNiwango} from "@/components/editor/language-support.ts";

type props = {
  className?: string;
}

const NiwangoEditor = ({className}: props) => {
  const [value, setValue] = useState<string>("");
  const monaco = useMonaco();
  const isInited = useRef(false);
  useEffect(()=>{
    if (!monaco||isInited.current)return;
    isInited.current = true
    setupNiwango(monaco);
  },[monaco]);
  return <Editor
    className={className}
    defaultLanguage={niwangoLanguageId}
    value={value}
    onChange={(val)=>setValue(val??"")}
  />
}

export {NiwangoEditor}