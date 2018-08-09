import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
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

GameHeader.propTypes = {
  classes: PropTypes.shape({ game: PropTypes.string.isRequired }).isRequired
};

export default withStyles(styles)(GameHeader);
