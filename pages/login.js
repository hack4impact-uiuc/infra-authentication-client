import API_URL from "../components/globalApiUrl.js";
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/layout.js";
import { login } from "../utils/api";
import { parse } from "ipaddr.js";


// michael's baby
const EMAIL_REGEX = "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})";
// const PASSWORD_REGEX = "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})";

export default class extends React.Component {
  state = { email: "", password: "", loggingIn: false, errorMessage: "" };

  handleChange = event => {
    const value = event.target.value,
      name = event.target.name;
    this.setState({ [name]: value });
  };

  async apiFetchExample() {
    const result = await login(this.state.email, this.state.password);
    const parsed = await result.json();
    return parsed;
  }

  handleSubmit = async e => {
    event.preventDefault();
    if (!this.state.loggingIn) {
      await this.apiFetchExample()
      .then(resp => {
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
            minLength="8"
            maxLength="64"
            // pattern={PASSWORD_REGEX}
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
