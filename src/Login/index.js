import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'

import Login from './Login'

import { buildActionCreators } from './loginDuck'
import { getLoginState } from '../reducers'
import styles from './styles'

export default connect(getLoginState, buildActionCreators(getLoginState))(withStyles(styles)(Login))
