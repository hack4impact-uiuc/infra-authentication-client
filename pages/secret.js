import { Component } from "react";
import Link from "next/link";
import Header from "../components/header";
import Layout from "../components/layout.js";
import React from "react";
import fetch from "isomorphic-unfetch";
import redirectTo from "../components/redirectTo.js";
import cookies from "next-cookies";
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
  componentDidMount() {
    Router.prefetch("/profile");
  }

  logout = ({ Component, router, ctx }) => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log(document.cookie);
    console.log("logged out");
  };

  render() {
    return (
      <div>
        <NavBar />
        <p>
          {" "}
          This is a secret page that should only be accessed once authenticated.{" "}
        </p>
        <button name="logout" type="submit" onClick={this.logout}>
          Log out
        </button>
      </div>
    );
  }
}

export default withAuth(SecretPage);
