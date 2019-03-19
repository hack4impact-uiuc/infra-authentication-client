import fetch from "isomorphic-unfetch";

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: document.cookie.substr(6)
      })
    });
  } catch (err) {
    console.log(err);
  }
}

export { register, login, verify };
