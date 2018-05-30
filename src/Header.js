import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

function Header() {
  // TODO Sticky
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="title" color="inherit">
          Pick &apos;Em
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
