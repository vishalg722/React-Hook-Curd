import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { store } from "./helpers/store";
import { App } from "./App/App";
import Style from "./Css/Style.css";
import { BrowserRouter } from "react-router-dom";

// setup fake backend
import { configureFakeBackend } from "./helpers/fake-backend";
configureFakeBackend();

render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("app")
);
