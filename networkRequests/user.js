import API_URL from "../components/globalApiUrl";

export const getUsers = () => {
  return fetch(API_URL + "/roles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YzgxNzBmZWU4ODQ1MThlOTY4NzM1ZDEiLCJpYXQiOjE1NTE5ODc0MDJ9.ZHEzQokXr-p83Vj-eqvORMHKKSOgtfmIAa1WP7Ymifw"
    }
  })
    .then(resp => {
      return resp
        .json()
        .then(respBody => {
          return { success: true, users: respBody.users };
        })
        .catch(error => {
          return { success: false, error };
        });
    })
    .catch(error => {
      return { success: false, error };
    });
};
