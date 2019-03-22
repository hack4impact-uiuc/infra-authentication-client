import Link from "next/link";
import Router from "next/router";
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
                type="password2"
                name="password2"
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
            <p style={{ color: "red" }}>{this.state.errorMessage}</p>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
