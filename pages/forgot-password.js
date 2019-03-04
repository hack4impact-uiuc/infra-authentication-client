import API_URL from "../components/globalApiUrl.js";
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/layout.js";

export default class extends React.Component {
  state = { email: "", securityQuestion: "", didLoadQuestion: false, errorMessage: "" ,securityAnswer: ""};

  handleChange = event => {
    const value = event.target.value,
      name = event.target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (!this.state.didLoadQuestion) {
      this.setState({  errorMessage: "" });
      const a = new Promise((resolve,reject) => resolve('{ "status":200, "question": "What was your mother\'s maiden name?"} ') )
      //fetch(API_URL + "/getSecurityQuestion", {
      //  method: "POST",
      //  headers: { "Content-Type": "application/json" },
      //  body: JSON.stringify({
      //    email: this.state.email
      //  })
      // })
        a
        .then(r => JSON.parse(r))
        .then(resp => {
          console.log(resp);
          /* returns a JSON object {result: "success"} or {error:""} with 400 status */
          if (resp.status != 200) {
            this.setState({ errorMessage: "Email or Password is invalid." });
          } else {
            this.setState({ securityQuestion: resp.question,didLoadQuestion:true });
          }

          this.setState({ loggingIn: false });
        }).catch(
         e =>
         console.log(e)
        );
    } else{
      // User already got the security question, so now send the response to the server
      this.setState({ errorMessage: "" });
      const a = new Promise((resolve,reject) => {
        return this.state.securityAnswer == "1234" ? resolve('{ "status":200, "message": "Email successfully sent"} ') : resolve('{ "status":400, "message": "Answer to security question is incorrect"} '); 
      })
      //fetch(API_URL + "/forgotPassword", {
      //  method: "POST",
      //  headers: { "Content-Type": "application/json" },
      //  body: JSON.stringify({
      //    email: this.state.email,
      //    answer: this.state.securityAnswer
      //  })
      // })
        a
        .then(r => JSON.parse(r))
        .then(resp => {
          console.log(resp);
          /* returns a JSON object {result: "success"} or {error:""} with 400 status */
          this.setState({ didLoadQuestion: true });
          if (resp.status != 200) {
            this.setState({ errorMessage: "Answer to security question is wrong" });
          } else {
            this.setState({ errorMessage: resp.message });
          }

          this.setState({ loggingIn: false });
        }).catch(
         e =>
         console.log("Error: " + e)
        );
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
 
          {this.state.didLoadQuestion && <input
            name="securityAnswer"
            type="text"
            value={this.state.securityAnswer}
            onChange={this.handleChange}
            required
          /> } 
          <button name="submit" type="submit">
            {this.state.didLoadQuestion ? "Send PIN" : "Get Security Question"}
          </button>


        </form>
      </div>
    </Layout>
  );
}
