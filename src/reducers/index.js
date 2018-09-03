import { combineReducers } from 'redux'

import login from '../Login/loginDuck'
import status from './status'

import register from '../Register/registerDuck'
import confirm from '../ConfirmUser/confirmDuck'
import forgotPassword from '../ForgotPassword/forgotPasswordDuck'
import week, * as fromWeek from '../Week/weekDuck'
import picksDuck, * as fromPicks from './picksDuck'
import pools, * as fromPools from './pools'
import * as fromPickPoints from './pickPoints'

export default combineReducers({
  login,
  register,
  confirm,
  forgotPassword,
  week,
  picksDuck,
  status,
  pools
})

export const getRegisterState = state => state.register
export const getLoginState = state => state.login
export const getConfirmState = state => state.confirm
export const getForgotPasswordState = state => state.forgotPassword
export const getWeekState = state => state.week
export const getPicksState = state => state.picksDuck
export const getPoolsState = state => state.pools

export const getActivePool = state =>
  fromPools.getActivePool(getPoolsState(state))

export const getPools = state => fromPools.getPools(getPoolsState(state))

export const getPoolInvites = state =>
  fromPools.getInvites(getPoolsState(state))

export const getGameById = state => fromWeek.getGameById(getWeekState(state))

export const getGameIdsForWeek = state =>
  fromWeek.getGameIdsForWeek(getWeekState(state))

export const getPick = state => poolId => gameId =>
  fromPicks.getPick(getPicksState(state))(poolId)(gameId) || { gameId, poolId }

export const getPickScore = state => poolId => gameId =>
  getPick(state)(poolId)(gameId).score

export const getPickTeamId = state => poolId => gameId =>
  getPick(state)(poolId)(gameId).teamId

export const isGameLocked = state => gameId => {
  const game = getGameById(state)(gameId) || {}
  return game.gameTime < new Date()
}

export const isSavingPicks = state => getPicksState(state).saving

export const arePicksModified = state => getPicksState(state).modified

export const picksError = state => {
  return getPicksState(state).error
}

export const getScoringOptions = state =>
  fromPools.getScoringOptions(getPoolsState(state))

export const updateTeamPick = fromPicks.updateTeamPick
export const updatePickPoints = fromPickPoints.updatePickPoints
export const getScoreOptions = fromPickPoints.getScoreOptions
export const addPicks = fromPicks.addPicks
export const selectPool = fromPools.selectPool

export const joinPool = fromPools.joinPool
