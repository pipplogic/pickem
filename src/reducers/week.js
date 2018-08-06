export default (
  state = {
    year: 2018,
    number: 1,
    games: new Map(),
    loaded: false,
    error: false
  },
  action = {}
) => {
  switch (action.type) {
    case "NEW_YEAR": {
      return {
        ...state,
        year: action.year,
        loaded: false
      };
    }
    case "NEW_WEEK": {
      return {
        ...state,
        number: action.number,
        loaded: false
      };
    }
    case "WEEK_LOADED": {
      return {
        ...state,
        loaded: true,
        error: false,
        games: new Map(action.games.map(game => [game.gameId, game]))
      };
    }
    case "WEEK_ERROR": {
      return {
        ...state,
        loaded: true,
        error: true
      };
    }
    default: {
      return state;
    }
  }
};
