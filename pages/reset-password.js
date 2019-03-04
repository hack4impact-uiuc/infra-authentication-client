import API_URL from "../components/globalApiUrl.js";
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/layout.js";

export default class extends React.Component {
  state = { email: "", pin: "", password: "", confirmPassword:"", resettingPassword: false, errorMessage: "" };

  handleChange = event => {
    const value = event.target.value,
      name = event.target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if(this.state.password !== this.state.confirmPassword){
        this.setState({errorMessage: "Passwords don't match"});
    }
    else if (!this.state.resettingPassword) {
      // User already got the security question, so now send the response to the server
      this.setState({ errorMessage: "" });
      const a = new Promise((resolve, reject) => {
        return this.state.pin == 1234
          ? resolve(
              '{ "status":200, "message": "Password successfully reset"} '
            )
          : resolve('{ "status":400, "message": "PIN invalid or expired"} ');
      });
      //fetch(API_URL + "/resetPassword", {
      //  method: "POST",
      //  headers: { "Content-Type": "application/json" },
      //  body: JSON.stringify({
      //    email: this.state.email,
      //    pin: this.state.pin
      //  })
      // })
      a.then(r => JSON.parse(r))
        .then(resp => {
          /* returns a JSON object {result: "success"} or {error:""} with 400 status */
          this.setState({
            resettingPassword: false,
            errorMessage: resp.message
          });
        })
        .catch(e => console.log("Error: " + e));
    }
  };

  render = () => (
    <Layout>
      <div>
        <h2>Reset Password</h2>

        <form onSubmit={this.handleSubmit}>
          <p>{this.state.errorMessage}</p>
          <p>Email:</p>
          <input
            name="email"
            type="email"
            placeholder=""
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <p>PIN:</p>
          <input
            name="pin"
            type="number"
            value={this.state.pin}
            onChange={this.handleChange}
            required
          />


          <p>Password:</p>
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />


          <p>Confirm Password:</p>
          <input
            name="confirmPassword"
            type="password"
            value={this.state.confirmPassword}
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
            {this.state.resettingPassword ? "Resetting Password..." : "Reset Password"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
