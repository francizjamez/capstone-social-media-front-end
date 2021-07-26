import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HistoryProvider } from "./interceptor";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <HistoryProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </HistoryProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
