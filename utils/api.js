import fetch from 'isomorphic-unfetch'

function register(emailInput, passwordInput) {
    return fetch(`http://localhost:8000/register`, {
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
  return fetch(`http://localhost:8000/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: emailInput,
      password: passwordInput
    })
  })
}

export {
    register,
    login
}