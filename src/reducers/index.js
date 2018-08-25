import { combineReducers } from 'redux'

import login from '../Login/loginDuck'
import picks from './picks'
import teams from './teams'
import week from './week'
import status from './status'

import register from '../Register/registerDuck'
import confirm from '../ConfirmUser/confirmDuck'
import forgotPassword from '../ForgotPassword/forgotPasswordDuck'
import weekView, * as fromWeek from '../WeekView/weekDuck'
import picksDuck, * as fromPicks from './picksDuck'
import pools, * as fromPools from './pools'

export default combineReducers({
  login,
  picks,
  register,
  week,
  teams,
  confirm,
  forgotPassword,
  weekView,
  picksDuck,
  status,
  pools
})

export const getRegisterState = state => state.register
export const getLoginState = state => state.login
export const getConfirmState = state => state.confirm
export const getForgotPasswordState = state => state.forgotPassword
export const getWeekState = state => state.weekView
export const getPicksState = state => state.picksDuck
export const getPoolsState = state => state.pools

export const getActivePool = state =>
  fromPools.getActivePool(getPoolsState(state))
export const getGameById = state => gameId =>
  fromWeek.getGameById(getWeekState(state))(gameId)
const getPick = state => poolId => gameId =>
  fromPicks.getPick(getPicksState(state))(poolId)(gameId) || {}
export const getPickScore = state => poolId => gameId =>
  getPick(state)(poolId)(gameId).score
export const getPickTeamId = state => poolId => gameId =>
  getPick(state)(poolId)(gameId).teamId

export const isGameLocked = state => gameId => {
  const game = getGameById(state)(gameId) || {}
  return game.gameTime < new Date()
}

export const updateTeamPick = fromPicks.updateTeamPick
