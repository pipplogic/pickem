import { combineReducers } from 'redux'

import login from '../Login/loginDuck'
import picks from './picks'
import teams from './teams'
import week from './week'
import register from '../Register/registerDuck'

export default combineReducers({
  login,
  picks,
  register,
  week,
  teams
})

export const getRegisterState = state => state.register
export const getLoginState = state => state.login
