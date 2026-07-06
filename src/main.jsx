import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { STORAGE_VERSION, clearAppStorage } from "./utils/constants.js";
import "./index.css";
import "./styles/App.css";

if (localStorage.getItem("app-storage-version") !== STORAGE_VERSION) {
  clearAppStorage();
  localStorage.setItem("app-storage-version", STORAGE_VERSION);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

