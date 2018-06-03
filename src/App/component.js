import { Paper } from "@material-ui/core";
import React from "react";

import Footer from "../Footer";
import Header from "../Header";
import Selections from "../Selections";
import Week from "../Week";
import Theme from "../Theme";

export default function App({ classes }) {
  return (
    <Theme>
      <div className={classes.root}>
        <Header />
        <Paper classes={{ root: classes.body }}>
          <Selections className={classes.selections} />
          <Week className={classes.week} />
        </Paper>
        <Footer />
      </div>
    </Theme>
  );
}
