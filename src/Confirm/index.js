import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'

import Confirm from './Confirm'
import styles from './styles'
import { buildActionCreators } from './confirmDuck'
import { getConfirmState } from '../reducers'

export default connect(getConfirmState, buildActionCreators(getConfirmState))(
  withStyles(styles)(Confirm)
)
