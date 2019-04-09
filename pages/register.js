import Link from "next/link";
import Router from "next/router";
import { register, verifyPIN } from "../utils/api";
import {
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";
import { setCookie } from "./../utils/cookie";

// michael's baby
const EMAIL_REGEX =
  "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})";

export default class extends React.Component {
  state = {
    email: "",
    password: "",
    password2: "",
    errorMessage: "",
    pinMessage: "",
    pin: "",
    successfulSubmit: false
  };

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    event.preventDefault();
    if (this.state.password === this.state.password2) {
      const result = await register(this.state.email, this.state.password);
      const response = await result.json();
      if (!response.token) {
        this.setState({ errorMessage: response.message });
      } else {
        setCookie("token", response.token);
        this.setState({ successfulSubmit: true });
      }
    } else {
      this.setState({ errorMessage: "Passwords do not match" });
    }
  };

  handlePINVerify = async e => {
    e.preventDefault();
    const result = await verifyPIN(this.state.pin);
    const response = await result.json();
    this.setState({ pinMessage: response.message });
    if (response.status === 200) {
      Router.push("/");
    }
  };

  render = () => (
    <div>
      {" "}
      {!this.state.successfulSubmit ? (
        <Card
          className="interview-card"
          style={{ width: "400px", height: "60%" }}
        >
          <CardTitle>
            <h3 style={{ textAlign: "center", paddingTop: "10px" }}>
              Register
            </h3>
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
                  minLength="8"
                  maxLength="64"
                  value={this.state.password}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Confirm Password</Label>
                <Input
                  type="password"
                  name="password2"
                  minLength="8"
                  maxLength="64"
                  value={this.state.password2}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <Button
                color="success"
                size="lg"
                onClick={this.handleSubmit}
                style={{ float: "left", width: "48%" }}
              >
                Register
              </Button>{" "}
              <Button
                color="success"
                size="lg"
                onClick={() => Router.push("/login")}
                style={{ float: "right", width: "49%" }}
              >
                Login
              </Button>
              <br />
              <br />
              <br />
              <p style={{ color: "red" }}>{this.state.errorMessage}</p>
            </Form>
          </CardBody>
        </Card>
      ) : (
        <Card
          className="interview-card"
          style={{ width: "400px", height: "60%" }}
        >
          <CardBody>
            <Form>
              <FormGroup>
                <p style={{ color: "green" }}>{this.state.pinMessage}</p>
                <Label>PIN</Label>
                <Input
                  name="pin"
                  type="number"
                  maxLength="10"
                  minLength="4"
                  value={this.state.pin}
                  onChange={this.handleChange}
                  required
                />
              </FormGroup>
              <Button
                color="success"
                size="lg"
                onClick={this.handlePINVerify}
                style={{ float: "left", width: "100%" }}
              >
                Change Password
              </Button>
            </Form>
            {this.state.passwordChangeMessage}
          </CardBody>
        </Card>
      )}
    </div>
  );
}
