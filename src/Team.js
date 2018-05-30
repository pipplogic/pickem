import { Button, Typography, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

const styles = theme => ({
  btn: {
    [theme.breakpoints.up("sm")]: {
      margin: `0 ${theme.spacing.unit}px`
    }
  },
  team: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  location: {
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing.unit
    }
  }
});

function Team({ selected, locked, team, className, classes, ...rest }) {
  return (
    <Button
      disabled={locked}
      variant={selected ? "raised" : "flat"}
      color={selected ? "primary" : "default"}
      {...rest}
      className={className}
      classes={{ root: classes.btn, label: classes.team }}
    >
      <Typography color="inherit" className={classes.location}>
        {team.city}
      </Typography>
      <Typography color="inherit">{team.teamName}</Typography>
    </Button>
  );
}

Team.defaultProps = {
  locked: false,
  selected: false
};

Team.propTypes = {
  selected: PropTypes.bool,
  locked: PropTypes.bool,
  team: PropTypes.shape({
    city: PropTypes.string.isRequired,
    teamName: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(styles)(Team);
