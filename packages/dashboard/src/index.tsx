import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import { DAppProvider } from "@usedapp/core";
//import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={{}}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
