import { Typography, withStyles } from "@material-ui/core";
import moment from "moment";
import React from "react";
import cx from "classnames";

function DateTime({ date, classes, className }) {
  const mo = moment(date);
  const weekday = mo.format("ddd");
  const time = mo.format("hh:mm");

  return (
    <div className={cx(classes.root, className)}>
      <Typography className={classes.day}>{weekday}</Typography>
      <Typography>{time}</Typography>
    </div>
  );
}

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  day: {
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing.unit
    }
  }
});

export default withStyles(styles)(DateTime);
