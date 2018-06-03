import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import React from "react";

const theme = createMuiTheme({
  props: {
    MuiTypography: {
      color: "inherit"
    }
  }
});

function Theme({ children }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export default Theme;
