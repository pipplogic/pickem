import React from "react";

import "./DateTime.css";

function DateTime({ date }) {
  const dateObj = new Date(date);
  const weekday = dateObj.toLocaleString("en-us", {
    weekday: "short"
  });
  const time = dateObj
    .toLocaleString("en-us", {
      hour: "numeric",
      minute: "2-digit"
    })
    // Get rid of AM/PM
    .slice(0, -3);

  return [
    <div key="date" className="day">
      {weekday}
    </div>,
    <div key="time" className="time">
      {time}
    </div>
  ];
}

export default DateTime;
