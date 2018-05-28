import React, { Component } from "react";
import Week from "./Week";
import Selections from "./Selections";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Selections className="selections" />
        <Week />
      </div>
    );
  }
}

export default App;
