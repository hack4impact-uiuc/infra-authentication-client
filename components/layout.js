import React from "react";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { authtoken: props.authtoken };
  }

  render() {
    return <div>
    <p> My Token is {this.state.authtoken}</p>
    {this.props.children}
    
    </div>;
  }
}
