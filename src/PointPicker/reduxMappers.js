import { getAvailableScores } from "../scoreUtils";

export const mapState = ({ picks, week: { games } }, { gameId }) => {
  const pick = picks.get(gameId);
  const gameIds = [...games.keys()];

  const options = pick.locked
    ? [pick.score]
    : getAvailableScores(gameIds, picks);

  return { pick, picks, gameIds, options };
};

export const mapDispatch = (dispatch, { gameId, gameIds }) => ({
  handlePointChangeForGames: gameIds => ev => {
    const score = ev.target.value;

    dispatch({ type: "SCORE_MOVE", gameId, gameIds, score });
  }
});

export const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...stateProps,
    handlePointChange: ev => {
      return dispatchProps.handlePointChangeForGames(stateProps.gameIds)(ev);
    },
    ...ownProps
  };
};