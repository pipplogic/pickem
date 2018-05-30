import { Typography, withStyles } from "@material-ui/core";
import { Autorenew, Error } from "@material-ui/icons";
import React from "react";
import cx from "classnames";

const getInfo = status => {
  switch (status) {
    case "loading":
      return {
        Icon: Autorenew,
        color: "primary",
        className: "load",
        text: "Loading..."
      };
    case "error":
      return {
        Icon: Error,
        color: "error",
        className: "",

        text: "Error"
      };
    default:
      return {
        Icon: Error,
        color: "error",
        className: "",

        text: "Error"
      };
  }
};

function WeekStatus({ classes, className, status }) {
  const info = getInfo(status);

  return (
    <div className={cx(className, classes.root)}>
      <info.Icon
        color={info.color}
        classes={{ root: cx(classes.icon, classes[info.className]) }}
      />
      <Typography variant="headline" color="inherit">
        {info.text}
      </Typography>
    </div>
  );
}

const styles = theme => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.background.default,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  },
  icon: {
    height: `${theme.spacing.unit * 6}px`,
    width: `${theme.spacing.unit * 6}px`
  },
  load: {
    animation: "spin 2s linear infinite"
  },
  "@keyframes spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" }
  }
});

export default withStyles(styles)(WeekStatus);
