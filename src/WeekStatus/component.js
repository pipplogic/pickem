import { Typography } from "@material-ui/core";
import cx from "classnames";
import React from "react";

export default function WeekStatus({ classes, className, info }) {
  return (
    <div className={cx(className, classes.root)}>
      <info.Icon
        color={info.color}
        classes={{ root: cx(classes.icon, classes[info.className]) }}
      />
      <Typography variant="headline">{info.text}</Typography>
    </div>
  );
}
