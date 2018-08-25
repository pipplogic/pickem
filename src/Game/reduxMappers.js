import {
  getActivePool,
  getGameById,
  isGameLocked,
  updateTeamPick
} from '../reducers'

export const mapState = (state, { gameId }) => {
  const game = getGameById(state)(gameId)
  const locked = isGameLocked(state)(gameId)
  const poolId = getActivePool(state)

  return { game, locked, poolId }
}

export const mapDispatch = {
  // TODO use new picks store
  selectTeam: ({ poolId, gameId, teamId }) => (dispatch, getState) => (
    ...args2
  ) => {
    console.log('selecting')
    return dispatch(updateTeamPick({ poolId, gameId, teamId }))
  }
}
