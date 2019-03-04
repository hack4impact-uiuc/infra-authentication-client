import API_URL from "../components/globalApiUrl.js";
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/layout.js";

export default class extends React.Component {
  state = { 
    username: "", 
    email: "", 
    password: "", 
    phone_number: "", 
    // security questions later
    errorMessage: ""
  };


  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    const valid = false;

    // do some regex validation for emails and passwords
    // do some color changing magic to signal validity of text fields
    if (name === "email") {
      console.log("check email regex validation");
      // set validity
      // if not regex level valid:
        this.setState({
          errorMessage: "Please make sure that the email you provided is valid"
        });
    } else if (name === "password") {
      console.log("check password regex validation");
      // set validity
      // if not regex level valid:
        this.setState({
          errorMessage: "Please make sure that the password you provided satisfies these conditions: ....."
        });
      }

    this.setState({
      [name]: value
    });


  };

  handleSubmit = event => {
    event.preventDefault();
    fetch(API_URL + "/register", {
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
      });
  };

  // TODO: aiyah need to make route for /register lol
  render = () => (
    <Layout>
      <div>
        <h2>Register</h2>

        <form onSubmit={this.handleSubmit}>
          {this.state.errorMessage}

          <input
            name="username"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
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
          <input
            name="phoneNumber"
            type="text"
            placeholder="phoneNumber"
            value={this.state.phone_number}
            onChange={this.handleChange}
          />

          <button name="submit" type="submit">
            "Sign up"
          </button>
        </form>
      </div>
    </Layout>
  );

  };



}