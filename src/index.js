import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import TicTacToeGame from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TicTacToeGame />
  </React.StrictMode>
);
