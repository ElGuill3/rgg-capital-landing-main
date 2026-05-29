import { createContext, useContext } from "react";
import translations from "./translations.js";

const LangCtx = createContext(null);

function useLang() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used within LangCtx.Provider");
  return ctx;
}

export { LangCtx, useLang, translations };
