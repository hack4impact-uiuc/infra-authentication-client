import API_URL from "../components/globalApiUrl.js";
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/layout.js";
import { GoogleLogin, GoogleLogout } from 'react-google-login';

export default class extends React.Component {
  state = { email: "", password: "", loggingIn: false, errorMessage: "", temp: "hello" };

  handleChange = event => {
    const value = event.target.value,
      name = event.target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

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
  tempstate = () => {
    this.setState({temp: "welcome"})
  }
  render = () => (
    <Layout>
      <div>
        <h2>Login</h2>

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
          onSuccess={this.tempstate}
        />
        <br/>
        <GoogleLogout
          buttonText="Logout"
        />
        <br/>
        <button
          onClick={this.tempstate}
        >
          Test
        </button>
        {this.state.temp}
      </div>
    </Layout>
  );
}
