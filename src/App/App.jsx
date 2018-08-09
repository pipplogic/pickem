import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import Login from "../Login";
import Register from "../Register";
import Footer from "../Footer";
import Header from "../Header";
import Selections from "../Selections";
import Week from "../Week";
import Theme from "../Theme";

const classesProp = (...classNames) =>
  PropTypes.shape(
    classNames.reduce(
      (propType, className) => ({
        ...propType,
        [className]: PropTypes.string.isRequired
      }),
      {}
    )
  );

export default class App extends React.Component {
  static propTypes = {
    classes: classesProp("body", "root", "selections", "week").isRequired,
    loadExistingSession: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { loadExistingSession } = this.props;
    loadExistingSession();
  }

  render() {
    const { classes, loggedIn } = this.props;
    return (
      <Theme>
        <div className={classes.root}>
          <Header />
          <Paper classes={{ root: classes.body }}>
            <BrowserRouter>
              <Switch>
                <Route exact path="/register" render={() => <Register />} />
                <Route
                  exact
                  path="/login"
                  render={() => {
                    if (loggedIn) {
                      return <Redirect to="/week" />;
                    }
                    return <Login />;
                  }}
                />
                <Route
                  path="/week"
                  render={() => {
                    if (!loggedIn) {
                      return <Redirect to="/login" />;
                    }
                    return (
                      <React.Fragment>
                        <Selections className={classes.selections} />
                        <Week className={classes.week} />
                      </React.Fragment>
                    );
                  }}
                />
                <Redirect to="/login" />
              </Switch>
            </BrowserRouter>
          </Paper>
          <Footer />
        </div>
      </Theme>
    );
  }
}
