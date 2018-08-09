import { connect } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'

import Game from './Game'
import { mapState, mapDispatch } from './reduxMappers'
import styles from './styles'

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(Game))
