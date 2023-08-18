import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { niwangoLanguageId } from "@/components/language-support";
import { useAtomValue } from "jotai";
import { IsMonacoReadyAtom } from "@/atoms/monaco.ts";

type props = {
  className?: string;
};

const NiwangoEditor = ({ className }: props) => {
  const isMonacoReady = useAtomValue(IsMonacoReadyAtom);
  const [value, setValue] = useState<string>("");
  if (!isMonacoReady) return <></>;
  return (
    <Editor
      className={className}
      defaultLanguage={niwangoLanguageId}
      theme={niwangoLanguageId}
      value={value}
      onChange={(val) => setValue(val ?? "")}
    />
  );
};

export { NiwangoEditor };
