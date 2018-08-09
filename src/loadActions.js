import { loadWeek } from './api'
import { getAvailableScores } from './scoreUtils'

export function defaultActions (gameIds, picks) {
  const availableScores = getAvailableScores(gameIds, picks)
  return gameIds
    .map(gameId => {
      const pick = picks.get(gameId) || {}
      return { gameId, score: pick.score }
    })
    .filter(game => !game.score)
    .map(game => game.gameId)
    .map((gameId, idx) => ({
      type: 'SCORE',
      gameId,
      score: availableScores[idx]
    }))
}

export function mockActions (games) {
  const gameIds = games.map(game => game.gameId)
  return [
    { type: 'SCORE_MOVE', gameId: games[0].gameId, gameIds, score: 5 },
    { type: 'LOCK', gameId: games[0].gameId }
  ]
}

export function actionsForGames (dispatch, picks, games) {
  const teams = games
    .map(game => [game.awayTeam, game.homeTeam])
    .reduce((x, y) => x.concat(y), [])

  const entityGames = games.map(game => ({
    gameId: game.gameId,
    gameTime: game.gameTimeEpoch,
    homeTeam: game.homeTeam.teamId,
    awayTeam: game.awayTeam.teamId
  }))

  const gameIds = games.map(game => game.gameId)

  const actions = defaultActions(gameIds, picks)
  const mockActionList = mockActions(games)

  dispatch({ type: 'TEAMS', teams })
  actions.forEach(action => dispatch(action))
  mockActionList.forEach(action => dispatch(action))

  dispatch({ type: 'WEEK_LOADED', games: entityGames })
}

export function loadGames (dispatch, picks, week) {
  loadWeek(week.year, week.number)
    .then(games => {
      actionsForGames(dispatch, picks, games)
    })
    .catch(err => {
      if (err.name === 'BadAuth') {
        dispatch({ type: 'NOT_LOGGED_IN' })
      }
      dispatch({ type: 'WEEK_ERROR' })
    })
}
