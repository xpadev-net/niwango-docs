import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageSupport } from "@/components/language-support";
import { YoutubeSupport } from "./components/youtube-support/youtube-support.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <LanguageSupport />
    <YoutubeSupport />
  </React.StrictMode>
);
