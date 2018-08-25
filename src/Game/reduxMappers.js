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
  selectTeam: ({ poolId, gameId, teamId }) => (dispatch, getState) => () => {
    console.log('selecting')
    return dispatch(updateTeamPick({ poolId, gameId, teamId }))
  }
}
