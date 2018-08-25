import { connect } from 'react-redux'

import PointPicker from './PointPicker'
import { mapState, mapDispatch } from './reduxMappers'

export default connect(mapState, mapDispatch)(PointPicker)
