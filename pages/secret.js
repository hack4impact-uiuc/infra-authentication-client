import { Component } from "react";
import Link from "next/link";
import Header from "../components/header";
import Layout from '../components/layout.js'


class SecretPage extends Component {
  render() {
    return (
      <Layout {...this.props}>
        <Header />
        <p> This is a secret page that should only be accessed once authenticated. </p>
      </Layout>
     
    );
  }
}

export default SecretPage;