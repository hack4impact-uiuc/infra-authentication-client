import API_URL from "../components/globalApiUrl.js";
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/layout.js";

// michael's baby
const EMAIL_REGEX = "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})";

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

  handleSubmit = event => {
    event.preventDefault();

    if (!this.state.signingUp) {
      this.setState({ signingUp: true, errorMessage: "" });
      
      if (this.state.password !== this.state.password2) {
        this.setState({ signingUp: false, errorMessage: "Passwords do not match. Please try again." });
      } else {
        fetch(API_URL + "/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
            role: "guest"
          })
        })
          .then(r => r.json())
          .then(resp => {
            /* /register endpoints returns a JSON object 
              {status: 400, message: ""} or 
              {error: ""} with 400 status
            */
            if(!resp.token) {
              this.setState({ errorMessage: resp.message });
            } else {
              console.log(resp);
              document.cookie = "authtoken=" + resp.token;
              console.log(resp.token);
              window.location = "/secret";
            }

            this.setState({ signingUp: false });
          });
      }
    }
  };

  handleClick = event => {
    const { id } = event.target
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

};