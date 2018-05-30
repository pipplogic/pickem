import { Paper, withStyles } from "@material-ui/core";
import cx from "classnames";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Selections from "./Selections";
import Week from "./Week";

const style = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  center: {
    display: "flex",
    justifyContent: "center"
  },
  body: {
    width: "100vw",
    maxWidth: theme.breakpoints.values.md,
    margin: "0 auto",
    flexGrow: "1"
  }
});

function App({ classes }) {
  return (
    <div className={classes.root}>
      <Header />
      <Paper classes={{ root: classes.body }}>
        <Selections className={cx(classes.center, classes.contained)} />
        <Week className={classes.contained} />
      </Paper>
      <Footer />
    </div>
  );
}

export default withStyles(style)(App);
