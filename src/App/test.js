import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { enableBatching } from "redux-batched-actions";
import { Provider } from "react-redux";
import reducers from "../reducers/reducers";

import App from "../App";

const store = createStore(enableBatching(reducers));

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
