import { combineReducers } from "redux";

const picks = (state = {}, action) => {
  switch (action.type) {
    case "PICK": {
      state = Object.assign({}, state, {
        [action.gameId]: action.team
      });
      break;
    }
    default: {
      break;
    }
  }
  return state;
};

const week = (
  state = {
    year: 2017,
    number: 1,
    games: [],
    loaded: false
  },
  action
) => {
  switch (action.type) {
    case "NEW_YEAR": {
      state = {
        ...state,
        year: action.year,
        games: []
      };
      break;
    }
    case "NEW_WEEK": {
      state = {
        ...state,
        number: action.number,
        games: []
      };
      break;
    }
    case "WEEK_LOADED": {
      state = {
        ...state,
        loaded: true,
        games: action.games,
        error: false
      };
      break;
    }
    case "WEEK_ERROR": {
      state = {
        ...state,
        loaded: true,
        error: true
      };
      break;
    }
    default: {
      break;
    }
  }
  return state;
};

export default combineReducers({
  picks,
  week
});
