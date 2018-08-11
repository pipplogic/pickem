import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'

import App from './App'
import { mapDispatch } from './reduxMappers'
import styles from './styles'

export default connect(null, mapDispatch)(withStyles(styles)(App))
