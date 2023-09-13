import ReactJson from "react-json-view";
import { useAtomValue } from "jotai";
import { ASTValueAtom } from "@/atoms/script";
import { Console, Hook, Unhook } from "console-feed";
import { useEffect, useState } from "react";
import { Message as ComponentMessage } from "console-feed/lib/definitions/Component";
import Styles from "./meta.module.scss";

const Meta = () => {
  const ast = useAtomValue(ASTValueAtom);
  const [tab, setTab] = useState<"ast" | "console">("ast");
  const [logs, setLogs] = useState<ComponentMessage[]>([]);
  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log as ComponentMessage]),
      false
    );
    return () => void Unhook(hookedConsole);
  }, []);

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.control}>
        <button
          className={`${Styles.button} ${tab === "ast" && Styles.active}`}
          onClick={() => setTab("ast")}
        >
          AST
        </button>
        <button
          className={`${Styles.button} ${tab === "console" && Styles.active}`}
          onClick={() => setTab("console")}
        >
          Console
        </button>
      </div>
      <div className={`${Styles.container} ${tab === "ast" && Styles.active}`}>
        {ast ? (
          <ReactJson
            src={ast ?? {}}
            theme={"monokai"}
            collapsed={true}
            displayDataTypes={false}
          />
        ) : (
          <p className={Styles.message}>構文にエラーがあります</p>
        )}
      </div>
      <div
        className={`${Styles.container} ${tab === "console" && Styles.active}`}
      >
        <Console logs={logs} variant="dark" />
      </div>
    </div>
  );
};

export { Meta };
