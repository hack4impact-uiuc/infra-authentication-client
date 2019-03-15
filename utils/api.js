import fetch from 'isomorphic-unfetch'

function register(emailInput, passwordInput) {
    return fetch(`http://localhost:5000/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email:emailInput,
            password:passwordInput,
            role:"guest"
        })
      })
}

function login(emailInput, passwordInput) {
  return fetch(`http://localhost:5000/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: emailInput,
      password: passwordInput
    })
  })
}

function verify() {
  try {
    localStorage.getItem("authtoken");
    return fetch(`http://localhost:5000/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: localStorage.getItem("authtoken")
      })
    })
  } catch (err) {
    return false;
  }
}

export {
    register,
    login,
    verify
}