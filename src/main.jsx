import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import App from "./App";
import "@mantine/core/styles.css";
import { Toaster } from "react-hot-toast";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <MantineProvider>
    <React.StrictMode>
      <Toaster />
      <App />
    </React.StrictMode>
  </MantineProvider>
);
