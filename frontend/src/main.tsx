import React from "react";
import ReactDOM from "react-dom/client";
import { createGlobalStyle } from "styled-components";

import App from "./App.tsx";
import PixelsWoff2 from "./assets/pixels.woff2";
import StarZoneWoff2 from "./assets/starzone.woff2";
import MonoidWoff2 from "./assets/monoid-regular.woff2";
import SynNovaWoff2 from "./assets/synnova-regular.woff2";

const FontStyles = createGlobalStyle`
@font-face {
    font-family: "Pixels";
    src: url(${PixelsWoff2}) format("woff2");
}
@font-face {
    font-family: "Starzone";
    src: url(${StarZoneWoff2}) format("woff2");
}
@font-face {
    font-family: "Monoid";
    src: url(${MonoidWoff2}) format("woff2");
}
@font-face {
    font-family: "SynNova";
    src: url(${SynNovaWoff2}) format("woff2");
}
`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FontStyles />
    <App />
  </React.StrictMode>,
);
