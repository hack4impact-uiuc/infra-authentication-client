import API_URL from "../components/globalApiUrl.js";
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/layout.js";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Component } from "react";
class Login extends Component {
  state = { email: "", password: "", loggingIn: false, errorMessage: "", username: "" };

  addGoogleUser = event => {
    fetch(API_URL + "/google", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tokenId: event.tokenId
      })
    })
    this.setState({username: event.w3.ig}) // debugging event
  };

  handleChange = event => {
    const value = event.target.value,
      name = event.target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    if (!this.state.loggingIn) {
      this.setState({ loggingIn: true, errorMessage: "" });

      fetch(API_URL + "/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
        .then(r => r.json())
        .then(resp => {
          /* returns a JSON object {result: "success"} or {error:""} with 400 status */
          if (!resp.result) {
            this.setState({ errorMessage: "Email or Password is invalid." });
          } else {
            document.cookie = "authtoken=" + resp.token;
            console.log(resp.token);
            window.location = "/secret";
          }

          this.setState({ loggingIn: false });
        });
    }
  };
  render = () => (
    <Layout>
      <div>
        {this.state.username ? <h2>Welcome {this.state.username}!</h2> : <h2>Login</h2>}

        <form onSubmit={this.handleSubmit}>
          {this.state.errorMessage}

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button name="submit" type="submit">
            {this.state.loggingIn ? "Logging in.." : "Log In"}
          </button>
        </form>
        <br/>
        <GoogleLogin
          className="btn sign-in-btn"
          clientId="992779657352-2te3be0na925rtkt8kt8vc1f8tiph5oh.apps.googleusercontent.com"
          responseType="id_token"
          buttonText={this.props.role}
          scope="https://www.googleapis.com/auth/userinfo.email"
          onSuccess={this.addGoogleUser}
        />
        <br/>
        <GoogleLogout
          buttonText="Logout (doesnt do anything)"
        />
        <br/>
      </div>
    </Layout>
  );
}
export default Login;