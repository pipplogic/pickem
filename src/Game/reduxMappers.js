export const mapState = ({ week: { games }, picks }, { gameId }) => {
  const game = games.get(gameId)
  const { locked = false } = picks.get(gameId)

  return { game, locked }
}

export const mapDispatch = (dispatch, { gameId }) => ({
  selectTeam: teamId => () => {
    dispatch({
      type: 'PICK',
      gameId,
      teamId
    })
  }
})
