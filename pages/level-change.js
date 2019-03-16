import { Component } from "react";
import Link from "next/link";
import Layout from "../components/layout.js";
import styled, { css } from "styled-components";

import { getUsers } from "../networkRequests/user";
import { getRoles, roleChange } from "../networkRequests/roles";
class LevelChangePage extends Component {
  state = {
    rolesDropDownOpen: -1,
    loading: false,
    roles: ["grand wizard", "super asshole", "big dick energy"],
    users: [],
    submitting: false,
    success: false,
    error: null
  };

  async componentWillMount() {
    this.setState({ loading: true });
    const usersResponse = await getUsers();
    console.log(usersResponse);
    if (usersResponse.success) {
      this.setState({
        users: usersResponse.users,
        loading: false,
        roles: usersResponse.roles
      });
    } else if (usersResponse.error && !!usersResponse.error.message) {
      this.setState({ eror: usersResponse.error.message, loading: false });
    } else {
      this.setState({
        error: "there was an error with the request",
        loading: false
      });
    }
  }

  handleClick = (idx, e) => {
    if (idx === this.state.rolesDropDownOpen) {
      this.setState({ rolesDropDownOpen: -1 });
    } else {
      this.setState({ rolesDropDownOpen: idx });
    }
  };
  clearSuccessError = () => {
    this.setState({ error: "", success: false });
  };

  changeRole = (userID, role, e) => {
    this.setState({ submitting: true });
    setTimeout(() => {
      console.log(`${userID} changed to ${role}`);
      this.setState({ submitting: false, success: true });
    }, 2000);
    // this.setState({ submitting: true })
    // const resp = await roleChange(userID, role)
    // if (resp.error) {
    //     this.setState({ error: resp.error.message })
    // } else {
    //     this.setState({ submitting: false, success: true })
    // }
  };

  render() {
    const { loading, users, submitting, success, error, roles } = this.state;

    const showModal = loading || submitting || success || !!error;
    const modalText = loading
      ? "Loading..."
      : submitting
      ? "Submitting..."
      : success
      ? "Success!"
      : error;
    return (
      <React.Fragment>
        <Page showModal={showModal}>
          <Header>
            <Text size="2rem">Level Change Users!</Text>
          </Header>
          {!!users && !!users.length ? (
            <React.Fragment>
              <Text style={{ margin: "1rem" }} size="2rem">
                Users
              </Text>
              <UsersList>
                {users.map((user, idx) => {
                  return (
                    <Row
                      children={
                        <RolesDropDown
                          user={user}
                          clickHandler={this.changeRole}
                          roles={roles}
                          open={this.state.rolesDropDownOpen === idx}
                        />
                      }
                      clickHandler={this.handleClick.bind(null, idx)}
                      user={user}
                    />
                  );
                })}
              </UsersList>
            </React.Fragment>
          ) : (
            <Text size="3rem">There are no Users!</Text>
          )}
        </Page>
        {showModal ? (
          <Modal>
            <Text size="2rem">{modalText}</Text>
            {success || error ? (
              <Text size="1.5rem" link={true} onClick={this.clearSuccessError}>
                Return To Page
              </Text>
            ) : null}
          </Modal>
        ) : null}
      </React.Fragment>
    );
  }
}

const Row = ({ clickHandler, user, children }) => {
  if (!clickHandler || !user) {
    return null;
  }
  return (
    <TableRow onClick={clickHandler}>
      <Text size="1.5rem">
        id: {user._id} role: {user.role}
      </Text>
      {children}
    </TableRow>
  );
};

const RolesDropDown = ({ open, roles, clickHandler, user }) => {
  const cells = [];
  cells.push(<DropDownCell title={true}>Change Role to:</DropDownCell>);
  roles.forEach((role, idx) => {
    cells.push(
      <DropDownCell
        key={`dropdown-${idx}`}
        onClick={clickHandler.bind(null, user.userID, role)}
      >
        {role}
      </DropDownCell>
    );
  });

  return <DropDown open={open}>{cells}</DropDown>;
};

export default LevelChangePage;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  ${props =>
    props.showModal &&
    css`
      opacity: 0.25;
      z-index: -1;
    `}
`;

const DropDown = styled.div`
  display: none;
  ${props =>
    props.open &&
    css`
      display: block;
      box-shadow: 2px 2px 10px -2px black;
    `}
  max-neight: 7.5rem;
  width: 10rem;
  position: absolute;
  bottom: -100%;
  right: 0;
  opacity: 1;
  z-index: 10;
  background-color: white;
`;
const DropDownCell = styled.div`
  font-size: 1.25rem;
  :hover {
    opacity: 0.5;
  }

  padding: 0.25rem;
  cursor: pointer;
  ${props =>
    props.title &&
    css`
      cursor: default;
      :hover {
        opacity: 1;
      }
      border-bottom: 1px solid black;
    `}
`;
const Modal = styled.div`
  background-color: white;
  position: absolute;
  top: 50%;
  right: 50%;
  z-index: 2;
  > * {
    padding: 0.5rem;
  }
  min-width: 10rem;
  min-height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 2px 2px 10px -2px black;
`;
const UsersList = styled.div`
  flex: 1;
  flex-direction: row;
  max-height: 35rem;
  overflow-y: scroll;
  margin: 1rem;
  box-shadow: 2px 2px 10px -2px black;
`;
const Text = styled.div`
  flex: 0 1 auto;
  ${props =>
    props.size &&
    css`
      font-size: ${props.size};
    `}
  ${props =>
    props.link &&
    css`
      color: blue;
      text-decoration: underline;
      cursor: pointer;
    `}
`;
const TableRow = styled.div`
  flex: 1;
  padding: 1rem;
  font: 1.5rem;
  border-bottom: 1px solid black;
  margin: 0.25rem;
  cursor: pointer;
  position: relative;
`;
const Header = styled.div`
  justify-content: space-between;
  flex-direction: row;
  display: flex;
  margin: 1rem 0;
  border-radius: 0.5rem;
  color: white;
  background-color: black;
  > * {
    padding: 0.5rem;
  }
`;
