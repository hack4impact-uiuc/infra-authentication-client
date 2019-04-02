import { Component } from "react";
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
import Router from "next/router";
import { removeCookie } from "./../utils/cookie";

class NavBar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  logout = ({ Component, router, ctx }) => {
    removeCookie("token");
    removeCookie("google");
    Router.push("/login");
  };

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Hack4Impact Application</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret />
                <DropdownMenu right>
                  <DropdownItem href="/profile"> Profile </DropdownItem>
                  <DropdownItem href="/">Application </DropdownItem>
                  <DropdownItem href="/roles">Changing Roles </DropdownItem>
                  <DropdownItem onClick={this.logout}>Logout </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
