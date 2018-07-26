import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";

import App from "./component";
import { mapState } from "./reduxMappers";
import styles from "./styles";

export default connect(mapState)(withStyles(styles)(App));
