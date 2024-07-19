import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";

import App from "./App.tsx";
import PixelsWoff2 from "./assets/pixels.woff2";
import StarZoneWoff2 from "./assets/starzone.woff2";
import FiraMonoWoff2 from "./assets/fira-regular.woff2";
import SynNovaWoff2 from "./assets/synnova-regular.woff2";

const FontStyles = createGlobalStyle`
@font-face {
    font-family: "FiraMono";
    src: url(${FiraMonoWoff2}) format("woff2");
}
@font-face {
    font-family: "SynNova";
    src: url(${SynNovaWoff2}) format("woff2");
}
body {
  font-family: sans-serif;
  background-color: #f4f4f4
}
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
    <>
    <FontStyles />
    <App />
    </>
);
