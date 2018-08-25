import { getGameById, getGameIdsForWeek } from '../Week/weekDuck'
import { getWeekState, getPicksState, getPoolsState } from '../reducers'
import { getPick, switchScores, updateScore } from './picksDuck'
import { addError } from './status'
import { getScoringOptions } from './pools'

export const getScoreOptions = state => poolId => weekId => {
  const weekState = getWeekState(state)
  const getGameByIdThisWeek = getGameById(weekState)

  const now = new Date().getTime()

  const gamesThatWeek = getGameIdsForWeek(weekState)(weekId)

  const lockedGames = gamesThatWeek
    .map(getGameByIdThisWeek)
    .filter(game => game.gameTime <= now)
    .sort((lhs, rhs) => lhs.gameTime - rhs.gameTime)
    .map(game => game.gameId)

  const picksState = getPicksState(state)

  const getPickForGame = getPick(picksState)(poolId)

  const getScoreForGame = gameId => (getPickForGame(gameId) || {}).score

  const lockedScores = lockedGames.map(getScoreForGame)

  const poolState = getPoolsState(state)
  const allScoringOptions = getScoringOptions(poolState)(poolId)

  return lockedScores.reduce((remainingScores, lockedScore) => {
    const index = remainingScores.indexOf(lockedScore)
    if (index === -1) {
      return remainingScores
    }
    const result = [
      ...remainingScores.slice(0, index),
      ...remainingScores.slice(index + 1)
    ]
    return result
  }, allScoringOptions)
}

export const updatePickPoints = ({ gameId, poolId, score }) => (
  dispatch,
  getState
) => {
  const state = getState()
  const weekState = getWeekState(state)
  const getGameByIdThisWeek = getGameById(weekState)

  const game = getGameByIdThisWeek(gameId)
  const now = new Date().getTime()
  if (game.gameTime <= now) {
    return dispatch(addError('Game has already started'))
  }
  const gamesThatWeek = getGameIdsForWeek(weekState)(game.weekId)

  const remainingGameIds = gamesThatWeek
    .map(gameThisWeekId => getGameByIdThisWeek(gameThisWeekId))
    .filter(game => game.gameTime > now)
    .sort((lhs, rhs) => lhs.gameTime - rhs.gameTime)
    .map(game => game.gameId)

  const picksState = getPicksState(state)

  const getPickForGame = getPick(picksState)(poolId)

  const getScoreForGame = gameId => (getPickForGame(gameId) || {}).score

  const remainingPicks = remainingGameIds.map(gameId => ({
    gameId,
    score: getScoreForGame(gameId)
  }))

  const matchingGame = remainingPicks.find(pick => pick.score === score)

  if (matchingGame) {
    return dispatch(
      switchScores({
        poolId,
        gameId1: gameId,
        gameId2: matchingGame.gameId
      })
    )
  } else {
    return dispatch(updateScore({ poolId, gameId, score }))
  }
}
