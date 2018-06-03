import { Typography, withStyles } from "@material-ui/core";
import React from "react";
import styles from "./Game/styles";

function GameHeader({ classes }) {
  return (
    <div className={classes.game}>
      <Typography>Time</Typography>
      <Typography>Away</Typography>
      <Typography />
      <Typography>Home</Typography>
      <Typography>Pts</Typography>
    </div>
  );
}

export default withStyles(styles)(GameHeader);
