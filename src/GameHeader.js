import React from "react";

import "./Game.css";

function GameHeader() {
  return (
    <div className="game game-header">
      <span className="game-time">Time</span>
      <span className="game-away">Away</span>
      <span className="game-at">&nbsp;</span>
      <span className="game-home">Home</span>
      <span className="game-pts">Pts</span>
    </div>
  );
}

export default GameHeader;
