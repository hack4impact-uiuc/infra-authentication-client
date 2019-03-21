import Link from "next/link";
import Router from "next/router";
import { login } from "../utils/api";
import { parse } from "ipaddr.js";
import {
  Form,
  Button,
  ButtonGroup,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";

const EMAIL_REGEX =
  "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})";
// const PASSWORD_REGEX = "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})";

import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Component } from "react";
class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
    username: ""
  };

  addGoogleUser = event => {
    fetch("http://localhost:5000/google", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tokenId: event.tokenId
      })
    });
    this.setState({ username: event.w3.ig }); // debugging event
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async e => {
    event.preventDefault();

    const result = await login(this.state.email, this.state.password);
    const resp = await result.json();

    if (!resp.token) {
      this.setState({ errorMessage: resp.message });
    } else {
      document.cookie = "";
      document.cookie = "token=" + resp.token;
      Router.push("/secret");
    }
  };

  render = () => (
    <div>
      <Card
        className="interview-card"
        style={{ width: "400px", height: "60%" }}
      >
        <CardTitle>
          <h3 style={{ textAlign: "center", paddingTop: "10px" }}>Login</h3>
        </CardTitle>

        <CardBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                maxLength="64"
                pattern={EMAIL_REGEX}
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                minLength="8"
                maxLength="64"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <Button
              color="success"
              size="lg"
              onClick={this.handleSubmit}
              style={{ float: "left", width: "49%" }}
            >
              Log In
            </Button>{" "}
            <Button
              color="success"
              size="lg"
              onClick={() => Router.push("/register")}
              style={{ float: "right", width: "49%" }}
            >
              Register
            </Button>
          </Form>
          <p style={{ color: "red" }}>
            {this.state.errorMessage ? this.state.errorMessage : ""}
          </p>
          <Link prefetch href="/forgotPassword">
            <a>Forgot Password?</a>
          </Link>
        </CardBody>
      </Card>
      <br />
      <GoogleLogin
        className="btn sign-in-btn"
        clientId="992779657352-2te3be0na925rtkt8kt8vc1f8tiph5oh.apps.googleusercontent.com"
        responseType="id_token"
        buttonText={this.props.role}
        scope="https://www.googleapis.com/auth/userinfo.email"
        onSuccess={this.addGoogleUser}
      />
      <br />
    </div>
  );
}
export default Login;
