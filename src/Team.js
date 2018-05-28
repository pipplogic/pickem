import React from "react";
import "./Team.css";

function Team({ selected, team, onClick }) {
  return (
    <div className={`team ${selected ? "selected" : ""}`} onClick={onClick}>
      <div className="team-location">{team.city}</div>
      <div className="team-name">{team.teamName}</div>
    </div>
  );
}

export default Team;
