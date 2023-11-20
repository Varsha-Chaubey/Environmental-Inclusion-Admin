import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./include/css/bootstrap.min.css";
import "./include/css/style.css";
import "./include/css/dev.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  /* </React.StrictMode> */
);
