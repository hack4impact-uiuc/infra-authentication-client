import API_URL from "../components/globalApiUrl.js";
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/layout.js";
import { register } from "../utils/api";

// michael's baby
const EMAIL_REGEX =
  "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})";

export default class extends React.Component {
  state = {
    email: "",
    password: "",
    password2: "",
    signingUp: false,
    errorMessage: ""
  };

  handleChange = event => {
    const value = event.target.value,
      name = event.target.name;
    this.setState({ [name]: value });
  };

  async apiFetchExample() {
    const result = await register(this.state.email, this.state.password);
    const parsed = await result.json();
    return parsed;
  }

  handleSubmit = async e => {
    event.preventDefault();
    if (!this.state.signingUp) {
      const response = await this.apiFetchExample();
      if (!response.token) {
        this.setState({ errorMessage: response.message });
      } else {
        document.cookie = "token=" + response.token;
      }
      this.setState({ signingUp: false });
    }
  };

  handleClick = event => {
    const { id } = event.target;
    if (id === "login-button") {
      Router.push("/login");
    }
  };

  render = () => (
    <Layout>
      <div>
        <h2>Register</h2>

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
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <input
            name="password2"
            type="password"
            placeholder="Enter password again"
            minLength="8"
            maxLength="64"
            value={this.state.password2}
            onChange={this.handleChange}
            required
          />

          <button name="submit" type="submit">
            {this.state.loggingIn ? "Signing Up.." : "Sign Up"}
          </button>
        </form>

        <button id="login-button" onClick={this.handleClick}>
          Already have an account? Log in here!
        </button>
      </div>
    </Layout>
  );
}
