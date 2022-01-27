import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Provider from "./store/store";
import { AppStore } from "./store/appstore";
ReactDOM.render(
  <React.StrictMode>
    <Provider value={new AppStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
