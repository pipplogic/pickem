import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import Login from '../Login'
import Register from '../Register'
import Footer from '../Footer'
import Header from '../Header'
import Selections from '../Selections'
import Week from '../Week'
import ConfirmUser from '../ConfirmUser'
import Theme from '../Theme'
import RequireLogin from '../RequireLogin'

const classesProp = (...classNames) =>
  PropTypes.shape(
    classNames.reduce(
      (propType, className) => ({
        ...propType,
        [className]: PropTypes.string.isRequired
      }),
      {}
    )
  )

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
                <Route exact path='/confirm' component={ConfirmUser} />
                <Route
                  exact
                  path='/login'
                  render={() => (
                    <RequireLogin loginPage inverted redirectTo='/week'>
                      <Login />
                    </RequireLogin>
                  )}
                />
                <Route
                  path='/week'
                  render={() => (
                    <RequireLogin weekPage redirect>
                      <Selections className={classes.selections} />
                      <Week className={classes.week} />
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
  classes: classesProp('body', 'root', 'selections', 'week').isRequired,
  loadExistingSession: PropTypes.func.isRequired
}
