import React from "react";
import { verify } from "../utils/api";
import NavBar from "./navbar";
import Router from "next/router";
const withAuth = WrappedComponent => {
  class HOC extends React.Component {
    state = {
      verified: false
    };
    async componentDidMount() {
      const verifyResponse = await verify();
      if (verifyResponse) {
        this.setState({ verified: verifyResponse.status === 200 });
      } else {
        this.setState({ verified: false });
        Router.push("/login");
      }
    }
    render() {
      return (
        <div>
          {this.state.verified ? (
            <WrappedComponent
              {...this.props}
              secretToLife={42}
              verified={this.state.verified}
            />
          ) : (
            <div>
              <NavBar />
              <p> You are not authenticated </p>
            </div>
          )}
        </div>
      );
    }
  }

  return HOC;
};

export default withAuth;
