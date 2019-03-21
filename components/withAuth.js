import React from "react";
import { verify } from "../utils/api";

const withAuth = WrappedComponent => {
  class HOC extends React.Component {
    state = {
      verified: false
    };
    async componentDidMount() {
      const verifyResponse = await verify();
      console.log(verifyResponse);
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
            <p> </p>
          )}
        </div>
      );
    }
  }

  return HOC;
};

export default withAuth;
