import { combineReducers } from 'redux'
const ADD_POOL = 'pickem/pools/add'
const SWITCH_POOL = 'pickem/pools/active'

const pools = (
  state = {
    MOCK_POOL: {
      scoring: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
    }
  },
  action = {}
) => {
  switch (action.type) {
    case ADD_POOL:
      return {
        ...state,
        [action.payload.poolId]: action.payload
      }
    default:
      return state
  }
}

const active = (state = 'MOCK_POOL', action = {}) => {
  switch (action.type) {
    case SWITCH_POOL: {
      return action.poolId
    }
    default: {
      return state
    }
  }
}

export default combineReducers({
  byId: pools,
  active
})

export const getScoringOptions = state => poolId =>
  (state.byId[poolId] || {}).scoring || []
export const getActivePool = state => state.active
