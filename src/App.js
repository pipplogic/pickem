import React from "react";
import Week from "./Week";
import Selections from "./Selections";
import "./App.css";
import Header from "./Header";

function App() {
  return (
    <div>
      <Header />
      <Selections />
      <Week />
    </div>
  );
}

export default App;
