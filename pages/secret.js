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

class SecretPage extends Component {
  handleSubmit = ({ Component, router, ctx }) => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Router.push("/")
    console.log(document.cookie);
    console.log("logged out");
  };

  render() {
    return (
      <Layout {...this.props}>
        <Header />
        <p>
          {" "}
          This is a secret page that should only be accessed once authenticated.{" "}
        </p>
        <button name="logout" type="submit" onClick={this.handleSubmit}>
          Log out
        </button>
      </Layout>
    );
  }
}

export default withAuth(SecretPage);
