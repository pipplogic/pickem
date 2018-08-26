import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'

import Week from './Week'
import styles from './styles'
import { loadWeek } from './weekDuck'
import {
  addPicks,
  getWeekState,
  getActivePool,
  getGameIdsForWeek,
  getPick
} from '../reducers'
import { savePicks as apiSavePicks, loadPicks as apiLoadPicks } from '../api'

const mapStateToProps = (state, { weekNumber }) => {
  const weekState = getWeekState(state)

  const { loading, error } = weekState
  const gameIds = getGameIdsForWeek(state)(weekNumber) || []
  const poolId = getActivePool(state)

  return { loading, error, poolId, gameIds }
}

const loadPicks = ({ poolId, weekId }) => dispatch => {
  console.log('loading picks')
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

  console.log('saving...')
  apiSavePicks({ poolId, picks })
    .then(() => console.log('saved!'))
    .catch(err => console.log('error', err))
}

export default connect(mapStateToProps, { loadWeek, loadPicks, savePicks })(
  withStyles(styles)(Week)
)
