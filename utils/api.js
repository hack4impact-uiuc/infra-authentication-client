import fetch from 'isomorphic-unfetch'

function register(emailInput,passwordInput) {
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

export {
    register  
}