import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import Login from '../Login'
import Register from '../Register'
import Footer from '../Footer'
import ForgotPassword from '../ForgotPassword'
import Header from '../Header'
import ConfirmUser from '../ConfirmUser'
import Theme from '../Theme'
import RequireLogin from '../RequireLogin'
import Week from '../Week'
import { requireStrings } from '../propType'

export default class App extends React.Component {
  componentDidMount () {
    const { loadExistingSession } = this.props
    loadExistingSession()
  }

  render () {
    const { classes } = this.props
    return (
      <Theme>
        <div className={classes.root}>
          <Header />
          <Paper classes={{ root: classes.body }}>
            <BrowserRouter>
              <Switch>
                <Route exact path='/register' component={Register} />
                <Route
                  exact
                  path='/forgot-password'
                  component={ForgotPassword}
                />
                <Route exact path='/confirm' component={ConfirmUser} />
                <Route
                  exact
                  path='/login'
                  render={() => (
                    <RequireLogin inverted redirectTo='/week/1'>
                      <Login />
                    </RequireLogin>
                  )}
                />
                <Route
                  path='/week/:weekNumber'
                  render={({ match: { params: { weekNumber } } }) => (
                    <RequireLogin redirect>
                      <Week weekNumber={weekNumber} className={classes.week} />
                    </RequireLogin>
                  )}
                />
                <Redirect to='/login' />
              </Switch>
            </BrowserRouter>
          </Paper>
          <Footer />
        </div>
      </Theme>
    )
  }
}

App.propTypes = {
  classes: requireStrings('body', 'root', 'selections', 'week'),
  loadExistingSession: PropTypes.func.isRequired
}
