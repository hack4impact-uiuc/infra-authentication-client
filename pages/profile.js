import { Component } from "react";
import Link from "next/link";
import React from "react";
import Router from "next/router";
import withAuth from "../components/withAuth";
import NavBar from "../components/navbar";
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
class ProfilePage extends Component {
  state = {
    question: "",
    answer: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
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

  render() {
    return (
      <div>
        <NavBar />
        <p> This is the profile page. </p>
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
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withAuth(ProfilePage);
