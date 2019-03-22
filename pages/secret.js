import { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import withAuth from "../components/withAuth";
import NavBar from "../components/navbar";
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

class SecretPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <p>
          This is a secret page that should only be accessed once authenticated.{" "}
        </p>
      </div>
    );
  }
}

export default withAuth(SecretPage);
