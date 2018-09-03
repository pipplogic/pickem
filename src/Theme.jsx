import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import PropTypes from 'prop-types'
import React from 'react'
import green from '@material-ui/core/colors/green'

const theme = createMuiTheme({
  palette: {
    secondary: green
  },
  props: {
    MuiTypography: {
      color: 'inherit'
    }
  }
})

function Theme ({ children }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
}

Theme.propTypes = {
  children: PropTypes.node.isRequired
}

export default Theme
