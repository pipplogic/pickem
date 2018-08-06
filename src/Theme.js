import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
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
