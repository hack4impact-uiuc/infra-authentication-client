import { Component } from "react";
import Link from "next/link";
import React from "react";
import Router from "next/router";
import { Alert } from "reactstrap";
import withAuth from "../components/withAuth";
import NavBar from "../components/navbar";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import {
  setSecurityQuestion,
  changePassword,
  getSecurityQuestions
} from "../utils/api";
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
    dropdownOpen: false,
    questionIdx: -1,
    answer: "",
    questions: [],
    oldPassword: "",
    newPassword1: "",
    newPassword2: "",
    passwordChangeMessage: "",
    securityPassword: ""
  };

  async componentWillMount() {
    const resp = await (await getSecurityQuestions()).json();
    if (resp.questions) {
      this.setState({ questions: resp.questions });
    }
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };
  pickDropDown = (idx, e) => {
    this.setState({ questionIdx: idx });
  };
  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.questionIdx !== -1 && this.state.answer.trim().length > 0) {
      const result = await setSecurityQuestion(
        this.state.questionIdx,
        this.state.answer,
        this.state.securityPassword
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
        {this.state.passwordChangeMessage !== "" && (
          <Alert color="primary">{this.state.passwordChangeMessage}</Alert>
        )}

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
                    {!!this.state.questions ? (
                      <Dropdown
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggle}
                      >
                        <DropdownToggle caret>
                          {this.state.questionIdx === -1
                            ? "Security Question"
                            : this.state.questions[this.state.questionIdx]}
                        </DropdownToggle>
                        <DropdownMenu>
                          {this.state.questions.map((question, idx) => (
                            <DropdownItem
                              onClick={this.pickDropDown.bind(null, idx)}
                            >
                              {question}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Label>Answer</Label>
                    <Input
                      name="answer"
                      maxLength="128"
                      value={this.state.answer}
                      onChange={this.handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Confirm Password</Label>
                    <Input
                      name="securityPassword"
                      type="password"
                      maxLength="128"
                      value={this.state.securityPassword}
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
              </CardBody>
            </Card>
          </Row>
        )}
      </div>
    );
  }
}

export default withAuth(ProfilePage);
