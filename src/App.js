import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Week from "./Week.js";
import "./App.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navBarOpen: false
    };
  }

  toggleNavbar = () => {
    this.setState({
      navBarOpen: !this.state.navBarOpen
    });
  };

  render() {
    let { store } = this.props;
    let { week, picks } = store.getState();

    return (
      <div className="app">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Pick em</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse isOpen={this.state.navBarOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Season Standings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Week Standings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Switch League</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>

        <section className="main-body container">
          <Week store={store} week={week} picks={picks} />
        </section>
      </div>
    );
  }
}

export default App;
