import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import React from 'react'
import FootballHelmet from 'mdi-material-ui/FootballHelmet'

import { logout } from './api'
import { requireStrings } from './propType'
import RequireLogin from './RequireLogin'

function Header ({ classes }) {
  // TODO Sticky
  return (
    <AppBar position='static'>
      <Toolbar>
        <FootballHelmet className={classes.logo} />
        <Typography variant='title' className={classes.title}>
          Pick &apos;Em
        </Typography>
        <RequireLogin>
          <Button color='inherit' onClick={logout}>
            Logout
          </Button>
        </RequireLogin>
      </Toolbar>
    </AppBar>
  )
}
Header.propTypes = {
  classes: requireStrings('title', 'logo')
}

const styles = theme => ({
  title: {
    flexGrow: 1
  },
  logo: {
    transform: 'scaleX(-1)',
    marginRight: theme.spacing.unit
  }
})

export default withStyles(styles)(Header)
