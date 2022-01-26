import React from "react";
import ReactDOM from "react-dom";

import App from "./screens/app";
import { Styles } from "./styles";

ReactDOM.render(
  <React.StrictMode>
    <Styles />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
