import fetch from "isomorphic-unfetch";

import { getCookie } from "./cookie";

function register(emailInput, passwordInput, questionIdx, answer) {
  try {
    return fetch(`http://localhost:5000/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
        questionIdx,
        securityQuestionAnswer: answer,
        role: "guest",
        answer
      })
    });
  } catch (err) {
    console.log(err.message);
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
function getSecurityQuestions() {
  try {
    return fetch("http://localhost:5000/getSecurityQuestions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: getCookie("token")
      }
    });
  } catch (err) {
    return err;
  }
}
function setSecurityQuestion(questionIdx, answer, password) {
  try {
    return fetch(`http://localhost:5000/addSecurityQuestionAnswer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: getCookie("token")
      },
      body: JSON.stringify({
        questionIdx,
        answer,
        password
      })
    });
  } catch (err) {
    console.log(err);
  }
}

function getSecurityQuestion(email) {
  try {
    return fetch(`http://localhost:5000/getSecurityQuestionForUser`, {
      method: "POST",
      body: JSON.stringify({
        email
      }),
      headers: { email: email, "Content-Type": "application/json" }
    });
  } catch (err) {
    console.log(err);
  }
}

function submitSecurityQuestionAnswer(email, answer, questionIdx) {
  try {
    return fetch(`http://localhost:5000/forgotPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        answer,
        questionIdx
      })
    });
  } catch (err) {
    console.log(err);
  }
}

function resetPassword(pin, email, password, answer) {
  try {
    return fetch(`http://localhost:5000/passwordReset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pin,
        email,
        password,
        answer
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
      headers: {
        "Content-Type": "application/json",
        token: getCookie("token"),
        google: getCookie("google")
      }
    });
  } catch (err) {
    console.log(err);
  }
}

function changeRole(userEmail, newRole, password) {
  try {
    return fetch(`http://localhost:5000/roleschange`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: getCookie("token")
      },
      body: JSON.stringify({
        userEmail,
        newRole,
        password
      })
    });
  } catch (err) {
    console.log(err);
  }
}

function google(tokenId) {
  try {
    return fetch(`http://localhost:5000/google`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tokenId: tokenId
      })
    });
  } catch (err) {
    console.log(err);
  }
}

function verifyPIN(pin) {
  try {
    return fetch(`http://localhost:5000/verifyEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: getCookie("token")
      },
      body: JSON.stringify({
        pin
      })
    });
  } catch (err) {
    console.log(err);
  }
}

function resendPIN() {
  try {
    return fetch(`http://localhost:5000/resendVerificationEmail`, {
      method: "POST",
      headers: { "Content-Type": "application/json", token: getCookie("token") }
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
  getSecurityQuestions,
  getSecurityQuestion,
  submitSecurityQuestionAnswer,
  resetPassword,
  changePassword,
  getUsersForRolesPage,
  changeRole,
  verifyPIN,
  resendPIN,
  google
};
