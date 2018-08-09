import withStyles from '@material-ui/core/styles/withStyles'
import { connect } from 'react-redux'

import styles from './styles'
import WeekStatus from './WeekStatus'
import { mapState } from './reduxMappers'

export default connect(mapState)(withStyles(styles)(WeekStatus))
