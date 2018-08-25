import { combineReducers } from 'redux'

const TEAM = 'pickem/picks/team'
const SCORE = 'pickem/picks/score'
const SWITCH_SCORES = 'pickem/picks/switch'

const picksByIdReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case SCORE:
    case TEAM: {
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          ...action.payload
        }
      }
    }
    case SWITCH_SCORES: {
      const { id1, id2 } = action
      return {
        ...state,
        [id1]: {
          ...state[id1],
          score: (state[id2] || {}).score
        },
        [id2]: {
          ...state[id2],
          score: (state[id1] || {}).score
        }
      }
    }
    default: {
      return state
    }
  }
}

export default combineReducers({
  byId: picksByIdReducer
})

export const getPickId = ({ poolId, gameId }) => `POOL_${poolId}_GAME_${gameId}`

export const getPick = state => poolId => gameId => {
  return state.byId[getPickId({ poolId, gameId })]
}
export const updateTeamPick = ({ poolId, gameId, teamId }) => ({
  type: TEAM,
  id: getPickId({ poolId, gameId }),
  payload: {
    teamId
  }
})

export const updateScore = ({ poolId, gameId, score }) => ({
  type: SCORE,
  id: getPickId({ poolId, gameId }),
  payload: {
    score,
    poolId,
    gameId
  }
})

export const switchScores = ({ poolId, gameId1, gameId2 }) => ({
  type: SWITCH_SCORES,
  id1: getPickId({ poolId, gameId: gameId1 }),
  id2: getPickId({ poolId, gameId: gameId2 })
})
