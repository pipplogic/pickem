import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import PropTypes from 'prop-types'
import React from 'react'

const theme = createMuiTheme({
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
