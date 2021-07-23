import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HistoryProvider } from "./interceptor";

ReactDOM.render(
  <React.StrictMode>
    <HistoryProvider>
      <App />
    </HistoryProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
