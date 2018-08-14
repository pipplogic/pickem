import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'

import ForgotPassword from './ForgotPassword'
import styles from './styles'
import { buildActionCreators } from './forgotPasswordDuck'
import { getForgotPasswordState } from '../reducers'

export default connect(
  getForgotPasswordState,
  buildActionCreators(getForgotPasswordState)
)(withStyles(styles)(ForgotPassword))
