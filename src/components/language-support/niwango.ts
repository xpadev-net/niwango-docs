import { languages } from "monaco-editor";
import { documents } from "@/docs/documents.ts";
import { IDocumentItem } from "@/@types/documents";
import { Monaco } from "@monaco-editor/react";

const niwangoLanguageId = "niwango";

const keywords: Omit<languages.CompletionItem, "range">[] = documents.map(
  (_item) => {
    const item = _item.isAlias
      ? (documents.find((n) => n.name === _item.alias) as IDocumentItem)
      : _item;
    return {
      label: _item.name,
      insertText: _item.name,
      kind: languages.CompletionItemKind.Keyword,
      detail: "function",
      documentation: item.description,
    };
  }
);

const setupNiwango = (monaco: Monaco) => {
  monaco.languages.register({ id: niwangoLanguageId });
  monaco.editor.defineTheme(niwangoLanguageId, {
    base: "vs-dark",
    rules: [{ token: "tm-command", foreground: "#ffb700", fontStyle: "bold" }],
    inherit: true,
    colors: {},
  });
  monaco.languages.setMonarchTokensProvider(niwangoLanguageId, {
    keywords: keywords.map((val) => val.label),
    tokenizer: {
      root: [
        [
          /@?[a-zA-Z][\w$]*/,
          {
            cases: {
              "@keywords": "keyword",
              "@default": "variable",
            },
          },
        ],
        [
          /^\[tm([0-9]+(?:\.[0-9]+)?|[0-9]+:[0-5]?[0-9](?:\.[0-9]+)?)]$/,
          "tm-command",
        ],
        [/".*?"/, "string"],
        [/#.*/, "comment"],
      ],
    },
  });
  monaco.languages.registerCompletionItemProvider(niwangoLanguageId, {
    provideCompletionItems: (model, position) => {
      const word = model.getWordUntilPosition(position);
      const range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      };
      return { suggestions: keywords.map((val) => ({ ...val, range })) };
    },
  });
  const config = {
    surroundingPairs: [
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
    ],
    autoClosingPairs: [
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "'", close: "'", notIn: ["string", "comment"] },
      { open: '"', close: '"', notIn: ["string", "comment"] },
    ],
  };
  monaco.languages.setLanguageConfiguration(niwangoLanguageId, config);
};

export { setupNiwango, niwangoLanguageId };
