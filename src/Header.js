import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

function Header() {
  // TODO Sticky
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="title">Pick &apos;Em</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
