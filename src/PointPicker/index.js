import { connect } from 'react-redux'

import PointPicker from './PointPicker'
import { mapState, mapDispatch, mergeProps } from './reduxMappers'

export default connect(mapState, mapDispatch, mergeProps)(PointPicker)
