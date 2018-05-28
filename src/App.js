import React, { Component } from "react";
import Week from "./Week";
import Selections from "./Selections";

class App extends Component {
  render() {
    let { store } = this.props;
    return (
      <div>
        <Selections store={store} />

        <Week store={store} />
      </div>
    );
  }
}

export default App;
