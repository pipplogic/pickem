import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import withStyles from "@material-ui/core/styles/withStyles";

import React, { Component } from "react";
import { connect } from "react-redux";

import { loadGames } from "./loadActions";
import Game from "./Game";
import GameHeader from "./GameHeader";
import WeekStatus from "./WeekStatus";

const styles = theme => {
  const headerColor = theme.palette.grey[200];
  return {
    header: {
      color: theme.palette.getContrastText(headerColor),
      backgroundColor: headerColor
    }
  };
};

class Week extends Component {
  componentDidMount() {
    const { dispatch, picks, week } = this.props;

    loadGames(dispatch, picks, week);
  }

  render() {
    const { classes, className, error, gameIds, loaded } = this.props;

    if (!loaded) {
      return <WeekStatus className={className} status="loading" />;
    }

    if (error) {
      return <WeekStatus className={className} status="error" />;
    }

    return (
      <List className={className}>
        <ListSubheader classes={{ root: classes.header }}>
          <GameHeader />
        </ListSubheader>
        {gameIds.map(gameId => (
          <React.Fragment key={gameId}>
            <ListItem>
              <Game gameId={gameId} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    );
  }
}

const mapState = state => {
  const { picks, week, week: { loaded, error, games } } = state;
  const gameIds = [...games.keys()];

  return { picks, week, loaded, error, gameIds };
};

export default connect(mapState)(withStyles(styles)(Week));
