import { Component } from "react";
import withAuth from "../components/withAuth";
import NavBar from "../components/navbar";

class IndexPage extends Component {
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

export default withAuth(IndexPage);
