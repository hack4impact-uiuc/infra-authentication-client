import { Component } from "react";
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
  getSecurityQuestions,
  userInfo,
  resendPIN,
  verifyPIN
} from "../utils/api";
import {
  Alert,
  Form,
  Button,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  Row
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
    securityPassword: "",
    submittedSecurity: false,
    successSubmitSecurity: false
  };

  async componentWillMount() {
    await this.getInfo();
    const resp = await (await getSecurityQuestions()).json();
    if (resp.questions) {
      this.setState({ questions: resp.questions });
    }
  }

  getInfo = async () => {
    const result = await userInfo();
    const response = await result.json();
    this.setState({
      info: {
        email: response.user_email,
        role: response.user_role,
        verification: response.user_verified
      }
    });
    const resp = await (await getSecurityQuestions()).json();
    if (resp.questions) {
      this.setState({ questions: resp.questions });
    }
  };

  //  getInfo = async () => {
  //   const result = await userInfo();
  //   const response = await result.json();
  //   this.setState({
  //     info: {
  //       email: response.user_email,
  //       role: response.user_role,
  //       verification: response.user_verified
  //     }
  //   });
  // };

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
      this.setState({ submittedSecurity: true });
      const result = await setSecurityQuestion(
        this.state.questionIdx,
        this.state.answer,
        this.state.securityPassword
      );
      const resp = await result.json();
      if (resp.status === 200) {
        this.setState({ successSubmitSecurity: true });
      } else {
        this.setState({ successSubmitSecurity: false });
      }
      setTimeout(() => {
        this.setState({
          successSubmitSecurity: false,
          submittedSecurity: false
        });
      }, 1500);
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
        this.setState({ responseMessage: response.message });
      } else {
        this.setState({ responseMessage: response.message });
        setCookie("token", response.token);
      }
    } else {
      this.setState({ responseMessage: "Passwords do not match" });
    }
  };

  handleEmail = async e => {
    e.preventDefault();
    const result = await resendPIN();
    const resp = await result.json();
    this.setState({ verificationMessage: resp.message });
  };

  handlePin = async e => {
    e.preventDefault();
    if (this.state.pin.trim().length > 0) {
      const result = await verifyPIN(parseInt(this.state.pin));
      const resp = await result.json();
      this.setState({ verificationMessage: resp.message });
      if (resp.status === 200) {
        this.setState({
          info: {
            email: this.state.info.email,
            role: this.state.info.role,
            verification: true
          }
        });
      }
    }
  };

  render() {
    const { submittedSecurity, successSubmitSecurity } = this.state;
    return (
      <div>
        <NavBar />
        {submittedSecurity && successSubmitSecurity && (
          <Alert color="primary">
            Successfully Submitted Security Question
          </Alert>
        )}
        {submittedSecurity && !successSubmitSecurity && (
          <Alert color="primary">Unable to Submit Security Question</Alert>
        )}

        {this.state.responseMessage && (
          <Alert color="primary">{this.state.responseMessage}</Alert>
        )}
        {this.state.verificationMessage && (
          <Alert color="primary">{this.state.verificationMessage}</Alert>
        )}
        {this.state.info && (
          <ul>
            <li>Email: {this.state.info.email}</li>
            <li>Role: {this.state.info.role}</li>
            <li>
              Verification: You are{" "}
              {this.state.info.verification &&
              this.state.info.verification != "undefined"
                ? ""
                : "not "}
              verified
            </li>
          </ul>
        )}

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
            {this.state.info &&
            this.state.info.verification &&
            this.state.info.verification != "undefined" ? null : (
              <Card
                className="interview-card"
                style={{ width: "400px", height: "60%" }}
              >
                <CardBody>
                  <Form>
                    <FormGroup>
                      <Label>Verification Pin</Label>
                      <Input
                        name="pin"
                        maxLength="128"
                        value={this.state.pin}
                        onChange={this.handleChange}
                        required
                      />
                    </FormGroup>
                    <Button
                      color="success"
                      size="lg"
                      onClick={this.handleEmail}
                      style={{ float: "left", width: "49%" }}
                    >
                      Resend Email
                    </Button>
                    <Button
                      color="success"
                      size="lg"
                      onClick={this.handlePin}
                      style={{ float: "right", width: "49%" }}
                    >
                      Submit Pin
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            )}
          </Row>
        )}
      </div>
    );
  }
}

export default withAuth(ProfilePage);
