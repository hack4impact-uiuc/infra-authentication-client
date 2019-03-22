import { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import withAuth from "../components/withAuth";
import NavBar from "../components/navbar";
import { getUsersForRolesPage, changeRole } from "../utils/api";
import {
  Table,
  Card,
  CardBody,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class RolesPage extends Component {
  state = {
    users: [],
    newRole: "",
    userWithNewRole: -1
  };

  async componentDidMount() {
    const userData = await getUsersForRolesPage();
    const userDataParsed = await userData.json();
    this.setState({ users: userDataParsed.user_emails });
  }

  setNewRole = (newRole, userWithNewRole) => () => {
    this.setState({ newRole, userWithNewRole });
  };

  submitNewRole = async e => {
    const changeRoleData = await changeRole(
      this.state.users[this.state.userWithNewRole].email,
      this.state.newRole
    );
    const changeRoleDataParsed = await changeRoleData.json();
    const userData = await getUsersForRolesPage();
    const userDataParsed = await userData.json();
    this.setState({
      users: userDataParsed.user_emails,
      userWithNewRole: -1,
      newRole: ""
    });
  };

  render() {
    return (
      <div>
        <NavBar />

        <Card
          className="interview-card"
          style={{ height: "60%", margin: "2%" }}
        >
          <CardBody>
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Change Role</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user, idx) => console.log(user, idx))}
                {this.state.users.map((user, idx) => (
                  <tr key={idx}>
                    <th scope="row">1</th>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <UncontrolledDropdown>
                        <DropdownToggle caret>
                          {idx === this.state.userWithNewRole
                            ? this.state.newRole
                            : "New Role"}
                        </DropdownToggle>
                        <DropdownMenu color="info">
                          <DropdownItem onClick={this.setNewRole("guest", idx)}>
                            Guest
                          </DropdownItem>
                          <DropdownItem
                            onClick={this.setNewRole("supervisor", idx)}
                          >
                            Supervisor
                          </DropdownItem>
                          <DropdownItem onClick={this.setNewRole("admin", idx)}>
                            Admin
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                    <td>
                      <Button
                        color="info"
                        size="sm"
                        onClick={this.submitNewRole}
                      >
                        Submit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default withAuth(RolesPage);
