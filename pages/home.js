import { Component } from "react";
import Link from "next/link";
import Header from "../components/header";

class HomePage extends Component {

  render() {
    return (
      <main>
        <Header />
        <Link href="/">
          <a>Go to secret page if authenticated </a>
        </Link>
      </main>
    );
  }
}

export default HomePage;
