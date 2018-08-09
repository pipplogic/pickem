import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";

import App from "./App";
import { mapState, mapDispatch } from "./reduxMappers";
import styles from "./styles";

export default connect(mapState, mapDispatch)(withStyles(styles)(App));
