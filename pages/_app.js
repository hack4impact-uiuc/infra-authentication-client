import App, { Container } from "next/app";
import Head from "./../components/head";

export default class extends App {
  static async getInitialProps({ Component, ...ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component } = this.props;

    return (
      <Container>
        <Head />
        <Component {...this.props.response} />
      </Container>
    );
  }
}
