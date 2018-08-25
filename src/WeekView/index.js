import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'

import WeekView from './WeekView'
import styles from './styles'
import { loadWeek, getGameIdsForWeek } from './weekDuck'
import { getWeekState } from '../reducers'

const mapStateToProps = (state, { weekNumber }) => {
  const weekState = getWeekState(state)

  const { loading, error } = weekState
  const gameIds = getGameIdsForWeek(weekState)(weekNumber) || []

  return { loading, error, gameIds }
}

export default connect(mapStateToProps, { loadWeek })(
  withStyles(styles)(WeekView)
)
