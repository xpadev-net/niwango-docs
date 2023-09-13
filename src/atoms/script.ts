import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { A_ANY } from "@xpadev-net/niwango-core";

export const ScriptValueAtom = atomWithStorage("script", "");
export const ASTValueAtom = atom<A_ANY | undefined>(undefined);
