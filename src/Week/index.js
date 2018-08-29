import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'

import Week from './Week'
import styles from './styles'
import { loadWeek } from './weekDuck'
import {
  savingPicks,
  savedPicks,
  errorSavingPicks
} from '../reducers/picksDuck'
import {
  addPicks,
  getWeekState,
  getActivePool,
  getGameIdsForWeek,
  isSavingPicks,
  picksError,
  getPick,
  arePicksModified
} from '../reducers'
import { savePicks as apiSavePicks, loadPicks as apiLoadPicks } from '../api'

const mapStateToProps = (state, { weekNumber }) => {
  const weekState = getWeekState(state)

  const { loading, error } = weekState
  const gameIds = getGameIdsForWeek(state)(weekNumber) || []
  const poolId = getActivePool(state)
  const saving = isSavingPicks(state)
  const saveError = picksError(state)
  const modified = arePicksModified(state)

  return { loading, error, poolId, gameIds, saving, saveError, modified }
}

const loadPicks = ({ poolId, weekId }) => (dispatch, getState) => {
  apiLoadPicks({ poolId, weekId })
    .then(picks => {
      dispatch(addPicks(picks))
    })
    .catch(res => {
      console.log('error loading', res)
    })
  return null
}

const savePicks = ({ poolId, weekId }) => (dispatch, getState) => ev => {
  const state = getState()
  const gameIds = getGameIdsForWeek(state)(weekId)

  const getGamePick = getPick(state)(poolId)

  const picks = gameIds.map(getGamePick)
  dispatch(savingPicks())
  apiSavePicks({ poolId, picks })
    .then(() => dispatch(savedPicks()))
    .catch(err => dispatch(errorSavingPicks(err)))
}

export default connect(mapStateToProps, { loadWeek, loadPicks, savePicks })(
  withStyles(styles)(Week)
)
