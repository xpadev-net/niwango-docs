import { useCallback, KeyboardEvent, useState, useEffect } from "react";
import { Editor, useMonaco } from "@monaco-editor/react";
import { niwangoLanguageId } from "@/components/language-support";
import { useAtom, useAtomValue } from "jotai";
import { IsMonacoReadyAtom } from "@/atoms/monaco";
import { debounce } from "@/utils/debounce.ts";
import NiwangoCore from "@xpadev-net/niwango-core";
import { ScriptValueAtom } from "@/atoms/script.ts";
import { removeTmAnnotation } from "@/utils/tm.ts";
import Styles from "./editor.module.scss";

type props = {
  className?: string;
};

const NiwangoEditor = ({ className }: props) => {
  const monaco = useMonaco();
  const isMonacoReady = useAtomValue(IsMonacoReadyAtom);
  const [script, setScript] = useAtom(ScriptValueAtom);
  const [value, setValue] = useState(script);
  useEffect(() => {
    setValue(script);
  }, [script]);
  const callback = useCallback(
    debounce((value_: string) => {
      if (!monaco) return;
      const model = monaco.editor.getModels()[0];
      try {
        const value = removeTmAnnotation(value_);
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

  const keyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.metaKey && e.code === "KeyS") {
      e.preventDefault();
      setScript(value);
    }
  };

  return (
    <div
      className={`${className} ${Styles.wrapper}`}
      onKeyDown={keyDownHandler}
    >
      <Editor
        className={Styles.editor}
        defaultLanguage={niwangoLanguageId}
        theme={niwangoLanguageId}
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export { NiwangoEditor };
