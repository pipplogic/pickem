import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";

import Register from "./component";
import styles from "./styles";
import { buildActionCreators } from "./registerDuck";
import { getRegisterState } from "../reducers";

export default connect(getRegisterState, buildActionCreators(getRegisterState))(
  withStyles(styles)(Register)
);
