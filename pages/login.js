import API_URL from "../components/globalApiUrl.js";
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/layout.js";

// michael's baby
const EMAIL_REGEX = "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})";
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export default class extends React.Component {
  state = { email: "", password: "", loggingIn: false, errorMessage: "" };

  handleChange = event => {
    const value = event.target.value,
      name = event.target.name;
    this.setState({ [name]: value });
    // if (!email_regex.test(req.body.email))
  };

  handleSubmit = event => {
    event.preventDefault();

    if (!this.state.loggingIn) {
      this.setState({ loggingIn: true, errorMessage: "" });

      fetch(API_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
        .then(r => r.json())
        .then(resp => {
          /* /register endpoints returns a JSON object 
            {status: 400, message: ""} or 
            {error: ""} with 400 status
           */
          if (!resp.token) {
            this.setState({ errorMessage: resp.message });
          } else {
            document.cookie = "authtoken=" + resp.token;
            console.log(resp.token);
            window.location = "/secret";
          }

          this.setState({ loggingIn: false });
        });
    }
  };

  handleClick = event => {
    const { id } = event.target
    if (id === "signup-button") {
      Router.push("/register");
    }
  };

  render = () => (
    <Layout>
      <div>
        <h2>Login</h2>

        <form onSubmit={this.handleSubmit}>
          {this.state.errorMessage}
          <br />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            maxLength="64"
            pattern={EMAIL_REGEX}
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            maxLength="64"
            pattern={PASSWORD_REGEX}
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button name="submit" type="submit">
            {this.state.loggingIn ? "Logging in.." : "Log In"}
          </button>
        </form>

        <button id="signup-button" type="submit" onClick={this.handleClick}>
          Don't have an account with us? Register here!
        </button>
      </div>
    </Layout>
  );
}
