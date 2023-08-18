import { useCallback, useState } from "react";
import { Editor, useMonaco } from "@monaco-editor/react";
import { niwangoLanguageId } from "@/components/language-support";
import { useAtomValue } from "jotai";
import { IsMonacoReadyAtom } from "@/atoms/monaco";
import { debounce } from "@/utils/debounce.ts";
import NiwangoCore from "@xpadev-net/niwango-core";

type props = {
  className?: string;
};

const NiwangoEditor = ({ className }: props) => {
  const monaco = useMonaco();
  const isMonacoReady = useAtomValue(IsMonacoReadyAtom);
  const [value, setValue] = useState<string>("");
  const callback = useCallback(
    debounce((value: string) => {
      if (!monaco) return;
      const model = monaco.editor.getModels()[0];
      try {
        NiwangoCore.parse(value, { grammarSource: "sandbox" });
        monaco.editor.setModelMarkers(model, "owner", []);
      } catch (e) {
        if (!(e instanceof NiwangoCore.PeggySyntaxError)) {
          throw e;
        }
        const markers = [
          {
            startLineNumber: e.location.start.line,
            endLineNumber: e.location.end.line,
            startColumn: e.location.start.column,
            endColumn: e.location.end.column,
            message: e.message,
            severity: monaco.MarkerSeverity.Error,
          },
        ];
        monaco.editor.setModelMarkers(model, "owner", markers);
        return e;
      }
      return;
    }, 500),
    [monaco]
  );
  if (!isMonacoReady || !monaco) return <></>;
  const onChangeHandler = (value?: string) => {
    setValue(value ?? "");
    callback(value ?? "");
  };
  return (
    <Editor
      className={className}
      defaultLanguage={niwangoLanguageId}
      theme={niwangoLanguageId}
      value={value}
      onChange={onChangeHandler}
    />
  );
};

export { NiwangoEditor };
