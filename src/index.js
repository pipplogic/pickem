import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reducers from "./reducers";
import { createStore } from "redux";

const store = createStore(reducers);

let render = () =>
  ReactDOM.render(<App store={store} />, document.getElementById("root"));
store.subscribe(render);
render();
