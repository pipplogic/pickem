import { combineReducers } from 'redux'

const TEAM = 'pickem/picks/team'
const SCORE = 'pickem/picks/score'
const SWITCH_SCORES = 'pickem/picks/switch'
const PICKS_LOADED = 'pickem/picks/loaded'
const SAVING = 'pickem/picks/saving'
const ERROR = 'pickem/picks/error'

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
    case PICKS_LOADED: {
      const picksMap = action.picks.reduce(
        (newPicksById, pick) => ({
          ...newPicksById,
          [getPickId(pick)]: pick
        }),
        {}
      )

      return {
        ...state,
        ...picksMap
      }
    }
    default: {
      return state
    }
  }
}

const errorReducer = (state = false, action = {}) => {
  switch (action.type) {
    case ERROR:
      return true
    case SAVING:
      return false
    default:
      return state
  }
}

const saving = (state = false, action = {}) => {
  switch (action.type) {
    case SAVING:
      return action.payload
    case ERROR:
      return false
    default:
      return state
  }
}

const modified = (state = false, action = {}) => {
  switch (action.type) {
    case SAVING: {
      if (action.payload === true) {
        return false
      }
      return state
    }

    case TEAM:
    case SCORE:
    case SWITCH_SCORES: {
      return true
    }
    case PICKS_LOADED: {
      return false
    }
    default: {
      return state
    }
  }
}

export default combineReducers({
  byId: picksByIdReducer,
  saving,
  error: errorReducer,
  modified
})

export const savingPicks = () => ({
  type: SAVING,
  payload: true
})

export const savedPicks = () => ({
  type: SAVING,
  payload: false
})

export const errorSavingPicks = err => ({
  type: ERROR,
  payload: err
})

export const getPickId = ({ poolId, gameId }) => `POOL_${poolId}_GAME_${gameId}`

export const getPick = state => poolId => gameId => {
  return state.byId[getPickId({ poolId, gameId })]
}
export const updateTeamPick = ({ poolId, gameId, teamId }) => ({
  type: TEAM,
  id: getPickId({ poolId, gameId }),
  payload: {
    teamId,
    poolId,
    gameId
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

export const addPicks = picks => ({
  type: PICKS_LOADED,
  picks
})
