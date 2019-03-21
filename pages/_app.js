import App, { Container } from "next/app";
import React from "react";
import cookies from "next-cookies";
import Head from "./../components/head";

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
        <Head />
        <Component {...this.props.response} />
      </Container>
    );
  }
}
