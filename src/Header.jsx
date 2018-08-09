import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React from 'react'

function Header () {
  // TODO Sticky
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='title'>Pick &apos;Em</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
