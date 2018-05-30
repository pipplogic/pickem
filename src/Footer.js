import React from "react";
import { AppBar, Typography, withStyles } from "@material-ui/core";

function Footer({ classes, className }) {
  return (
    <AppBar
      position="static"
      classes={{ root: classes.root }}
      className={className}
    >
      <Typography align="center" variant="subheading" color="inherit">
        Written by @PippLogic
      </Typography>
    </AppBar>
  );
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    padding: `${theme.spacing.unit}px 0`
  }
});

export default withStyles(styles)(Footer);
