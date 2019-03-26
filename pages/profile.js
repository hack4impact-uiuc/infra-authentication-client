import { Component } from "react";
import Link from "next/link";
import React from "react";
import Router from "next/router";
import withAuth from "../components/withAuth";
import NavBar from "../components/navbar";
import { setSecurityQuestion, changePassword } from "../utils/api";
import {
  Form,
  Button,
  ButtonGroup,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap";
import { setCookie, getCookie } from "./../utils/cookie";

class ProfilePage extends Component {
  state = {
    question: "",
    answer: "",
    oldPassword: "",
    newPassword1: "",
    newPassword2: "",
    passwordChangeMessage: ""
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

  handlePassChange = async e => {
    e.preventDefault();
    if (this.state.newPassword1 === this.state.newPassword2) {
      const result = await changePassword(
        this.state.oldPassword,
        this.state.newPassword1
      );
      const response = await result.json();
      if (!response.token) {
        this.setState({ passwordChangeMessage: response.message });
      } else {
        this.setState({ passwordChangeMessage: response.message });
        setCookie("token", response.token);
      }
    } else {
      this.setState({ passwordChangeMessage: "Passwords do not match" });
    }
  };

  render() {
    return (
      <div>
        <NavBar />
        <p> This is the profile page. </p>
        {getCookie("google") ? (
          <p> You are a Google user :) </p>
        ) : (
          <Row>
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
                  </Button>
                </Form>
              </CardBody>
            </Card>
            <Card
              className="interview-card"
              style={{ width: "400px", height: "60%" }}
            >
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label>Old Password</Label>
                    <Input
                      name="oldPassword"
                      type="password"
                      maxLength="128"
                      value={this.state.oldPassword}
                      onChange={this.handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>New Password</Label>
                    <Input
                      name="newPassword1"
                      type="password"
                      maxLength="128"
                      value={this.state.newPassword1}
                      onChange={this.handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Confirm Password</Label>
                    <Input
                      name="newPassword2"
                      type="password"
                      maxLength="128"
                      value={this.state.newPassword2}
                      onChange={this.handleChange}
                      required
                    />
                  </FormGroup>
                  <Button
                    color="success"
                    size="lg"
                    onClick={this.handlePassChange}
                    style={{ float: "left", width: "100%" }}
                  >
                    Change Password
                  </Button>
                </Form>
                {this.state.passwordChangeMessage}
              </CardBody>
            </Card>
          </Row>
        )}
      </div>
    );
  }
}

export default withAuth(ProfilePage);
