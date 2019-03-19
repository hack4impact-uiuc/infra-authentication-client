import React from "react";
import { verify } from "../utils/api";

const withAuth = WrappedComponent => {
  class HOC extends React.Component {
    state = {
      verified: false
    };
    async componentDidMount() {
      const verifyResponse = await verify();
      this.setState({ verified: verifyResponse.status === 200 });
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
            <p> You are not verified </p>
          )}
        </div>
      );
    }
  }

  return HOC;
};

export default withAuth;