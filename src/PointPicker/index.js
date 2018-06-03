import { connect } from "react-redux";

import PointPicker from "./component";
import { mapState, mapDispatch, mergeProps } from "./reduxMappers";

export default connect(mapState, mapDispatch, mergeProps)(PointPicker);
