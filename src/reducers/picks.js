function updatePick (state, pick, newProps) {
  return new Map([
    ...state,
    [
      pick.gameId,
      {
        ...pick,
        ...newProps
      }
    ]
  ])
}

export default (state = new Map(), action = {}) => {
  const currentPick = state.get(action.gameId) || { gameId: action.gameId }

  if (currentPick.locked) {
    return state
  }

  switch (action.type) {
    case 'PICK': {
      return updatePick(state, currentPick, { teamId: action.teamId })
    }
    case 'SCORE': {
      return updatePick(state, currentPick, { score: action.score })
    }
    case 'SCORE_MOVE': {
      // TODO find appropriate place for this business logic
      const otherGameWithScore =
        (action.gameIds || [])
          .map(gameId => state.get(gameId) || {})
          .filter(pick => !pick.locked)
          .find(pick => pick.score === action.score) || {}

      return updatePick(
        updatePick(state, currentPick, { score: action.score }),
        otherGameWithScore,
        { score: currentPick.score }
      )
    }
    case 'LOCK': {
      return updatePick(state, currentPick, { locked: true })
    }
    default: {
      return state
    }
  }
}
