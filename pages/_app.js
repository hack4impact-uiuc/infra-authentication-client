import API_URL from "../components/globalApiUrl.js";
import App, { Container } from "next/app";
import React from "react";
import fetch from "isomorphic-unfetch";
import redirectTo from "../components/redirectTo.js";
import cookies from "next-cookies";

export default class extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    const c = cookies(ctx);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
  
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...this.props.response} />
      </Container>
    );
  }
}
