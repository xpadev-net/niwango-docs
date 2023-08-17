export type IDocumentItem = {
  name: string;
  isNonStandard?: true;
  syntax: string;
  description?: string;
  examples?: string[];
  isAlias?: false;
}
export type IDocumentAlias = {
  name: string;
  alias: string
  isAlias: true;
}

export type IDocument = IDocumentItem | IDocumentAlias;