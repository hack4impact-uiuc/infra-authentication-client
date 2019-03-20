import API_URL from "../components/globalApiUrl.js";
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/layout.js";
import { register } from "../utils/api";
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

// michael's baby
const EMAIL_REGEX =
  "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})";

export default class extends React.Component {
  state = {
    email: "",
    password: "",
    password2: "",
    errorMessage: ""
  };

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    event.preventDefault();
    const result = await register(this.state.email, this.state.password);
    const response = await result.json();
    if (!response.token) {
      this.setState({ errorMessage: response.message });
    } else {
      document.cookie = "";
      document.cookie = "token=" + response.token;
      Router.push("/secret");
    }
  };

  handleClick = event => {
    const { id } = event.target;
    if (id === "login-button") {
      Router.push("/login");
    }
  };

  render = () => (
    <div>
      <Card
        className="interview-card"
        style={{ width: "400px", height: "60%" }}
      >
        <CardTitle>
          <h3 style={{ textAlign: "center", paddingTop: "10px" }}>Register</h3>
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
            <FormGroup>
              <Label for="examplePassword">Confirm Password</Label>
              <Input
                type="password"
                name="password2"
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
            <p style={{ color: "red" }}>
              {this.state.errorMessage ? this.state.errorMessage : ""}
            </p>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
