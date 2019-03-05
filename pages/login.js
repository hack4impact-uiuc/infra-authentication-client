import API_URL from "../components/globalApiUrl.js";
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/layout.js";

export default class extends React.Component {
  state = { email: "", password: "", loggingIn: false, errorMessage: "" };

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

  handleClick = event => {
    const name = event.target.value;
    if (name === "signup_buttom") {
      Router.push("/register");
    }
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
        <button name="signup_button" type="submit" onClick={this.handleClick}>
            Don't have an account with us? Register here!
          </button>
      </div>
    </Layout>
  );
}
