import { combineReducers } from 'redux'

import { loadWeek as apiLoadWeek } from '../api'
import extendsReducer from '../reducers/extendsReducer'

const LOADING = 'pickem/week/loading'
const LOADED = 'pickem/week/loaded'
const LOAD_ERROR = 'pickem/week/loadError'
const TEAMS = 'pickem/week/teams'
const GAMES = 'pickem/week/games'
const WEEK = 'pickem/week/week'
const PICKS = 'pickem/week/picks'

const loadingReducer = (state = false, action = {}) => {
  switch (action.type) {
    case LOADING:
      return true
    case LOADED:
    case LOAD_ERROR:
      return false
    default:
      return state
  }
}

const errorReducer = (state = null, action = {}) => {
  switch (action.type) {
    case LOADING:
    case LOADED:
      return null
    case LOAD_ERROR:
      return action.error
    default:
      return state
  }
}

export default combineReducers({
  error: errorReducer,
  games: extendsReducer(GAMES),
  loading: loadingReducer,
  teams: extendsReducer(TEAMS),
  weeks: extendsReducer(WEEK),
  picks: extendsReducer(PICKS)
})

export const getWeekGames = state => gameId => {
  const weekId = getGameById(state)(gameId)
  return getGameIdsForWeek(state)(weekId)
}

export const getGameIdsForWeek = state => weekNumber => state.weeks[weekNumber]

export const getGameById = state => gameId => state.games[gameId]

export const getTeamById = state => teamId => state.teams[teamId]

const getTeamsById = ({ games }) =>
  games.reduce(
    (teamsById, { homeTeam, awayTeam }) => ({
      ...teamsById,
      [homeTeam.teamId]: homeTeam,
      [awayTeam.teamId]: awayTeam
    }),
    {}
  )

const getGamesById = ({ games }, weekId) =>
  games.reduce(
    (gamesById, game) => ({
      ...gamesById,
      [game.gameId]: {
        ...game,
        weekId,
        homeTeam: game.homeTeam.teamId,
        awayTeam: game.awayTeam.teamId,
        gameTime: game.gameTimeEpoch
      }
    }),
    {}
  )

const getGameIds = ({ games }) => games.map(({ gameId }) => gameId)

export const loadWeek = weekNumber => dispatch => {
  dispatch({ type: LOADING })
  apiLoadWeek(2018, weekNumber)
    .then(weekInfo => {
      dispatch({ type: TEAMS, payload: getTeamsById(weekInfo) })
      dispatch({ type: GAMES, payload: getGamesById(weekInfo, weekNumber) })
      const gameIds = getGameIds(weekInfo)
      dispatch({ type: WEEK, payload: { [weekNumber]: gameIds } })
      dispatch({ type: LOADED })
    })
    .catch(error => {
      dispatch({ type: LOAD_ERROR, error })
    })
}
