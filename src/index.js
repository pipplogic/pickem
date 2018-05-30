import { createStore } from "redux";
import { enableBatching } from "redux-batched-actions";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reducers from "./reducers/reducers";

const store = createStore(enableBatching(reducers));

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};
store.subscribe(render);
render();
