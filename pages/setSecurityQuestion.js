import API_URL from "../components/globalApiUrl.js";
import Link from "next/link";
import Router from "next/router";
import Layout from "../components/layout.js";
import { setSecurityQuestion } from "../utils/api";
import { parse } from "ipaddr.js";
import withAuth from "../components/withAuth";
import {
  Form,
  Button,
  ButtonGroup,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody
} from "reactstrap";

const EMAIL_REGEX =
  "([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+).([a-zA-Z]{2,3}).?([a-zA-Z]{0,3})";
// const PASSWORD_REGEX = "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})";

import { Component } from "react";
// import withAuth from "../components/withAuth.js";
class SetSecurityQuestion extends Component {
  state = {
    question: "",
    answer: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async e => {
    event.preventDefault();

    console.log(this.state.question.trim().length);
    console.log(this.state.answer.trim().length);
    if (
      this.state.question.trim().length > 0 &&
      this.state.answer.trim().length > 0
    ) {
      const result = await setSecurityQuestion(
        this.state.question,
        this.state.answer
      );
      const resp = await result.json();
    }
  };

  render = () => (
    <div>
      {this.state.username ? (
        <h2>Welcome {this.state.username}!</h2>
      ) : (
        <h2>Login</h2>
      )}
      <Card
        className="interview-card"
        style={{ width: "400px", height: "60%" }}
      >
        <CardBody>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Question</Label>
              <Input
                name="question"
                maxLength="128"
                value={this.state.question}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Answer</Label>
              <Input
                name="answer"
                maxLength="128"
                value={this.state.answer}
                onChange={this.handleChange}
                required
              />
            </FormGroup>
            <Button
              color="success"
              size="lg"
              onClick={this.handleSubmit}
              style={{ float: "left", width: "100%" }}
            >
              Set Security Question
            </Button>{" "}
            {/* <Button
              color="success"
              size="lg"
              onClick={() => Router.push("/register")}
              style={{ float: "right", width: "48%" }}
            >
              Register
            </Button> */}
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
export default withAuth(SetSecurityQuestion);
