import { combineReducers } from 'redux'
import {
  loadPools as apiLoadPools,
  loadPoolOptions as apiLoadPoolOptions
} from '../api'

const ADD_POOLS = 'pickem/pools/add'
const SWITCH_POOL = 'pickem/pools/active'
const SCORING_OPTIONS = 'pcikem/pools/options'

const pools = (state = {}, action = {}) => {
  switch (action.type) {
    case ADD_POOLS:
      const newPools = action.pools.reduce(
        (pools, pool) => ({
          ...pools,
          [pool.poolId]: pool
        }),
        {}
      )
      return {
        ...state,
        ...newPools
      }
    default:
      return state
  }
}

const active = (state = null, action = {}) => {
  switch (action.type) {
    case SWITCH_POOL: {
      return action.poolId
    }
    default: {
      return state
    }
  }
}

const scoringOptions = (state = {}, action = {}) => {
  switch (action.type) {
    case SCORING_OPTIONS:
      return {
        ...state,
        [action.poolId]: action.options
      }
    default:
      return state
  }
}

export default combineReducers({
  byId: pools,
  active,
  scoringOptions
})

export const getPools = state => Object.values(state.byId)

export const getScoringOptions = state => poolId =>
  state.scoringOptions[poolId] || []

export const getActivePool = state => state.active

const addPools = pools => ({
  type: ADD_POOLS,
  pools
})

export const selectPool = poolId => ({
  type: SWITCH_POOL,
  poolId
})

const poolOptions = ({ poolId, options }) => ({
  type: SCORING_OPTIONS,
  poolId,
  options
})

const loadPoolOptions = poolId => dispatch => {
  apiLoadPoolOptions({ poolId }).then(options => {
    dispatch(
      poolOptions({
        poolId,
        options
      })
    )
  })
}

export const loadPools = () => dispatch => {
  apiLoadPools().then(pools => {
    dispatch(addPools(pools))
    const defaultPool = pools[0].poolId
    dispatch(selectPool(defaultPool))
    loadPoolOptions(defaultPool)(dispatch)
  })
}
