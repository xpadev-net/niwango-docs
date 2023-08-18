import {useState} from "react";
import {Editor} from "@monaco-editor/react";
import {niwangoLanguageId} from "@/components/language-support";

type props = {
  className?: string;
}

const NiwangoEditor = ({className}: props) => {
  const [value, setValue] = useState<string>("");
  return <Editor
    className={className}
    defaultLanguage={niwangoLanguageId}
    value={value}
    onChange={(val)=>setValue(val??"")}
  />
}

export {NiwangoEditor}