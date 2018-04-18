import React, { Component } from "react";
import Week from "./Week.js";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navBarOpen: false
    };
  }

  render() {
    let { store } = this.props;
    let { week, picks } = store.getState();

    return (
      <div className="app">
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              Title
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <section className="main-body container">
          <Week store={store} week={week} picks={picks} />
        </section>
      </div>
    );
  }
}

export default App;
