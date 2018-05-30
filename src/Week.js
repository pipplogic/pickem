import {
  Divider,
  List,
  ListItem,
  ListSubheader,
  withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import { loadGames } from "./loadActions";
import { getAvailableScores } from "./scoreUtils";
import Game from "./Game";
import GameHeader from "./GameHeader";
import WeekStatus from "./WeekStatus";

class Week extends Component {
  componentDidMount() {
    const { dispatch, picks, week } = this.props;

    loadGames(dispatch, picks, week);
  }

  render() {
    const { week, picks, classes, className } = this.props;

    if (!week.loaded) {
      return <WeekStatus status="loading" />;
    }

    if (week.error) {
      return <WeekStatus status="error" />;
    }

    const gameIds = [...week.games.keys()];
    const availableScores = getAvailableScores(gameIds, picks);
    return (
      <List className={className}>
        <ListSubheader classes={{ root: classes.header }}>
          <GameHeader />
        </ListSubheader>
        {gameIds.map(gameId => {
          const pick = picks.get(gameId) || {};
          const game = week.games.get(gameId) || {};

          return (
            <React.Fragment key={gameId}>
              <ListItem>
                <Game
                  game={game}
                  pick={pick}
                  gameIds={gameIds}
                  availableScores={availableScores}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    );
  }
}
Week.defaultProps = {
  className: ""
};

Week.propTypes = {
  className: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  picks: PropTypes.instanceOf(Map).isRequired,
  week: PropTypes.shape({
    games: PropTypes.instanceOf(Map).isRequired,
    loaded: PropTypes.bool,
    error: PropTypes.bool
  }).isRequired
};

const mapState = state => {
  const { picks, week } = state;
  return { picks, week };
};

const styles = theme => {
  const headerColor = theme.palette.grey[200];
  return {
    header: {
      color: theme.palette.getContrastText(headerColor),
      backgroundColor: headerColor
    }
  };
};

export default connect(mapState)(withStyles(styles)(Week));
