import React from "react";
import moment from "moment";

import "./DateTime.css";

function DateTime({ date }) {
  const mo = moment(date);
  const weekday = mo.format("ddd");
  const time = mo.format("hh:mm");

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
