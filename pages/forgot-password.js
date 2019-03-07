import Link from "next/link";
import Router from "next/router";

import Layout from "../components/layout.js";
import API_URL from "../components/globalApiUrl.js";

export default class extends React.Component {
  state = {
    email: "",
    securityQuestion: "",
    didLoadQuestion: false,
    errorMessage: "",
    securityAnswer: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (!this.state.didLoadQuestion) {
      this.setState({ errorMessage: "" });
      fetch(API_URL + "/getSecurityQuestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.state.email
        })
      })
        .then(r => r.json())
        .then(resp => {
          console.log(resp);
          /* returns a JSON object {result: "success"} or {error:""} with 400 status */
          if (resp.status != 200) {
            this.setState({ errorMessage: "Email or Password is invalid." });
          } else {
            this.setState({
              securityQuestion: resp.question,
              didLoadQuestion: true
            });
          }

          this.setState({ loggingIn: false });
        })
        .catch(e => console.log(e));
    } else {
      // User already got the security question, so now send the response to the server
      this.setState({ errorMessage: "" });
      fetch(API_URL + "/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.state.email,
          answer: this.state.securityAnswer
        })
      })
        .then(r => r.json())
        .then(resp => {
          console.log(resp);
          /* returns a JSON object {result: "success"} or {error:""} with 400 status */
          this.setState({ didLoadQuestion: true });
          if (resp.status != 200) {
            this.setState({
              errorMessage: "Answer to security question is wrong"
            });
          } else {
            this.setState({ errorMessage: resp.message });
          }

          this.setState({ loggingIn: false });
        })
        .catch(e => console.log("Error: " + e));
    }
  };

  render = () => (
    <Layout>
      <div>
        <h2>Forgot Password</h2>

        <form onSubmit={this.handleSubmit}>
          <p>{this.state.errorMessage}</p>

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <p>{this.state.securityQuestion}</p>

          {this.state.didLoadQuestion && (
            <input
              name="securityAnswer"
              type="text"
              value={this.state.securityAnswer}
              onChange={this.handleChange}
              required
            />
          )}
          <button name="submit" type="submit">
            {this.state.didLoadQuestion ? "Send PIN" : "Get Security Question"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
