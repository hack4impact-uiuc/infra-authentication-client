import fetch from "isomorphic-unfetch";

import { getCookie } from "./cookie";

function register(emailInput, passwordInput) {
  try {
    return fetch(`http://localhost:5000/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
        role: "guest"
      })
    });
  } catch (err) {
    console.log(err);
  }
}

function login(emailInput, passwordInput) {
  try {
    return fetch(`http://localhost:5000/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput
      })
    });
  } catch (err) {
    console.log(err);
  }
}

function verify() {
  try {
    return fetch(`http://localhost:5000/verify/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", token: getCookie("token") }
    });
  } catch (err) {
    console.log(err);
  }
}

function setSecurityQuestion(question, answer, reenter_password) {
  try {
    return fetch(`http://localhost:5000/addSecurityQuestion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: getCookie("token")
      },
      body: JSON.stringify({
        question,
        answer,
        reenter_password
      })
    });
  } catch (err) {
    console.log(err);
  }
}

function getSecurityQuestion(email) {
  try {
    return fetch(`http://localhost:5000/getSecurityQuestion`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email
      })
    });
  } catch (err) {
    console.log(err);
  }
}

function submitSecurityQuestionAnswer(email, answer) {
  try {
    return fetch(`http://localhost:5000/forgotPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        answer
      })
    });
  } catch (err) {
    console.log(err);
  }
}

function resetPassword(pin, email, password) {
  try {
    return fetch(`http://localhost:5000/passwordReset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pin,
        email,
        password
      })
    });
  } catch (err) {
    console.log(err);
  }
}

function changePassword(currentPassword, newPassword) {
  try {
    return fetch(`http://localhost:5000/changePassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: getCookie("token")
      },
      body: JSON.stringify({
        currentPassword,
        newPassword
      })
    });
  } catch (err) {
    console.log(err);
  }
}

function getUsersForRolesPage() {
  console.log("ROLES");
  try {
    return fetch(`http://localhost:5000/roles`, {
      method: "GET",
      headers: { "Content-Type": "application/json", token: getCookie("token") }
    });
  } catch (err) {
    console.log(err);
  }
}

function changeRole(userEmail, newRole) {
  try {
    return fetch(`http://localhost:5000/roleschange`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: getCookie("token")
      },
      body: JSON.stringify({
        userEmail,
        newRole
      })
    });
  } catch (err) {
    console.log(err);
  }
}

export {
  register,
  login,
  verify,
  setSecurityQuestion,
  getSecurityQuestion,
  submitSecurityQuestionAnswer,
  resetPassword,
  changePassword,
  getUsersForRolesPage,
  changeRole
};
