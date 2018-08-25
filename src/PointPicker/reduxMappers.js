import {
  getGameById,
  getActivePool,
  isGameLocked,
  getPickScore,
  getScoreOptions,
  updatePickPoints
} from '../reducers'

export const mapState = (state, { gameId }) => {
  const game = getGameById(state)(gameId)
  const locked = isGameLocked(state)(gameId)

  const poolId = getActivePool(state)
  const score = getPickScore(state)(poolId)(gameId) || ''

  const options = getScoreOptions(state)(poolId)(game.weekId)

  return { score, options, locked, poolId }
}

export const mapDispatch = {
  handleScoreChangeForPool: ({ poolId, gameId }) => (
    dispatch,
    getState
  ) => ev => {
    return updatePickPoints({ gameId, poolId, score: ev.target.value })(
      dispatch,
      getState
    )
  }
}
