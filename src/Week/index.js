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
import {
  savePicks as apiSavePicks,
  loadPicks as apiLoadPicks,
  loadPoolOptions as apiLoadPoolOptions
} from '../api'

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

const loadPicks = ({ poolId, weekId }) => dispatch => {
  return apiLoadPicks({ poolId, weekId })
    .then(picks => {
      dispatch(addPicks(picks))
      return picks
    })
    .catch(res => {
      console.log('error loading', res)
      throw res
    })
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

const loadEmAll = ({ weekId, poolId }) => (dispatch, getState) => {
  const gameIdsAsync = loadWeek(weekId)(dispatch)
  if (poolId === 'MOCK_POOL') {
    return
  }
  const initialPicksAsync = loadPicks({ poolId, weekId })(dispatch)
  // TODO eventually use these instead of the global options
  const pickOptionsAsync = apiLoadPoolOptions({ poolId, weekId })

  initialPicksAsync.then(initialPicks => {
    if (initialPicks.length > 0) {
      // Loaded real picks. We're done.
      return
    }
    Promise.all([gameIdsAsync, pickOptionsAsync]).then(
      ([gameIds, pickOptions]) => {
        const defaultPicks = gameIds.map((gameId, gameNumber) => ({
          gameId,
          poolId,
          score: pickOptions[gameNumber]
        }))
        console.log('making default picks', defaultPicks)
        dispatch(addPicks(defaultPicks))
      }
    )
  })
}

export default connect(mapStateToProps, {
  loadEmAll,
  loadWeek,
  loadPicks,
  savePicks
})(withStyles(styles)(Week))
